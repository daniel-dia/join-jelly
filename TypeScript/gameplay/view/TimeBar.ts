module joinjelly.gameplay.view {

    export class TimeBar extends createjs.Container {

        private value:number
        private percentBarMask: createjs.Shape;

        private redFx: createjs.DisplayObject;
        private brightFx: createjs.DisplayObject;

        constructor() {
            super();
            this.value = 1;
            this.initializeObjects();
        }

        private initializeObjects() {
             
            var percentBar = new createjs.Container();

            var bar = gameui.AssetsManager.getBitmap("time_bar");
            var bright = gameui.AssetsManager.getBitmap("time_bar_bright");
            var red = gameui.AssetsManager.getBitmap("time_bar_red")
            bright.alpha = 0;

            this.redFx = red;
            this.brightFx = bright;
            createjs.Tween.get(this.redFx, { loop: true }).to({ alpha: 0 }, 500);          

            percentBar.addChild(bar);
            this.addChild(red);
            percentBar.addChild(bright);
             
            this.addChild(percentBar);
             
           
            var shape = new createjs.Shape();
            shape.graphics.beginFill("red").drawRect(0, 0, 991, 35)


            this.percentBarMask = shape;
            percentBar.mask = this.percentBarMask;
        }

        public setPercent(percent: number) {

            //if value is greater, do a animation for increasing
            if (this.value < percent)
                this.incrasePercent();

            this.value = percent;

            // animates the bar
            createjs.Tween.removeTweens(this.percentBarMask);
            createjs.Tween.get(this.percentBarMask).to({ scaleX: percent }, 200, createjs.Ease.quadInOut);

            // set alarm
            if (percent < 0.25)
                this.setAlarmOn();
            else
                this.setAlarmOff();
        }

        // #region animations

        private incrasePercent() {
            this.brightFx.alpha = 1;
            createjs.Tween.get(this.brightFx).to({ alpha: 0 }, 300);
        }

        private setAlarmOn() { this.redFx.visible = true; }

        private setAlarmOff() { this.redFx.visible = false; }

        // #endregion

    }
} 