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
            //#region =================================== initialization ==========================================================
            function GamePlayScreen(userData) {
                _super.call(this);
                this.boardSize = 5;
                // count moves for log
                this.moves = 0;
                this.UserData = userData;
                this.score = 0;
                this.createBackground();
                this.createBoard();
                this.createGUI();
            }
            // create game background
            GamePlayScreen.prototype.createBackground = function () {
                this.background.addChild(gameui.AssetsManager.getBitmap("Background"));
            };
            // create a new board
            GamePlayScreen.prototype.createBoard = function () {
                var _this = this;
                this.board = new gameplay.view.Board(this.boardSize, this.boardSize, 1536 / 5, true);
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
                    createjs.Sound.play("Interface Sound-06");
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
                    _this.pauseMenu.show();
                });
                this.pauseMenu.addEventListener("play", function () {
                    _this.continueGame();
                    _this.pauseMenu.hide();
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
            // #region =================================== interface =======================================================
            // update GUI iformaion
            GamePlayScreen.prototype.updateInterfaceInfos = function () {
                var score = this.score;
                var level = this.getLevelByScore(score);
                var nextLevelScore = this.getScoreByLevel(level);
                var previousLevelScore = this.getScoreByLevel(level - 1);
                var percent = (score - previousLevelScore) / (nextLevelScore - previousLevelScore) * 100;
                // defines alarm condition
                var emptySpaces = this.board.getPercentEmptySpaces();
                var alarm = false;
                if (emptySpaces < 0.25 && emptySpaces > 0)
                    var alarm = true;
                // updates the header
                this.gameHeader.updateStatus(score, level, percent, emptySpaces, alarm);
                // updates board shaking.
                this.board.setAlarm(alarm);
                // do level up
                if (this.currentLevel != level && level > 1)
                    this.levelUp(level);
                // 
                this.currentLevel = level;
            };
            // level up
            GamePlayScreen.prototype.levelUp = function (level) {
                this.gameLevelIndicator.showLevel(level);
                createjs.Sound.play("Interface Sound-11");
                this.board.levelUpEffect();
            };
            // returns a score based on level
            GamePlayScreen.prototype.getScoreByLevel = function (level) {
                if (level == 0)
                    return 0;
                return 50 * Math.pow(2, level);
            };
            //return a level based on a score
            GamePlayScreen.prototype.getLevelByScore = function (score) {
                if (!score)
                    score = 1;
                return Math.floor(Math.log(Math.max(1, score / 50)) / Math.log(2)) + 1;
            };
            // #endregion
            // #region =================================== gamelay =======================================================
            // Starts the game
            GamePlayScreen.prototype.start = function () {
                var _this = this;
                this.board.cleanBoard();
                this.board.unlock();
                this.step();
                this.updateInterfaceInfos();
                this.timeInterval = 300;
                gameui.AssetsManager.playMusic("music1");
                this.gamePlayLoop = setInterval(function () {
                    _this.step();
                }, 10);
                this.gamestate = 1 /* playing */;
                // log game start event
                joinjelly.JoinJelly.analytics.logGameStart();
            };
            // pause game
            GamePlayScreen.prototype.pauseGame = function () {
                this.gamestate = 2 /* paused */;
                this.board.lock();
            };
            // finishes the game
            GamePlayScreen.prototype.endGame = function () {
                var _this = this;
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
                this.finishMenu.setValues(score, highScore, highJelly);
                // move the board a little up
                createjs.Tween.get(this.board).to({ y: this.board.y - 200 }, 800, createjs.Ease.quadInOut);
                // stop game loop
                if (this.gamePlayLoop)
                    clearInterval(this.gamePlayLoop);
                // log event
                joinjelly.JoinJelly.analytics.logEndGame(this.moves, this.score, this.currentLevel, highJelly);
                // play end soud
                gameui.AssetsManager.playSound("end");
                // move board to top
                createjs.Tween.get(this.gameHeader).to({ y: -425 }, 200, createjs.Ease.quadIn);
                // play end game effect
                this.board.endGameEffect();
            };
            // unpause game
            GamePlayScreen.prototype.continueGame = function () {
                this.gamestate = 1 /* playing */;
                this.board.unlock();
            };
            // time step for adding tiles.
            GamePlayScreen.prototype.step = function () {
                // if is not playing, than does not execute a step
                if (this.gamestate != 1 /* playing */)
                    return;
                // wait until interval 
                if (this.gameNextDrop > 0) {
                    this.gameNextDrop--;
                }
                else {
                    // defines next drop time interval
                    this.gameNextDrop = this.timeInterval / 10;
                    // decreate time interval
                    this.decreateInterval();
                    // add a new tile  on board
                    this.addRandomTileOnBoard();
                    // updates interafce information
                    this.updateInterfaceInfos();
                    // verifies if game is ended
                    if (this.verifyGameLoose())
                        this.endGame();
                }
            };
            // Verifies if game is over
            GamePlayScreen.prototype.verifyGameLoose = function () {
                var empty = this.board.getEmptyTiles();
                if (empty.length == 0)
                    return true;
                return false;
            };
            // add a random tile with value 1 on board
            GamePlayScreen.prototype.addRandomTileOnBoard = function () {
                var empty = this.board.getEmptyTiles();
                // if there is no more empty tiles, ends the game
                if (empty.length > 0) {
                    var i = Math.floor(Math.random() * empty.length);
                    var tile = empty[i];
                    tile.setNumber(1);
                }
            };
            //return a time interval for jelly addition based on user level;
            GamePlayScreen.prototype.decreateInterval = function () {
                var time = this.timeInterval;
                if (time < 500)
                    time -= 2;
                if (time < 400)
                    time -= 1;
                else
                    time -= 3;
                this.timeInterval = time;
                document.title = time.toString();
                return time;
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
                    this.moves++;
                    //calculate new value
                    var newValue = target.getNumber() + origin.getNumber();
                    //sum the tiles values
                    target.setNumber(newValue);
                    //reset the previous tile
                    origin.setNumber(0);
                    //animate the mach
                    this.board.match(origin, target);
                    this.score += newValue * 10 + Math.floor(Math.random() * newValue);
                    this.UserData.setScore(this.score);
                    this.UserData.setLastJelly(newValue);
                    this.updateInterfaceInfos();
                    // notify match
                    if (this.matchNotify)
                        this.matchNotify();
                    // log event
                    joinjelly.JoinJelly.analytics.logMove(this.moves, this.score, this.currentLevel, this.board.getEmptyTiles().length);
                    return true;
                }
                return false;
            };
            // #endregion
            //acivate the screen
            GamePlayScreen.prototype.activate = function (parameters) {
                _super.prototype.activate.call(this, parameters);
                this.start();
            };
            return GamePlayScreen;
        })(gameui.ScreenState);
        gameplay.GamePlayScreen = GamePlayScreen;
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=GamePlay.js.map