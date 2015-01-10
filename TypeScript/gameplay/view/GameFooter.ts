﻿module joinjelly.gameplay.view {
    export class GameFooter extends createjs.Container {

        private itemsButtons: Array<ItemButton>
        private lucky: createjs.DisplayObject;
        private itemSize:number = 270;

        constructor(items?: Array<string>) {
            super();
            this.itemsButtons = [];
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
                this.itemsButtons[items[i]].y = -150;
                this.itemsButtons[items[i]].x = (defaultWidth - (items.length - 1) * this.itemSize) / 2 + i * this.itemSize;
            }
        }

        // clean buttons
        public cleanButtons() {
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
            lucky.x =  1285
            this.lucky = lucky;
           // lucky.visible = false;
        }

        //add a single item button to the footer
        private addItem(item: string, pos: number) {

            //create button
            var bt = new ItemButton(item);
            this.addChild(bt);
            this.itemsButtons[item] = bt;

            //add event listener
            bt.addEventListener("click", () => {
                this.dispatchEvent("useitem", item);
            });

        }

        // get a item display object
        public getItemButton(item: string): createjs.DisplayObject {
            return this.itemsButtons[item];
        }

        // set item ammount
        public setItemAmmount(item: string, ammount: number) {
            if(this.itemsButtons[item])
                this.itemsButtons[item].setAmmount(ammount);

            if (item == "lucky")
                this.lucky.visible = (ammount > 0);

        }
    }
} 
