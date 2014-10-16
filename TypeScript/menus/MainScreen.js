var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
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
            this.createTitle();
        }
        MainScreen.prototype.createContent = function () {
            var button = new gameui.ui.ImageButton("assets/PlayBt.png", function () {
                joinjelly.JoinJelly.startLevel();
            });

            button.y = 1168;
            button.x = 768;
            this.content.addChild(button);

            // adds jelly
            var lobby = new joinjelly.menus.view.JellyLobby(this.userData.getLastJelly());
            lobby.x = defaultWidth / 2;
            lobby.y = 1000;
            this.content.addChild(lobby);

            var aboutBt = new gameui.ui.ImageButton("About", function () {
                joinjelly.JoinJelly.showAboutScreen();
            });
            aboutBt.y = -150;
            aboutBt.x = defaultWidth - 150;

            this.footer.addChild(aboutBt);
        };

        MainScreen.prototype.createTitle = function () {
            var t = new joinjelly.menus.view.GameTitle();
            this.content.addChild(t);
        };
        MainScreen.prototype.createBackground = function () {
            this.background.addChild(new createjs.Bitmap("assets/backhome.jpg"));
        };

        MainScreen.prototype.createHeader = function () {
        };

        MainScreen.prototype.createFooter = function () {
            if (this.userData) {
                this.scoreText = new createjs.BitmapText("High Score " + this.userData.getHighScore(), new createjs.SpriteSheet(Deburilfont));
                this.scoreText.x = 50;
                this.scoreText.y = -50;
                this.scoreText.scaleX = this.scoreText.scaleY = 0.8;
                this.footer.addChild(this.scoreText);
            }
        };
        return MainScreen;
    })(gameui.ScreenState);
    joinjelly.MainScreen = MainScreen;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=MainScreen.js.map
