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
                    this.addSoundOptions();
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
                PauseMenu.prototype.addSoundOptions = function () {
                    var _this = this;
                    var y = 1000;
                    var f = gameui.AssetsManager.getBitmap("FlyGroup");
                    f.set({ x: (defaultWidth - 1056) / 2, y: 870 });
                    this.addChild(f);
                    var t = gameui.AssetsManager.getBitmapText(StringResources.menus.sound, "debussy");
                    t.set({ x: defaultWidth / 2, y: 810 });
                    t.regX = t.getBounds().width / 2;
                    this.addChild(t);
                    //add continue button;
                    this.musicBtOn = new gameui.ImageButton("BtMusic", (function () {
                        _this.setMusic(0);
                    }));
                    this.musicBtOn.set({ x: 623, y: y });
                    this.addChild(this.musicBtOn);
                    //add share button;
                    this.soundBtOn = new gameui.ImageButton("BtSound", (function () {
                        _this.setSound(0);
                    }));
                    this.soundBtOn.set({ x: 923, y: y });
                    this.addChild(this.soundBtOn);
                    //add continue button;
                    this.musicBtOff = new gameui.ImageButton("BtMusicOff", (function () {
                        _this.setMusic(1);
                    }));
                    this.musicBtOff.set({ x: 623, y: y });
                    this.addChild(this.musicBtOff);
                    //add share button;
                    this.soundBtOff = new gameui.ImageButton("BtSoundOff", (function () {
                        _this.setSound(1);
                    }));
                    this.soundBtOff.set({ x: 923, y: y });
                    this.addChild(this.soundBtOff);
                    var mus = joinjelly.JoinJelly.userData.getMusicVol();
                    var snd = joinjelly.JoinJelly.userData.getSoundVol();
                    this.musicBtOff.visible = !mus;
                    this.soundBtOff.visible = !snd;
                    this.musicBtOn.visible = !!mus;
                    this.soundBtOn.visible = !!snd;
                };
                PauseMenu.prototype.setMusic = function (value) {
                    if (value) {
                        this.musicBtOff.fadeOut();
                        this.musicBtOn.fadeIn();
                    }
                    else {
                        this.musicBtOn.fadeOut();
                        this.musicBtOff.fadeIn();
                    }
                    joinjelly.JoinJelly.userData.setMusicVol(value);
                    gameui.AssetsManager.setMusicVolume(value ? 1 : 0);
                };
                PauseMenu.prototype.setSound = function (value) {
                    if (value) {
                        this.soundBtOff.fadeOut();
                        this.soundBtOn.fadeIn();
                    }
                    else {
                        this.soundBtOn.fadeOut();
                        this.soundBtOff.fadeIn();
                    }
                    joinjelly.JoinJelly.userData.setSoundVol(value);
                    gameui.AssetsManager.setSoundVeolume(value ? 1 : 0);
                };
                return PauseMenu;
            })(joinjelly.menus.view.FlyOutMenu);
            view.PauseMenu = PauseMenu;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=PauseMenu.js.map