var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var view;
        (function (view) {
            var FlyOutMenu = (function (_super) {
                __extends(FlyOutMenu, _super);
                function FlyOutMenu(title, heigth) {
                    if (heigth === void 0) { heigth = 1022; }
                    _super.call(this);
                    this.regX = this.x = defaultWidth / 2;
                    this.regY = this.y = defaultHeight / 2;
                    this.AddBG(heigth);
                    this.addTitle(title);
                    this.visible = false;
                }
                // creates menu background
                FlyOutMenu.prototype.AddBG = function (heigth) {
                    var bg = gameui.AssetsManager.getBitmap("FlyBG");
                    bg.set({ x: defaultWidth / 2, y: 557, regX: 1305 / 2 });
                    bg.scaleY = heigth / 1022;
                    this.addChild(bg);
                    bg.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(-bg.x + bg.regX, -bg.y + bg.regY, defaultWidth, defaultHeight));
                };
                // creates menu title
                FlyOutMenu.prototype.addTitle = function (title) {
                    //create "points" text
                    var tx = gameui.AssetsManager.getBitmapText(title.toUpperCase(), "debussy");
                    tx.set({ x: defaultWidth / 2, y: 600 });
                    this.addChild(tx);
                    // tx.scaleX = tx.scaleY = 2;
                    tx.regX = tx.getBounds().width / 2;
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
                    createjs.Tween.get(this).to({ x: defaultWidth / 2, y: defaultHeight / 2, alpha: 1, scaleX: 1, scaleY: 1 }, 1400, createjs.Ease.elasticOut);
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
                    if (this.visible)
                        return;
                    this.animateIn();
                    gameui.AssetsManager.playSound("Interface Sound-14");
                };
                FlyOutMenu.prototype.hide = function () {
                    if (!this.visible)
                        return;
                    this.animateOut();
                    gameui.AssetsManager.playSound("Interface Sound-15");
                };
                return FlyOutMenu;
            })(createjs.Container);
            view.FlyOutMenu = FlyOutMenu;
        })(view = menus.view || (menus.view = {}));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=FlyOutMenu.js.map