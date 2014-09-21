module fpair {

    export class Loading extends gameui.ScreenState {

        public loaded: () => any;

        constructor() {
            super();
            this.initializeImages()
            }

        public initializeImages() {

            var loader = gameui.AssetsManager.loadAssets(this.getAssetsManifest(1));//, spriteSheets, images);

            //var loader = Assets.loadAssets();
            var text = new createjs.Text("", "600 90px Arial", "#FFF");
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


        private getAssetsManifest(scale:number) :Array<any>{
           return [
                { id: "1024", src: "assets/1024.png" },
                { id: "2048", src: "assets/2048.png" },
                { id: "4096", src: "assets/4096.png" },
                { id: "8192", src: "assets/8192.png" },
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
               { id: "time_border", src: "assets/time_border.png" },
               { id: "shadow", src: "assets/shadow.png" },
            ]
        }


    }
}
