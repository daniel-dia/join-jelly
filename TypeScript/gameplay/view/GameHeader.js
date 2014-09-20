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
                        gameScreen.switchScreen(new fpair.MainScreen(null));
                    });

                    pauseButton.x = 141;
                    pauseButton.y = 190;
                    this.addChild(pauseButton);

                    //add levelBar
                    var levelBarBorder = new createjs.Bitmap("assets/bonus_border.png");
                    this.addChild(levelBarBorder);
                    levelBarBorder.x = 310;
                    levelBarBorder.y = 157;

                    var levelBar = new createjs.Bitmap("assets/bonus_bar.png");
                    this.addChild(levelBar);
                    levelBar.x = 362;
                    levelBar.y = 186;
                    this.levelBar = levelBar;

                    //add scores text
                    var score = new createjs.BitmapText("score", new createjs.SpriteSheet(Deburilfont));

                    //score.textBaseline = "middle";
                    score.x = 333;
                    score.y = 159 - 30;
                    this.scoreText = score;
                    this.addChild(score);

                    //add scores text
                    var level = new createjs.BitmapText("Level: ?????", new createjs.SpriteSheet(Deburilfont));

                    //level.textBaseline = "middle";
                    level.x = 1110;
                    level.y = 277 - 30;
                    level.scaleX = level.scaleY = 2;
                    this.levelText = level;
                    this.addChild(level);
                };

                // updates level ad score status
                GameHeader.prototype.updateStatus = function (score, level, percent) {
                    var _this = this;
                    this.scoreText.text = "SCORE " + score.toString();

                    var value = 1;

                    if (percent != undefined)
                        if (score != this.lastScore) {
                            value = percent / 100;
                            createjs.Tween.removeTweens(this.levelBar);
                            createjs.Tween.get(this.levelBar).to({ scaleX: value }, 1000, createjs.Ease.elasticOut);
                        }

                    if (this.lastLevel != level) {
                        createjs.Tween.removeTweens(this.levelBar);
                        createjs.Tween.get(this.levelBar).to({ scaleX: 1 }, 100, createjs.Ease.quadIn).call(function () {
                            _this.levelBar.scaleX = 0;
                        });
                    }

                    this.levelText.text = level.toString();
                    this.lastLevel = level;
                    this.lastScore = score;
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
