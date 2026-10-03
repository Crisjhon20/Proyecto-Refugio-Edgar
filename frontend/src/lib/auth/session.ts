const TOKEN_KEY = 'refugio.jwt';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function saveToken(token: string): void {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearSession(): void {
  window.localStorage.removeItem(TOKEN_KEY);
}

export function requireSession(): string {
  const token = getToken();
  if (!token) {
    window.location.href = '/login';
    throw new Error('Sesion requerida');
  }
  return token;
}
