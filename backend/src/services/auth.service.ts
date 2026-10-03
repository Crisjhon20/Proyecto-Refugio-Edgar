import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { environment } from '../config/environment.js';
import { findAdminByUsername } from '../repositories/administrador.repository.js';
import { HttpError } from '../types/errors.js';
import type { LoginInput } from '../types/auth.types.js';

const jwtSecret = new TextEncoder().encode(environment.JWT_SECRET);

export async function login(input: LoginInput): Promise<{ token: string }> {
  const admin = await findAdminByUsername(input.usuario);
  const validPassword = admin
    ? await bcrypt.compare(input.contrasena, admin.Contrasena)
    : false;

  if (!admin || !validPassword) {
    throw new HttpError(401, 'Usuario o contrasena incorrectos');
  }

  const token = await new SignJWT({ usuario: admin.Usuario })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setSubject(String(admin.Identificador))
    .setIssuedAt()
    .setExpirationTime(environment.JWT_EXPIRES_IN)
    .sign(jwtSecret);

  return { token };
}

export { jwtSecret };
