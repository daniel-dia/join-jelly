module joinjelly.view {
    export class LoadingBall extends createjs.Container {

        constructor() {

            super();

            var b = gameui.AssetsManager.getBitmap("loadingBall");
            this.addChild(b);
            b.regX = 94/2;
            b.regY = 94;
            b.y = 94 / 2;

            var f =  600;
            var skew = 1;
            var scale = 0.1;
     
            createjs.Tween.get(b).to({
                skewX: 0,
                scaleX: 1 + scale,
                scaleY: 1 - scale
            }, 400, createjs.Ease.quadInOut).call(() => {

                    createjs.Tween.get(b, { loop: true })
                        .to({ skewX: skew * 10 }, f, createjs.Ease.quadOut)
                        .to({ skewX: skew * 0 }, f, createjs.Ease.quadIn)
                        .to({ skewX: skew * -10 }, f, createjs.Ease.quadOut)
                        .to({ skewX: skew * 0 }, f, createjs.Ease.quadIn);

                    createjs.Tween.get(b, { loop: true })
                        .to({ scaleX: 1 - scale, scaleY: 1 + scale }, f, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 + scale, scaleY: 1 - scale }, f, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 - scale, scaleY: 1 + scale }, f, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 + scale, scaleY: 1 - scale }, f, createjs.Ease.quadInOut);
                });


        }

    }
}