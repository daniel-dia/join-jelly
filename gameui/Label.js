var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameui;
(function (gameui) {
    var Label = (function (_super) {
        __extends(Label, _super);
        //public container: createjs.Container;
        function Label(text, font, color) {
            if (typeof text === "undefined") { text = ""; }
            if (typeof font === "undefined") { font = "600 90px Myriad Pro"; }
            if (typeof color === "undefined") { color = "#82e790"; }
            _super.call(this);
            text = text.toUpperCase();

            //add text into it.
            this.textField = new createjs.Text(text, font, color);
            this.textField.textBaseline = "middle";
            this.textField.textAlign = "center";
            this.addChild(this.textField);
        }
        return Label;
    })(gameui.UIItem);
    gameui.Label = Label;
})(gameui || (gameui = {}));
//# sourceMappingURL=Label.js.map
