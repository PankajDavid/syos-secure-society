import { Router } from 'express';
import { query } from '../db';

const router = Router();
const SOCIETY_ID = 'a1b2c3d4-0000-0000-0000-000000000001';

router.get('/', async (req, res) => {
  try {
    const result = await query(
      `SELECT * FROM camera_alerts WHERE society_id=$1 ORDER BY timestamp DESC LIMIT 50`,
      [SOCIETY_ID]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.patch('/:id/acknowledge', async (req, res) => {
  try {
    const result = await query(
      `UPDATE camera_alerts SET is_acknowledged=true WHERE id=$1 RETURNING *`,
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
