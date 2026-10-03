# Refugio Frontend

Frontend Astro para la API de Refugio.

## Configuracion

Copia `.env.example` como `.env` y configura `PUBLIC_API_URL` con la URL del backend.

En produccion:

- Usa una URL HTTPS para `PUBLIC_API_URL`.
- Configura `CORS_ORIGIN` del backend con el dominio exacto del frontend.
- No guardes secretos en variables `PUBLIC_*`.
- Sirve el frontend mediante HTTPS porque la sesion utiliza `localStorage`.

Las fotografias de perros y gatos en `public/images/` son recursos genericos decorativos obtenidos de Unsplash; no representan animales registrados ni animales de la Fundacion Angelitos de Edgar.
