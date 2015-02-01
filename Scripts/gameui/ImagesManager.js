var gameui;
(function (gameui) {
    // Class
    var ImagesManager = (function () {
        function ImagesManager() {
        }
        //load assets
        ImagesManager.loadAssets = function (assetsManifest, path, spriteSheets, imagesArray) {
            var _this = this;
            if (path === void 0) { path = ""; }
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
            this.loader.loadManifest(this.assetsManifest, true, path);
            return this.loader;
        };
        // load a font spritesheet
        ImagesManager.loadFontSpriteSheet = function (id, spritesheetData) {
            this.bitmapFontSpriteSheetDataArray[id] = spritesheetData;
        };
        // cleans all sprites in the bitmap array;
        ImagesManager.cleanAssets = function () {
            if (this.imagesArray)
                ;
            for (var i in this.imagesArray) {
                var img = this.imagesArray[i];
                if (img.dispose)
                    img.dispose();
                delete this.imagesArray[i];
            }
        };
        // return loaded image array
        ImagesManager.getImagesArray = function () {
            return this.imagesArray;
        };
        //gets a image from assets
        ImagesManager.getBitmap = function (name) {
            //if image id is described in spritesheets
            if (this.spriteSheets)
                if (this.spriteSheets[name])
                    return this.getSprite(name, false);
            //if image is preloaded
            var image = this.getLoadedImage(name);
            if (image) {
                var imgobj = new createjs.Bitmap(image);
                imgobj.mouseEnabled = ImagesManager.defaultMouseEnabled;
                return imgobj;
            }
            //or else try grab by filename
            var imgobj = new createjs.Bitmap(name);
            imgobj.mouseEnabled = ImagesManager.defaultMouseEnabled;
            return imgobj;
        };
        //get a bitmap Text
        ImagesManager.getBitmapText = function (text, bitmapFontId) {
            var bt = new createjs.BitmapText(text, new createjs.SpriteSheet(this.bitmapFontSpriteSheetDataArray[bitmapFontId]));
            bt.lineHeight = 100;
            bt.mouseEnabled = ImagesManager.defaultMouseEnabled;
            return bt;
        };
        //Get a preloaded Image from assets
        ImagesManager.getLoadedImage = function (name) {
            if (this.loader)
                return this.loader.getResult(name);
            return null;
        };
        //return a sprite according to the image
        ImagesManager.getSprite = function (name, play) {
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
        ImagesManager.defaultMouseEnabled = false;
        return ImagesManager;
    })();
    gameui.ImagesManager = ImagesManager;
})(gameui || (gameui = {}));
//# sourceMappingURL=ImagesManager.js.map