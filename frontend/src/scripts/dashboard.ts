import { listAnimals } from '../lib/api/animals.api';
import { mapAnimal } from '../lib/mappers/animal.mapper';
import { requireSession } from '../lib/auth/session';

type FilterForm = HTMLFormElement & { reset: () => void };
const grid = document.querySelector<HTMLElement>('#animal-grid');
const count = document.querySelector<HTMLElement>('#animal-count');
const empty = document.querySelector<HTMLElement>('#animal-empty');
const error = document.querySelector<HTMLElement>('#animal-error');
const filterForm = document.querySelector<FilterForm>('#filter-form');

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character] ?? character);
}

function renderAnimals(animals: ReturnType<typeof mapAnimal>[]) {
  if (!grid || !count || !empty) return;
  count.textContent = `${animals.length} ${animals.length === 1 ? 'animal' : 'animales'}`;
  empty.classList.toggle('hidden', animals.length > 0);
    grid.innerHTML = animals.map((animal) => `
    <article class="group rounded-[1.75rem] border border-teal-900/10 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div class="relative h-32 overflow-hidden rounded-2xl ${animal.tipoAnimal === 'Perro' ? 'bg-yellow-100' : 'bg-teal-100'}">
        <img src="${animal.tipoAnimal === 'Perro' ? '/images/dog-card.jpg' : '/images/cat-card.jpg'}" alt="Imagen decorativa de ${animal.tipoAnimal.toLowerCase()}" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span class="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-teal-950">${escapeHtml(animal.tipoAnimal)}</span>
      </div>
      <div class="px-1 pt-4"><div class="flex items-start justify-between gap-2"><h2 class="display-text text-2xl text-teal-950">${escapeHtml(animal.nombre)}</h2><a class="focus-ring rounded-full px-2 py-1 text-xs font-bold text-teal-800 opacity-70 hover:bg-teal-900/5 hover:opacity-100" href="/dashboard/animals/edit?id=${animal.id}">Editar</a></div><p class="mt-1 text-sm font-semibold text-teal-900/55">${escapeHtml(animal.raza)} · ${animal.edad} ${animal.edad === 1 ? 'año' : 'años'}</p><p class="mt-4 text-xs font-bold text-teal-900/45">Ingreso: ${escapeHtml(animal.fechaIngreso)}</p></div>
    </article>`).join('');
}

async function loadAnimals() {
  requireSession();
  error?.classList.add('hidden');
  if (grid) grid.innerHTML = '<p class="col-span-full py-16 text-center text-sm font-bold text-teal-900/50">Cargando historias...</p>';
  try {
    const data = await listAnimals({
      nombre: (document.querySelector<HTMLInputElement>('[name="nombre"]')?.value || undefined),
      raza: (document.querySelector<HTMLInputElement>('[name="raza"]')?.value || undefined),
      sexo: (document.querySelector<HTMLSelectElement>('[name="sexo"]')?.value || undefined) as 'Hembra' | 'Macho' | undefined,
      tipoAnimal: (document.querySelector<HTMLSelectElement>('[name="tipoAnimal"]')?.value || undefined) as 'Perro' | 'Gato' | undefined,
    });
    renderAnimals(data.map(mapAnimal));
  } catch (loadError) {
    if (error) { error.textContent = loadError instanceof Error ? loadError.message : 'No se pudieron cargar los animales'; error.classList.remove('hidden'); }
    if (grid) grid.innerHTML = '';
  }
}

filterForm?.addEventListener('submit', (event) => { event.preventDefault(); void loadAnimals(); });
void loadAnimals();
