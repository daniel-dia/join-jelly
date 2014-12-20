var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var view;
        (function (view) {
            var GameHeader = (function (_super) {
                __extends(GameHeader, _super);
                function GameHeader() {
                    _super.call(this);
                    this.addObjects();
                }
                GameHeader.prototype.addObjects = function () {
                    var _this = this;
                    //add background
                    var bg = gameui.AssetsManager.getBitmap("header");
                    this.addChild(bg);
                    bg.x = 0;
                    //add pause button
                    var pauseButton = new gameui.ImageButton("pause", function () {
                        _this.dispatchEvent("pause");
                        createjs.Sound.play("Interface Sound-06");
                    });
                    pauseButton.x = 106;
                    pauseButton.y = 219;
                    this.addChild(pauseButton);
                    //add levelBar
                    var levelBarBorder = gameui.AssetsManager.getBitmap("bonus_border");
                    this.addChild(levelBarBorder);
                    levelBarBorder.x = 223;
                    levelBarBorder.y = 122;
                    var levelBar = gameui.AssetsManager.getBitmap("bonus_bar");
                    this.addChild(levelBar);
                    levelBar.x = 282;
                    levelBar.y = 151;
                    this.levelBar = levelBar;
                    //add scores text
                    var score = gameui.AssetsManager.getBitmapText("score", "debussy");
                    //score.textBaseline = "middle";
                    score.x = 323;
                    score.y = 124 - 80;
                    this.scoreText = score;
                    this.addChild(score);
                    //add scores text
                    var level = gameui.AssetsManager.getBitmapText("level", "debussy");
                    //level.textBaseline = "middle";
                    level.x = 1099;
                    level.y = 242 - 200;
                    level.scaleX = level.scaleY = 2;
                    this.levelText = level;
                    this.addChild(level);
                    //add timebar
                    this.timebar = new view.TimeBar();
                    this.addChild(this.timebar);
                    this.timebar.x = 281;
                    this.timebar.y = 233;
                };
                // updates level ad score status
                GameHeader.prototype.updateStatus = function (score, level, percent, emptyPercent, alarm) {
                    var _this = this;
                    this.scoreText.text = "SCORE " + score.toString();
                    this.levelText.text = level.toString();
                    var value = 1;
                    //updates timebar
                    this.timebar.setPercent(emptyPercent, alarm);
                    //updates percent
                    if (percent != undefined)
                        if (score != this.lastScore) {
                            value = percent / 100;
                            createjs.Tween.removeTweens(this.levelBar);
                            createjs.Tween.get(this.levelBar).to({ scaleX: value }, 1000, createjs.Ease.elasticOut);
                        }
                    // if level changes. do some animations
                    if (this.lastLevel != level) {
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
                return GameHeader;
            })(createjs.Container);
            view.GameHeader = GameHeader;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=GameHeader.js.map