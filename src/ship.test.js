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
  expect(testShip.coordinates).toStrictEqual([22, 32, 42]);
});

test('ship has coordinates vertically', () => {
  testShip = ship(3, 22, 'vertical');
  expect(testShip.coordinates).toStrictEqual([22, 23, 24]);
});

test('ship can be hit', () => {
  expect(testShip.hit(22)).toBe(true);
});

test('ship will update coordinates when hit', () => {
  testShip.hit(22);
  expect(testShip.coordinates).toStrictEqual(['hit', 32, 42]);
});

test('ship can be missed', () => {
  expect(testShip.hit(55).toBe(false));
});

test('missed ship does not update coordinates', () => {
  testShip.hit(55);
  expect(testShip.coordinates).toStrictEqual([22, 32, 42]);
});
