module fpair.gameplay.view {

    export class TimeBar extends createjs.Container {

        private value:number
        private percentBarMask: createjs.Shape;


        constructor() {
            super();
            this.value = 1;
            this.initializeObjects();
        }

        private initializeObjects() {
            var bg = gameui.AssetsManager.getBitmap("footer");
            var border = gameui.AssetsManager.getBitmap("time_border")
            var percentBar = gameui.AssetsManager.getBitmap("time_bar")

            this.addChild(bg);
            this.addChild(border);
            this.addChild(percentBar);
            
            bg.x = 96;
            bg.y = -190;
            border.x = 218;
            border.y = -100;
            percentBar.x = 225;
            percentBar.y = -100;

            var shape = new createjs.Shape();
            shape.graphics.beginFill("red").drawRect(0, 0, 1110, 50)
            shape.x = 225;
            shape.y - 100

            this.percentBarMask = shape;
            percentBar.mask = this.percentBarMask;
        }

        public setPercent(percent: number) {

            //if value is greater, do a animation for increasing
            if (this.value < percent)
                this.incrasePercent();

            createjs.Tween.removeTweens(this.percentBarMask);
            createjs.Tween.get(this.percentBarMask).to({ scaleX: percent }, 200, createjs.Ease.quadInOut);
            

        }

        // #region animations

        private incrasePercent() {

        }

        private setAlarmOn() {

        }

        private setAlarmOff() {

        }

        // #endregion

    }
} 