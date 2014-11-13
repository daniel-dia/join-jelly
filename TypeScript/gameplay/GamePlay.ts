declare var Chubbyfont;
module joinjelly.gameplay {

    enum GameState {
        starting,
        playing,
        paused,
        ended
    }

    export class GamePlayScreen extends gameui.ScreenState {

        private boardSize = 5;

                 board: view.Board;

        private tiles: Array<number>

        private currentLevel: number;

        private score: number;

        private timeInterval: number;

                 gamePlayLoop: number;

        private gameNextDrop: number;

        private gamestate: GameState;

        private gameHeader: view.GameHeader;
        private gameLevelIndicator: view.LevelIndicator;

        private UserData: UserData;

        private finishMenu: view.FinishMenu
        private pauseMenu: view.PauseMenu;

        // count moves for log
        private moves: number = 0;

        matchNotify: () => void;

        //#region =================================== initialization ==========================================================

        constructor(userData: UserData) {
            super();

            this.UserData = userData;

            this.score = 0;

            this.tiles = new Array();
            this.createBackground();
            this.createBoard();
            this.createGUI();

            
        }

        // create game background
        private createBackground() {
            this.background.addChild(gameui.AssetsManager.getBitmap("Background"));
        }

        // create a new board
        private createBoard() {
            this.board = new view.Board(this.boardSize, this.boardSize, 1536 / 5, true);
            this.board.addEventListener("tileMove", (e: createjs.MouseEvent) => {
                this.dragged(e.target.origin, e.target.target);
            });
            this.board.y = (2048 - 1536) / 2 + 100;
            this.content.addChild(this.board);
        }

        // creates the game GUI
        private createGUI() {

            // creates game level indicator
            this.gameLevelIndicator = new view.LevelIndicator();
            this.content.addChild(this.gameLevelIndicator);

            // creates game header
            this.gameHeader = new view.GameHeader();
            this.header.addChild(this.gameHeader);

            // creates pause menu
            this.pauseMenu = new view.PauseMenu();
            this.content.addChild(this.pauseMenu);

            // creates a end menu
            this.finishMenu = new view.FinishMenu();
            this.content.addChild(this.finishMenu);

            // creates a toggle button
            var tbt = new gameui.ui.ImageButton("GameOverBoard", () => {
                this.finishMenu.show();
                tbt.fadeOut();

                createjs.Sound.play("Interface Sound-06");
            });
            tbt.set({ x: 150, y: -150, visible: false });
            this.footer.addChild(tbt);


            //add eventListener
            this.finishMenu.addEventListener("ok", () => {
                JoinJelly.showMainMenu();
            });

            this.finishMenu.addEventListener("board", () => {
                this.finishMenu.hide();
                tbt.fadeIn();
            });

            this.finishMenu.addEventListener("share", () => {
                //
            });

            this.gameHeader.addEventListener("pause", () => {
                this.pauseGame();
                this.pauseMenu.show();
            });
            this.pauseMenu.addEventListener("play", () => {
                this.continueGame();
                this.pauseMenu.hide();
            });

            this.pauseMenu.addEventListener("home", () => {
                this.pauseMenu.hide();
                setTimeout(() => { joinjelly.JoinJelly.showMainMenu(); }, 200);
            });

            this.pauseMenu.addEventListener("restart", () => {
                this.pauseMenu.hide();
                setTimeout(() => { joinjelly.JoinJelly.startLevel(); }, 200);
            });

        }

        //#endregion

        // #region =================================== gamelay behaviour =======================================================

        // Starts the game
        start() {
            this.board.clean();
            this.step();
            this.board.mouseEnabled = true;
            this.updateInterfaceInfos();
            this.timeInterval = 800;
            
            gameui.AssetsManager.playMusic("music1");

            this.gamePlayLoop = setInterval(() => { this.step(); }, 10)

            this.gamestate = GameState.playing;

            // log game start event
            JoinJelly.analytics.logGameStart();
        }

        // pause game
        private pauseGame() {
            this.gamestate = GameState.paused;
            this.board.mouseEnabled = false;
        }

        // unpause game
        private continueGame() {
            this.gamestate = GameState.playing;
            this.board.mouseEnabled = true;
        }

        //time step for adding tiles.
        private step() {

            // if is not playing, than does not execute a step
            if (this.gamestate != GameState.playing) return;

            // wait until interval 
            if (this.gameNextDrop > 0) {
                this.gameNextDrop--;
            }
            else {

                this.gameNextDrop = this.timeInterval / 10;

                // decreate time interval
                this.decreateInterval()

                // add a new tile  on board
                this.addRandomTileOnBoard();

                // verifies if game is ended
                if (this.verifyGameLoose()) this.endGame();

                // updates interafce information
                this.updateInterfaceInfos();
            }
        }

        // list all empty blocks in a array
        private getEmptyBlocks(): Array<number> {

            //get next jelly
            var total = this.boardSize * this.boardSize;
            var empty = [];

            //get all empty tiles
            for (var t = 0; t < total; t++)
                if (this.tiles[t] == 0 || !this.tiles[t])
                    empty.push(t);

            return empty;
        }

        // Verifies if game is over
        private verifyGameLoose(): boolean {

            var empty = this.getEmptyBlocks();

            if (empty.length == 0)
                return true;

            return false;
        }

        // add a random tile with value 1 on board
        private addRandomTileOnBoard() {

            var empty = this.getEmptyBlocks();

            // if there is no more empty tiles, ends the game
            if (empty.length > 0) {
                var i = Math.floor(Math.random() * empty.length);
                var tid = empty[i];
                this.setTileValue(tid, 1);
                return true;
            }

            return false;
        }

        setTileValue(tileId:number, value:number) {
            this.tiles[tileId] = value;
            this.board.setTileValue(tileId, value);

        }

        // update GUI iformaion
        private updateInterfaceInfos() {

            var score = this.score;

            var level = this.getLevelByScore(score);

            var nextLevelScore = this.getScoreByLevel(level);
            var previousLevelScore = this.getScoreByLevel(level - 1);
            var percent = (score - previousLevelScore) / (nextLevelScore - previousLevelScore) * 100

            // updates the header
            this.gameHeader.updateStatus(score, level, percent, this.getPercentEmptySpaces());

            if (this.currentLevel != level) {
                this.gameLevelIndicator.showLevel(level);
                if(level>1)
                createjs.Sound.play("Interface Sound-11");
            }
            this.currentLevel = level;

        }

        // calculate a percent 
        private getPercentEmptySpaces(): number {

            var filled = 0;
            for (var t in this.tiles)
                if (this.tiles[t] != 0)
                    filled++;

            //set percentage
            var percent = 1 - (filled / (this.boardSize * this.boardSize));

            return percent;
        }

        // returns a score based on level
        private getScoreByLevel(level: number): number {
            if (level == 0) return 0;
            return 50 * Math.pow(2, level);
        }

        //return a level based on a score
        private getLevelByScore(score: number): number {
            if (!score) score = 1;
            return Math.floor(Math.log(Math.max(1, score / 50)) / Math.log(2)) + 1
        }

        //return a time interval for jelly addition based on user level;
        private decreateInterval(): number {

            var time = this.timeInterval;

            if (time < 400) time -= 2;
            if (time < 200) time -= 1;
            else time -= 4;

            this.timeInterval = time;

            document.title = time.toString();
            return time;

        }

        //finishes the game
        private endGame() {

            var score = this.score;
            var highScore = JoinJelly.userData.getHighScore();
            var jelly = 0;
            for (var j in this.tiles)
                if (this.tiles[j] > jelly) jelly = this.tiles[j]

            // disable mouse interaction
            this.board.mouseEnabled = false;
            this.board.mouseChildren = false;
            createjs.Tween.get(this.gameHeader).to({ y: -425 }, 200, createjs.Ease.quadIn)

            // releases all jellys
            this.board.releaseAll();

            // save high score
            JoinJelly.userData.setScore(score);

            // shows finished game menu
            setTimeout(() => {
                this.finishMenu.show();
            }, 600);
            this.finishMenu.setValues(score, highScore, jelly);

            //move the board a little up
            createjs.Tween.get(this.board).to({ y: this.board.y - 200 }, 800, createjs.Ease.quadInOut)

            // stop game loop
            if (this.gamePlayLoop) clearInterval(this.gamePlayLoop);

            // log event
            JoinJelly.analytics.logEndGame(this.moves, this.score, this.currentLevel, jelly)

            // play end soud
            gameui.AssetsManager.playSound("end");

        }

        //called when a tile is dragged
        private dragged(origin: number, target: number) {

            //try to match the tiles
            this.match(origin, target);
        }

        //verifies if a tile can pair another, and make it happens
        private match(origin: number, target: number) {

            //check if match is correct
            if (this.tiles[origin] != 0 && target != origin && this.tiles[target] == this.tiles[origin]) {//&& !tileTarget.locked) {

                this.moves++;
                //calculate new value
                var newValue = this.tiles[target] + this.tiles[origin];

                //sum the tiles values
                this.tiles[target] = newValue;
                this.board.setTileValue(target, newValue);
                this.tiles[origin] = 0;

                //reset the previous tile
                setTimeout(() => {
                    this.board.setTileValue(origin, this.tiles[origin]);
                }, 200);

                //animate the mach
                this.board.match(origin, target);

                this.score += newValue * 10 + Math.floor(Math.random() * newValue);

                this.UserData.setScore(this.score);
                this.UserData.setLastJelly(newValue);

                this.updateInterfaceInfos();

                // notify match
                if (this.matchNotify)
                    this.matchNotify()

                // log event
                joinjelly.JoinJelly.analytics.logMove(this.moves, this.score, this.currentLevel, this.getEmptyBlocks().length);
            }
        }

        //get currentScore
        private sumAll(): number {
            var sum = 0;
            for (var t in this.tiles) {
                //if(this.tiles[t]!=1)
                sum += this.tiles[t];
            }
            return sum;
        }


        // #endregion



        //acivate the screen
        activate(parameters?: any) {
            super.activate(parameters);
            this.start();
        }
    }
}