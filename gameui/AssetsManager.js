var gameui;
(function (gameui) {
    // Class
    var AssetsManager = (function () {
        function AssetsManager() {
        }
        //load assets
        AssetsManager.loadAssets = function (assetsManifest, spriteSheets, imagesArray) {
            var _this = this;
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
            this.loader.addEventListener("fileload", function (evt) {
                if (evt.item.type == "image")
                    _this.imagesArray[evt.item.id] = evt.result;
                return true;
            });
            //loads entire manifest
            this.loader.loadManifest(this.assetsManifest);
            return this.loader;
        };
        AssetsManager.loadFontSpriteSheet = function (id, spritesheetData) {
            this.bitmapFontSpriteSheetDataArray[id] = spritesheetData;
        };
        // cleans all sprites in the bitmap array;
        AssetsManager.cleanAssets = function () {
            if (this.imagesArray)
                ;
            for (var i in this.imagesArray) {
                delete this.imagesArray[i];
            }
        };
        AssetsManager.getImagesArray = function () {
            return this.imagesArray;
        };
        //gets a image from assets
        AssetsManager.getBitmap = function (name) {
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
        };
        AssetsManager.getBitmapText = function (text, bitmapFontId) {
            var bt = new createjs.BitmapText(text, new createjs.SpriteSheet(this.bitmapFontSpriteSheetDataArray[bitmapFontId]));
            bt.lineHeight = 100;
            return bt;
        };
        //Get a preloaded Image from assets
        AssetsManager.getLoadedImage = function (name) {
            if (this.loader)
                return this.loader.getResult(name);
            return null;
        };
        //DEPRECIATED
        //get a movie clip
        AssetsManager.getMovieClip = function (name) {
            var t = new window[name];
            return t;
        };
        //return a sprite according to the image
        AssetsManager.getSprite = function (name, play) {
            if (play === void 0) { play = true; }
            var data = this.spriteSheets[name];
            for (var i in data.images)
                if (typeof data.images[i] == "string")
                    data.images[i] = this.getLoadedImage(data.images[i]);
            var spritesheet = new createjs.SpriteSheet(data);
            var sprite = new createjs.Sprite(spritesheet);
            if (play)
                sprite.play();
            return sprite;
        };
        AssetsManager.playSound = function (name, interrupt, delay, offset, loop, volume) {
            if (delay === void 0) { delay = 0; }
            if (volume === void 0) { volume = 1; }
            return createjs.Sound.play(name, interrupt, delay, offset, loop, volume);
        };
        AssetsManager.playMusic = function (name, volume) {
            if (volume === void 0) { volume = 1; }
            if (this.currentMusic) {
                this.currentMusic.setVolume(volume);
                if (this.currentMusicName == name)
                    return;
                this.currentMusic.stop();
                delete this.currentMusic;
            }
            this.currentMusicName = name;
            this.currentMusic = createjs.Sound.play(name, null, null, null, -1);
            this.currentMusic.setVolume(volume);
        };
        return AssetsManager;
    })();
    gameui.AssetsManager = AssetsManager;
})(gameui || (gameui = {}));
//# sourceMappingURL=AssetsManager.js.map