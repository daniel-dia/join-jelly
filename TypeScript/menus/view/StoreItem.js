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
            var StoreItem = (function (_super) {
                __extends(StoreItem, _super);
                function StoreItem(productId, icon, name, description, price) {
                    _super.call(this);
                    this.productId = productId;
                    // Add Background
                    var bg = gameui.AssetsManager.getBitmap("pediaItem");
                    this.addChild(bg);
                    // Add Icon
                    var j = gameui.AssetsManager.getBitmap(icon);
                    j.x = 332 / 2;
                    j.y = 332;
                    this.addChild(j);
                    // Add Texts
                    var titleObj = gameui.AssetsManager.getBitmapText(name, "debussy");
                    var descriptionObj = gameui.AssetsManager.getBitmapText(description, "debussy");
                    titleObj.y = 30;
                    descriptionObj.y = 130;
                    titleObj.scaleX = titleObj.scaleY = 1.4;
                    titleObj.x = descriptionObj.x = 450;
                    this.addChild(titleObj);
                    this.addChild(descriptionObj);
                    // add price
                    var priceDO = gameui.AssetsManager.getBitmapText(price, "debussy");
                    priceDO.y = 130;
                    priceDO.x = 1000;
                    this.addChild(priceDO);
                    // add purchase buttton
                }
                return StoreItem;
            })(createjs.Container);
            view.StoreItem = StoreItem;
        })(view = menus.view || (menus.view = {}));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=StoreItem.js.map