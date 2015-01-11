module joinjelly {
    export class JoinJelly {

        public static userData: UserData;
        public static gameScreen: gameui.GameScreen;
        public static analytics: Analytics;
        public static itemData: ItemsData;

        public static init() {

            this.analytics = new Analytics();
            this.itemData = new ItemsData();

            this.gameScreen = new gameui.GameScreen("gameCanvas", defaultWidth, defaultHeight);
            this.gameScreen.stage.enableMouseOver(60);
            this.gameScreen.stage.mouseMoveOutside = true;

            this.userData = new UserData();
            var loadingScreen = new joinjelly.Loading();
            this.gameScreen.switchScreen(loadingScreen);

            loadingScreen.loaded = () => {
                JoinJelly.showMainMenu();
            }
        }

        public static showAboutScreen() {
            //not Implemented
            alert("beta");
        }

        public static showMainMenu() {
            var transition;
            if (this.gameScreen.currentScreen instanceof gameplay.GamePlayScreen) transition = { type: "top", time: 500 };
            if (this.gameScreen.currentScreen instanceof Jellypedia) transition = { type: "right", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.MainScreen(this.userData), null, transition);
        }

        public static startLevel() {
            var transition;
            if (this.gameScreen.currentScreen instanceof MainScreen) transition = { type: "bottom", time: 500 };
            this.gameScreen.switchScreen(new gameplay.ExplodeBricks(this.userData), null, transition);
        }

        public static startTutorial() {
            var transition;
            if (this.gameScreen.currentScreen instanceof MainScreen) transition = { type: "bottom", time: 500 };
            this.gameScreen.switchScreen(new gameplay.Tutorial(this.userData), null, transition);
        }

        public static showStore(previousScreen: gameui.ScreenState) {
            var transition;
            if (this.gameScreen.currentScreen instanceof MainScreen) transition = { type: "right", time: 500 };
            this.gameScreen.switchScreen(new menus.StoreMenu(previousScreen), null, transition);
        }

        public static showPedia() {
            var transition;
            if (this.gameScreen.currentScreen instanceof MainScreen) transition = { type: "left", time: 500 };
            this.gameScreen.switchScreen(new Jellypedia(this.userData, StringResources.jellys), null, transition);
        }
    }
}
