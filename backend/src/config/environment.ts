import 'dotenv/config';
import { z } from 'zod';

const environmentSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default('1h'),
  BCRYPT_ROUNDS: z.coerce.number().int().min(4).max(31).default(8),
  CORS_ORIGIN: z.string().url().default('http://localhost:4321'),
});

const parsedEnvironment = environmentSchema.safeParse(process.env);

if (!parsedEnvironment.success) {
  console.error('Configuracion de entorno invalida:', parsedEnvironment.error.flatten().fieldErrors);
  throw new Error('Configuracion de entorno invalida');
}

export const environment = parsedEnvironment.data;
