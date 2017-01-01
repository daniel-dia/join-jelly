module joinjelly.gameplay.view {

    export class TutorialMove extends PIXI.Container {

        private fingerUp;
        private fingerDown;
        constructor() {
            super();

            this.fingerUp = gameui.AssetsManager.getBitmap("tutorialFinger");
            this.fingerDown = gameui.AssetsManager.getBitmap("tutorialFingerDown");

            this.addChild(this.fingerUp);
            this.addChild(this.fingerDown);

            this.fingerDown.y = 17;

            this.regX = 180;
            this.mouseEnabled = false;

            this.visible = false;

        }

        public showMove(x1: number, y1: number, x2: number, y2: number) {
            this.visible = true;
            this.x = x1;
            this.y = y1;
            this.alpha = 0;
            this.fu();
            createjs.Tween.removeTweens(this);
            createjs.Tween.get(this, { loop: true })
                .to({ alpha: 1 }, 500).call(() => { this.fd() })
                .to({ x: x2, y: y2 }, 1600, createjs.Ease.quadInOut).call(() => { this.fu() })
                .to({ alpha: 0 }, 500);
        }


        public showClick(x1: number, y1: number) {
            this.visible = true;
            this.x = x1;
            this.y = y1;
            this.alpha = 1;
            this.fu();
            createjs.Tween.removeTweens(this);
            createjs.Tween.get(this, { loop: true })
                .wait(500).call(() => { this.fd() })
                .wait(1000).call(() => { this.fu() });
        }

        private fd() {
            this.fingerDown.visible = true;
            this.fingerUp.visible = false;
        }

        private fu() {
            this.fingerDown.visible = false;
            this.fingerUp.visible = true;
        }

        public hide() {
            createjs.Tween.removeTweens(this);
            this.visible = false;
        }


    }
} 