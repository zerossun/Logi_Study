// let pokemons = [];
// const poke_container = document.getElementById('poke_container');
// const url = 'https://pokeapi.co/api/v2/pokemon';
// const pokemon_num = 151;
// const search = document.getElementById('search');
// const form = document.getElementById('form');

// const fetchPokemons = async () => {
//   for (let i = 1; i <= pokemon_num; i++) {
//     await getALLpokemon(i);
//   }
//   pokemons.forEach((pokemon) => createpokemonCard(pokemon));
// };

// const removePokemon = () => {
//   const pokemonELs = document.getElementsByClassName('pokemon');
//   let removablePokemons = [];
//   for (let i = 0; i < pokemonELs.length; i++) {
//     const pokemonEL = pokemonEls[i];
//     removablePokemons = [...removablePokemons, pokemonEl];
//   }
//   removablePokemons.forEach((remPoke) => remPoke.remove());
// };
// const getPokemon = async (id) => {
//   const searchPoketmons = pokemons.filter((poke) => poke.name === id);
//   removePokemon();
//   searchPoketmons.forEach((pokemon) => createpokemonCard(pokemon));
// };
// const getALLpokemon = async (id) => {
//   const res = await fetch(`${url}/${id}`);
//   const pokemon = await res.json();
//   pokemons = [...pokemons, pokemon];
// };
// fetchPokemons();

// function createpokemonCard(pokemon) {``
//   const pokemonEL = document.createElement('div');
//   pokemonEL.classList.add('pokemon');
//   const poke_types = pokemon.types.map((el) => el.type.name).slice(0, 1);
//   const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
//   const poke_stat = pokemon.stats.map((el) => el.stat.name);41+
//   const stats = poke_stat.slice(0, 3);
//   const base_value = pokemon.stats.map((el) => el.base_stat);
//   const base_stat = base_value.slice(0, 3);
//   const stat = stats
//     .map((stat) => {
//       return `<li class="base">${stat}</li>`;
//     })
//     .join('');
//   const base = base_stat
//     .map((base) => {
//       return `<li class="base">${base}</li>`;
//     })
//     .join('');
//   const pokeinnerHTML = `<div class='img-container>
//     <img src="https://pokeres.bastionbot.org/images/pokemon/${
//       pokemon.id
//     }.png" alt="${name}"/>
//     </div>
//     <div class="info">
//       <span class="number">#${pokemon.id.toString().padStart(3, '0')}
//       </span>
//       <h3 class="name">${name}</h3>
//       <small class="type"><span>${poke_types}</span></small>
//     </div>
//     <div class="stats">
//     <h2>Stats</h2>
//     <div class="flex">
//     <ul>${stat}</ul>
//     <ul>${base}</ul>
//     </div>
//     </div>
//     `;
//   pokemonEL.innerHTML = pokeinnerHTML;
//   poke_container.appendChild(pokemonEl);
// }
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const searchItem = search.nodeValue;
//   if (searchTerm) {
//     getPokemon(searchTerm);
//     search.value = '';
//   } else if (searchTerm === '') {
//     pokemons = [];
//     removePokemon();
//     fetchPokemons();
//   }
// });

fetch('https://pokeapi.co/api/v2/pokemon/ditto')
  .then((response) => response.json())
  .then((json) => console.log(json));
