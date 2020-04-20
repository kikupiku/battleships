const player = require('./player.js');
const gameboard = require('./gameboard.js');
const beginGame = require('./game.js');

const gameSetup = () => {
  const myBoard = document.getElementById('my-board');
  const restart = document.getElementById('restart');
  const status = document.getElementById('status');
  const win = document.getElementById('win');
  const fail = document.getElementById('fail');
  const setupInstruction = document.getElementById('setup-instruction');
  const mySpaces = Array.from(document.getElementsByClassName('my-space'));
  const enemySpaces = Array.from(document.getElementsByClassName('enemy-space'));
  let computer = player();
  let human = player();
  let computerBoard = gameboard();
  let humanBoard = gameboard();
  let shipTypes = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrolboat'];

  let suffix = '';
  let direction = 'horizontal';
  computer.autoPlaceShips(computerBoard);
  restart.style.display = 'none';
  win.style.display = 'none';

  const placeShips = () => {
    for (i = 0; i < mySpaces.length; i++) {
      mySpaces[i].addEventListener('mouseover', hover);
      mySpaces[i].addEventListener('click', placeShip);
    }

    myBoard.addEventListener('wheel', changeDirection);
  };

  const hover = (e) => {
    let oldImg = document.getElementsByClassName('ship')[0];
    if (oldImg) {
      if (oldImg.parentElement !== e.currentTarget) {
        removeOldShip(oldImg);
        addNewShip(e);
      }
    } else {
      addNewShip(e);
    }
  };

  const removeOldShip = (oldImg) => {
    oldImg.parentElement.removeChild(oldImg);
  };

  const addNewShip = (event) => {
    let img = document.createElement('div');
    img.setAttribute('class', `ship ${shipTypes[0]} ${suffix}`);
    event.currentTarget.appendChild(img);
  };

  const placeShip = (e) => {
    let spaceIndex = mySpaces.indexOf(e.currentTarget);
    let shipType = shipTypes[0];
    let placedShipsNum = humanBoard.ships.length;

    if (shipType === 'carrier') {
      humanBoard.placeShip(5, spaceIndex, direction);
    } else if (shipType === 'battleship') {
      humanBoard.placeShip(4, spaceIndex, direction);
    } else if (shipType === 'destroyer') {
      humanBoard.placeShip(3, spaceIndex, direction);
    } else if (shipType === 'submarine') {
      humanBoard.placeShip(3, spaceIndex, direction);
    } else if (shipType === 'patrolboat') {
      humanBoard.placeShip(2, spaceIndex, direction);
    }

    if (humanBoard.ships.length > placedShipsNum) {
      let shipImage = document.createElement('div');
      shipImage.setAttribute('class', `${shipType} ${suffix}`);
      e.currentTarget.appendChild(shipImage);
      shipTypes.splice(0, 1);
    }

    if (shipTypes.length === 0) {
      mySpaces.forEach((mySpace) => {
        mySpace.removeEventListener('click', placeShip);
      });
      let round = beginGame(computer, human, computerBoard, humanBoard);
      if (round.win) {
        restart.addEventListener('click', reset);
      }
    }
  };

  const changeDirection = (event) => {
    if (event.wheelDelta < 0) {
      suffix = '';
      direction = 'horizontal';
    } else if (event.wheelDelta > 0) {
      suffix = 'vert';
      direction = 'vertical';
    }

    let img = document.getElementsByClassName('ship')[0];
    img.setAttribute('class', `ship ${shipTypes[0]} ${suffix}`);
  };

  const reset = () => {
    status.textContent = 'Place your ships!';
    mySpaces.forEach((mySpace) => {
      mySpace.innerHTML = '';
    });
    enemySpaces.forEach((enemySpace) => {
      enemySpace.innerHTML = '';
    });
    fail.style.display = 'none';
    win.style.display = 'none';
    restart.style.display = 'none';
    setupInstruction.style.display = 'block';
    shipTypes = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrolboat'];
    humanBoard = gameboard();
    computerBoard = gameboard();
    computer.autoPlaceShips(computerBoard);
    placeShips();
  };

  return {
    placeShips,
  };
};

module.exports = gameSetup;
