﻿module joinjelly.gameplay.view {
    export class ItemButton extends gameui.Button {

        private text: createjs.BitmapText;
        private addBt: createjs.DisplayObject;
        public item: string;
        public disabled: createjs.DisplayObject;
        public ammount: number = 0;

        constructor(item: string) {
            super();

            this.item = item;
            this.addEventListener("click", () => { this.dispatchEvent({ type: "useitem", item: item }); });

            //create Item
            var bg = gameui.AssetsManager.getBitmap("itemBG");
            var bgd = gameui.AssetsManager.getBitmap("itemBGDisabled");
            var img = gameui.AssetsManager.getBitmap("item" + item);
            var text = gameui.AssetsManager.getBitmapText("0", "debussy");
            var name = gameui.AssetsManager.getBitmapText(StringResources.items[item], "debussy");
            var add = gameui.AssetsManager.getBitmap("BtPlusMini");
            this.disabled = bgd;

            this.addChild(bg);
            this.addChild(bgd);
            this.addChild(img);
            this.addChild(text);
            this.addChild(name);
            this.addChild(add);
            

            //organize items
            bgd.visible = false;
            bgd.regX =bg.regX= bg.getBounds().width / 2;
            bgd.regY =bg.regY= bg.getBounds().height / 2;
            img.regX = img.getBounds().width / 2 ;
            img.regY = img.getBounds().height / 2 ;
            img.scaleX = img.scaleY = 0.8;
            img.y = -25;
            text.scaleX = text.scaleY = 0.7;
            text.y = -110;
            text.x = -80;
            text.name = 'value';

            name.scaleX = name.scaleY = 0.6;
            name.y = 30;
            name.x = 0;
            name.regX = name.getBounds().width / 2;
            name.name = 'value';

            add.y = 0;
            add.x = 55;

            this.text = text;
            this.createHitArea();
            this.addBt = add;
        }

        public setAmmount(ammout: number) {
            this.ammount = ammout;
            if (ammout <= 0) {
                this.disabled.visible = true;
                this.addBt.visible = true;
            }
            else {
                this.disabled.visible = false;
                this.addBt.visible = false;
            }
            this.text.text = ammout.toString();
        }
    }
}