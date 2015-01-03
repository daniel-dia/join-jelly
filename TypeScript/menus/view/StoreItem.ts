module joinjelly.menus.view {

    export class StoreItem extends createjs.Container {

        private productId: string;

        constructor(productId:string, icon:string, name:string, description:string,price:string) {
            super();
            this.productId=productId

            // Add Background
            var bg = gameui.AssetsManager.getBitmap("pediaItem")
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
    }
}