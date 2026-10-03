import { Pool } from 'pg';
import { environment } from './environment.js';

export const pool = new Pool({ connectionString: environment.DATABASE_URL });

pool.on('error', (error) => {
  console.error('Error inesperado en el pool de PostgreSQL:', error);
});

export async function checkDatabaseConnection(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('SELECT 1');
  } finally {
    client.release();
  }
}
