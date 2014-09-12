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
            var LevelIndicator = (function (_super) {
                __extends(LevelIndicator, _super);
                function LevelIndicator() {
                    _super.apply(this, arguments);
                }
                LevelIndicator.prototype.showLevel = function (levelId) {
                    var text = new createjs.BitmapText("Level: ?????", new createjs.SpriteSheet(Chubbyfont));
                    this.addChild(text);

                    //text.textAlign = "center";
                    text.text = "LEVEL " + levelId;
                    text.x = defaultWidth / 2;
                    text.y = defaultHeigth / 2 + 200;
                    text.alpha = 0;

                    text.regX = text.getBounds().width / 2;

                    createjs.Tween.get(text).to({ y: defaultHeigth / 2, alpha: 1 }, 200, createjs.Ease.quadOut).wait(500).to({ y: defaultHeigth / 2 - 200, alpha: 0 }, 200, createjs.Ease.quadIn);
                };
                return LevelIndicator;
            })(createjs.Container);
            view.LevelIndicator = LevelIndicator;
        })(gameplay.view || (gameplay.view = {}));
        var view = gameplay.view;
    })(fpair.gameplay || (fpair.gameplay = {}));
    var gameplay = fpair.gameplay;
})(fpair || (fpair = {}));
//# sourceMappingURL=LevelIndicator.js.map
