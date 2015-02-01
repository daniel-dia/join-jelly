declare var debussy
declare var debussyFont
declare function createSpriteSheetFromFont(font: any, path: string);

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

            var queue = gameui.ImagesManager.loadAssets(this.assetManifest() );//, spriteSheets, images);
            
            //loader text
            var text = new createjs.Text("", "90px Arial", "#FFF");
            text.x = defaultWidth / 2;
            text.y = defaultHeight / 2;
            text.textAlign = "center"
            this.content.addChild(text);

            //loading animation
            var anim = new view.LoadingBall();
            anim.x = defaultWidth / 2 ;
            anim.y = defaultHeight / 2 + 400;
            this.content.addChild(anim);

            //add update% functtion
            queue.addEventListener("progress", (evt: Object): boolean => {
                text.text = StringResources.menus.loading + "\n" + Math.floor(evt["progress"] * 100).toString() + "%";
                return true;
            });

            //creates load complete action
            queue.addEventListener("complete", (evt: Object): boolean => {
                if (this.loaded) this.loaded();
                return true;
            });

            //set default sound button
            gameui.Button.DefaultSoundId = "Interface Sound-06";

             //load font
            debussy = createSpriteSheetFromFont(debussyFont,this.imagePath);
            gameui.ImagesManager.loadFontSpriteSheet("debussy", debussy);
        }

        private assetManifest() {return [
            { id: "j1024", src: this.imagePath +"j1024.png" },
            { id: "j2048", src: this.imagePath +"j2048.png" },
            { id: "j4096", src: this.imagePath +"j4096.png" },
            { id: "j8192", src: this.imagePath +"j8192.png" },

            { id: "j16384", src: this.imagePath +"j16384.png" },
            { id: "Background", src: this.imagePath +"Background.jpg" },
            { id: "backhome", src: this.imagePath +"BackMain.jpg" },
            { id: "bonus_bar", src: this.imagePath +"bonus_bar.png" },
            { id: "bonus_border", src: this.imagePath +"bonus_border.png" },
            { id: "ChubbyFont", src: this.imagePath +"ChubbyFont.png" },
            { id: "font", src: this.imagePath +"font.png" },
            { id: "e1", src: this.imagePath +"e1.png" },
            { id: "e128", src: this.imagePath +"e128.png" },
            { id: "e16", src: this.imagePath +"e16.png" },
            { id: "e2", src: this.imagePath +"e2.png" },
            { id: "e256", src: this.imagePath +"e256.png" },
            { id: "e32", src: this.imagePath +"e32.png" },
            { id: "e4", src: this.imagePath +"e4.png" },
            { id: "e512", src: this.imagePath +"e512.png" },
            { id: "e64", src: this.imagePath +"e64.png" },
            { id: "e8", src: this.imagePath +"e8.png" },
            { id: "e1024", src: this.imagePath +"e1024.png" },
            { id: "e2048", src: this.imagePath +"e2048.png" },
            { id: "e4096", src: this.imagePath +"e4096.png" },
            { id: "e8192", src: this.imagePath +"e8192.png" },
            { id: "e16384", src: this.imagePath +"e16384.png" },
            { id: "footer", src: this.imagePath +"footer.png" },
            { id: "header", src: this.imagePath +"header.png" },
            { id: "j-1", src: this.imagePath +"j-1.png" },
            { id: "e-1", src: this.imagePath +"e-1.png" },
            { id: "j1", src: this.imagePath +"j1.png" },
            { id: "j128", src: this.imagePath +"j128.png" },
            { id: "j16", src: this.imagePath +"j16.png" },
            { id: "j2", src: this.imagePath +"j2.png" },
            { id: "j256", src: this.imagePath +"j256.png" },
            { id: "j32", src: this.imagePath +"j32.png" },
            { id: "j4", src: this.imagePath +"j4.png" },
            { id: "j512", src: this.imagePath +"j512.png" },
            { id: "j64", src: this.imagePath +"j64.png" },
            { id: "j8", src: this.imagePath +"j8.png" },
            { id: "time_bar", src: this.imagePath +"time_bar.png" },
            { id: "time_bar_red", src: this.imagePath +"time_bar_red.png" },
            { id: "time_bar_bright", src: this.imagePath +"time_bar_bright.png" },
            { id: "time_border", src: this.imagePath +"time_border.png" },
            { id: "shadow", src: this.imagePath +"shadow.png" },
            { id: "particle", src: this.imagePath +"Particle.png" },

            { id: "BtRestart", src: this.imagePath +"BtRestart.png" },
            { id: "BtHome", src: this.imagePath +"BtHome.png" },
            { id: "BtPlay", src: this.imagePath +"BtPlay.png" },
            { id: "BtStore", src: this.imagePath +"BtStore.png" },
            { id: "BtSettings", src: this.imagePath +"BtSettings.png" },
            { id: "BtRefresh", src: this.imagePath +"BtRefresh.png" },
            { id: "BtHelp", src: this.imagePath +"BtHelp.png" },
            { id: "BtInfo", src: this.imagePath +"BtInfo.png" },
            { id: "BtJelly", src: this.imagePath +"BtJelly.png" },
            { id: "BtPause", src: this.imagePath +"BtPause.png" },
            { id: "BtMusic", src: this.imagePath +"BtMusic.png" },
            { id: "BtMusicOff", src: this.imagePath +"BtMusicOff.png" },
            { id: "BtSound", src: this.imagePath +"BtSound.png" },
            { id: "BtSoundOff", src: this.imagePath +"BtSoundOff.png" },
            { id: "BtTutorial", src: this.imagePath +"BtTutorial.png" },
            { id: "BtBoard", src: this.imagePath +"BtBoard.png" },
            { id: "BtOk", src: this.imagePath +"BtOk.png" },
            { id: "BtShare", src: this.imagePath +"BtShare.png" },
            { id: "BtTextBg", src: this.imagePath +"BtTextBg.png" },
            { id: "BtPlusMini", src: this.imagePath +"BtPlusMini.png" },
            { id: "BtMenu", src: this.imagePath +"BtMenu.png" },
            { id: "BtPlusMini", src: this.imagePath +"BtPlusMini.png" },

            { id: "GameOverBgJelly", src: this.imagePath +"GameOverBgJelly.png" },
            { id: "GameOverBgPoints", src: this.imagePath +"GameOverBgPoints.png" },

            { id: "fxJoin", src: this.imagePath +"fxJoin.png" },

            { id: "t0", src: this.imagePath +"t0.png" },
            { id: "t1", src: this.imagePath +"t1.png" },
            { id: "t2", src: this.imagePath +"t2.png" },
            { id: "t3", src: this.imagePath +"t3.png" },
            { id: "t4", src: this.imagePath +"t4.png" },
            { id: "t5", src: this.imagePath +"t5.png" },


            { id: "FlyBG", src: this.imagePath +"FlyBG.png" },
            { id: "FlyGroup", src: this.imagePath +"FlyGroup.png" },


            { id: "footer", src: this.imagePath +"footer.png" },
            { id: "itemclean", src: this.imagePath +"itemClean.png" },
            { id: "itemfast", src: this.imagePath +"itemFast.png" },
            { id: "itemrevive", src: this.imagePath +"itemRevive.png" },
            { id: "itemtime", src: this.imagePath +"itemTime.png" },
            { id: "itemPack", src: this.imagePath +"itemPack.png" },
            { id: "lucky", src: this.imagePath +"lucky.png" },
            { id: "itemBG", src: this.imagePath +"itemBg.png" },
            { id: "itemBGDisabled", src: this.imagePath +"itemBgDisabled.png" },

            { id: "tutorialFinger", src: this.imagePath +"tutorialFinger.png" },
            { id: "tutorialFingerDown", src: this.imagePath +"tutorialFingerDown.png" },
            { id: "ballon", src: this.imagePath +"ballon.png" },
            { id: "pediaItem", src: this.imagePath +"pediaItem.png" },
            { id: "BigBG", src: this.imagePath +"BigBG.png" },


            { id: "freezeEffect", src: this.imagePath +"freezeEffect.png" },
            { id: "fastEffect", src: this.imagePath +"fastEffect.png" },
            { id: "reviveEffect", src: this.imagePath +"reviveEffect.png" },
            { id: "cleanEffect", src: this.imagePath +"cleanEffect.png" },

            { id: "check", src: this.imagePath +"check.png" },
            { id: "unchecked", src: this.imagePath +"unchecked.png" },
            { id: "MessageBox", src: this.imagePath +"MessageBox.png" },

 
             //{ id: "sound_h1",            src: "assets/sounds/sound_h1.mp3" },
             //{ id: "sound_r1",            src: "assets/sounds/sound_r1.mp3" },
             
             //{ id: "sound_s1",            src: "assets/sounds/sound_s1.mp3" },
             //{ id: "sound_s2",            src: "assets/sounds/sound_s2.mp3" },
             //{ id: "sound_s3",            src: "assets/sounds/sound_s3.mp3" },
             
             //{ id: "sound_j1",            src: "assets/sounds/sound_j1.mp3" },
             //{ id: "sound_j2",            src: "assets/sounds/sound_j2.mp3" },
             //{ id: "sound_j3",            src: "assets/sounds/sound_j3.mp3" },
             //{ id: "sound_j4",            src: "assets/sounds/sound_j4.mp3" },

             //{ id: "levelUp",             src:  "assets/sounds/levelUp.mp3" },
             
             //{ id: "sounditemfast",       src:   "assets/sounds/itemfast.mp3" },
             //{ id: "sounditemclean",      src:  "assets/sounds/itemclean.mp3" },
             //{ id: "sounditemrevive",     src: "assets/sounds/itemrevive.mp3" },
             //{ id: "sounditemtime",       src:   "assets/sounds/itemtime.mp3" },
             
             //{ id: "Interface Sound-06",  src: "assets/sounds/Interface Sound-06.mp3" },
             //{ id: "Interface Sound-07",  src: "assets/sounds/Interface Sound-07.mp3" },
             //{ id: "Interface Sound-08",  src: "assets/sounds/Interface Sound-08.mp3" },
             //{ id: "Interface Sound-09",  src: "assets/sounds/Interface Sound-09.mp3" },
             //{ id: "Interface Sound-11",  src: "assets/sounds/Interface Sound-11.mp3" },
             //{ id: "Interface Sound-14",  src: "assets/sounds/Interface Sound-14.mp3" },
             //{ id: "Interface Sound-15",  src: "assets/sounds/Interface Sound-15.mp3" },
             //{ id: "end",                 src: "assets/sounds/end.mp3" },
             
             //{ id: "musicIntro",          src: "assets/sounds/musicIntro.mp3" },
             //{ id: "music1",              src: "assets/sounds/music1.mp3" },
        ]
        }
    }
}
