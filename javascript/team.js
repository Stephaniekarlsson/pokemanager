import { ellipsify } from "./helpers.js";
const teamMembers = document.querySelector('.team-members')
const reserveContainer = document.querySelector('.reserve-container')
let myTeamList = [];
let reserveList =[];


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
                <img class="team-front-img" src="${pokemon.sprite}" alt="${pokemon.name}">
                <p class="team-pokemon-name">${ellipsify(pokemon.name)}</p>
            </div>
            <div class="add-btns">
                <button class="give-nickname" data-id="${pokemon.id}" data-name="${pokemon.name}">Give nickname</button>
                <button class="remove-from-team" data-id="${pokemon.id}" data-name="${pokemon.name}">Remove</button>
            </div>
        `;

        const giveNicknameBtn = teamItem.querySelector('.give-nickname');
        teamMembers.appendChild(teamItem);
        giveNicknameBtn.addEventListener('click', () => {
            console.log('smeknamnsknapp fungerar' + pokemon.name);
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
                <img class="team-front-img" src="${pokemon.sprite}" alt="${pokemon.name}">
                <p class="team-pokemon-name">${ellipsify(pokemon.name)}</p>
            </div>
            <div class="add-btns">
                <button class="give-nickname" data-id="${pokemon.id}" data-name="${pokemon.name}">Give nickname</button>
                <button class="remove-from-team" data-id="${pokemon.id}" data-name="${pokemon.name}">Remove</button>
            </div>
        `;
        reserveContainer.appendChild(reserveItem);
    });
}

export {displayMyTeam, displayReserves, myTeamList, reserveList}