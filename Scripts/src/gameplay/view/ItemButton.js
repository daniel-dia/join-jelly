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
            var ItemButton = (function (_super) {
                __extends(ItemButton, _super);
                function ItemButton(item) {
                    var _this = this;
                    _super.call(this);
                    this.ammount = 0;
                    this.locked = false;
                    this.item = item;
                    this.addEventListener("click", function () {
                        _this.dispatchEvent({ type: "useitem", item: item });
                    });
                    //create Item
                    var bg = gameui.ImagesManager.getBitmap("itemBG");
                    var bgd = gameui.ImagesManager.getBitmap("itemBGDisabled");
                    var img = gameui.ImagesManager.getBitmap("item" + item);
                    var text = gameui.ImagesManager.getBitmapText("0", "debussy");
                    var name = gameui.ImagesManager.getBitmapText(StringResources.items[item], "debussy");
                    var add = gameui.ImagesManager.getBitmap("BtPlusMini");
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
                    img.scaleX = img.scaleY = 0.8;
                    img.y = -25;
                    text.scaleX = text.scaleY = 0.7;
                    text.y = -110;
                    text.x = -80;
                    text.name = 'value';
                    name.scaleX = name.scaleY = 0.6;
                    name.y = 30;
                    name.x = 0;
                    name.regX = name.getBounds().width / 2;
                    name.name = 'value';
                    add.y = 0;
                    add.x = 55;
                    this.text = text;
                    this.createHitArea();
                    this.addBt = add;
                }
                ItemButton.prototype.setAmmount = function (ammount) {
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
                };
                ItemButton.prototype.lock = function () {
                    this.mouseEnabled = false;
                    this.locked = true;
                    this.updateColor();
                };
                ItemButton.prototype.unlock = function () {
                    this.mouseEnabled = true;
                    this.locked = false;
                    this.updateColor();
                };
                ItemButton.prototype.updateColor = function () {
                    if (this.locked || this.ammount <= 0)
                        this.disabled.visible = true;
                    else
                        this.disabled.visible = false;
                };
                return ItemButton;
            })(gameui.Button);
            view.ItemButton = ItemButton;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=ItemButton.js.map