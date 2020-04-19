const gameboard = require('./gameboard.js');

const player = () => {
  let randomCoord;

  // let gotcha = false;
  let attack = (enemyBoard, coord) => {
    if (enemyBoard.spaces[coord].hit === false) {
      enemyBoard.receiveAttack(coord);

      // gotcha = true;
    }
  };

  let randomPlay = () => {
    randomCoord = Math.floor(Math.random() * 100);
    attack(randomCoord);
  };

  let autoPlaceShips = (board) => {
    const directions = ['horizontal', 'vertical'];
    const lengths = [2, 3, 3, 4, 5];
    lengths.forEach((length, i) => {
      while (board.ships.length <= i) {
        board.placeShip(length, Math.floor(Math.random() * 100), directions[Math.round(Math.random())]);
      }
    });
  };

  // let triangulate = () => {
  //   let shipMayBeHere = false;
  //   if (gotcha === true) {
  //
  //   }
  //   return shipMayBeHere;
  // };

  return {
    attack,
    randomPlay,
    autoPlaceShips,
  };
};

module.exports = player;
