var joinjelly;
(function (joinjelly) {
    var JoinJelly = (function () {
        function JoinJelly() {
        }
        JoinJelly.init = function () {
            var _this = this;
            this.analytics = new Analytics();
            this.itemData = new joinjelly.ItemsData();
            this.gameScreen = new gameui.GameScreen("gameCanvas", defaultWidth, defaultHeight, 60, true);
            this.gameScreen.stage.enableDOMEvents(false);
            this.userData = new UserData();
            var loadingScreen = new joinjelly.Loading();
            this.gameScreen.switchScreen(loadingScreen);
            // verifies if there is a savedGame
            loadingScreen.loaded = function () {
                var loadedGame = _this.userData.loadGame();
                if (loadedGame)
                    joinjelly.JoinJelly.startLevel(loadedGame);
                else
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
        JoinJelly.startLevel = function (loadedGame) {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "bottom", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.gameplay.ExplodeBricks(this.userData, loadedGame), null, transition);
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
            this.gameScreen.switchScreen(new joinjelly.menus.StoreMenu(previousScreen), null, transition);
        };
        JoinJelly.showPedia = function () {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "left", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.Jellypedia(this.userData, StringResources.jellys), null, transition);
        };
        JoinJelly.showSettings = function () {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "left", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.MainMenu(), null, transition);
        };
        JoinJelly.showAbout = function () {
            this.gameScreen.switchScreen(new joinjelly.About());
        };
        JoinJelly.maxJelly = 16384;
        return JoinJelly;
    })();
    joinjelly.JoinJelly = JoinJelly;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=JoinJelly.js.map