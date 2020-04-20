const player = require('./player.js');
const gameboard = require('./gameboard.js');
const ship = require('./ship.js');

const beginGame = (computerPlayer, humanPlayer, computerBoard, humanBoard) => {
  const mySpaces = Array.from(document.getElementsByClassName('my-space'));
  const enemySpaces = Array.from(document.getElementsByClassName('enemy-space'));
  const setupInstruction = document.getElementById('setup-instruction');
  const status = document.getElementById('status');
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
    computerBoard.ships.forEach((ship) => {
      for (let i = 0; i < ship.coordinates.length; i++) {
        if (ship.coordinates[i].coordinate === enemySpaceIndex) {
          if (ship.isSunk()) {
            console.log('ship sunk!');
            ship.coordinates.forEach((coordinate) => {
              let hitIndex = coordinate.coordinate;
              enemySpaces[hitIndex].childNodes[0].setAttribute('class', 'enemy smoke');
            });
          }
        }
      }
    });

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

  const computerPlay = () => {
    randomPick = Math.floor(Math.random() * 100);
    if (coordsForRandom[randomPick] === 'done') {
      computerPlay();
    } else {
      computerPlayer.attack(humanBoard, coordsForRandom[randomPick]);
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
    if (player === 'computer wins!') {
      let fail = document.getElementById('fail');
      fail.style.display = 'block';
    } else {
      const body = document.getElementsByTagName('body')[0];
      let win = document.createElement('div');
      win.setAttribute('id', 'win');
      body.appendChild(win);
    }

    status.textContent = `${player} Play again?`;
    enemySpaces.forEach((enemySpace) => {
      enemySpace.removeEventListener('click', placeAttack);
    });
  };

  humanPlay();
};

module.exports = beginGame;
