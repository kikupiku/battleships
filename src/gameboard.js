const ship = require('./ship.js');

const gameboard = () => {
  let spaces = [];
  let ships = [];
  for (i = 0; i < 100; i++) {
    spaces.push({ coordinate: i, hasShipPart: false, hit: false });
  }

  let placeShip = (length, startingCoord, direction) => {
    let shipPartChecker = checkPlacementValidity(length, startingCoord, direction);
    console.log('placementvalidity: ', shipPartChecker, 'shiplength: ', length);
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
    }
  };

  let receiveAttack = coord => {
    spaces.forEach(space => {
      if (space.coordinate === coord) {
        space.hit = true;
        if (space.hasShipPart) {
          ships.forEach(ship => {
            ship.hit(coord);
          });
        }
      }
    });
  };

  const checkIfAllSunk = () => ships.every(ship => ship.isSunk());

  const checkPlacementValidity = (length, startingCoord, direction) => {
    let shipPartChecker = 0;
    for (i = 0; i < length; i++) {
      if (direction === 'horizontal' && (startingCoord + (i * 10)) < 100) {
        if (spaces[startingCoord + (i * 10)].hasShipPart == false) {
          shipPartChecker += 1;
        }
      } else if (direction === 'vertical' && (startingCoord + i) < 100) {
        if (spaces[startingCoord + (i)].hasShipPart == false &&
            ((startingCoord < 10 && (startingCoord + length - 1) < 10) ||
            (startingCoord > 9 && startingCoord.toString()[0] ===
            (startingCoord + length - 1).toString()[0]))) {
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
    receiveAttack,
    checkIfAllSunk,
  };
};

module.exports = gameboard;
