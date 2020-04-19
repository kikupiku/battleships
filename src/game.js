const player = require('./player.js');
const gameboard = require('./gameboard.js');

const beginGame = (computerPlayer, humanPlayer, computerBoard, humanBoard) => {
  const enemySpaces = Array.from(document.getElementsByClassName('enemy-space'));

  const humanPlay = () => {
    enemySpaces.forEach((enemySpace, i) => {
      enemySpace.addEventListener('click', placeAttack);
    });
  };

  const placeAttack = (e) => {
    let enemySpaceIndex = enemySpaces.indexOf(e.currentTarget);
    player.attack(computerBoard, enemySpaceIndex);
  };

  const computerPlay = () => {

  };
};
