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
                function StoreItem(product) {
                    var _this = this;
                    _super.call(this);
                    this.product = product;
                    // Add Background
                    var bg = gameui.AssetsManager.getBitmap("FlyGroup");
                    bg.x = 232;
                    bg.y = 27;
                    bg.scaleY = 1.25;
                    bg.scaleX = 0.75;
                    this.addChild(bg);
                    // Add Icon
                    var iconId = "";
                    switch (product.ProductId) {
                        case "time5x":
                            iconId = "itemtime";
                            break;
                        case "fast5x":
                            iconId = "itemfast";
                            break;
                        case "revive5x":
                            iconId = "itemrevive";
                            break;
                        case "clean5x":
                            iconId = "itemclean";
                            break;
                        case "pack5x":
                        case "pack10x":
                            iconId = "itemPack";
                            break;
                        case "lucky":
                            iconId = "lucky";
                            break;
                    }
                    var icon = gameui.AssetsManager.getBitmap(iconId);
                    icon.regX = icon.getBounds().width / 2;
                    icon.regY = icon.getBounds().height / 2;
                    icon.x = 225;
                    icon.y = 188;
                    icon.scaleX = icon.scaleY = 1.5;
                    this.addChild(icon);
                    // Add Texts
                    var titleObj = gameui.AssetsManager.getBitmapText(product.Name, "debussy");
                    var descriptionObj = gameui.AssetsManager.getBitmapText(product.Description, "debussy");
                    titleObj.y = 40;
                    descriptionObj.y = 140;
                    titleObj.scaleX = titleObj.scaleY = 1.1;
                    descriptionObj.scaleX = descriptionObj.scaleY = 0.8;
                    titleObj.x = descriptionObj.x = 400;
                    this.addChild(titleObj);
                    this.addChild(descriptionObj);
                    // add price
                    var priceDO = gameui.AssetsManager.getBitmapText(product.FormattedPrice, "debussy");
                    priceDO.y = 251;
                    priceDO.x = 1199;
                    priceDO.regX = priceDO.getBounds().width / 2;
                    priceDO.scaleX = priceDO.scaleY = 0.8;
                    this.addChild(priceDO);
                    // add Check
                    var unchecked = gameui.AssetsManager.getBitmap("unchecked");
                    unchecked.regX = unchecked.getBounds().width / 2;
                    unchecked.regY = unchecked.getBounds().height / 2;
                    unchecked.y = 152;
                    unchecked.x = 1199;
                    this.addChild(unchecked);
                    // add Check
                    var check = gameui.AssetsManager.getBitmap("check");
                    check.regX = check.getBounds().width / 2;
                    check.regY = check.getBounds().height / 2;
                    check.y = 152;
                    check.x = 1199;
                    this.purchasedIcon = check;
                    this.addChild(check);
                    // add loading
                    var loading = new joinjelly.view.LoadingBall();
                    loading.y = 152;
                    loading.x = 1199;
                    this.loadingIcon = loading;
                    this.addChild(loading);
                    // add purchase buttton
                    var button = new gameui.ImageButton("StoreBt", function () {
                        _this.dispatchEvent({ type: "buy", product: _this.product.ProductId });
                    });
                    button.y = 152;
                    button.x = 1199;
                    this.purchaseButton = button;
                    this.addChild(button);
                }
                StoreItem.prototype.setPurchasing = function () {
                    this.disable();
                };
                StoreItem.prototype.loading = function () {
                    this.disable();
                    this.loadingIcon.visible = true;
                };
                StoreItem.prototype.setNotAvaliable = function () {
                    this.purchaseButton.fadeOut();
                    this.purchasedIcon.visible = false;
                    this.loadingIcon.visible = false;
                };
                StoreItem.prototype.setAvaliable = function () {
                };
                StoreItem.prototype.setPurchased = function () {
                    this.purchaseButton.fadeOut();
                    this.purchasedIcon.visible = true;
                    this.loadingIcon.visible = false;
                };
                StoreItem.prototype.enable = function () {
                    this.purchaseButton.fadeIn();
                    this.loadingIcon.visible = false;
                };
                StoreItem.prototype.disable = function () {
                    this.purchasedIcon.visible = false;
                    this.purchaseButton.fadeOut();
                };
                return StoreItem;
            })(createjs.Container);
            view.StoreItem = StoreItem;
        })(view = menus.view || (menus.view = {}));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=StoreItem.js.map