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
            var TimeBar = (function (_super) {
                __extends(TimeBar, _super);
                function TimeBar() {
                    _super.call(this);
                    this.value = 1;
                    this.initializeObjects();
                }
                TimeBar.prototype.initializeObjects = function () {
                    var percentBar = new createjs.Container();

                    var bar = gameui.AssetsManager.getBitmap("time_bar");
                    var bright = gameui.AssetsManager.getBitmap("time_bar_bright");
                    var red = gameui.AssetsManager.getBitmap("time_bar_red");
                    bright.alpha = 0;

                    this.redFx = red;
                    this.brightFx = bright;
                    createjs.Tween.get(this.redFx, { loop: true }).to({ alpha: 0 }, 500);

                    percentBar.addChild(bar);
                    this.addChild(red);
                    percentBar.addChild(bright);

                    this.addChild(percentBar);

                    var shape = new createjs.Shape();
                    shape.graphics.beginFill("red").drawRect(0, 0, 991, 35);

                    this.percentBarMask = shape;
                    percentBar.mask = this.percentBarMask;
                };

                TimeBar.prototype.setPercent = function (percent) {
                    //if value is greater, do a animation for increasing
                    if (this.value < percent)
                        this.incrasePercent();

                    this.value = percent;

                    // animates the bar
                    createjs.Tween.removeTweens(this.percentBarMask);
                    createjs.Tween.get(this.percentBarMask).to({ scaleX: percent }, 200, createjs.Ease.quadInOut);

                    // set alarm
                    if (percent < 0.25)
                        this.setAlarmOn();
                    else
                        this.setAlarmOff();
                };

                // #region animations
                TimeBar.prototype.incrasePercent = function () {
                    this.brightFx.alpha = 1;
                    createjs.Tween.get(this.brightFx).to({ alpha: 0 }, 300);
                };

                TimeBar.prototype.setAlarmOn = function () {
                    this.redFx.visible = true;
                };

                TimeBar.prototype.setAlarmOff = function () {
                    this.redFx.visible = false;
                };
                return TimeBar;
            })(createjs.Container);
            view.TimeBar = TimeBar;
        })(gameplay.view || (gameplay.view = {}));
        var view = gameplay.view;
    })(fpair.gameplay || (fpair.gameplay = {}));
    var gameplay = fpair.gameplay;
})(fpair || (fpair = {}));
//# sourceMappingURL=TimeBar.js.map
