declare var debussyFont;
declare var debussyFontBig;
declare var imageManifest;
declare var audioManifest;
declare var WPAudioManager;

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
            if (window.innerWidth <= 1070) assetscale = 0.5;
            if (window.innerWidth <= 384) assetscale = 0.25;
            imagePath = "assets/images_" + assetscale + "x/";

          
            //load audio
            if (!testMode && typeof WPAudioManager== 'undefined') {
                createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.registerSounds(audioManifest, audioPath);
            }

            gameui.AssetsManager.loadAssets(imageManifest, imagePath);
            gameui.AssetsManager.loadFontSpriteSheet("debussy", createSpriteSheetFromFont(debussyFont, imagePath));
            gameui.AssetsManager.loadFontSpriteSheet("debussyBig", createSpriteSheetFromFont(debussyFontBig, imagePath));
			   
            // add update % function and complete action
            gameui.AssetsManager.onProgress = (progress: any) => { loadinBar.update(progress); };
            gameui.AssetsManager.onComplete = () => { if (this.loaded) this.loaded(); };
			
            // Adds Background
            this.background.addChild(gameui.AssetsManager.getBitmap(imagePath + "BackMain.jpg"));
       

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
