const pokemonList = document.querySelector('.pokemon-list');
const searchInput = document.querySelector('#search-input');
const searchNotFound = document.querySelector('#search-not-found');
const errorMessage = document.querySelector('#error-message');
const listItem = document.createElement('div');
const url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
const championsBtn = document.querySelector('#champions-btn')
const myTeamBtn = document.querySelector('#myteam-btn')
const championView = document.querySelector('.champion-view')
const teamView = document.querySelector('.team-view')

// Lista för att förvara alla Pokémon
let pokemons = [];

async function getData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        errorMessage.textContent = 'Det gick inte att hämta datan. Försök igen om en stund!';
    }
}

async function displayPokemonsFront() {
    pokemonList.innerHTML = "";

    try {
        const pokemonData = await getData(url);
        pokemons = pokemonData.results;

        for (const pokemon of pokemons) {
            const listItem = document.createElement('div');
            const pokemonData = await getData(pokemon.url);
            const pokemonId = pokemonData.id;
            const pokemonName = pokemonData.name;
            const spriteFront = pokemonData.sprites.front_default;
            const nameFirstLetter = pokemonName[0].toUpperCase() + pokemonName.slice(1);

            listItem.className = "list-item";
            const imgSrc = spriteFront ? spriteFront : "./bilder/no-sprite.png";
            listItem.innerHTML = `
                <div class="number-wrap">
                    <p class="number-id">#${pokemonId}</p>
                </div>
                <div class="img-wrap">
                    <img class="front-img" src="${imgSrc}" alt="${pokemonName}">
                    <p class="pokemon-name">${nameFirstLetter}</p>
                    <div class="add-btns">
                        <button class="add-to-team" data-id="${pokemonId}" data-name="${pokemonName}">Add to team</button>
                    </div>
                </div>
            `;

            pokemon.listItem = listItem;

            pokemonList.appendChild(listItem);
        }
    } catch (error) {
        console.error('Något gick fel! Testa igen om en stund', error);
    }
}

displayPokemonsFront();


searchInput.addEventListener('input',() => {
    const searchValue = searchInput.value.toLowerCase()

    const searchedPokemons = pokemons.filter(pokemon => pokemon.name.includes(searchValue));

    displaySearchedPokemons(searchedPokemons);
    
});

function displaySearchedPokemons(searchedPokemons) {
    pokemonList.innerHTML = "";
    
    searchedPokemons.forEach(pokemon => {
        pokemonList.appendChild(pokemon.listItem);
    });
}




