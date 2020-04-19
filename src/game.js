const player = require('./player.js');
const gameboard = require('./gameboard.js');

const beginGame = (computerPlayer, humanPlayer, computerBoard, humanBoard) => {
  const enemySpaces = Array.from(document.getElementsByClassName('enemy-space'));
  const setupInstruction = document.getElementById('setup-instruction');
  const status = document.getElementById('status');

  status.textContent = 'OK, let\'s start! It\'s your turn to attack';
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
    let resultOfAttack = document.createElement('div');
    if (computerBoard.spaces[enemySpaceIndex].hasShipPart) {
      resultOfAttack.setAttribute('class', 'fire');
    } else {
      resultOfAttack.setAttribute('class', 'water');
    }

    e.currentTarget.appendChild(resultOfAttack);
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
    console.log(`${player} wins!`);
  };

  humanPlay();
};

module.exports = beginGame;
