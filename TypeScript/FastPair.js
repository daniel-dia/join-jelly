var joinjelly;
(function (joinjelly) {
    var FasPair = (function () {
        function FasPair() {
        }
        FasPair.init = function () {
            this.gameScreen = new gameui.GameScreen("gameCanvas", defaultWidth, defaultHeight);
            this.gameScreen.stage.enableMouseOver(60);
            this.gameScreen.stage.mouseMoveOutside = true;

            this.userData = new UserData();
            var loadingScreen = new joinjelly.Loading();
            this.gameScreen.switchScreen(loadingScreen);

            loadingScreen.loaded = function () {
                FasPair.showMainMenu();
            };
        };

        FasPair.showAboutScreen = function () {
            //not Implemented
            alert("beta");
        };

        FasPair.showMainMenu = function () {
            this.gameScreen.switchScreen(new joinjelly.MainScreen(this.userData));
        };

        FasPair.startLevel = function () {
            this.gameScreen.switchScreen(new joinjelly.gameplay.GamePlayScreen(this.userData));
        };
        return FasPair;
    })();
    joinjelly.FasPair = FasPair;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=FastPair.js.map
