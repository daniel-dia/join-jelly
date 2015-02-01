var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    var view;
    (function (view) {
        var LoadingBall = (function (_super) {
            __extends(LoadingBall, _super);
            function LoadingBall() {
                _super.call(this);
                var b = new createjs.Bitmap("assets/images/loadingBall.png");
                this.addChild(b);
                b.regX = 94 / 2;
                b.regY = 94;
                b.y = 94 / 2;
                var f = 600;
                var skew = 1;
                var scale = 0.1;
                createjs.Tween.get(b).to({
                    skewX: 0,
                    scaleX: 1 + scale,
                    scaleY: 1 - scale
                }, 400, createjs.Ease.quadInOut).call(function () {
                    createjs.Tween.get(b, { loop: true }).to({ skewX: skew * 10 }, f, createjs.Ease.quadOut).to({ skewX: skew * 0 }, f, createjs.Ease.quadIn).to({ skewX: skew * -10 }, f, createjs.Ease.quadOut).to({ skewX: skew * 0 }, f, createjs.Ease.quadIn);
                    createjs.Tween.get(b, { loop: true }).to({ scaleX: 1 - scale, scaleY: 1 + scale }, f, createjs.Ease.quadInOut).to({ scaleX: 1 + scale, scaleY: 1 - scale }, f, createjs.Ease.quadInOut).to({ scaleX: 1 - scale, scaleY: 1 + scale }, f, createjs.Ease.quadInOut).to({ scaleX: 1 + scale, scaleY: 1 - scale }, f, createjs.Ease.quadInOut);
                });
            }
            return LoadingBall;
        })(createjs.Container);
        view.LoadingBall = LoadingBall;
    })(view = joinjelly.view || (joinjelly.view = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=LoadingBall.js.map