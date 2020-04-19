const player = require('./player.js');
const gameboard = require('./gameboard.js');
const destroyer = require('./assets/destroyer.png');

const gameSetup = () => {
  const myBoard = document.getElementById('my-board');
  const mySpaces = Array.from(document.getElementsByClassName('my-space'));
  let computer = player();
  let human = player();
  let computerBoard = gameboard();
  let humanBoard = gameboard();
  let shipTypes = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrolboat'];

  let suffix = '';
  let direction = 'horizontal';
  computer.autoPlaceShips(computerBoard);

  const placeShips = () => {
    for (i = 0; i < mySpaces.length; i++) {
      mySpaces[i].addEventListener('click', placeShip);
    }
  };

  const placeShip = (e) => {
    let spaceIndex = mySpaces.indexOf(e.target);
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
      console.log('placing ship');
      let shipImage = document.createElement('div');
      shipImage.setAttribute('class', `${shipType} ${suffix}`);
      e.target.appendChild(shipImage);
      shipTypes.splice(0, 1);
    }
  };

  return {
    placeShips,
  };
};

module.exports = gameSetup;
