import type { Context } from 'hono';
import { animalFiltersSchema, animalIdSchema, animalInputSchema } from '../schemas/animal.schema.js';
import { editAnimal, getAnimals, registerAnimal } from '../services/animal.service.js';

export async function createAnimalController(c: Context) {
  const body = animalInputSchema.parse(await c.req.json());
  return c.json(await registerAnimal(body), 201);
}

export async function updateAnimalController(c: Context) {
  const { id } = animalIdSchema.parse(c.req.param());
  const body = animalInputSchema.parse(await c.req.json());
  return c.json(await editAnimal(id, body));
}

export async function listAnimalsController(c: Context) {
  const filters = animalFiltersSchema.parse({
    nombre: c.req.query('nombre'),
    raza: c.req.query('raza'),
    sexo: c.req.query('sexo'),
    tipoAnimal: c.req.query('tipoAnimal'),
  });

  return c.json(await getAnimals(filters));
}
