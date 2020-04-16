const gameboard = require('./gameboard.js');

const player = () => {
  let randomCoord;
  let thisPlayersBoard = gameboard();

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

  let autoPlaceShips = () => {
    const directions = ['horizontal', 'vertical'];
    while (checkPlacementValidity !== true) {
      thisPlayersBoard.placeShip(4, Math.floor(Math.random() * 100), directions[Math.floor(Math.random()) + 1]);
    }
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
  };
};

module.exports = player;
