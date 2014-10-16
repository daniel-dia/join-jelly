var joinjelly;
(function (joinjelly) {
    var JoinJelly = (function () {
        function JoinJelly() {
        }
        JoinJelly.init = function () {
            this.gameScreen = new gameui.GameScreen("gameCanvas", defaultWidth, defaultHeight);
            this.gameScreen.stage.enableMouseOver(60);
            this.gameScreen.stage.mouseMoveOutside = true;

            this.userData = new UserData();
            var loadingScreen = new joinjelly.Loading();
            this.gameScreen.switchScreen(loadingScreen);

            loadingScreen.loaded = function () {
                JoinJelly.showMainMenu();
            };
        };

        JoinJelly.showAboutScreen = function () {
            //not Implemented
            alert("beta");
        };

        JoinJelly.showMainMenu = function () {
            this.gameScreen.switchScreen(new joinjelly.MainScreen(this.userData));
        };

        JoinJelly.startLevel = function () {
            this.gameScreen.switchScreen(new joinjelly.gameplay.GamePlayScreen(this.userData));
        };
        return JoinJelly;
    })();
    joinjelly.JoinJelly = JoinJelly;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=FastPair.js.map
