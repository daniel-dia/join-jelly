﻿module joinjelly.gameplay.view {
 
    export class PauseMenu extends joinjelly.menus.view.FlyOutMenu{

        constructor() {
            super("PAUSED");
            this.addButtons();
            this.addSoundOptions();
        }

        //creates buttons controls
        private addButtons() {

            //add continue button;
            var ok = new gameui.ui.ImageButton("PlayBt", (() => { this.dispatchEvent("play") }));
            ok.set({ x: 771, y: 1599 });
            this.addChild(ok);

            //add share button;
            var board = new gameui.ui.ImageButton("Home", (() => { this.dispatchEvent("home") }));
            board.set({ x: 353, y: 1570 });
            this.addChild(board);

            //add showBoard button
            var share = new gameui.ui.ImageButton("Restart", (() => { this.dispatchEvent("restart") }));
            share.set({ x: 1190, y: 1570 });
            this.addChild(share);
        }

        private addSoundOptions() {
            var y = 1000;

            var f = gameui.AssetsManager.getBitmap("FlyGroup");
            f.set({x:(defaultWidth-1056)/2,y:870 })
            this.addChild(f);

            var t = new createjs.BitmapText("Sound", new createjs.SpriteSheet(Deburilfont)); 
            t.set({ x: defaultWidth/2, y: 870 });
            t.regX = t.getBounds().width / 2;
            this.addChild(t)

            //add continue button;
            var music = new gameui.ui.ImageButton("BtMusic", (() => { music.fadeOut(); musicOFf.fadeIn(); this.dispatchEvent("music") }));
            music.set({ x: 623, y: y });
            this.addChild(music);

            //add share button;
            var sound = new gameui.ui.ImageButton("BtSound", (() => { sound.fadeOut(); soundOff.fadeIn();this.dispatchEvent("sound") }));
            sound.set({ x: 923, y: y });
            this.addChild(sound);

            //add continue button;
            var musicOFf = new gameui.ui.ImageButton("BtMusicOff", (() => { musicOFf.fadeOut(); music.fadeIn(); this.dispatchEvent("musicOn") }));
            musicOFf .set({ x: 623, y: y });
            this.addChild(musicOFf );

            //add share button;
            var soundOff = new gameui.ui.ImageButton("BtSoundOff", (() => { soundOff.fadeOut(); sound.fadeIn();this.dispatchEvent("soundOn") }));
            soundOff.set({ x: 923, y: y });
            this.addChild(soundOff);

            var mus = FasPair.userData.getMusicVol();
            var snd = FasPair.userData.getSoundVol();

            musicOFf.visible = !mus;
            soundOff.visible = !snd;
            music.visible = !!mus;
            sound.visible = !!snd;

        }
    }
}