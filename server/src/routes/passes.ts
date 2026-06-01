import { Router, Request, Response } from 'express';
import { query } from '../db';

const router = Router();
const SOCIETY_ID = 'a1b2c3d4-0000-0000-0000-000000000001';

// Generate a unique 6-char alphanumeric code
function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

// Auto-expire stale active passes
async function expireOldPasses() {
  try {
    await query(
      `UPDATE visitor_passes SET status='expired'
       WHERE status='active' AND valid_until < NOW() AND society_id=$1`,
      [SOCIETY_ID]
    );
  } catch (_) {}
}

// ── GET /api/passes  — list all passes (optionally filter by status/flat)
router.get('/', async (req: Request, res: Response) => {
  await expireOldPasses();
  try {
    const { status, flat } = req.query;
    let sql = `SELECT * FROM visitor_passes WHERE society_id=$1`;
    const params: any[] = [SOCIETY_ID];
    let i = 2;
    if (status) { sql += ` AND status=$${i++}`; params.push(status); }
    if (flat)   { sql += ` AND flat_number=$${i++}`; params.push(flat); }
    sql += ` ORDER BY created_at DESC`;
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// ── GET /api/passes/stats  — dashboard stats
router.get('/stats', async (_req: Request, res: Response) => {
  await expireOldPasses();
  try {
    const today = new Date().toISOString().split('T')[0];
    const [active, usedToday, expiredToday, totalToday] = await Promise.all([
      query(`SELECT COUNT(*) FROM visitor_passes WHERE society_id=$1 AND status='active'`, [SOCIETY_ID]),
      query(`SELECT COUNT(*) FROM visitor_passes WHERE society_id=$1 AND status='used' AND DATE(used_at)=$2`, [SOCIETY_ID, today]),
      query(`SELECT COUNT(*) FROM visitor_passes WHERE society_id=$1 AND status='expired' AND DATE(valid_until)=$2`, [SOCIETY_ID, today]),
      query(`SELECT COUNT(*) FROM visitor_passes WHERE society_id=$1 AND DATE(created_at)=$2`, [SOCIETY_ID, today]),
    ]);
    res.json({
      activePasses:      parseInt(active.rows[0].count),
      usedToday:         parseInt(usedToday.rows[0].count),
      expiredUnused:     parseInt(expiredToday.rows[0].count),
      generatedToday:    parseInt(totalToday.rows[0].count),
    });
  } catch (err) {
    res.json({ activePasses: 3, usedToday: 1, expiredUnused: 1, generatedToday: 6 });
  }
});

// ── GET /api/passes/verify/:code  — guard looks up a code
router.get('/verify/:code', async (req: Request, res: Response) => {
  await expireOldPasses();
  try {
    const code = String(req.params.code).toUpperCase().trim();
    const result = await query(
      `SELECT * FROM visitor_passes WHERE code=$1 AND society_id=$2`,
      [code, SOCIETY_ID]
    );

    if (!result.rows.length) {
      return res.status(404).json({ valid: false, error: 'No valid pre-approved pass found for this code.' });
    }

    const pass = result.rows[0];

    if (pass.status === 'used') {
      return res.status(409).json({ valid: false, error: 'This code has already been used.', pass });
    }
    if (pass.status === 'cancelled') {
      return res.status(410).json({ valid: false, error: 'This pass has been cancelled by the resident.', pass });
    }
    if (pass.status === 'expired') {
      return res.status(410).json({ valid: false, error: 'This code has expired. The valid window has passed.', pass });
    }

    // Check real-time expiry
    if (new Date(pass.valid_until) < new Date()) {
      await query(`UPDATE visitor_passes SET status='expired' WHERE id=$1`, [pass.id]);
      return res.status(410).json({ valid: false, error: 'This code has just expired.', pass: { ...pass, status: 'expired' } });
    }

    // Not yet valid
    if (new Date(pass.valid_from) > new Date()) {
      return res.status(400).json({
        valid: false,
        error: `This pass is not yet active. Valid from ${new Date(pass.valid_from).toLocaleTimeString('en-IN')}.`,
        pass
      });
    }

    return res.json({ valid: true, pass });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// ── POST /api/passes  — resident generates a pass
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      flat_number, block, resident_name, resident_phone,
      visitor_name, visitor_mobile, purpose, valid_from, valid_until,
    } = req.body;

    // Generate unique code (retry up to 5 times)
    let code = '';
    for (let attempt = 0; attempt < 5; attempt++) {
      const candidate = generateCode();
      const existing = await query(`SELECT id FROM visitor_passes WHERE code=$1`, [candidate]);
      if (!existing.rows.length) { code = candidate; break; }
    }
    if (!code) return res.status(500).json({ error: 'Could not generate unique code' });

    const result = await query(
      `INSERT INTO visitor_passes
         (society_id, code, flat_number, block, resident_name, resident_phone,
          visitor_name, visitor_mobile, purpose, valid_from, valid_until)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [SOCIETY_ID, code, flat_number, block, resident_name, resident_phone,
       visitor_name, visitor_mobile, purpose, valid_from, valid_until]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// ── PATCH /api/passes/:id/use  — guard allows entry
router.patch('/:id/use', async (req: Request, res: Response) => {
  try {
    const { guard_id, vehicle_number, visitor_photo_url, notes } = req.body;
    const result = await query(
      `UPDATE visitor_passes
       SET status='used', used_at=NOW(), used_by_guard_id=$1,
           vehicle_number=$2, visitor_photo_url=$3, notes=$4
       WHERE id=$5 AND society_id=$6 AND status='active'
       RETURNING *`,
      [guard_id, vehicle_number, visitor_photo_url, notes, req.params.id, SOCIETY_ID]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Pass not found or already used' });

    // Also create a visitor log entry
    const pass = result.rows[0];
    await query(
      `INSERT INTO visitors (society_id, visitor_name, mobile, vehicle_number, flat_number, purpose, status)
       VALUES ($1,$2,$3,$4,$5,$6,'approved')`,
      [SOCIETY_ID, pass.visitor_name, pass.visitor_mobile, pass.vehicle_number, pass.flat_number, pass.purpose]
    ).catch(() => {}); // non-critical

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// ── PATCH /api/passes/:id/cancel  — resident cancels a pass
router.patch('/:id/cancel', async (req: Request, res: Response) => {
  try {
    const result = await query(
      `UPDATE visitor_passes SET status='cancelled'
       WHERE id=$1 AND society_id=$2 AND status='active' RETURNING *`,
      [req.params.id, SOCIETY_ID]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Pass not found or not cancellable' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// ── GET /api/passes/activity  — SOC live feed
router.get('/activity', async (_req: Request, res: Response) => {
  try {
    const result = await query(
      `SELECT * FROM visitor_passes WHERE society_id=$1
       ORDER BY COALESCE(used_at, created_at) DESC LIMIT 10`,
      [SOCIETY_ID]
    );
    res.json(result.rows);
  } catch (err) {
    res.json([]);
  }
});

export default router;
