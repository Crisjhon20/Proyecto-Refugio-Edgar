# Refugio Backend

API REST para autenticacion de administradores y administracion de animales.

## Instalacion

```bash
npm install
cp .env.example .env
```

Configura `DATABASE_URL` y `JWT_SECRET` en `.env`. La base de datos PostgreSQL debe existir y tener las tablas definidas en `../db/`.

La contrasena del administrador debe estar almacenada como hash bcrypt. La especificacion utiliza el usuario `feresdev` y la contrasena inicial `feresdev123`.

`CORS_ORIGIN` debe apuntar al origen donde se sirve Astro, por defecto `http://localhost:4321`.

En produccion:

- Usa un `DATABASE_URL` con credenciales gestionadas fuera del repositorio.
- Usa un `JWT_SECRET` aleatorio de al menos 16 caracteres.
- Configura `CORS_ORIGIN` con el dominio exacto del frontend.
- Sirve el backend y el frontend exclusivamente mediante HTTPS.
- No incluyas archivos `.env` en el control de versiones.

## Ejecucion

```bash
npm run dev
```

Para compilar y ejecutar:

```bash
npm run build
npm start
```

## Rutas

- `GET /health`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /animals`
- `PUT /animals/:id`
- `GET /animals`

Las rutas de animales requieren `Authorization: Bearer <token>`.
