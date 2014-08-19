var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MainScreen = (function (_super) {
    __extends(MainScreen, _super);
    function MainScreen(userData) {
        _super.call(this);
        this.timeStep = 2;
        this.boardSize = 5;

        this.userData = userData;
        this.createContent();
        this.createBackground();
        this.createHeader();
        this.createFooter();
        //this.createMessage();
    }
    MainScreen.prototype.createContent = function () {
        var title = new createjs.Text("Fast Pair", "80px Arial", "white");
        title.textAlign = "center";
        title.y = 768 - 300;
        title.x = 768;
        this.content.addChild(title);

        var button = new gameui.ui.ImageButton("assets/PlayBt.png", function () {
            gameScreen.switchScreen(new GamePlayScreen());
        });

        button.y = 768;
        button.x = 768;

        //button.centralize();
        this.content.addChild(button);

        // adds jelly
        var j = new Tile(0, 0, 500);
        this.content.addChild(j);
        j.setNumber(1);
        j.x = 768;
        j.y = 1000;
    };

    MainScreen.prototype.createBackground = function () {
        this.background.addChild(new createjs.Bitmap("assets/backhome.jpg"));
    };

    MainScreen.prototype.createHeader = function () {
    };

    MainScreen.prototype.createFooter = function () {
        if (this.userData) {
            this.scoreText = new createjs.Text("High Score: " + this.userData.getHighScore(), "40px Arial", "white");
            this.scoreText.textAlign = "right";
            this.scoreText.x = 450;
            this.scoreText.y = -100;
            this.footer.addChild(this.scoreText);
        }
    };
    return MainScreen;
})(gameui.ScreenState);
//# sourceMappingURL=MainScreen.js.map
