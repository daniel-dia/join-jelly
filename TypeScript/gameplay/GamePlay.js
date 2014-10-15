var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
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

                this.UserData = userData;

                this.score = 0;

                this.tiles = new Array();
                this.createBackground();
                this.createBoard();
                this.createGUI();
            }
            // create game background
            GamePlayScreen.prototype.createBackground = function () {
                this.background.addChild(new createjs.Bitmap("assets/Background.jpg"));
            };

            // create a new board
            GamePlayScreen.prototype.createBoard = function () {
                var _this = this;
                this.board = new gameplay.view.Board(this.boardSize, this.boardSize, 1536 / 5, true);

                ////this.board.addEventListener("tile", (e: createjs.MouseEvent) => { this.setInput(e.target); });
                this.board.addEventListener("tileDrop", function (e) {
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
                var tbt = new gameui.ui.ImageButton("GameOverBoard", function () {
                    _this.finishMenu.show();
                    tbt.fadeOut();
                });
                tbt.set({ x: 150, y: -150, visible: false });
                this.footer.addChild(tbt);

                //add eventListener
                this.finishMenu.addEventListener("ok", function () {
                    joinjelly.FasPair.showMainMenu();
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
                        joinjelly.FasPair.showMainMenu();
                    }, 200);
                });

                this.pauseMenu.addEventListener("restart", function () {
                    _this.pauseMenu.hide();
                    setTimeout(function () {
                        joinjelly.FasPair.startLevel();
                    }, 200);
                });
            };

            //#endregion
            // #region =================================== gamelay behaviour =======================================================
            // Starts the game
            GamePlayScreen.prototype.start = function () {
                var _this = this;
                this.board.clean();
                this.step();
                this.board.mouseEnabled = true;
                this.updateInterfaceInfos();
                this.timeInterval = 800;

                //createjs.Sound.play("bg1", null, null, null, -1);
                this.gamePlayLoop = setInterval(function () {
                    _this.step();
                }, 10);

                this.gamestate = 1 /* playing */;
            };

            // pause game
            GamePlayScreen.prototype.pauseGame = function () {
                this.gamestate = 2 /* paused */;
                this.board.mouseEnabled = false;
            };

            // unpause game
            GamePlayScreen.prototype.continueGame = function () {
                this.gamestate = 1 /* playing */;
                this.board.mouseEnabled = true;
            };

            //time step for adding tiles.
            GamePlayScreen.prototype.step = function () {
                // if is not playing, than does not execute a step
                if (this.gamestate != 1 /* playing */)
                    return;

                // wait until interval
                if (this.gameNextDrop > 0) {
                    this.gameNextDrop--;
                } else {
                    this.gameNextDrop = this.timeInterval / 10;

                    // decreate time interval
                    this.decreateInterval();

                    // add a new tile  on board
                    this.addTileOnBoard();

                    // verifies if game is ended
                    if (this.verifyGameLoose())
                        this.endGame();

                    // updates interafce information
                    this.updateInterfaceInfos();
                }
            };

            GamePlayScreen.prototype.getEmptyBlocks = function () {
                //get next jelly
                var total = this.boardSize * this.boardSize;
                var empty = [];

                for (var t = 0; t < total; t++)
                    if (this.tiles[t] == 0 || !this.tiles[t])
                        empty.push(t);

                return empty;
            };

            GamePlayScreen.prototype.verifyGameLoose = function () {
                var empty = this.getEmptyBlocks();

                if (empty.length == 0)
                    return true;

                return false;
            };

            GamePlayScreen.prototype.addTileOnBoard = function () {
                var empty = this.getEmptyBlocks();

                // if there is no more empty tiles, ends the game
                if (empty.length > 0) {
                    var i = Math.floor(Math.random() * empty.length);
                    var tid = empty[i];
                    this.tiles[tid] = 1;
                    this.board.setTileValue(tid, 1);
                    return true;
                }

                return false;
            };

            // update GUI iformaion
            GamePlayScreen.prototype.updateInterfaceInfos = function () {
                var score = this.score;

                var level = this.getLevelByScore(score);

                var nextLevelScore = this.getScoreByLevel(level);
                var previousLevelScore = this.getScoreByLevel(level - 1);
                var percent = (score - previousLevelScore) / (nextLevelScore - previousLevelScore) * 100;

                // updates the header
                this.gameHeader.updateStatus(score, level, percent, this.getPercentEmptySpaces());

                if (this.currentLevel != level)
                    this.gameLevelIndicator.showLevel(level);

                this.currentLevel = level;
            };

            // calculate a percent
            GamePlayScreen.prototype.getPercentEmptySpaces = function () {
                var filled = 0;
                for (var t in this.tiles)
                    if (this.tiles[t] != 0)
                        filled++;

                //set percentage
                var percent = 1 - (filled / (this.boardSize * this.boardSize));

                return percent;
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

            //return a time interval for jelly addition based on user level;
            GamePlayScreen.prototype.decreateInterval = function () {
                var time = this.timeInterval;

                if (time < 400)
                    time -= 2;
                if (time < 200)
                    time -= 1;
                else
                    time -= 4;

                this.timeInterval = time;

                document.title = time.toString();
                return time;
            };

            //finishes the game
            GamePlayScreen.prototype.endGame = function () {
                var score = this.score;
                var highScore = joinjelly.FasPair.userData.getHighScore();
                var jelly = 0;
                for (var j in this.tiles)
                    if (this.tiles[j] > jelly)
                        jelly = this.tiles[j];

                // disable mouse interaction
                this.board.mouseEnabled = false;
                this.board.mouseChildren = false;
                createjs.Tween.get(this.gameHeader).to({ y: -425 }, 200, createjs.Ease.quadIn);

                // save high score
                joinjelly.FasPair.userData.setScore(score);

                // shows finished game menu
                this.finishMenu.show();
                this.finishMenu.setValues(score, highScore, jelly);

                //move the board a little up
                createjs.Tween.get(this.board).to({ y: this.board.y - 200 }, 800, createjs.Ease.quadInOut);

                // stop game loop
                if (this.gamePlayLoop)
                    clearInterval(this.gamePlayLoop);
            };

            //called when a tile is dragged
            GamePlayScreen.prototype.dragged = function (origin, target) {
                //try to match the tiles
                this.match(origin, target);
            };

            //verifies if a tile can pair another, and make it happens
            GamePlayScreen.prototype.match = function (origin, target) {
                var _this = this;
                //check if match is correct
                if (this.tiles[origin] != 0 && target != origin && this.tiles[target] == this.tiles[origin]) {
                    //calculate new value
                    var newValue = this.tiles[target] + this.tiles[origin];

                    //sum the tiles values
                    this.tiles[target] = newValue;
                    this.board.setTileValue(target, newValue);
                    this.tiles[origin] = 0;

                    //reset the previous tile
                    setTimeout(function () {
                        _this.board.setTileValue(origin, _this.tiles[origin]);
                    }, 200);

                    //animate the mach
                    this.board.match(origin, target);

                    this.score += newValue * 10 + Math.floor(Math.random() * newValue);

                    this.UserData.setScore(this.score);
                    this.UserData.setLastJelly(newValue);

                    this.updateInterfaceInfos();
                }
            };

            //get currentScore
            GamePlayScreen.prototype.sumAll = function () {
                var sum = 0;
                for (var t in this.tiles) {
                    //if(this.tiles[t]!=1)
                    sum += this.tiles[t];
                }
                return sum;
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
    })(joinjelly.gameplay || (joinjelly.gameplay = {}));
    var gameplay = joinjelly.gameplay;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=GamePlay.js.map
