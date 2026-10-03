import { login } from '../lib/api/auth.api';
import { saveToken } from '../lib/auth/session';
import { loginValidator } from '../lib/validators/auth.validator';

const form = document.querySelector<HTMLFormElement>('#login-form');
const errorBox = document.querySelector<HTMLElement>('#login-error');
const submitButton = document.querySelector<HTMLButtonElement>('#login-submit');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!errorBox || !submitButton) return;
  errorBox.classList.add('hidden');
  const formData = new FormData(form);
  const result = loginValidator.safeParse({
    usuario: formData.get('usuario'),
    contrasena: formData.get('contrasena'),
  });

  if (!result.success) {
    errorBox.textContent = result.error.issues[0]?.message ?? 'Revisa los datos';
    errorBox.classList.remove('hidden');
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Entrando...';
  try {
    const response = await login(result.data.usuario, result.data.contrasena);
    saveToken(response.token);
    window.location.href = '/dashboard';
  } catch (error) {
    errorBox.textContent = error instanceof Error ? error.message : 'No se pudo iniciar sesion';
    errorBox.classList.remove('hidden');
    submitButton.disabled = false;
    submitButton.textContent = 'Entrar al refugio';
  }
});
