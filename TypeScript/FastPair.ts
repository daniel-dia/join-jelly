module joinjelly {
    export class FasPair{

        public static userData: UserData;
        private static gameScreen: gameui.GameScreen;

        public static init() {
            
            this.gameScreen = new gameui.GameScreen("gameCanvas", defaultWidth, defaultHeight);
            this.gameScreen.stage.enableMouseOver(60);
            this.gameScreen.stage.mouseMoveOutside = true;

            this.userData = new UserData();
            var loadingScreen = new joinjelly.Loading();
            this.gameScreen.switchScreen(loadingScreen);

            loadingScreen.loaded = () => {
                FasPair.showMainMenu();
            }
        }

        public static showMainMenu() {
            this.gameScreen.switchScreen(new joinjelly.MainScreen(this.userData));
        }

        public static startLevel() {
            this.gameScreen.switchScreen(new gameplay.GamePlayScreen(this.userData));
        }

    }
}
 