import { apiRequest } from './client';

export type AnimalApi = {
  Identificador: number;
  Nombre: string;
  Raza: string;
  Edad: number;
  Sexo: 'Hembra' | 'Macho';
  FechaIngreso: string;
  TipoAnimal: 'Perro' | 'Gato';
};

export type AnimalInput = {
  nombre: string;
  raza: string;
  edad: number;
  sexo: 'Hembra' | 'Macho';
  tipoAnimal: 'Perro' | 'Gato';
};

export type AnimalFilters = Partial<Pick<AnimalInput, 'nombre' | 'raza' | 'sexo' | 'tipoAnimal'>>;

export function listAnimals(filters: AnimalFilters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, String(value));
  });
  const query = params.toString();
  return apiRequest<AnimalApi[]>(`/animals${query ? `?${query}` : ''}`);
}

export function createAnimal(input: AnimalInput) {
  return apiRequest<AnimalApi>('/animals', { method: 'POST', body: JSON.stringify(input) });
}

export function updateAnimal(id: number, input: AnimalInput) {
  return apiRequest<AnimalApi>(`/animals/${id}`, { method: 'PUT', body: JSON.stringify(input) });
}
