const player = require('./player.js');
const gameboard = require('./gameboard.js');

let playerA;

beforeEach(() => {
  playerA = player();
});

test('player can own a mock enemy board', () => {
  playerA.attack(2);
  expect(playerA.enemyBoard.spaces[2].hit).toBe(true);
});

test('player can attack the enemy board', () => {
  playerA.attack(2);
  expect(playerA.enemyBoard.spaces[2].hit).toBe(true);
});

// xtest('a player can have a name', () => {
//
// });

test('player cannot hit the same space twice', () => {

});

test('once a ship longer than 1 is hit, only surrounding' +
  'spaces are hittable', () => {

  });
