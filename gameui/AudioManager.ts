﻿module gameui {

    // Class
    export class AudiosManager {

        private static loader: createjs.LoadQueue;

        private static currentMusicName: string;
        private static currentMusic: createjs.SoundInstance
        private static musicVolue: number;
        private static soundVolume: number;

        public static setMusicVolume(volume: number) {
            if (this.currentMusic) this.currentMusic.volume = volume;
            this.musicVolue = volume;
        }

        public static setSoundVeolume(volume: number) {

            this.soundVolume = volume;
        }

        public static getMusicVolume(): number {
            if (this.musicVolue == undefined) return 1;
            return this.musicVolue;
        }

        public static getSoundVolume(): number {
            if (this.soundVolume == undefined) return 1;
            return this.soundVolume;
        }

        public static playMusic(name: string, volume: number= 1) {
            if (this.currentMusic) {
                this.currentMusic.setVolume(volume * this.getMusicVolume());
                if (this.currentMusicName == name) return;

                this.currentMusic.stop();
                delete this.currentMusic;
            }

            this.currentMusicName = name;
            this.currentMusic = createjs.Sound.play(name, null, null, null, 1000);
            this.currentMusic.setVolume(volume * this.getMusicVolume());
        }

        public static playSound(name: string, interrupt?: boolean, delay: number= 0, offset?: number, loop?: number, volume: number= 1): createjs.SoundInstance {

            return createjs.Sound.play(name, interrupt, delay, offset, loop, volume * this.getSoundVolume());
        }

        // #endregion
    }
}

