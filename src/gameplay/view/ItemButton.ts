module joinjelly.gameplay.view {
    export class ItemButton extends gameui.Button {

        private text: PIXI.extras.BitmapText;
        private addBt: PIXI.DisplayObject;
        public item: string;
        public disabled: PIXI.DisplayObject;
        public ammount: number = 0;
        private locked: boolean = false;

        constructor(item: string) {
            super();

            this.item = item;
            this.addEventListener("click", () => {
                this.emit("useitem", { item: item });
            });

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
            bgd.regX = bg.regX = bg.getBounds().width / 2;
            bgd.regY = bg.regY = bg.getBounds().height / 2;
            img.regX = img.getBounds().width / 2;
            img.regY = img.getBounds().height / 2;
            img.scaleX = img.scaleY = 0.4;
            img.y = -25;
            text.scaleX = text.scaleY = 0.7;
            text.y = -110;
            text.x = -80;
            text.name = 'value';

            name.scaleX = name.scaleY = 0.6;
            name.y = 30;
            name.x = 0;
            name.align = "right";
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

        public highLight(loop: boolean = true) {
            createjs.Tween.get(this, { loop: loop })
                .to({ rotation_d: -10, scaleX: 1, scaleY: 1 }, 100, createjs.Ease.quadInOut)
                .to({ rotation_d: +10, scaleX: 1.3, scaleY: 1.3 }, 200, createjs.Ease.quadInOut)
                .to({ rotation_d: -10, scaleX: 1.3, scaleY: 1.3 }, 200, createjs.Ease.quadInOut)
                .to({ rotation_d: +10, scaleX: 1.3, scaleY: 1.3 }, 200, createjs.Ease.quadInOut)
                .to({ rotation_d: 0, scaleX: 1, scaleY: 1 }, 100, createjs.Ease.quadInOut).wait(400);
        }

        public unHighlight() {
            createjs.Tween.removeTweens(this);
            this.set({ rotation_d: 0, scaleX: 1, scaleY: 1 });
        }

        private updateColor() {
            if (this.locked || this.ammount <= 0)
                this.disabled.visible = true;
            else
                this.disabled.visible = false;

        }
    }
}