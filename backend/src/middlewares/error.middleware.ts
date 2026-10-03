import type { ErrorHandler } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import { ZodError } from 'zod';
import { HttpError } from '../types/errors.js';

export const errorMiddleware: ErrorHandler = (error, c) => {
  if (error instanceof ZodError) {
    return c.json({ error: 'Datos invalidos', details: error.flatten() }, 400);
  }

  if (error instanceof HttpError) {
    return c.json(
      { error: error.message, details: error.details },
      error.status as ContentfulStatusCode,
    );
  }

  console.error(error);
  return c.json({ error: 'Error interno del servidor' }, 500);
};
