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
        title.y = 768 / 2 - 100;
        title.x = 768 / 2;
        this.content.addChild(title);

        var button = new gameui.ui.TextButton("Start Game", "50px Arial", "white", null, function () {
            gameScreen.switchScreen(new GamePlayScreen());
        });

        button.y = 768 / 2 + 100;
        button.x = 768 / 2;
        this.content.addChild(button);
    };

    MainScreen.prototype.createBackground = function () {
        this.background.addChild(new createjs.Bitmap("assets/Background.jpg"));
    };

    MainScreen.prototype.createHeader = function () {
    };

    MainScreen.prototype.createFooter = function () {
        this.scoreText = new createjs.Text("High Score: " + this.userData.getHighScore(), "40px Arial", "white");
        this.scoreText.textAlign = "right";
        this.scoreText.x = 450;
        this.scoreText.y = -100;
        this.footer.addChild(this.scoreText);
    };
    return MainScreen;
})(gameui.ScreenState);
//# sourceMappingURL=MainScreen.js.map
