import { Hono } from 'hono';
import { createAnimalController, listAnimalsController, updateAnimalController } from '../controllers/animal.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import type { AppVariables } from '../types/auth.types.js';

export const animalRoutes = new Hono<{ Variables: AppVariables }>();

animalRoutes.use('*', authMiddleware);
animalRoutes.post('/', createAnimalController);
animalRoutes.put('/:id', updateAnimalController);
animalRoutes.get('/', listAnimalsController);
