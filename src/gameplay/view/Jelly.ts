module joinjelly.gameplay.view {

    export class Jelly extends joinjelly.view.JellyContainer {

        private joinFx: createjs.DisplayObject;
        private currentValue: number;
        private eyeImg:createjs.DisplayObject;
        // #region initialization =========================================

        constructor() {
            super();
            this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("black").rect(-115, -230, 230, 230));
            this.joinFx = gameui.ImagesManager.getBitmap("fxJoin");
            this.joinFx.visible = false;
            this.joinFx.regX = 100;
            this.joinFx.regY = 100;
            this.joinFx.y = -115;
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
            this.joinFx.visible = true;
            this.joinFx.set({ scaleX: 0, scaleY: 0, alpha: 1, visible: true });
            this.addChild(this.joinFx);
            createjs.Tween.get(this.joinFx).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 200).call(() => {
                 this.removeChild(this.joinFx);
                 this.joinFx.visible = false;
             });
            

            setTimeout(() => {
                var x = 1;
            }, 1000);
        }

        public playLevelUp() {
            this.joinFx.visible = true;
            this.joinFx.set({ scaleX: 0, scaleY: 0, alpha: 0.6, visible: true });
            this.addChild(this.joinFx);
            createjs.Tween.get(this.joinFx).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 200).call(() => { 
                this.joinFx.visible = false; 
                this.removeChild(this.joinFx);
            });

            setTimeout(() => {
                var x = 1;
            }, 1000);
        }

        /// #endregion


    }
}