import { Hono } from 'hono';
import { loginController, logoutController } from '../controllers/auth.controller.js';

export const authRoutes = new Hono();

authRoutes.post('/login', loginController);
authRoutes.post('/logout', logoutController);
