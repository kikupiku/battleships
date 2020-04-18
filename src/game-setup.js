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
          img.setAttribute('class', `ship ${shipTypes[0]} ${suffix}`);
        }
      } else if (event.wheelDelta > 0) {
        suffix = 'vert';
        if (img) {
          img.setAttribute('class', `ship ${shipTypes[0]} ${suffix}`);
        }
      }
    });
    let img = document.createElement('div');
    img.setAttribute('class', `ship ${shipTypes[0]} ${suffix}`);
    targetElement.appendChild(img);
    let direction = (suffix === 'vert') ? 'vertical' : 'horizontal';
    placeShip(targetElement, shipTypes[0], suffix, startingCoord, direction);
  };

  let placedShipsNum = humanBoard.ships.length;
  const placeShip = (targetElement, shipType, suffix, startingCoord, direction) => {
    targetElement.addEventListener('click', () => {
      if (shipType === 'carrier') {
        humanBoard.placeShip(5, startingCoord, direction);
        console.log('hopefully placed ship', humanBoard.ships);
      } else if (shipType === 'battleship') {
        humanBoard.placeShip(4, startingCoord, direction);
      } else if (shipType === 'destroyer') {
        humanBoard.placeShip(3, startingCoord, direction);
      } else if (shipType === 'submarine') {
        humanBoard.placeShip(3, startingCoord, direction);
      } else if (shipType === 'patrolboat') {
        humanBoard.placeShip(2, startingCoord, direction);
      }

      if (humanBoard.ships.length > placedShipsNum) {
        let shipImage = document.createElement('div');
        shipImage.setAttribute('class', `${shipType}${suffix}`);
        targetElement.appendChild(shipImage);
        shipTypes.splice(0, 1);
        placedShipsNum += 1;
      }
      console.log('shipTypes: ', shipTypes);
    });
  };

  return {
    placeShips,
  };
};

module.exports = gameSetup;
