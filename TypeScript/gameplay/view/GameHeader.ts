declare var Deburilfont;

module joinjelly.gameplay.view {
    export class GameHeader extends createjs.Container {

        private scoreText: createjs.BitmapText;
        private levelText: createjs.BitmapText;

        private lastScore: number;
        private lastLevel: number;

        private timebar: TimeBar;

        private levelBar: createjs.DisplayObject;
        constructor() {
            super();
            this.addObjects();
        }
        
        private addObjects() {
            //add background
            var bg = gameui.AssetsManager.getBitmap("assets/header.png");
            this.addChild(bg);
            bg.x = 0;

            //add pause button
            var pauseButton = new gameui.ui.ImageButton("assets/pause.png", () => {
                this.dispatchEvent("pause");
            });

            pauseButton.x = 106;
            pauseButton.y = 219;
            this.addChild(pauseButton);

            //add levelBar
            var levelBarBorder = new createjs.Bitmap("assets/bonus_border.png");
            this.addChild(levelBarBorder);
            levelBarBorder.x = 223  ;
            levelBarBorder.y = 122;

            var levelBar = new createjs.Bitmap("assets/bonus_bar.png");
            this.addChild(levelBar);
            levelBar.x = 282;
            levelBar.y = 151;
            this.levelBar = levelBar;

            //add scores text
            var score = new createjs.BitmapText("score", new createjs.SpriteSheet(Deburilfont));
            //score.textBaseline = "middle";
            score.x = 323;
            score.y = 124 -30;
            this.scoreText = score;
            this.addChild(score);

            //add scores text
            var level = new createjs.BitmapText("Level: ?????", new createjs.SpriteSheet(Deburilfont));
            //level.textBaseline = "middle";
            level.x = 1099;
            level.y = 242 -40;
            level.scaleX = level.scaleY = 2;
            this.levelText = level;
            this.addChild(level);

            //add timebar
            this.timebar = new TimeBar();
            this.addChild(this.timebar);
            this.timebar.x = 281;
            this.timebar.y = 233; 

            ////add effect
            //var fxc = new createjs.Container();
            //var fx = this.AddlevelEffect();
            //this.addChild(fxc);
            //fxc.addChild(fx);
            //fxc.x = 1210;
            //fxc.y = 277 - 130;
            //fx.reset();
            //this.fx = fx;
        }


        // updates level ad score status
        public updateStatus(score: number,level:number,percent?:number,emptyPercent?:number) {
            this.scoreText.text = "SCORE " + score.toString();
            this.levelText.text = level.toString();

            var value = 1;

            //updates timebar
            this.timebar.setPercent(emptyPercent);
            
            //updates percent
            if (percent!=undefined)
                if (score != this.lastScore) {
                    value = percent / 100;
                    createjs.Tween.removeTweens(this.levelBar);
                    createjs.Tween.get(this.levelBar).to({ scaleX:value},1000,createjs.Ease.elasticOut)
                }

            // if level changes. do some animations
            if (this.lastLevel != level) {

                //moves the bar
                createjs.Tween.removeTweens(this.levelBar);
                createjs.Tween.get(this.levelBar).to({ scaleX: 1 }, 100, createjs.Ease.quadIn).call(() => { this.levelBar.scaleX = 0 })

                //increase number
                createjs.Tween.removeTweens(this.levelText);
                this.levelText.scaleY=this.levelText.scaleX = 4;
                createjs.Tween.get(this.levelText).to({ scaleX: 2, scaleY: 2 }, 1000, createjs.Ease.elasticOut);
            }
                       
            this.lastLevel = level;
            this.lastScore = score;
        }

        private AddlevelEffect(): createjs.ParticleEmitter {
            var image = gameui.AssetsManager.getImagesArray()["particle"];
            var emitter = new createjs.ParticleEmitter(image);
            emitter.position = new createjs.Point(0, 0);
            emitter.emitterType = createjs.ParticleEmitterType.OneShot;
            emitter.emissionRate = 40;
            emitter.maxParticles = 40;
            emitter.life = 400;
            emitter.lifeVar = 400;
            emitter.speed = 300;
            emitter.speedVar = 300;
            emitter.positionVarX = 0;
            emitter.positionVarY = 0;
            emitter.accelerationX = 0;
            emitter.accelerationY = 0;
            emitter.radialAcceleration = 0;
            emitter.radialAccelerationVar = 0;
            emitter.tangentalAcceleration = 0;
            emitter.tangentalAccelerationVar = 0;
            emitter.angle = 0;
            emitter.angleVar = 360;
            emitter.startSpin = 0;
            emitter.startSpinVar = 0;
            emitter.endSpin = null;
            emitter.endSpinVar = null;
            emitter.startColor = [255, 255, 255];
            emitter.startColorVar = [0, 0, 0];
            emitter.startOpacity = 1;
            emitter.endColor = null;
            emitter.endColorVar = null;
            emitter.endOpacity = 0; 
            emitter.startSizeVar = 0;
            emitter.endSize = null;
            emitter.endSizeVar = null;
            emitter.startSize = 30;

            return emitter;
        }
    }
} 