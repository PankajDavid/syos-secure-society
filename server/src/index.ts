import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

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

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
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

app.listen(PORT, () => {
  console.log(`🛡️  SYOS Secure Society API running on port ${PORT}`);
});

export default app;
