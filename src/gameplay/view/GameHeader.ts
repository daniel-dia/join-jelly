module joinjelly.gameplay.view {
    export class GameHeader extends createjs.Container {

        private scoreText: createjs.BitmapText;
        private levelText: createjs.BitmapText;

        private lastScore: number;
        private lastLevel: number;

        private levelIcon: createjs.DisplayObject;
        private levelBar: createjs.DisplayObject;
        constructor() {
            super();
            this.addObjects();
        }
        
        private addObjects() {
           
            //add pause button
            var pauseButton = new gameui.ImageButton("BtPause", () => {
                this.dispatchEvent("pause");
            });

            pauseButton.x = 157;
            pauseButton.y = 215;
            this.addChild(pauseButton);

            //add levelBar
            var levelBarBorder = gameui.ImagesManager.getBitmap("bonus_border");
            this.addChild(levelBarBorder);
            levelBarBorder.x = 309  ;
            levelBarBorder.y = 122;

            var levelBar = gameui.ImagesManager.getBitmap("bonus_bar");
            levelBar.x = 372;
            levelBar.y = 207;
            levelBar.mask = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0, 0, 939, 57));
            levelBar.mask.x=372;
            levelBar.mask.y = 207;
            this.levelBar = levelBar;
            this.addChild(levelBar);
        

            var levelIcon = gameui.ImagesManager.getBitmap("bonus_icon");
            levelIcon.x = 1288;
            levelIcon.y = 90;
            this.levelIcon = levelIcon;
            this.addChild(levelIcon);
          

            //add scores text
            var score = gameui.ImagesManager.getBitmapText(StringResources.menus.score, "debussy")
            score.x = 323+50;
            score.y = 124 -80+85;
            score.scaleX = score.scaleY = 0.85;
            this.scoreText = score;
            this.addChild(score);

            //add scores text
            var level = gameui.ImagesManager.getBitmapText(StringResources.menus.level, "debussy")
     
            level.x = 1099;
            level.y = 242 -200;
            level.scaleX = level.scaleY = 2;
            this.levelText = level;
            this.addChild(level);

            
        }


        // updates level ad score status
        public updateStatus(score: number,level:number,percent?:number,emptyPercent?:number, alarm?:boolean) {
            this.scoreText.text =StringResources.menus.score.toUpperCase() + " " + score.toString();
            this.levelText.text = level.toString();

            var value = 1;


              //updates percent
            if (percent!=undefined)
                if (score != this.lastScore) {
                    value = percent / 100;
                    createjs.Tween.removeTweens(this.levelBar.mask);
                    createjs.Tween.get(this.levelBar.mask).to({ scaleX:value},1000,createjs.Ease.elasticOut)
                }

            // if level changes. do some animations
            if (this.lastLevel != level) {

                //moves the bar
                createjs.Tween.removeTweens(this.levelBar.mask);
                createjs.Tween.get(this.levelBar.mask).to({ scaleX: 1 }, 100, createjs.Ease.quadIn).call(() => { this.levelBar.mask.scaleX = 0 })

                //increase number
                createjs.Tween.removeTweens(this.levelText);
                createjs.Tween.removeTweens(this.levelIcon);
                this.levelText.set({ scaleY: 0, scaleX: 4 });
                this.levelIcon.set({ scaleY: 0, scaleX: 2 });
                createjs.Tween.get(this.levelText).to({ scaleX: 2, scaleY: 2 }, 1000, createjs.Ease.elasticOut);
                createjs.Tween.get(this.levelIcon).to({ scaleX: 1, scaleY: 1 }, 1000, createjs.Ease.elasticOut);

            }
                       
            this.lastLevel = level;
            this.lastScore = score;
        }

    }
} 