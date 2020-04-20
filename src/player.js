const gameboard = require('./gameboard.js');

const player = () => {
  let randomCoord;

  let attack = (attackedBoard, coord) => {
    if (attackedBoard.spaces[coord].hit === false) {
      attackedBoard.receiveAttack(coord);

    }
  };

  let autoPlaceShips = (board) => {
    const directions = ['horizontal', 'vertical'];
    const lengths = [2, 3, 3, 4, 5];
    lengths.forEach((length, i) => {
      while (board.ships.length <= i) {
        board.placeShip(length, Math.floor(Math.random() * 100),
         directions[Math.round(Math.random())]);
      }
    });
  };

  let triangulate = () => {
    let shipMayBeHere = false;
    if (gotcha === true) {

    }
    return shipMayBeHere;
  };

  return {
    attack,
    autoPlaceShips,
  };
};

module.exports = player;
