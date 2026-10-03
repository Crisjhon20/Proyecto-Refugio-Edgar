import { z } from 'zod';

export const animalValidator = z.object({
  nombre: z.string().trim().min(1, 'El nombre es obligatorio'),
  raza: z.string().trim().min(1, 'La raza es obligatoria'),
  edad: z.coerce.number().int('La edad debe ser entera').nonnegative('La edad no puede ser negativa'),
  sexo: z.enum(['Hembra', 'Macho'], 'Selecciona el sexo'),
  tipoAnimal: z.enum(['Perro', 'Gato'], 'Selecciona el tipo de animal'),
});
