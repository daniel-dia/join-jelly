var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FinishMenu = (function (_super) {
    __extends(FinishMenu, _super);
    function FinishMenu(score, highScore) {
        var _this = this;
        _super.call(this);

        this.addLabel("Game Over");

        this.addLabel("Your Score: " + score.toString());
        this.addLabel("Your Best: " + highScore.toString());

        this.addButton("Share", function () {
            _this.dispatchEvent("share");
        });
        this.addButton("Continue", function () {
            _this.dispatchEvent("continue");
        });
    }
    return FinishMenu;
})(gameui.ui.MenuContainer);
//# sourceMappingURL=FinishMenu.js.map
