module joinjelly {
    export class MainScreen extends gameui.ScreenState {

        private timeStep = 2;
        private boardSize = 5;

        private time: number;

        private scoreText: PIXI.extras.BitmapText;

        private userData: UserData;

        private rating: menus.view.RatingFlyOut;
   
        constructor(userData: UserData) {
            super();

            this.userData = userData;
            this.createContent();
            this.createBackground();

            this.createButtons();
            this.createTitle();

            // rating Menu
            this.rating = new menus.view.RatingFlyOut();
            this.content.addChild(this.rating);
            this.rating.x = defaultWidth / 2;
            this.rating.y = defaultHeight / 2;
            
            gameui.AudiosManager.playMusic("musicIntro");

            this.rating.show();

            this.onback = DeviceServices.exit;
            
        }

        private createContent() {
            // adds jelly
            var lobby = new menus.view.JellyLobby(this.userData.getLastJelly());
            lobby.x = defaultWidth / 2;
            lobby.y = 1000;
            this.content.addChild(lobby);

            // play button
            /// Check tutorial
            var button = new gameui.ImageButton("BtPlay", () => {
           //     if (JoinJelly.userData.getHistory(histories.TUTORIAL))
                    JoinJelly.startLevel();
           //     else
           //         JoinJelly.showIntro();
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
            this.background.addChild(gameui.AssetsManager.getBitmap("BackMain"));
        }

        private createButtons() {
            var x = defaultWidth + 100;
            var space = 250;

            //add About button
            var settingsBt = new gameui.ImageButton("DIAStudioIco", () => { JoinJelly.showAbout(); });
            settingsBt.y = 165 / 2;
            settingsBt.x = defaultWidth - 165 / 2;
            this.header.addChild(settingsBt);

            //add Menu button
            var settingsBt = new gameui.ImageButton("BtMenu", () => {
                JoinJelly.showSettings();
            });
            settingsBt.y = -150;
            settingsBt.x = x -= space;
            this.footer.addChild(settingsBt);
                 
            //add store bt
            var storeBt = new gameui.ImageButton("BtStore", () => {
                JoinJelly.showStore(this);
            });
            storeBt.y = -150;
            storeBt.x = x -= space;
            this.footer.addChild(storeBt);

            //add pedia button
            var aboutBt = new gameui.ImageButton("BtPedia", () => {
                JoinJelly.showPedia();
            });
            aboutBt.y = -150;
            aboutBt.x = x -= space;
            this.footer.addChild(aboutBt);

          


            //add leaderboards button
            var leaderboardsBt = new gameui.ImageButton("BtTextBg",() => {
                JoinJelly.gameServices.showLeaderboard();
            });
            leaderboardsBt.y = -150;
            leaderboardsBt.x = x = 370;
            this.footer.addChild(leaderboardsBt);


            if (this.userData) {
                this.scoreText = gameui.AssetsManager.getBitmapText(StringResources.menus.highScore, "debussy");
                this.scoreText.x = -300;
                this.scoreText.y = -250 + 100;
                leaderboardsBt.addChild(this.scoreText);

                this.scoreText = gameui.AssetsManager.getBitmapText(this.userData.getHighScore().toString(), "debussyBig");
                this.scoreText.x = -300;
                this.scoreText.y = -170 + 100;
                leaderboardsBt.addChild(this.scoreText);
            }
        }
    }

}