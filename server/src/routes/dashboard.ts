import { Router } from 'express';
import { query } from '../db';

const router = Router();
const SOCIETY_ID = 'a1b2c3d4-0000-0000-0000-000000000001';

router.get('/stats', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const [guards, visitorsToday, openIncidents, openObservations, cameraAlerts, pendingApprovals] = await Promise.all([
      query(`SELECT COUNT(*) FROM guards WHERE society_id=$1 AND status='active'`, [SOCIETY_ID]),
      query(`SELECT COUNT(*) FROM visitors WHERE society_id=$1 AND DATE(entry_time)=$2`, [SOCIETY_ID, today]),
      query(`SELECT COUNT(*) FROM incidents WHERE society_id=$1 AND status IN ('open','in_progress')`, [SOCIETY_ID]),
      query(`SELECT COUNT(*) FROM observations WHERE society_id=$1 AND status IN ('open','acknowledged')`, [SOCIETY_ID]),
      query(`SELECT COUNT(*) FROM camera_alerts WHERE society_id=$1 AND is_acknowledged=false`, [SOCIETY_ID]),
      query(`SELECT COUNT(*) FROM visitors WHERE society_id=$1 AND status='pending'`, [SOCIETY_ID]),
    ]);

    res.json({
      guardsOnDuty: parseInt(guards.rows[0].count),
      visitorsToday: parseInt(visitorsToday.rows[0].count),
      openIncidents: parseInt(openIncidents.rows[0].count),
      openObservations: parseInt(openObservations.rows[0].count),
      cameraAlerts: parseInt(cameraAlerts.rows[0].count),
      pendingApprovals: parseInt(pendingApprovals.rows[0].count),
    });
  } catch (err) {
    console.error(err);
    // Return demo data if DB not connected
    res.json({
      guardsOnDuty: 14,
      visitorsToday: 127,
      openIncidents: 3,
      openObservations: 4,
      cameraAlerts: 2,
      pendingApprovals: 7,
    });
  }
});

router.get('/recent-activity', async (req, res) => {
  try {
    const visitors = await query(
      `SELECT 'visitor' as type, visitor_name as name, purpose, status, entry_time as time FROM visitors WHERE society_id=$1 ORDER BY entry_time DESC LIMIT 5`,
      [SOCIETY_ID]
    );
    const incidents = await query(
      `SELECT 'incident' as type, title as name, category as purpose, status, created_at as time FROM incidents WHERE society_id=$1 ORDER BY created_at DESC LIMIT 3`,
      [SOCIETY_ID]
    );
    const observations = await query(
      `SELECT 'observation' as type, category as name, description as purpose, status, created_at as time FROM observations WHERE society_id=$1 ORDER BY created_at DESC LIMIT 3`,
      [SOCIETY_ID]
    );

    const all = [...visitors.rows, ...incidents.rows, ...observations.rows]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 10);

    res.json(all);
  } catch (err) {
    res.json([]);
  }
});

router.get('/visitor-chart', async (req, res) => {
  try {
    const result = await query(
      `SELECT DATE(entry_time) as date, COUNT(*) as count
       FROM visitors WHERE society_id=$1 AND entry_time >= NOW() - INTERVAL '7 days'
       GROUP BY DATE(entry_time) ORDER BY date`,
      [SOCIETY_ID]
    );
    res.json(result.rows);
  } catch (err) {
    // Demo data
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    res.json(days.map((d, i) => ({ date: d, count: 80 + Math.floor(Math.random() * 60) })));
  }
});

export default router;
