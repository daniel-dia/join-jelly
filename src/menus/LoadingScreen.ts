declare var debussy
declare var debussyFont
declare var debussyFontMini;

declare function createSpriteSheetFromFont(font: any, path: string);
declare var WP;
declare var WEB;
module joinjelly {

    export class Loading extends gameui.ScreenState {
        private imagePath: string;
        public loaded: () => any;

        constructor() {
            super();
            this.initializeImages()
        }

        public initializeImages() {

            assetscale = 1;
            if (window.innerWidth <= 1024) assetscale = 0.5;
            if (window.innerWidth <= 384) assetscale = 0.25;
             

            if (assetscale == 1) this.imagePath = "/assets/images/";
            else this.imagePath = "/assets/images_" + assetscale + "x/";

            var imageQueue = gameui.ImagesManager.loadAssets(this.imageManifest, this.imagePath);
            //if (WEB) imageQueue.loadManifest(this.audioManifest,true,"/assets/sounds/");
            //if (!WP) 
                createjs.Sound.registerManifest(this.audioManifest, "/assets/sounds/");

            //loader text
            var text = new createjs.Text("", "90px Arial", "#FFF");
            text.x = defaultWidth / 2;
            text.y = defaultHeight / 2;
            text.textAlign = "center"
            this.content.addChild(text);

            //loading animation
            var anim = new view.LoadingBall();
            anim.x = defaultWidth / 2;
            anim.y = defaultHeight / 2 + 400;
            this.content.addChild(anim);

            //add update% functtion
            imageQueue.addEventListener("progress", (evt: Object): boolean => {
                text.text = StringResources.menus.loading + "\n" + Math.floor(evt["progress"] * 100).toString() + "%";
                return true;
            });

            //creates load complete action
            imageQueue.addEventListener("complete", (evt: Object): boolean => {
                if (this.loaded) this.loaded();
                return true;
            });

            //set default sound button
            gameui.Button.DefaultSoundId = "Interface Sound-06";

            //load font
            debussy = createSpriteSheetFromFont(debussyFont, this.imagePath);
            gameui.ImagesManager.loadFontSpriteSheet("debussy", debussy);

            debussyFontMini = createSpriteSheetFromFont(debussyFontMini, this.imagePath);
            gameui.ImagesManager.loadFontSpriteSheet("debussymini", debussyFontMini);
 
        }

        private imageManifest = [
            { id: "j1024", src: "j1024.png" },
            { id: "j2048", src: "j2048.png" },
            { id: "j4096", src: "j4096.png" },
            { id: "j8192", src: "j8192.png" },

            //{ id: "j16384", src: "j16384.png" },
            { id: "Background", src: "Background.jpg" },
            { id: "backhome", src: "BackMain.jpg" },
            { id: "bonus_bar", src: "bonus_bar.png" },
            { id: "bonus_border", src: "bonus_border.png" },
            { id: "bonus_icon", src: "bonus_icon.png" },
            { id: "font", src: "font.png" },
            { id: "font2", src: "font2.png" },
            { id: "e1", src: "e1.png" },
            { id: "e128", src: "e128.png" },
            { id: "e16", src: "e16.png" },
            { id: "e2", src: "e2.png" },
            { id: "e256", src: "e256.png" },
            { id: "e32", src: "e32.png" },
            { id: "e4", src: "e4.png" },
            { id: "e512", src: "e512.png" },
            { id: "e64", src: "e64.png" },
            { id: "e8", src: "e8.png" },
            { id: "e1024", src: "e1024.png" },
            { id: "e2048", src: "e2048.png" },
            { id: "e4096", src: "e4096.png" },
            { id: "e8192", src: "e8192.png" },
            //{ id: "e16384", src: "e16384.png" },
            { id: "footer", src: "footer.png" }, 
            { id: "j-1", src: "j-1.png" },
            { id: "e-1", src: "e-1.png" },
            { id: "j1", src: "j1.png" },
            { id: "j128", src: "j128.png" },
            { id: "j16", src: "j16.png" },
            { id: "j2", src: "j2.png" },
            { id: "j256", src: "j256.png" },
            { id: "j32", src: "j32.png" },
            { id: "j4", src: "j4.png" },
            { id: "j512", src: "j512.png" },
            { id: "j64", src: "j64.png" },
            { id: "j8", src: "j8.png" },
            { id: "time_border", src: "time_border.png" },
            { id: "shadow", src: "shadow.png" },
            { id: "particle", src: "Particle.png" },

            { id: "BtRestart", src: "BtRestart.png" },
            { id: "BtHome", src: "BtHome.png" },
            { id: "BtPlay", src: "BtPlay.png" },
            { id: "BtStore", src: "BtStore.png" },
            { id: "BtSettings", src: "BtSettings.png" },
            { id: "BtRefresh", src: "BtRefresh.png" },
            { id: "BtHelp", src: "BtHelp.png" },
            { id: "BtInfo", src: "BtInfo.png" },
            { id: "BtJelly", src: "BtJelly.png" },
            { id: "BtPause", src: "BtPause.png" },
            { id: "BtMusic", src: "BtMusic.png" },
            { id: "BtMusicOff", src: "BtMusicOff.png" },
            { id: "BtSound", src: "BtSound.png" },
            { id: "BtSoundOff", src: "BtSoundOff.png" },
            { id: "BtTutorial", src: "BtTutorial.png" },
            { id: "BtBoard", src: "BtBoard.png" },
            { id: "BtOk", src: "BtOk.png" },
            { id: "BtShare", src: "BtShare.png" },
            { id: "BtTextBg", src: "BtTextBg.png" },
            { id: "BtPlusMini", src: "BtPlusMini.png" },
            { id: "BtMenu", src: "BtMenu.png" },
            { id: "BtPlusMini", src: "BtPlusMini.png" },

            { id: "GameOverBgJelly", src: "GameOverBgJelly.png" },
            { id: "GameOverBgPoints", src: "GameOverBgPoints.png" },

            { id: "fxJoin", src: "fxJoin.png" },

            { id: "t0", src: "t0.png" },
            { id: "t1", src: "t1.png" },
            { id: "t2", src: "t2.png" },
            { id: "t3", src: "t3.png" },
            { id: "t4", src: "t4.png" },
            { id: "t5", src: "t5.png" },
            
            { id: "FlyBG", src: "FlyBG.png" },
            { id: "FlyGroup", src: "FlyGroup.png" },
            
            { id: "footer", src: "footer.png" },
            { id: "itemclean", src: "itemClean.png" },
            { id: "itemevolve", src: "itemEvolve.png" },
            { id: "itemfast", src: "itemFast.png" },
            { id: "itemrevive", src: "itemRevive.png" },
            { id: "itemtime", src: "itemTime.png" },
            { id: "itemPack", src: "itemPack.png" },
            { id: "lucky", src: "lucky.png" },
            { id: "itemBG", src: "itemBg.png" },
            { id: "itemBGDisabled", src: "itemBgDisabled.png" },

            { id: "tutorialFinger", src: "tutorialFinger.png" },
            { id: "tutorialFingerDown", src: "tutorialFingerDown.png" },
            { id: "ballon", src: "ballon.png" },
            { id: "pediaItem", src: "pediaItem.png" },
            { id: "BigBG", src: "BigBG.png" },


            { id: "freezeEffect", src: "freezeEffect.png" },
            { id: "fastEffect", src: "fastEffect.png" },
            { id: "reviveEffect", src: "reviveEffect.png" },
            { id: "cleanEffect", src: "cleanEffect.png" },

            { id: "check", src: "check.png" },
            { id: "unchecked", src: "unchecked.png" },
            { id: "MessageBox", src: "MessageBox.png" },
            { id: "popupdark", src: "popupdark.png" },
        ]

        private audioManifest = [
            { id: "sound_h1", src: "sound_h1.mp3" },
            { id: "sound_r1", src: "sound_r1.mp3" },

            { id: "sound_s1", src: "sound_s1.mp3" },
            { id: "sound_s2", src: "sound_s2.mp3" },
            { id: "sound_s3", src: "sound_s3.mp3" },

            { id: "sound_j1", src: "sound_j1.mp3" },
            { id: "sound_j2", src: "sound_j2.mp3" },
            { id: "sound_j3", src: "sound_j3.mp3" },
            { id: "sound_j4", src: "sound_j4.mp3" },

            { id: "levelUp", src: "levelUp.mp3" },

            { id: "sounditemfast", src: "sounditemfast.mp3" },
            { id: "sounditemclean", src: "sounditemclean.mp3" },
            { id: "sounditemrevive", src: "sounditemrevive.mp3" },
            { id: "sounditemtime", src: "sounditemtime.mp3" },

            { id: "Interface Sound-06", src: "Interface Sound-06.mp3" },
            { id: "Interface Sound-07", src: "Interface Sound-07.mp3" },
            { id: "Interface Sound-08", src: "Interface Sound-08.mp3" },
            { id: "Interface Sound-09", src: "Interface Sound-09.mp3" },
            { id: "Interface Sound-11", src: "Interface Sound-11.mp3" },
            { id: "Interface Sound-14", src: "Interface Sound-14.mp3" },
            { id: "Interface Sound-15", src: "Interface Sound-15.mp3" },
            { id: "end", src: "end.mp3" },

            { id: "musicIntro", src: "musicIntro.mp3" },
            { id: "music1", src: "music1.mp3" },
        ]
    }
}
