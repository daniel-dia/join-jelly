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
            var TutoralMessage = (function (_super) {
                __extends(TutoralMessage, _super);
                function TutoralMessage() {
                    var _this = this;
                    _super.call(this);

                    this.addChild(gameui.AssetsManager.getBitmap("ballon"));

                    this.visible = false;

                    this.regX = 316;
                    this.regY = 366;
                    this.x = 164 + this.regX;
                    this.y = 941 + this.regY;

                    var t = gameui.AssetsManager.getBitmapText("", "debussy");
                    this.addChild(t);
                    t.scaleX = t.scaleY = 0.7;
                    t.x = 50;
                    t.y = 50;
                    this.bitmapText = t;
                    t.mouseEnabled = false;

                    this.addEventListener("click", function () {
                        _this.fadeOut();
                        _this.dispatchEvent("closed");

                        gameui.AssetsManager.playSound("Interface Sound-15");
                    });
                }
                TutoralMessage.prototype.show = function (text) {
                    this.bitmapText.text = text;
                    this.fadeIn();

                    gameui.AssetsManager.playSound("Interface Sound-14");
                };
                return TutoralMessage;
            })(gameui.Button);
            view.TutoralMessage = TutoralMessage;
        })(gameplay.view || (gameplay.view = {}));
        var view = gameplay.view;
    })(joinjelly.gameplay || (joinjelly.gameplay = {}));
    var gameplay = joinjelly.gameplay;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=TutorialMessage.js.map
