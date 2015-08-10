var testMode;

module joinjelly {
    export class JoinJelly {

        public static maxJelly: number = 65536;
        public static userData: UserData;
        public static gameScreen: gameui.GameScreen;
        public static analytics: Analytics;
        public static itemData: ItemsData;
        public static gameServices: GameServices;
        public static FBSocialService: any;

        public static init(canvasName: string) {

            this.userData = new UserData();
            this.analytics = new Analytics();
            this.itemData = new ItemsData();
            this.gameServices = new GameServices();
            this.initializeSocial();

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

            // add back button callback
            Cocoon.App.exitCallback(() => {
                return this.gameScreen.sendBackButtonEvent()
            })

            var loadingScreen = new joinjelly.menus.Loading();
            this.gameScreen.switchScreen(loadingScreen);
            

            // verifies if there is a savedGame
            loadingScreen.loaded = () => {

                //JoinJelly.showTestScreen();return;

                this.initializeAds();

                if (window.location.search == "?test") {
                    this.startTest();
                } else {
                    var loadedGame = this.userData.loadGame();
                        JoinJelly.showMainScreen();
                }
            }
        }

        public static initializeSocial() {
            var os = "web"
            if (Cocoon.Device.getDeviceInfo()) os = Cocoon.Device.getDeviceInfo().os;

            if (os == "windows" ) return;

            //initialize the Facebook Service the same way as the Official JS SDK
            var fb = Cocoon.Social.Facebook;
            fb.init({ appId: fbAppId });
            this.FBSocialService = fb.getSocialInterface();
        }

        public static initializeAds() {

            Cocoon.Ad.interstitial.on("ready", () => {
                // tells that a ads s loaded
                Cocoon.Ad.interstitial["loaded"] = true;
                // once a ads is loaded so it is avaliable for this app.
                this.userData.history("ads_avaliable");
                console.log("ads loaded");
            })

            Cocoon.Ad.loadInterstitial();
        }

        public static startTest() {
            var gs = new gameplay.GamePlayScreen(this.userData);
            this.gameScreen.switchScreen(gs);
            gs.selfPeformanceTest(false);
        }

        public static showTestScreen() {
              this.gameScreen.switchScreen(new joinjelly.TestScreen());
        }


        public static showMainScreen() {
            var transition = { type: "fade", time: 600 };
            if (this.gameScreen.currentScreen instanceof gameplay.GamePlayScreen) transition = { type: "top", time: 500 };
            if (this.gameScreen.currentScreen instanceof Jellypedia) transition = { type: "right", time: 500 };
            if (this.gameScreen.currentScreen instanceof menus.MainMenu) transition = { type: "right", time: 500 };
            if (this.gameScreen.currentScreen instanceof menus.StoreMenu) transition = { type: "left", time: 500 };
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
            this.gameScreen.switchScreen(new Jellypedia(this.userData, StringResources.jellies), null, transition);
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

