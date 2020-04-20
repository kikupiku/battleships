import './style.scss';
import gameboard from './gameboard.js';
import ship from './ship.js';
import player from './player.js';
import gameSetup from './game-setup.js';
import carrier from './assets/carrier.png';
import battleship from './assets/battleship.png';
import destroyer from './assets/destroyer.png';
import submarine from './assets/submarine.png';
import patrolboat from './assets/patrolboat.png';
import fire from './assets/fire.png';
import water from './assets/water.png';
import fail from './assets/fail.png';
import smoke from './assets/smoke.png';
import win from './assets/win.png';

let setup = gameSetup();
setup.placeShips();

// TODO: add button to reset everything and start new game after win
// TODO: add triangulation so that computer is not as stupid
