import { Pool, type QueryResult } from 'pg';
import config from '@/config';

const dbUrl = new URL(config.database.url);

export const pool = new Pool({
  user: dbUrl.username || undefined,
  password: dbUrl.password ? decodeURIComponent(dbUrl.password) : undefined,
  host: dbUrl.hostname,
  port: parseInt(dbUrl.port, 10),
  database: dbUrl.pathname.slice(1) || process.env.USER,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const query = async (text: string, params?: any[]): Promise<QueryResult> => {
  const res = await pool.query(text, params);
  return res;
};

export const initializePostgres = async () => {
  try {
    const client = await pool.connect();
    console.log('\x1b[32minfo\x1b[0m PostgreSQL Pool has been initialized!');
    client.release();
  } catch (err) {
    console.error('Error during Data Source initialization:', err);
    process.exit(1);
  }
};
