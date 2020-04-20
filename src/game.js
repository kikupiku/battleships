const player = require('./player.js');
const gameboard = require('./gameboard.js');

const beginGame = (computerPlayer, humanPlayer, computerBoard, humanBoard) => {
  const mySpaces = Array.from(document.getElementsByClassName('my-space'));
  const enemySpaces = Array.from(document.getElementsByClassName('enemy-space'));
  const setupInstruction = document.getElementById('setup-instruction');
  const status = document.getElementById('status');
  let coordsForRandom = [];
  for (i = 0; i < 100; i++) {
    coordsForRandom.push(i);
  }

  status.textContent = 'OK, let\'s start! It\'s your turn to attack';
  setupInstruction.style.display = 'none';
  console.log('my ships are: ', humanBoard.spaces);

  const humanPlay = () => {
    enemySpaces.forEach((enemySpace) => {
      enemySpace.addEventListener('click', placeAttack);
    });
    let endGame = computerBoard.checkIfAllSunk();
    if (endGame) {
      win('human', 'Congrats! ');
    }
  };

  const placeAttack = (e) => {
    let enemySpaceIndex = enemySpaces.indexOf(e.currentTarget);
    humanPlayer.attack(computerBoard, enemySpaceIndex);
    showAttack(computerBoard, 'enemy', enemySpaceIndex, e.currentTarget);
    console.log('you hit ', enemySpaceIndex);
    enemySpaces[enemySpaceIndex].removeEventListener('click', placeAttack);
    status.textContent = 'computer plays...';
    computerPlay();
  };

  const showAttack = (attackedBoard, attackedClassName, coord, attackedDiv) => {
    let resultOfAttack = document.createElement('div');
    if (attackedBoard.spaces[coord].hasShipPart) {
      resultOfAttack.setAttribute('class', `${attackedClassName} fire`);
    } else {
      resultOfAttack.setAttribute('class', `${attackedClassName} water`);
    }

    attackedDiv.appendChild(resultOfAttack);
  };

  const computerPlay = () => {
    randomPick = Math.floor(Math.random() * 100);
    if (coordsForRandom[randomPick] === 'done') {
      computerPlay();
    } else {
      computerPlayer.attack(humanBoard, coordsForRandom[randomPick]);
      coordsForRandom.splice(randomPick, 1, 'done');
      mySpaces[randomPick].removeEventListener('click', placeAttack);
      showAttack(humanBoard, 'my', randomPick, mySpaces[randomPick]);
      let endGame = humanBoard.checkIfAllSunk();
      if (endGame) {
        win('computer', '');
      }

      status.textContent = 'computer played, your turn again';
      console.log('comp hit ', randomPick);
    }
  };

  const win = (player, wish) => {
    enemySpaces.forEach((enemySpace) => {
      enemySpace.removeEventListener('click', placeAttack);
    });
    status.textContent = `${player} wins! ${wish}Wanna play again?`;
  };

  humanPlay();
};

module.exports = beginGame;
