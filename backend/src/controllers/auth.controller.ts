import type { Context } from 'hono';
import { loginSchema } from '../schemas/auth.schema.js';
import { login } from '../services/auth.service.js';

export async function loginController(c: Context) {
  const body = loginSchema.parse(await c.req.json());
  return c.json(await login(body));
}

export function logoutController(c: Context) {
  return c.json({ message: 'Sesion cerrada correctamente' });
}
