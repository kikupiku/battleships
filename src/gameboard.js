const gameboard = () => {
  let spaces = [];
  for (i = 0; i < 100; i++) {
    spaces.push({ coordinates: i, hasShipPart: false, hit: false });
  }

  return {
    spaces,
  };
};

module.exports = gameboard;
