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
            var PauseMenu = (function (_super) {
                __extends(PauseMenu, _super);
                function PauseMenu() {
                    _super.call(this, StringResources.menus.pause);
                    this.addButtons();
                    var soundOptions = new joinjelly.menus.view.SoundOptions();
                    this.addChild(soundOptions);
                    soundOptions.set({ x: defaultWidth / 2, y: 1000 });
                }
                //creates buttons controls
                PauseMenu.prototype.addButtons = function () {
                    var _this = this;
                    //add continue button;
                    var ok = new gameui.ImageButton("BtPlay", (function () {
                        _this.dispatchEvent("play");
                    }));
                    ok.set({ x: 771, y: 1599 });
                    this.addChild(ok);
                    //add share button;
                    var board = new gameui.ImageButton("BtHome", (function () {
                        _this.dispatchEvent("home");
                    }));
                    board.set({ x: 353, y: 1570 });
                    this.addChild(board);
                    //add showBoard button
                    var share = new gameui.ImageButton("BtRestart", (function () {
                        _this.dispatchEvent("restart");
                    }));
                    share.set({ x: 1190, y: 1570 });
                    this.addChild(share);
                };
                return PauseMenu;
            })(joinjelly.menus.view.FlyOutMenu);
            view.PauseMenu = PauseMenu;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=PauseMenu.js.map