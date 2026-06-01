import { Router } from 'express';
import { query } from '../db';

const router = Router();
const SOCIETY_ID = 'a1b2c3d4-0000-0000-0000-000000000001';

router.get('/', async (req, res) => {
  try {
    const { status, priority } = req.query;
    let sql = `SELECT * FROM incidents WHERE society_id=$1`;
    const params: any[] = [SOCIETY_ID];
    let idx = 2;
    if (status) { sql += ` AND status=$${idx++}`; params.push(status); }
    if (priority) { sql += ` AND priority=$${idx++}`; params.push(priority); }
    sql += ` ORDER BY created_at DESC`;
    const result = await query(sql, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, category, priority, location, photo_url } = req.body;
    const result = await query(
      `INSERT INTO incidents (society_id, title, description, category, priority, location, photo_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [SOCIETY_ID, title, description, category, priority || 'medium', location, photo_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const resolved = status === 'resolved' ? 'NOW()' : 'NULL';
    const result = await query(
      `UPDATE incidents SET status=$1, resolved_at=${resolved} WHERE id=$2 AND society_id=$3 RETURNING *`,
      [status, req.params.id, SOCIETY_ID]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
