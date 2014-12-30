module joinjelly.gameplay.view {
    export class ItemButton extends gameui.Button {

        private text: createjs.BitmapText;
        public item: string;

        constructor(item: string) {
            super();

            this.item = item;
            this.addEventListener("click", () => { this.dispatchEvent("useitem", item); });

            //create Item
            var bg = gameui.AssetsManager.getBitmap("itemBG");
            var img = gameui.AssetsManager.getBitmap("item" + item);
            var text = gameui.AssetsManager.getBitmapText("0", "debussy");

            this.addChild(bg);
            this.addChild(img);
            this.addChild(text);

            //organize items
            bg.regX = bg.getBounds().width / 2;
            bg.regY = bg.getBounds().height / 2;
            img.regX = img.getBounds().width / 2;
            img.regY = img.getBounds().height / 2;
            text.scaleX = text.scaleY = 0.7;
            text.y = -90;
            text.x = -85;
            text.name = 'value';

            this.text = text;

        }

        public setAmmount(ammout: number) {
            this.text.text = ammout.toString();
        }
    }
}