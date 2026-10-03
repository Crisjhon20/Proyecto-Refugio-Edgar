import { createAnimal, listAnimals, updateAnimal } from '../repositories/animal.repository.js';
import { HttpError } from '../types/errors.js';
import type { AnimalFilters, AnimalInput } from '../types/animal.types.js';

export async function registerAnimal(input: AnimalInput) {
  return createAnimal(input);
}

export async function editAnimal(id: number, input: AnimalInput) {
  const animal = await updateAnimal(id, input);
  if (!animal) {
    throw new HttpError(404, 'Animal no encontrado');
  }
  return animal;
}

export async function getAnimals(filters: AnimalFilters) {
  return listAnimals(filters);
}
