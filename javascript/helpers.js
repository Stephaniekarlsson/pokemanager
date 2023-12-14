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


// function createNickname(){
//     const teamItem = teamMembers.querySelector('team-item')
//     const divNickname = document.createElement('div');
//     divNickname.className = 'div-nickname';
//         divNickname.innerHTML = `
//         <label for="input-nickname">Create a Nickname</label>
//         <input type="text" id="input-nickname" placeholder="Create nickname">
//         <button class="btn-nickname" type="submit">Save</button>
//         `;
//     teamMembers.append(divNickname)

//     const inputNickname = divNickname.querySelector('#input-nickname')
//     const saveNickname = divNickname.querySelector('.btn-nickname')
//     const teamItemNickname = teamItem.querySelector('.pokemon-nickname');

//     saveNickname.addEventListener('click', () => {
//         const inputNicknameValue = inputNickname.value;
//         teamItemNickname.textContent = inputNicknameValue;
//         inputNickname.value = '';
//     })
// }

{/* <div class="add-btns">
<button class="give-nickname" data-id="${pokemon.id}" data-name="${pokemon.name}">Give nickname</button>
<button class="remove-from-team" data-id="${pokemon.id}" data-name="${pokemon.name}">Remove</button>
</div>

<div class="add-btns">
<button class="give-nickname" data-id="${pokemon.id}" data-name="${pokemon.name}">Give nickname</button>
<button class="remove-from-team" data-id="${pokemon.id}" data-name="${pokemon.name}">Remove</button>
</div> */}