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
                    _super.call(this, "PAUSED");
                    this.addButtons();
                    this.addSoundOptions();
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

                PauseMenu.prototype.addSoundOptions = function () {
                    var _this = this;
                    var y = 1000;

                    var f = gameui.AssetsManager.getBitmap("FlyGroup");
                    f.set({ x: (defaultWidth - 1056) / 2, y: 870 });
                    this.addChild(f);

                    var t = new createjs.BitmapText("Sound", new createjs.SpriteSheet(Deburilfont));
                    t.set({ x: defaultWidth / 2, y: 870 });
                    t.regX = t.getBounds().width / 2;
                    this.addChild(t);

                    //add continue button;
                    var music = new gameui.ui.ImageButton("BtMusic", (function () {
                        music.fadeOut();
                        musicOFf.fadeIn();
                        _this.setMusic(false);
                    }));
                    music.set({ x: 623, y: y });
                    this.addChild(music);

                    //add share button;
                    var sound = new gameui.ui.ImageButton("BtSound", (function () {
                        sound.fadeOut();
                        soundOff.fadeIn();
                        _this.setSound(false);
                    }));
                    sound.set({ x: 923, y: y });
                    this.addChild(sound);

                    //add continue button;
                    var musicOFf = new gameui.ui.ImageButton("BtMusicOff", (function () {
                        musicOFf.fadeOut();
                        music.fadeIn();
                        _this.setMusic(true);
                    }));
                    musicOFf.set({ x: 623, y: y });
                    this.addChild(musicOFf);

                    //add share button;
                    var soundOff = new gameui.ui.ImageButton("BtSoundOff", (function () {
                        soundOff.fadeOut();
                        sound.fadeIn();
                        _this.setSound(true);
                    }));
                    soundOff.set({ x: 923, y: y });
                    this.addChild(soundOff);

                    var mus = joinjelly.JoinJelly.userData.getMusicVol();
                    var snd = joinjelly.JoinJelly.userData.getSoundVol();

                    musicOFf.visible = !mus;
                    soundOff.visible = !snd;
                    music.visible = !!mus;
                    sound.visible = !!snd;
                };

                PauseMenu.prototype.setMusic = function (value) {
                    joinjelly.JoinJelly.userData.setMusicVol(value);
                    //Todo make it communicate with sound
                };

                PauseMenu.prototype.setSound = function (value) {
                    joinjelly.JoinJelly.userData.setSoundVol(value);
                    //Todo make it communicate with sound
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
