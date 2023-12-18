import { ellipsify, displaySearchedPokemons } from "./helpers.js";
import { getPokemons } from "./pokemons.actions.js";
import { displayMyTeam, displayReserves, myTeamList, reserveList, memberAlert } from "./team.js";
const pokemonList = document.querySelector('.pokemon-list');
const searchInput = document.querySelector('#search-input');
const url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
const championsBtn = document.querySelector('#champions-btn')
const myTeamBtn = document.querySelector('#myteam-btn')
const championView = document.querySelector('.champion-view')
const teamView = document.querySelector('.team-view')
const teamMaxSize = 3;

let teamListCounter = 0
let pokemons = [];


function addPokemonToReserve( id, name, sprite) {
        reserveList.push({ id, name, sprite });
        console.log('Added as reserve:', reserveList);
        displayReserves(id, name, sprite)
}

function addPokemonToTeam( id, name, sprite) {
    if (myTeamList.length < teamMaxSize) {
        myTeamList.push({ id, name, sprite});
        console.log('Added to team:', myTeamList);
        teamListCounter++
        console.log('teamlist =',teamListCounter);
        displayMyTeam(id, name, sprite)
        memberAlert()
    } else {
        addPokemonToReserve(id, name, sprite)
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
            }
           
            listItem.className = "list-item";
            listItem.innerHTML = `
                <div class="number-wrap">
                    <p class="number-id">#${pokemonInfo.id}</p>
                </div>
                <div class="img-wrap">
                    <img class="front-img" src="${pokemonInfo.sprite}" alt="${pokemonInfo.name}">
                    <p class="pokemon-name">${ellipsify(pokemonInfo.name)}</p>
                    <div class="add-btns">
                        <button class="add-to-team" data-id="${pokemonInfo.id}" data-name="${pokemonInfo.name}">Add to team</button>
                    </div>
                </div>
            `;
    
            pokemon.listItem = listItem;
            const addToTeamBtn = listItem.querySelector('.add-to-team');
            addToTeamBtn.addEventListener('click', () => {
                console.log('jag fungerar' + pokemonInfo.name);
                addPokemonToTeam(pokemonInfo.id, pokemonInfo.name, pokemonInfo.sprite)
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
});

championsBtn.addEventListener('click', () => {
    championView.style.display = 'block';
    teamView.classList.remove('team-visible')
});



export {pokemonList, teamListCounter} 

