module joinjelly.menus.view {

    export class FlyOutMenu extends createjs.Container {

        private title: createjs.BitmapText;
        protected top: number;

        constructor(title: string, height: number = 1022) {
            super();

            this.top = defaultHeight / 2 - 200;

            this.regX = this.x = defaultWidth / 2;
            this.regY = this.y = defaultHeight / 2;

            this.AddBG(height);
            this.addTitle(title);

            this.visible = false;
        }

        public setTitle(title: string) {
            this.title.text = title.toUpperCase()
            this.title.regX = this.title.getBounds().width / 2;
        }

        // creates menu background
        private AddBG(heigth: number = 1022) {
            var dk = gameui.AssetsManager.getBitmap("popupdark");
            this.addChild(dk);
            dk.scaleX = dk.scaleY = 16
            dk.x = -defaultWidth / 2;
            dk.y = -defaultHeight / 2;
            dk.mouseEnabled = true;
            var rec = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0, 0, 192, 256))
            dk.hitArea = rec;

            var bg = gameui.AssetsManager.getBitmap("FlyBG");
            bg.set({ x: defaultWidth / 2, y: 557, regX: 1305 / 2 });
            bg.scaleY = heigth / 1022;
            this.addChild(bg);
           
            bg.mouseEnabled = true;
            
        }

        // creates menu title
        private addTitle(title: string) {
            //create "points" text
            
            this.title = gameui.AssetsManager.getBitmapText("", "debussyBig")
            this.title.set({ x: defaultWidth / 2, y: 600 });
            this.addChild(this.title);

            this.setTitle(title);
        }


        // animates menu entrance
        private animateIn() {

            createjs.Tween.removeTweens(this);
            // shows menus
            this.visible = true;
            this.y = this.top - 500;
            this.alpha = 0;
            this.scaleX = 0.5;
            this.scaleY = 2;
            createjs.Tween.get(this).to({ x: defaultWidth / 2, y: this.top, alpha: 1, scaleX: 1, scaleY: 1 }, 1400, createjs.Ease.elasticOut);
        }

        private animateOut() {

            // animate all
            createjs.Tween.removeTweens(this);
            this.alpha = 1;
            this.scaleX = 1;
            this.scaleY = 1;
            createjs.Tween.get(this).to({ alpha: 0, scaleX: 0.5, scaleY: 0.75 }, 200, createjs.Ease.quadIn).call(() => { this.visible = false; });
        }


        public show() {
            this.animateIn();
            gameui.AudiosManager.playSound("Interface Sound-14");
        }

        public hide() {
            if (!this.visible) return;
            this.animateOut();
            gameui.AudiosManager.playSound("Interface Sound-15");
        }

    }
} 