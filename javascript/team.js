import { ellipsify } from "./helpers.js";
const teamMembers = document.querySelector('.team-members')
const reserveContainer = document.querySelector('.reserve-container')
const moreMembers = document.querySelector('.more-members')
const moveUpBtn = document.querySelector('.move-up')
const moveDownBtn = document.querySelector('.move-down')



let myTeamList = [];
let reserveList =[];


function memberAlert(){

    if (myTeamList.length === 1) {
        moreMembers.innerText = 'You need two more champions for your team'
        console.log('test 1');
    } else if (myTeamList.length === 2) {
        moreMembers.innerText = 'You need one more champions for your team'
        console.log('test 2');

    } else if (myTeamList.length === 3) {
        moreMembers.innerText = ''
        console.log('test 3');
    } else {
        moreMembers.innerText = 'You need three champions for your team!'
    }
}

let selectedPokemon; 

function createNickname(teamItem, pokemonNickname, pokemon) {
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

        if (pokemon) {
            pokemon.nickname = inputNicknameValue;
        }

    });
}
function moveOrRemove(teamItem, pokemon){
    const divMoveorRemove = document.createElement('div');
    divMoveorRemove.className = 'move-or-remove';
    divMoveorRemove.innerHTML = `
        <button class="remove-pokemon" type="submit">Remove</button>
        <button class="move-to-reserve" type="submit">Reserve</button>
    `;
    teamItem.appendChild(divMoveorRemove);

    const removePokemonBtn = divMoveorRemove.querySelector('.remove-pokemon');
    const moveToReserve = divMoveorRemove.querySelector('.move-to-reserve');

    removePokemonBtn.addEventListener('click', () => {
        removePokemon(pokemon.id, pokemon.name, pokemon.nickname);
        divMoveorRemove.remove();
    });

    moveToReserve.addEventListener('click', () => {
        moveFromTeam(pokemon);
        divMoveorRemove.remove();
    })
    
}

function moveFromTeam(pokemon) {
    const indexToMove = myTeamList.indexOf(pokemon)
    const movedItem = myTeamList.splice(indexToMove, 1)[0]
    
    if (reserveList.length > 0) {
        const moveFromReserveList = reserveList.shift();
        myTeamList.push(moveFromReserveList);
    }
    
    reserveList.push(movedItem)

    displayMyTeam()
    displayReserves()
    memberAlert()
}

function removePokemon(id, name, nickname) {

    const index = myTeamList.findIndex(pokemon => {
        return pokemon.id === id && pokemon.name === name && pokemon.nickname === nickname;
    });
    
    if (index !== -1) {
        myTeamList.splice(index, 1);
        displayMyTeam();
        memberAlert();
    } else {
        console.log('Pokemon not found in team.');
    }
}

function removePokemonReserve(id, name, nickname) {
    const index = reserveList.findIndex(pokemon => pokemon.id === id && pokemon.name === name && pokemon.nickname === nickname);
    if (index !== -1) {
        reserveList.splice(index, 1);
        displayReserves();
        memberAlert();
    }
}

function moveUpTeamMember(id, name, nickname) {
    const currentIndex = myTeamList.findIndex(pokemon => pokemon.id === id && pokemon.name === name && pokemon.nickname === nickname);
    if (currentIndex > 0) {

      [myTeamList[currentIndex - 1], myTeamList[currentIndex]] = [myTeamList[currentIndex], myTeamList[currentIndex - 1]];

      displayMyTeam();
      displayReserves();
    }
  }
  
  function moveDownTeamMember(id, name, nickname) {
    const currentIndex = myTeamList.findIndex(pokemon => pokemon.id === id && pokemon.name === name && pokemon.nickname === nickname);
    if (currentIndex < myTeamList.length - 1) {

      [myTeamList[currentIndex], myTeamList[currentIndex + 1]] = [myTeamList[currentIndex + 1], myTeamList[currentIndex]];
  
      displayMyTeam();
      displayReserves();
    }
  }

  function moveUpReserve(id, name, nickname) {
    const currentIndex = reserveList.findIndex(pokemon => pokemon.id === id && pokemon.name === name && pokemon.nickname === nickname);
    if (currentIndex > 0) {

      [reserveList[currentIndex - 1], reserveList[currentIndex]] = [reserveList[currentIndex], reserveList[currentIndex - 1]];
  
      displayMyTeam();
      displayReserves();
    }
  }
  
  function moveDownreserve(id, name, nickname) {
    const currentIndex = reserveList.findIndex(pokemon => pokemon.id === id && pokemon.name === name && pokemon.nickname === nickname);
    if (currentIndex < reserveList.length - 1) {

      [reserveList[currentIndex], reserveList[currentIndex + 1]] = [reserveList[currentIndex + 1], reserveList[currentIndex]];

      displayMyTeam();
      displayReserves();
    }
  }
  

function displayMyTeam() {
    teamMembers.innerHTML = ""; 
    myTeamList.forEach((pokemon, index) => {
        const teamItem = document.createElement('div');
        teamItem.className = 'team-item';
        teamItem.innerHTML = `
        <div class="placement-arrows">
            <p class="move-up">-</p>
            <p class="team-placement">${index + 1}</p>
            <p class="move-down">+</p>
        </div>
        <div class="pokemon-card">
            <div class="team-img-wrap">
                <button class="pokemon-name" data-bs-toggle="tooltip" data-bs-placement="top" title="${pokemon.name}">${ellipsify(pokemon.name)}</button>
                <div class="abilities-container">
                    <p class="abilities">Abilities</P>
                    <button class="abilities-info" data-bs-toggle="tooltip" data-bs-placement="top" title="${pokemon.abilities}">ⓘ</button>
                </div>
                <img class="team-front-img" src="${pokemon.sprite}" alt="${pokemon.name}">
                <p class="pokemon-nickname">${pokemon.nickname}</p>
            </div>
            <div class="add-btns">
                <button class="give-nickname" data-id="${pokemon.id}" data-name="${pokemon.name}">Give nickname</button>                    <button class="remove-from-team" data-id="${pokemon.id}" data-name="${pokemon.name}">Remove</button>
            </div>
        </div>
        `;

        teamMembers.appendChild(teamItem);

        const moveUpBtn = teamItem.querySelector('.move-up');
        if(index === 0){
            moveUpBtn.classList.add('invisible')
        } 
        moveUpBtn.addEventListener('click', () => {
          moveUpTeamMember(pokemon.id, pokemon.name, pokemon.nickname);
        });
      
        const moveDownBtn = teamItem.querySelector('.move-down');
        if(index === myTeamList.length -1){
            moveDownBtn.classList.add('invisible')
        } 
        moveDownBtn.addEventListener('click', () => {
          moveDownTeamMember(pokemon.id, pokemon.name, pokemon.nickname);
        });

        const giveNicknameBtn = teamItem.querySelector('.give-nickname');
        giveNicknameBtn.addEventListener('click', () => {
            selectedPokemon = pokemon;
            createNickname(teamItem, teamItem.querySelector('.pokemon-nickname'), selectedPokemon);
        });

        const removeBtn = teamItem.querySelector('.remove-from-team');
        removeBtn.addEventListener('click', () => {
            moveOrRemove(teamItem, pokemon)
        });
    });
}

function displayReserves() {
    reserveContainer.innerHTML = ""; 
    reserveList.forEach((pokemon, index) => {
        const reserveItem = document.createElement('div');
        reserveItem.className = 'team-item';
        reserveItem.innerHTML = `
        <div class="placement-arrows">
            <p class="move-up">-</p>
            <p class="team-placement">${index + 1}</p>
            <p class="move-down">+</p>
        </div>
        <div class="pokemon-card">
            <div class="team-img-wrap">
                <button class="pokemon-name" data-bs-toggle="tooltip" data-bs-placement="top" title="${pokemon.name}">${ellipsify(pokemon.name)}</button>
                <div class="abilities-container">
                    <p class="abilities">Abilities</P>
                    <button class="abilities-info" data-bs-toggle="tooltip" data-bs-placement="top" title="${pokemon.abilities}">ⓘ</button>
                </div>
                <img class="team-front-img" src="${pokemon.sprite}" alt="${pokemon.name}">
                <p class="pokemon-nickname">${pokemon.nickname}</p>
            </div>
            <div class="add-btns">
                <button class="give-nickname" data-id="${pokemon.id}" data-name="${pokemon.name}">Give nickname</button>
                <button class="remove-from-team" data-id="${pokemon.id}" data-name="${pokemon.name}">Remove</button>
            </div>
        </div>
        `;
        reserveContainer.appendChild(reserveItem);

        const moveUpBtn = reserveItem.querySelector('.move-up');
        if(index === 0){
            moveUpBtn.classList.add('invisible')
        } 
        moveUpBtn.addEventListener('click', () => {
          moveUpReserve(pokemon.id, pokemon.name, pokemon.nickname);
        });
      
        const moveDownBtn = reserveItem.querySelector('.move-down');
        if(index === reserveList.length -1){
            moveDownBtn.classList.add('invisible')
        } 
        moveDownBtn.addEventListener('click', () => {
          moveDownreserve(pokemon.id, pokemon.name, pokemon.nickname);
        });

        const giveNicknameBtn = reserveItem.querySelector('.give-nickname');
        giveNicknameBtn.addEventListener('click', () => {
            selectedPokemon = pokemon;
            createNickname(reserveItem, reserveItem.querySelector('.pokemon-nickname'), selectedPokemon);
        });

        const removeBtn = reserveItem.querySelector('.remove-from-team');
        removeBtn.addEventListener('click', () => {
        removePokemonReserve(pokemon.id, pokemon.name, pokemon.nickname);
        });
        
    });
}

export {displayMyTeam, displayReserves, myTeamList, reserveList, memberAlert}