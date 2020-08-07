/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var ship = __webpack_require__(1);

var gameboard = function gameboard() {
  var spaces = [];
  var ships = [];

  for (i = 0; i < 100; i++) {
    spaces.push({
      coordinate: i,
      hasShipPart: false,
      hit: false
    });
  }

  var placeShip = function placeShip(length, startingCoord, direction) {
    var shipPartChecker = checkPlacementValidity(length, startingCoord, direction);

    if (shipPartChecker === length) {
      ships.push(ship(length, startingCoord, direction));
      spaces.forEach(function (space, i) {
        for (j = 0; j < length; j++) {
          if (spaces[i].coordinate === ships[ships.length - 1].coordinates[j].coordinate) {
            spaces[i].hasShipPart = true;
          }
        }
      });
    }
  };

  var receiveAttack = function receiveAttack(coord) {
    spaces.forEach(function (space) {
      if (space.coordinate === coord) {
        space.hit = true;

        if (space.hasShipPart) {
          ships.forEach(function (ship) {
            ship.hit(coord);
          });
        }
      }
    });
  };

  var checkIfAllSunk = function checkIfAllSunk() {
    return ships.every(function (ship) {
      return ship.isSunk();
    });
  };

  var checkPlacementValidity = function checkPlacementValidity(length, startingCoord, direction) {
    var shipPartChecker = 0;

    for (i = 0; i < length; i++) {
      if (direction === 'horizontal' && startingCoord + i * 10 < 100) {
        if (spaces[startingCoord + i * 10].hasShipPart == false) {
          shipPartChecker += 1;
        }
      } else if (direction === 'vertical' && startingCoord + i < 100) {
        if (spaces[startingCoord + i].hasShipPart == false && (startingCoord < 10 && startingCoord + length - 1 < 10 || startingCoord > 9 && startingCoord.toString()[0] === (startingCoord + length - 1).toString()[0])) {
          shipPartChecker += 1;
        }
      }
    }

    return shipPartChecker;
  };

  var triangulate = function triangulate(coord, board) {
    var shipMayBeHere = [];
    var hitParts = [];
    var howManyHitsThisShipHas = 0;
    board.ships.forEach(function (ship) {
      for (var _i = 0; _i < ship.coordinates.length; _i++) {
        if (ship.coordinates[_i].coordinate === coord) {
          ship.coordinates.forEach(function (coordinate) {
            if (coordinate.hit) {
              howManyHitsThisShipHas += 1;
              hitParts.push(coordinate.coordinate);
            }
          });
        }
      }
    });

    if (howManyHitsThisShipHas === 1) {
      if (coord - 1 >= 0 && !board.spaces[coord - 1].hit) {
        if (coord < 10 || coord.toString()[1] !== '0') {
          shipMayBeHere.push(coord - 1);
        }
      }

      if (coord + 1 <= 99 && !board.spaces[coord + 1].hit) {
        if (coord < 9 || coord > 9 && coord.toString()[1] !== '9') shipMayBeHere.push(coord + 1);
      }

      if (coord - 10 >= 0 && !board.spaces[coord - 10].hit) {
        shipMayBeHere.push(coord - 10);
      }

      if (coord + 10 <= 99 && !board.spaces[coord + 10].hit) {
        shipMayBeHere.push(coord + 10);
      }
    } else if (howManyHitsThisShipHas > 1) {
      if (hitParts[0] === hitParts[1] + 10 || hitParts[0] === hitParts[1] - 10) {
        hitParts.forEach(function (hitPart) {
          //direction: horizontal
          if (hitPart - 10 >= 0 && !board.spaces[hitPart - 10].hit) {
            shipMayBeHere.push(hitPart - 10);
          }

          if (hitPart + 10 <= 99 && !board.spaces[hitPart + 10].hit) {
            shipMayBeHere.push(hitPart + 10);
          }
        });
      } else {
        hitParts.forEach(function (hitPart) {
          //direction: vertical
          if (hitPart - 1 >= 0 && !board.spaces[hitPart - 1].hit) {
            if (hitPart < 10 || hitPart.toString()[1] !== '0') {
              shipMayBeHere.push(hitPart - 1);
            }
          }

          if (hitPart + 1 <= 99 && !board.spaces[hitPart + 1].hit) {
            if (hitPart < 9 || hitPart > 9 && hitPart.toString()[1] !== '9') shipMayBeHere.push(hitPart + 1);
          }
        });
      }
    }

    return shipMayBeHere;
  };

  return {
    spaces: spaces,
    placeShip: placeShip,
    ships: ships,
    receiveAttack: receiveAttack,
    checkIfAllSunk: checkIfAllSunk,
    triangulate: triangulate
  };
};

module.exports = gameboard;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var ship = function ship(length, startingCoord, direction) {
  var coordinates = [{
    coordinate: startingCoord,
    hit: false
  }];

  for (var i = 1; i < length; i++) {
    if (direction === 'horizontal') {
      coordinates.push({
        coordinate: coordinates[coordinates.length - 1].coordinate + 10,
        hit: false
      });
    } else {
      coordinates.push({
        coordinate: coordinates[coordinates.length - 1].coordinate + 1,
        hit: false
      });
    }
  }

  var isSunk = function isSunk() {
    return coordinates.every(function (coordinate) {
      return coordinate.hit;
    });
  };

  var hit = function hit(coord) {
    var shipWasHit = false;
    coordinates.forEach(function (coordinate, i) {
      if (coord === coordinate.coordinate) {
        shipWasHit = true;
        coordinates[i].hit = true;
      }
    });
    return shipWasHit;
  };

  return {
    shipLength: length,
    isSunk: isSunk,
    coordinates: coordinates,
    hit: hit
  };
};

module.exports = ship;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var gameboard = __webpack_require__(0);

var player = function player() {
  var randomCoord;

  var attack = function attack(attackedBoard, coord) {
    if (attackedBoard.spaces[coord].hit === false) {
      attackedBoard.receiveAttack(coord);
    }
  };

  var autoPlaceShips = function autoPlaceShips(board) {
    var directions = ['horizontal', 'vertical'];
    var lengths = [2, 3, 3, 4, 5];
    lengths.forEach(function (length, i) {
      while (board.ships.length <= i) {
        board.placeShip(length, Math.floor(Math.random() * 100), directions[Math.round(Math.random())]);
      }
    });
  };

  return {
    attack: attack,
    autoPlaceShips: autoPlaceShips
  };
};

module.exports = player;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "c227e3d130248bceffdc67ece1725486.png");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "27587854664d182b8567713e6b834251.png");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "2f3dfa564d6fda214d3c6212cfb98264.png");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "b01796ec6649891880f119c105beb1f2.png");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "f565c4b5f2c3ded13332ae4b8f7aa018.png");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "1be19b25ea4bc9bd255e6b5c64745ba7.png");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "2df37ba6f40446f4c94568d2ef78cd82.png");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "b6c73f6206ade62eeb5d8be8a9d53290.png");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "e4b65858e0e6ce35e89209634eb41765.png");

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "99d725889e6c4314ce9271bbb7a6f846.png");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var player = __webpack_require__(2);

var gameboard = __webpack_require__(0);

var beginGame = __webpack_require__(22);

var gameSetup = function gameSetup() {
  var myBoard = document.getElementById('my-board');
  var restart = document.getElementById('restart');
  var status = document.getElementById('status');
  var win = document.getElementById('win');
  var fail = document.getElementById('fail');
  var setupInstruction = document.getElementById('setup-instruction');
  var mySpaces = Array.from(document.getElementsByClassName('my-space'));
  var enemySpaces = Array.from(document.getElementsByClassName('enemy-space'));
  var computer = player();
  var human = player();
  var computerBoard = gameboard();
  var humanBoard = gameboard();
  var shipTypes = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrolboat'];
  var suffix = '';
  var direction = 'horizontal';
  computer.autoPlaceShips(computerBoard);
  restart.style.display = 'none';
  win.style.display = 'none';

  var placeShips = function placeShips() {
    for (i = 0; i < mySpaces.length; i++) {
      mySpaces[i].addEventListener('mouseover', hover);
      mySpaces[i].addEventListener('click', placeShip);
    }

    myBoard.addEventListener('wheel', changeDirection);
  };

  var hover = function hover(e) {
    var oldImg = document.getElementsByClassName('ship')[0];

    if (oldImg) {
      if (oldImg.parentElement !== e.currentTarget) {
        removeOldShip(oldImg);
        addNewShip(e);
      }
    } else {
      addNewShip(e);
    }
  };

  var removeOldShip = function removeOldShip(oldImg) {
    oldImg.parentElement.removeChild(oldImg);
  };

  var addNewShip = function addNewShip(event) {
    var img = document.createElement('div');
    img.setAttribute('class', "ship ".concat(shipTypes[0], " ").concat(suffix));
    event.currentTarget.appendChild(img);
  };

  var placeShip = function placeShip(e) {
    var spaceIndex = mySpaces.indexOf(e.currentTarget);
    var shipType = shipTypes[0];
    var placedShipsNum = humanBoard.ships.length;

    if (shipType === 'carrier') {
      humanBoard.placeShip(5, spaceIndex, direction);
    } else if (shipType === 'battleship') {
      humanBoard.placeShip(4, spaceIndex, direction);
    } else if (shipType === 'destroyer') {
      humanBoard.placeShip(3, spaceIndex, direction);
    } else if (shipType === 'submarine') {
      humanBoard.placeShip(3, spaceIndex, direction);
    } else if (shipType === 'patrolboat') {
      humanBoard.placeShip(2, spaceIndex, direction);
    }

    if (humanBoard.ships.length > placedShipsNum) {
      var shipImage = document.createElement('div');
      shipImage.setAttribute('class', "".concat(shipType, " ").concat(suffix));
      e.currentTarget.appendChild(shipImage);
      shipTypes.splice(0, 1);
    }

    if (shipTypes.length === 0) {
      mySpaces.forEach(function (mySpace) {
        mySpace.removeEventListener('click', placeShip);
      });
      var round = beginGame(computer, human, computerBoard, humanBoard);

      if (round.win) {
        restart.addEventListener('click', reset);
      }
    }
  };

  var changeDirection = function changeDirection(event) {
    if (event.wheelDelta < 0) {
      suffix = '';
      direction = 'horizontal';
    } else if (event.wheelDelta > 0) {
      suffix = 'vert';
      direction = 'vertical';
    }

    var img = document.getElementsByClassName('ship')[0];
    img.setAttribute('class', "ship ".concat(shipTypes[0], " ").concat(suffix));
  };

  var reset = function reset() {
    status.textContent = 'Place your ships!';
    mySpaces.forEach(function (mySpace) {
      mySpace.innerHTML = '';
    });
    enemySpaces.forEach(function (enemySpace) {
      enemySpace.innerHTML = '';
    });
    fail.style.display = 'none';
    win.style.display = 'none';
    restart.style.display = 'none';
    setupInstruction.style.display = 'block';
    shipTypes = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrolboat'];
    humanBoard = gameboard();
    computerBoard = gameboard();
    computer.autoPlaceShips(computerBoard);
    placeShips();
  };

  return {
    placeShips: placeShips
  };
};

module.exports = gameSetup;

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_gameboard_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ship_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_player_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _game_setup_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _game_setup_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_game_setup_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_carrier_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3);
/* harmony import */ var _assets_battleship_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4);
/* harmony import */ var _assets_destroyer_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5);
/* harmony import */ var _assets_submarine_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6);
/* harmony import */ var _assets_patrolboat_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7);
/* harmony import */ var _assets_fire_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8);
/* harmony import */ var _assets_water_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9);
/* harmony import */ var _assets_fail_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(11);
/* harmony import */ var _assets_smoke_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(10);
/* harmony import */ var _assets_win_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(12);















var setup = _game_setup_js__WEBPACK_IMPORTED_MODULE_4___default()();
setup.placeShips(); // TODO: add triangulation so that computer is not as stupid

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(16);
            var content = __webpack_require__(17);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(18);
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(19);
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(20);
var ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__(21);
var ___CSS_LOADER_URL_IMPORT_2___ = __webpack_require__(3);
var ___CSS_LOADER_URL_IMPORT_3___ = __webpack_require__(4);
var ___CSS_LOADER_URL_IMPORT_4___ = __webpack_require__(5);
var ___CSS_LOADER_URL_IMPORT_5___ = __webpack_require__(6);
var ___CSS_LOADER_URL_IMPORT_6___ = __webpack_require__(7);
var ___CSS_LOADER_URL_IMPORT_7___ = __webpack_require__(8);
var ___CSS_LOADER_URL_IMPORT_8___ = __webpack_require__(9);
var ___CSS_LOADER_URL_IMPORT_9___ = __webpack_require__(10);
var ___CSS_LOADER_URL_IMPORT_10___ = __webpack_require__(11);
var ___CSS_LOADER_URL_IMPORT_11___ = __webpack_require__(12);
exports = ___CSS_LOADER_API_IMPORT___(false);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_9___);
var ___CSS_LOADER_URL_REPLACEMENT_10___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_10___);
var ___CSS_LOADER_URL_REPLACEMENT_11___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_11___);
// Module
exports.push([module.i, "html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}@font-face{font-family:'army';font-style:normal;src:url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ")}@font-face{font-family:'typewriter';font-style:normal;src:url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ")}body{background-image:url(\"https://i.pinimg.com/originals/51/30/1a/51301a71b27ae8176b58df9f296c50ac.jpg\");background-repeat:no-repeat;background-size:cover;-webkit-box-sizing:border-box;box-sizing:border-box}img{border:1px solid white}.container{margin:0 auto;width:850px}#status{color:lightgrey;font-family:'army', sans-serif;font-size:36px;margin:10px auto 20px auto;text-align:center;width:600px}#restart{background:grey;border-radius:5px;font-family:'typewriter', sans-serif;font-size:28px;font-weight:bold;height:40px;margin:0 auto;width:150px}.top-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;margin:0 auto;width:600px}.my-board,.enemy-board{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse;-ms-flex-wrap:wrap;flex-wrap:wrap}.my-board{background:#acceea;border:2px solid #286ba2;height:35.05vh;min-height:270px;min-width:270px;position:relative;width:35.1vh}.my-space{border-bottom:0.5px solid #286ba2;border-right:0.5px solid #286ba2;height:3.4vh;min-height:25.5px;min-width:25.5px;position:relative;width:3.4vh}.carrier,.battleship,.destroyer,.submarine,.patrolboat{background-repeat:no-repeat;background-size:100% 100%;height:3.4vh;min-height:25.5px;overflow:visible;z-index:100 !important}.carrier:active,.battleship:active,.destroyer:active,.submarine:active,.patrolboat:active{background:grey}.carrier{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");min-width:127.5px;width:17vh}.battleship{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");min-width:102px;width:13.6vh}.destroyer,.submarine{min-width:76.5px;width:10.2vh}.destroyer{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ")}.submarine{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ")}.patrolboat{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ");min-width:51px;width:6.8vh}.vert{background-repeat:no-repeat;background-size:100% 100%;overflow:visible;-webkit-transform:translate(10%, 35%) rotate(-90deg);-ms-transform:translate(10%, 35%) rotate(-90deg);transform:translate(10%, 35%) rotate(-90deg);-webkit-transform-origin:left;-ms-transform-origin:left;transform-origin:left;z-index:100 !important}.enemy-board-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%}.enemy-board-wrapper .shrinker{-ms-flex-negative:2;flex-shrink:2;min-width:260px;width:36vh}.enemy-board-wrapper .enemy-board{background:white;border:2px solid #743c3c;height:54.03vh;min-height:405px;min-width:400px;position:relative;width:54.3vh}.enemy-board-wrapper .enemy-board .setup-instruction-container{background:#595453;border:2px solid black;height:54.03vh;left:-2px;min-height:405px;min-width:400px;position:absolute;top:-2px;width:54.3vh;z-index:100}.enemy-board-wrapper .enemy-board .setup-instruction{margin:10px auto;text-align:left;width:98%}.enemy-board-wrapper .enemy-board h1{font-family:'army', sans-serif;font-size:3vh;text-align:center}.enemy-board-wrapper .enemy-board .info{margin:8px 0}.enemy-board-wrapper .enemy-board .info,.enemy-board-wrapper .enemy-board .ship-name{font-family:'typewriter';font-size:2.1vh;font-weight:bold}.enemy-board-wrapper .enemy-board .boats{background:grey;border:2px solid rgba(89,84,83,0.74);border-radius:5px;margin:0 auto;position:relative;width:300px}.enemy-board-wrapper .enemy-board .ship-name,.enemy-board-wrapper .enemy-board .type{display:inline-block;margin:0;position:relative}.enemy-board-wrapper .enemy-board .ship-name{bottom:10px;font-size:20px}.enemy-board-wrapper .enemy-board .enemy-space{border-bottom:0.5px solid #743c3c;border-right:0.5px solid #743c3c;height:5.3vh;min-height:39px;min-width:39px;position:relative;width:5.3vh}.enemy-board-wrapper .enemy-board .enemy-space:hover{background:rgba(116,60,60,0.2)}.my{height:3.4vh;min-height:25.5px;min-width:25.5px;width:3.4vh}.enemy{height:5.3vh;min-height:39.5px;min-width:39.5px;width:5.3vh}.fire,.water,.smoke{background-repeat:no-repeat;background-size:100% 100%;left:0;position:absolute;top:0}.fire{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ")}.water{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ")}.smoke{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ")}@media all and (max-width: 1024px){.container{width:80vw}.shrinker{-ms-flex-negative:4;flex-shrink:4;min-width:0 !important}.enemy-board{-ms-flex-negative:0;flex-shrink:0}}@media all and (max-width: 500px){h1{font-size:24px !important}.info{font-size:14px !important}}#fail{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_10___ + ");background-size:100% 100%;border:2px solid #286ba2;display:none;height:35.7vh;left:0;min-height:260px;min-width:260px;position:absolute;top:0;width:36vh;z-index:999999}#win{background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_11___ + ");background-repeat:no-repeat;background-size:100% auto;height:100%;left:0;position:absolute;top:0;width:100%;z-index:999999}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), "\"");
  }

  return url;
};

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "05782b20052d5dccbad3bbda77571aa8.ttf");

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "1f8a446f5a562edf4ae817b9af0b7c03.ttf");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var player = __webpack_require__(2);

var gameboard = __webpack_require__(0);

var ship = __webpack_require__(1);

var beginGame = function beginGame(computerPlayer, humanPlayer, computerBoard, humanBoard) {
  var mySpaces = Array.from(document.getElementsByClassName('my-space'));
  var enemySpaces = Array.from(document.getElementsByClassName('enemy-space'));
  var setupInstruction = document.getElementById('setup-instruction');
  var status = document.getElementById('status');
  var enemyBoard = document.getElementById('enemy-board');
  var restart = document.getElementById('restart');
  var endGame;
  var oldAttackIndex;
  var currentAttackIndex;
  var randomPick;
  var coordsForRandom = [];

  for (i = 0; i < 100; i++) {
    coordsForRandom.push(i);
  }

  var shipMayBeHere = coordsForRandom;
  var activePursuit = false;
  status.textContent = 'OK, you start. Attack!';
  setupInstruction.style.display = 'none';

  var humanPlay = function humanPlay() {
    enemySpaces.forEach(function (enemySpace) {
      enemySpace.addEventListener('click', placeAttack);
    });
  };

  var placeAttack = function placeAttack(e) {
    var enemySpaceIndex = enemySpaces.indexOf(e.currentTarget);
    humanPlayer.attack(computerBoard, enemySpaceIndex);
    showAttack(computerBoard, 'enemy', enemySpaceIndex, e.currentTarget);
    enemySpaces[enemySpaceIndex].removeEventListener('click', placeAttack);
    markSunkShip(enemySpaceIndex);
    endGame = computerBoard.checkIfAllSunk();

    if (endGame) {
      win('You win! Congrats!');
    } else {
      computerPlay();
    }
  };

  var showAttack = function showAttack(attackedBoard, attackedClassName, coord, attackedDiv) {
    var resultOfAttack = document.createElement('div');

    if (attackedBoard.spaces[coord].hasShipPart) {
      resultOfAttack.setAttribute('class', "".concat(attackedClassName, " fire"));
    } else {
      resultOfAttack.setAttribute('class', "".concat(attackedClassName, " water"));
    }

    attackedDiv.appendChild(resultOfAttack);
  };

  var markSunkShip = function markSunkShip(index) {
    computerBoard.ships.forEach(function (ship) {
      for (var _i = 0; _i < ship.coordinates.length; _i++) {
        if (ship.coordinates[_i].coordinate === index) {
          if (ship.isSunk()) {
            ship.coordinates.forEach(function (coordinate) {
              var hitIndex = coordinate.coordinate;
              enemySpaces[hitIndex].childNodes[0].setAttribute('class', 'enemy smoke');
            });
          }
        }
      }
    });
  };

  var computerPlay = function computerPlay() {
    if (!activePursuit) {
      randomCompPlay();
    } else {
      activePursuitPlay();
    }

    endGame = humanBoard.checkIfAllSunk();

    if (endGame) {
      win('computer wins!');
    } else {
      status.textContent = 'enemy\'s quick, your turn again';
    }
  };

  var randomCompPlay = function randomCompPlay() {
    randomPick = Math.floor(Math.random() * 100);

    if (coordsForRandom[randomPick] === 'done') {
      computerPlay();
    } else {
      computerPlayer.attack(humanBoard, shipMayBeHere[randomPick]);
      coordsForRandom.splice(randomPick, 1, 'done');

      if (humanBoard.spaces[randomPick].hasShipPart) {
        shipMayBeHere = humanBoard.triangulate(randomPick, humanBoard);
        oldAttackIndex = randomPick;
        activePursuit = true;
      } else {
        shipMayBeHere = coordsForRandom;
      }

      mySpaces[randomPick].removeEventListener('click', placeAttack);
      showAttack(humanBoard, 'my', randomPick, mySpaces[randomPick]);
    }
  };

  var activePursuitPlay = function activePursuitPlay() {
    smartAttack();

    if (shipWasHit()) {
      if (checkIfSunk(currentAttackIndex)) {
        activePursuit = false;
        shipMayBeHere = coordsForRandom;
        checkIfAdjacentShipHitDuringTriangulation();
      } else {
        shipMayBeHere = humanBoard.triangulate(currentAttackIndex, humanBoard);
      }
    } else {
      shipMayBeHere = humanBoard.triangulate(oldAttackIndex, humanBoard);
    }

    showAttack(humanBoard, 'my', currentAttackIndex, mySpaces[currentAttackIndex]);
  };

  var smartAttack = function smartAttack() {
    randomPick = Math.floor(Math.random() * shipMayBeHere.length);
    currentAttackIndex = shipMayBeHere[randomPick];

    if (!humanBoard.spaces[currentAttackIndex]) {
      smartAttack();
    }

    computerPlayer.attack(humanBoard, currentAttackIndex);
    coordsForRandom.splice(shipMayBeHere[randomPick], 1, 'done');
  };

  var shipWasHit = function shipWasHit() {
    return humanBoard.spaces[currentAttackIndex].hasShipPart;
  };

  var checkIfSunk = function checkIfSunk(index) {
    var hitShip = findHitShip(index);
    return hitShip.isSunk();
  };

  var findHitShip = function findHitShip(index) {
    var hitShip = humanBoard.ships.find(function (ship) {
      var hasMatchingCoordinate = false;
      ship.coordinates.forEach(function (coord) {
        if (coord.coordinate === index) {
          hasMatchingCoordinate = true;
        }
      });
      return hasMatchingCoordinate;
    });
    return hitShip;
  };

  var checkIfAdjacentShipHitDuringTriangulation = function checkIfAdjacentShipHitDuringTriangulation() {
    var adjacentShipIndices = [];
    humanBoard.spaces.forEach(function (space) {
      if (space.hit && space.hasShipPart) {
        adjacentShipIndices.push(space.coordinate);
      }
    });
    var adjacentShipIndex = adjacentShipIndices.find(function (index) {
      return !checkIfSunk(index);
    });

    if (adjacentShipIndex !== undefined) {
      activePursuit = true;
      shipMayBeHere = humanBoard.triangulate(adjacentShipIndex, humanBoard);
    }
  };

  var win = function win(player) {
    restart.style.display = 'block';

    if (player === 'computer wins!') {
      var fail = document.getElementById('fail');
      fail.style.display = 'block';
    } else {
      var _win = document.getElementById('win');

      _win.style.display = 'block';
    }

    status.textContent = "".concat(player, " Play again?");
    enemySpaces.forEach(function (enemySpace) {
      enemySpace.removeEventListener('click', placeAttack);
    });
    return true;
  };

  humanPlay();
  return {
    win: win
  };
};

module.exports = beginGame;

/***/ })
/******/ ]);