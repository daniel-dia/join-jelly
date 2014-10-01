module fpair.gameplay.view {

    export class Jelly extends fpair.view.Jellyble{
        
        // #region initialization =========================================

        constructor() {
            super();
        }


        /// #endregion

        // #region behaviour ==============================================

        //set tile number

        public setNumber(value: number) {

            //update image 
            this.imageContainer.removeAllChildren();
            this.shadowContainer.removeAllChildren();

            //if values equals zero, hide the tile
            if (value == 0) {
                this.mouseEnabled = false;
                this.shadowContainer.visible = false;
            }

            else {

                //enable mouse and visibility
                this.mouseEnabled = true;
                this.shadowContainer.visible = true;
                
                this.visible = true;
                this.alpha = 1;
                
                this.createJelly(value);
                this.createEyes(value);

                this.executeAnimationIn();
            }
        }

        private createJelly(value: number) {
            var img = new createjs.Bitmap("assets/j" + value + ".png");

            //centralize
            img.image.onload = () => {
                img.regX = img.image.width / 2;
                img.regY = img.image.height;


                var shadow = gameui.AssetsManager.getBitmap("shadow");
                shadow.regY = 45;
                shadow.regX = 108;
                shadow.scaleX = shadow.scaleY = img.image.width / 216;
                this.shadowContainer.addChild(shadow);

            };

            this.imageContainer.addChild(img);
        }
        private createEyes(value: number) {

            //add Eyes
            var eye = new createjs.Container();
            var eyeImg = new createjs.Bitmap("assets/e" + value + ".png");
            eyeImg.regY = 20;
            createjs.Tween.get(eyeImg, { loop: true }).wait(3000 + Math.random() * 1000).to({ scaleY: 0.2 }, 100).to({ scaleY: 1 }, 100);
            eye.addChild(eyeImg);
            eye.regX = 133 / 2;
            eyeImg.image.onload = () => {
                eye.regX = eyeImg.image.width / 2;
            }
            eye.y = -50
                this.imageContainer.addChild(eye)
        }

        // #endregion



    }
}