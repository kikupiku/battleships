const gameboard = require('./gameboard.js');

test('board has 100 spaces', () => {
  expect(gameboard().spaces.length).toBe(100);
});

test('board space coords get assigned properly', () => {
  expect(gameboard().spaces[0].coordinate).toBe(0);
});

test('board space coords get assigned properly 2', () => {
  expect(gameboard().spaces[gameboard().spaces.length - 1].coordinate).toBe(99);
});

test('ship factory gets called inside gameboard factory correctly', () => {
  let board = gameboard();
  board.placeShip(3, 0, 'horizontal');
  expect(board.ships[board.ships.length - 1].shipLength).toBe(3);
});

test('ship function can place a ship on the board', () => {
  let board = gameboard();
  board.placeShip(3, 0, 'horizontal');
  expect(board.spaces[20].hasShipPart).toBe(true);
});

xtest('gameboard cannot place ship outside gameboard', () => {
  // let board = gameboard();
  // board.placeShip(3, 0, 'horizontal');
  // board.placeShip(2, 1, 'hirizontal');
  // expect(board.spaces[20].hasShipPart).toBe(true);
});

test('gameboard cannot place two ships in same space', () => {
  let board = gameboard();
  board.placeShip(3, 0, 'horizontal');
  board.placeShip(3, 10, 'horizontal');
  expect(board.spaces[30].hasShipPart).toBe(false);
});

test('gameboard cannot place two ships in same space 2', () => {
  let board = gameboard();
  board.placeShip(3, 0, 'horizontal');
  board.placeShip(3, 0, 'horizontal');
  expect(board.ships.length).toBe(1);
});

test('gameboard cannot place two ships in same space 2', () => {
  let board = gameboard();
  board.placeShip(3, 0, 'horizontal');
  board.placeShip(4, 20, 'horizontal');
  expect(board.ships.length).toBe(1);
});

xtest('gameboard can receive a hit', () => {

});

xtest('a hit on the board space where a ship lies also hits the ship', () => {

});

xtest('gameboard can check if all its ships are sunk', () => {

});
