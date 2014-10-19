module joinjelly {
    export class JoinJelly{

        public static userData: UserData;
        private static gameScreen: gameui.GameScreen;
        public static analytics: Analytics;

        public static init() {

            this.analytics = new Analytics();
                
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
            this.gameScreen.switchScreen(new joinjelly.MainScreen(this.userData));
        }

        public static startLevel() {
            this.gameScreen.switchScreen(new gameplay.GamePlayScreen(this.userData));
        }
     
        public static startTutorial() {
            this.gameScreen.switchScreen(new gameplay.Tutorial(this.userData));
        }
    }
}
 