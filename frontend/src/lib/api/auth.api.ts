import { apiRequest } from './client';

export type LoginResponse = { token: string };

export function login(usuario: string, contrasena: string) {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ usuario, contrasena }),
  });
}

export function logout() {
  return apiRequest<{ message: string }>('/auth/logout', { method: 'POST' });
}
