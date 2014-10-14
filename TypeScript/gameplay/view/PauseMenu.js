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
            var PauseMenu = (function (_super) {
                __extends(PauseMenu, _super);
                function PauseMenu() {
                    _super.call(this, "OPTIONS");
                    this.addButtons();
                }
                //creates buttons controls
                PauseMenu.prototype.addButtons = function () {
                    var _this = this;
                    //add continue button;
                    var ok = new gameui.ui.ImageButton("PlayBt", (function () {
                        _this.dispatchEvent("play");
                    }));
                    ok.set({ x: 771, y: 1599 });
                    this.addChild(ok);

                    //add share button;
                    var board = new gameui.ui.ImageButton("Home", (function () {
                        _this.dispatchEvent("home");
                    }));
                    board.set({ x: 353, y: 1570 });
                    this.addChild(board);

                    //add showBoard button
                    var share = new gameui.ui.ImageButton("Restart", (function () {
                        _this.dispatchEvent("restart");
                    }));
                    share.set({ x: 1190, y: 1570 });
                    this.addChild(share);
                };
                return PauseMenu;
            })(joinjelly.menus.view.FlyOutMenu);
            view.PauseMenu = PauseMenu;
        })(gameplay.view || (gameplay.view = {}));
        var view = gameplay.view;
    })(joinjelly.gameplay || (joinjelly.gameplay = {}));
    var gameplay = joinjelly.gameplay;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=PauseMenu.js.map
