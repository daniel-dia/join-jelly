module joinjelly.view {

    export class Effect extends createjs.Container {

        


        public castSimple() {
            var fxs = <createjs.Bitmap>gameui.AssetsManager.getBitmap("fxJoin");
            fxs.regX = 100;
            fxs.regY = 100;
            this.addChild(fxs);
            createjs.Tween.get(fxs).to({ scaleX: 2, scaleY: 2, alpha: 0 }, 500, createjs.Ease.linear).call(() => { this.removeChild(fxs) });
        } 
        
        public castSimpleInv() {
            var fxs = <createjs.Bitmap>gameui.AssetsManager.getBitmap("fxJoin");
            fxs.regX = 100;
            fxs.regY = 100;
            this.addChild(fxs);
            fxs.scaleX = fxs.scaleX = fxs.alpha = 2;
            createjs.Tween.get(fxs).to({ scaleX: 0.5, scaleY: 0.5, alpha: 2 }, 800, createjs.Ease.linear).call(() => { this.removeChild(fxs) });
        }
 

        public castPart() { 
        
            var fxp = <createjs.Bitmap>gameui.AssetsManager.getBitmap("fxPart");
            fxp.regX = 140;
            fxp.regY = 140;
            fxp.scaleX  = fxp.scaleY = 0.2;
            fxp.alpha = 2;
            this.addChild(fxp);
            createjs.Tween.get(fxp).to({ scaleX: 1.6, scaleY: 1.6, alpha: 0 }, 500, createjs.Ease.quadOut).call(() => { this.removeChild(fxp) });

            this.castParts();
        }

        public castParts() {

            var fxp = <createjs.Bitmap>gameui.AssetsManager.getBitmap("fxPart");
            fxp.regX = 140;
            fxp.regY = 140;
            fxp.scaleX = fxp.scaleY = 0.4;
            fxp.rotation = 360 / 16;
            fxp.alpha = 2;
            this.addChild(fxp);
            createjs.Tween.get(fxp).to({ scaleX: 2.2, scaleY: 2.2, alpha: 0 }, 500, createjs.Ease.quadOut).call(() => { this.removeChild(fxp) });


        }


        public castPartsInv() {

            var fxp = <createjs.Bitmap>gameui.AssetsManager.getBitmap("fxPart");
            fxp.regX = 140;
            fxp.regY = 140;
            fxp.scaleX = fxp.scaleY = 4;
            fxp.rotation = 360 / 16;
            fxp.alpha = 0;
            this.addChild(fxp);
            createjs.Tween.get(fxp).to({ scaleX: 0.5, scaleY: 0.5, alpha: 2 ,rotation:0}, 1000, createjs.Ease.quadIn).call(() => { this.removeChild(fxp) });


        }

        public castBoth() {
            this.castPartsInv();
            this.castSimpleInv();
        }

    }
}