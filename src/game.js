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
    if (!activePursuit) {    //no active hit
      randomPick = Math.floor(Math.random() * 100);
      if (coordsForRandom[randomPick] === 'done') {
        computerPlay();
      } else {
        computerPlayer.attack(humanBoard, shipMayBeHere[randomPick]);
        coordsForRandom.splice(randomPick, 1, 'done');
        if (humanBoard.spaces[randomPick].hasShipPart) { //virgin hit!
          shipMayBeHere = humanBoard.triangulate(randomPick, humanBoard);
          activePursuit = true;  //don't have to check if sunk, it's the 1st hit
          console.log('inside computerPlay SMBH: ', shipMayBeHere);
        } else {
          shipMayBeHere = coordsForRandom;   //continue state of inactivepursuit
        }

        mySpaces[randomPick].removeEventListener('click', placeAttack);
        showAttack(humanBoard, 'my', randomPick, mySpaces[randomPick]);
      }
    } else {                //if SMBH is taken from triangulate, i.e. active hit
      console.log('about to hit one of these in active state: ', shipMayBeHere);
      randomPick = Math.floor(Math.random() * shipMayBeHere.length);
      console.log('pick hopefully from a smaller array: ', shipMayBeHere[randomPick]);
      computerPlayer.attack(humanBoard, shipMayBeHere[randomPick]);
      coordsForRandom.splice(randomPick, 1, 'done');
      humanBoard.ships.forEach((ship) => {        //check if ship sunk:
        for (let i = 0; i < ship.coordinates.length; i++) {
          if (ship.coordinates[i].coordinate === randomPick) {
            if (ship.isSunk) {
              activePursuit = false;
              shipMayBeHere = coordsForRandom;
              console.log('ship is sunk, release.');
            } else {
              shipMayBeHere = humanBoard.triangulate(randomPick, humanBoard);
              console.log('ship was hit and here are its surroundings: ', shipMayBeHere);
            }
          }
        }
      });
      let index = shipMayBeHere[randomPick];
      console.log('actually hit space: ', index);
      mySpaces[index].removeEventListener('click', placeAttack);
      showAttack(humanBoard, 'my', index, mySpaces[index]);
    }

    console.log('active pursuit is active: ', activePursuit +
    ', and these are possible places where the ship is: ', shipMayBeHere);
    endGame = humanBoard.checkIfAllSunk();
    if (endGame) {
      win('computer wins!');
    } else {
      status.textContent = 'enemy\'s quick, your turn again';
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
