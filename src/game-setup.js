const player = require('./player.js');
const gameboard = require('./gameboard.js');
const destroyer = require('./assets/destroyer.png');

const gameSetup = () => {
  const shipTypes = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrolboat'];
  let computer = player();
  let human = player();
  let computerBoard = gameboard();
  let humanBoard = gameboard();
  computer.autoPlaceShips(computerBoard);

  let placeShips = () => {
    const myBoard = document.getElementById('my-board');
    const mySpaces = document.getElementsByClassName('my-space');
    myBoard.addEventListener('mouseover', (e) => {
      for (let i = 0; i < 100; i++) {
        if (mySpaces[i] === e.target) {
          let img = document.getElementsByClassName(shipTypes[1])[0];
          if (img) {
            img.parentElement.removeChild(img);
          }

          addShipOfType(shipTypes[1], e.target);
          console.log('this ', e.target);
        }
      }
    });
  };

  const addShipOfType = (shipType, targetElement) => {
    let img = document.createElement('div');
    img.setAttribute('class', shipType);
    targetElement.appendChild(img);
    return img;
  };

  return {
    placeShips,
  };
};

module.exports = gameSetup;
