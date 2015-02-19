module joinjelly.gameplay.view {

    export class Jelly extends joinjelly.view.JellyContainer {

        private ajoinFx: createjs.DisplayObject;
        private effect: joinjelly.view.Effect;
        private currentValue: number;
        private eyeImg:createjs.DisplayObject;
        // #region initialization =========================================

        constructor() {
            super();
            this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("black").rect(-115, -230, 230, 230));
           
            this.effect = new joinjelly.view.Effect();
            this.addChild(this.effect);
            this.effect.scaleX = this.effect.scaleY = 0.7;
            this.effect.x = 0
            this.effect.y = -100; 
         //   this.setChildIndex(this.effect, 0);
        }

        private createJelly(value: number) {
            var img = <createjs.Bitmap>gameui.ImagesManager.getBitmap("j" + value);

            //centralize

            img.regX = img.getBounds().width / 2;
            img.regY = img.getBounds().height;

            var shadow = gameui.ImagesManager.getBitmap("shadow");
            shadow.regY = 45;
            shadow.regX = 108;
            shadow.scaleX = shadow.scaleY = img.getBounds().width / 216;

            this.shadowContainer.addChild(shadow);
            this.imageContainer.addChild(img);
        }

        private createEyes(value: number) {

            //add Eyes
            var eye = new createjs.Container();
            var eyeImg = <createjs.Bitmap>gameui.ImagesManager.getBitmap("e" + value);
            eyeImg.regY = 20;
            createjs.Tween.get(eyeImg, { loop: true }).wait(3000 + Math.random() * 1000).to({ scaleY: 0.2 }, 100).to({ scaleY: 1 }, 100);
            eye.addChild(eyeImg);
            eye.regX = 133 / 2;

            if (eyeImg.getBounds())
                eye.regX = eyeImg.getBounds().width / 2;

            eye.y = Math.min(-50, -eye.getBounds().height);
            this.imageContainer.addChild(eye)
            this.eyeImg = eyeImg;
        }
        
        /// #endregion
    
        // #region behaviour ==============================================

        //set tile number
        public setNumber(value: number) {
            if (value > JoinJelly.maxJelly) value = JoinJelly.maxJelly;

            if (this.currentValue == value) return;
            this.currentValue = value;

            //update image 
            if(this.eyeImg)
            createjs.Tween.removeTweens(this.eyeImg);
            this.imageContainer.removeAllChildren();
            this.shadowContainer.removeAllChildren();

            //if values equals zero, hide the tile
            if (value == 0 || !value) {
                this.visible = false;
            }

            else {
                //enable visibility
                this.visible = true;
                this.alpha = 1;

                this.createJelly(value);
                this.createEyes(value);

                this.executeAnimationIn();

                if (value > 1) this.playJoinFX();
            }
        }

        // #endregion

        // #region Animation ==============================================

        public playJoinFX() {
            this.effect.alpha = 0.5;
            this.effect.castSimple();
        }
 
        public playLevelUp() {
            this.effect.alpha = 0.25;
            this.effect.castSimple();
           
        }

        public playEvolve() {
            this.effect.alpha = 1;
            this.effect.castBoth();

        }

        /// #endregion


    }
}