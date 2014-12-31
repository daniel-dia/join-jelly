module joinjelly.gameplay.view {
    export class GameFooter extends createjs.Container {

        private items: Array<ItemButton>
        private itemSize:number = 370;

        constructor(items?: Array<string>) {
            super();
            this.items = [];
            this.addObjects();
            this.setItems(items);
        }

        // add all button items
        public setItems(items: Array<string>) {

            // clean all buttons
            this.cleanButtons();

            if (!items) return;

            // add all items
            for (var i in items)
                this.addItem(items[i], i);

            // set button positions
            for (var i in items) {
                //set button position
                this.items[items[i]].y = -150;
                this.items[items[i]].x = (defaultWidth - (items.length - 1) * this.itemSize) / 2 + i * this.itemSize;
            }
        }

        // clean buttons
        public cleanButtons() {
            for (var i in this.items)
                this.removeChild(this.items[i]);
            this.items = [];
        }
        
        // add objects to the footer
        private addObjects() {
            //add background
            var bg = gameui.AssetsManager.getBitmap("footer");
            this.addChild(bg);
            bg.y = -162;
            bg.x = (defaultWidth - 1161) / 2;
        }

        //add a single item button to the footer
        private addItem(item: string, pos: number) {

            //create button
            var bt = new ItemButton(item);
            this.addChild(bt);
            this.items[item] = bt;

            //add event listener
            bt.addEventListener("click", () => { this.dispatchEvent("useitem", item); });

        }

        // get a item display object
        public getItemButton(item: string): createjs.DisplayObject {
            return this.items[item];
        }

        // set item ammount
        public setItemAmmount(item: string, ammount: number) {
            this.items[item].setAmmount(ammount);
        }
    }
} 
