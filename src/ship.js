const ship = (num, startingCoord, direction) => {
  let coordinates = [startingCoord];
  for (let i = 1; i < num; i++) {
    if (direction === 'horizontal') {
      coordinates.push(coordinates[coordinates.length - 1] + 10);
    } else {
      coordinates.push(coordinates[coordinates.length - 1] + 1);
    }
  }


  const hit = () => {

  }

  return {
    shipLength: num,
    coordinates,
  };
};

module.exports = ship;
