module fpair.gameplay.view {

    export class Jelly extends createjs.Container {
        
        private shadowContainer: createjs.Container;
        private imageContainer: createjs.Container;

        // #region initialization =========================================

        constructor() {
            super();

            this.addObjects();
        }

        private addObjects() {

            //create shadow container
            this.shadowContainer = new createjs.Container();
            
            //create image container
            this.imageContainer = new createjs.Container();
            
            //add to stage
            this.addChild(this.shadowContainer);
            this.addChild(this.imageContainer);

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
        }


            this.executeAnimationIn();
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
                //eye.scaleX = eye.scaleY = img.scaleX;
            eye.y = -50
                this.imageContainer.addChild(eye)
        }

        // #endregion

        //#region animations =============================================
        private restore() {
            createjs.Tween.removeTweens(this.imageContainer);
            createjs.Tween.removeTweens(this.shadowContainer);
            this.imageContainer.scaleX = this.imageContainer.scaleY = 1;
            this.imageContainer.rotation = 0;
            this.imageContainer.alpha = 1;
            this.alpha = 1;
            this.imageContainer.y = 0;
            this.imageContainer.skewX = this.imageContainer.skewY = 0;
            this.shadowContainer.skewX = this.shadowContainer.skewY = 0;
        }

        private animation1() {
            this.restore();
            createjs.Tween.get(this.imageContainer)
                .to({ skewX: 10 }, 2000, createjs.Ease.elasticOut)
                .to({ skewX: -10 }, 2000, createjs.Ease.getElasticInOut(10, 10))
                .to({ skewX: 0 }, 2000, createjs.Ease.elasticOut);
        }

        private executeAnimationIn() {
            this.restore();
            this.imageContainer.set(
                {
                    alpha: 0,
                    scaleX: 0,
                    scaleY: 0,
                    y: -40
                });

            this.shadowContainer.set(
                {
                    alpha: 0,
                    scaleX: 0,
                });

            createjs.Tween.get(this.imageContainer)
                .to({ alpha: 1, scaleX: 0.8, scaleY: 1.2 }, 200, createjs.Ease.sineOut)
                .to({ scaleX: 1, scaleY: 1, y: 0}, 2000, createjs.Ease.elasticOut);
            createjs.Tween.get(this.shadowContainer)
                .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200, createjs.Ease.sineOut).call(() => {
                    this.executeIdle();
                });;


        }

        public executeAnimationHold() {
            this.restore();
            createjs.Tween.get(this.imageContainer)
                .to({
                    scaleX: 0.8,
                    scaleY: 1.2
                }, 1000, createjs.Ease.elasticOut)

        createjs.Tween.get(this.shadowContainer).to({ alpha: 0 }, 200);
        }

        public executeAimationRelease() {
            this.restore();
            createjs.Tween.get(this.imageContainer)
                .to({
                    scaleX: 0.8,
                    scaleY: 1.2
                }, 5, createjs.Ease.sineInOut)
            //.to({ scaleY: 0.7, scaleX: 1.3 }, 200, createjs.Ease.sineInOut)
                .to({
                    scaleX: 1,
                    scaleY: 1
                }, 2000, createjs.Ease.elasticOut).call(() => {
                    this.executeIdle();
                });

            createjs.Tween.get(this.shadowContainer).to({ alpha: 1 }, 200);
        }

        private executeAnimation3() {
            this.restore();
            createjs.Tween.get(this.imageContainer)

                .to({
                    scaleY: 0.7,
                    scaleX: 1.3
                }, 2000, createjs.Ease.elasticOut)
                .to({
                    scaleX: 1,
                    scaleY: 1
                }, 2000, createjs.Ease.elasticOut);
        }

        private executeAnimation4() {
            this.restore();
            createjs.Tween.get(this.imageContainer)
                .to({
                    scaleX: 0.8,
                    scaleY: 1.2
                }, 200, createjs.Ease.sineOut)
                .to({
                    scaleX: 1,
                    scaleY: 1
                }, 2000, createjs.Ease.elasticOut);
        }

        private executeIdle() {

            switch (Math.floor(Math.random() * 3)) {
                case 0: this.executeIdle1(); break;
                case 1: this.executeIdle2(); break;
                case 2: this.executeIdle3(); break;

            }

        }

        private executeIdle1() {

            var f = Math.random() * 500 + 600;
            var skew = Math.random();
            if (skew < 0.6) skew = skew / 2;

            var scale = Math.random();
            var loop = 4 + Math.floor(Math.random() * 3);
            //if (scale < 0.6) scale = scale / 2;
            scale = scale / 10;


            createjs.Tween.get(this.imageContainer).to({
                skewX: 0,
                scaleX: 1 + scale,
                scaleY: 1 - scale
            }, 400, createjs.Ease.quadInOut).call(() => {

                    createjs.Tween.get(this.imageContainer, { loop: true })
                        .to({ skewX: skew * 10 }, f, createjs.Ease.quadOut)
                        .to({ skewX: skew * 0 }, f, createjs.Ease.quadIn)
                        .to({ skewX: skew * -10 }, f, createjs.Ease.quadOut)
                        .to({ skewX: skew * 0 }, f, createjs.Ease.quadIn);

                    createjs.Tween.get(this.imageContainer, { loop: true })
                        .to({ scaleX: 1 - scale, scaleY: 1 + scale }, f, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 + scale, scaleY: 1 - scale }, f, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 - scale, scaleY: 1 + scale }, f, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 + scale, scaleY: 1 - scale }, f, createjs.Ease.quadInOut);
                });



            createjs.Tween.get(this.shadowContainer).to({ alpha: 1, scaleY: 1, scaleX: 1, skewX: 0 }, 400, createjs.Ease.quadInOut).call(() => {

                createjs.Tween.get(this.shadowContainer, { loop: true })
                    .to({ skewX: -5 * skew }, f, createjs.Ease.quadOut)
                    .to({ skewX: 0 * skew }, f, createjs.Ease.quadIn)
                    .to({ skewX: 5 * skew }, f, createjs.Ease.quadOut)
                    .to({ skewX: 0 * skew }, f, createjs.Ease.quadIn);
            });


        }

        private executeIdle2() {

            var time = Math.random() * 500 + 600;
            var skew = Math.random();
            if (skew < 0.6) skew = skew / 2;

            var scale = Math.random() * 0.5 + 0.5;
            var loop = 4 + Math.floor(Math.random() * 3);
            //if (scale < 0.6) scale = scale / 2;
            scale = scale / 10;


            createjs.Tween.get(this.imageContainer).to({
                scaleX: 1,
                scaleY: 1
            }, 400, createjs.Ease.quadInOut).call(() => {

                    createjs.Tween.get(this.imageContainer, { loop: true })
                        .to({ scaleX: 1 - scale, scaleY: 1 + scale }, time / 4, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 + scale, scaleY: 1 - scale }, time / 4, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 - scale, scaleY: 1 + scale }, time / 4, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 + scale, scaleY: 1 - scale }, time / 4, createjs.Ease.quadInOut)
                        .to({ scaleX: 1, scaleY: 1 }, time * 2, createjs.Ease.elasticOut)


            });

        }

        private executeIdle3() {

            var time = Math.random() * 500 + 600;
            var skew = Math.random();
            if (skew < 0.6) skew = skew / 2;

            var scale = Math.random() * 0.5 + 0.5;
            var loop = 4 + Math.floor(Math.random() * 3);

            scale = scale / 10;

            createjs.Tween.get(this.imageContainer).to({
                scaleX: 1,
                scaleY: 1,
                y: 0
            }, 400, createjs.Ease.quadInOut).call(() => {

                    createjs.Tween.get(this.imageContainer, { loop: true })
                        .to({ scaleX: 1 + scale * 2, scaleY: 1 - scale * 2, y: 0 }, time / 2, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 - scale * 2, scaleY: 1 + scale * 2, y: 0}, time / 4, createjs.Ease.quadIn)
                        .to({ scaleX: 1 + scale * 1, scaleY: 1 - scale * 1, y: -70}, time / 4, createjs.Ease.quadOut)
                        .to({ scaleX: 1 - scale * 2, scaleY: 1 + scale * 2, y: 0}, time / 5, createjs.Ease.quadIn)
                        .to({ scaleX: 1, scaleY: 1 }, time * 2, createjs.Ease.elasticOut)
            });
        }
        //#endregion
 

    }
}