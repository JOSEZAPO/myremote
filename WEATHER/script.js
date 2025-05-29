document.getElementById('weatherForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const city = document.getElementById('cityInput').value;
  if (!city) return;

  const coords = await getCoordinates(city);
  if (!coords) {
    alert("Ciudad no encontrada.");
    return;
  }

  const { latitude, longitude, name, country } = coords;
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m&current_weather=true&timezone=auto`);
  const data = await response.json();

  const temperature = data.current_weather.temperature;
  const humidity = data.hourly.relative_humidity_2m[0];

  document.getElementById('locationName').textContent = `${name}, ${country}`;
  document.getElementById('temperature').textContent = temperature;
  document.getElementById('humidity').textContent = humidity;

  document.getElementById('weatherResult').classList.remove('hidden');
});

// Función para obtener coordenadas desde una ciudad usando Nominatim
async function getCoordinates(cityName) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.length === 0) return null;

    return {
      latitude: data[0].lat,
      longitude: data[0].lon,
      name: data[0].display_name.split(',')[0],
      country: data[0].display_name.split(',').pop().trim()
    };
  } catch (error) {
    console.error("Error obteniendo coordenadas:", error);
    return null;
  }
}
