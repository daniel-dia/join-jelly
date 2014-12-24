module joinjelly{
    export class MainScreen extends gameui.ScreenState {

        private timeStep = 2;
        private boardSize = 5;

        private time: number;

        private scoreText: createjs.BitmapText;

        private userData: UserData;

        constructor(userData: UserData) {
            super();

            this.userData = userData;
            this.createContent();
            this.createBackground();
            this.createHeader();
            this.createFooter();
            this.createTitle();

            gameui.AssetsManager.playMusic("musicIntro");
            
        }

        private createContent() {

        
            // adds jelly
            var lobby = new menus.view.JellyLobby(this.userData.getLastJelly());
            lobby.x = defaultWidth / 2;
            lobby.y = 1000;
            this.content.addChild(lobby);

            //add pedia button
            var aboutBt = new gameui.ImageButton("btJelly", () => {
                JoinJelly.showPedia();
            });
            aboutBt.y = -150;
            aboutBt.x = defaultWidth - 650;
            this.footer.addChild(aboutBt);

            //add about bt
            var aboutBt = new gameui.ImageButton("btInfo", () => {
                JoinJelly.showAboutScreen();
            });
            aboutBt.y = -150;
            aboutBt.x = defaultWidth-150;
            this.footer.addChild(aboutBt);

            //add tutorial bt
            var tutorialBt = new gameui.ImageButton("btHelp", () => {
                JoinJelly.startTutorial();
            });
            tutorialBt.y = -150;
            tutorialBt.x = defaultWidth - 400;
            this.footer.addChild(tutorialBt);

            // play button
            var button = new gameui.ImageButton("PlayBt", () => {
                if (JoinJelly.userData.getLastJelly()>1)
                    JoinJelly.startLevel();
                else
                    JoinJelly.startTutorial();
            });

            button.y = 1168;
            button.x = 768;
            this.content.addChild(button);
            
        }


        private createTitle() {
            var t = new joinjelly.menus.view.GameTitle();
            this.content.addChild(t);
        }
        private createBackground() {
            this.background.addChild(gameui.AssetsManager.getBitmap("backhome"));
        }

        private createHeader() {

        }

        private createFooter() {
            if (this.userData) {
                this.scoreText = gameui.AssetsManager.getBitmapText("High Score " + this.userData.getHighScore(), "debussy");
                this.scoreText.x = 50;
                this.scoreText.y = -100;
                this.scoreText.scaleX = this.scoreText.scaleY = 0.8;    
                this.footer.addChild(this.scoreText);
            }
        }
    }

}