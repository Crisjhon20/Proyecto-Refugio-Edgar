import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { AppVariables } from './types/auth.types.js';
import { environment } from './config/environment.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { authRoutes } from './routes/auth.routes.js';
import { animalRoutes } from './routes/animal.routes.js';

export const app = new Hono<{ Variables: AppVariables }>();

app.use('*', cors({ origin: environment.CORS_ORIGIN, allowHeaders: ['Content-Type', 'Authorization'], allowMethods: ['GET', 'POST', 'PUT', 'OPTIONS'] }));
app.onError(errorMiddleware);

app.get('/health', (c) => c.json({ status: 'ok' }));
app.route('/auth', authRoutes);
app.route('/animals', animalRoutes);
