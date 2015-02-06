﻿module joinjelly.gameplay.view {
    export class ItemButton extends gameui.Button {

        private text: createjs.BitmapText;
        private addBt: createjs.DisplayObject;
        public item: string;
        public disabled: createjs.DisplayObject;
        public ammount: number = 0;
        private locked: boolean = false;

        constructor(item: string) {
            super();

            this.item = item;
            this.addEventListener("click", () => { this.dispatchEvent({ type: "useitem", item: item }); });

            //create Item
            var bg = gameui.ImagesManager.getBitmap("itemBG");
            var bgd = gameui.ImagesManager.getBitmap("itemBGDisabled");
            var img = gameui.ImagesManager.getBitmap("item" + item);
            var text = gameui.ImagesManager.getBitmapText("0", "debussy");
            var name = gameui.ImagesManager.getBitmapText(StringResources.items[item], "debussymini");
            var add = gameui.ImagesManager.getBitmap("BtPlusMini");
            this.disabled = bgd;

            this.addChild(bg);
            this.addChild(bgd);
            this.addChild(img);
            this.addChild(text);
            this.addChild(name);
            this.addChild(add);


            //organize items
            bgd.visible = false;
            bgd.regX = bg.regX = bg.getBounds().width / 2;
            bgd.regY = bg.regY = bg.getBounds().height / 2;
            img.regX = img.getBounds().width / 2;
            img.regY = img.getBounds().height / 2;
            img.scaleX = img.scaleY = 0.8;
            img.y = -25;
            text.scaleX = text.scaleY = 0.7;
            text.y = -110;
            text.x = -80;
            text.name = 'value';

            name.scaleX = name.scaleY = 0.8;
            name.y = 30;
            name.x = 0;
            name.regX = name.getBounds().width / 2;
            name.name = 'value';

            add.y = 0;
            add.x = 55;

            this.text = text;
            this.createHitArea();
            this.addBt = add;

            this.addEventListener("click", () => { this.unHighlight() });
        }

        public setAmmount(ammount: number) {
            this.ammount = ammount;
            if (this.ammount <= 0) {
                this.disabled.visible = true;
                this.addBt.visible = true;
            }
            else {
                this.disabled.visible = false;
                this.addBt.visible = false;
            }

            this.text.text = ammount.toString();
            this.updateColor();
        }

        public lock() {
            this.mouseEnabled = false;
            this.locked = true;
            this.updateColor();
        }

        public unlock() {
            this.mouseEnabled = true;
            this.locked = false;
            this.updateColor();
        }

        public highLight() {
            createjs.Tween.get(this, { loop: true })
                .to({ rotation: -10, scaleX: 1, scaleY: 1}, 100, createjs.Ease.quadInOut)
                .to({ rotation: +10 ,scaleX:1.3,scaleY:1.3}, 200, createjs.Ease.quadInOut)
                .to({ rotation: -10 ,scaleX:1.3,scaleY:1.3}, 200, createjs.Ease.quadInOut)
                .to({ rotation: +10 ,scaleX:1.3,scaleY:1.3}, 200, createjs.Ease.quadInOut)
                .to({ rotation: 0, scaleX: 1, scaleY: 1}, 100, createjs.Ease.quadInOut).wait(400);
        }

        public unHighlight() {
            createjs.Tween.removeTweens(this);
            this.set({ rotation: 0, scaleX: 1, scaleY: 1 });
        }

        private updateColor() {
            if (this.locked || this.ammount <= 0)
                this.disabled.visible = true;
            else
                this.disabled.visible = false;

        }
    }
}