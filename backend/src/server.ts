import { serve } from '@hono/node-server';
import { app } from './app.js';
import { checkDatabaseConnection } from './config/database.js';
import { environment } from './config/environment.js';

try {
  await checkDatabaseConnection();
  console.log('Conexion con PostgreSQL establecida');

  serve({ fetch: app.fetch, port: environment.PORT }, (info) => {
    console.log(`API escuchando en http://localhost:${info.port}`);
  });
} catch (error) {
  console.error('No se pudo iniciar el backend:', error);
  process.exit(1);
}
