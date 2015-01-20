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
            gameui.AssetsManager.playMusic("musicIntro");
        }
        MainScreen.prototype.createContent = function () {
            // adds jelly
            var lobby = new joinjelly.menus.view.JellyLobby(this.userData.getLastJelly());
            lobby.x = defaultWidth / 2;
            lobby.y = 1000;
            this.content.addChild(lobby);
            // play button
            var button = new gameui.ImageButton("BtPlay", function () {
                if (joinjelly.JoinJelly.userData.getLastJelly() > 1)
                    joinjelly.JoinJelly.startLevel();
                else
                    joinjelly.JoinJelly.startTutorial();
            });
            button.y = 1168;
            button.x = 768;
            this.content.addChild(button);
        };
        MainScreen.prototype.createTitle = function () {
            var t = new joinjelly.menus.view.GameTitle();
            this.content.addChild(t);
        };
        MainScreen.prototype.createBackground = function () {
            this.background.addChild(gameui.AssetsManager.getBitmap("backhome"));
        };
        MainScreen.prototype.createHeader = function () {
        };
        MainScreen.prototype.createFooter = function () {
            var _this = this;
            if (this.userData) {
                this.scoreText = gameui.AssetsManager.getBitmapText(StringResources.menus.highScore + " " + this.userData.getHighScore(), "debussy");
                this.scoreText.x = 50;
                this.scoreText.y = -100;
                this.scoreText.scaleX = this.scoreText.scaleY = 0.8;
                this.footer.addChild(this.scoreText);
            }
            var x = defaultWidth + 100;
            var space = 250;
            //add About button
            var settingsBt = new gameui.ImageButton("BtInfo", function () {
                joinjelly.JoinJelly.showAbout();
            });
            settingsBt.y = 150;
            settingsBt.x = x - space;
            this.header.addChild(settingsBt);
            //add Menu button
            var settingsBt = new gameui.ImageButton("BtMenu", function () {
                joinjelly.JoinJelly.showSettings();
            });
            settingsBt.y = -150;
            settingsBt.x = x -= space;
            this.footer.addChild(settingsBt);
            //add pedia button
            var aboutBt = new gameui.ImageButton("BtJelly", function () {
                joinjelly.JoinJelly.showPedia();
            });
            aboutBt.y = -150;
            aboutBt.x = x -= space;
            this.footer.addChild(aboutBt);
            //add store bt
            var storeBt = new gameui.ImageButton("BtStore", function () {
                joinjelly.JoinJelly.showStore(_this);
            });
            storeBt.y = -150;
            storeBt.x = x -= space;
            this.footer.addChild(storeBt);
        };
        return MainScreen;
    })(gameui.ScreenState);
    joinjelly.MainScreen = MainScreen;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=MainScreen.js.map