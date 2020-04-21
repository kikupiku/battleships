const ship = require('./ship.js');

const gameboard = () => {
  let spaces = [];
  let ships = [];
  for (i = 0; i < 100; i++) {
    spaces.push({ coordinate: i, hasShipPart: false, hit: false });
  }

  let placeShip = (length, startingCoord, direction) => {
    let shipPartChecker = checkPlacementValidity(length, startingCoord, direction);
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

  const triangulate = (coord, board) => {
    let shipMayBeHere = [];
    let hitParts = [];
    let howManyHitsThisShipHas = 0;

    board.ships.forEach((ship) => {
      for (let i = 0; i < ship.coordinates.length; i++) {
        if (ship.coordinates[i].coordinate === coord) {
          ship.coordinates.forEach((coordinate) => {
            if (coordinate.hit) {
              howManyHitsThisShipHas += 1;
              hitParts.push(coordinate.coordinate);
            }
          });
        }
      }
    });
    console.log('howManyHitsThisShipHas: ', howManyHitsThisShipHas);
    console.log('hitParts: ', hitParts);
    if (howManyHitsThisShipHas === 1) {
      if (coord - 1 >= 0 && !board.spaces[coord - 1].hit) {
        if (coord < 10 || coord.toString()[1] !== '0') {
          shipMayBeHere.push((coord - 1));
        }
      }

      if (coord + 1 <= 99 && !board.spaces[coord + 1].hit) {
        if (coord < 9 || (coord > 9 && coord.toString()[1] !== '9'))
        shipMayBeHere.push((coord + 1));
      }

      if (coord - 10 >= 0 && !board.spaces[coord - 10].hit) {
        shipMayBeHere.push((coord - 10));
      }

      if (coord + 10 <= 99 && !board.spaces[coord + 10].hit) {
        shipMayBeHere.push((coord + 10));
      }
    } else if (howManyHitsThisShipHas > 1) {
      console.log('closing in!');
      if (hitParts[0] === hitParts[1] + 10 || hitParts[0] === hitParts[1] - 10) {
        hitParts.forEach((hitPart) => {         //direction: horizontal
          if (hitPart - 10 >= 0 && !board.spaces[hitPart - 10].hit) {
            shipMayBeHere.push((hitPart - 10));
          }

          if (hitPart + 10 <= 99 && !board.spaces[hitPart + 10].hit) {
            shipMayBeHere.push((hitPart + 10));
          }
        });
      } else {
        hitParts.forEach((hitPart) => {           //direction: vertical
          if (hitPart - 1 >= 0 && !board.spaces[hitPart - 1].hit) {
            if (hitPart < 10 || hitPart.toString()[1] !== '0') {
              shipMayBeHere.push((hitPart - 1));
            }
          }

          if (hitPart + 1 <= 99 && !board.spaces[hitPart + 1].hit) {
            if (hitPart < 9 || (hitPart > 9 && hitPart.toString()[1] !== '9'))
            shipMayBeHere.push((hitPart + 1));
          }
        });

      }
    }

    console.log('ship may be here: ', shipMayBeHere);

    return shipMayBeHere;
  };

  return {
    spaces,
    placeShip,
    ships,
    receiveAttack,
    checkIfAllSunk,
    triangulate,
  };
};

module.exports = gameboard;
