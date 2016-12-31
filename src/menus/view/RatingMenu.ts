declare var Windows;
module joinjelly.menus.view {

    export class RatingFlyOut extends FlyOutMenu {

        private jellyText: PIXI.extras.BitmapText;
        private scoreText: PIXI.extras.BitmapText;
        private highScoreText: PIXI.extras.BitmapText;
        private stars: Array<Star>;

        constructor() {
            super(StringResources.menus.rating, 1250);

            this.addTexts();

            this.addCloseButton();

            this.addStars();
        }

        public show() {
            if (!navigator.onLine) return;

            if (JoinJelly.userData.getHistory("rated")) return;
            if (JoinJelly.userData.getHistory("rating_asked")) return;
            if (JoinJelly.userData.getPlays() < 10) return;
            if (JoinJelly.userData.getHighScore() < 5000) return;

            JoinJelly.userData.history("rating_asked");

            super.show();
        }

        private addTexts() {
            // create "points" text
            var tx = gameui.AssetsManager.getBitmapText(StringResources.menus.ratingDesc, "debussy")
            tx.align = "center";
            tx.set({ x: 280, y: 840 });
            this.addChild(tx);
            this.scoreText = tx;
        }

        // creates buttons controls
        private addCloseButton() {

            //add share button;
            var close = new gameui.ImageButton("BtClose", (() => {
                this.hide();
            }));

            close.set({ x: 1350, y: 660 });
            this.addChild(close);
        }

        private addStars() {
            this.stars = [];
            for (var i = 0; i < 5; i++) {
                var star = new Star();
                this.addChild(star);
                star.y = 1150;
                star.x = 200 * i + (defaultWidth - 800) / 2;
                this.stars[i] = star;

            }

            this.stars[0].on("click", () => { this.rate(1) });
            this.stars[1].on("click", () => { this.rate(2) });
            this.stars[2].on("click", () => { this.rate(3) });
            this.stars[3].on("click", () => { this.rate(4) });
            this.stars[4].on("click", () => { this.rate(5) });
            this.stars[0].on("tap", () => { this.rate(1) });
            this.stars[1].on("tap", () => { this.rate(2) });
            this.stars[2].on("tap", () => { this.rate(3) });
            this.stars[3].on("tap", () => { this.rate(4) });
            this.stars[4].on("tap", () => { this.rate(5) });
        }

        private rate(value: number) {

            JoinJelly.userData.history("rated")

            for (var i = 0; i < value; i++) this.stars[i].turnOn();
            for (var i = value; i < 5; i++) this.stars[i].turnOff();
            for (var i = 0; i < 5; i++) this.stars[i].interactive = false;

            this.saveRating(i);

            if (value < 3) this.askFeedback();
            if (value == 3) this.thankUser();
            if (value > 3) this.thankUserAndAsk();
        }

        private saveRating(rate) {
            JoinJelly.userData.history("rated");
            JoinJelly.analytics.logRating(rate);

        }

        private askFeedback() {

            var tx = gameui.AssetsManager.getBitmapText("Would you mind give us\nsome feedback?", "debussy")
            tx.set({ x: 280, y: 1300 });
            this.addChild(tx);

            var ok = new gameui.BitmapTextButton("Ok, sure", "debussy", "BtTextBg", () => { this.sendEmail(); })
            var no = new gameui.BitmapTextButton("No, thanks", "debussy", "BtTextBg", () => { this.hide(); })

            this.addChild(ok);
            this.addChild(no);

            ok.y = no.y = 1640;
            ok.x = defaultWidth / 2 + 400;
            no.x = defaultWidth / 2 - 400;
        }

        private thankUserAndAsk() {

            var tx = gameui.AssetsManager.getBitmapText("Thanks! How about a rating\non App Store, then?", "debussy")
            tx.set({ x: 280, y: 1300 });
            this.addChild(tx);

            var ok = new gameui.BitmapTextButton("Ok, sure", "debussy", "BtTextBg", () => { this.gotoStore(); })
            var no = new gameui.BitmapTextButton("No, thanks", "debussy", "BtTextBg", () => { this.hide(); })

            this.addChild(ok);
            this.addChild(no);

            ok.y = no.y = 1640;
            ok.x = defaultWidth / 2 + 400;
            no.x = defaultWidth / 2 - 400;
        }

        private thankUser() {

            // create "points" text
            var tx = gameui.AssetsManager.getBitmapText(StringResources.menus.thanks, "debussyBig")
            tx.set({ x: 280, y: 1480 });
            this.addChild(tx);
            setTimeout(() => { this.hide(); }, 1500)

        }

        private sendEmail() {
            DeviceServices.openURL("mailto:games@diastudio.com.br");
            setTimeout(() => { this.hide(); }, 1500)
        }

        private gotoStore() {

            
            var storeURLs = {
                ios: "http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=981743649&pageNumber=0&sortOrdering=2&type=Purple+Software&mt=8",
                android: "market://details?id=com.diastudio.joinjelly",
                windows: "ms-windows-store:REVIEW?PFN=DIAStudio.JoinJelly_gs119xcmtqkqr"
            }

            StoreServices.showRating(storeURLs);

            setTimeout(() => { this.hide(); }, 1500)

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