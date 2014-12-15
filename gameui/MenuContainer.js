var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameui;
(function (gameui) {
    var MenuContainer = (function (_super) {
        __extends(MenuContainer, _super);
        function MenuContainer(width, height, flowHorizontal) {
            if (typeof width === "undefined") { width = null; }
            if (typeof height === "undefined") { height = null; }
            if (typeof flowHorizontal === "undefined") { flowHorizontal = false; }
            if (!flowHorizontal)
                _super.call(this, 1, 0, width, height, 0, flowHorizontal);
            else
                _super.call(this, 0, 1, width, height, 0, flowHorizontal);
        }
        //adds a text object
        MenuContainer.prototype.addLabel = function (text) {
            var textObj;
            textObj = new gameui.Label(text);
            this.addObject(textObj);
            return textObj.textField;
        };

        //creates a button object
        MenuContainer.prototype.addButton = function (text, event) {
            if (typeof event === "undefined") { event = null; }
            var buttonObj = new gameui.TextButton(text, null, null, null, event);
            this.addObject(buttonObj);
            return buttonObj;
        };

        MenuContainer.prototype.addOutButton = function (text, event) {
            if (typeof event === "undefined") { event = null; }
            var buttonObj = new gameui.TextButton(text, null, null, null, event);
            this.addObject(buttonObj);
            return buttonObj;
        };
        return MenuContainer;
    })(gameui.Grid);
    gameui.MenuContainer = MenuContainer;
})(gameui || (gameui = {}));
//# sourceMappingURL=MenuContainer.js.map
