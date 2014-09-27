var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var fpair;
(function (fpair) {
    (function (gameplay) {
        (function (view) {
            var GameHeader = (function (_super) {
                __extends(GameHeader, _super);
                function GameHeader() {
                    _super.call(this);
                    this.addObjects();
                }
                GameHeader.prototype.addObjects = function () {
                    //add background
                    var bg = gameui.AssetsManager.getBitmap("assets/header.png");
                    this.addChild(bg);
                    bg.x = 0;

                    //add pause button
                    var pauseButton = new gameui.ui.ImageButton("assets/pause.png", function () {
                        fpair.FasPair.showMainMenu();
                    });

                    pauseButton.x = 106;
                    pauseButton.y = 219;
                    this.addChild(pauseButton);

                    //add levelBar
                    var levelBarBorder = new createjs.Bitmap("assets/bonus_border.png");
                    this.addChild(levelBarBorder);
                    levelBarBorder.x = 223;
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
                    score.y = 124 - 30;
                    this.scoreText = score;
                    this.addChild(score);

                    //add scores text
                    var level = new createjs.BitmapText("Level: ?????", new createjs.SpriteSheet(Deburilfont));

                    //level.textBaseline = "middle";
                    level.x = 1099;
                    level.y = 242 - 40;
                    level.scaleX = level.scaleY = 2;
                    this.levelText = level;
                    this.addChild(level);

                    //add timebar
                    this.timebar = new view.TimeBar();
                    this.addChild(this.timebar);
                    this.timebar.x = 281;
                    this.timebar.y = 233;

                    //add effect
                    var fxc = new createjs.Container();
                    var fx = this.AddlevelEffect();
                    this.addChild(fxc);
                    fxc.addChild(fx);
                    fxc.x = 1210;
                    fxc.y = 277 - 130;
                    fx.reset();
                    this.fx = fx;
                };

                // updates level ad score status
                GameHeader.prototype.updateStatus = function (score, level, percent, emptyPercent) {
                    var _this = this;
                    this.scoreText.text = "SCORE " + score.toString();
                    this.levelText.text = level.toString();

                    var value = 1;

                    //updates timebar
                    this.timebar.setPercent(emptyPercent);

                    //updates percent
                    if (percent != undefined)
                        if (score != this.lastScore) {
                            value = percent / 100;
                            createjs.Tween.removeTweens(this.levelBar);
                            createjs.Tween.get(this.levelBar).to({ scaleX: value }, 1000, createjs.Ease.elasticOut);
                        }

                    // if level changes. do some animations
                    if (this.lastLevel != level) {
                        //emits particles
                        this.fx.reset();

                        //moves the bar
                        createjs.Tween.removeTweens(this.levelBar);
                        createjs.Tween.get(this.levelBar).to({ scaleX: 1 }, 100, createjs.Ease.quadIn).call(function () {
                            _this.levelBar.scaleX = 0;
                        });

                        //increase number
                        createjs.Tween.removeTweens(this.levelText);
                        this.levelText.scaleY = this.levelText.scaleX = 4;
                        createjs.Tween.get(this.levelText).to({ scaleX: 2, scaleY: 2 }, 1000, createjs.Ease.elasticOut);
                    }

                    this.lastLevel = level;
                    this.lastScore = score;
                };

                GameHeader.prototype.AddlevelEffect = function () {
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
                };
                return GameHeader;
            })(createjs.Container);
            view.GameHeader = GameHeader;
        })(gameplay.view || (gameplay.view = {}));
        var view = gameplay.view;
    })(fpair.gameplay || (fpair.gameplay = {}));
    var gameplay = fpair.gameplay;
})(fpair || (fpair = {}));
//# sourceMappingURL=GameHeader.js.map
