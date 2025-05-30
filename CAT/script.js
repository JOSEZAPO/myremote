const factText = document.getElementById('factText');
const getFactBtn = document.getElementById('getFactBtn');

async function fetchCatFact() {
  try {
    const response = await fetch('https://catfact.ninja/fact');
    const data = await response.json();
    factText.textContent = data.fact;
  } catch (error) {
    factText.textContent = 'Ocurrió un error al obtener el dato 😿';
    console.error('Error al obtener el dato:', error);
  }
}

getFactBtn.addEventListener('click', fetchCatFact);

// Cargar uno automáticamente al abrir
fetchCatFact();
