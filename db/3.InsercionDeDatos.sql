INSERT INTO "Administrador" ("Identificador", "Usuario", "Contrasena")
VALUES (1, 'feresdev', '$2b$08$P1HwtQX4oxg8fmmr0aIgH.ygxOhTKe4ocqFF.fOMDeC4A5ENa2KE2');

INSERT INTO "Animal" (
    "Identificador",
    "Nombre",
    "Raza",
    "Edad",
    "Sexo",
    "TipoAnimal"
)
VALUES
    (1, 'Michi', 'Europeo comun', 2, 'Hembra', 'Gato'),
    (2, 'Luna', 'Siames', 3, 'Hembra', 'Gato'),
    (3, 'Tigre', 'Bengala', 1, 'Macho', 'Gato'),
    (4, 'Nala', 'Persa', 4, 'Hembra', 'Gato'),
    (5, 'Simba', 'Angora', 2, 'Macho', 'Gato'),
    (6, 'Max', 'Labrador', 5, 'Macho', 'Perro'),
    (7, 'Bella', 'Pastor aleman', 3, 'Hembra', 'Perro'),
    (8, 'Rocky', 'Bulldog', 4, 'Macho', 'Perro'),
    (9, 'Coco', 'Poodle', 2, 'Hembra', 'Perro'),
    (10, 'Thor', 'Husky siberiano', 1, 'Macho', 'Perro');

-- Sincroniza las identidades despues de insertar identificadores explicitos.
SELECT setval(
    pg_get_serial_sequence('"Administrador"', 'Identificador'),
    (SELECT MAX("Identificador") FROM "Administrador"),
    true
);

SELECT setval(
    pg_get_serial_sequence('"Animal"', 'Identificador'),
    (SELECT MAX("Identificador") FROM "Animal"),
    true
);
