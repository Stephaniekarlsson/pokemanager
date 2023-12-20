import { ellipsify, displaySearchedPokemons, prettifyAbilities, prettifyType } from "./helpers.js";
import { getPokemons } from "./pokemons.actions.js";
import { displayMyTeam, displayReserves, myTeamList, reserveList, memberAlert } from "./team.js";
const pokemonList = document.querySelector('.pokemon-list');
const searchInput = document.querySelector('#search-input');
const url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
const championsBtn = document.querySelector('#champions-btn')
const myTeamBtn = document.querySelector('#myteam-btn')
const championView = document.querySelector('.champion-view')
const teamView = document.querySelector('.team-view')
const searchWrapper = document.querySelector('.search-wrapper')
const teamMaxSize = 3;

let pokemons = [];

function addPokemonToReserve( id, name, sprite, abilities, type) {
        const newPokemon = { id, name, sprite, nickname: "", abilities, type };
        reserveList.push(newPokemon);
        displayReserves(id, name, sprite, abilities, type)
}

function addPokemonToTeam(id, name, sprite, abilities, type) {
    if (myTeamList.length < teamMaxSize) {
        const newPokemon = { id, name, sprite, nickname: "", abilities, type };
        myTeamList.push(newPokemon);
        displayMyTeam();
        memberAlert();
    } else {
        addPokemonToReserve(id, name, sprite, abilities, type);
    }
} 


async function createAllPokemonCards() {
    pokemonList.innerHTML = "";
    
    try {
        const pokemonData = await getPokemons(url);
        pokemons = pokemonData.results; 
        pokemons.map(async pokemon => {
            const listItem = document.createElement('div');
            const pokemonData = await getPokemons(pokemon.url);
            const pokemonInfo = {
                id: pokemonData.id,
                name: pokemonData['name'][0].toUpperCase() + pokemonData['name'].slice(1),
                sprite: pokemonData.sprites?.front_default ?? "./bilder/no-sprite.png",
                nickname: '',
                abilities: prettifyAbilities(pokemonData.abilities),
                type: pokemonData.types.map((type) => type.type.name.toUpperCase()[0] + type.type.name.slice(1))
            }
          
            listItem.className = "list-item";
            listItem.innerHTML = `
            <div class="pokemon-card">
                <div class="img-wrap">
                    <button class="pokemon-name" data-bs-toggle="tooltip" data-bs-placement="top" title="${pokemonInfo.name}">${ellipsify(pokemonInfo.name)}</button>
                    <div class="abilities-container">
                        <p class="abilities">Abilities</p>
                        <p class="abilities-info">${pokemonInfo.abilities}</button>
                    </div>
                    <img class="front-img" src="${pokemonInfo.sprite}" alt="${pokemonInfo.name}">
                    <p class="pokemon-type">${pokemonInfo.type[0]}</p>
                    <p class="pokemon-type invisible">${pokemonInfo.type[1]}</p>
                </div>
            </div>
            <div class="add-btns">
                <button class="add-to-team" data-id="${pokemonInfo.id}" data-name="${pokemonInfo.name}">Add to team</button>
           </div>
    
            `;
            
            const types = pokemonInfo.type

            const pokemonType1 = listItem.querySelector('.pokemon-type');
            const pokemonType2 = listItem.querySelector('.pokemon-type.invisible');
            
            types.forEach((type, index) => {
                const lowercaseType = type.toLowerCase();
                const targetElement = index === 0 ? pokemonType1 : pokemonType2;
                
                targetElement.classList.add(`${lowercaseType}-type`);
                
                if (index === 1) {
                    targetElement.classList.remove('invisible');
                }
            });
            
            

            pokemon.listItem = listItem;
            
            const addToTeamBtn = listItem.querySelector('.add-to-team');
            addToTeamBtn.addEventListener('click', () => {
                const originalText = addToTeamBtn.innerText;

                addToTeamBtn.innerText = 'Added!';
    
                setTimeout(() => {
                    addToTeamBtn.innerText = originalText;
                }, 1500);

                addPokemonToTeam(pokemonInfo.id, pokemonInfo.name, pokemonInfo.sprite, pokemonInfo.abilities, pokemonInfo.type)

             });
            pokemonList.appendChild(listItem);
        });

    } catch (error) {
        console.error('Något gick fel! Testa igen om en stund', error);
    }
}
createAllPokemonCards()

searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase()
    if (searchValue !==' ') {
        const searchedPokemons = pokemons.filter(pokemon => pokemon.name.includes(searchValue));
        displaySearchedPokemons(searchedPokemons);
    } 
})

myTeamBtn.addEventListener('click', () => {
    teamView.classList.add('team-visible')
    championView.style.display = 'none';
    searchWrapper.style.display = 'none'
});

championsBtn.addEventListener('click', () => {
    championView.style.display = 'block';
    teamView.classList.remove('team-visible')
    searchWrapper.style.display = 'block'

});



export {pokemonList} 

