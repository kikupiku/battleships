const player = require('./player.js');
const gameboard = require('./gameboard.js');

const gameSetup = () => {
  let computer = player();
  let human = player();
  let computerBoard = gameboard();
  let humanBoard = gameboard();
  computer.autoPlaceShips(computerBoard);

    let placeShips = () => {

    };


  };

  //1x 4spaces, 2x 3spaces, 3x 2spaces, 4x 1space

}
