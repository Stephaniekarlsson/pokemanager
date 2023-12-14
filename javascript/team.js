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

function createNickname(){
    const teamItem = teamMembers.querySelector('.team-item');
    const pokemonNickname = teamItem.querySelector('.pokemon-nickname')
    const divNickname = document.createElement('div');
    divNickname.className = 'div-nickname';
        divNickname.innerHTML = `
        <label for="input-nickname">Create a Nickname</label>
        <input type="text" id="input-nickname" placeholder="Create nickname">
        <button class="btn-nickname" type="submit">Save</button>
        `;
        teamMembers.append(divNickname)

        const saveNickname = divNickname.querySelector('.btn-nickname')
        const inputNickname = divNickname.querySelector('#input-nickname')
        
        saveNickname.addEventListener('click', () => {
            let inputNicknameValue = inputNickname.value
            pokemonNickname.append(inputNicknameValue)
            divNickname.remove()
            inputNicknameValue = '';
        })
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
            createNickname()
        })
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
    });
}

export {displayMyTeam, displayReserves, myTeamList, reserveList, memberAlert}