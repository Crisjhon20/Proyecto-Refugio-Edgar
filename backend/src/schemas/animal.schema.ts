import { z } from 'zod';

const sexoSchema = z.enum(['Hembra', 'Macho']);
const tipoAnimalSchema = z.enum(['Perro', 'Gato']);

export const animalInputSchema = z.object({
  nombre: z.string().trim().min(1),
  raza: z.string().trim().min(1),
  edad: z.coerce.number().int().nonnegative(),
  sexo: sexoSchema,
  tipoAnimal: tipoAnimalSchema,
});

export const animalIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const animalFiltersSchema = z.object({
  nombre: z.string().trim().min(1).optional(),
  raza: z.string().trim().min(1).optional(),
  sexo: sexoSchema.optional(),
  tipoAnimal: tipoAnimalSchema.optional(),
});
