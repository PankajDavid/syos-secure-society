import { Router } from 'express';
import { query } from '../db';

const router = Router();
const SOCIETY_ID = 'a1b2c3d4-0000-0000-0000-000000000001';

router.get('/daily-summary', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const [visitors, incidents, observations, attendance] = await Promise.all([
      query(`SELECT status, COUNT(*) FROM visitors WHERE society_id=$1 AND DATE(entry_time)=$2 GROUP BY status`, [SOCIETY_ID, today]),
      query(`SELECT status, COUNT(*) FROM incidents WHERE society_id=$1 AND DATE(created_at)=$2 GROUP BY status`, [SOCIETY_ID, today]),
      query(`SELECT status, COUNT(*) FROM observations WHERE society_id=$1 AND DATE(created_at)=$2 GROUP BY status`, [SOCIETY_ID, today]),
      query(`SELECT status, COUNT(*) FROM attendance WHERE society_id=$1 AND date=$2 GROUP BY status`, [SOCIETY_ID, today]),
    ]);
    res.json({ date: today, visitors: visitors.rows, incidents: incidents.rows, observations: observations.rows, attendance: attendance.rows });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
