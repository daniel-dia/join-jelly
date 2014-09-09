module fpair{
    export class MainScreen extends gameui.ScreenState {

        private timeStep = 2;
        private boardSize = 5;

        private time: number;

        private scoreText: createjs.Text;

        private userData: UserData;

        constructor(userData: UserData) {
            super();

            this.userData = userData;
            this.createContent();
            this.createBackground();
            this.createHeader();
            this.createFooter();
            
        }

        private createContent() {
            var title = new createjs.BitmapText("Fast Pair", new createjs.SpriteSheet(Chubbyfont));
            //title.textAlign = "center";
            title.y = 768 - 300;
            title.x = 768;
            this.content.addChild(title);

            var button = new gameui.ui.ImageButton("assets/PlayBt.png", () => {
                gameScreen.switchScreen(new gameplay.GamePlayScreen());
            });

            button.y = 768;
            button.x = 768;
            //button.centralize();
            this.content.addChild(button);



            // adds jelly
            var j = new gameplay.view.Jelly(0, 0, 500);
            this.content.addChild(j);
            j.setNumber(1);
            j.x = 768;
            j.y = 1000;

        }

        private createBackground() {
            this.background.addChild(new createjs.Bitmap("assets/backhome.jpg"));
        }

        private createHeader() {

        }

        private createFooter() {
            if (this.userData) {
                this.scoreText = new createjs.Text("High Score: " + this.userData.getHighScore(), "40px Arial", "white");
                this.scoreText.textAlign = "right";
                this.scoreText.x = 450;
                this.scoreText.y = -100;
                this.footer.addChild(this.scoreText);
            }
        }
    }

}