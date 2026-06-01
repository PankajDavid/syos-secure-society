import { Router } from 'express';
import { query } from '../db';

const router = Router();
const SOCIETY_ID = 'a1b2c3d4-0000-0000-0000-000000000001';

router.get('/', async (req, res) => {
  try {
    const result = await query(
      `SELECT * FROM guards WHERE society_id=$1 ORDER BY name`,
      [SOCIETY_ID]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await query(
      `SELECT g.*, a.check_in, a.check_out, a.status as attendance_status
       FROM guards g LEFT JOIN attendance a ON g.id=a.guard_id AND a.date=CURRENT_DATE
       WHERE g.id=$1 AND g.society_id=$2`,
      [req.params.id, SOCIETY_ID]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Guard not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, employee_id, phone, shift, location, emergency_contact, address } = req.body;
    const result = await query(
      `INSERT INTO guards (society_id, name, employee_id, phone, shift, location, emergency_contact, address)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [SOCIETY_ID, name, employee_id, phone, shift, location, emergency_contact, address]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { status, shift, location } = req.body;
    const result = await query(
      `UPDATE guards SET status=COALESCE($1,status), shift=COALESCE($2,shift), location=COALESCE($3,location)
       WHERE id=$4 AND society_id=$5 RETURNING *`,
      [status, shift, location, req.params.id, SOCIETY_ID]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
