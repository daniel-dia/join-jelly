module joinjelly.gameplay.view {
 
    export class PauseMenu extends joinjelly.menus.view.FlyOutMenu{

        private soundBtOn: gameui.Button;
        private soundBtOff: gameui.Button;
        private musicBtOn: gameui.Button;
        private musicBtOff: gameui.Button;

        constructor() {
            super(StringResources.menus.pause);
            this.addButtons();
            this.addSoundOptions();
        }

        //creates buttons controls
        private addButtons() {

            //add continue button;
            var ok = new gameui.ImageButton("BtPlay", (() => {
                this.dispatchEvent("play")
            }));
            ok.set({ x: 771, y: 1599 });
            this.addChild(ok);

            //add share button;
            var board = new gameui.ImageButton("BtHome", (() => {
                this.dispatchEvent("home")
            }));
            board.set({ x: 353, y: 1570 });
            this.addChild(board);

            //add showBoard button
            var share = new gameui.ImageButton("BtRestart", (() => {
                this.dispatchEvent("restart")
            }));
            share.set({ x: 1190, y: 1570 });
            this.addChild(share);
        }

        private addSoundOptions() {
            var y = 1000;

            var f = gameui.AssetsManager.getBitmap("FlyGroup");
            f.set({x:(defaultWidth-1056)/2,y:870 })
            this.addChild(f);

            var t = gameui.AssetsManager.getBitmapText(StringResources.menus.sound, "debussy")
            t.set({ x: defaultWidth/2, y: 810 });
            t.regX = t.getBounds().width / 2;
            this.addChild(t)

            //add continue button;
            this.musicBtOn = new gameui.ImageButton("BtMusic", (() => { this.setMusic(0) }));
            this.musicBtOn.set({ x: 623, y: y });
            this.addChild(this.musicBtOn);

            //add share button;
            this. soundBtOn = new gameui.ImageButton("BtSound", (() => { this.setSound(0) }));
            this.soundBtOn.set({ x: 923, y: y });
            this.addChild(this.soundBtOn);

            //add continue button;
            this. musicBtOff = new gameui.ImageButton("BtMusicOff", (() => { this.setMusic(1)}));
            this.musicBtOff .set({ x: 623, y: y });
            this.addChild(this.musicBtOff);

            //add share button;
            this. soundBtOff = new gameui.ImageButton("BtSoundOff", (() => { this.setSound(1) }));
            this.soundBtOff.set({ x: 923, y: y });
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
            gameui.AssetsManager.setMusicVolume(value ? 1 : 0);
        }

        private setSound(value: number) {
            if (value) {
                this.soundBtOff.fadeOut(); this.soundBtOn.fadeIn();
            }
            else {
                this.soundBtOn.fadeOut(); this.soundBtOff.fadeIn();}

            JoinJelly.userData.setSoundVol(value);
            gameui.AssetsManager.setSoundVeolume(value ? 1 : 0);
        }
    }
}