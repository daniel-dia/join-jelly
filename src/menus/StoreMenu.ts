module joinjelly.menus {
    export class StoreMenu extends ScrollablePage {
        private previousScreen: gameui.ScreenState;
        private gameFooter: gameplay.view.ItemsFooter;
        private productsListItems: Array<view.ProductListItem>;

        // objects
        private loadingBall: createjs.DisplayObject;
        private StatusText: createjs.BitmapText;

        // initialize object
        constructor(previousScreen: gameui.ScreenState) {
            super(StringResources.store.title);
            this.previousScreen = previousScreen;

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
            this.okButtonAction = () => { joinjelly.JoinJelly.gameScreen.switchScreen(previousScreen); };

            // initialize market
            this.initializeStore();

            // add restore Button
            // add Restore Button
            var restore = new gameui.BitmapTextButton(StringResources.menus.restore, "debussy", "BtTextBg", () => {
                Cocoon.Dialog.confirm({
                    title: StringResources.menus.restore,
                    message: StringResources.menus.restoreWarning
                }, function (accepted) {
                        if (accepted) 
                          Cocoon.Store.restore();
                });
            });
            restore.x = defaultWidth *1/ 3;
            restore.y = defaultHeight - 200;
            this.content.addChild(restore);
         }

        //#region Interface =====================================================================================
        
        // add all products in the list
        private fillProducts(productList: Array<Cocoon.Store.ProductInfo>) {
            var dic ={};
            this.productsListItems = <Array<view.ProductListItem>>dic;
            this.showLoaded();

            for (var p in productList) 
                this.addProduct(productList[p],p);
           
        }

        // add a single product in the list
        private addProduct(product: Cocoon.Store.ProductInfo,p:number) {

            var productListItem = new view.ProductListItem(product.productId, product.title.replace("(Join Jelly)", ""), product.description, product.localizedPrice);
            this.productsListItems[product.productId] = productListItem;
            this.scrollableContent.addChild(productListItem);
            productListItem.y = p * 380 + 380;
            productListItem.x = 70;

            console.log(JSON.stringify(product))

            // add function callback
            productListItem.addEventListener("buy", (event: createjs.Event) => { Cocoon.Store.purchase(event["productId"]);});
            productListItem.addEventListener("share", (event: createjs.Event) => {
                var productObject: view.ProductListItem = <view.ProductListItem>event.currentTarget

                productObject.setPurchasing();
                this.lockUI();

                this.purchaseShareProduct(event["productId"], (sucess: boolean) => {
                    if (sucess) {
                        productObject.setPurchased();
                        gameui.AudiosManager.playSound("Interface Sound-11");
                    } else {
                        productObject.setNormal();
                    }
                    this.updateFooter();
                    this.unlockUI();
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
        private lockUI(timeout: number= 5000) {
            this.content.mouseEnabled = false;
            setTimeout(() => { this.unlockUI(); }, timeout);
        }

        //locks unlocks ui
        private unlockUI() {
            this.content.mouseEnabled = true;
        }

        // update footer
        private updateFooter() {
            var items = ItemsData.items;
            for (var i in items)
                this.gameFooter.setItemAmmount(items[i], JoinJelly.itemData.getItemAmmount(items[i]));
        }

        // reurn a object corresponding to productId
        private getProductListItem(productId): view.ProductListItem {
            return this.productsListItems[productId];
        }

        // animate footer item
        private animateItem(productId: string) {
            switch (productId) {
                case "time5x":   this.gameFooter.bounceItem(Items.TIME  );break;
                case "fast5x":   this.gameFooter.bounceItem(Items.FAST  );break;
                case "clean5x":  this.gameFooter.bounceItem(Items.CLEAN );break;
                case "revive5x": this.gameFooter.bounceItem(Items.REVIVE);break;
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

        //#region market =====================================================================================

        // initialize product listing
        private initializeStore() {
          //  if (!Cocoon.Store.nativeAvailable) return;
            
            // on loaded products
            Cocoon.Store.on("load", {
                started: () => {
                    this.showLoading();
                },
                success: (products: Array<Cocoon.Store.ProductInfo>) => {
                    this.fillProducts(products);
                },
                error: (errorMessage) => {
                    this.showError();
                }
            })

            // on purchasing products
            Cocoon.Store.on("purchase", {
                started: (productId) => {
                    this.getProductListItem(productId).setPurchasing();
                    this.lockUI();
                },
                success: (purchaseInfo) => {
                    
                    this.fullFillPurchase(purchaseInfo.productId);
                    this.updateFooter();
                    this.unlockUI();
                    this.animateItem(purchaseInfo.productId);

                    if (productsData[purchaseInfo.productId].consumable) {
                        this.getProductListItem(purchaseInfo.productId).setPurchased(true);
                        Cocoon.Store.consume(purchaseInfo.transactionId, purchaseInfo.productId);
                    }
                    
                    this.getProductListItem(purchaseInfo.productId).setPurchased();
                     

                    Cocoon.Store.finish(purchaseInfo.transactionId)
                },
                error: (productId, error) => {
                    this.getProductListItem(productId).setNormal();
                    this.unlockUI();
                }
            });
        
            // initialize store
            Cocoon.Store.initialize({sandbox: true, managed: true});

            // load products
            var products = []; 
            for(var p in productsData) products.push(p);
            Cocoon.Store.loadProducts(products);
        }
        
        // call for product purchasing
        private purchaseShareProduct(productId: string, callback: (sucess: boolean) => void) {

            var fb = Cocoon.Social.Facebook;

            //initialize the Facebook Service the same way as the Official JS SDK
            fb.init({ appId: fbAppId });


            var socialService = fb.getSocialInterface();

            // mediaURL, linkURL, linkText, linkCaption
            var message = new Cocoon.Social.Message(
                StringResources.social.shareDescription,
                gameWebsiteIcon,
                gameWebsite,
                StringResources.social.shareTitle,
                StringResources.social.shareCaption);
            var that = this;
            socialService.publishMessageWithDialog(message, function (error) {
                console.log("shared " + JSON.stringify(error))
                var sucess = true;
                if (error) sucess = false;

                if (sucess) {
                    that.fullFillPurchase(productId);
                    //InAppPurchases.reportProductFullfillment(productId);
                }

                callback(sucess);
            });
        }

        // verify product avaliability
        private updateProductsAvaliability() {

        }

        // show that product is consumed
        private fullFillPurchase(productId: string): boolean {

            switch (productId) {
                case "time5x":   JoinJelly.itemData.increaseItemAmmount(Items.TIME  , 5); break;
                case "fast5x":   JoinJelly.itemData.increaseItemAmmount(Items.FAST  , 5); break;
                case "clean5x":  JoinJelly.itemData.increaseItemAmmount(Items.CLEAN , 5); break;
                case "revive5x": JoinJelly.itemData.increaseItemAmmount(Items.REVIVE, 5); break;
                case "pack5x":
                    JoinJelly.itemData.increaseItemAmmount(Items.TIME  , 5);
                    JoinJelly.itemData.increaseItemAmmount(Items.FAST   , 5);
                    JoinJelly.itemData.increaseItemAmmount(Items.CLEAN , 5);
                    JoinJelly.itemData.increaseItemAmmount(Items.REVIVE, 5);
                    break;
                case "pack10x":
                    JoinJelly.itemData.increaseItemAmmount(Items.TIME  , 10);
                    JoinJelly.itemData.increaseItemAmmount(Items.FAST  , 10);
                    JoinJelly.itemData.increaseItemAmmount(Items.CLEAN , 10);
                    JoinJelly.itemData.increaseItemAmmount(Items.REVIVE, 10);
                    break;
                case "lucky": JoinJelly.itemData.increaseItemAmmount(Items.LUCKY, 1); break;
            }

            return true;
        }
        
        //#endregion 


    }
}

