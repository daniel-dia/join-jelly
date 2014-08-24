module fpair.gameplay{

    export class GamePlayScreen extends gameui.ScreenState {

        private timeStep = 2;
        private boardSize = 5;

        private board: view.Board;
        private time: number;

        private scoreText: createjs.Text;

        private finishMenu: FinishMenu;

        private tiles: Array<number>

        constructor() {
            super();

            this.tiles = new Array();

            this.createBackground();
            this.createBoard();
            this.createHeader();
            this.createFooter();
        }

        //=================================== initialization ==========================================================//
        
        //create game background
        private createBackground() {
            this.background.addChild(new createjs.Bitmap("assets/Background.jpg"));
        }

        private createBoard() {
            this.board = new view.Board(this.boardSize, this.boardSize, 1536 / 5, true);
            //this.board.addEventListener("tile", (e: createjs.MouseEvent) => { this.setInput(e.target); });
            this.board.addEventListener("tileDrop", (e: createjs.MouseEvent) => { this.dragged(e.target.origin, e.target.target); });
            this.board.y = (2048 - 1536) / 2;
            this.content.addChild(this.board);
        }

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
            this.header.addChild(score);

        }

        //create a score indicator footer
        private createFooter() {

            //add background
            var bg = gameui.AssetsManager.getBitmap("assets/footer.png");
            this.footer.addChild(bg);
            bg.x = 35;
            bg.y = -148;


            this.scoreText = new createjs.Text("teste", "40px Arial", "white");
            this.scoreText.textAlign = "right";
            this.scoreText.x = 450;
            this.scoreText.y = -100;
            this.footer.addChild(this.scoreText);
        }
        
        // #region =================================== gamelay behaviour ==========================================================//

        // Starts the game
        private start() {
            this.board.clean();
            this.time = 400;
            this.step();
            this.board.mouseEnabled = true;
        }

        //time step for adding tiles.
        private step() {

            var total = this.boardSize * this.boardSize;
            var empty = [];

            //get all empty tiles
            for (var t = 0; t < total; t++)
                if (this.tiles[t] == 0 || !this.tiles[t])
                    empty.push(t);

            //if there is no more empty tiles, ends the game
            if (empty.length == 0) this.endGame();

            //or selects a ramdom empty tile and adds a value to is
            else {
                var i = Math.floor(Math.random() * empty.length);
                var tid = empty[i];
                this.tiles[tid] = 1;
                this.board.setTileValue(tid,1);
                if (this.time < 750) this.timeStep = 1;
                if (this.time < 550) this.timeStep = 0.5;
                if (this.time < 300) this.timeStep = 0;
                this.tiles[tid] = 2;

                setTimeout(() => { this.step(); }, this.time -= this.timeStep)
        }

            //updates the score
            this.scoreText.text = "Score: " + this.sumAll().toString();
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

                //reset the previous tile
                setTimeout(() => {
                    this.board.setTileValue(origin, this.tiles[origin]);
                }, 200);

                //animate the mach
                this.board.match(origin, target);
            }
        }


        private sumAll(): number {
            var sum = 0;
            for (var t in this.tiles)
                sum += this.tiles[t];
            return sum;
        }


        // #endregion
        
        activate(parameters?: any) {
            super.activate(parameters);
            this.start();
        }
    }
}