module joinjelly.menus.view {

    export class ProductListItem extends createjs.Container {


        private purchaseButton: gameui.Button;
        private purchasedIcon: createjs.DisplayObject;
        private loadingIcon: createjs.DisplayObject;

        constructor(productId: string, name: string, description: string, localizedPrice: string) {
            super();


            var tContainer = new createjs.Container();

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
            icon.x = 225;
            icon.y = 188;
            tContainer.addChild(icon);

            // Add Texts

            var titleObj = gameui.AssetsManager.getBitmapText(name, "debussyBig");
            var descriptionObj = gameui.AssetsManager.getBitmapText(description, "debussy");
            titleObj.y = 40;
            descriptionObj.y = 140;
            titleObj.scaleX = titleObj.scaleY = 0.8;
            descriptionObj.scaleX = descriptionObj.scaleY = 0.8;
            titleObj.x = descriptionObj.x = 400;
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
                    this.dispatchEvent({ type: "share", productId: productId });
                });
            } else {
                var button = new gameui.ImageButton("BtStore", () => {
                    this.setPurchasing();
                    this.dispatchEvent({ type: "buy", productId: productId });
                });
            }

            button.y = 152;
            button.x = 1199;
            this.purchaseButton = button;
            this.addChild(button);



            this.addChild(tContainer);
            tContainer.cache(100, 27, 1250, 300);
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

        public setPurchased(timeOut:boolean=false) {
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