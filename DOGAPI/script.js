const breedSelect = document.getElementById('breedSelect');
const dogCard = document.getElementById('dogInfo');

const nameEl = document.getElementById('dogName');
const imgEl = document.getElementById('dogImg');
const tempEl = document.getElementById('dogTemperament');
const lifeEl = document.getElementById('dogLifeSpan');
const weightEl = document.getElementById('dogWeight');
const heightEl = document.getElementById('dogHeight');

let breeds = [];

async function loadBreeds() {
  const res = await fetch('https://api.thedogapi.com/v1/breeds');
  breeds = await res.json();

  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

breedSelect.addEventListener('change', async () => {
  const selectedId = breedSelect.value;
  if (!selectedId) return;

  const breed = breeds.find(b => b.id == selectedId);

  // Cargar imagen asociada a la raza
  const imgRes = await fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${selectedId}`);
  const imgData = await imgRes.json();

  nameEl.textContent = breed.name;
  imgEl.src = imgData[0]?.url || '';
  imgEl.alt = `Imagen de ${breed.name}`;
  tempEl.textContent = breed.temperament || 'No disponible';
  lifeEl.textContent = breed.life_span || 'No disponible';
  weightEl.textContent = `${breed.weight.metric} kg`;
  heightEl.textContent = `${breed.height.metric} cm`;

  dogCard.classList.remove('hidden');
});

loadBreeds();
