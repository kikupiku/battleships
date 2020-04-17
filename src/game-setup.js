const player = require('./player.js');
const gameboard = require('./gameboard.js');

const gameSetup = () => {
  let computer = player();
  let human = player();
  let computerBoard = gameboard();
  let humanBoard = gameboard();
  computer.autoPlaceShips(computerBoard);

  let placeShips = () => {
    const myBoard = document.getElementById('my-board');
    myBoard.addEventListener('click', () => {
      console.log('click!');
    });
  };

  return {
    placeShips,
  };
};

module.exports = gameSetup;
