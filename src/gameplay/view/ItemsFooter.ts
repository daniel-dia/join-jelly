module joinjelly.gameplay.view {
    export class ItemsFooter extends PIXI.Container {

        private itemsButtons: Array<ItemButton>
        private lucky: PIXI.DisplayObject;
        private itemSize: number = 270;
        private gameMessage: view.TutoralMessage;
        private text: PIXI.DisplayObject;

        constructor(items?: Array<string>) {
            super();
            this.itemsButtons = [];
            this.addObjects();
            this.setItems(items);

        }

        // add all button items
        public setItems(items: Array<string>) {
            var itemSize = this.itemSize;
            if (items.length >= 5)
                itemSize = 200;
            // clean all buttons
            this.cleanButtons();

            if (!items) return;

            // add all items
            for (var i = 0; i < items.length; i++)
                this.addItem(items[i], i);

            // set button positions
            for (var i = 0; i < items.length; i++){
                //set button position
                this.itemsButtons[items[i]].y = -150;
                this.itemsButtons[items[i]].x = (defaultWidth - (items.length - 1) * itemSize) / 2 + i * itemSize;
            }
        }

        public showContinue(price: number) {

            // set footer items form revive
            this.setItems([Items.REVIVE]);
            this.unlockItem(Items.REVIVE);
            this.highlight(Items.REVIVE);

            this.text = gameui.AssetsManager.getBitmapText("x" + price, "debussyBig");
            this.addChild(this.text);
            this.text.y = -200;
            this.text.x = defaultWidth/2 + 150;

        }

        // clean buttons
        public cleanButtons() {
            if (this.text) this.removeChild(this.text);

            for (var i in this.itemsButtons)
                this.removeChild(this.itemsButtons[i]);
            this.itemsButtons = [];
        }
        
        // add objects to the footer
        private addObjects() {
            //add background
            var bg = gameui.AssetsManager.getBitmap("footer");
            this.addChild(bg);
            bg.y = -162;
            bg.x = (defaultWidth - 1161) / 2;

            // add Lucky clover
            // TODO verify with item
            var lucky = gameui.AssetsManager.getBitmap("lucky");
            this.addChild(lucky);
            lucky.y = -210;
            lucky.x = (defaultWidth - 250)
            lucky.scaleX = lucky.scaleY = 0.5;
            this.lucky = lucky;

            this.gameMessage = new view.TutoralMessage();
            this.addChild(this.gameMessage);
        }

        //add a single item button to the footer
        private addItem(item: string, pos: number) {

            //create button
            var bt = new ItemButton(item);
            this.addChild(bt);
            this.itemsButtons[item] = bt;

            //add event listener
            bt.addEventListener("click", () => {this.emit("useitem", { item: item });});
            bt.addEventListener("tap", () => {this.emit("useitem", { item: item });});

        }

        // get a item display object
        public getItemButton(item: string): ItemButton {
            return this.itemsButtons[item];
        }

        // set item ammount
        public setItemAmmount(item: string, ammount: number) {
            if (this.itemsButtons[item])
                this.itemsButtons[item].setAmmount(ammount);

            if (item == "lucky")
                this.lucky.visible = (ammount > 0);

        }

        // show item message
        public showMessage(itemId: string, message: string) {
            this.gameMessage.x = this.getItemButton(itemId).x;
            this.gameMessage.y = this.getItemButton(itemId).y - 120;
            this.gameMessage.show(message);
        }

        // hide message
        public hideMessage() {
            this.gameMessage.fadeOut();
        }

        // bounces an item
        public bounceItem(item: string) {
            this.getItemButton(item).highLight(false);
        }

        // bounces an item
        public highlight(item: string) {
            this.unHighlightAll();
            this.getItemButton(item).highLight();
        }

        // stop bouncing an item
        public unHighlightAll() {
            for (var i in this.itemsButtons)
                this.itemsButtons[i].unHighlight();
        }

        // lock an item
        public lockItem(itemId: string) {
            var b = this.getItemButton(itemId);
            if (b) b.lock();
        }

        //unlock an item
        public unlockItem(itemId: string) {
            var b = this.getItemButton(itemId);
            b.unlock();
        }

        public lockAll() {
            for (var b in this.itemsButtons)
                this.itemsButtons[b].lock();
        }

        public unlockAll() {
            for (var b in this.itemsButtons)
                this.itemsButtons[b].unlock();
        }
    }
} 
