
module joinjelly {

    export class Loading extends gameui.ScreenState {

        public loaded: () => any;

        constructor() {
            super();
            this.initializeImages()
            }

        public initializeImages() {

            var loader = gameui.AssetsManager.loadAssets(this.getAssetsManifest(1));//, spriteSheets, images);

            //var loader = Assets.loadAssets();
            var text = new createjs.Text("", "90px Arial", "#FFF");
            text.x = defaultWidth / 2;
            text.y = defaultHeight / 2;
            text.textAlign = "center"

            this.content.addChild(text);

            //add update% functtion
            loader.addEventListener("progress", (evt: Object): boolean => {
                text.text = /*stringResources.ld*/ "Loading" + "\n" + Math.floor(evt["progress"] * 100).toString() + "%";
                return true;
            });

            //creates load complete action
            loader.addEventListener("complete", (evt: Object): boolean => {
                if (this.loaded) this.loaded();
                return true;
            });
        }


        private getAssetsManifest(scale: number): Array<any> {
           return [
                { id: "j1024", src: "assets/j1024.png" },
                { id: "j2048", src: "assets/j2048.png" },
                { id: "j4096", src: "assets/j4096.png" },
                { id: "j8192", src: "assets/j8192.png" },
                { id: "Background", src: "assets/Background.jpg" },
                { id: "Background2", src: "assets/Background2.jpg" },
                { id: "backhome", src: "assets/backhome.jpg" },
                { id: "bonus_bar", src: "assets/bonus_bar.png" },
                { id: "bonus_border", src: "assets/bonus_border.png" },
                { id: "bt", src: "assets/bt.png" },
                { id: "ChubbyFont", src: "assets/ChubbyFont.png" },
                { id: "Deburil", src: "assets/Deburil.png" },
                { id: "e1", src: "assets/e1.png" },
                { id: "e128", src: "assets/e128.png" },
                { id: "e16", src: "assets/e16.png" },
                { id: "e2", src: "assets/e2.png" },
                { id: "e256", src: "assets/e256.png" },
                { id: "e32", src: "assets/e32.png" },
                { id: "e4", src: "assets/e4.png" },
                { id: "e512", src: "assets/e512.png" },
                { id: "e64", src: "assets/e64.png" },
                { id: "e8", src: "assets/e8.png" },
                { id: "footer", src: "assets/footer.png" },
                { id: "header", src: "assets/header.png" },
                { id: "htmlBG", src: "assets/htmlBG.jpg" },
                { id: "iconMenu", src: "assets/iconMenu.png" },
                { id: "iconPause", src: "assets/iconPause.png" },
                { id: "iconPlay", src: "assets/iconPlay.png" },
                { id: "j1", src: "assets/j1.png" },
                { id: "j128", src: "assets/j128.png" },
                { id: "j16", src: "assets/j16.png" },
                { id: "j2", src: "assets/j2.png" },
                { id: "j256", src: "assets/j256.png" },
                { id: "j32", src: "assets/j32.png" },
                { id: "j4", src: "assets/j4.png" },
                { id: "j512", src: "assets/j512.png" },
                { id: "j64", src: "assets/j64.png" },
                { id: "j8", src: "assets/j8.png" },
                { id: "pause", src: "assets/pause.png" },
                { id: "PlayBt", src: "assets/PlayBt.png" },
                { id: "time_bar", src: "assets/time_bar.png" },
                { id: "time_bar_red", src: "assets/time_bar_red.png" },
                { id: "time_bar_bright", src: "assets/time_bar_bright.png" },
                { id: "time_border", src: "assets/time_border.png" },
                { id: "shadow", src: "assets/shadow.png" },
                { id: "particle", src: "assets/particle.png" },

               { id: "GameOverBgJelly", src: "assets/GameOverBgJelly.png" },
               { id: "GameOverBgPoints", src: "assets/GameOverBgPoints.png" },
               { id: "GameOverBoard", src: "assets/GameOverBoard.png" },
               { id: "GameOverOk", src: "assets/GameOverOk.png" },
               { id: "GameOverShare", src: "assets/GameOverShare.png" },
               { id: "GameOverBack", src: "assets/GameOverBack.png" },
          
               { id: "GameOverBgJelly", src: "assets/GameOverBgJelly.png" },
               { id: "GameOverBgPoints", src: "assets/GameOverBgPoints.png" },
               { id: "GameOverBoard", src: "assets/GameOverBoard.png" },
               { id: "GameOverOk", src: "assets/GameOverOk.png" },
               { id: "GameOverShare", src: "assets/GameOverShare.png" },
               { id: "GameOverBack", src: "assets/GameOverBack.png" },
                        
               { id: "t0", src: "assets/t0.png" },
               { id: "t1", src: "assets/t1.png" },
               { id: "t2", src: "assets/t2.png" },
               { id: "t3", src: "assets/t3.png" },
               { id: "t4", src: "assets/t4.png" },
               { id: "t5", src: "assets/t5.png" },

               { id: "Restart", src: "assets/Restart.png" },
               { id: "Home", src: "assets/Home.png" },
               { id: "FlyBG", src: "assets/FlyBG.png" },
               { id: "FlyGroup", src: "assets/FlyGroup.png" },
               { id: "BtMusic", src: "assets/BtMusic.png" },
               { id: "BtMusicOff", src: "assets/BtMusicOff.png" },
               { id: "BtSound", src: "assets/BtSound.png" },
               { id: "BtSoundOff", src: "assets/BtSoundOff.png" },

               { id: "About", src: "assets/About.png" },
               
               //{ id: "bg1", src: "Sounds/bg1.mp3" },


               //{ id: "h1", src: "Sounds/h1.mp3" },
               //{ id: "r1", src: "Sounds/r1.mp3" },
               //
               //{ id: "s1", src: "Sounds/s1.mp3" },
               //{ id: "s2", src: "Sounds/s2.mp3" },
               //{ id: "s3", src: "Sounds/s3.mp3" },
               //
               //{ id: "j1", src: "Sounds/j1.mp3" },
               //{ id: "j2", src: "Sounds/j2.mp3" },
               //{ id: "j3", src: "Sounds/j3.mp3" },
               //{ id: "j4", src: "Sounds/j4.mp3" },
          
            ]
        }
    }
}
