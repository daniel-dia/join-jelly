﻿module fpair.view {
    export class Jellyble extends createjs.Container {

        shadowContainer: createjs.Container;
        imageContainer: createjs.Container;

        constructor() {
            super();
            this.shadowContainer = new createjs.Container();
            this.imageContainer = new createjs.Container();

            this.addChild(this.shadowContainer);
            this.addChild(this.imageContainer);
            
        }

        //#region animations =============================================
        restore() {
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

        animation1() {
            this.restore();
            createjs.Tween.get(this.imageContainer)
                .to({ skewX: 10 }, 2000, createjs.Ease.elasticOut)
                .to({ skewX: -10 }, 2000, createjs.Ease.getElasticInOut(10, 10))
                .to({ skewX: 0 }, 2000, createjs.Ease.elasticOut);
        }

        executeAnimationIn() {
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
                .to({ scaleX: 1, scaleY: 1, y: 0 }, 2000, createjs.Ease.elasticOut);
            createjs.Tween.get(this.shadowContainer)
                .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 400, createjs.Ease.sineOut).call(() => {
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

        executeAnimation3() {
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

        executeAnimation4() {
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

        executeIdle() {

            switch (Math.floor(Math.random() * 3)) {
                case 0: this.executeIdle1(); break;
                case 1: this.executeIdle2(); break;
                case 2: this.executeIdle3(); break;

            }

        }

        executeIdle1() {

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

        executeIdle2() {

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

        executeIdle3() {

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
                        .to({ scaleX: 1 - scale * 2, scaleY: 1 + scale * 2, y: 0 }, time / 4, createjs.Ease.quadIn)
                        .to({ scaleX: 1 + scale * 1, scaleY: 1 - scale * 1, y: -70 }, time / 4, createjs.Ease.quadOut)
                        .to({ scaleX: 1 - scale * 2, scaleY: 1 + scale * 2, y: 0 }, time / 5, createjs.Ease.quadIn)
                        .to({ scaleX: 1, scaleY: 1 }, time * 2, createjs.Ease.elasticOut)
            });
        }
        
        //#endregion
 
    }
}