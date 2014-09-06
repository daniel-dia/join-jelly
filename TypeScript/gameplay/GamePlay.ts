﻿module fpair.gameplay{

    export class GamePlayScreen extends gameui.ScreenState {

        private timeStep = 2;
        private boardSize = 5;

        private board: view.Board;

        private scoreText: createjs.Text;
        private levelText: createjs.Text;

        private finishMenu: FinishMenu;

        private tiles: Array<number>

        private currentLevel: number;

        private levelIndicator: view.LevelIndicator;

        //#region =================================== initialization ==========================================================//

        constructor() {
            super();

            this.tiles = new Array();
            this.createBackground();
            this.createBoard();
            this.createUI();
            this.createHeader();
            this.createFooter();
        }
        
        // create game background
        private createBackground() {
            this.background.addChild(new createjs.Bitmap("assets/Background.jpg"));
        }

        // create a new board
        private createBoard() {
            this.board = new view.Board(this.boardSize, this.boardSize, 1536 / 5, true);
            ////this.board.addEventListener("tile", (e: createjs.MouseEvent) => { this.setInput(e.target); });
            this.board.addEventListener("tileDrop", (e: createjs.MouseEvent) => { this.dragged(e.target.origin, e.target.target); });
            this.board.y = (2048 - 1536) / 2;
            this.content.addChild(this.board);
        }

        // creates the game header
        private createHeader() {
            //add background
            var bg = gameui.AssetsManager.getBitmap("assets/header.png");
            this.header.addChild(bg);
            bg.x = 35;

            //add pause button
            var pauseButton = new gameui.ui.IconButton("assets/iconPause.png", "", "", "", "assets/bt.png", () => {
                gameScreen.switchScreen(new MainScreen(null));
            });

            pauseButton.x = 150;
            pauseButton.y = 150;

            this.header.addChild(pauseButton);

            //add pause menu

            //add scores text
            var score = new createjs.Text("score: ?????", "60px Arial", "black");
            score.textBaseline = "middle";
            score.x = 500;
            score.y = 100;
            this.scoreText = score;
            this.header.addChild(score);

            //add scores text
            var level = new createjs.Text("Level: ?????", "60px Arial", "black");
            level.textBaseline = "middle";
            level.x = 500;
            level.y = 300;
            this.levelText = level;
            this.header.addChild(level);

        }

        // create a score indicator footer
        private createFooter() {

            //add background
            var bg = gameui.AssetsManager.getBitmap("assets/footer.png");
            this.footer.addChild(bg);
            bg.x = 35;
            bg.y = -148;
        }

        // create screen elements
        private createUI() {
            this.levelIndicator = new view.LevelIndicator();
            this.content.addChild(this.levelIndicator);
        }

        //#endregion

        // #region =================================== gamelay behaviour ==========================================================//

        // Starts the game
        private start() {
            this.board.clean();
            this.step();
            this.board.mouseEnabled = true;
        }
        
        //time step for adding tiles.
        private step() {
            
            // get score
            var score = this.sumAll();

            // updates the level
            var level = this.getLevelByScore(score);
            this.updateLevel(level);

            // updates the score
            this.updateInfo(score);

            // add a new tile  on board
            this.addTileOnBoard();

            // 
            var loose = this.verifyGameLoose();

            // do a next step
            if(!loose)
                setTimeout(() => { this.step(); }, this.getTimeIntervalByScore(score))

        }

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

        // 
        private verifyGameLoose(): boolean {

            var empty = this.getEmptyBlocks();

            if (empty.length == 0)
                return true;

            return false;
        }

        // 
        private addTileOnBoard() {

            var empty = this.getEmptyBlocks();

            // if there is no more empty tiles, ends the game
            if (empty.length == 0) this.endGame();

            //or selects a ramdom empty tile and adds a value to is
            else {
                var i = Math.floor(Math.random() * empty.length);
                var tid = empty[i];
                this.tiles[tid] = 1;
                this.board.setTileValue(tid, 1);

                return true;
            }

            return false;
        }

        private updateInfo(score: number) {
            this.scoreText.text = "Score: " + score.toString();
        }

        private updateLevel(level:number) {
            this.levelText.text = "level: " + level.toString();

            if (this.currentLevel != level)
                this.levelIndicator.showLevel(level);

            this.currentLevel = level;
        }

        private getLevelByScore(score: number): number {
            return Math.floor((score)/10)+1;
        }

        private getTimeIntervalByScore(score: number): number {
            var startTime = 1000;
            var step = 4;

            var time = startTime - score * step;
            time = Math.max(time, 200);
            return time;
            
        }

        //finishes the game
        private endGame() {
            this.board.mouseEnabled = false;

            var menu = new FinishMenu(this.sumAll(), 1);
            menu.fadeIn();
            this.content.addChild(menu);
        }

        //called when a tile is dragged
        private dragged(origin: string, target: string) {
            
            //try to match the tiles
            this.match(origin, target);

        }

        //verifies if a tile can pair another, and make it happens
        private match(origin: string, target: string) {

            //check if match is correct
            if (this.tiles[origin] != 0 && target != origin && this.tiles[target] == this.tiles[origin] ){//&&!tileTarget.locked) {

                //sum the tiles values
                this.tiles[target] = this.tiles[target] + this.tiles[origin];
                this.board.setTileValue(target,this.tiles[target]);
                this.tiles[origin] = 0;

                //reset the previous tile
                setTimeout(() => {
                    this.board.setTileValue(origin, this.tiles[origin]);
                }, 200);

                //animate the mach
                this.board.match(origin, target);
            }
        }

        //get currentScore
        private sumAll(): number {
            var sum = 0;
            for (var t in this.tiles)
                sum += this.tiles[t];
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