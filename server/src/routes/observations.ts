import { Router } from 'express';
import { query } from '../db';

const router = Router();
const SOCIETY_ID = 'a1b2c3d4-0000-0000-0000-000000000001';

router.get('/', async (req, res) => {
  try {
    const result = await query(
      `SELECT o.*, g.name as guard_name FROM observations o
       LEFT JOIN guards g ON o.guard_id=g.id
       WHERE o.society_id=$1 ORDER BY o.created_at DESC`,
      [SOCIETY_ID]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { guard_id, category, description, location, priority, photo_url } = req.body;
    const result = await query(
      `INSERT INTO observations (society_id, guard_id, category, description, location, priority, photo_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [SOCIETY_ID, guard_id, category, description, location, priority || 'medium', photo_url]
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
      `UPDATE observations SET status=$1, resolved_at=CASE WHEN $1='resolved' THEN NOW() ELSE NULL END
       WHERE id=$2 AND society_id=$3 RETURNING *`,
      [status, req.params.id, SOCIETY_ID]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
