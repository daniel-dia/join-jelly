declare var debussy
declare var debussyFont
declare function createSpriteSheetFromFont(font: any, path: string);

module joinjelly {

    export class Loading extends gameui.ScreenState {

        public loaded: () => any;

        constructor() {
            super();
            this.initializeImages()
        }

        public initializeImages() {

            assetscale = 1;
            if (window.innerWidth <= 1024) assetscale = 0.5;
            if (window.innerWidth <= 384) assetscale = 0.25;
         
            var queue = gameui.AssetsManager.loadAssets(this.getAssetsManifest(assetscale));//, spriteSheets, images);

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
            debussy = createSpriteSheetFromFont(debussyFont, "assets/images_" + assetscale + "x/");
            gameui.AssetsManager.loadFontSpriteSheet("debussy", debussy);
        }

        private getAssetsManifest(scale: number): Array<any> {
            return [
                { id: "j1024", src: "assets/images_" + scale + "x/j1024.png" },
                { id: "j2048", src: "assets/images_" + scale + "x/j2048.png" },
                { id: "j4096", src: "assets/images_" + scale + "x/j4096.png" },
                { id: "j8192", src: "assets/images_" + scale + "x/j8192.png" },
                { id: "Background", src: "assets/images_" + scale + "x/Background.jpg" },
                { id: "Background2", src: "assets/images_" + scale + "x/Background2.jpg" },
                { id: "backhome", src: "assets/images_" + scale + "x/BackMain.jpg" },
                { id: "bonus_bar", src: "assets/images_" + scale + "x/bonus_bar.png" },
                { id: "bonus_border", src: "assets/images_" + scale + "x/bonus_border.png" },
                { id: "bt", src: "assets/images_" + scale + "x/bt.png" },
                { id: "ChubbyFont", src: "assets/images_" + scale + "x/ChubbyFont.png" },
                { id: "font", src: "assets/images_" + scale + "x/font.png" },
                { id: "e1", src: "assets/images_" + scale + "x/e1.png" },
                { id: "e128", src: "assets/images_" + scale + "x/e128.png" },
                { id: "e16", src: "assets/images_" + scale + "x/e16.png" },
                { id: "e2", src: "assets/images_" + scale + "x/e2.png" },
                { id: "e256", src: "assets/images_" + scale + "x/e256.png" },
                { id: "e32", src: "assets/images_" + scale + "x/e32.png" },
                { id: "e4", src: "assets/images_" + scale + "x/e4.png" },
                { id: "e512", src: "assets/images_" + scale + "x/e512.png" },
                { id: "e64", src: "assets/images_" + scale + "x/e64.png" },
                { id: "e8", src: "assets/images_" + scale + "x/e8.png" },
                { id: "footer", src: "assets/images_" + scale + "x/footer.png" },
                { id: "header", src: "assets/images_" + scale + "x/header.png" },
                { id: "htmlBG", src: "assets/images_" + scale + "x/htmlBG.jpg" },
                { id: "iconMenu", src: "assets/images_" + scale + "x/iconMenu.png" },
                { id: "iconPause", src: "assets/images_" + scale + "x/iconPause.png" },
                { id: "iconPlay", src: "assets/images_" + scale + "x/iconPlay.png" },
                { id: "j-1", src: "assets/images_" + scale + "x/j-1.png" },
                { id: "e-1", src: "assets/images_" + scale + "x/e-1.png" },
                { id: "j1", src: "assets/images_" + scale + "x/j1.png" },
                { id: "j128", src: "assets/images_" + scale + "x/j128.png" },
                { id: "j16", src: "assets/images_" + scale + "x/j16.png" },
                { id: "j2", src: "assets/images_" + scale + "x/j2.png" },
                { id: "j256", src: "assets/images_" + scale + "x/j256.png" },
                { id: "j32", src: "assets/images_" + scale + "x/j32.png" },
                { id: "j4", src: "assets/images_" + scale + "x/j4.png" },
                { id: "j512", src: "assets/images_" + scale + "x/j512.png" },
                { id: "j64", src: "assets/images_" + scale + "x/j64.png" },
                { id: "j8", src: "assets/images_" + scale + "x/j8.png" },
                { id: "pause", src: "assets/images_" + scale + "x/pause.png" },
                { id: "PlayBt", src: "assets/images_" + scale + "x/PlayBt.png" },
                { id: "StoreBt", src: "assets/images_" + scale + "x/StoreBt.png" },
                { id: "SettingsBt", src: "assets/images_" + scale + "x/SettingsBt.png" },
                { id: "RefreshBt", src: "assets/images_" + scale + "x/RefreshBt.png" },
                { id: "time_bar", src: "assets/images_" + scale + "x/time_bar.png" },
                { id: "time_bar_red", src: "assets/images_" + scale + "x/time_bar_red.png" },
                { id: "time_bar_bright", src: "assets/images_" + scale + "x/time_bar_bright.png" },
                { id: "time_border", src: "assets/images_" + scale + "x/time_border.png" },
                { id: "shadow", src: "assets/images_" + scale + "x/shadow.png" },
                { id: "particle", src: "assets/images_" + scale + "x/particle.png" },

                { id: "btHelp", src: "assets/images_" + scale + "x/btHelp.png" },
                { id: "btInfo", src: "assets/images_" + scale + "x/btInfo.png" },
                { id: "btJelly", src: "assets/images_" + scale + "x/btJelly.png" },
                { id: "btPause", src: "assets/images_" + scale + "x/btPause.png" },
                
                { id: "GameOverBgJelly", src: "assets/images_" + scale + "x/GameOverBgJelly.png" },
                { id: "GameOverBgPoints", src: "assets/images_" + scale + "x/GameOverBgPoints.png" },
                { id: "GameOverBoard", src: "assets/images_" + scale + "x/GameOverBoard.png" },
                { id: "GameOverOk", src: "assets/images_" + scale + "x/GameOverOk.png" },
                { id: "GameOverShare", src: "assets/images_" + scale + "x/GameOverShare.png" },
                { id: "GameOverBack", src: "assets/images_" + scale + "x/GameOverBack.png" },


                { id: "fxJoin", src: "assets/images_" + scale + "x/fxJoin.png" },

                { id: "t0", src: "assets/images_" + scale + "x/t0.png" },
                { id: "t1", src: "assets/images_" + scale + "x/t1.png" },
                { id: "t2", src: "assets/images_" + scale + "x/t2.png" },
                { id: "t3", src: "assets/images_" + scale + "x/t3.png" },
                { id: "t4", src: "assets/images_" + scale + "x/t4.png" },
                { id: "t5", src: "assets/images_" + scale + "x/t5.png" },

                { id: "Restart", src: "assets/images_" + scale + "x/Restart.png" },
                { id: "Home", src: "assets/images_" + scale + "x/Home.png" },
                { id: "FlyBG", src: "assets/images_" + scale + "x/FlyBG.png" },
                { id: "FlyGroup", src: "assets/images_" + scale + "x/FlyGroup.png" },
                { id: "BtMusic", src: "assets/images_" + scale + "x/BtMusic.png" },
                { id: "BtMusicOff", src: "assets/images_" + scale + "x/BtMusicOff.png" },
                { id: "BtSound", src: "assets/images_" + scale + "x/BtSound.png" },
                { id: "BtSoundOff", src: "assets/images_" + scale + "x/BtSoundOff.png" },

                { id: "footer", src: "assets/images_" + scale + "x/footer.png" },
                { id: "itemclean", src: "assets/images_" + scale + "x/itemClean.png" },
                { id: "itemfast", src: "assets/images_" + scale + "x/itemFast.png" },
                { id: "itemrevive", src: "assets/images_" + scale + "x/itemRevive.png" },
                { id: "itemtime", src: "assets/images_" + scale + "x/itemTime.png" },
                { id: "itemPack", src: "assets/images_" + scale + "x/itemPack.png" },
                { id: "lucky", src: "assets/images_" + scale + "x/lucky.png" },
                { id: "itemBG", src: "assets/images_" + scale + "x/itemBG.png" },
             
                { id: "About", src: "assets/images_" + scale + "x/About.png" },

                { id: "tutorialFinger", src: "assets/images_" + scale + "x/tutorialFinger.png" },
                { id: "ballon", src: "assets/images_" + scale + "x/ballon.png" },
                { id: "tutorial", src: "assets/images_" + scale + "x/tutorial.png" },

                { id: "pediaItem", src: "assets/images_" + scale + "x/pediaItem.png" },
                { id: "BigBG", src: "assets/images_" + scale + "x/BigBG.png" }, 


                { id: "freezeEffect", src: "assets/images_" + scale + "x/freezeEffect.png" }, 
                { id: "fastEffect", src: "assets/images_" + scale + "x/fastEffect.png" },
                { id: "reviveEffect", src: "assets/images_" + scale + "x/reviveEffect.png" },
                { id: "cleanEffect", src: "assets/images_" + scale + "x/cleanEffect.png" }, 
                
                { id: "check", src: "assets/images_" + scale + "x/check.png" },
                { id: "unchecked", src: "assets/images_" + scale + "x/unchecked.png" },
                { id: "MessageBox", src: "assets/images_" + scale + "x/MessageBox.png" },
               
           
                { id: "sound_h1", src: "Sounds/h1.mp3" },
                { id: "sound_r1", src: "Sounds/r1.mp3" },
                
                { id: "sound_s1", src: "Sounds/s1.mp3" },
                { id: "sound_s2", src: "Sounds/s2.mp3" },
                { id: "sound_s3", src: "Sounds/s3.mp3" },
                
                { id: "sound_j1", src: "Sounds/j1.mp3" },
                { id: "sound_j2", src: "Sounds/j2.mp3" },
                { id: "sound_j3", src: "Sounds/j3.mp3" },
                { id: "sound_j4", src: "Sounds/j4.mp3" },
                { id: "levelUp", src: "Sounds/levelUp.mp3" },
                
                { id: "Interface Sound-06", src: "Sounds/Interface Sound-06.mp3" },
                { id: "Interface Sound-07", src: "Sounds/Interface Sound-07.mp3" },
                { id: "Interface Sound-08", src: "Sounds/Interface Sound-08.mp3" },
                { id: "Interface Sound-09", src: "Sounds/Interface Sound-09.mp3" },
                { id: "Interface Sound-11", src: "Sounds/Interface Sound-11.mp3" },
                { id: "Interface Sound-14", src: "Sounds/Interface Sound-14.mp3" },
                { id: "Interface Sound-15", src: "Sounds/Interface Sound-15.mp3" },
                { id: "end", src: "Sounds/end.mp3" },
                
                { id: "musicIntro", src: "Sounds/musicIntro.mp3" },
                { id: "music1", src: "Sounds/music1.mp3" },

            ]
        }
    }
}
