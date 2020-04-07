const gameboard = require('./gameboard.js');

test('board has 100 spaces', () => {
  expect(gameboard().spaces.length).toBe(100);
});

xtest('ship function can place a ship on the board', () => {

});

xtest('gameboard cannot place ship outside gameboard', () => {

});

xtest('gameboard cannot place two ships in same space', () => {

});

xtest('gameboard can receive a hit', () => {

});

xtest('a hit on the board space where a ship lies also hits the ship', () => {

});

xtest('gameboard can check if all its ships are sunk', () => {

});
