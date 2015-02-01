var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameui;
(function (gameui) {
    // Class
    var UIItem = (function (_super) {
        __extends(UIItem, _super);
        function UIItem() {
            _super.apply(this, arguments);
            this.centered = false;
            this.animating = false;
        }
        UIItem.prototype.centralize = function () {
            this.regX = this.width / 2;
            this.regY = this.height / 2;
            this.centered = true;
        };
        UIItem.prototype.fadeOut = function (scaleX, scaleY) {
            var _this = this;
            if (scaleX === void 0) { scaleX = 0.5; }
            if (scaleY === void 0) { scaleY = 0.5; }
            this.animating = true;
            this.antX = this.x;
            this.antY = this.y;
            this.mouseEnabled = false;
            createjs.Tween.removeTweens(this);
            createjs.Tween.get(this).to({
                scaleX: scaleX,
                scaleY: scaleY,
                alpha: 0,
                x: this.antX,
                y: this.antY,
            }, 200, createjs.Ease.quadIn).call(function () {
                _this.visible = false;
                _this.x = _this.antX;
                _this.y = _this.antY;
                _this.scaleX = _this.scaleY = 1;
                _this.alpha = 1;
                _this.animating = false;
                _this.mouseEnabled = true;
                ;
            });
        };
        UIItem.prototype.fadeIn = function (scaleX, scaleY) {
            var _this = this;
            if (scaleX === void 0) { scaleX = 0.5; }
            if (scaleY === void 0) { scaleY = 0.5; }
            this.visible = true;
            this.animating = true;
            if (this.antX == null) {
                this.antX = this.x;
                this.antY = this.y;
            }
            this.scaleX = scaleX, this.scaleY = scaleY, this.alpha = 0, this.x = this.x;
            this.y = this.y;
            this.mouseEnabled = false;
            createjs.Tween.removeTweens(this);
            createjs.Tween.get(this).to({
                scaleX: 1,
                scaleY: 1,
                alpha: 1,
                x: this.antX,
                y: this.antY,
            }, 400, createjs.Ease.quadOut).call(function () {
                _this.mouseEnabled = true;
                _this.animating = false;
            });
        };
        //calcula
        UIItem.prototype.createHitArea = function () {
            var hit = new createjs.Shape();
            var b = this.getBounds();
            if (b)
                hit.graphics.beginFill("#000").drawRect(b.x, b.y, b.width, b.height);
            //TODO. se for texto colocar uma sobra. !
            this.hitArea = hit;
        };
        return UIItem;
    })(createjs.Container);
    gameui.UIItem = UIItem;
})(gameui || (gameui = {}));
//# sourceMappingURL=UIItem.js.map