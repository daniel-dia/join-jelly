module joinjelly.gameplay.view {
    export class GameFooter extends createjs.Container {


        constructor(items: Array<string>) {
            super();
            this.addObjects();

            for (var i in items)
                this.addItem(items[i],i);
        }

        private addObjects() {
            //add background
            var bg = gameui.AssetsManager.getBitmap("footer");
            this.addChild(bg);
            bg.y = -162;
            bg.x = (defaultWidth - 1161) / 2;
        }

        
        private addItem(item: string,pos:number) {

            var itemDO = new gameui.ImageButton("item" + item, () => {
                this.dispatchEvent("useitem",item);
            });

            this.addChild(itemDO);
            itemDO.y = -150;
            itemDO.x = 300 * pos + 300;


        }
    }
} 