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
          let img = document.getElementsByClassName('ship')[0];
          if (img) {
            img.parentElement.removeChild(img);
          }

          addShipOfType(shipTypes[0], e.target);
        }
      }
    });
  };

  let suffix = '';
  const addShipOfType = (shipType, targetElement) => {
    targetElement.addEventListener('wheel', (event) => {
      if (event.wheelDelta === -120) {
        suffix = '';
        if (img) {
          img.parentElement.removeChild(img);
        }
        console.log('horizontal');
      } else if (event.wheelDelta === 120) {
        suffix = 'vert';
        if (img) {
          img.parentElement.removeChild(img);
        }
      }
    });
    console.log(suffix);
    let img = document.createElement('div');
    img.setAttribute('class', `ship ${shipType}${suffix}`);
    targetElement.appendChild(img);
  };

  return {
    placeShips,
  };
};

module.exports = gameSetup;
