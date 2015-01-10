﻿module joinjelly.menus {
    export class StoreMenu extends ScrollablePage{
        private previousScreen: gameui.ScreenState;
        private gameFooter: gameplay.view.GameFooter;

        constructor(previousScreen: gameui.ScreenState) {
            super(StringResources.store.title);
            this.previousScreen = previousScreen;

            // add loading info
            var loading = gameui.AssetsManager.getBitmapText(StringResources.menus.loading, "debussy");
            loading.y = 500;
            loading.x = defaultWidth / 2;
            loading.regX = loading.getBounds().width / 2;
            this.scrollableContent.addChild(loading);
            var ball = new joinjelly.view.LoadingBall();
            this.scrollableContent.addChild(ball);
            ball.y = 800;
            ball.x = defaultWidth / 2;

            // request product list
            InAppPurchases.requestProductList((productList: Array<ProductListing>) => {
                this.scrollableContent.removeChild(loading);
                this.scrollableContent.removeChild(ball);
                this.fillProducts(productList);
            })

            // add Footer
            this.gameFooter = new gameplay.view.GameFooter(["time", "clean", "fast", "revive"]);
            this.footer.addChild(this.gameFooter);
            this.gameFooter.mouseEnabled = false;
            this.updateFooter();

            this.content.y -= 200;

            this.okButtonAction = () => { joinjelly.JoinJelly.gameScreen.switchScreen(previousScreen); };

        }

        // add all products in the list
        private fillProducts(productList: Array<ProductListing>) {

            for (var p in productList) {
                var pi = new view.StoreItem(productList[p]);
                this.scrollableContent.addChild(pi);
                pi.y = p * 430 + 430;
                pi.x = 70;

                // executa a compra do app.
                pi.addEventListener("buy", (event: createjs.Event) => {
                    var si: view.StoreItem = <view.StoreItem>event.currentTarget 

                    si.setPurchasing();
                    this.lockUI();

                    this.purchaseProduct(event.target, (sucess: boolean) => { 
                        if (sucess) {
                            si.setPurchased();
                            gameui.AssetsManager.playSound("Interface Sound-11");
                        }
                        this.updateFooter(); 
                        this.unlockUI();
                       
                    });
                });
            }
        }

        // call for product purchasing
        private purchaseProduct(productId: string, callback: (sucess:boolean) => void) {
           
            InAppPurchases.purchaseProductRequest(productId, (productId: string,sucess:boolean) => {
                this.fullFillPurchase(productId);
                InAppPurchases.reportProductFullfillment(productId);
                callback(sucess);
            });
        }

        private lockUI(timeout: number=5000) {
            this.content.mouseEnabled = false;
            setTimeout(() => { this.unlockUI();}, timeout);
        }

        //locks unlocks ui
        private unlockUI() {
            this.content.mouseEnabled = true;
        }

        private updateProductsAvaliability() {
        }

        private fullFillPurchase(productId: string): boolean{

            switch (productId) {
                case "time3x": JoinJelly.itemData.increaseItemAmmount("time", 3); break;
                case "fast3x": JoinJelly.itemData.increaseItemAmmount("fast", 3); break;
                case "clean3x": JoinJelly.itemData.increaseItemAmmount("clean", 3); break;
                case "revive3x": JoinJelly.itemData.increaseItemAmmount("revive", 3); break;
                case "pack3x": 
                    JoinJelly.itemData.increaseItemAmmount("time", 3); 
                    JoinJelly.itemData.increaseItemAmmount("clean", 3); 
                    JoinJelly.itemData.increaseItemAmmount("fast", 3); 
                    JoinJelly.itemData.increaseItemAmmount("revive", 3); 
                    break;
                case "pack9x":
                    JoinJelly.itemData.increaseItemAmmount("clean", 10);
                    JoinJelly.itemData.increaseItemAmmount("fast", 10);
                    JoinJelly.itemData.increaseItemAmmount("time", 10);
                    JoinJelly.itemData.increaseItemAmmount("revive", 10);
                    break;
                case "lucky": JoinJelly.itemData.increaseItemAmmount("lucky", 1);  break;
            }

            return true;
        }

        // update footer
        private updateFooter() {
            var items = ItemsData.items;
            for (var i in items)
                this.gameFooter.setItemAmmount(items[i], JoinJelly.itemData.getItemAmmount(items[i]));
        }
    }
}