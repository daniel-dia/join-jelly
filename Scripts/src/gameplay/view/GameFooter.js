var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var view;
        (function (view) {
            var GameFooter = (function (_super) {
                __extends(GameFooter, _super);
                function GameFooter(items) {
                    _super.call(this);
                    this.itemSize = 270;
                    this.itemsButtons = [];
                    this.addObjects();
                    this.setItems(items);
                }
                // add all button items
                GameFooter.prototype.setItems = function (items) {
                    // clean all buttons
                    this.cleanButtons();
                    if (!items)
                        return;
                    for (var i in items)
                        this.addItem(items[i], i);
                    for (var i in items) {
                        //set button position
                        this.itemsButtons[items[i]].y = -150;
                        this.itemsButtons[items[i]].x = (defaultWidth - (items.length - 1) * this.itemSize) / 2 + i * this.itemSize;
                    }
                };
                // clean buttons
                GameFooter.prototype.cleanButtons = function () {
                    for (var i in this.itemsButtons)
                        this.removeChild(this.itemsButtons[i]);
                    this.itemsButtons = [];
                };
                // add objects to the footer
                GameFooter.prototype.addObjects = function () {
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
                    lucky.x = 1285;
                    this.lucky = lucky;
                    // lucky.visible = false;
                };
                //add a single item button to the footer
                GameFooter.prototype.addItem = function (item, pos) {
                    var _this = this;
                    //create button
                    var bt = new view.ItemButton(item);
                    this.addChild(bt);
                    this.itemsButtons[item] = bt;
                    //add event listener
                    bt.addEventListener("click", function () {
                        _this.dispatchEvent({ type: "useitem", item: item });
                    });
                };
                // get a item display object
                GameFooter.prototype.getItemButton = function (item) {
                    return this.itemsButtons[item];
                };
                // set item ammount
                GameFooter.prototype.setItemAmmount = function (item, ammount) {
                    if (this.itemsButtons[item])
                        this.itemsButtons[item].setAmmount(ammount);
                    if (item == "lucky")
                        this.lucky.visible = (ammount > 0);
                };
                // lock a item
                GameFooter.prototype.lockItem = function (itemId) {
                    var b = this.getItemButton(itemId);
                    b.lock();
                };
                GameFooter.prototype.unlockItem = function (itemId) {
                    var b = this.getItemButton(itemId);
                    b.unlock();
                };
                GameFooter.prototype.lockAll = function () {
                    for (var b in this.itemsButtons)
                        this.itemsButtons[b].lock();
                };
                GameFooter.prototype.unlockAll = function () {
                    for (var b in this.itemsButtons)
                        this.itemsButtons[b].unlock();
                };
                return GameFooter;
            })(createjs.Container);
            view.GameFooter = GameFooter;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=GameFooter.js.map