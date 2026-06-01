import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool: Pool | null = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  pool.on('error', (err) => {
    console.error('Unexpected DB client error:', err.message);
  });

  pool.query('SELECT 1').then(() => {
    console.log('✅ Database connected');
  }).catch((err) => {
    console.warn('⚠️  Database connection failed, running in demo mode:', err.message);
  });
} else {
  console.warn('⚠️  DATABASE_URL not set — running in demo mode (API returns fallback data)');
}

export const query = async (text: string, params?: any[]) => {
  if (!pool) throw new Error('NO_DB');
  return pool.query(text, params);
};

export default pool;
