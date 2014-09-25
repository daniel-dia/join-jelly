module fpair.gameplay.view {

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
            var bg = gameui.AssetsManager.getBitmap("footer");
            var border = gameui.AssetsManager.getBitmap("time_border")
            var percentBar = new createjs.Container();

            var bar = gameui.AssetsManager.getBitmap("time_bar");
            var bright = gameui.AssetsManager.getBitmap("time_bar_bright");
            var red = gameui.AssetsManager.getBitmap("time_bar_red")
            bright.alpha = 0;

            this.redFx = red;
            this.brightFx = bright;

            percentBar.addChild(bar);
            percentBar.addChild(red);
            percentBar.addChild(bright);

            this.addChild(bg);
            this.addChild(border);
            this.addChild(percentBar);
            
            bg.x = 96;
            bg.y = -190;
            border.x = 218;
            border.y = -100;
            percentBar.x = 225;
            percentBar.y = -95;

            var shape = new createjs.Shape();
            shape.graphics.beginFill("red").drawRect(0, 0, 1110, 50)
            shape.x = 225;
            shape.y = -95

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
            if (percent < 0.1)
                this.setAlarmOn();
            else
                this.setAlarmOff();
        }

        // #region animations

        private incrasePercent() {
            this.brightFx.alpha = 1;
            createjs.Tween.get(this.brightFx).to({ alpha: 0 }, 300);          
        }

        private setAlarmOn() {
            this.redFx.alpha = 1;
            createjs.Tween.removeTweens(this.redFx);
            createjs.Tween.get(this.brightFx, {loop:true }).to({ alpha: 0 }, 300);          
        }

        private setAlarmOff() {
            createjs.Tween.removeTweens(this.redFx);
            this.redFx.alpha = 0;
            
        }

        // #endregion

    }
} 