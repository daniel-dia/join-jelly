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
            var TutorialMove = (function (_super) {
                __extends(TutorialMove, _super);
                function TutorialMove() {
                    _super.call(this);
                    this.addChild(gameui.AssetsManager.getBitmap("tutorialFinger"));
                    this.regX = 80;
                    this.mouseEnabled = false;
                    this.visible = false;
                }
                TutorialMove.prototype.show = function (x1, y1, x2, y2) {
                    this.visible = true;
                    this.x = x1;
                    this.y = y1;
                    this.alpha = 0;
                    createjs.Tween.get(this, { loop: true }).to({ alpha: 1 }, 500).to({ x: x2, y: y2 }, 1600, createjs.Ease.quadInOut).to({ alpha: 0 }, 500);
                };
                TutorialMove.prototype.hide = function () {
                    createjs.Tween.removeTweens(this);
                    this.visible = false;
                };
                return TutorialMove;
            })(createjs.Container);
            view.TutorialMove = TutorialMove;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=TutorialMove.js.map