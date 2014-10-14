var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    (function (menus) {
        (function (view) {
            var FlyOutMenu = (function (_super) {
                __extends(FlyOutMenu, _super);
                function FlyOutMenu(title) {
                    _super.call(this);

                    this.regX = this.x = defaultWidth / 2;
                    this.regY = this.y = defaultHeight / 2;

                    this.AddBG();
                    this.addTitle();

                    this.visible = false;
                }
                // creates menu title
                FlyOutMenu.prototype.AddBG = function () {
                    var title = gameui.AssetsManager.getBitmap("FlyBG");
                    title.set({ x: defaultWidth / 2, y: 557, regX: 1305 / 2 });
                    this.addChild(title);
                };

                // creates menu title
                FlyOutMenu.prototype.addTitle = function () {
                    var title = gameui.AssetsManager.getBitmap("FlyBG");
                    title.set({ x: defaultWidth / 2, y: 557, regX: 1305 / 2 });

                    // 1305 1022
                    this.addChild(title);
                };

                // animates menu entrance
                FlyOutMenu.prototype.animateIn = function () {
                    // shows menus
                    this.visible = true;

                    // animate all
                    this.y -= 500;
                    this.alpha = 0;
                    this.scaleX = 0.5;
                    this.scaleY = 2;
                    createjs.Tween.get(this).to({ x: defaultWidth / 2, y: defaultHeight / 2, alpha: 1, scaleX: 1, scaleY: 1 }, 1400, createjs.Ease.elasticInOut);
                    // animate title
                    // animate points
                    // animate last jelly
                    // animate buttons
                };

                FlyOutMenu.prototype.animateOut = function () {
                    var _this = this;
                    // animate all
                    this.alpha = 1;
                    this.scaleX = 1;
                    this.scaleY = 1;
                    createjs.Tween.get(this).to({ alpha: 0, scaleX: 0.5, scaleY: 0.75 }, 200, createjs.Ease.quadIn).call(function () {
                        _this.visible = false;
                    });
                };

                FlyOutMenu.prototype.show = function () {
                    this.animateIn();
                };

                FlyOutMenu.prototype.hide = function () {
                    this.animateOut();
                };
                return FlyOutMenu;
            })(createjs.Container);
            view.FlyOutMenu = FlyOutMenu;
        })(menus.view || (menus.view = {}));
        var view = menus.view;
    })(joinjelly.menus || (joinjelly.menus = {}));
    var menus = joinjelly.menus;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=FlyOutMenu.js.map
