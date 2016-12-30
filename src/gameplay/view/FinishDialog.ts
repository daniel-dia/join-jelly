module joinjelly.gameplay.view {

    export class FinishMenu extends joinjelly.menus.view.FlyOutMenu {

        private jellyText: PIXI.extras.BitmapText;
        private jelly: view.Jelly;
        private scoreText: PIXI.extras.BitmapText;
        private highScoreText: PIXI.extras.BitmapText;
        private specialOffer: PIXI.Container; 

        constructor() {
            super(StringResources.menus.gameOver, 1250);
            this.top -= 200;
            this.addPoints();
            this.addLastJelly();
            this.addButtons();

            this.specialOffer = new PIXI.Container();
            this.specialOffer.set({ x: defaultWidth / 2, y: 2050 });

            this.addChild(this.specialOffer);
        }

        // creates buttons controls
        private addButtons() {

            //add share button;
            var close = new gameui.ImageButton("BtMinimize", (() => {
                this.dispatchEvent("minimize")
            }));
            close.set({ x: 1350, y: 660 });
            this.addChild(close);

            //add home button;
            var home = new gameui.ImageButton("BtMenu", (() => {
                this.dispatchEvent("home")
            }));
            home.set({ x: 353, y: 1780 });
            this.addChild(home);

            //add showBoard button
            var restart = new gameui.ImageButton("BtRestart", (() => {
                this.dispatchEvent("restart")
            }));
            restart.set({ x: 353 + 300, y: 1780 });
            this.addChild(restart);
        }

        // create points control
        private addPoints(): PIXI.DisplayObject {

            var container = new PIXI.Container();
            
            // creates points Bg
            var bg = gameui.AssetsManager.getBitmap("GameOverBgPoints");
            bg.set({ x: defaultWidth / 2, y: 565, regX: 1056 / 2 });
            container.addChild(bg);

            // create "points" text
            var tx = gameui.AssetsManager.getBitmapText("", "debussyBig")
            tx.set({ x: defaultWidth / 2, y: 630 });
            container.addChild(tx);
            this.scoreText = tx;            

            // create HighScore text
            var tx = gameui.AssetsManager.getBitmapText("", "debussy")
            tx.set({ x: 300, y: 775 });
            tx.scaleX = tx.scaleY = 0.8;
            container.addChild(tx);
            this.highScoreText = tx;

            container.y += 275;
            this.addChild(container);

            return container;

        }

        // creates last jelly control
        private addLastJelly(): PIXI.DisplayObject {

            var container = new PIXI.Container();
            this.addChild(container);

            //add background
            var bg = gameui.AssetsManager.getBitmap("GameOverBgJelly");
            bg.set({ x: defaultWidth / 2, y: 951, regX: 797 / 2 });
            container.addChild(bg);

            //add "LastJelly" Text
            var tx = gameui.AssetsManager.getBitmapText(StringResources.menus.highJelly, "debussy")
            tx.set({ x: 420, y: 820 });
            //container.addChild(tx);
            tx.scaleX = tx.scaleY = 0.5;
                                    
            //add Jelly
            var jelly = new gameplay.view.Jelly();
            container.addChild(jelly);
            this.addChild(container);
            jelly.scaleX = jelly.scaleY = 1;
            jelly.set({ x: defaultWidth / 2, y: 1350 });
            this.jelly = jelly;


            //add "LastJelly" name Text
            var tx = gameui.AssetsManager.getBitmapText("1", "debussy")
            tx.set({ x: defaultWidth / 2, y: 1358 });
            tx.scaleX = tx.scaleY = 0.9;
            this.jellyText = tx;
            container.addChild(tx);
            tx.pivot.x = tx.getLocalBounds().width / 2;
            container.y += 200;
            return container;
        }

        // set values
        public setValues(score: number, highScore: number, jelly?: number, title?: string) {
            if (jelly > JoinJelly.maxJelly) jelly = JoinJelly.maxJelly;
            if (title)
                this.setTitle(title);

            var t = { value: 0 };

            createjs.Tween.get(t).to({ value: 1 }, 3000, createjs.Ease.quadOut);

            var interval = setInterval(() => {
                this.scoreText.text = Math.floor(t.value * score).toString();
                this.scoreText.regX = this.scoreText.getLocalBounds().width / 2;
                if (t.value >= 1) clearInterval(interval);
            }, 30);


            this.highScoreText.text = StringResources.menus.highScore + ": " + highScore.toString();
            this.jelly.setNumber(jelly);

            this.jellyText.text = StringResources.jellies[jelly].name;
            if (this.jellyText.getBounds())
                this.jellyText.regX = this.jellyText.getBounds().width / 2;

        }

        // #region  Special Offer
        
        public showShareButton() {
            this.ClearSpecialOffer();
            var bt = new gameui.BitmapTextButton(StringResources.menus.share, "debussy", "BtTextBgBlue", () => {
                this.dispatchEvent("share");
            });
            bt.addChild(gameui.AssetsManager.getBitmap("itemPack").set({ x: -400, y: -50, regX: 307 / 2, regY: 274 / 2, scaleX: 0.6, scaleY: 0.6 }));
            bt.addChild(gameui.AssetsManager.getBitmap("BtPlusMini").set({ x: -500, y: -100, regX: 63 / 2, regY: 66 / 2, scaleX: 1.5, scaleY: 1.5 }));
            this.specialOffer.addChild(bt);

        }

        public showLikeButton() {
            this.ClearSpecialOffer();
            var bt = new gameui.BitmapTextButton(StringResources.menus.like, "debussy", "BtTextBgBlue", () => {
                this.dispatchEvent("like");
                
            });
            bt.addChild(gameui.AssetsManager.getBitmap("itemPack").set({ x: -400, y: -50, regX: 307 / 2, regY: 274 / 2, scaleX: 0.6, scaleY: 0.6 }));
            bt.addChild(gameui.AssetsManager.getBitmap("BtPlusMini").set({ x: -500, y: -100, regX: 63 / 2, regY: 66 / 2, scaleX: 1.5, scaleY: 1.5 }));
            this.specialOffer.addChild(bt);

        }

        public showWhatchVideoButton() {
            this.ClearSpecialOffer();
            var bt: gameui.BitmapTextButton = new gameui.BitmapTextButton(StringResources.menus.watchVideo, "debussy", "BtTextBgBlue", () => {
                this.dispatchEvent("watch");
            }); 
            bt.addChild(gameui.AssetsManager.getBitmap("itemPack").set({ x: -400, y: -50, regX: 307 / 2, regY: 274 / 2, scaleX: 0.6, scaleY: 0.6 }));
            bt.addChild(gameui.AssetsManager.getBitmap("BtPlusMini").set({ x: -500, y: -100, regX: 63 / 2, regY: 66 / 2, scaleX: 1.5, scaleY: 1.5 }));
            bt.bitmapText.set({ scaleX: 0.9 })
            this.specialOffer.addChild(bt);
        }

        public showGiftTimeout(minutes: number) {
            this.ClearSpecialOffer();
            var bt = new gameui.BitmapTextButton(StringResources.menus.gift.replace("@", minutes.toString()), "debussy", "", () => { });
            bt.mouseEnabled = false;
            this.specialOffer.addChild(bt);
        }

        public showGiftLoading() {
            this.ClearSpecialOffer();
            var bt = new gameui.BitmapTextButton(StringResources.menus.loading, "debussy", "", () => { });
            bt.mouseEnabled = false;
            this.specialOffer.addChild(bt);
        }

        public showGiftLoadingError() {
            this.ClearSpecialOffer();
            var bt = new gameui.BitmapTextButton(StringResources.menus.errorAds, "debussy", "", () => { this.dispatchEvent("reload"); });
            bt.mouseEnabled = false;
            this.specialOffer.addChild(bt);
        }

        public ClearSpecialOffer() {
            this.specialOffer.removeAllChildren();
        }

        public showRandomItem(callback:(item:string)=>void) {
            this.ClearSpecialOffer();
            var randomItem = new RandomItemSelector();
            this.specialOffer.addChild(randomItem);
            randomItem.random();
            randomItem.onComplete = (item) => {
                callback(item);
            }
        }

        // #endregion
    }
}