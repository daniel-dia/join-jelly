﻿module joinjelly.menus.view {

    export class StoreItem extends createjs.Container {

        private product: ProductListing;

        private purchaseButton: gameui.Button;
        private purchasedIcon:  createjs.DisplayObject;
        private loadingIcon: createjs.DisplayObject;

        constructor(product: ProductListing) {
            super();
            this.product = product

            var tContainer = new createjs.Container();

            // Add Background
            var bg = gameui.ImagesManager.getBitmap("FlyGroup")
            bg.x = 232;
            bg.y = 27;
            bg.scaleY = 1.25;
            bg.scaleX = 0.75;
            tContainer.addChild(bg);

            // Add Icon

            var iconId = "";
            switch (product.ProductId) {
                case "time5x": iconId = "itemtime"; break;
                case "fast5x": iconId = "itemfast"; break;
                case "revive5x": iconId = "itemrevive"; break;
                case "clean5x": iconId = "itemclean"; break;
                case "pack5x": case "pack10x": iconId = "itemPack"; break;
                case "lucky": iconId = "lucky"; break;
            }


            var icon = gameui.ImagesManager.getBitmap(iconId);
            icon.regX = icon.getBounds().width / 2;
            icon.regY = icon.getBounds().height / 2;
            icon.x = 225;
            icon.y = 188;
            icon.scaleX = icon.scaleY = 1.5;
            tContainer.addChild(icon);

            // Add Texts
          
            var titleObj = gameui.ImagesManager.getBitmapText(product.Name, "debussy");
            var descriptionObj = gameui.ImagesManager.getBitmapText(product.Description, "debussy");
            titleObj.y = 40;
            descriptionObj.y = 140;
            titleObj.scaleX = titleObj.scaleY = 1.1;
            descriptionObj.scaleX = descriptionObj.scaleY = 0.8;
            titleObj.x = descriptionObj.x = 400;
            tContainer.addChild(titleObj);
            tContainer.addChild(descriptionObj);



            // add price
            var priceDO = gameui.ImagesManager.getBitmapText(product.FormattedPrice, "debussy");
            priceDO.y = 251;
            priceDO.x = 1199;
            priceDO.regX = priceDO.getBounds().width / 2;
            priceDO.scaleX = priceDO.scaleY = 0.8;
            tContainer.addChild(priceDO);


            this.addChild(tContainer);
            tContainer.cache(100, 27, 1250, 300);

            // add Check
            var unchecked = gameui.ImagesManager.getBitmap("unchecked");
            unchecked.regX = unchecked.getBounds().width / 2;
            unchecked.regY = unchecked.getBounds().height / 2;
            unchecked.y = 152;
            unchecked.x = 1199;
            this.addChild(unchecked);

            // add Check
            var check = gameui.ImagesManager.getBitmap("check");
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
            var button = new gameui.ImageButton("BtStore", () => {
                this.dispatchEvent({ type: "buy", product: this.product.ProductId });
            });
            button.y = 152;
            button.x = 1199;
            this.purchaseButton = button;
            this.addChild(button);

            
        }

        public setPurchasing() {
             this.disable()
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

        public setAvaliable()    { }

        public setPurchased()    {
            this.purchaseButton.fadeOut();
            this.purchasedIcon.visible = true; 
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