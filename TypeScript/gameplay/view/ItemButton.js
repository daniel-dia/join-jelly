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
                    this.item = item;
                    this.addEventListener("click", function () {
                        _this.dispatchEvent("useitem", item);
                    });
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
                ItemButton.prototype.setAmmount = function (ammout) {
                    this.text.text = ammout.toString();
                };
                return ItemButton;
            })(gameui.Button);
            view.ItemButton = ItemButton;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=ItemButton.js.map