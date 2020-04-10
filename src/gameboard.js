const ship = require('./ship.js');

const gameboard = () => {
  let spaces = [];
  let ships = [];
  for (i = 0; i < 100; i++) {
    spaces.push({ coordinate: i, hasShipPart: false, hit: false });
  }

  let placeShip = (length, startingCoord, direction) => {
    let shipPartChecker = checkIfOccupied(length, startingCoord, direction);
    if (shipPartChecker === length) {
      ships.push(ship(length, startingCoord, direction));
      spaces.forEach((space, i) => {
        for (j = 0; j < length; j++) {
          if (spaces[i].coordinate === ships[ships.length - 1].coordinates[j].coordinate) {
            spaces[i].hasShipPart = true;
          }
        }
      });
    } else {
      console.log('space occupied');

      // add dom manipulation here that shows message
    }
  };

  const checkIfOccupied = (length, startingCoord, direction) => {
    let shipPartChecker = 0;
    for (i = 0; i < length; i++) {
      if (direction === 'horizontal') {
        if (spaces[startingCoord + i].hasShipPart == false) {
          shipPartChecker += 1;
        }
      } else if (direction === 'vertical') {
        if (spaces[startingCoord + (i * 10)].hasShipPart == false) {
          shipPartChecker += 1;
        }
      }
    }

    return shipPartChecker;
  };

  return {
    spaces,
    placeShip,
    ships,
  };
};

module.exports = gameboard;
