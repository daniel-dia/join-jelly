var joinjelly;
(function (joinjelly) {
    var JoinJelly = (function () {
        function JoinJelly() {
        }
        JoinJelly.init = function () {
            this.analytics = new Analytics();
            this.itemData = new joinjelly.ItemsData();
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
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.gameplay.GamePlayScreen)
                transition = { type: "top", time: 500 };
            if (this.gameScreen.currentScreen instanceof joinjelly.Jellypedia)
                transition = { type: "right", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.MainScreen(this.userData), null, transition);
        };
        JoinJelly.startLevel = function () {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "bottom", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.gameplay.ExplodeBricks(this.userData), null, transition);
        };
        JoinJelly.startTutorial = function () {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "bottom", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.gameplay.Tutorial(this.userData), null, transition);
        };
        JoinJelly.showStore = function (previousScreen) {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "right", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.StoreMenu(previousScreen), null, transition);
        };
        JoinJelly.showPedia = function () {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "left", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.Jellypedia(this.userData, StringResources.jellys), null, transition);
        };
        return JoinJelly;
    })();
    joinjelly.JoinJelly = JoinJelly;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=JoinJelly.js.map