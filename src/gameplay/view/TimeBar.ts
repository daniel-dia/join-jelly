module joinjelly.gameplay.view {

    export class TimeBar extends PIXI.Container {

        private value: number
        private percentBarMask: PIXI.Graphics;

        private redFx: PIXI.DisplayObject;
        private brightFx: PIXI.DisplayObject;

        constructor() {
            super();
            this.value = 1;
            this.initializeObjects();
        }

        private initializeObjects() {

            var percentBar = new PIXI.Container();

            var bar = gameui.AssetsManager.getBitmap("time_bar");
            var bright = gameui.AssetsManager.getBitmap("time_bar_bright");
            var red = gameui.AssetsManager.getBitmap("time_bar_red")
            bright.alpha = 0;

            this.redFx = red;
            this.brightFx = bright;
            createjs.Tween.get(this.redFx, { loop: true }).to({ alpha: 0 }, 500);

            percentBar.addChild(bar);
            percentBar.addChild(bright);
            percentBar.addChild(red);

            this.addChild(percentBar);


            //var shape = new PIXI.Graphics().beginFill(0xFF0000, 1).drawRect(0, 0, 991, 35).endFill();
            //shape.position = percentBar.position;
            //this.addChild(shape);
            //this.percentBarMask = shape;
            //percentBar.mask = this.percentBarMask;
        }

        public setPercent(percent: number, alarm?: boolean) {

            //if value is greater, do a animation for increasing
            if (this.value < percent)
                this.incrasePercentEffect();

            this.value = percent;

            // animates the bar
            createjs.Tween.removeTweens(this.percentBarMask);
            createjs.Tween.get(this.percentBarMask).to({ scaleX: percent }, 200, createjs.Ease.quadInOut);

            // set alarm
            if (alarm)
                this.setAlarmOn();
            else
                this.setAlarmOff();
        }

        // #region animations

        private incrasePercentEffect() {
            createjs.Tween.get(this.brightFx).to({ alpha:1}).to({ alpha: 0 }, 300);
        }

        private setAlarmOn() { this.redFx.visible = true; }

        private setAlarmOff() { this.redFx.visible = false; }

        // #endregion

    }
} 