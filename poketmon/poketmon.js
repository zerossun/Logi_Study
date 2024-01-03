// const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
// const Pokemons = document.querySelector('#pokemons');
// const Detail = document.querySelector('#detail');
// try {
//   fetch(baseUrl)
//     .then((response) => {
//       const responseJson = response.json();
//       return responseJson;
//     })
//     .then((data) => {
//       const pokemons = data.results;
//       pokemons.forEach((pokemon) => {
//         document.getElementById('pokemons').insertAdjacentHTML(
//           'beforeend',
//           `<li onclick='detail("${pokemon.url}")'>${pokemon.name}</li>`,
//           `<li onclick='detail("${pokemon.url}")'>
//             </li>`
//         );
//       });
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// } catch (error) {
//   console.error(error);
// }

// const detail = (url) => {
//   try {
//     fetch(url)
//       .then((response) => response.json())
//       .then((pokemon) => {
//         document.getElementById('detail').innerHTML = '';
//         document.getElementById('detail').insertAdjacentHTML(
//           'beforeend',
//           `
//           <img src="${pokemon.sprites.front_default}" alt="${pokemon.korean_name}" />
//           <p>${pokemon.name}</p>
//             <p>ID : ${pokemon.id}</p>
//           `
//         );
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   } catch (error) {
//     console.error(error);
//   }
// };

// const fetchData = async () => {
//   const allPokemonData = [];
//   for (let i = 1; i <= 151; i++) {
//     const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
//     const speciesResponse = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon-species/${i}`
//     );
//     const koreanName = speciesResponse.data.names.find(
//       (name) => name.language.name === 'ko'
//     );
//     allPokemonData.push({ ...response.data, korean_name: koreanName.name });
//   }
//   setPokemonData(allPokemonData);
// };

// fetchData();

const pokedex = document.getElementById('pokedex');
const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name,
      image: result.sprites['front_default'],
      type: result.types.map((type) => type.type.name).join(', '),
      id: result.id,
    }));
    displayPokemon(pokemon);
  });
};
const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) => `
      <li class="card" style="padding: 2%;margin: 2%;list-style-type: none;">
          <img class="card-image" src="${pokeman.image}"/>
          <h2 class="card-title"> ${pokeman.name}</h2>
          <p class="card-subtitle">Type: ${pokeman.type}</p>
      </li>
    
  `
    )
    .join('');
  pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
