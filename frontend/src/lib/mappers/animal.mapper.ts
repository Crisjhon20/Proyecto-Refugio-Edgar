import type { AnimalApi } from '../api/animals.api';

export type Animal = {
  id: number;
  nombre: string;
  raza: string;
  edad: number;
  sexo: 'Hembra' | 'Macho';
  fechaIngreso: string;
  tipoAnimal: 'Perro' | 'Gato';
};

export function mapAnimal(animal: AnimalApi): Animal {
  return {
    id: animal.Identificador,
    nombre: animal.Nombre,
    raza: animal.Raza,
    edad: animal.Edad,
    sexo: animal.Sexo,
    fechaIngreso: animal.FechaIngreso,
    tipoAnimal: animal.TipoAnimal,
  };
}
