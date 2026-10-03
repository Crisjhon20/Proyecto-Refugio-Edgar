import type { Hono } from 'hono';

export type AppVariables = {
  adminId: number;
};

export type AppType = Hono<{ Variables: AppVariables }>;

export type LoginInput = {
  usuario: string;
  contrasena: string;
};

export type AdminRecord = {
  Identificador: number;
  Usuario: string;
  Contrasena: string;
};
