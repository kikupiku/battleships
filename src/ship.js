const ship = (num, startingCoord, direction) => {
  let coordinates = [{ coordinate: startingCoord, hit: false }];
  for (let i = 1; i < num; i++) {
    if (direction === 'horizontal') {
      coordinates.push({
        coordinate: coordinates[coordinates.length - 1].coordinate + 10,
        hit: false,
      });
    } else {
      coordinates.push({
        coordinate: coordinates[coordinates.length - 1].coordinate + 1,
        hit: false,
      });
    }
  }

  const isSunk = () => coordinates.every(coordinate => coordinate.hit);

  const hit = (coord) => {
    let shipWasHit = false;
    coordinates.forEach((coordinate, i) => {
      if (coord === coordinate.coordinate) {
        shipWasHit = true;
        coordinates[i].hit = true;
      }
    });
    return shipWasHit;
  };

  return {
    shipLength: num,
    isSunk,
    coordinates,
    hit,
  };
};

module.exports = ship;
