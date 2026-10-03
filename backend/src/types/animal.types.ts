export type Animal = {
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

export type AnimalFilters = {
  nombre?: string;
  raza?: string;
  sexo?: 'Hembra' | 'Macho';
  tipoAnimal?: 'Perro' | 'Gato';
};
