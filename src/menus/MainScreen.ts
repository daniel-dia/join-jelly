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

            gameui.AudiosManager.playMusic("musicIntro");
            
        }

        private createContent() {
            // adds jelly
            var lobby = new menus.view.JellyLobby(this.userData.getLastJelly());
            lobby.x = defaultWidth / 2;
            lobby.y = 1000;
            this.content.addChild(lobby);

            // play button
            var button = new gameui.ImageButton("BtPlay", () => {
                if (JoinJelly.userData.getHistory(histories.TUTORIAL))
                    JoinJelly.startLevel();
                else
                    JoinJelly.showIntro();
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

        private createHeader() {

        }

        private createFooter() {

            if (this.userData) {
                this.scoreText = gameui.AssetsManager.getBitmapText(StringResources.menus.highScore , "debussy");
                this.scoreText.x = 70;
                this.scoreText.y = -250; 
                this.footer.addChild(this.scoreText);

                this.scoreText = gameui.AssetsManager.getBitmapText(this.userData.getHighScore().toString(), "debussyBig");
                this.scoreText.x = 70;
                this.scoreText.y = -170;
                this.footer.addChild(this.scoreText);
            }

            var x = defaultWidth + 100;
            var space = 250;

            //add About button
            var settingsBt = new gameui.ImageButton("DIAStudioIco", () => { JoinJelly.showAbout(); });
            settingsBt.y = 165 / 2;
            settingsBt.x = defaultWidth - 165/2;
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
            var aboutBt = new gameui.ImageButton("BtAchievements", () => {
                JoinJelly.showPedia();
            });
            aboutBt.y = -150;
            aboutBt.x = x -= space;
            this.footer.addChild(aboutBt);


            //add leaderboards button
            var leaderboardsBt = new gameui.ImageButton("BtLeaderBoards", () => { JoinJelly.gameServices.showLeaderboard(); });
            leaderboardsBt.y = -150;
            leaderboardsBt.x = x -= space;
            this.footer.addChild(leaderboardsBt);

        }
    }

}