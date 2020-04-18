const player = require('./player.js');
const gameboard = require('./gameboard.js');
const destroyer = require('./assets/destroyer.png');

const gameSetup = () => {
  let computer = player();
  let human = player();
  let computerBoard = gameboard();
  let humanBoard = gameboard();
  computer.autoPlaceShips(computerBoard);

  let placeShips = () => {
    const status = document.getElementById('game-status');
    status.innerHTML = 'Welcome to the game of Battleship! </br> </br> Let\'s start by putting ships on your board. </br> </br> Scroll up and down to change ship position </br> </br> Click to place.';
    const myBoard = document.getElementById('my-board');
    const mySpaces = document.getElementsByClassName('my-space');
    myBoard.addEventListener('mouseover', (e) => {
      console.log(humanBoard);
      for (let i = 0; i < 100; i++) {
        if (mySpaces[i] === e.target) {
          let coord = i;
          console.log('coord: ', i);
          let img = document.getElementsByClassName('ship')[0];
          if (img) {
            img.parentElement.removeChild(img);
          }

          hoverShipOfType(e.target, coord);
        }
      }
    });
  };

  let suffix = '';
  const hoverShipOfType = (targetElement, startingCoord) => {
    const shipTypes = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrolboat'];
    targetElement.addEventListener('wheel', (event) => {
      if (event.wheelDelta < 0) {
        suffix = '';
        if (img) {
          img.setAttribute('class', `ship ${shipTypes[0]}${suffix}`);
        }
      } else if (event.wheelDelta > 0) {
        suffix = 'vert';
        if (img) {
          img.setAttribute('class', `ship ${shipTypes[0]}${suffix}`);
        }
      }
    });
    let img = document.createElement('div');
    img.setAttribute('class', `ship ${shipTypes[0]}${suffix}`);
    targetElement.appendChild(img);
    let direction = (suffix === 'vert') ? 'vertical' : 'horizontal';
    placeShip(targetElement, shipTypes[0], startingCoord, direction);
    shipTypes.splice(0, 1);
  };

  const placeShip = (targetElement, shipType, startingCoord, direction) => {
    targetElement.addEventListener('click', () => {
      if (shipType === 'carrier') {
        humanBoard.placeShip(5, startingCoord, direction);
      } else if (shipType === 'battleship') {
        humanBoard.placeShip(4, startingCoord, direction);
      } else if (shipType === 'destroyer') {
        humanBoard.placeShip(3, startingCoord, direction);
      } else if (shipType === 'submarine') {
        humanBoard.placeShip(3, startingCoord, direction);
      } else if (shipType === 'patrolboat') {
        humanBoard.placeShip(2, startingCoord, direction);
      }

    });
  };

  return {
    placeShips,
  };
};

module.exports = gameSetup;
