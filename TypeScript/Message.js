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
            var Message = (function (_super) {
                __extends(Message, _super);
                function Message() {
                    var _this = this;
                    _super.call(this);

                    this.addChild(new createjs.Shape(new createjs.Graphics().beginFill("darkGray").beginStroke("black").drawRect(-200, -60, 400, 120)));
                    var t = new createjs.Text("", "60px Arial", "white");
                    t.textAlign = "center";
                    t.textBaseline = "middle";
                    this.addChild(t);
                    this.text = t;

                    this.addEventListener("click", function () {
                        _this.fadeOut();
                    });
                }
                Message.prototype.showMessage = function (message) {
                    this.text.text = message;
                    this.fadeIn();
                };
                return Message;
            })(gameui.ui.Button);
            view.Message = Message;
        })(gameplay.view || (gameplay.view = {}));
        var view = gameplay.view;
    })(joinjelly.gameplay || (joinjelly.gameplay = {}));
    var gameplay = joinjelly.gameplay;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=Message.js.map
