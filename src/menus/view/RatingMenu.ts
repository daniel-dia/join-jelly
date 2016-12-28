declare var Windows;
module joinjelly.menus.view {

    export class RatingFlyOut extends FlyOutMenu {

        private jellyText: PIXI.extras.BitmapText; 
        private scoreText: PIXI.extras.BitmapText;
        private highScoreText: PIXI.extras.BitmapText;
        
        constructor() {
            super(StringResources.menus.rating, 1250);

            this.addTexts();

            this.addButtons();

            this.addStars();
        }

        public show() {
            if (!navigator.onLine) return;
            if (JoinJelly.userData.getHistory("rated")) return;
            if (JoinJelly.userData.getPlays() < 3) return;
            if (JoinJelly.userData.getHighScore() < 5000) return;
            super.show();
        }

        private addTexts() {
            // create "points" text
            var tx = gameui.AssetsManager.getBitmapText(StringResources.menus.ratingDesc, "debussy")
            tx.set({ x: 200, y: 880 });
            this.addChild(tx);
            this.scoreText = tx;            
        }

        // creates buttons controls
        private addButtons() {

            //add share button;
            var close = new gameui.ImageButton("BtClose",(() => {
                this.hide();
            }));

            close.set({ x: 1350, y: 660 });
            this.addChild(close);


        }

        private addStars() {
            var stars: Array<Star> = [];
            for (var i = 0; i < 5; i++) {
                var star = new Star();
                this.addChild(star);
                star.y = 1300;
                star.x = 200 * i + (defaultWidth - 800) / 2;
                stars[i] = star;
                
            }

            stars[0].addEventListener("click",() => {
                stars[0].turnOn();
                stars[1].turnOff();
                stars[2].turnOff();
                stars[3].turnOff();
                stars[4].turnOff();
                this.saveRating(1)
                this.askForDetails();
            });
            stars[1].addEventListener("click",() => {
                stars[0].turnOn();
                stars[1].turnOn();
                stars[2].turnOff();
                stars[3].turnOff();
                stars[4].turnOff();
                this.saveRating(2)
                this.askForDetails();

            });
            stars[2].addEventListener("click",() => {
                stars[0].turnOn();
                stars[1].turnOn();
                stars[2].turnOn();
                stars[3].turnOff();
                stars[4].turnOff();
                this.saveRating(3)
                this.thankUser();
                 
            });
            stars[3].addEventListener("click",() => {
                stars[0].turnOn();
                stars[1].turnOn();
                stars[2].turnOn();
                stars[3].turnOn();
                stars[4].turnOff();
                this.saveRating(4)
                this.gotoStore();
            });
            stars[4].addEventListener("click",() => {
                stars[0].turnOn();
                stars[1].turnOn();
                stars[2].turnOn();
                stars[3].turnOn();
                stars[4].turnOn();
               
                this.saveRating(5);
                this.gotoStore();
            });
        }

        private saveRating(rate) {
            JoinJelly.userData.history("rated");
            JoinJelly.analytics.logRating(rate);    
           
        }

        private askForDetails() {
            this.hide();
        }

        private thankUser() {
            this.hide();
        }

        private gotoStore() {
            this.hide();
            var IOS_RATING_URL = "http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=519623307&onlyLatestVersion=false&type=Purple+Software";
            var ANDROID_RATING_URL = "market://details?id=com.diastudio.joinjelly";
            var ratingURL = null;

            var os = DeviceServices.getOs();

            if (os == "web") return;
            else if (os == "ios") return;
            else if (os == "android") ratingURL = ANDROID_RATING_URL;
            else if (os == "windows") {
                
                Windows.System.Launcher.launchUriAsync(
                    new Windows.Foundation.Uri("ms-windows-store:REVIEW?PFN=DIAStudio.JoinJelly_gs119xcmtqkqr")
                    );

                return;
            }

            DeviceServices.openURL(ratingURL);

        }
    }

    class Star extends gameui.Button {
        private star;

        constructor() {
            super();
            var starOff = gameui.AssetsManager.getBitmap("starOff");
            var star = gameui.AssetsManager.getBitmap("star");
            star.regX = star.regY = 140 / 2;
            starOff.regX = starOff.regY = 140 / 2;
            this.addChild(starOff);
            this.addChild(star);

            star.visible = false;

            this.width = 140;
            this.height = 140;
            this.createHitArea();
            this.star = star;
        }

        public turnOn() {
            this.star.visible = true;
        }
        public turnOff() {
            this.star.visible = false;
        }
    }

}