const player = require('./player.js');
const gameboard = require('./gameboard.js');

let playerA;
let computer;
let playerBoard;
let computerBoard;

beforeEach(() => {
  playerA = player();
  computer = player();
  playerBoard = gameboard();
  computerBoard = gameboard();
});

test('player can attack the enemy board', () => {
  playerA.attack(computerBoard, 2);
  expect(computerBoard.spaces[2].hit).toBe(true);
});

// xtest('a player can have a name', () => {
//
// });

// xtest('player cannot hit the same space twice', () => {
//
// });
//
// xtest('once a ship longer than 1 is hit, only surrounding' +
//   'spaces are hittable', () => {
//
//   });

test('computer can autoPlaceShips on its board', () => {
  computer.autoPlaceShips(computerBoard);
  expect(computerBoard.ships.length).toBe(5);
});
