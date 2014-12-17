﻿module gameui {

    // Class
    export class AssetsManager{

        private static loader: createjs.LoadQueue;
        private static spriteSheets: Array<any>;
        private static imagesArray: Array<HTMLImageElement>;
        private static bitmapFontSpriteSheetDataArray: Array<any>;
        private static assetsManifest: Array<any>;

        //load assets
        public static loadAssets(assetsManifest: Array<any>, spriteSheets?: Array<any>,imagesArray?:Array<HTMLImageElement>): createjs.LoadQueue {

            //cleans previous loaded assets.
            this.cleanAssets();

            // initialize objects
            this.spriteSheets = spriteSheets ? spriteSheets : new Array();
            this.imagesArray = imagesArray ? imagesArray : new Array();
            this.bitmapFontSpriteSheetDataArray = new Array();
            this.assetsManifest = assetsManifest;
            
            //creates a preload queue
            this.loader = new createjs.LoadQueue(false);
            
            //install sound plug-in for sounds format
            this.loader.installPlugin(createjs.Sound);

            //create eventListeners
            this.loader.addEventListener("fileload", (evt: any): boolean => {
                if (evt.item.type == "image") 
                    this.imagesArray[evt.item.id] = <HTMLImageElement>evt.result;

                return true;
            });
            
            //loads entire manifest
            this.loader.loadManifest(this.assetsManifest);

            return this.loader;
        }
        
        public static loadFontSpriteSheet(id:string,spritesheetData: any) {
            this.bitmapFontSpriteSheetDataArray[id] = spritesheetData;
        }

        // cleans all sprites in the bitmap array;
        public static cleanAssets() {
            if (this.imagesArray);
            for (var i in this.imagesArray) {
                delete this.imagesArray[i]
            }
        }

        public static getImagesArray(): Array<HTMLImageElement> {
            return this.imagesArray;
        }

        //gets a image from assets
        public static getBitmap(name: string): createjs.DisplayObject {

            //if image id is described in spritesheets
            if (this.spriteSheets)
            if (this.spriteSheets[name])
                return this.getSprite(name, false);

            //if image is preloaded
            var image = this.getLoadedImage(name);
            if (image)
                return new createjs.Bitmap(image);

            //or else try grab by filename
            return new createjs.Bitmap(name);

        }

        public static getBitmapText(text:string, bitmapFontId:string):createjs.BitmapText { 
            var bt = new createjs.BitmapText(text, new createjs.SpriteSheet(this.bitmapFontSpriteSheetDataArray[bitmapFontId]));
            bt.lineHeight = 100;
            return bt;
        }

        //Get a preloaded Image from assets
        private static getLoadedImage(name: string): HTMLImageElement {
            if (this.loader)
                return <HTMLImageElement>this.loader.getResult(name);
            return null;
        }
        
        //DEPRECIATED
        //get a movie clip
        public static getMovieClip(name: string): createjs.Sprite {
            var t: createjs.Sprite = new window[name];
            return t;
        }

        //return a sprite according to the image
        public static getSprite (name: string, play:boolean=true): createjs.Sprite {
            var data = this.spriteSheets[name];
            for (var i in data.images) if (typeof data.images[i] == "string") data.images[i] = this.getLoadedImage(data.images[i]);

            var spritesheet = new createjs.SpriteSheet(data);

            var sprite = new createjs.Sprite(spritesheet);
            if (play) sprite.play();
            return sprite;
        }

        public static playSound(name: string,interrupt?:boolean,delay:number=0,offset?:number,loop?:number,volume:number=1):createjs.SoundInstance {
            return createjs.Sound.play(name, interrupt, delay,offset,loop,volume);
        }

        private static currentMusicName: string;
        private static currentMusic: createjs.SoundInstance

        public static playMusic(name: string,volume:number=1) {



            if (this.currentMusic) {
                this.currentMusic.setVolume(volume);
                if (this.currentMusicName == name) return;

                this.currentMusic.stop();
                delete this.currentMusic;
            }

            this.currentMusicName = name;
            this.currentMusic = createjs.Sound.play(name,null,null,null,-1);
            this.currentMusic.setVolume(volume);


        }
    }
}