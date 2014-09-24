var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var fpair;
(function (fpair) {
    (function (gameplay) {
        var GamePlayScreen = (function (_super) {
            __extends(GamePlayScreen, _super);
            //#region =================================== initialization ==========================================================//
            function GamePlayScreen(userData) {
                _super.call(this);
                this.timeStep = 2;
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
                this.gameLevelIndicator = new gameplay.view.LevelIndicator();
                this.content.addChild(this.gameLevelIndicator);

                this.gameHeader = new gameplay.view.GameHeader();
                this.header.addChild(this.gameHeader);

                this.timeBar = new gameplay.view.TimeBar();
                this.footer.addChild(this.timeBar);
            };

            //#endregion
            // #region =================================== gamelay behaviour ==========================================================//
            // Starts the game
            GamePlayScreen.prototype.start = function () {
                this.board.clean();
                this.step();
                this.board.mouseEnabled = true;
                this.updateInfos();
                //   createjs.Sound.play("bg1", null, null, null, -1);
            };

            //time step for adding tiles.
            GamePlayScreen.prototype.step = function () {
                var _this = this;
                // add a new tile  on board
                this.addTileOnBoard();

                //
                var loose = this.verifyGameLoose();

                // do a next step
                if (!loose)
                    setTimeout(function () {
                        _this.step();
                    }, this.getTimeIntervalByScore(this.sumAll()));

                this.updateInfos();
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
                if (empty.length == 0)
                    this.endGame();
                else {
                    var i = Math.floor(Math.random() * empty.length);
                    var tid = empty[i];
                    this.tiles[tid] = 1;
                    this.board.setTileValue(tid, 1);
                    return true;
                }

                return false;
            };

            //update GUI iformaion
            GamePlayScreen.prototype.updateInfos = function () {
                var score = this.score;

                var level = this.getLevelByScore(score);

                var nextLevelScore = this.getScoreByLevel(level);
                var previousLevelScore = this.getScoreByLevel(level - 1);
                var percent = (score - previousLevelScore) / (nextLevelScore - previousLevelScore) * 100;

                // updates the header
                this.gameHeader.updateStatus(score, level, percent);

                if (this.currentLevel != level)
                    this.gameLevelIndicator.showLevel(level);

                this.currentLevel = level;

                // updates the footer
                //reads all filled spaces
                var filled = 0;
                for (var t in this.tiles)
                    if (this.tiles[t] != 0)
                        filled++;

                //set percentage
                var percent = 1 - (filled / (this.boardSize * this.boardSize));
                this.timeBar.setPercent(percent);
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
            GamePlayScreen.prototype.getTimeIntervalByScore = function (score) {
                var startTime = 1000;
                var step = 4;

                var time = startTime - score * step;
                time = Math.max(time, 200);
                return time;
            };

            //finishes the game
            GamePlayScreen.prototype.endGame = function () {
                this.board.mouseEnabled = false;

                var menu = new FinishMenu(this.sumAll(), 1);
                menu.fadeIn();
                this.content.addChild(menu);
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

                    this.score += newValue + Math.floor(Math.random() * newValue);

                    this.UserData.setScore(this.score);
                    this.UserData.setLastJelly(newValue);

                    this.updateInfos();
                }
            };

            //get currentScore
            GamePlayScreen.prototype.sumAll = function () {
                var sum = 0;
                for (var t in this.tiles) {
                    if (this.tiles[t] != 1)
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
    })(fpair.gameplay || (fpair.gameplay = {}));
    var gameplay = fpair.gameplay;
})(fpair || (fpair = {}));
//# sourceMappingURL=GamePlay.js.map
