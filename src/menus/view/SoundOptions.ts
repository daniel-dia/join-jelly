module joinjelly.menus.view {

    export class SoundOptions extends createjs.Container {


        private soundBtOn: gameui.Button;
        private soundBtOff: gameui.Button;
        private musicBtOn: gameui.Button;
        private musicBtOff: gameui.Button;

        constructor() {
            super();
            this.addSoundOptions();
        }

        private addSoundOptions() {

            var f = gameui.AssetsManager.getBitmap("FlyGroup");
            f.y = - 130;
            f.regX = f.getBounds().width / 2;
            this.addChild(f);

            var title = gameui.AssetsManager.getBitmapText(StringResources.menus.sound, "debussy")
            title.y = -190;
            title.scaleX = title.scaleY = 1.1;
            title.regX = title.getBounds().width / 2;
            this.addChild(title)

            //add continue button;
            this.musicBtOn = new gameui.ImageButton("BtMusic", (() => { this.setMusic(0) }));
            this.musicBtOn.x = -145;
            this.addChild(this.musicBtOn);

            //add share button;
            this.soundBtOn = new gameui.ImageButton("BtSound", (() => { this.setSound(0) }));
            this.soundBtOn.x = 155;
            this.addChild(this.soundBtOn);

            //add continue button;
            this.musicBtOff = new gameui.ImageButton("BtMusicOff", (() => { this.setMusic(1) }));
            this.musicBtOff.x = -145;
            this.addChild(this.musicBtOff);

            //add share button;
            this.soundBtOff = new gameui.ImageButton("BtSoundOff", (() => { this.setSound(1) }));
            this.soundBtOff.x = 155;
            this.addChild(this.soundBtOff);

            var mus = JoinJelly.userData.getMusicVol();
            var snd = JoinJelly.userData.getSoundVol();

            this.musicBtOff.visible = !mus;
            this.soundBtOff.visible = !snd;
            this.musicBtOn.visible = !!mus;
            this.soundBtOn.visible = !!snd;

        }

        private setMusic(value: number) {
            if (value) {
                this.musicBtOff.fadeOut(); this.musicBtOn.fadeIn();
            }
            else {
                this.musicBtOn.fadeOut(); this.musicBtOff.fadeIn();
            }

            JoinJelly.userData.setMusicVol(value);
            gameui.AudiosManager.setMusicVolume(value ? 1 : 0);
        }

        private setSound(value: number) {
            if (value) {
                this.soundBtOff.fadeOut(); this.soundBtOn.fadeIn();
            }
            else {
                this.soundBtOn.fadeOut(); this.soundBtOff.fadeIn();
            }

            JoinJelly.userData.setSoundVol(value);
            gameui.AudiosManager.setSoundVeolume(value ? 1 : 0);
        }

    }
}