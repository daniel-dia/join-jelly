var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    (function (menus) {
        (function (view) {
            var JellyPediaItem = (function (_super) {
                __extends(JellyPediaItem, _super);
                function JellyPediaItem(value, title, description) {
                    _super.call(this);

                    // Add Background
                    var bg = gameui.AssetsManager.getBitmap("pediaItem");
                    this.addChild(bg);

                    // Add Jelly
                    var j = new joinjelly.gameplay.view.Jelly();
                    j.setNumber(value);
                    j.x = 332 / 2;
                    j.y = 332;
                    j.scaleX = j.scaleY = 1.4;
                    this.addChild(j);

                    // Add Texts
                    var titleObj = gameui.AssetsManager.getBitmapText(title, "debussy");
                    var descriptionObj = gameui.AssetsManager.getBitmapText(description, "debussy");
                    titleObj.y = 30;
                    descriptionObj.y = 130;
                    titleObj.scaleX = titleObj.scaleY = 1.4;
                    titleObj.x = descriptionObj.x = 450;
                    this.addChild(titleObj);
                    this.addChild(descriptionObj);
                }
                return JellyPediaItem;
            })(createjs.Container);
            view.JellyPediaItem = JellyPediaItem;
        })(menus.view || (menus.view = {}));
        var view = menus.view;
    })(joinjelly.menus || (joinjelly.menus = {}));
    var menus = joinjelly.menus;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=JellypediaItem.js.map
