module joinjelly.menus.view {

    export class FlyOutMenu extends createjs.Container {

        constructor(title: string) {
            super();

            this.regX = this.x = defaultWidth / 2;
            this.regY = this.y = defaultHeight / 2;

            this.AddBG();
            this.addTitle();

            this.visible=false;
        }

        // creates menu title
        private AddBG() {
            var title = gameui.AssetsManager.getBitmap("FlyBG");
            title.set({ x: defaultWidth / 2, y: 557, regX: 1305 / 2 });
            this.addChild(title);
        }

        // creates menu title
        private addTitle() {
            var title = gameui.AssetsManager.getBitmap("FlyBG");
            title.set({ x: defaultWidth / 2, y: 557, regX: 1305 / 2 });
            // 1305 1022
            this.addChild(title);
        }


        // animates menu entrance
        private animateIn() {

            // shows menus
            this.visible = true;

            // animate all
            this.y -= 500;
            this.alpha = 0;
            this.scaleX = 0.5;
            this.scaleY = 2;
            createjs.Tween.get(this).to({ x: defaultWidth / 2, y: defaultHeight / 2, alpha: 1, scaleX: 1, scaleY: 1 }, 1400, createjs.Ease.elasticInOut);

            // animate title

            // animate points

            // animate last jelly

            // animate buttons

        }

        private animateOut() {

            // animate all
            this.alpha = 1;
            this.scaleX = 1;
            this.scaleY = 1;
            createjs.Tween.get(this).to({ alpha: 0, scaleX: 0.5, scaleY: 0.75 }, 200, createjs.Ease.quadIn).call(() => { this.visible = false; });
        }


        public show() {
            this.animateIn();
        }

        public hide()
        {
            this.animateOut();
        }

    }
} 