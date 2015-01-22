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
                    this.fingerUp = gameui.AssetsManager.getBitmap("tutorialFinger");
                    this.fingerDown = gameui.AssetsManager.getBitmap("tutorialFingerDown");
                    this.addChild(this.fingerUp);
                    this.addChild(this.fingerDown);
                    this.fingerDown.y = this.fingerUp.image.height - this.fingerDown.image.height;
                    this.regX = 80;
                    this.mouseEnabled = false;
                    this.visible = false;
                }
                TutorialMove.prototype.showMove = function (x1, y1, x2, y2) {
                    var _this = this;
                    this.visible = true;
                    this.x = x1;
                    this.y = y1;
                    this.alpha = 0;
                    this.fu();
                    createjs.Tween.removeTweens(this);
                    createjs.Tween.get(this, { loop: true }).to({ alpha: 1 }, 500).call(function () {
                        _this.fd();
                    }).to({ x: x2, y: y2 }, 1600, createjs.Ease.quadInOut).call(function () {
                        _this.fu();
                    }).to({ alpha: 0 }, 500);
                };
                TutorialMove.prototype.showClick = function (x1, y1) {
                    var _this = this;
                    this.visible = true;
                    this.x = x1;
                    this.y = y1;
                    this.alpha = 1;
                    this.fu();
                    createjs.Tween.removeTweens(this);
                    createjs.Tween.get(this, { loop: true }).wait(500).call(function () {
                        _this.fd();
                    }).wait(1000).call(function () {
                        _this.fu();
                    });
                };
                TutorialMove.prototype.fd = function () {
                    this.fingerDown.visible = true;
                    this.fingerUp.visible = false;
                };
                TutorialMove.prototype.fu = function () {
                    this.fingerDown.visible = false;
                    this.fingerUp.visible = true;
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