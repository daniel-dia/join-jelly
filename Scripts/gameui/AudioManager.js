var gameui;
(function (gameui) {
    // Class
    var AudiosManager = (function () {
        function AudiosManager() {
        }
        AudiosManager.setMusicVolume = function (volume) {
            if (this.currentMusic)
                this.currentMusic.volume = volume;
            this.musicVolue = volume;
        };
        AudiosManager.setSoundVeolume = function (volume) {
            this.soundVolume = volume;
        };
        AudiosManager.getMusicVolume = function () {
            return this.musicVolue;
        };
        AudiosManager.getSoundVeolume = function () {
            return this.soundVolume;
        };
        AudiosManager.playMusic = function (name, volume) {
            if (volume === void 0) { volume = 1; }
            if (this.currentMusic) {
                this.currentMusic.setVolume(volume);
                if (this.currentMusicName == name)
                    return;
                this.currentMusic.stop();
                delete this.currentMusic;
            }
            this.currentMusicName = name;
            this.currentMusic = createjs.Sound.play(name, null, null, null, -1);
            this.currentMusic.setVolume(volume * this.getMusicVolume());
        };
        AudiosManager.playSound = function (name, interrupt, delay, offset, loop, volume) {
            if (delay === void 0) { delay = 0; }
            if (volume === void 0) { volume = 1; }
            return createjs.Sound.play(name, interrupt, delay, offset, loop, volume * this.getSoundVeolume());
        };
        return AudiosManager;
    })();
    gameui.AudiosManager = AudiosManager;
})(gameui || (gameui = {}));
//# sourceMappingURL=AudioManager.js.map