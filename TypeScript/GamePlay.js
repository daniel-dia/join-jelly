var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GamePlayScreen = (function (_super) {
    __extends(GamePlayScreen, _super);
    function GamePlayScreen() {
        _super.call(this);
        this.timeStep = 2;
        this.boardSize = 5;

        this.createBackground();
        this.createBoard();
        this.createHeader();
        this.createFooter();
    }
    //=================================== initialization ==========================================================//
    //create game background
    GamePlayScreen.prototype.createBackground = function () {
        this.background.addChild(new createjs.Bitmap("assets/Background.jpg"));
    };

    GamePlayScreen.prototype.createBoard = function () {
        var _this = this;
        this.board = new Board(this.boardSize, this.boardSize, 768 * 2 / 5, true);
        this.board.addEventListener("tile", function (e) {
            _this.setInput(e.target);
        });
        this.board.addEventListener("tileDrop", function (e) {
            _this.dragged(e.target.origin, e.target.target);
        });
        this.content.addChild(this.board);
    };

    GamePlayScreen.prototype.createHeader = function () {
        //TODO Add menu here
    };

    //create a score indicator footer
    GamePlayScreen.prototype.createFooter = function () {
        this.scoreText = new createjs.Text("teste", "40px Arial", "white");
        this.scoreText.textAlign = "right";
        this.scoreText.x = 450;
        this.scoreText.y = -100;
        this.footer.addChild(this.scoreText);
    };

    GamePlayScreen.prototype.createFinishMenu = function () {
    };

    //=================================== gamelay behaviour ==========================================================//
    // Starts the game
    GamePlayScreen.prototype.start = function () {
        this.board.clean();
        this.time = 800;
        this.step();
        this.board.mouseEnabled = true;
    };

    //time step for adding tiles.
    GamePlayScreen.prototype.step = function () {
        var _this = this;
        var total = this.boardSize * this.boardSize;
        var empty = [];

        for (var t = 0; t < total; t++)
            if (this.board.tiles[t].getNumber() == 0)
                empty.push(t);

        //if there is no more empty tiles, ends the game
        if (empty.length == 0)
            this.endGame();
        else {
            var i = Math.floor(Math.random() * empty.length);
            var t1 = empty[i];
            this.board.tiles[t1].setNumber(1);
            if (this.time < 750)
                this.timeStep = 1;
            if (this.time < 550)
                this.timeStep = 0.5;
            if (this.time < 300)
                this.timeStep = 0;
            setTimeout(function () {
                _this.step();
            }, this.time -= this.timeStep);
        }

        //updates the score
        this.scoreText.text = "Score: " + this.board.sumAll().toString();
    };

    //finishes the game
    GamePlayScreen.prototype.endGame = function () {
        this.board.mouseEnabled = false;

        var menu = new FinishMenu(this.board.sumAll(), 1);
        menu.fadeIn();
        this.content.addChild(menu);
    };

    //called when a tile is dragged
    GamePlayScreen.prototype.dragged = function (origin, target) {
        //get the atual tile position
        var tileOrigin = this.board.getTileById(origin);
        var tileTarget = this.board.getTileById(target);

        //TODO verify if it is needed
        this.clickedTile = undefined;

        //try to match the tiles
        this.match(tileOrigin, tileTarget);
    };

    //TODO depreciated, .. 2 clicks to pair
    GamePlayScreen.prototype.setInput = function (id) {
        //get the tiles clicked
        var tileTarget = this.board.getTileById(id);
        var tileOrigin = this.clickedTile;

        if (tileOrigin && tileTarget) {
            this.clickedTile = undefined;
            this.match(tileOrigin, tileTarget);
        } else {
            //if (tileOrigin) tileOrigin.unHighlight();
            //tileTarget.highlight();
            this.clickedTile = tileTarget;
        }
    };

    //verifies if a tile can pair another, and make it happens
    GamePlayScreen.prototype.match = function (tileOrigin, tileTarget) {
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
    };

    GamePlayScreen.prototype.activate = function (parameters) {
        _super.prototype.activate.call(this, parameters);
        this.start();
    };
    return GamePlayScreen;
})(gameui.ScreenState);
//# sourceMappingURL=GamePlay.js.map
