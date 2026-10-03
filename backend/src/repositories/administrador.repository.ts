import { pool } from '../config/database.js';
import type { AdminRecord } from '../types/auth.types.js';

export async function findAdminByUsername(usuario: string): Promise<AdminRecord | null> {
  const result = await pool.query<AdminRecord>(
    'SELECT "Identificador", "Usuario", "Contrasena" FROM "Administrador" WHERE "Usuario" = $1 LIMIT 1',
    [usuario],
  );

  return result.rows[0] ?? null;
}
