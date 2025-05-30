document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const input = document.getElementById('pokemonInput').value.toLowerCase().trim();
  if (!input) return;

  const url = `https://pokeapi.co/api/v2/pokemon/${input}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('No encontrado');

    const data = await res.json();
    showPokemon(data);
  } catch (err) {
    alert('Pokémon no encontrado. Intenta con otro nombre o número.');
  }
});

function showPokemon(pokemon) {
  document.getElementById('pokeName').textContent = `#${pokemon.id} - ${capitalize(pokemon.name)}`;
  document.getElementById('pokeImg').src = pokemon.sprites.other['official-artwork'].front_default;

  const types = pokemon.types.map(t => capitalize(t.type.name)).join(', ');
  document.getElementById('pokeTypes').textContent = types;

  const abilities = pokemon.abilities.map(a => capitalize(a.ability.name)).join(', ');
  document.getElementById('pokeAbilities').textContent = abilities;

  const stats = pokemon.stats.map(stat =>
    `<p><strong>${capitalize(stat.stat.name)}:</strong> ${stat.base_stat}</p>`
  ).join('');
  document.getElementById('pokeStats').innerHTML = stats;

  document.getElementById('pokemonCard').classList.remove('hidden');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
