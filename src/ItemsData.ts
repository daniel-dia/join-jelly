module joinjelly {

    export class Items {
        public static TIME = "time";
        public static CLEAN = "clean";
        public static FAST = "fast";
        public static REVIVE = "revive";
        public static LUCKY = "lucky";
        public static EVOLVE = "evolve";
    }

    export class ItemsData {

        private items: Array<number>;

        public static items = [Items.TIME, Items.CLEAN, Items.FAST, Items.REVIVE, Items.EVOLVE, Items.LUCKY];

        constructor() {
            this.items = <Array<number>>(new Object());
            this.items = JoinJelly.userData.loadItems();
        }

        public getItemAmmount(item: string): number {
            return this.items[item] || 0;
        }

        public increaseItemAmmount(item: string, ammount: number = 1) {
            this.setItemAmmount(item, this.getItemAmmount(item) + ammount);
        }

        public decreaseItemAmmount(item: string, ammount: number = 1) {
            this.setItemAmmount(item, this.getItemAmmount(item) - ammount);
        }

        public setItemAmmount(item: string, ammount: number) {
            if (ammount > 99) ammount = 99;
            if (ammount < 0) ammount = 0;

            this.items[item] = ammount;
            JoinJelly.userData.saveItems(this.items);
        }

    }
}