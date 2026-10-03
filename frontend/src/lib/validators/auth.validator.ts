import { z } from 'zod';

export const loginValidator = z.object({
  usuario: z.string().trim().min(1, 'Ingresa tu usuario').max(15, 'Maximo 15 caracteres'),
  contrasena: z.string().min(1, 'Ingresa tu contrasena').max(60, 'Maximo 60 caracteres'),
});
