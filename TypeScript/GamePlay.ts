﻿class GamePlayScreen extends gameui.ScreenState {

    private timeStep = 2;
    private boardSize = 5;

    private board: Board;
    private time: number;

    private clickedTile: Tile;

    private scoreText: createjs.Text;

    private finishMenu:FinishMenu;

    constructor() {
        super();

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
        this.board = new Board(this.boardSize, this.boardSize, 768*2/5, true);
        this.board.addEventListener("tile", (e: createjs.MouseEvent) => { this.setInput(e.target); });
        this.board.addEventListener("tileDrop", (e: createjs.MouseEvent) => { this.dragged(e.target.origin, e.target.target); });
        this.content.addChild(this.board);
    }

    private createHeader() {
        //TODO Add menu here
    }

    //create a score indicator footer
    private createFooter() {
        this.scoreText = new createjs.Text("teste", "40px Arial", "white");
        this.scoreText.textAlign = "right";
        this.scoreText.x = 450;
        this.scoreText.y = -100;
        this.footer.addChild(this.scoreText);
    }

    private createFinishMenu() {

    }

    //=================================== gamelay behaviour ==========================================================//

    // Starts the game
    private start() {
        this.board.clean();
        this.time = 800;
        this.step();
        this.board.mouseEnabled = true;
    }
    
    //time step for adding tiles.
    private step() {

        var total = this.boardSize * this.boardSize;
        var empty = [];

        //get all empty tiles
        for (var t = 0; t < total; t++)
            if (this.board.tiles[t].getNumber() == 0)
                empty.push(t);

        //if there is no more empty tiles, ends the game
        if (empty.length == 0)
            this.endGame();

        //or selects a ramdom empty tile and adds a value to is
        else {
            var i = Math.floor(Math.random() * empty.length);
            var t1 = empty[i];
            this.board.tiles[t1].setNumber(1);
            if (this.time < 750) this.timeStep = 1;
            if (this.time < 550) this.timeStep = 0.5;
            if (this.time < 300) this.timeStep = 0;
            setTimeout(() => { this.step(); }, this.time -= this.timeStep)
        }

        //updates the score
        this.scoreText.text = "Score: " +this.board.sumAll().toString();
    }

    //finishes the game
    private endGame() {
        this.board.mouseEnabled = false;

        var menu = new FinishMenu(this.board.sumAll(), 1);
        menu.fadeIn();
        this.content.addChild(menu);
    }

    //called when a tile is dragged
    private dragged(origin: string, target: string) {
        //get the atual tile position
        var tileOrigin = this.board.getTileById(origin);
        var tileTarget = this.board.getTileById(target);

        //TODO verify if it is needed
        this.clickedTile = undefined;

        //try to match the tiles
        this.match(tileOrigin, tileTarget);

    }


    //TODO depreciated, .. 2 clicks to pair
    private setInput(id: string) {

        //get the tiles clicked
        var tileTarget = this.board.getTileById(id);
        var tileOrigin = this.clickedTile;


        if (tileOrigin && tileTarget) {
            this.clickedTile = undefined;
            this.match(tileOrigin, tileTarget);
        }
        else {
            //if (tileOrigin) tileOrigin.unHighlight();
            //tileTarget.highlight();
            this.clickedTile = tileTarget;
        }
    }

    //verifies if a tile can pair another, and make it happens
    private match(tileOrigin: Tile, tileTarget: Tile) {

        //check if match is correct
        if (tileOrigin.getNumber() != 0 && tileOrigin && tileTarget && tileTarget != tileOrigin && tileTarget.getNumber() == tileOrigin.getNumber() && !tileTarget.locked) {

            //sim the tiles values
            tileTarget.setNumber(tileTarget.getNumber() + tileOrigin.getNumber());

            //reset the previous tile
            tileOrigin.setNumber(0);
            //tileOrigin.unHighlight();

            //animate the mach
            this.board.match(tileOrigin.name, tileTarget.name);
        }
    }

    activate(parameters?:any) {
        super.activate(parameters);
        this.start();
    }
}
 