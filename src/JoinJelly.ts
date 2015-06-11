var testMode;

module joinjelly {
    export class JoinJelly {
        
        public static maxJelly: number = 65536;
        public static userData: UserData;
        public static gameScreen: gameui.GameScreen;
        public static analytics: Analytics;
        public static itemData: ItemsData;
        public static gameServices: GameServices;

        public static init(canvasName:string) {

            this.userData = new UserData();
            this.analytics = new Analytics();
            this.itemData = new ItemsData();
            this.gameServices = new GameServices();

            // define language
            var lang = (window.navigator.userLanguage || window.navigator.language).substr(0, 2).toLowerCase();
            switch (lang) {
                case "pt": StringResources = StringResources_pt; break;
            }

            var fps = 60;
            if (window.location.search == "?test") {
                fps = 10;
                testMode = true;
            }

            this.gameScreen = new gameui.GameScreen(canvasName, defaultWidth, defaultHeight, fps);
			Cocoon.App.exitCallback(() => {
				return this.gameScreen.sendBackButtonEvent()
			})

            var loadingScreen = new joinjelly.menus.Loading();
            this.gameScreen.switchScreen(loadingScreen);
            

            // verifies if there is a savedGame
            loadingScreen.loaded = () => {
                if (window.location.search == "?test") {
                    this.startTest(); 
                } else {
                    var loadedGame = this.userData.loadGame();
                    if (loadedGame)
                        JoinJelly.startLevel();
                    else
                        JoinJelly.showMainMenu();
                }
            }
        }
		
        public static startTest() {
            var gs = new gameplay.GamePlayScreen(this.userData);
            this.gameScreen.switchScreen(gs);
            gs.selfPeformanceTest(false);
        }

		public static showMainMenu() {
            var transition = { type: "fade", time: 600 };
            if    (this.gameScreen.currentScreen instanceof gameplay.GamePlayScreen) transition = { type: "top", time: 500 };
            if    (this.gameScreen.currentScreen instanceof Jellypedia) transition = { type: "right", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.MainScreen(this.userData), null, transition);
        }

        public static startLevel() {
            var transition;
            if (this.gameScreen.currentScreen instanceof MainScreen) transition = { type: "bottom", time: 500 };
			else transition = { type: "fade", time: 600 };
            this.gameScreen.switchScreen(new gameplay.GamePlayScreen(this.userData), null, transition);
        }

		public static startLevelDirectaly() {
            this.gameScreen.switchScreen(new gameplay.GamePlayScreen(this.userData));
        }

        public static startTutorial() {
			this.gameScreen.switchScreen(new gameplay.Tutorial());
        }

        public static showStore(previousScreen: gameui.ScreenState) {
            var transition;
            if (this.gameScreen.currentScreen instanceof MainScreen) transition = { type: "right", time: 500 };
            this.gameScreen.switchScreen(new menus.StoreMenu(previousScreen), null, transition);
        }
		
        public static showIntro() {
             this.gameScreen.switchScreen(new joinjelly.StoryScreen());
        }

        public static showLeaderboards() {
            var transition;
            if (this.gameScreen.currentScreen instanceof MainScreen) transition = { type: "right", time: 500 };
            this.gameScreen.switchScreen(new menus.LeaderBoards(), null, transition);
        }

        public static showPedia() {
            var transition;
            if (this.gameScreen.currentScreen instanceof MainScreen) transition = { type: "left", time: 500 };
            this.gameScreen.switchScreen(new Jellypedia(this.userData, StringResources.jellies ), null, transition);
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

