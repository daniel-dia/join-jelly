var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    (function (view) {
        var JellyContainer = (function (_super) {
            __extends(JellyContainer, _super);
            function JellyContainer() {
                _super.call(this);
                this.shadowContainer = new createjs.Container();
                this.imageContainer = new createjs.Container();

                this.addChild(this.shadowContainer);
                this.addChild(this.imageContainer);
            }
            //#region animations =============================================
            JellyContainer.prototype.restore = function () {
                createjs.Tween.removeTweens(this.imageContainer);
                createjs.Tween.removeTweens(this.shadowContainer);
                this.visible = true;
                this.imageContainer.scaleX = this.imageContainer.scaleY = 1;
                this.imageContainer.rotation = 0;
                this.imageContainer.alpha = 1;
                this.alpha = 1;
                this.imageContainer.y = 0;
                this.imageContainer.skewX = this.imageContainer.skewY = 0;
                this.shadowContainer.skewX = this.shadowContainer.skewY = 0;
            };

            JellyContainer.prototype.animation1 = function () {
                this.restore();
                createjs.Tween.get(this.imageContainer).to({ skewX: 10 }, 2000, createjs.Ease.elasticOut).to({ skewX: -10 }, 2000, createjs.Ease.getElasticInOut(10, 10)).to({ skewX: 0 }, 2000, createjs.Ease.elasticOut);
            };

            JellyContainer.prototype.executeAnimationIn = function () {
                var _this = this;
                this.restore();
                this.imageContainer.set({
                    alpha: 0,
                    scaleX: 0,
                    scaleY: 0,
                    y: -40
                });

                this.shadowContainer.set({
                    alpha: 0,
                    scaleX: 0
                });

                createjs.Tween.get(this.imageContainer).to({ alpha: 1, scaleX: 0.8, scaleY: 1.2 }, 200, createjs.Ease.sineOut).to({ scaleX: 1, scaleY: 1, y: 0 }, 2000, createjs.Ease.elasticOut);
                createjs.Tween.get(this.shadowContainer).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 400, createjs.Ease.sineOut).call(function () {
                    _this.executeIdle();
                });
                ;
            };

            JellyContainer.prototype.executeAnimationHold = function () {
                this.restore();
                createjs.Tween.get(this.imageContainer).to({
                    scaleX: 0.8,
                    scaleY: 1.2
                }, 1000, createjs.Ease.elasticOut);

                createjs.Tween.get(this.shadowContainer).to({ alpha: 0 }, 200);
            };

            JellyContainer.prototype.executeAimationRelease = function () {
                var _this = this;
                this.restore();
                createjs.Tween.get(this.imageContainer).to({
                    scaleX: 0.8,
                    scaleY: 1.2
                }, 5, createjs.Ease.sineInOut).to({
                    scaleX: 1,
                    scaleY: 1
                }, 2000, createjs.Ease.elasticOut).call(function () {
                    _this.executeIdle();
                });

                createjs.Tween.get(this.shadowContainer).to({ alpha: 1 }, 200);
            };

            JellyContainer.prototype.executeAnimation3 = function () {
                this.restore();
                createjs.Tween.get(this.imageContainer).to({
                    scaleY: 0.7,
                    scaleX: 1.3
                }, 2000, createjs.Ease.elasticOut).to({
                    scaleX: 1,
                    scaleY: 1
                }, 2000, createjs.Ease.elasticOut);
            };

            JellyContainer.prototype.executeAnimation4 = function () {
                this.restore();
                createjs.Tween.get(this.imageContainer).to({
                    scaleX: 0.8,
                    scaleY: 1.2
                }, 200, createjs.Ease.sineOut).to({
                    scaleX: 1,
                    scaleY: 1
                }, 2000, createjs.Ease.elasticOut);
            };

            JellyContainer.prototype.executeIdle = function () {
                switch (Math.floor(Math.random() * 3)) {
                    case 0:
                        this.executeIdle1();
                        break;
                    case 1:
                        this.executeIdle2();
                        break;
                    case 2:
                        this.executeIdle3();
                        break;
                }
            };

            JellyContainer.prototype.executeIdle1 = function () {
                var _this = this;
                var f = Math.random() * 500 + 600;
                var skew = Math.random();
                if (skew < 0.6)
                    skew = skew / 2;

                var scale = Math.random();
                var loop = 4 + Math.floor(Math.random() * 3);

                //if (scale < 0.6) scale = scale / 2;
                scale = scale / 10;

                createjs.Tween.get(this.imageContainer).to({
                    skewX: 0,
                    scaleX: 1 + scale,
                    scaleY: 1 - scale
                }, 400, createjs.Ease.quadInOut).call(function () {
                    createjs.Tween.get(_this.imageContainer, { loop: true }).to({ skewX: skew * 10 }, f, createjs.Ease.quadOut).to({ skewX: skew * 0 }, f, createjs.Ease.quadIn).to({ skewX: skew * -10 }, f, createjs.Ease.quadOut).to({ skewX: skew * 0 }, f, createjs.Ease.quadIn);

                    createjs.Tween.get(_this.imageContainer, { loop: true }).to({ scaleX: 1 - scale, scaleY: 1 + scale }, f, createjs.Ease.quadInOut).to({ scaleX: 1 + scale, scaleY: 1 - scale }, f, createjs.Ease.quadInOut).to({ scaleX: 1 - scale, scaleY: 1 + scale }, f, createjs.Ease.quadInOut).to({ scaleX: 1 + scale, scaleY: 1 - scale }, f, createjs.Ease.quadInOut);
                });

                createjs.Tween.get(this.shadowContainer).to({ alpha: 1, scaleY: 1, scaleX: 1, skewX: 0 }, 400, createjs.Ease.quadInOut).call(function () {
                    createjs.Tween.get(_this.shadowContainer, { loop: true }).to({ skewX: -5 * skew }, f, createjs.Ease.quadOut).to({ skewX: 0 * skew }, f, createjs.Ease.quadIn).to({ skewX: 5 * skew }, f, createjs.Ease.quadOut).to({ skewX: 0 * skew }, f, createjs.Ease.quadIn);
                });
            };

            JellyContainer.prototype.executeIdle2 = function () {
                var _this = this;
                var time = Math.random() * 500 + 600;
                var skew = Math.random();
                if (skew < 0.6)
                    skew = skew / 2;

                var scale = Math.random() * 0.5 + 0.5;
                var loop = 4 + Math.floor(Math.random() * 3);

                //if (scale < 0.6) scale = scale / 2;
                scale = scale / 10;

                createjs.Tween.get(this.imageContainer).to({
                    scaleX: 1,
                    scaleY: 1
                }, 400, createjs.Ease.quadInOut).call(function () {
                    createjs.Tween.get(_this.imageContainer, { loop: true }).to({ scaleX: 1 - scale, scaleY: 1 + scale }, time / 4, createjs.Ease.quadInOut).to({ scaleX: 1 + scale, scaleY: 1 - scale }, time / 4, createjs.Ease.quadInOut).to({ scaleX: 1 - scale, scaleY: 1 + scale }, time / 4, createjs.Ease.quadInOut).to({ scaleX: 1 + scale, scaleY: 1 - scale }, time / 4, createjs.Ease.quadInOut).to({ scaleX: 1, scaleY: 1 }, time * 2, createjs.Ease.elasticOut);
                });
            };

            JellyContainer.prototype.executeIdle3 = function () {
                var _this = this;
                var time = Math.random() * 500 + 600;
                var skew = Math.random();
                if (skew < 0.6)
                    skew = skew / 2;

                var scale = Math.random() * 0.5 + 0.5;
                var loop = 4 + Math.floor(Math.random() * 3);

                scale = scale / 10;

                createjs.Tween.get(this.imageContainer).to({
                    scaleX: 1,
                    scaleY: 1,
                    y: 0
                }, 400, createjs.Ease.quadInOut).call(function () {
                    createjs.Tween.get(_this.imageContainer, { loop: true }).to({ scaleX: 1 + scale * 2, scaleY: 1 - scale * 2, y: 0 }, time / 2, createjs.Ease.quadInOut).to({ scaleX: 1 - scale * 2, scaleY: 1 + scale * 2, y: 0 }, time / 4, createjs.Ease.quadIn).to({ scaleX: 1 + scale * 1, scaleY: 1 - scale * 1, y: -70 }, time / 4, createjs.Ease.quadOut).to({ scaleX: 1 - scale * 2, scaleY: 1 + scale * 2, y: 0 }, time / 5, createjs.Ease.quadIn).to({ scaleX: 1, scaleY: 1 }, time * 2, createjs.Ease.elasticOut);
                });
            };
            return JellyContainer;
        })(createjs.Container);
        view.JellyContainer = JellyContainer;
    })(joinjelly.view || (joinjelly.view = {}));
    var view = joinjelly.view;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=Jellyble.js.map
