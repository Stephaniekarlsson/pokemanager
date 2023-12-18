import { ellipsify } from "./helpers.js";
import { teamListCounter } from "./main.js";
const teamMembers = document.querySelector('.team-members')
const reserveContainer = document.querySelector('.reserve-container')
const moreMembers = document.querySelector('.more-members')
let myTeamList = [];
let reserveList =[];


function memberAlert(){

    if (teamListCounter === 1) {
        moreMembers.innerText = 'You need two more champions for your team'
        console.log('test 1');
    } else if (teamListCounter === 2) {
        moreMembers.innerText = 'You need one more champions for your team'
        console.log('test 2');

    } else if (teamListCounter === 3) {
        moreMembers.innerText = ''
        console.log('test 3');

    }
}


let selectedPokemon; 

function createNickname(teamItem, pokemonNickname) {
    const divNickname = document.createElement('div');
    divNickname.className = 'div-nickname';
    divNickname.innerHTML = `
        <label for="input-nickname">Create a Nickname</label>
        <input type="text" id="input-nickname" placeholder="Create nickname">
        <button class="btn-nickname" type="submit">Save</button>
    `;
    teamItem.appendChild(divNickname);

    const saveNickname = divNickname.querySelector('.btn-nickname');
    const inputNickname = divNickname.querySelector('#input-nickname');

    saveNickname.addEventListener('click', () => {
        let inputNicknameValue = inputNickname.value;
        pokemonNickname.textContent = inputNicknameValue;
        divNickname.remove();
        inputNicknameValue = '';
        selectedPokemon = null; 
    });
}


function removePokemon(id, name) {
    const index = myTeamList.findIndex(pokemon => pokemon.id === id && pokemon.name === name);
    if (index !== -1) {
        myTeamList.splice(index, 1);
        console.log('Removed from team:', myTeamList);
        // teamListCounter--;
        console.log('teamlist =', teamListCounter);
        displayMyTeam();
        memberAlert();
    }
}

function removePokemonReserve(id, name) {
    const index = reserveList.findIndex(pokemon => pokemon.id === id && pokemon.name === name);
    if (index !== -1) {
        reserveList.splice(index, 1);
        console.log('Removed from team:', reserveList);
        displayReserves();
        memberAlert();
    }
}



function displayMyTeam() {
    teamMembers.innerHTML = ""; 
    myTeamList.forEach(pokemon => {
        const teamItem = document.createElement('div');
        teamItem.className = 'team-item';
        teamItem.innerHTML = `
            <div class="team-number-wrap">
                <p class="team-number-id">#${pokemon.id}</p>
            </div>
            <div class="team-img-wrap">
                <p class="team-pokemon-name">${ellipsify(pokemon.name)}</p>
                <img class="team-front-img" src="${pokemon.sprite}" alt="${pokemon.name}">
                <p class="pokemon-nickname"></p>
            </div>
            <div class="add-btns">
                <button class="give-nickname" data-id="${pokemon.id}" data-name="${pokemon.name}">Give nickname</button>
                <button class="remove-from-team" data-id="${pokemon.id}" data-name="${pokemon.name}">Remove</button>
            </div>
        `;

        teamMembers.appendChild(teamItem);

        const giveNicknameBtn = teamItem.querySelector('.give-nickname');
        giveNicknameBtn.addEventListener('click', () => {
            console.log('smeknamnsknapp fungerar' + pokemon.name);
            selectedPokemon = pokemon;
            createNickname(teamItem, teamItem.querySelector('.pokemon-nickname'), selectedPokemon);
        });

        const removeBtn = teamItem.querySelector('.remove-from-team');
        removeBtn.addEventListener('click', () => {
        console.log('Remove button clicked for ' + pokemon.name);
        removePokemon(pokemon.id, pokemon.name);
        });
    });
}

function displayReserves() {
    reserveContainer.innerHTML = ""; 
    reserveList.forEach(pokemon => {
        const reserveItem = document.createElement('div');
        reserveItem.className = 'team-item';
        reserveItem.innerHTML = `
            <div class="team-number-wrap">
                <p class="team-number-id">#${pokemon.id}</p>
            </div>
            <div class="team-img-wrap">
                <p class="team-pokemon-name">${ellipsify(pokemon.name)}</p>
                <img class="team-front-img" src="${pokemon.sprite}" alt="${pokemon.name}">
                <p class="pokemon-nickname"></p>
            </div>
            <div class="add-btns">
                <button class="give-nickname" data-id="${pokemon.id}" data-name="${pokemon.name}">Give nickname</button>
                <button class="remove-from-team" data-id="${pokemon.id}" data-name="${pokemon.name}">Remove</button>
            </div>
        `;
        reserveContainer.appendChild(reserveItem);

        const giveNicknameBtn = reserveItem.querySelector('.give-nickname');
        giveNicknameBtn.addEventListener('click', () => {
            console.log('smeknamnsknapp fungerar' + pokemon.name);
            selectedPokemon = pokemon;
            createNickname(reserveItem, reserveItem.querySelector('.pokemon-nickname'), selectedPokemon);
        });

        const removeBtn = reserveItem.querySelector('.remove-from-team');
        removeBtn.addEventListener('click', () => {
        console.log('Remove button clicked for ' + pokemon.name);
        removePokemonReserve(pokemon.id, pokemon.name);
        });
        
    });
}

export {displayMyTeam, displayReserves, myTeamList, reserveList, memberAlert}