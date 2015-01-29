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
            var TutoralMessage = (function (_super) {
                __extends(TutoralMessage, _super);
                function TutoralMessage() {
                    var _this = this;
                    _super.call(this);
                    this.addChild(gameui.ImagesManager.getBitmap("ballon"));
                    this.visible = false;
                    this.regX = 316;
                    this.regY = 366;
                    this.x = 164 + this.regX;
                    this.y = 941 + this.regY;
                    var t = gameui.ImagesManager.getBitmapText("", "debussy");
                    this.addChild(t);
                    t.scaleX = t.scaleY = 0.7;
                    t.x = 50;
                    t.y = 50;
                    this.bitmapText = t;
                    t.mouseEnabled = false;
                    // add hitArea
                    this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(-this.x + this.regX, -this.y + this.regY, defaultWidth, defaultHeight));
                    // add click event
                    this.addEventListener("click", function () {
                        _this.fadeOut();
                        _this.dispatchEvent("closed");
                        gameui.AudioManager.playSound("Interface Sound-15");
                    });
                }
                // show a text on screen
                TutoralMessage.prototype.show = function (text) {
                    this.bitmapText.text = text;
                    this.fadeIn();
                    gameui.AudioManager.playSound("Interface Sound-14");
                };
                return TutoralMessage;
            })(gameui.Button);
            view.TutoralMessage = TutoralMessage;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=TutorialMessage.js.map