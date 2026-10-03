import { clearSession, getToken } from '../auth/session';

const API_URL = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:3000';

export class ApiError extends Error {
  constructor(public readonly status: number, message: string, public readonly details?: unknown) {
    super(message);
  }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const payload = await response.json().catch(() => null);

  if (response.status === 401) {
    clearSession();
    if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }

  if (!response.ok) {
    throw new ApiError(response.status, payload?.error ?? 'No se pudo completar la solicitud', payload?.details);
  }

  return payload as T;
}
