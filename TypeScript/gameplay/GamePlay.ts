module joinjelly.gameplay {

    enum GameState {
        starting,
        playing,
        paused,
        ended
    }

    export class GamePlayScreen extends gameui.ScreenState {

        protected  gamestate: GameState;

        protected  boardSize = 5;

        protected board: view.Board;

        private currentLevel: number;

        private score: number;

        private timeInterval: number;

        private gameNextDrop: number;

        private gameHeader: view.GameHeader;

        private gameLevelIndicator: view.LevelIndicator;

        private UserData: UserData;

        private finishMenu: view.FinishMenu;

        private pauseMenu: view.PauseMenu;

        protected gamePlayLoop: number;

        // count moves for log
        private moves: number = 0;

        protected matchNotify: () => void;

        //#region =================================== initialization ==========================================================

        constructor(userData: UserData) {
            super();

            this.UserData = userData;

            this.score = 0;

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
            var tbt = new gameui.ImageButton("GameOverBoard", () => {
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

        // #region =================================== interface =======================================================

        // update GUI iformaion
        private updateInterfaceInfos() {

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
            this.currentLevel = level
        }

        // level up
        protected levelUp(level:number) {
            this.gameLevelIndicator.showLevel(level);
            createjs.Sound.play("Interface Sound-11");
            this.board.levelUpEffect();
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

        // #endregion

        // #region =================================== gamelay =======================================================

        // Starts the game
        protected start() {
            this.board.cleanBoard();
            this.board.unlock();
            this.step();
            this.updateInterfaceInfos();
            this.timeInterval = 300;

            gameui.AssetsManager.playMusic("music1");

            this.gamePlayLoop = setInterval(() => { this.step(); }, 10)

            this.gamestate = GameState.playing;

            // log game start event
            JoinJelly.analytics.logGameStart();
        }

        // pause game
        private pauseGame() {
            this.gamestate = GameState.paused;
            this.board.lock();
        }

        // finishes the game
        private endGame() {

            var score = this.score;
            var highScore = JoinJelly.userData.getHighScore();
            var highJelly = this.board.getHighestTileValue();

            // disable mouse interaction
            this.board.lock();

            // releases all jellys
            this.board.releaseAll();

            // save high score
            JoinJelly.userData.setScore(score);

            // shows finished game menu
            setTimeout(() => { this.finishMenu.show(); }, 1200);
            this.finishMenu.setValues(score, highScore, highJelly);

            // move the board a little up
            createjs.Tween.get(this.board).to({ y: this.board.y - 200 }, 800, createjs.Ease.quadInOut)

            // stop game loop
            if (this.gamePlayLoop) clearInterval(this.gamePlayLoop);

            // log event
            JoinJelly.analytics.logEndGame(this.moves, this.score, this.currentLevel, highJelly)

            // play end soud
            gameui.AssetsManager.playSound("end");

            // move board to top
            createjs.Tween.get(this.gameHeader).to({ y: -425 }, 200, createjs.Ease.quadIn)

            // play end game effect
            this.board.endGameEffect();

        }

        // unpause game
        private continueGame() {
            this.gamestate = GameState.playing;
            this.board.unlock();
        }

        // time step for adding tiles.
        protected step() {

            // if is not playing, than does not execute a step
            if (this.gamestate != GameState.playing) return;

            // wait until interval 
            if (this.gameNextDrop > 0) {
                this.gameNextDrop--;
            }
            else {

                // defines next drop time interval
                this.gameNextDrop = this.timeInterval / 10;

                // decreate time interval
                this.decreateInterval()

                // add a new tile  on board
                this.addRandomTileOnBoard();

                // updates interafce information
                this.updateInterfaceInfos();

                // verifies if game is ended
                if (this.verifyGameLoose()) this.endGame();
            }
        }

        // Verifies if game is over
        private verifyGameLoose(): boolean {

            var empty = this.board.getEmptyTiles();

            if (empty.length == 0)
                return true;

            return false;
        }

        // add a random tile with value 1 on board
        protected addRandomTileOnBoard() {

            var empty = this.board.getEmptyTiles();

            // if there is no more empty tiles, ends the game
            if (empty.length > 0) {
                var i = Math.floor(Math.random() * empty.length);
                var tile = empty[i];
                tile.setNumber(1);
            }
        }

        //return a time interval for jelly addition based on user level;
        private decreateInterval(): number {

            var time = this.timeInterval;

            if (time < 500) time -= 2;
            if (time < 400) time -= 1;
            else time -= 3;

            this.timeInterval = time;

            document.title = time.toString();
            return time;

        }

        //called when a tile is dragged
        private dragged(origin: Tile, target: Tile) {

            //try to match the tiles
            this.match(origin, target);
        }

        //verifies if a tile can pair another, and make it happens
        protected match(origin: Tile, target: Tile): boolean{
            //check if match is correct
            if (origin.getNumber() != 0 && target != origin && target.getNumber() == origin.getNumber() && target.isUnlocked){

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
                    this.matchNotify()

                // log event
                joinjelly.JoinJelly.analytics.logMove(this.moves, this.score, this.currentLevel, this.board.getEmptyTiles().length);

                return true;
            }
            return false;
        }

        // #endregion

        //acivate the screen
        activate(parameters?: any) {
            super.activate(parameters);
            this.start();
        }
    }
}