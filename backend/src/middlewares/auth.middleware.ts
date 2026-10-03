import { jwtVerify } from 'jose';
import type { Context, Next } from 'hono';
import { jwtSecret } from '../services/auth.service.js';
import type { AppVariables } from '../types/auth.types.js';

export async function authMiddleware(c: Context<{ Variables: AppVariables }>, next: Next) {
  const authorization = c.req.header('Authorization');
  const token = authorization?.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : null;

  if (!token) {
    return c.json({ error: 'Token de autenticacion requerido' }, 401);
  }

  try {
    const { payload } = await jwtVerify(token, jwtSecret);
    const adminId = Number(payload.sub);
    if (!Number.isInteger(adminId) || adminId <= 0) {
      return c.json({ error: 'Token invalido' }, 401);
    }

    c.set('adminId', adminId);
    await next();
  } catch {
    return c.json({ error: 'Token invalido o expirado' }, 401);
  }
}
