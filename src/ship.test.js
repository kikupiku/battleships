const ship = require('./ship.js');

let testShip;

beforeEach(() => {
  testShip = ship(3, 22, 'horizontal');
});

test('returns a new ship', () => {
  expect(typeof testShip).toBe('object');
});

test('ship has length', () => {
  expect(testShip.shipLength).toBe(3);
});

test('ship has coordinates', () => {
  expect(testShip.coordinates).toStrictEqual([
    { coordinate: 22, hit: false },
    { coordinate: 32, hit: false },
    { coordinate: 42, hit: false },
  ]);
});

test('ship has coordinates vertically', () => {
  testShip = ship(3, 22, 'vertical');
  expect(testShip.coordinates).toStrictEqual([
    { coordinate: 22, hit: false },
    { coordinate: 23, hit: false },
    { coordinate: 24, hit: false },
  ]);
});

test('ship can be hit', () => {
  expect(testShip.hit(22)).toBe(true);
});

test('ship will update coordinates when hit', () => {
  testShip.hit(22);
  expect(testShip.coordinates).toStrictEqual([
    { coordinate: 22, hit: true },
    { coordinate: 32, hit: false },
    { coordinate: 42, hit: false },
  ]);
});

test('ship will update coordinates when hit twice', () => {
  testShip.hit(22);
  testShip.hit(42);
  expect(testShip.coordinates).toStrictEqual([
    { coordinate: 22, hit: true },
    { coordinate: 32, hit: false },
    { coordinate: 42, hit: true },
  ]);
});

test('ship can be missed', () => {
  expect(testShip.hit(55)).toBe(false);
});

test('missed ship does not update coordinates', () => {
  testShip.hit(55);
  expect(testShip.coordinates).toStrictEqual([
    { coordinate: 22, hit: false },
    { coordinate: 32, hit: false },
    { coordinate: 42, hit: false },
  ]);
});

test('ship can be sunk', () => {
  testShip.hit(22);
  testShip.hit(32);
  testShip.hit(42);
  expect(testShip.isSunk()).toBe(true);
});

test('ship does not get sunk if not all elements hit', () => {
  testShip.hit(22);
  testShip.hit(32);
  expect(testShip.isSunk()).toBe(false);
});
