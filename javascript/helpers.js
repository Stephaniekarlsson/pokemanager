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

function prettifyAbilities(abilities) {
    let prettified = '';

    abilities.forEach((ability, index) => {
        prettified += `${ability.ability.name.toUpperCase()[0] + ability.ability.name.slice(1)}`;

        if (index < abilities.length -1) {
            prettified += ',' + '<br>';
        }
    });

    return prettified;
}

function prettifyType(types) {
    let prettified = '';

    types.forEach((type, index) => {
        prettified += `${type.type.name.toUpperCase()[0] + type.type.name.slice(1)}`;

        // if (index < types.length -1) {
        //     prettified += '<br>';
        // }
    });

    return prettified;
}




export { ellipsify, displaySearchedPokemons, prettifyAbilities, prettifyType }