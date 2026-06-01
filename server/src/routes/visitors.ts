import { Router } from 'express';
import { query } from '../db';

const router = Router();
const SOCIETY_ID = 'a1b2c3d4-0000-0000-0000-000000000001';

router.get('/', async (req, res) => {
  try {
    const { status, date, limit = 50, offset = 0 } = req.query;
    let sql = `SELECT * FROM visitors WHERE society_id=$1`;
    const params: any[] = [SOCIETY_ID];
    let idx = 2;
    if (status) { sql += ` AND status=$${idx++}`; params.push(status); }
    if (date) { sql += ` AND DATE(entry_time)=$${idx++}`; params.push(date); }
    sql += ` ORDER BY entry_time DESC LIMIT $${idx++} OFFSET $${idx++}`;
    params.push(limit, offset);
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/pending', async (req, res) => {
  try {
    const result = await query(
      `SELECT * FROM visitors WHERE society_id=$1 AND status='pending' ORDER BY entry_time DESC`,
      [SOCIETY_ID]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { visitor_name, mobile, vehicle_number, flat_number, purpose, photo_url, notes } = req.body;
    const result = await query(
      `INSERT INTO visitors (society_id, visitor_name, mobile, vehicle_number, flat_number, purpose, photo_url, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [SOCIETY_ID, visitor_name, mobile, vehicle_number, flat_number, purpose, photo_url, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const result = await query(
      `UPDATE visitors SET status=$1 WHERE id=$2 AND society_id=$3 RETURNING *`,
      [status, req.params.id, SOCIETY_ID]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
