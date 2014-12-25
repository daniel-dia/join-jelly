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
                this.timeByLevel = 10000;
                this.initialInterval = 900;
                this.finalInterval = 150;
                this.easeInterval = 0.97;
                this.UserData = userData;
                this.score = 0;
                this.createBackground();
                this.createBoard();
                this.createGUI();
            }
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
                this.board.y = (2048 - 1536) / 2 + 100;
                this.content.addChild(this.board);
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
                // creates pause menu
                this.pauseMenu = new gameplay.view.PauseMenu();
                this.content.addChild(this.pauseMenu);
                // creates a end menu
                this.finishMenu = new gameplay.view.FinishMenu();
                this.content.addChild(this.finishMenu);
                // creates a toggle button
                var tbt = new gameui.ImageButton("GameOverBoard", function () {
                    _this.finishMenu.show();
                    tbt.fadeOut();
                    gameui.AssetsManager.playSound("Interface Sound-06");
                });
                tbt.set({ x: 150, y: -150, visible: false });
                this.footer.addChild(tbt);
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
            // Starts the game
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
                this.step();
                // log game start event
                joinjelly.JoinJelly.analytics.logGameStart();
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
                // releases all jellys
                this.board.releaseAll();
                // save high score
                joinjelly.JoinJelly.userData.setScore(score);
                // shows finished game menu
                setTimeout(function () {
                    _this.finishMenu.show();
                }, 1200);
                this.finishMenu.setValues(score, highScore, highJelly, message);
                // move the board a little up
                createjs.Tween.get(this.board).to({ y: this.board.y - 200 }, 800, createjs.Ease.quadInOut);
                // log event
                joinjelly.JoinJelly.analytics.logEndGame(this.matches, this.score, this.level, highJelly);
                // play end soud
                gameui.AssetsManager.playSound("end");
                // move board to top
                createjs.Tween.get(this.gameHeader).to({ y: -425 }, 200, createjs.Ease.quadIn);
                // play end game effect
                this.board.endGameEffect();
            };
            // winTheGame
            GamePlayScreen.prototype.winGame = function () {
                this.endGame(StringResources.menus.gameOver);
                // TODO something great
            };
            // time step for adding tiles.
            GamePlayScreen.prototype.step = function () {
                var _this = this;
                // if is not playing, than does not execute a step
                if (this.gamestate == 1 /* playing */) {
                    // add a new tile  on board
                    this.addRandomTileOnBoard();
                    // updates interafce information
                    this.updateInterfaceInfos();
                    // verifies if game is ended
                    if (this.verifyGameLoose())
                        this.endGame();
                    // update currentLevel
                    this.updateCurrentLevel();
                }
                // set timeout to another iteraction if game is not over
                if (this.gamestate != 3 /* ended */)
                    setTimeout(function () {
                        _this.step();
                    }, this.getTimeInterval(this.level, this.initialInterval, this.finalInterval, this.easeInterval));
            };
            // update current level
            GamePlayScreen.prototype.updateCurrentLevel = function () {
                var newLevel = this.getLevelByMoves(this.matches);
                if (newLevel > this.level)
                    this.levelUpInterfaceEffect(newLevel);
                this.level = newLevel;
            };
            // calculate current level by moves. 
            // once level calculation is a iterative processe, this method uses a iterative calculation
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
                if (empty.length == 0)
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
            //verifies if a tile can pair another, and make it happens
            GamePlayScreen.prototype.match = function (origin, target) {
                //check if match is correct
                if (origin.getNumber() != 0 && target != origin && target.getNumber() == origin.getNumber() && target.isUnlocked) {
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
                    // update score
                    this.score += newValue * 10 + Math.floor(Math.random() * newValue);
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
                }
                return false;
            };
            // #endregion
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