var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    (function (gameplay) {
        (function (view) {
            var MessageBallon = (function (_super) {
                __extends(MessageBallon, _super);
                function MessageBallon(text) {
                    _super.call(this);

                    this.addChild(gameui.AssetsManager.getBitmap("this"));

                    this.regX = 316;
                    this.regY = 366;
                    this.x = 164 + this.regX;
                    this.y = 941 + this.regY;

                    var t = new createjs.BitmapText(text, new createjs.SpriteSheet(Deburilfont));
                    this.addChild(t);
                    t.scaleX = t.scaleY = 0.7;
                    t.x = 50;
                    t.y = 100;
                }
                return MessageBallon;
            })(gameui.ui.Button);
            view.MessageBallon = MessageBallon;
        })(gameplay.view || (gameplay.view = {}));
        var view = gameplay.view;
    })(joinjelly.gameplay || (joinjelly.gameplay = {}));
    var gameplay = joinjelly.gameplay;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=MessageBallon.js.map
