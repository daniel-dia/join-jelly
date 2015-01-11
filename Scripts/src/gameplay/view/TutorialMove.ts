module joinjelly.gameplay.view {

    export class TutorialMove extends createjs.Container{


        constructor() {
            super();
            this.addChild(gameui.AssetsManager.getBitmap("tutorialFinger"));
            
            this.regX = 80;
            this.mouseEnabled = false;

            this.visible = false;
            
        }

        public show(x1: number, y1: number, x2: number, y2: number) {
            this.visible = true;
            this.x = x1;
            this.y = y1;
            this.alpha = 0;
            createjs.Tween.get(this, { loop: true })
                .to({ alpha: 1 }, 500)
                .to({ x: x2, y: y2 }, 1600, createjs.Ease.quadInOut)
                .to({ alpha: 0 }, 500);
        }

        public hide() {
            createjs.Tween.removeTweens(this);
            this.visible = false;
        }


    }
} 