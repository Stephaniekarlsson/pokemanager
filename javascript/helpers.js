import { pokemonList } from "./main.js";
function ellipsify (str) {
    if (str.length > 10) {
        return (str.substring(0, 10) + "...");
    }
    else {
    return str;
}
}

function displaySearchedPokemons(searchedPokemons) {
    pokemonList.innerHTML = "";
    
    searchedPokemons.forEach(pokemon => {
        if (pokemon.listItem) {
            pokemonList.appendChild(pokemon.listItem);
        }
    });
}

export { ellipsify, displaySearchedPokemons }