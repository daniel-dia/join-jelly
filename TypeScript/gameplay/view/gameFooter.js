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
            var GameFooter = (function (_super) {
                __extends(GameFooter, _super);
                function GameFooter(items) {
                    _super.call(this);
                    this.addObjects();
                    for (var i in items)
                        this.addItem(items[i], i);
                }
                GameFooter.prototype.addObjects = function () {
                    //add background
                    var bg = gameui.AssetsManager.getBitmap("footer");
                    this.addChild(bg);
                    bg.y = -162;
                    bg.x = (defaultWidth - 1161) / 2;
                };
                GameFooter.prototype.addItem = function (item, pos) {
                    var _this = this;
                    var itemDO = new gameui.ImageButton("item" + item, function () {
                        _this.dispatchEvent("useitem", item);
                    });
                    this.addChild(itemDO);
                    itemDO.y = -150;
                    itemDO.x = 300 * pos + 300;
                };
                return GameFooter;
            })(createjs.Container);
            view.GameFooter = GameFooter;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=GameFooter.js.map