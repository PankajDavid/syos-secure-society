import { Router } from 'express';
import { query } from '../db';

const router = Router();
const SOCIETY_ID = 'a1b2c3d4-0000-0000-0000-000000000001';

router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    const d = date || new Date().toISOString().split('T')[0];
    const result = await query(
      `SELECT a.*, g.name as guard_name, g.employee_id, g.photo_url, g.shift as guard_shift
       FROM attendance a JOIN guards g ON a.guard_id=g.id
       WHERE a.society_id=$1 AND a.date=$2 ORDER BY a.check_in DESC`,
      [SOCIETY_ID, d]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/checkin', async (req, res) => {
  try {
    const { guard_id, shift } = req.body;
    const existing = await query(
      `SELECT id FROM attendance WHERE guard_id=$1 AND date=CURRENT_DATE`,
      [guard_id]
    );
    if (existing.rows.length) return res.status(409).json({ error: 'Already checked in today' });
    const result = await query(
      `INSERT INTO attendance (guard_id, society_id, check_in, shift, status) VALUES ($1,$2,NOW(),$3,'present') RETURNING *`,
      [guard_id, SOCIETY_ID, shift]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.patch('/:id/checkout', async (req, res) => {
  try {
    const result = await query(
      `UPDATE attendance SET check_out=NOW() WHERE id=$1 RETURNING *`,
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
