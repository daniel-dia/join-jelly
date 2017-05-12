module joinjelly.view {

    export class Effect extends PIXI.Container {

        public castSimple() {
            var fxs = <PIXI.Sprite>gameui.AssetsManager.getBitmap("fxJoin");
            fxs.regX = 100;
            fxs.regY = 100;
            this.addChild(fxs);
            createjs.Tween.get(fxs).to({ scaleX: 2, scaleY: 2, alpha: 0 }, 500, createjs.Ease.linear).call(() => { this.removeChild(fxs) });
        }

        public castSimpleInv() {
            var fxs = <PIXI.Sprite>gameui.AssetsManager.getBitmap("fxJoin");
            fxs.regX = 100;
            fxs.regY = 100;
            this.addChild(fxs);
            fxs.alpha = 2;
            fxs.scaleX = 2;
            fxs.scaleY = 2;
            createjs.Tween.get(fxs).to({ scaleX: 0.5, scaleY: 0.5, alpha: 2 }, 800, createjs.Ease.linear).call(() => { this.removeChild(fxs) });
        }

        public castPart() {
            var fxp = <PIXI.Sprite>gameui.AssetsManager.getBitmap("fxPart");
            fxp.regX = 140;
            fxp.regY = 140;
            fxp.scaleX = fxp.scaleY = 0.2;
            fxp.alpha = 2;
            this.addChild(fxp);
            createjs.Tween.get(fxp).to({ scaleX: 1.6, scaleY: 1.6, alpha: 0 }, 500, createjs.Ease.quadOut).call(() => { this.removeChild(fxp) });
            this.castParts();
        }

        public castParts() {
            var fxp = <PIXI.Sprite>gameui.AssetsManager.getBitmap("fxPart");
            fxp.regX = 140;
            fxp.regY = 140;
            fxp.scaleX = fxp.scaleY = 0.4;
            fxp.rotation = 360 / 16;
            fxp.alpha = 2;
            this.addChild(fxp);
            createjs.Tween.get(fxp).to({ scaleX: 2.2, scaleY: 2.2, alpha: 0 }, 500, createjs.Ease.quadOut).call(() => { this.removeChild(fxp) });
        }


        public castPartsInv() {
            var fx = <PIXI.Sprite>gameui.AssetsManager.getBitmap("fxPart");
            var src = { regX: 140, regY: 140, scaleX: 4, scaleY: 4, rotation_d: 360 / 16, alpha: 0 }
            var dst = { scaleX: 0.5, scaleY: 0.5, alpha: 2, rotation_d: 0 };
            fx.set(src);
            this.addChild(fx);
            createjs.Tween.get(fx).to(dst, 1000, createjs.Ease.quadIn).call(() => { this.removeChild(fx) });
        }

        public castBoth() {
            this.castPartsInv();
            this.castSimpleInv();
        }

        public castBothInv() {
            this.castSimple();
            this.castParts();
        }

        public castDistroyEffect() {
            var fx1 = <PIXI.Sprite>gameui.AssetsManager.getBitmap("fxPart");
            var src = { regX: 140 + Math.random() * 40, regY: 140 + Math.random() * 40, scaleX: 1, scaleY: 1, rotation_d: 360 / 16, alpha: 4 }
            var dst = { scaleX: 2, scaleY: 2, rotation_d: Math.random() * 360 / 16, alpha: 0 }
            this.addChild(fx1);
            fx1.set(src);
            createjs.Tween.get(fx1).to(dst, 250, createjs.Ease.quadIn).call(() => { this.removeChild(fx1) });

        
            var fx2 = <PIXI.Sprite>gameui.AssetsManager.getBitmap("fxPart");
            var src = { regX: 140 + Math.random() * 40, regY: 140 + Math.random() * 40, scaleX: 1, scaleY: 1, rotation_d: 360 / 16, alpha: 4 }
            var dst = { scaleX: 2, scaleY: 2, rotation_d: Math.random() * 360 / 16, alpha: 0 }
            this.addChild(fx2);
            fx2.set(src);
            createjs.Tween.get(fx2).to(dst, 350, createjs.Ease.quadIn).call(() => { this.removeChild(fx2) });

 
            var fx3 = <PIXI.Sprite>gameui.AssetsManager.getBitmap("fxJoin");
            var src = { regX: 140 , regY: 140 , scaleX: 1, scaleY: 1, rotation_d: 360 / 16, alpha: 3 }
            var dst = { scaleX: 3, scaleY: 0, rotation_d: Math.random() * 360 / 16, alpha: 0 }
            this.addChild(fx3);
            fx3.set(src);
            createjs.Tween.get(fx3).to(dst, 350, createjs.Ease.quadOut).call(() => { this.removeChild(fx3) });

        }

        public castUltimateEffect() {



            var fx = <PIXI.Sprite>gameui.AssetsManager.getBitmap("fxPart");
            var src = { regX: 140 + Math.random() * 40, regY: 140 + Math.random() * 40, scaleX: 1, scaleY: 1, rotation_d: 360 / 16, alpha: 4 }
            var dst = { scaleX: 10, scaleY: 10, rotation_d: Math.random() * 360 / 16, alpha: 0 }
            this.addChild(fx);
            fx.set(src);
            createjs.Tween.get(fx).to(dst, 1000, createjs.Ease.quadIn).call(() => { this.removeChild(fx) });

            var fx = <PIXI.Sprite>gameui.AssetsManager.getBitmap("fxJoin");
            var src = { regX: 140 + Math.random() * 40, regY: 140 + Math.random() * 40, scaleX: 1, scaleY: 1, rotation_d: 360 / 16, alpha: 4 }
            var dst = { scaleX: 10, scaleY: 10, rotation_d: Math.random() * 360 / 16, alpha: 0 }
            this.addChild(fx);
            fx.set(src);
            createjs.Tween.get(fx).to(dst, 1400, createjs.Ease.quadOut).call(() => { this.removeChild(fx) });

            var fx = <PIXI.Sprite>gameui.AssetsManager.getBitmap("fxJoin");
            var src = { regX: 140 -Math.random() * 40, regY: 140 - Math.random() * 40, scaleX: 1, scaleY: 1, rotation_d: 360 / 16, alpha: 4 }
            var dst = { scaleX: 10, scaleY: 10, rotation_d: Math.random() * 360 / 16, alpha: 0 }
            this.addChild(fx);
            fx.set(src);
            createjs.Tween.get(fx).to(dst, 1000, createjs.Ease.quadOut).call(() => { this.removeChild(fx) });
        }

    }
}