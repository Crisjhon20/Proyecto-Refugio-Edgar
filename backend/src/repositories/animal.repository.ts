import { pool } from '../config/database.js';
import type { Animal, AnimalFilters, AnimalInput } from '../types/animal.types.js';

export async function createAnimal(input: AnimalInput): Promise<Animal> {
  const result = await pool.query<Animal>(
    `INSERT INTO "Animal" ("Nombre", "Raza", "Edad", "Sexo", "TipoAnimal")
     VALUES ($1, $2, $3, $4, $5)
     RETURNING "Identificador", "Nombre", "Raza", "Edad", "Sexo", "FechaIngreso", "TipoAnimal"`,
    [input.nombre, input.raza, input.edad, input.sexo, input.tipoAnimal],
  );

  return result.rows[0];
}

export async function updateAnimal(id: number, input: AnimalInput): Promise<Animal | null> {
  const result = await pool.query<Animal>(
    `UPDATE "Animal"
     SET "Nombre" = $1, "Raza" = $2, "Edad" = $3, "Sexo" = $4, "TipoAnimal" = $5
     WHERE "Identificador" = $6
     RETURNING "Identificador", "Nombre", "Raza", "Edad", "Sexo", "FechaIngreso", "TipoAnimal"`,
    [input.nombre, input.raza, input.edad, input.sexo, input.tipoAnimal, id],
  );

  return result.rows[0] ?? null;
}

export async function listAnimals(filters: AnimalFilters): Promise<Animal[]> {
  const conditions: string[] = [];
  const values: string[] = [];

  if (filters.nombre) {
    values.push(`%${filters.nombre}%`);
    conditions.push(`"Nombre" ILIKE $${values.length}`);
  }
  if (filters.raza) {
    values.push(`%${filters.raza}%`);
    conditions.push(`"Raza" ILIKE $${values.length}`);
  }
  if (filters.sexo) {
    values.push(filters.sexo);
    conditions.push(`"Sexo" = $${values.length}`);
  }
  if (filters.tipoAnimal) {
    values.push(filters.tipoAnimal);
    conditions.push(`"TipoAnimal" = $${values.length}`);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const result = await pool.query<Animal>(
    `SELECT "Identificador", "Nombre", "Raza", "Edad", "Sexo", "FechaIngreso", "TipoAnimal"
     FROM "Animal" ${where} ORDER BY "Identificador"`,
    values,
  );

  return result.rows;
}
