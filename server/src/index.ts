import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

import dashboardRouter from './routes/dashboard';
import visitorsRouter from './routes/visitors';
import guardsRouter from './routes/guards';
import attendanceRouter from './routes/attendance';
import incidentsRouter from './routes/incidents';
import observationsRouter from './routes/observations';
import cameraAlertsRouter from './routes/cameraAlerts';
import reportsRouter from './routes/reports';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/dashboard', dashboardRouter);
app.use('/api/visitors', visitorsRouter);
app.use('/api/guards', guardsRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/incidents', incidentsRouter);
app.use('/api/observations', observationsRouter);
app.use('/api/camera-alerts', cameraAlertsRouter);
app.use('/api/reports', reportsRouter);

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', service: 'SYOS Secure Society API', timestamp: new Date().toISOString() });
});

// Serve React frontend from ../client/dist if it exists
const clientDist = path.resolve(__dirname, '../../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  // SPA fallback — all non-API routes serve index.html (Express 5 requires named wildcard)
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
  console.log(`🌐 Serving React frontend from ${clientDist}`);
} else {
  app.get('/', (_, res) => {
    res.json({ message: 'SYOS Secure Society API', docs: '/api/health', frontend: 'Deploy client separately' });
  });
}

app.listen(PORT, () => {
  console.log(`🛡️  SYOS Secure Society API running on port ${PORT}`);
});

export default app;
