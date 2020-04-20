const player = require('./player.js');
const gameboard = require('./gameboard.js');
const ship = require('./ship.js');

const beginGame = (computerPlayer, humanPlayer, computerBoard, humanBoard) => {
  const mySpaces = Array.from(document.getElementsByClassName('my-space'));
  const enemySpaces = Array.from(document.getElementsByClassName('enemy-space'));
  const setupInstruction = document.getElementById('setup-instruction');
  const status = document.getElementById('status');
  const enemyBoard = document.getElementById('enemy-board');
  const restart = document.getElementById('restart');

  let endGame;
  let coordsForRandom = [];
  for (i = 0; i < 100; i++) {
    coordsForRandom.push(i);
  }

  status.textContent = 'OK, you start. Attack!';
  setupInstruction.style.display = 'none';

  const humanPlay = () => {
    enemySpaces.forEach((enemySpace) => {
      enemySpace.addEventListener('click', placeAttack);
    });
  };

  const placeAttack = (e) => {
    let enemySpaceIndex = enemySpaces.indexOf(e.currentTarget);
    humanPlayer.attack(computerBoard, enemySpaceIndex);
    showAttack(computerBoard, 'enemy', enemySpaceIndex, e.currentTarget);
    enemySpaces[enemySpaceIndex].removeEventListener('click', placeAttack);
    markSunkShip(enemySpaceIndex);
    endGame = computerBoard.checkIfAllSunk();
    if (endGame) {
      win('You win! Congrats!');
    } else {
      computerPlay();
    }
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

  const markSunkShip = (index) => {
    computerBoard.ships.forEach((ship) => {
      for (let i = 0; i < ship.coordinates.length; i++) {
        if (ship.coordinates[i].coordinate === index) {
          if (ship.isSunk()) {
            ship.coordinates.forEach((coordinate) => {
              let hitIndex = coordinate.coordinate;
              enemySpaces[hitIndex].childNodes[0].setAttribute('class', 'enemy smoke');
            });
          }
        }
      }
    });
  };

  const computerPlay = () => {
    randomPick = Math.floor(Math.random() * 100);
    if (coordsForRandom[randomPick] === 'done') {
      computerPlay();
    } else {
      computerPlayer.attack(humanBoard, coordsForRandom[randomPick]);
      if (humanBoard.spaces[randomPick].hasShipPart) {
        let cantTouchThis = humanBoard.triangulate(randomPick, humanBoard);
      }
      coordsForRandom.splice(randomPick, 1, 'done');
      mySpaces[randomPick].removeEventListener('click', placeAttack);
      showAttack(humanBoard, 'my', randomPick, mySpaces[randomPick]);
      endGame = humanBoard.checkIfAllSunk();
      if (endGame) {
        win('computer wins!');
      } else {
        status.textContent = 'enemy\'s quick, your turn again';
      }
    }
  };

  const win = (player) => {
    restart.style.display = 'block';
    if (player === 'computer wins!') {
      let fail = document.getElementById('fail');
      fail.style.display = 'block';
    } else {
      let win = document.getElementById('win');
      win.style.display = 'block';
    }

    status.textContent = `${player} Play again?`;
    enemySpaces.forEach((enemySpace) => {
      enemySpace.removeEventListener('click', placeAttack);
    });

    return true;
  };

  humanPlay();
  return {
    win,
  };
};

module.exports = beginGame;
