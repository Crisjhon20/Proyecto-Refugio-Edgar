import { createAnimal, listAnimals, updateAnimal } from '../lib/api/animals.api';
import { mapAnimal } from '../lib/mappers/animal.mapper';
import { requireSession } from '../lib/auth/session';
import { animalValidator } from '../lib/validators/animal.validator';

const form = document.querySelector<HTMLFormElement>('#animal-form');
const errorBox = document.querySelector<HTMLElement>('#form-error');
const submitButton = document.querySelector<HTMLButtonElement>('#submit-animal');
const id = Number(form?.dataset.id || new URLSearchParams(window.location.search).get('id'));

function showError(message: string) {
  if (!errorBox) return;
  errorBox.textContent = message;
  errorBox.classList.remove('hidden');
}

async function loadEditAnimal() {
  if (!form || !id) return;
  try {
    const animals = await listAnimals();
    const animal = animals.map(mapAnimal).find((item) => item.id === id);
    if (!animal) throw new Error('Animal no encontrado');
    (form.elements.namedItem('nombre') as HTMLInputElement).value = animal.nombre;
    (form.elements.namedItem('raza') as HTMLInputElement).value = animal.raza;
    (form.elements.namedItem('edad') as HTMLInputElement).value = String(animal.edad);
    (form.elements.namedItem('sexo') as HTMLSelectElement).value = animal.sexo;
    (form.elements.namedItem('tipoAnimal') as HTMLSelectElement).value = animal.tipoAnimal;
  } catch (loadError) { showError(loadError instanceof Error ? loadError.message : 'No se pudo cargar el animal'); }
}

requireSession();
if (form?.dataset.mode === 'edit') void loadEditAnimal();

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!submitButton) return;
  errorBox?.classList.add('hidden');
  const data = new FormData(form);
  const result = animalValidator.safeParse({ nombre: data.get('nombre'), raza: data.get('raza'), edad: data.get('edad'), sexo: data.get('sexo'), tipoAnimal: data.get('tipoAnimal') });
  if (!result.success) { showError(result.error.issues[0]?.message ?? 'Revisa los datos'); return; }
  submitButton.disabled = true;
  submitButton.textContent = 'Guardando...';
  try {
    if (form.dataset.mode === 'edit') await updateAnimal(id, result.data);
    else await createAnimal(result.data);
    window.location.href = '/dashboard';
  } catch (saveError) {
    showError(saveError instanceof Error ? saveError.message : 'No se pudo guardar');
    submitButton.disabled = false;
    submitButton.textContent = form.dataset.mode === 'edit' ? 'Guardar cambios' : 'Registrar animal';
  }
});
