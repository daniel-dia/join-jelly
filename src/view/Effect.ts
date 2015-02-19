module joinjelly.view {

    export class Effect extends createjs.Container {

        


        public castSimple() {
            var fxs = <createjs.Bitmap>gameui.ImagesManager.getBitmap("fxJoin");
            fxs.regX = fxs.image.width / 2;
            fxs.regY = fxs.image.height / 2;
            this.addChild(fxs);
            createjs.Tween.get(fxs).to({ scaleX: 2, scaleY: 2, alpha: 0 }, 500, createjs.Ease.linear).call(() => { this.removeChild(fxs) });
        }
 

        public castPart() { 
        
            var fxp = <createjs.Bitmap>gameui.ImagesManager.getBitmap("fxPart");
            fxp.regX = fxp.image.width / 2;
            fxp.regY = fxp.image.height / 2;
            fxp.scaleX  = fxp.scaleY = 0.2;
            fxp.alpha = 2;
            this.addChild(fxp);
            createjs.Tween.get(fxp).to({ scaleX: 1.6, scaleY: 1.6, alpha: 0 }, 500, createjs.Ease.quadOut).call(() => { this.removeChild(fxp) });

            this.castPartS();
        }

        public castPartS() {

            var fxp = <createjs.Bitmap>gameui.ImagesManager.getBitmap("fxPart");
            fxp.regX = fxp.image.width / 2;
            fxp.regY = fxp.image.height / 2;
            fxp.scaleX = fxp.scaleY = 0.4;
            fxp.rotation = 360 / 16;
            fxp.alpha = 2;
            this.addChild(fxp);
            createjs.Tween.get(fxp).to({ scaleX: 2.2, scaleY: 2.2, alpha: 0 }, 500, createjs.Ease.quadOut).call(() => { this.removeChild(fxp) });


        }

        public castBoth() {
            this.castPart();
            this.castSimple();
        }

    }
}