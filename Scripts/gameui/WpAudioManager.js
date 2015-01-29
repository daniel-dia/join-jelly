var gameui;
(function (gameui) {
    // Class
    var WPAudioManager = (function () {
        function WPAudioManager() {
        }
        // set and get music volume
        WPAudioManager.setMusicVolume = function (volume) {
            if (this.currentMusic)
                this.currentMusic.volume = volume;
            this.musicVolue = volume;
        };
        WPAudioManager.setSoundVeolume = function (volume) {
            this.soundVolume = volume;
        };
        WPAudioManager.getMusicVolume = function () {
            return this.musicVolue;
        };
        WPAudioManager.getSoundVolume = function () {
            return this.soundVolume;
        };
        // play a music
        WPAudioManager.playMusic = function (name, volume) {
            if (volume === void 0) { volume = 1; }
            if (!name) {
                this.stopCurrentMusic();
                return;
            }
            if (this.currentMusicName != name) {
                // if is there a music, then end it
                if (this.currentMusic)
                    this.removeAudio(this.currentMusic);
                // create audio
                var music = this.createAudioElement(name);
                music.volume = this.getMusicVolume() * volume;
                music.play();
                // create loop for music
                music.onended = function () {
                    music.play();
                };
                // create watchDogInterval for music accidentaly ended.
                this.musicWatchdogInterval = setInterval(function () {
                    if (music)
                        try {
                            music.play();
                        }
                        catch (e) {
                        }
                }, 100);
                this.currentMusicName = name;
                this.currentMusic = music;
            }
        };
        // play a sound
        WPAudioManager.playSound = function (name, interrupt, delay, offset, loop, volume) {
            if (delay === void 0) { delay = 0; }
            if (volume === void 0) { volume = 1; }
            if (this.getSoundVolume() * volume == 0)
                return;
            // create HTML Audio Tag
            var sfx = this.createAudioElement(name);
            sfx.volume = this.getSoundVolume() * volume;
            // add to the effects list
            this.effects.push(sfx);
            while (this.effects.length >= this.limit)
                this.removeAudio(this.effects[0]);
            //remove sound when it ends.
            sfx.onended = function () {
                WPAudioManager.removeAudio(sfx);
            };
            try {
                sfx.play();
            }
            catch (e) {
            }
            return sfx;
        };
        // stops currentMusic
        WPAudioManager.stopCurrentMusic = function () {
            if (!this.currentMusic)
                return;
            clearInterval(this.musicWatchdogInterval);
            this.removeAudio(this.currentMusic);
        };
        // create audio Element
        WPAudioManager.createAudioElement = function (src) {
            var audio = new Audio();
            //audio.msAudioCategory = 2
            audio.src = "assets/sounds/" + src + ".mp3";
            return audio;
        };
        // remove sound from the device
        WPAudioManager.removeAudio = function (audio) {
            if (!audio)
                return;
            audio.pause();
            audio.src = null;
            // if the sound is on list, remove it
            if (this.effects.indexOf(audio) >= 0)
                this.effects.splice(this.effects.indexOf(audio), 1);
            // delete variable
            delete audio;
        };
        WPAudioManager.limit = 3;
        WPAudioManager.effects = [];
        return WPAudioManager;
    })();
    gameui.WPAudioManager = WPAudioManager;
})(gameui || (gameui = {}));
gameui.AudioManager = gameui.WPAudioManager;
//# sourceMappingURL=WpAudioManager.js.map