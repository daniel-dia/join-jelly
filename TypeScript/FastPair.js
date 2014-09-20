var fpair;
(function (fpair) {
    var FasPair = (function () {
        function FasPair() {
        }
        FasPair.init = function () {
            this.gameScreen = new gameui.GameScreen("gameCanvas", defaultWidth, defaultHeight);
            this.gameScreen.stage.enableMouseOver(60);
            this.gameScreen.stage.mouseMoveOutside = true;

            this.userData = new UserData();
            var loadingScreen = new fpair.Loading();

            loadingScreen.loaded = function () {
                FasPair.showMainMenu();
            };
        };

        FasPair.showMainMenu = function () {
            this.gameScreen.switchScreen(new fpair.MainScreen(this.userData));
        };

        FasPair.startLevel = function () {
            this.gameScreen.switchScreen(new fpair.gameplay.GamePlayScreen(this.userData));
        };
        return FasPair;
    })();
    fpair.FasPair = FasPair;
})(fpair || (fpair = {}));
//# sourceMappingURL=FastPair.js.map
