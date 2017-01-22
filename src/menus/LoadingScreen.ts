declare var debussyFont;
declare var debussyFontBig;
declare var imageManifest;
declare var audioManifest;
declare var WPAudioManager;

declare function createSpriteSheetFromFont(font: any, path: string);

module joinjelly.menus {

    export class Loading extends gameui.ScreenState {

        public loaded: () => any;

        constructor(scale: number) {
            super();
            PIXI.RETINA_PREFIX = /@(.+)x.+((png)|(jpg)|(xml)|(json)|(fnt))$/;

            JoinJelly.gameScreen.currentScreen

            assetscale = 1;
            if (scale < 0.75) assetscale = 0.5;
            if (scale < 0.375) assetscale = 0.25;

            var imagePath = "/assets/";
            var audioPath = "/assets/sounds/";  
            
            //load audio
            if (!testMode && typeof WPAudioManager == 'undefined') {
                createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.registerSounds(audioManifest, audioPath);
            }
            gameui.AssetsManager.loadAssets(imageManifest, imagePath);

            gameui.AssetsManager.loadFontSpriteSheet("debussy", "debussy@" + assetscale + "x.fnt");
            gameui.AssetsManager.loadFontSpriteSheet("debussyBig", "debussyBig@" + assetscale + "x.fnt");

            //gameui.AssetsManager.loader.baseUrl = "";

            gameui.AssetsManager.loadSpriteSheet("s1", "Sprites-1@" + assetscale + "x.json");
            gameui.AssetsManager.loadSpriteSheet("s2", "Sprites-2@" + assetscale + "x.json");
            gameui.AssetsManager.loadSpriteSheet("s3", "Sprites-3@" + assetscale + "x.json");
            gameui.AssetsManager.loadSpriteSheet("s4", "Sprites-4@" + assetscale + "x.json");
            gameui.AssetsManager.loadSpriteSheet("s5", "Sprites-5@" + assetscale + "x.json");

            // set default sound button
            gameui.Button.DefaultSoundId = "Interface Sound-06";

            // adds a loading bar
            var loadinBar = new LoadingBar(imagePath);
            this.content.addChild(loadinBar);
            loadinBar.x = defaultWidth / 2;
            loadinBar.y = defaultHeight / 2;


            //add update % functtion
            gameui.AssetsManager.onProgress = (progress: number) => {
                loadinBar.update(progress)
            };

            //creates load complete action
            gameui.AssetsManager.onComplete = () => { };

            gameui.AssetsManager.load(this.loaded);

            // Adds Background
            //this.background.addChild(gameui.AssetsManager.getBitmap(imagePath + "BackMain.jpg"));



            gameui.AssetsManager.load(() => {
                if (this.loaded) this.loaded();
            });

        }
    }

    class LoadingBar extends PIXI.Container {

        private barMask;

        constructor(imagePath: string) {
            super();
            //
            //
            //    var bg = gameui.AssetsManager.getBitmap(imagePath + "bonus_border.png");
            //    var bar = gameui.AssetsManager.getBitmap(imagePath + "bonus_bar.png");
            //
            //
            //    this.addChild(bg)
            //    this.addChild(bar);
            //
            //    var w = 939;
            //    var h = 57;
            //
            //    bar.x = - w / 2 - 40;
            //    bar.y = 87;
            //    bg.pivot.x = 1131 / 2;
            //
            //    //var text = gameui.AssetsManager.getBitmapText(StringResources.menus.loading.toUpperCase(), "debussy");// defaultFontFamilyNormal, 0xFFFFFF);
            //    //this.addChild(text)
            //    //text.pivot.x = text.getLocalBounds().width / 2;
            //    //text.y = -100;
            //    //text.y = -200;
            //
            //    this.barMask = new PIXI.Graphics().beginFill(0xFF0000, 1).drawRect(0, 0, w, h).endFill();
            //
            //    this.barMask.x = bar.x;
            //    this.barMask.y = bar.y;
            //    bar.mask = this.barMask;
            //    this.addChild(this.barMask);
            //    this.update(0);
        }

        public update(value: number) {
            //this.barMask.scale.x = value / 100;
        }
    }
}
