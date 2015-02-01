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
        var StoreMenu = (function (_super) {
            __extends(StoreMenu, _super);
            function StoreMenu(previousScreen) {
                var _this = this;
                _super.call(this, StringResources.store.title);
                this.previousScreen = previousScreen;
                // add loading info
                var loading = gameui.ImagesManager.getBitmapText(StringResources.menus.loading, "debussy");
                loading.y = 500;
                loading.x = defaultWidth / 2;
                loading.regX = loading.getBounds().width / 2;
                this.scrollableContent.addChild(loading);
                var ball = new joinjelly.view.LoadingBall();
                this.scrollableContent.addChild(ball);
                ball.y = 800;
                ball.x = defaultWidth / 2;
                // request product list
                InAppPurchases.requestProductList(function (productList) {
                    _this.scrollableContent.removeChild(loading);
                    _this.scrollableContent.removeChild(ball);
                    _this.fillProducts(productList);
                });
                // add Footer
                this.gameFooter = new joinjelly.gameplay.view.GameFooter(["time", "clean", "fast", "revive"]);
                this.footer.addChild(this.gameFooter);
                this.gameFooter.mouseEnabled = false;
                this.updateFooter();
                this.content.y -= 200;
                this.okButtonAction = function () {
                    joinjelly.JoinJelly.gameScreen.switchScreen(previousScreen);
                };
            }
            // add all products in the list
            StoreMenu.prototype.fillProducts = function (productList) {
                var _this = this;
                for (var p in productList) {
                    var pi = new menus.view.StoreItem(productList[p]);
                    this.scrollableContent.addChild(pi);
                    pi.y = p * 430 + 430;
                    pi.x = 70;
                    // executa a compra do app.
                    pi.addEventListener("buy", function (event) {
                        var si = event.currentTarget;
                        si.setPurchasing();
                        _this.lockUI();
                        _this.purchaseProduct(event["product"], function (sucess) {
                            if (sucess) {
                                si.setPurchased();
                                gameui.AudioManager.playSound("Interface Sound-11");
                            }
                            _this.updateFooter();
                            _this.unlockUI();
                        });
                    });
                }
            };
            // call for product purchasing
            StoreMenu.prototype.purchaseProduct = function (productId, callback) {
                var _this = this;
                InAppPurchases.purchaseProductRequest(productId, function (productId, sucess) {
                    _this.fullFillPurchase(productId);
                    InAppPurchases.reportProductFullfillment(productId);
                    callback(sucess);
                });
            };
            StoreMenu.prototype.lockUI = function (timeout) {
                var _this = this;
                if (timeout === void 0) { timeout = 5000; }
                this.content.mouseEnabled = false;
                setTimeout(function () {
                    _this.unlockUI();
                }, timeout);
            };
            //locks unlocks ui
            StoreMenu.prototype.unlockUI = function () {
                this.content.mouseEnabled = true;
            };
            StoreMenu.prototype.updateProductsAvaliability = function () {
            };
            StoreMenu.prototype.fullFillPurchase = function (productId) {
                switch (productId) {
                    case "time5x":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("time", 5);
                        break;
                    case "fast5x":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("fast", 5);
                        break;
                    case "clean5x":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("clean", 5);
                        break;
                    case "revive5x":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("revive", 5);
                        break;
                    case "pack5x":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("time", 5);
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("clean", 5);
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("fast", 5);
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("revive", 5);
                        break;
                    case "pack10x":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("clean", 10);
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("fast", 10);
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("time", 10);
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("revive", 10);
                        break;
                    case "lucky":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("lucky", 1);
                        break;
                }
                return true;
            };
            // update footer
            StoreMenu.prototype.updateFooter = function () {
                var items = joinjelly.ItemsData.items;
                for (var i in items)
                    this.gameFooter.setItemAmmount(items[i], joinjelly.JoinJelly.itemData.getItemAmmount(items[i]));
            };
            return StoreMenu;
        })(joinjelly.ScrollablePage);
        menus.StoreMenu = StoreMenu;
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=StoreMenu.js.map