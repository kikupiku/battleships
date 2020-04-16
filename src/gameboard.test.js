const gameboard = require('./gameboard.js');

let board;

beforeEach(() => {
  board = gameboard();
});

test('board has 100 spaces', () => {
  expect(board.spaces.length).toBe(100);
});

test('board space coords get assigned properly', () => {
  expect(board.spaces[0].coordinate).toBe(0);
});

test('board space coords get assigned properly 2', () => {
  expect(board.spaces[gameboard().spaces.length - 1].coordinate).toBe(99);
});

test('ship factory gets called inside gameboard factory correctly', () => {
  board.placeShip(3, 0, 'horizontal');
  expect(board.ships[board.ships.length - 1].shipLength).toBe(3);
});

test('ship function can place a ship on the board', () => {
  board.placeShip(3, 0, 'horizontal');
  expect(board.spaces[20].hasShipPart).toBe(true);
});

test('gameboard cannot place horizontal ship outside gameboard', () => {
  board.placeShip(3, 0, 'horizontal');
  board.placeShip(4, 80, 'horizontal');
  expect(board.ships.length).toBe(1);
});

test('gameboard cannot place vertical ship outside gameboard in first column', () => {
  board.placeShip(3, 0, 'vertical');
  board.placeShip(4, 8, 'vertical');
  expect(board.ships.length).toBe(1);
});

test('gameboard cannot place vertical ship outside gameboard in not first column', () => {
  board.placeShip(3, 0, 'vertical');
  board.placeShip(4, 49, 'vertical');
  expect(board.ships.length).toBe(1);
});

test('gameboard cannot place two ships in same space', () => {
  board.placeShip(3, 0, 'horizontal');
  board.placeShip(3, 10, 'horizontal');
  expect(board.spaces[30].hasShipPart).toBe(false);
});

test('gameboard cannot place two ships in same space 2', () => {
  board.placeShip(3, 0, 'horizontal');
  board.placeShip(3, 0, 'horizontal');
  expect(board.ships.length).toBe(1);
});

test('gameboard cannot place two ships in same space 3', () => {
  board.placeShip(3, 0, 'horizontal');
  board.placeShip(4, 20, 'horizontal');
  expect(board.ships.length).toBe(1);
});

test('gameboard can receive a hit', () => {
  board.receiveAttack(10);
  expect(board.spaces[10].hit).toBe(true);
});

test('a hit on the board space where a ship lies also hits the ship', () => {
  board.placeShip(3, 0, 'horizontal');
  board.receiveAttack(10);
  expect(board.ships[0].coordinates[1].hit).toBe(true);
});

test('a hit on the board space where a ship lies also hits the ship 2', () => {
  board.placeShip(3, 0, 'vertical');
  board.receiveAttack(2);
  expect(board.ships[0].coordinates[2].hit).toBe(true);
});

test('a ship can be sunk when board receives attacks', () => {
  board.placeShip(2, 0, 'horizontal');
  board.receiveAttack(0);
  board.receiveAttack(10);
  expect(board.ships[0].isSunk()).toBe(true);
});

test('gameboard can check if all its ships are sunk', () => {
  board.placeShip(2, 0, 'horizontal');
  board.receiveAttack(0);
  board.receiveAttack(10);
  expect(board.checkIfAllSunk()).toBe(true);
});

test('gameboard can check if all its ships are sunk, with multiple ships', () => {
  board.placeShip(2, 0, 'horizontal');
  board.placeShip(3, 5, 'vertical');
  board.receiveAttack(0);
  board.receiveAttack(10);
  board.receiveAttack(5);
  board.receiveAttack(6);
  board.receiveAttack(7);
  expect(board.checkIfAllSunk()).toBe(true);
});
