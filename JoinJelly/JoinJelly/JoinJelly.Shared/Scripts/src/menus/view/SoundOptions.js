var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var view;
        (function (view) {
            var SoundOptions = (function (_super) {
                __extends(SoundOptions, _super);
                function SoundOptions() {
                    _super.call(this);
                    this.addSoundOptions();
                }
                SoundOptions.prototype.addSoundOptions = function () {
                    var _this = this;
                    var f = gameui.ImagesManager.getBitmap("FlyGroup");
                    f.y = -130;
                    f.regX = f.getBounds().width / 2;
                    this.addChild(f);
                    var t = gameui.ImagesManager.getBitmapText(StringResources.menus.sound, "debussy");
                    t.y = -190;
                    t.regX = t.getBounds().width / 2;
                    this.addChild(t);
                    //add continue button;
                    this.musicBtOn = new gameui.ImageButton("BtMusic", (function () {
                        _this.setMusic(0);
                    }));
                    this.musicBtOn.x = -145;
                    this.addChild(this.musicBtOn);
                    //add share button;
                    this.soundBtOn = new gameui.ImageButton("BtSound", (function () {
                        _this.setSound(0);
                    }));
                    this.soundBtOn.x = 155;
                    this.addChild(this.soundBtOn);
                    //add continue button;
                    this.musicBtOff = new gameui.ImageButton("BtMusicOff", (function () {
                        _this.setMusic(1);
                    }));
                    this.musicBtOff.x = -145;
                    this.addChild(this.musicBtOff);
                    //add share button;
                    this.soundBtOff = new gameui.ImageButton("BtSoundOff", (function () {
                        _this.setSound(1);
                    }));
                    this.soundBtOff.x = 155;
                    this.addChild(this.soundBtOff);
                    var mus = joinjelly.JoinJelly.userData.getMusicVol();
                    var snd = joinjelly.JoinJelly.userData.getSoundVol();
                    this.musicBtOff.visible = !mus;
                    this.soundBtOff.visible = !snd;
                    this.musicBtOn.visible = !!mus;
                    this.soundBtOn.visible = !!snd;
                };
                SoundOptions.prototype.setMusic = function (value) {
                    if (value) {
                        this.musicBtOff.fadeOut();
                        this.musicBtOn.fadeIn();
                    }
                    else {
                        this.musicBtOn.fadeOut();
                        this.musicBtOff.fadeIn();
                    }
                    joinjelly.JoinJelly.userData.setMusicVol(value);
                    gameui.AudioManager.setMusicVolume(value ? 1 : 0);
                };
                SoundOptions.prototype.setSound = function (value) {
                    if (value) {
                        this.soundBtOff.fadeOut();
                        this.soundBtOn.fadeIn();
                    }
                    else {
                        this.soundBtOn.fadeOut();
                        this.soundBtOff.fadeIn();
                    }
                    joinjelly.JoinJelly.userData.setSoundVol(value);
                    gameui.AudioManager.setSoundVeolume(value ? 1 : 0);
                };
                return SoundOptions;
            })(createjs.Container);
            view.SoundOptions = SoundOptions;
        })(view = menus.view || (menus.view = {}));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=SoundOptions.js.map