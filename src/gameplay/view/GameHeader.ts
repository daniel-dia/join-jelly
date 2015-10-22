module joinjelly.gameplay.view {
    export class GameHeader extends PIXI.Container {

        private scoreText: PIXI.extras.BitmapText;
        private levelText: PIXI.extras.BitmapText;

        private lastScore: number;
        private lastLevel: number;

        public levelIcon: PIXI.DisplayObject;
        private levelBar: PIXI.DisplayObject;
        private levelTip: PIXI.DisplayObject;

        private effect: joinjelly.view.Effect;

        private pauseButton: gameui.UIItem;
        constructor() {
            super();
            this.addObjects();
        }

        private addObjects() {
           
            //add pause button
            var pauseButton = new gameui.ImageButton("BtPause", () => {
                this.dispatchEvent("pause");
            });

            this.pauseButton = pauseButton;
            pauseButton.x = 157;
            pauseButton.y = 215;
            this.addChild(pauseButton);

            //add levelBar
            var levelBarBorder = gameui.AssetsManager.getBitmap("bonus_border");
            this.addChild(levelBarBorder);
            levelBarBorder.x = 309;
            levelBarBorder.y = 122;



            var levelBar = gameui.AssetsManager.getBitmap("bonus_bar");
            levelBar.x = 372;
            levelBar.y = 207;
            levelBar.mask = (new PIXI.Graphics().beginFill(0xFF0000).drawRect(0, 0, 939, 57));
            levelBar.mask.x = 372;
            levelBar.mask.y = 207;
            this.levelBar = levelBar;
            this.addChild(levelBar);

            var levelTip = gameui.AssetsManager.getBitmap("powerTip");
            levelTip.x = 372;
            levelTip.y = 207;
            levelTip.regX = 67 / 2;
            levelTip.regY = 77 / 2;
            this.levelTip = levelTip;
            this.addChild(levelTip);


            var levelIcon = gameui.AssetsManager.getBitmap("bonus_icon");
            levelIcon.x = 1288 + 213 / 2
            levelIcon.y = 90 + 243 / 2
            levelIcon.regX = 213 / 2;
            levelIcon.regY = 243 / 2;
            levelIcon.mouseEnabled = true;
            this.levelIcon = levelIcon;
            this.addChild(levelIcon);
            levelIcon.addEventListener("click", () => { this.levelUpEffect() });

            this.effect = new joinjelly.view.Effect();
            this.addChild(this.effect);
            this.effect.x = 1288 + 213 / 2
            this.effect.y = 90 + 243 / 2

            //add scores text
            var score = gameui.AssetsManager.getBitmapText(StringResources.menus.score, "debussy")
            score.x = 323 + 50;
            score.y = 124 - 80 + 80;
            score.scaleX = score.scaleY = 0.85;
            this.scoreText = score;
            this.addChild(score);

            //add scores text
            var level = gameui.AssetsManager.getBitmapText(StringResources.menus.level, "debussyBig")
            level.x = 1000;
            level.y = 242 - 165;
            this.levelText = level;
            this.addChild(level);


        }

        public hideButtons() {
            this.pauseButton.fadeOut();
        }

        public showButtons() {
            this.pauseButton.fadeIn();
        }

        public hide() {
            createjs.Tween.get(this).to({ y: -425 }, 200, createjs.Ease.quadIn);
        }

        public show() {
            this.visible = true;
            this.alpha = 1;
            createjs.Tween.get(this).to({ y: -0 }, 200, createjs.Ease.quadOut);
        }

        // updates level ad score status
        public updateStatus(score: number, level: number, percent?: number, emptyPercent?: number, alarm?: boolean) {
            this.scoreText.text = StringResources.menus.score.toUpperCase() + " " + score.toString();
            this.levelText.text = "Lv. " + level.toString();

            var value = 1;

           
            //updates percent
            if (percent != undefined)
                if (score != this.lastScore) {
                    value = percent / 100;
                    createjs.Tween.removeTweens(this.levelBar.mask);
                    createjs.Tween.get(this.levelBar.mask).to({ scaleX: value }, 1000, createjs.Ease.elasticOut)

                    createjs.Tween.removeTweens(this.levelTip);
                    createjs.Tween.get(this.levelTip).to({ x: value * 940 + this.levelBar.x, y: this.levelBar.y + 24 }, 1000, createjs.Ease.elasticOut)
                    createjs.Tween.get(this.levelTip).to({ scaleX: 2, scaleY: 2 }).to({ scaleX: 1, scaleY: 1 }, 1000, createjs.Ease.elasticOut)

                }

            // if level changes. do some animations
            if (this.lastLevel != level)
                this.levelUpEffect();

            this.lastLevel = level;
            this.lastScore = score;
        }


        public levelUpEffect() {

            this.effect.castBoth();

            //moves the bar
            createjs.Tween.removeTweens(this.levelBar.mask);
            createjs.Tween.get(this.levelBar.mask).to({ scaleX: 1 }, 100, createjs.Ease.quadIn).call(() => { this.levelBar.mask.scaleX = 0 })
            
            //increase number
            createjs.Tween.removeTweens(this.levelText);
            this.levelText.set({ scaleY: 0, scaleX: 4 });
            createjs.Tween.get(this.levelText).to({ scaleX: 1, scaleY: 1 }, 1000, createjs.Ease.elasticOut);

            //increase Icon
            createjs.Tween.removeTweens(this.levelIcon);
            this.levelIcon.set({ scaleY: 2, scaleX: 0.1 });
            createjs.Tween.get(this.levelIcon).to({ scaleX: 1, scaleY: 1 }, 1000, createjs.Ease.elasticOut);
        }
    }
} 