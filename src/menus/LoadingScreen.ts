declare var debussyFont;
declare var debussyFontBig;
declare var imageManifest;
declare var audioManifest;

declare function createSpriteSheetFromFont(font: any, path: string);

module joinjelly.menus {

    export class Loading extends gameui.ScreenState {

        public loaded: () => any;

        constructor() {
            super();

            // set path
            var audioPath = "assets/sounds/";
            var imagePath = "assets/images/";

            // define path to load by plataform and screen size
            assetscale = 1;
            if (window.innerWidth <= 1024) assetscale = 0.5;
            if (window.innerWidth <= 384) assetscale = 0.25;
            if (assetscale != 1) imagePath = "assets/images_" + assetscale + "x/";

          
            gameui.AssetsManager.loadAssets(imageManifest, imagePath);
            gameui.AssetsManager.loadFontSpriteSheet("debussy", createSpriteSheetFromFont(debussyFont, imagePath));
            gameui.AssetsManager.loadFontSpriteSheet("debussyBig", createSpriteSheetFromFont(debussyFontBig, imagePath));

            //load audio
            if (!testMode) {
                //load assets
                if (!Cocoon.Device.getDeviceInfo() || Cocoon.Device.getDeviceInfo().os == "windows")
                    gameui.AssetsManager.loadAssets(audioManifest, audioPath);
                else
                    createjs.Sound.registerManifest(audioManifest, audioPath);
            }



            // add update % function and complete action
            gameui.AssetsManager.onProgress = (progress: any) => { loadinBar.update(progress); };
            gameui.AssetsManager.onComplete = () => { if (this.loaded) this.loaded(); };

     

            // set default sound button
            gameui.Button.DefaultSoundId = "Interface Sound-06";

            // adds a loading bar
            var loadinBar = new view.LoadingBar(imagePath);
            this.content.addChild(loadinBar);
            loadinBar.x = defaultWidth / 2;
            loadinBar.y = defaultHeight / 2;


        }
    }
}
