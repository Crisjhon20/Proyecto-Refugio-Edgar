import { logout } from '../lib/api/auth.api';
import { clearSession, getToken } from '../lib/auth/session';

const logoutButtons = document.querySelectorAll<HTMLButtonElement>('[data-logout-button]');

if (!getToken() && window.location.pathname.startsWith('/dashboard')) {
  window.location.href = '/login';
}

logoutButtons.forEach((logoutButton) => logoutButton.addEventListener('click', async () => {
  try { await logout(); } catch { /* La sesion local se elimina aunque el servidor no responda. */ }
  clearSession();
  window.location.href = '/login';
}));
