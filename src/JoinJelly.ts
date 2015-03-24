module joinjelly {
    export class JoinJelly {


        public static maxJelly: number = 65536;
        public static userData: UserData;
        public static gameScreen: gameui.GameScreen;
        public static analytics: Analytics;
        public static itemData: ItemsData;


        public static init() {

            this.userData = new UserData();
            this.analytics = new Analytics();
            this.itemData = new ItemsData();

            AzureLeaderBoards.init();


            //define language
            var lang = (window.navigator.userLanguage || window.navigator.language).substr(0, 2).toLowerCase();
            switch (lang) {
                case "pt": StringResources = StringResources_pt; break;
            }

            var fps = 60;
            if (window.location.search == "?test") fps = 10;

            this.gameScreen = new gameui.GameScreen("gameCanvas", defaultWidth, defaultHeight, fps);


            var loadingScreen = new joinjelly.menus.Loading();
            this.gameScreen.switchScreen(loadingScreen);
            // verify test

            // verifies if there is a savedGame
            loadingScreen.loaded = () => {
                if (window.location.search == "?test") {
                    this.startTest(); 
                } else {
                    var loadedGame = this.userData.loadGame();
                    if (loadedGame)
                        joinjelly.JoinJelly.startLevel(loadedGame);
                    else
                        JoinJelly.showMainMenu();
                }
            }
        }

        public static startTest() {
            var gs = new gameplay.ExplodeBricks(this.userData);
            this.gameScreen.switchScreen(gs);
            gs.selfPeformanceTest(false);
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

        public static startLevel(loadedGame?:SaveGame) {
            var transition;
            if (this.gameScreen.currentScreen instanceof MainScreen) transition = { type: "bottom", time: 500 };
            this.gameScreen.switchScreen(new gameplay.ExplodeBricks(this.userData,loadedGame), null, transition);
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

        public static showLeaderboards() {
            var transition;
            if (this.gameScreen.currentScreen instanceof MainScreen) transition = { type: "right", time: 500 };
            this.gameScreen.switchScreen(new menus.LeaderBoards(), null, transition);
        }

        public static showPedia() {
            var transition;
            if (this.gameScreen.currentScreen instanceof MainScreen) transition = { type: "left", time: 500 };
            this.gameScreen.switchScreen(new Jellypedia(this.userData, StringResources.jellys), null, transition);
        }

        public static showSettings() {
            var transition;
            if (this.gameScreen.currentScreen instanceof MainScreen) transition = { type: "left", time: 500 };
            this.gameScreen.switchScreen(new menus.MainMenu(), null, transition);
        }
        public static showAbout() {
            this.gameScreen.switchScreen(new About());
        }
    }
}


window.onload = function () {
    joinjelly.JoinJelly.init();
}