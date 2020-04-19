const player = require('./player.js');
const gameboard = require('./gameboard.js');

const beginGame = (computerPlayer, humanPlayer, computerBoard, humanBoard) => {
  const enemySpaces = Array.from(document.getElementsByClassName('enemy-space'));
  const setupInstruction = document.getElementById('setup-instruction');

  setupInstruction.style.display = 'none';

  const humanPlay = () => {
    enemySpaces.forEach((enemySpace, i) => {
      enemySpace.addEventListener('click', placeAttack);
    });
    if (computerBoard.checkIfAllSunk()) {
      win(human);
    }
  };

  const placeAttack = (e) => {
    let enemySpaceIndex = enemySpaces.indexOf(e.currentTarget);
    humanPlayer.attack(computerBoard, enemySpaceIndex);
    console.log('you hit ', enemySpaceIndex);
    computerPlay();
  };

  const computerPlay = () => {
    randomCoord = Math.floor(Math.random() * 100);
    computerPlayer.attack(humanBoard, randomCoord);
    if (humanBoard.checkIfAllSunk()) {
      win(computer);
    }
    console.log('comp hit ', randomCoord);
  };

  const win = player => {

  };

  humanPlay();
};

module.exports = beginGame;
