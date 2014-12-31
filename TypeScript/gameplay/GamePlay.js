var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var GameState;
        (function (GameState) {
            GameState[GameState["starting"] = 0] = "starting";
            GameState[GameState["playing"] = 1] = "playing";
            GameState[GameState["paused"] = 2] = "paused";
            GameState[GameState["ended"] = 3] = "ended";
        })(GameState || (GameState = {}));
        var GamePlayScreen = (function (_super) {
            __extends(GamePlayScreen, _super);
            //#region =================================== initialization ================================================
            function GamePlayScreen(userData) {
                _super.call(this);
                this.matches = 0;
                this.boardSize = 5;
                // parameters
                this.itemProbability = 0.005;
                this.timeByLevel = 10000;
                this.initialInterval = 900;
                this.finalInterval = 150;
                this.easeInterval = 0.97;
                this.UserData = userData;
                this.score = 0;
                this.createBackground();
                this.createBoard();
                this.createGUI();
                this.createEffects();
            }
            // create game effects
            GamePlayScreen.prototype.createEffects = function () {
                this.freezeEffect = gameui.AssetsManager.getBitmap("freezeEffect");
                this.content.addChild(this.freezeEffect);
                this.freezeEffect.visible = false;
                this.freezeEffect.scaleX = this.freezeEffect.scaleY = 2;
                this.freezeEffect.mouseEnabled = false;
                this.fastEffect = gameui.AssetsManager.getBitmap("fastEffect");
                this.content.addChild(this.fastEffect);
                this.fastEffect.visible = false;
                this.fastEffect.scaleX = this.fastEffect.scaleY = 2;
                this.fastEffect.mouseEnabled = false;
                this.reviveEffect = gameui.AssetsManager.getBitmap("reviveEffect");
                this.content.addChild(this.reviveEffect);
                this.reviveEffect.visible = false;
                this.reviveEffect.scaleX = this.reviveEffect.scaleY = 2;
                this.reviveEffect.mouseEnabled = false;
                this.cleanEffect = gameui.AssetsManager.getBitmap("cleanEffect");
                this.content.addChild(this.cleanEffect);
                this.cleanEffect.visible = false;
                this.cleanEffect.scaleX = this.cleanEffect.scaleY = 2;
                this.cleanEffect.mouseEnabled = false;
            };
            // create game background
            GamePlayScreen.prototype.createBackground = function () {
                var bg = gameui.AssetsManager.getBitmap("Background");
                this.background.addChild(bg);
            };
            // create a new board
            GamePlayScreen.prototype.createBoard = function () {
                var _this = this;
                this.board = new gameplay.Board(this.boardSize, this.boardSize, 1536 / 5, true);
                this.board.addEventListener("tileMove", function (e) {
                    _this.dragged(e.target.origin, e.target.target);
                });
                this.content.addChild(this.board);
                this.board.x = defaultWidth / 2;
                this.board.y = defaultHeight / 2;
            };
            // creates the game GUI
            GamePlayScreen.prototype.createGUI = function () {
                var _this = this;
                // creates game level indicator
                this.gameLevelIndicator = new gameplay.view.LevelIndicator();
                this.content.addChild(this.gameLevelIndicator);
                // creates game header
                this.gameHeader = new gameplay.view.GameHeader();
                this.header.addChild(this.gameHeader);
                // create game footer
                this.gameFooter = new gameplay.view.GameFooter(["time", "clean", "fast", "revive"]);
                this.footer.addChild(this.gameFooter);
                this.gameFooter.addEventListener("useitem", function (e) {
                    _this.useItem(e.target);
                });
                // creates pause menu
                this.pauseMenu = new gameplay.view.PauseMenu();
                this.content.addChild(this.pauseMenu);
                // creates a end menu
                this.finishMenu = new gameplay.view.FinishMenu();
                this.content.addChild(this.finishMenu);
                this.finishMenu.y = -200;
                // creates a toggle button
                var tbt = new gameui.ImageButton("GameOverBoard", function () {
                    _this.finishMenu.show();
                    tbt.fadeOut();
                    gameui.AssetsManager.playSound("Interface Sound-06");
                });
                tbt.set({ x: 150, y: -150, visible: false });
                this.footer.addChild(tbt);
                this.showBoardButton = tbt;
                //add eventListener
                this.finishMenu.addEventListener("ok", function () {
                    joinjelly.JoinJelly.showMainMenu();
                });
                this.finishMenu.addEventListener("board", function () {
                    _this.finishMenu.hide();
                    tbt.fadeIn();
                });
                this.finishMenu.addEventListener("share", function () {
                    //
                });
                this.gameHeader.addEventListener("pause", function () {
                    _this.pauseGame();
                });
                this.pauseMenu.addEventListener("play", function () {
                    _this.continueGame();
                });
                this.pauseMenu.addEventListener("home", function () {
                    _this.pauseMenu.hide();
                    setTimeout(function () {
                        joinjelly.JoinJelly.showMainMenu();
                    }, 200);
                });
                this.pauseMenu.addEventListener("restart", function () {
                    _this.pauseMenu.hide();
                    setTimeout(function () {
                        joinjelly.JoinJelly.startLevel();
                    }, 200);
                });
            };
            //#endregion
            // #region =================================== interface =====================================================
            // update GUI iformaion
            GamePlayScreen.prototype.updateInterfaceInfos = function () {
                //calculate interval 
                var nextLevelScore = this.getMovesByLevel(this.level);
                var currentLevelScore = this.getMovesByLevel(this.level - 1);
                var percent = (this.matches - currentLevelScore) / (nextLevelScore - currentLevelScore) * 100;
                // defines alarm condition
                var emptySpaces = this.board.getPercentEmptySpaces();
                var alarm = false;
                if (emptySpaces < 0.25 && emptySpaces > 0)
                    var alarm = true;
                // updates the header
                this.gameHeader.updateStatus(this.score, this.level, percent, emptySpaces, alarm);
                // updates board shaking.
                this.board.setAlarm(alarm);
            };
            // level up
            GamePlayScreen.prototype.levelUpInterfaceEffect = function (level) {
                this.gameLevelIndicator.showLevel(level);
                gameui.AssetsManager.playSound("Interface Sound-11");
                this.board.levelUpEffect();
            };
            // #endregion
            // #region =================================== gamelay =======================================================
            // starts the game
            GamePlayScreen.prototype.start = function () {
                this.level = 1;
                this.matches = 0;
                // board initialization
                this.board.cleanBoard();
                this.board.unlock();
                // update interfaces
                this.updateInterfaceInfos();
                // play music
                gameui.AssetsManager.playMusic("music1");
                // initialize gameloop
                this.gamestate = 1 /* playing */;
                this.step(500);
                // log game start event
                joinjelly.JoinJelly.analytics.logGameStart();
            };
            // time step for adding tiles.
            GamePlayScreen.prototype.step = function (timeout) {
                var _this = this;
                clearInterval(this.timeoutInterval);
                this.timeoutInterval = setTimeout(function () {
                    // if is not playing, than does not execute a step
                    if (_this.gamestate == 1 /* playing */)
                        _this.gameInteraction();
                    // set timeout to another iteraction if game is not over
                    if (_this.gamestate != 3 /* ended */)
                        _this.step(_this.getTimeInterval(_this.level, _this.initialInterval, _this.finalInterval, _this.easeInterval));
                }, timeout);
            };
            // executes a game interaction
            GamePlayScreen.prototype.gameInteraction = function () {
                // add a new tile  on board
                this.addRandomTileOnBoard();
                // updates interafce information
                this.updateInterfaceInfos();
                // verifies if game is loosed after 500ms again. if them both than loose game
                if (this.verifyGameLoose())
                    this.endGame();
                // update currentLevel
                this.updateCurrentLevel();
            };
            // pause game
            GamePlayScreen.prototype.pauseGame = function () {
                this.pauseMenu.show();
                this.gamestate = 2 /* paused */;
                this.board.lock();
                this.gameHeader.mouseEnabled = false;
            };
            // unpause game
            GamePlayScreen.prototype.continueGame = function () {
                this.pauseMenu.hide();
                this.gamestate = 1 /* playing */;
                this.board.unlock();
                this.gameHeader.mouseEnabled = true;
            };
            // finishes the game
            GamePlayScreen.prototype.endGame = function (message) {
                var _this = this;
                this.gamestate = 3 /* ended */;
                var score = this.score;
                var highScore = joinjelly.JoinJelly.userData.getHighScore();
                var highJelly = this.board.getHighestTileValue();
                // disable mouse interaction
                this.board.lock();
                this.board.setAlarm(false);
                // releases all jellys
                this.board.releaseAll();
                // save high score
                joinjelly.JoinJelly.userData.setScore(score);
                // remove other ui items
                this.gameHeader.mouseEnabled = false;
                this.gameFooter.mouseEnabled = false;
                createjs.Tween.get(this.gameHeader).to({ y: -425 }, 200, createjs.Ease.quadIn);
                createjs.Tween.get(this.gameFooter).to({ y: +300 }, 200, createjs.Ease.quadIn);
                // shows finished game menu
                setTimeout(function () {
                    _this.finishMenu.show();
                    _this.gameFooter.mouseEnabled = true;
                    // set footer items form revive
                    _this.gameFooter.setItems(["revive"]);
                    createjs.Tween.get(_this.gameFooter).to({ y: 0 }, 200, createjs.Ease.quadIn);
                }, 1200);
                this.finishMenu.setValues(score, highScore, highJelly, message);
                // log event
                joinjelly.JoinJelly.analytics.logEndGame(this.matches, this.score, this.level, highJelly);
                // play end soud
                gameui.AssetsManager.playSound("end");
                // play end game effect
                this.board.endGameEffect();
            };
            // winTheGame
            GamePlayScreen.prototype.winGame = function () {
                this.endGame(StringResources.menus.gameOver);
                // TODO something great
            };
            // update current level
            GamePlayScreen.prototype.updateCurrentLevel = function () {
                var newLevel = this.getLevelByMoves(this.matches);
                if (newLevel > this.level)
                    this.levelUpInterfaceEffect(newLevel);
                this.level = newLevel;
            };
            // calculate current level by moves. once level calculation is a iterative processe, this method uses a iterative calculation
            GamePlayScreen.prototype.getLevelByMoves = function (moves) {
                var totalMoves = 0;
                var level = 0;
                while (totalMoves < moves) {
                    var interval = this.getTimeInterval(level, this.initialInterval, this.finalInterval, this.easeInterval);
                    var levelMoves = this.timeByLevel / interval;
                    totalMoves += levelMoves;
                    level++;
                }
                return Math.max(level, 1);
            };
            // get how moves is needed for each level;
            GamePlayScreen.prototype.getMovesByLevel = function (level) {
                var totalMoves = 0;
                for (var calculatedLevel = 0; calculatedLevel < level; calculatedLevel++) {
                    var interval = this.getTimeInterval(calculatedLevel, this.initialInterval, this.finalInterval, this.easeInterval);
                    var levelMoves = this.timeByLevel / interval;
                    totalMoves += levelMoves;
                }
                return totalMoves;
            };
            // calculate time interval for a level.
            GamePlayScreen.prototype.getTimeInterval = function (level, initialInterval, finalInterval, intervalEase) {
                return initialInterval * Math.pow(intervalEase, level) + finalInterval * (1 - Math.pow(intervalEase, level));
            };
            // Verifies if game is over
            GamePlayScreen.prototype.verifyGameLoose = function () {
                var empty = this.board.getEmptyTiles();
                var locked = this.board.getLockedTiles();
                if (empty.length == 0 && locked.length == 0)
                    return true;
                return false;
            };
            // add a random tile with value 1 on board
            GamePlayScreen.prototype.addRandomTileOnBoard = function (value) {
                if (value === void 0) { value = 1; }
                var empty = this.board.getEmptyTiles();
                // if there is no more empty tiles, ends the game
                if (empty.length > 0) {
                    var i = Math.floor(Math.random() * empty.length);
                    var tile = empty[i];
                    tile.setNumber(value);
                }
            };
            //called when a tile is dragged
            GamePlayScreen.prototype.dragged = function (origin, target) {
                //try to match the tiles
                this.match(origin, target);
            };
            GamePlayScreen.prototype.canMatch = function (origin, target) {
                return (origin.getNumber() != 0 && target != origin && target.getNumber() == origin.getNumber() && target.isUnlocked());
            };
            //verifies if a tile can pair another, and make it happens
            GamePlayScreen.prototype.match = function (origin, target) {
                //check if match is correct
                if (!this.canMatch(origin, target))
                    return false;
                this.matches++;
                // update currentLevel
                this.updateCurrentLevel();
                //calculate new value
                var newValue = target.getNumber() + origin.getNumber();
                //sum the tiles values
                target.setNumber(newValue);
                //reset the previous tile
                origin.setNumber(0);
                //animate the mach
                this.board.match(origin, target);
                // increase score
                var sum = newValue * 10 + Math.floor(Math.random() * newValue);
                this.score += sum;
                //this.animateScore(target, sum); // animate a score number
                // chance to win a item
                var item = this.giveItemChance(["time", "clean", "fast", "revive"]);
                if (item)
                    this.animateItemFromTile(target, item);
                // update score
                this.UserData.setScore(this.score);
                this.UserData.setLastJelly(newValue);
                this.updateInterfaceInfos();
                // notify match
                if (this.matchNotify)
                    this.matchNotify();
                // verify winGame
                if (newValue >= 8192)
                    this.winGame();
                // log event
                joinjelly.JoinJelly.analytics.logMove(this.matches, this.score, this.level, this.board.getEmptyTiles().length);
                return true;
            };
            //give item to user
            GamePlayScreen.prototype.giveItemChance = function (items) {
                var item = null;
                // calculate random change to win a item
                var goodChance = (Math.random() < this.itemProbability);
                goodChance = true;
                // if true
                if (goodChance) {
                    item = items[Math.floor(Math.random() * items.length)];
                }
                return item;
            };
            GamePlayScreen.prototype.animateItemFromTile = function (tile, item) {
                var _this = this;
                // create item Object
                var itemDO = gameui.AssetsManager.getBitmap("item" + item);
                itemDO.mouseEnabled = false;
                itemDO.regX = itemDO.getBounds().width / 2;
                itemDO.regY = itemDO.getBounds().height / 2;
                this.content.addChild(itemDO);
                // animate item to footer
                var xi = this.board.localToLocal(tile.x, tile.y, this.content).x;
                var yi = this.board.localToLocal(tile.x, tile.y, this.content).y;
                var xf = defaultWidth / 2;
                var yf = this.footer.y;
                ;
                var footerItem = this.gameFooter.getItem(item);
                if (footerItem) {
                    xf = this.gameFooter.localToLocal(footerItem.x, footerItem.y, this.content).x;
                    yf = this.gameFooter.localToLocal(footerItem.x, footerItem.y, this.content).y;
                }
                createjs.Tween.get(itemDO).to({ x: xi, y: yi, alpha: 0 }).to({ y: tile.y - 70, alpha: 1 }, 400, createjs.Ease.quadInOut).to({ x: xf, y: yf }, 1000, createjs.Ease.quadInOut).call(function () {
                    _this.content.removeChild(itemDO);
                });
            };
            // #endregion
            // #region =================================== Items =========================================================
            GamePlayScreen.prototype.useItem = function (item) {
                switch (item) {
                    case "time":
                        this.useTime();
                        break;
                    case "fast":
                        this.useFast();
                        break;
                    case "clean":
                        this.useClean();
                        break;
                    case "revive":
                        this.useRevive();
                        break;
                }
            };
            // reduces jellys per time during 5 seconds.
            GamePlayScreen.prototype.useTime = function () {
                var _this = this;
                if (this.gamestate == 3 /* ended */)
                    return;
                this.step(5000);
                //cast effects
                this.freezeEffect.alpha = 0;
                this.freezeEffect.visible = true;
                createjs.Tween.removeTweens(this.freezeEffect);
                createjs.Tween.get(this.freezeEffect).to({ alpha: 1 }, 1000).to({ alpha: 0 }, 4000).call(function () {
                    _this.freezeEffect.visible = false;
                });
            };
            //clan all simple jellys
            GamePlayScreen.prototype.useClean = function () {
                var _this = this;
                if (this.gamestate == 3 /* ended */)
                    return;
                var tiles = this.board.getAllTiles();
                for (var t in tiles)
                    if (tiles[t].getNumber() < 2) {
                        this.board.fadeTileToPos(tiles[t], tiles[t].x, tiles[t].y - 100, 200, 300 * Math.random());
                        tiles[t].setNumber(0);
                    }
                this.updateInterfaceInfos();
                //cast effects
                this.cleanEffect.alpha = 0;
                this.cleanEffect.visible = true;
                createjs.Tween.removeTweens(this.cleanEffect);
                createjs.Tween.get(this.cleanEffect).to({ alpha: 0 }, 200).to({ alpha: 1 }, 200).to({ alpha: 0 }, 200);
                createjs.Tween.get(this.cleanEffect).to({ x: -600, y: 2000 }).to({ x: 300, y: -500 }, 600).call(function () {
                    _this.cleanEffect.visible = false;
                });
            };
            // revive after game end
            GamePlayScreen.prototype.useRevive = function () {
                var _this = this;
                // back state to playing
                this.gamestate = 1 /* playing */;
                //ullock board
                this.board.unlock();
                // hide finish menu
                this.finishMenu.hide();
                // set next iteraction after 4 seconds
                this.step(4000);
                // update all interface
                this.updateInterfaceInfos();
                // set board alarm
                this.board.setAlarm(true);
                // hide show board button
                this.showBoardButton.fadeOut();
                // set footer items
                this.gameFooter.setItems(["time", "clean", "fast", "revive"]);
                // remove other ui items
                this.gameHeader.mouseEnabled = true;
                createjs.Tween.get(this.gameHeader).to({ y: -0 }, 200, createjs.Ease.quadIn);
                //cast effects
                this.reviveEffect.alpha = 0;
                this.reviveEffect.visible = true;
                createjs.Tween.removeTweens(this.reviveEffect);
                createjs.Tween.get(this.reviveEffect).to({ y: 1000 }).to({ y: 500, alpha: 1 }, 500).to({ y: 0, alpha: 0 }, 500).call(function () {
                    _this.reviveEffect.visible = false;
                });
            };
            // match 5 pair of jelly if avaliabe
            GamePlayScreen.prototype.useFast = function () {
                var _this = this;
                if (this.gamestate == 3 /* ended */)
                    return;
                var tiles = this.board.getAllTiles();
                var matches = [];
                for (var t in tiles) {
                    // 5 times
                    if (matches.length >= 5)
                        break;
                    var origin = tiles[t];
                    if (origin.getNumber() > 0 && origin.isUnlocked()) {
                        for (var t2 in tiles) {
                            var target = tiles[t2];
                            if (this.canMatch(origin, target)) {
                                origin.lock();
                                target.lock();
                                matches.push([origin, target]);
                                break;
                            }
                        }
                    }
                }
                for (var m in matches)
                    this.matchJelly(matches[m][0], matches[m][1]);
                //cast effects
                this.fastEffect.alpha = 1;
                this.fastEffect.visible = true;
                createjs.Tween.removeTweens(this.fastEffect);
                createjs.Tween.get(this.fastEffect).to({ alpha: 0 }, 500).call(function () {
                    _this.fastEffect.visible = false;
                });
            };
            // match two jellys with animation
            GamePlayScreen.prototype.matchJelly = function (origin, target) {
                var _this = this;
                this.board.fadeTileToPos(origin, target.x, target.y, 400, 200 * Math.random(), 1);
                setTimeout(function () {
                    target.unlock();
                    origin.unlock();
                    _this.match(origin, target);
                }, 300);
            };
            // #endregion
            // redim screen
            GamePlayScreen.prototype.redim = function (headerY, footerY, width, heigth) {
                _super.prototype.redim.call(this, headerY, footerY, width, heigth);
                var relativeScale = (this.screenHeight - 2048) / 400;
                if (relativeScale < 0)
                    relativeScale = 0;
                if (relativeScale > 1)
                    relativeScale = 1;
                this.board.scaleX = this.board.scaleY = 1 - (0.2 - relativeScale * 0.2);
            };
            //acivate the screen
            GamePlayScreen.prototype.activate = function (parameters) {
                var _this = this;
                _super.prototype.activate.call(this, parameters);
                this.gameHeader.alpha = 0;
                setTimeout(function () {
                    createjs.Tween.get(_this.gameHeader).to({ alpha: 1 }, 500);
                    _this.start();
                }, 500);
            };
            return GamePlayScreen;
        })(gameui.ScreenState);
        gameplay.GamePlayScreen = GamePlayScreen;
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=GamePlay.js.map