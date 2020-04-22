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
  let oldAttackIndex;
  let currentAttackIndex;
  let randomPick;
  let coordsForRandom = [];
  for (i = 0; i < 100; i++) {
    coordsForRandom.push(i);
  }

  let shipMayBeHere = coordsForRandom;
  let activePursuit = false;

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
    if (!activePursuit) {
      randomCompPlay();
    } else {
      activePursuitPlay();
    }

    endGame = humanBoard.checkIfAllSunk();
    if (endGame) {
      win('computer wins!');
    } else {
      status.textContent = 'enemy\'s quick, your turn again';
    }
  };

  const randomCompPlay = () => {
    randomPick = Math.floor(Math.random() * 100);
    if (coordsForRandom[randomPick] === 'done') {
      computerPlay();
    } else {
      computerPlayer.attack(humanBoard, shipMayBeHere[randomPick]);
      coordsForRandom.splice(randomPick, 1, 'done');
      if (humanBoard.spaces[randomPick].hasShipPart) {
        shipMayBeHere = humanBoard.triangulate(randomPick, humanBoard);
        oldAttackIndex = randomPick;
        activePursuit = true;
      } else {
        shipMayBeHere = coordsForRandom;
      }

      mySpaces[randomPick].removeEventListener('click', placeAttack);
      showAttack(humanBoard, 'my', randomPick, mySpaces[randomPick]);
    }
  };

  const activePursuitPlay = () => {
    smartAttack();
    if (shipWasHit()) {
      if (checkIfSunk(currentAttackIndex)) {
        activePursuit = false;
        shipMayBeHere = coordsForRandom;
        checkIfAdjacentShipHitDuringTriangulation();
      } else {
        shipMayBeHere = humanBoard.triangulate(currentAttackIndex, humanBoard);
      }
    } else {
      shipMayBeHere = humanBoard.triangulate(oldAttackIndex, humanBoard);
    }

    showAttack(humanBoard, 'my', currentAttackIndex, mySpaces[currentAttackIndex]);
  };

  const smartAttack = () => {
    randomPick = Math.floor(Math.random() * shipMayBeHere.length);
    currentAttackIndex = shipMayBeHere[randomPick];
    if (!humanBoard.spaces[currentAttackIndex]) {
      smartAttack();
    }

    computerPlayer.attack(humanBoard, currentAttackIndex);
    coordsForRandom.splice(shipMayBeHere[randomPick], 1, 'done');
  };

  const shipWasHit = () => humanBoard.spaces[currentAttackIndex].hasShipPart;

  const checkIfSunk = (index) => {
    let hitShip = findHitShip(index);
    return hitShip.isSunk();
  };

  const findHitShip = (index) => {
    let hitShip = humanBoard.ships.find(ship => {
      let hasMatchingCoordinate = false;
      ship.coordinates.forEach((coord) => {
        if (coord.coordinate === index) {
          hasMatchingCoordinate = true;
        }
      });
      return hasMatchingCoordinate;
    });
    return hitShip;
  };

  const checkIfAdjacentShipHitDuringTriangulation = () => {
    let adjacentShipIndices = [];
    humanBoard.spaces.forEach((space) => {
      if (space.hit && space.hasShipPart) {
        adjacentShipIndices.push(space.coordinate);
      }
    });
    let adjacentShipIndex = adjacentShipIndices.find(index => !checkIfSunk(index));
    if (adjacentShipIndex !== undefined) {
      activePursuit = true;
      shipMayBeHere = humanBoard.triangulate(adjacentShipIndex, humanBoard);
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
