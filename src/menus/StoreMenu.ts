module joinjelly.menus {
    export class StoreMenu extends ScrollablePage {
        private previousScreen: gameui.ScreenState;
        private gameFooter: gameplay.view.ItemsFooter;
        private productsListItems: { [id: string]: ProductListItem; };

        // objects
        private loadingBall: PIXI.DisplayObject;
        private StatusText: PIXI.extras.BitmapText;
        private inAppPurchaseServices: InAppPurchaseServices;


        // initialize object
        constructor(previousScreen: gameui.ScreenState) {

            super(StringResources.store.title);

            this.previousScreen = previousScreen;
            this.inAppPurchaseServices = new InAppPurchaseServices(["time5x", "fast5x", "clean5x", "revive5x", "pack5x", "pack10x", "lucky"]);

            // add loading info
            var statusText = gameui.AssetsManager.getBitmapText(StringResources.menus.loading, "debussy");
            statusText.y = 500;
            statusText.x = defaultWidth / 2;
            statusText.regX = statusText.getBounds().width / 2;
            this.StatusText = statusText;
            this.scrollableContent.addChild(statusText);

            // add loading animation
            var loadingBall = new joinjelly.view.LoadingBall();
            loadingBall.y = 800;
            loadingBall.x = defaultWidth / 2;
            this.loadingBall = loadingBall;
            this.scrollableContent.addChild(loadingBall);

            // add Footer
            this.gameFooter = new gameplay.view.ItemsFooter([Items.TIME, Items.CLEAN, Items.FAST, Items.REVIVE]);
            this.footer.addChild(this.gameFooter);
            this.gameFooter.mouseEnabled = false;
            this.updateFooter();
            this.content.y -= 200;

            // buton to close menu
            this.okButtonAction = () => { joinjelly.JoinJelly.showMainScreen(); };

            // add Restore Button
            this.addRestorePurchasesButton();

            // initialize market
            this.showLoading();
            this.inAppPurchaseServices.onProductsLoaded = (products) => { this.fillProducts(products) }
        }

        // show that product is consumed
        private fullFillPurchase(productId: string) {

            switch (productId) {
                case "time5x": JoinJelly.itemData.increaseItemAmmount(Items.TIME, 5); break;
                case "fast5x": JoinJelly.itemData.increaseItemAmmount(Items.FAST, 5); break;
                case "clean5x": JoinJelly.itemData.increaseItemAmmount(Items.CLEAN, 5); break;
                case "revive5x": JoinJelly.itemData.increaseItemAmmount(Items.REVIVE, 5); break;
                case "pack5x":
                    JoinJelly.itemData.increaseItemAmmount(Items.TIME, 5);
                    JoinJelly.itemData.increaseItemAmmount(Items.FAST, 5);
                    JoinJelly.itemData.increaseItemAmmount(Items.CLEAN, 5);
                    JoinJelly.itemData.increaseItemAmmount(Items.REVIVE, 5);
                    break;
                case "pack10x":
                    JoinJelly.itemData.increaseItemAmmount(Items.TIME, 10);
                    JoinJelly.itemData.increaseItemAmmount(Items.FAST, 10);
                    JoinJelly.itemData.increaseItemAmmount(Items.CLEAN, 10);
                    JoinJelly.itemData.increaseItemAmmount(Items.REVIVE, 10);
                    break;
                case "lucky": JoinJelly.itemData.increaseItemAmmount(Items.LUCKY, 1); break;
            }

            JoinJelly.userData.history("purchased")
        }

        //#region Interface =====================================================================================

        // add restore purchases button
        private addRestorePurchasesButton() {

            var restore = new gameui.BitmapTextButton(StringResources.menus.restore, "debussy", "BtTextBg", () => {
                DeviceServices.confirm({
                    title: StringResources.menus.restore,
                    message: StringResources.menus.restoreWarning
                }, function (accepted) {
                    if (accepted)
                        this.inAppPurchaseServices.restorePurchases();
                });
            });
            restore.x = defaultWidth * 1 / 3;
            restore.y = defaultHeight - 200;
            this.content.addChild(restore);
        }

        // add all products in the list
        private fillProducts(productList: Array<InAppPurchaseServices.ProductInfo>) {
            this.productsListItems = {};
            this.showLoaded();

            for (var p = 0; p < productList.length; p++)
                this.addProduct(productList[p], p);

        }

        // add a single product in the list
        private addProduct(product: InAppPurchaseServices.ProductInfo, p: number) {

            var productListItem = new ProductListItem(product.productId, product.title.replace("(Join Jelly)", ""), product.description, product.localizedPrice);
            this.productsListItems[product.productId] = productListItem;
            this.scrollableContent.addChild(productListItem);
            productListItem.y = p * 380 + 380;
            productListItem.x = 70;

            // add function callback
            productListItem.on("buy", (event: any) => {

                this.lockUI();

                productListItem.setPurchasing();
                var productId = event["productId"]

                this.inAppPurchaseServices.purchaseProduct(event["productId"], 1, (error) => {
                    this.unlockUI();


                    console.log(JSON.stringify(event));

                    if (error) {
                        console.log("Error: " + JSON.stringify(error));
                        productListItem.setNormal()

                    }
                    else {
                        console.log("Successfully purchased");
                        productListItem.setPurchased()
                        this.fullFillPurchase(productId);
                    }
                });
            });

        }

        // show a loading message
        private showLoading() {
            this.StatusText.text = StringResources.menus.loading;
            this.loadingBall.visible = true;
        }

        // show a loading message
        private showLoaded() {
            this.StatusText.visible = false;
            this.loadingBall.visible = false;
        }

        // show a error message in it
        private showError() {
            this.StatusText.text = StringResources.menus.error;
            this.loadingBall.visible = false;
        }

        //lock UI for a time interval
        private lockUI(timeout: number = 5000) {
            this.content.interactiveChildren = false;
            setTimeout(() => { this.unlockUI(); }, timeout);
        }

        //locks unlocks ui
        private unlockUI() {
            this.content.interactiveChildren = true;
        }

        // update footer
        private updateFooter() {
            var items = ItemsData.items;
            for (var i in items)
                this.gameFooter.setItemAmmount(items[i], JoinJelly.itemData.getItemAmmount(items[i]));
        }

        // reurn a object corresponding to productId
        private getProductListItem(productId): ProductListItem {
            return this.productsListItems[productId];
        }

        // animate footer item
        private animateItem(productId: string) {
            switch (productId) {
                case "time5x": this.gameFooter.bounceItem(Items.TIME); break;
                case "fast5x": this.gameFooter.bounceItem(Items.FAST); break;
                case "clean5x": this.gameFooter.bounceItem(Items.CLEAN); break;
                case "revive5x": this.gameFooter.bounceItem(Items.REVIVE); break;
                case "pack5x":
                    this.gameFooter.bounceItem(Items.TIME);
                    this.gameFooter.bounceItem(Items.FAST);
                    this.gameFooter.bounceItem(Items.CLEAN);
                    this.gameFooter.bounceItem(Items.REVIVE);
                    break;
                case "pack10x":
                    this.gameFooter.bounceItem(Items.TIME);
                    this.gameFooter.bounceItem(Items.FAST);
                    this.gameFooter.bounceItem(Items.CLEAN);
                    this.gameFooter.bounceItem(Items.REVIVE);
                    break;

            }
        }

        //#endregion 
    }


    class ProductListItem extends PIXI.Container {


        private purchaseButton: gameui.Button;
        private purchasedIcon: PIXI.DisplayObject;
        private loadingIcon: PIXI.DisplayObject;

        constructor(productId: string, name: string, description: string, localizedPrice: string) {
            super();

            var tContainer = new PIXI.Container();

            // Add Background
            var bg = gameui.AssetsManager.getBitmap("FlyGroup")
            bg.x = 232;
            bg.y = 27;
            bg.scaleY = 1.25;
            bg.scaleX = 0.75;
            tContainer.addChild(bg);

            // Add Icon

            var iconId = "";
            switch (productId) {
                case "time5x": iconId = "itemtime"; break;
                case "fast5x": iconId = "itemfast"; break;
                case "revive5x": iconId = "itemrevive"; break;
                case "evolve5x": iconId = "itemevolve"; break;
                case "clean5x": iconId = "itemclean"; break;
                case "pack5x": case "pack1x": case "pack10x": iconId = "itemPack"; break;
                case "lucky": iconId = "lucky"; break;
                default: iconId = "itemPack";
            }


            var icon = gameui.AssetsManager.getBitmap(iconId);
            icon.regX = icon.getBounds().width / 2;
            icon.regY = icon.getBounds().height / 2;
            icon.scaleX = icon.scaleY = 0.8;
            icon.x = 225;
            icon.y = 188;
            tContainer.addChild(icon);

            // Add Texts
            if (description)
                description = description.replace("  ", "\n");
            description = description.replace(";", "\n");
            var titleObj = gameui.AssetsManager.getBitmapText(name, "debussyBig");
            var descriptionObj = gameui.AssetsManager.getBitmapText(description, "debussy");
            titleObj.y = 40;
            descriptionObj.y = 140;
            titleObj.scaleX = titleObj.scaleY = 0.7;
            descriptionObj.scaleX = descriptionObj.scaleY = 0.8;
            titleObj.x = descriptionObj.x = 360;
            tContainer.addChild(titleObj);
            tContainer.addChild(descriptionObj);

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

            // add price
            var priceDO = gameui.AssetsManager.getBitmapText(localizedPrice, "debussy");
            priceDO.y = 251;
            priceDO.x = 1199;
            priceDO.regX = priceDO.getBounds().width / 2;
            priceDO.scaleX = priceDO.scaleY = 0.8;
            if (localizedPrice != "share") tContainer.addChild(priceDO);


            // special button for sharing
            // add purchase buttton
            if (localizedPrice == "share") {
                var button = new gameui.ImageButton("BtShare", () => {
                    this.setPurchasing();
                    this.dispatchEvent("share", { productId: productId });
                });
            } else {
                var button = new gameui.ImageButton("BtStore", () => {
                    this.emit("buy", { productId: productId })
                });
            }

            button.y = 152;
            button.x = 1199;
            this.purchaseButton = button;
            this.addChild(button);

            this.addChild(tContainer);
            ///tContainer.cache(100, 27, 1250, 300);
        }

        public setPurchasing() {
            this.disable()
            this.loadingIcon.visible = true;
        }

        public loading() {
            this.disable();
            this.loadingIcon.visible = true;
        }

        public setNotAvaliable() {
            this.purchaseButton.fadeOut();
            this.purchasedIcon.visible = false;
            this.loadingIcon.visible = false;
        }

        public setAvaliable() { }

        public setPurchased(timeOut: boolean = false) {
            this.purchaseButton.fadeOut();
            this.purchasedIcon.visible = true;
            this.loadingIcon.visible = false;
            gameui.AudiosManager.playSound("Interface Sound-11");
            if (timeOut) setTimeout(() => { this.setNormal(); }, 1000);
        }

        public setNormal() {
            this.purchaseButton.fadeIn();
            this.purchasedIcon.visible = false;
            this.loadingIcon.visible = false;
        }

        public enable() {
            this.purchaseButton.fadeIn();
            this.loadingIcon.visible = false;
        }

        public disable() {
            this.purchasedIcon.visible = false;
            this.purchaseButton.fadeOut();
        }

    }


}

