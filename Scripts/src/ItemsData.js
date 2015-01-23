var joinjelly;
(function (joinjelly) {
    var Items = (function () {
        function Items() {
        }
        Items.TIME = "time";
        Items.CLEAN = "clean";
        Items.FAST = "fast";
        Items.REVIVE = "revive";
        Items.LUCKY = "lucky";
        return Items;
    })();
    joinjelly.Items = Items;
    var ItemsData = (function () {
        function ItemsData() {
            this.items = (new Object());
            this.items = UserData.loadItems();
        }
        ItemsData.prototype.getItemAmmount = function (item) {
            return this.items[item] || 0;
        };
        ItemsData.prototype.increaseItemAmmount = function (item, ammount) {
            if (ammount === void 0) { ammount = 1; }
            this.setItemAmmount(item, this.getItemAmmount(item) + ammount);
        };
        ItemsData.prototype.decreaseItemAmmount = function (item, ammount) {
            if (ammount === void 0) { ammount = 1; }
            this.setItemAmmount(item, this.getItemAmmount(item) - ammount);
        };
        ItemsData.prototype.setItemAmmount = function (item, ammount) {
            if (ammount > 99)
                ammount = 99;
            if (ammount < 0)
                ammount = 0;
            this.items[item] = ammount;
            UserData.saveItems(this.items);
        };
        ItemsData.items = [Items.TIME, Items.CLEAN, Items.FAST, Items.REVIVE, Items.LUCKY];
        return ItemsData;
    })();
    joinjelly.ItemsData = ItemsData;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=ItemsData.js.map