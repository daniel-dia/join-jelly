﻿declare var debussyFont;
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
            PIXI.RETINA_PREFIX = /@(.+)x.+((png)|(jpg)|(xml)|(fnt))$/;

            assetscale = 1;
            if (window.innerWidth <= 1070) assetscale = 0.5;
            if (window.innerWidth <= 384) assetscale = 0.25;
          
            var imagePath = "assets/images@" + assetscale + "x/";
            var audioPath = "assets/sound/";

          
            ////load audio
            //if (!testMode && typeof WPAudioManager== 'undefined') {
            //    createjs.Sound.alternateExtensions = ["mp3"];
            //    createjs.Sound.registerSounds(audioManifest, audioPath);
            //}

            gameui.AssetsManager.loadAssets(imageManifest, imagePath);
            gameui.AssetsManager.loadFontSpriteSheet("debussyBig", "debussyBig.fnt");
            gameui.AssetsManager.loadFontSpriteSheet("debussy", "debussy.fnt"); 
            gameui.AssetsManager.load();

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
            gameui.AssetsManager.onComplete = () => {
                if (this.loaded) this.loaded();
            }
            			
            // Adds Background
            this.background.addChild(gameui.AssetsManager.getBitmap(imagePath + "BackMain.jpg"));

        }
    }

    class LoadingBar extends PIXI.Container {

        private barMask;

        constructor(imagePath: string) {
            super();

            //var text = gameui.AssetsManager.getBitmapText(StringResources.menus.loading.toUpperCase(), "fontWhite");// defaultFontFamilyNormal, 0xFFFFFF);
            var bg = gameui.AssetsManager.getBitmap(imagePath + "bonus_border.png");
            var bar = gameui.AssetsManager.getBitmap(imagePath + "bonus_bar.png");

            this.addChild(bg)
            //this.addChild(text)
            this.addChild(bar);
            var w = 795;
            var h = 104;

            //text.pivot.x = text.getLocalBounds().width / 2;
            bar.pivot.x = Math.floor(bg.pivot.x = w / 2)
            bar.pivot.y = Math.floor(bg.pivot.y = h / 2)
            
            //text.y = -200;

            this.barMask = new PIXI.Graphics().beginFill(0xFF0000, 1).drawRect(0, -h / 2, w, h).endFill();;

            this.barMask.x = -w / 2;
            bar.mask = this.barMask;
            this.addChild(this.barMask);
            this.update(0);
        }

        public update(value: number) {
            this.barMask.scale.x = value / 100;

        }
    }
}
