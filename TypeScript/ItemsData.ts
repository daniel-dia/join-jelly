module joinjelly {
    export class ItemsData {

        private items: Array<number>;
        public static items = ["time", "clean", "fast", "revive"];

        constructor() {
            this.items = <Array<number>>(new Object());
            this.items = UserData.loadItems();
        }

        public getItemAmmount(item: string): number {
            return this.items[item] || 0;
        }

        public increaseItemAmmount(item: string, ammount: number= 1) {
            this.setItemAmmount(item, this.getItemAmmount(item) + ammount);
        }

        public decreaseItemAmmount(item: string, ammount: number= 1) {
            this.setItemAmmount(item, this.getItemAmmount(item) - ammount);
        }

        public setItemAmmount(item: string, ammount: number) {
            if (ammount > 9) ammount = 9;
            if (ammount < 0) ammount = 0;

            this.items[item] = ammount;
            UserData.saveItems(this.items);
        }
    }
}