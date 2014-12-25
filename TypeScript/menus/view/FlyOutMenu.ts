module joinjelly.menus.view {

    export class FlyOutMenu extends createjs.Container {

        constructor(title: string, heigth:number=1022) {
            super();

            this.regX = this.x = defaultWidth / 2;
            this.regY = this.y = defaultHeight / 2;

            this.AddBG(heigth);
            this.addTitle(title);

            this.visible=false;
        }

        // creates menu background
        private AddBG(heigth:number) {
            var bg = gameui.AssetsManager.getBitmap("FlyBG");
            bg.set({ x: defaultWidth / 2, y: 557, regX: 1305 / 2 });
            bg.scaleY = heigth / 1022;
            this.addChild(bg);

            bg.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(-bg.x + bg.regX, -bg.y + bg.regY, defaultWidth, defaultHeight));
     
        }

        // creates menu title
        private addTitle(title:string) {
            //create "points" text
            
            var tx = gameui.AssetsManager.getBitmapText(title.toUpperCase(), "debussy")
            tx.set({ x: defaultWidth / 2, y: 600 });
            this.addChild(tx);

           // tx.scaleX = tx.scaleY = 2;
            tx.regX = tx.getBounds().width / 2;
        }


        // animates menu entrance
        private animateIn() {

            createjs.Tween.removeTweens(this);
            // shows menus
            this.visible = true;
            this.y -= 500;
            this.alpha = 0;
            this.scaleX = 0.5;
            this.scaleY = 2;
            createjs.Tween.get(this).to({ x: defaultWidth / 2, y: defaultHeight / 2, alpha: 1, scaleX: 1, scaleY: 1 }, 1400, createjs.Ease.elasticOut);
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
            gameui.AssetsManager.playSound("Interface Sound-14");
        }

        public hide()
        {
            if (!this.visible) return;
            this.animateOut();
            gameui.AssetsManager.playSound("Interface Sound-15");
        }

    }
} 