const player = require('./player.js');
const gameboard = require('./gameboard.js');
const destroyer = require('./assets/destroyer.png');

const gameSetup = () => {
  let computer = player();
  let human = player();
  let computerBoard = gameboard();
  let humanBoard = gameboard();
  let shipTypes = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrolboat'];
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
  };

  const placeShip = (targetElement, shipType, startingCoord, direction) => {
    targetElement.addEventListener('click', () => {
      let classNameCheck = targetElement.className.length;
      console.log('number', classNameCheck);
      if (shipType === 'carrier' && classNameCheck <= 8) {
        humanBoard.placeShip(5, startingCoord, direction);
      } else if (shipType === 'battleship' && classNameCheck < 8) {
        humanBoard.placeShip(4, startingCoord, direction);
      } else if (shipType === 'destroyer' && classNameCheck < 8) {
        humanBoard.placeShip(3, startingCoord, direction);
      } else if (shipType === 'submarine' && classNameCheck < 8) {
        humanBoard.placeShip(3, startingCoord, direction);
      } else if (shipType === 'patrolboat' && classNameCheck < 8) {
        humanBoard.placeShip(2, startingCoord, direction);
      }

      console.log('target: ', targetElement);
      targetElement.setAttribute('class', `my-space ${shipType}`);
      shipTypes = shipTypes.splice(0, 1);
    });
  };

  return {
    placeShips,
  };
};

module.exports = gameSetup;
