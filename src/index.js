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
import carriervert from './assets/carriervert.png';
import battleshipvert from './assets/battleshipvert.png';
import destroyervert from './assets/destroyervert.png';
import submarinevert from './assets/submarinevert.png';
import patrolboatvert from './assets/patrolboatvert.png';

let setup = gameSetup();
setup.placeShips();

// TODO: figure out whether the spaces array is better coupled with html divs or javascript ones
