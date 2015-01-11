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
            var GameTitle = (function (_super) {
                __extends(GameTitle, _super);
                function GameTitle() {
                    _super.call(this);
                    this.createJoin();
                    this.createJelly();
                }
                GameTitle.prototype.createJoin = function () {
                    var j = new joinjelly.view.JellyContainer();
                    var i = gameui.AssetsManager.getBitmap("t0");
                    j.addChild(i);
                    j.y = 114;
                    j.x = 325;
                    this.addChild(j);
                    j.alpha = 0;
                    j.y = 0;
                    createjs.Tween.get(j).to({ alpha: 1, y: 114 }, 600, createjs.Ease.quadOut);
                };
                GameTitle.prototype.createJelly = function () {
                    var xs = [213, 492, 761, 1039, 1278];
                    for (var l = 1; l <= 5; l++) {
                        var j = new joinjelly.view.JellyContainer();
                        j.visible = false;
                        var x = 0;
                        //setTimeout(() => {
                        j.executeAnimationIn();
                        ///}, l * 200 + 600);
                        var i = gameui.AssetsManager.getBitmap("t" + l);
                        j.imageContainer.addChild(i);
                        this.addChild(j);
                        i.regX = i.getBounds().width / 2;
                        i.regY = i.getBounds().height;
                        j.x = xs[l - 1];
                        j.y = 769;
                    }
                };
                return GameTitle;
            })(createjs.Container);
            view.GameTitle = GameTitle;
        })(view = menus.view || (menus.view = {}));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=Title.js.map