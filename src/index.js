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

let setup = gameSetup();
setup.placeShips();

// TODO: figure out whether the spaces array is better coupled with html divs or javascript ones
// figure out that stupid file loader
