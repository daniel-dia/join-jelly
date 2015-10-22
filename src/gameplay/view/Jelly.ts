module joinjelly.gameplay.view {

    export class Jelly extends joinjelly.view.JellyContainer {

        private ajoinFx: PIXI.DisplayObject;
        private effect: joinjelly.view.Effect;
        private currentValue: number;
        private eyeImg: PIXI.DisplayObject;

        private static jellies = [
            "1",
            "2",
            "4",
            "8",
            "16",
            "32",
            "64",
            "128",
            "256",
            "512",
            "1024",
            "oil",
            "2048",
            "square",
            "4096",
            "8192b",
            "8192",
        ]

        // #region initialization =========================================

        constructor(value?: number) {
            super();

            this.effect = new joinjelly.view.Effect();
            this.addChild(this.effect);
            this.effect.scaleX = this.effect.scaleY = 1.2;
            this.effect.x = 0
            this.effect.y = -100; 
            //   this.setChildIndex(this.effect, 0);

            if (value) this.setNumber(value)
        }

        private getAssetIdByValue(value: number): string {
            if (value < 0) return value.toString();
            return Jelly.jellies[Math.log(value) / Math.log(2)];
        }

        private createJelly(value: number) {
            var img = <PIXI.Sprite>gameui.AssetsManager.getBitmap("j" + this.getAssetIdByValue(value));

            //centralize

            img.regX = img.getBounds().width / 2;
            img.regY = img.getBounds().height;

            var shadow = gameui.AssetsManager.getBitmap("shadow");
            shadow.regY = 45;
            shadow.regX = 108;
            shadow.scaleX = shadow.scaleY = img.getBounds().width / 216;

            this.shadowContainer.addChild(shadow);
            this.imageContainer.addChild(img);
        }

        private createEyes(value: number) {

            //add Eyes
            var eye = new PIXI.Container();
            var eyeImg = <PIXI.Sprite>gameui.AssetsManager.getBitmap("e" + this.getAssetIdByValue(value));
            eyeImg.regY = 20;
            createjs.Tween.get(eyeImg, { loop: true }).wait(3000 + Math.random() * 1000).to({ scaleY: 0.2 }, 100).to({ scaleY: 1 }, 100);
            eye.addChild(eyeImg);
            eye.regX = 133 / 2;

            if (eyeImg.getBounds())
                eye.regX = eyeImg.getBounds().width / 2;

            eye.y = Math.min(-100, -eye.getBounds().height);
            this.imageContainer.addChild(eye)
            this.eyeImg = eyeImg;
        }
        
        /// #endregion
    
        // #region behaviour ==============================================

        //set tile number
        public setNumber(value: number) {
            if (this.currentValue == value) return;
            if (value > JoinJelly.maxJelly) value = JoinJelly.maxJelly;

            if (this.currentValue > 0 && value > 0) {
                this.executeAnimationOut(100);
                setTimeout(() => {
                    this.updateObjects(value);
                    this.executeAnimationIn();
                }, 100);
            }
            else {
                this.updateObjects(value);
                this.executeAnimationIn();
            }
            this.currentValue = value;
         
        }

        public updateObjects(value: number) {

            //update image 
            if (this.eyeImg)
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

        public playUltimateEffect() {
            this.effect.alpha = 1;
            this.effect.castUltimateEffect();
        }

        public playDistroyEffect() {
            this.effect.alpha = 1;
            this.effect.castDistroyEffect();
        }

        public playThunder() {
            setTimeout(() => { this.playEvolve(); }, 10);
            setTimeout(() => { this.playLevelUp(); }, 330);
            setTimeout(() => { this.playEvolve(); }, 660);
            setTimeout(() => { this.playLevelUp(); }, 1000);
            setTimeout(() => { this.playLevelUp(); }, 1100);
        }

        /// #endregion


    }
}