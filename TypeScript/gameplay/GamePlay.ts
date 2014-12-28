﻿module joinjelly.gameplay {

    enum GameState {
        starting,
        playing,
        paused,
        ended
    }

    export class GamePlayScreen extends gameui.ScreenState {


        // gameplay Control

        protected  gamestate: GameState;

        protected level: number;

        private score: number;

        private matches: number = 0;

        //interface

        protected board: Board;
        
        private gameHeader: view.GameHeader;
        private gameFooter: view.GameFooter;

        private gameLevelIndicator: view.LevelIndicator;

        private UserData: UserData;

        private finishMenu: view.FinishMenu;

        private pauseMenu: view.PauseMenu;

        protected  boardSize = 5;

        // parameters
        private timeByLevel: number =	10000

        private initialInterval: number = 900;
        private finalInterval: number = 150;
        private easeInterval: number = 0.97;
        private intervalMultiplier: number = 1;

        protected matchNotify: () => void;

        // effect 
        private freezeEffect: createjs.DisplayObject;
        private fastEffect: createjs.DisplayObject;
        private reviveEffect: createjs.DisplayObject;
        private cleanEffect: createjs.DisplayObject;

        //#region =================================== initialization ================================================

        constructor(userData: UserData) {
            super();

            this.UserData = userData;

            this.score = 0;

            this.createBackground();
            this.createBoard();
            this.createGUI();

            this.createEffects();
       }

        // create game effects
        private createEffects() {

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

        }

        // create game background
        private createBackground() {
            var bg = gameui.AssetsManager.getBitmap("Background");
             this.background.addChild(bg);
        }

        // create a new board
        private createBoard() {
            this.board = new Board(this.boardSize, this.boardSize, 1536 / 5, true);
            this.board.addEventListener("tileMove", (e: createjs.MouseEvent) => {
                this.dragged(e.target.origin, e.target.target);
            });
            this.board.y = (2048 - 1536) / 2 + 100;
            this.content.addChild(this.board);
        }

        // creates the game GUI
        protected createGUI() {

            // creates game level indicator
            this.gameLevelIndicator = new view.LevelIndicator();
            this.content.addChild(this.gameLevelIndicator);

            // creates game header
            this.gameHeader = new view.GameHeader();
            this.header.addChild(this.gameHeader);

            // create game footer
            this.gameFooter = new view.GameFooter(["time", "clean", "fast", "revive"]);
            this.footer.addChild(this.gameFooter);
            this.gameFooter.addEventListener("useitem", (e:createjs.Event) => { this.useItem(e.target) });

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

                gameui.AssetsManager.playSound("Interface Sound-06");
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
            });

            this.pauseMenu.addEventListener("play", () => {
                this.continueGame();
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

        // #region =================================== interface =====================================================

        // update GUI iformaion
        private updateInterfaceInfos() {

            //calculate interval 
            var nextLevelScore = this.getMovesByLevel(this.level);
            var currentLevelScore = this.getMovesByLevel(this.level-1);
            
            var percent = (this.matches - currentLevelScore) / (nextLevelScore - currentLevelScore) *100;

            // defines alarm condition
            var emptySpaces = this.board.getPercentEmptySpaces();
            var alarm = false;
            if (emptySpaces < 0.25 && emptySpaces > 0)
                var alarm = true;

            // updates the header
            this.gameHeader.updateStatus(this.score, this.level, percent, emptySpaces, alarm);

            // updates board shaking.
            this.board.setAlarm(alarm);
           
        }

        // level up
        protected levelUpInterfaceEffect(level:number) {
            this.gameLevelIndicator.showLevel(level);
            gameui.AssetsManager.playSound("Interface Sound-11");
            this.board.levelUpEffect();
        }
        
        // #endregion

        // #region =================================== gamelay =======================================================

        // Starts the game
        protected start() {

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
            this.gamestate = GameState.playing;
            this.step();

            // log game start event
            JoinJelly.analytics.logGameStart();
        }

        // pause game
        private pauseGame() {

            this.pauseMenu.show();
            this.gamestate = GameState.paused;
            this.board.lock();
            this.gameHeader.mouseEnabled = false;
        }

        // unpause game
        private continueGame() {

            this.pauseMenu.hide();
            this.gamestate = GameState.playing;
            this.board.unlock();
            this.gameHeader.mouseEnabled = true;
        }

        // finishes the game
        private endGame(message?:string) {

            this.gamestate = GameState.ended;

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
            this.finishMenu.setValues(score, highScore, highJelly,message);

            // move the board a little up
            createjs.Tween.get(this.board).to({ y: this.board.y - 200 }, 800, createjs.Ease.quadInOut)

            // log event
            JoinJelly.analytics.logEndGame(this.matches, this.score, this.level, highJelly)

            // play end soud
            gameui.AssetsManager.playSound("end");

            // remove other ui items
            this.gameHeader.mouseEnabled = false;
            this.gameFooter.mouseEnabled = false;
            createjs.Tween.get(this.gameHeader).to({ y: -425 }, 200, createjs.Ease.quadIn);
            createjs.Tween.get(this.gameFooter).to({ y: 230}, 200, createjs.Ease.quadIn);

            // play end game effect
            this.board.endGameEffect();

        }

        // winTheGame
        private winGame() { 
           this.endGame(StringResources.menus.gameOver);
            // TODO something great
        }
        
        // time step for adding tiles.
        protected step() {

            // if is not playing, than does not execute a step
            if (this.gamestate == GameState.playing) {
                
                // add a new tile  on board
                this.addRandomTileOnBoard();

                // updates interafce information
                this.updateInterfaceInfos();

                // verifies if game is ended
                if (this.verifyGameLoose()) this.endGame();

                // update currentLevel
                this.updateCurrentLevel();
            }

            // set timeout to another iteraction if game is not over
            if (this.gamestate != GameState.ended)
                setTimeout(
                    () => { this.step() },
                    this.getTimeInterval(this.level, this.initialInterval, this.finalInterval, this.easeInterval) * this.intervalMultiplier
            );
            
        }
        
        // update current level
        private updateCurrentLevel() {
            var newLevel = this.getLevelByMoves(this.matches);
            if (newLevel > this.level) 
                this.levelUpInterfaceEffect(newLevel);

            this.level = newLevel;
        }

        // calculate current level by moves. 
        // once level calculation is a iterative processe, this method uses a iterative calculation
        protected getLevelByMoves(moves: number): number {
            var totalMoves = 0;
            var level = 0;

            // calculate moves ammount for each level, once it reches more than current moves, it returns the calculated level
            while (totalMoves<moves) {
                var interval = this.getTimeInterval(level, this.initialInterval, this.finalInterval, this.easeInterval);
                var levelMoves = this.timeByLevel / interval;
                totalMoves += levelMoves;
                level++
            }

            return Math.max(level, 1);
        }

        // get how moves is needed for each level;
        protected getMovesByLevel(level: number): number {
            var totalMoves = 0;
          
            // calculate moves ammount for each level, once it reches more than current moves, it returns the calculated level
            for (var calculatedLevel = 0; calculatedLevel < level; calculatedLevel++) {
                var interval = this.getTimeInterval(calculatedLevel, this.initialInterval, this.finalInterval, this.easeInterval);
                var levelMoves = this.timeByLevel / interval;
                totalMoves += levelMoves;
           }

            return totalMoves;
        }

        // calculate time interval for a level.
        protected getTimeInterval(level: number, initialInterval: number, finalInterval: number, intervalEase: number): number {
            return initialInterval * Math.pow(intervalEase, level) + finalInterval * (1 - Math.pow(intervalEase, level));
        }

        // Verifies if game is over
        private verifyGameLoose(): boolean {

            var empty = this.board.getEmptyTiles();

            if (empty.length == 0)
                return true;

            return false;
        }

        // add a random tile with value 1 on board
        protected addRandomTileOnBoard(value:number=1) {

            var empty = this.board.getEmptyTiles();

            // if there is no more empty tiles, ends the game
            if (empty.length > 0) {
                var i = Math.floor(Math.random() * empty.length);
                var tile = empty[i];
                tile.setNumber(value);
            }
        }

        //called when a tile is dragged
        private dragged(origin: Tile, target: Tile) {

            //try to match the tiles
            this.match(origin, target);
        }

        //verifies if a tile can pair another, and make it happens
        protected match(origin: Tile, target: Tile): boolean{
            //check if match is correct
            if (origin.getNumber() != 0 && 
                target != origin && 
                target.getNumber() == origin.getNumber() && 
                target.isUnlocked){

                this.matches++;

                // update currentLevel
                this.updateCurrentLevel()

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
                    this.matchNotify()


                // verify winGame
                if (newValue >= 8192)
                    this.winGame();

                // log event
                joinjelly.JoinJelly.analytics.logMove(this.matches, this.score, this.level, this.board.getEmptyTiles().length);

                return true;
            }
            return false;
        }

        // #endregion

        // #region Items

        private useItem(item:string) {
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
        }

        // reduces jellys per time during 5 seconds.
        private useTime() {
            if (this.gamestate == GameState.ended) return;
            this.intervalMultiplier = 3;
            setTimeout(() => { this.intervalMultiplier = 1 }, 5000);

            //cast effects
            this.freezeEffect.alpha = 0;
            this.freezeEffect.visible = true;
            createjs.Tween.removeTweens(this.freezeEffect);
            createjs.Tween.get(this.freezeEffect).to({ alpha: 1 }, 1000).to({ alpha: 0 }, 4000).call(() => {
                this.freezeEffect.visible = false
            });
        }

        //clan all simple jellys
        private useClean() {
            if (this.gamestate == GameState.ended) return;
            var tiles = this.board.getAllTiles();
            for (var t in tiles)
                if (tiles[t].getNumber() < 2) {
                    this.board.fadeTileToPos(tiles[t], tiles[t].x, tiles[t].y - 100, 200, 300*Math.random());
                    tiles[t].setNumber(0); 
                }
            this.updateInterfaceInfos()



            //cast effects
            this.cleanEffect.alpha = 1;
            this.cleanEffect.visible = true;
            createjs.Tween.removeTweens(this.cleanEffect);
            createjs.Tween.get(this.cleanEffect).to({ alpha: 0 }, 500).call(() => {
                this.cleanEffect.visible = false
            });
  
        }

        // revive after game end
        private useRevive() {
            this.useTime();
        }

        // match 5 pair of jelly if avaliabe
        private useFast() {
            if (this.gamestate == GameState.ended) return;
            for (var i = 0; i<5 ; i++) {
            }

            //cast effects
            this.fastEffect.alpha = 1;
            this.fastEffect.visible = true;
            createjs.Tween.removeTweens(this.fastEffect);
            createjs.Tween.get(this.fastEffect).to({ alpha: 0 }, 500).call(() => {
                this.fastEffect.visible = false
            });
        }

        // #endregion

        //acivate the screen
        activate(parameters?: any) {
            super.activate(parameters);
            this.gameHeader.alpha = 0;

            setTimeout(() => {
                createjs.Tween.get(this.gameHeader).to({ alpha: 1 }, 500);
                this.start();
            }, 500);
        }
    }
}