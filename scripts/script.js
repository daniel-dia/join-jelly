var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameui;
(function (gameui) {
    // Class
    var UIItem = (function (_super) {
        __extends(UIItem, _super);
        function UIItem() {
            _super.apply(this, arguments);
            this.centered = false;
            this.animating = false;
        }
        UIItem.prototype.centralize = function () {
            this.regX = this.width / 2;
            this.regY = this.height / 2;
            this.centered = true;
        };
        UIItem.prototype.fadeOut = function (scaleX, scaleY) {
            var _this = this;
            if (scaleX === void 0) { scaleX = 0.5; }
            if (scaleY === void 0) { scaleY = 0.5; }
            this.animating = true;
            this.antX = this.x;
            this.antY = this.y;
            this.mouseEnabled = false;
            createjs.Tween.removeTweens(this);
            createjs.Tween.get(this).to({
                scaleX: scaleX,
                scaleY: scaleY,
                alpha: 0,
                x: this.antX,
                y: this.antY,
            }, 200, createjs.Ease.quadIn).call(function () {
                _this.visible = false;
                _this.x = _this.antX;
                _this.y = _this.antY;
                _this.scaleX = _this.scaleY = 1;
                _this.alpha = 1;
                _this.animating = false;
                _this.mouseEnabled = true;
                ;
            });
        };
        UIItem.prototype.fadeIn = function (scaleX, scaleY) {
            var _this = this;
            if (scaleX === void 0) { scaleX = 0.5; }
            if (scaleY === void 0) { scaleY = 0.5; }
            this.visible = true;
            this.animating = true;
            if (this.antX == null) {
                this.antX = this.x;
                this.antY = this.y;
            }
            this.scaleX = scaleX, this.scaleY = scaleY, this.alpha = 0, this.x = this.x;
            this.y = this.y;
            this.mouseEnabled = false;
            createjs.Tween.removeTweens(this);
            createjs.Tween.get(this).to({
                scaleX: 1,
                scaleY: 1,
                alpha: 1,
                x: this.antX,
                y: this.antY,
            }, 400, createjs.Ease.quadOut).call(function () {
                _this.mouseEnabled = true;
                _this.animating = false;
            });
        };
        //calcula
        UIItem.prototype.createHitArea = function () {
            var hit = new createjs.Shape();
            var b = this.getBounds();
            if (b)
                hit.graphics.beginFill("#000").drawRect(b.x, b.y, b.width, b.height);
            //TODO. se for texto colocar uma sobra. !
            this.hitArea = hit;
        };
        return UIItem;
    })(createjs.Container);
    gameui.UIItem = UIItem;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
    // Class
    var AudiosManager = (function () {
        function AudiosManager() {
        }
        AudiosManager.setMusicVolume = function (volume) {
            if (this.currentMusic)
                this.currentMusic.volume = volume;
            this.musicVolue = volume;
        };
        AudiosManager.setSoundVeolume = function (volume) {
            this.soundVolume = volume;
        };
        AudiosManager.getMusicVolume = function () {
            return this.musicVolue;
        };
        AudiosManager.getSoundVolume = function () {
            return this.soundVolume;
        };
        AudiosManager.playMusic = function (name, volume) {
            if (volume === void 0) { volume = 1; }
            if (this.currentMusic) {
                this.currentMusic.setVolume(volume);
                if (this.currentMusicName == name)
                    return;
                this.currentMusic.stop();
                delete this.currentMusic;
            }
            this.currentMusicName = name;
            this.currentMusic = createjs.Sound.play(name, null, null, null, 1000);
            this.currentMusic.setVolume(volume * this.getMusicVolume());
        };
        AudiosManager.playSound = function (name, interrupt, delay, offset, loop, volume) {
            if (delay === void 0) { delay = 0; }
            if (volume === void 0) { volume = 1; }
            return createjs.Sound.play(name, interrupt, delay, offset, loop, volume * this.getSoundVolume());
        };
        return AudiosManager;
    })();
    gameui.AudiosManager = AudiosManager;
})(gameui || (gameui = {}));
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
//TODO remove universal variable defaultWidth and DefaultHeigth
var gameui;
(function (gameui) {
    var GameScreen = (function () {
        //-----------------------------------------------------------------------
        function GameScreen(canvasElement, gameWidth, gameHeight, fps, showFps) {
            var _this = this;
            if (fps === void 0) { fps = 60; }
            this.defaultWidth = gameWidth;
            this.defaultHeight = gameHeight;
            //Initializes canvas Context            
            this.myCanvas = document.getElementById(canvasElement);
            this.stage = new createjs.Stage(canvasElement);
            createjs.Touch.enable(this.stage);
            var x = 0;
            createjs.Ticker.addEventListener("tick", function () {
                _this.stage.update();
            });
            createjs.Ticker.setFPS(fps);
            this.screenContainer = new createjs.Container();
            this.stage.addChild(this.screenContainer);
            //Framerate meter
            if (showFps) {
                var fpsMeter = new createjs.Text("FPS", " 18px Arial ", "#000");
                fpsMeter.mouseEnabled = false;
                fpsMeter.x = 0;
                fpsMeter.y = 0;
                this.stage.addChild(fpsMeter);
                createjs.Ticker.addEventListener("tick", function () {
                    fpsMeter.text = Math.floor(createjs.Ticker.getMeasuredFPS()) + " FPS";
                });
            }
            //var windowWidth = window.innerWidth;
            this.resizeGameScreen(window.innerWidth, window.innerHeight);
            window.onresize = function () {
                _this.resizeGameScreen(window.innerWidth, window.innerHeight);
            };
        }
        //switch current screen, optionaly with a pre defined transition
        GameScreen.prototype.switchScreen = function (newScreen, parameters, transition) {
            var _this = this;
            //save oldscreen
            var oldScreen = this.currentScreen;
            //applies a default trainsition
            if (!transition)
                transition = new gameui.Transition();
            var x = 0;
            var y = 0;
            var alpha = 1;
            //if transition
            if (transition && oldScreen) {
                switch (transition.type) {
                    case "fade":
                        alpha = 0;
                        break;
                    case "top":
                        y = this.currentHeight;
                        break;
                    case "bottom":
                        y = -this.currentHeight;
                        break;
                    case "left":
                        x = -this.currentWidth;
                        break;
                    case "right":
                        x = this.currentWidth;
                        break;
                    case "none":
                        transition.time = 0;
                        break;
                }
                //and transition = fade
                if (transition.type && transition.type != "none") {
                    newScreen.view.mouseEnabled = false;
                    oldScreen.view.mouseEnabled = false;
                    //fade between transitions
                    newScreen.view.set({ alpha: alpha, x: -x, y: -y });
                    oldScreen.view.set({ 1: alpha, x: 0, y: 0 });
                    //fade old screen out
                    createjs.Tween.get(oldScreen.view).to({ alpha: alpha, x: x, y: y }, transition.time, createjs.Ease.quadInOut);
                    createjs.Tween.get(newScreen.view).to({ alpha: 1, x: 0, y: 0 }, transition.time, createjs.Ease.quadInOut).call(function () {
                        oldScreen.view.set({ 1: alpha, x: 0, y: 0 });
                        newScreen.view.set({ 1: alpha, x: 0, y: 0 });
                        newScreen.view.mouseEnabled = true;
                        oldScreen.view.mouseEnabled = true;
                        _this.removeOldScreen(oldScreen);
                        oldScreen = null;
                    });
                }
                else {
                    this.removeOldScreen(oldScreen);
                    oldScreen = null;
                }
            }
            else {
                this.removeOldScreen(oldScreen);
                oldScreen = null;
            }
            //adds the new screen on viewer
            newScreen.activate(parameters);
            this.screenContainer.addChild(newScreen.view);
            this.currentScreen = newScreen;
            //updates current screen
            this.currentScreen.redim(this.headerPosition, this.footerPosition, this.currentWidth, this.currentHeight);
        };
        //resize GameScreen to a diferent scale
        GameScreen.prototype.resizeGameScreen = function (deviceWidth, deviceHeight, updateCSS) {
            if (updateCSS === void 0) { updateCSS = true; }
            //keep aspect ratio 
            if (this.defaultHeight) {
                var aspect = this.defaultWidth / this.defaultHeight;
                var aspectReal = deviceWidth / deviceHeight;
                if (aspectReal > aspect) {
                    var s = deviceHeight / this.defaultHeight;
                    deviceWidth = this.defaultWidth * s;
                }
            }
            this.myCanvas.width = deviceWidth;
            this.myCanvas.height = deviceHeight;
            this.updateViewerScale(deviceWidth, deviceHeight, this.defaultWidth, this.defaultHeight);
        };
        //updates screen viewer scale
        GameScreen.prototype.updateViewerScale = function (realWidth, realHeight, defaultWidth, defaultHeight) {
            var scale = realWidth / defaultWidth;
            this.currentHeight = realHeight / scale;
            this.currentWidth = realWidth / scale;
            this.defaultWidth = defaultWidth;
            //set header and footer positions
            this.headerPosition = -(this.currentHeight - defaultHeight) / 2;
            this.footerPosition = defaultHeight + (this.currentHeight - defaultHeight) / 2;
            //set the viewer offset to centralize in window
            this.screenContainer.scaleX = this.screenContainer.scaleY = scale;
            this.screenContainer.y = this.viewerOffset = (this.currentHeight - defaultHeight) / 2 * scale;
            //updates current screen
            if (this.currentScreen)
                this.currentScreen.redim(this.headerPosition, this.footerPosition, this.currentWidth, this.currentHeight);
        };
        //deletes old screen
        GameScreen.prototype.removeOldScreen = function (oldScreen) {
            if (oldScreen != null) {
                oldScreen.desactivate();
                this.screenContainer.removeChild(oldScreen.view);
                oldScreen = null;
            }
        };
        return GameScreen;
    })();
    gameui.GameScreen = GameScreen;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
    //this class alow user to arrange objects in a grid forrmat
    //the anchor point is the center of object
    var Grid = (function (_super) {
        __extends(Grid, _super);
        function Grid(cols, rows, width, height, padding, flowHorizontal) {
            if (padding === void 0) { padding = 0; }
            _super.call(this);
            //provided variables
            this.flowHorizontal = false;
            //control variables;
            this.currentCol = 0;
            this.currentRow = 0;
            //define the variables
            this.flowHorizontal = flowHorizontal;
            this.cols = cols;
            this.rows = rows;
            this.padding = padding;
            this.width = width;
            this.height = height;
            //define other parameters
            this.wSpacing = (width - padding * 2) / cols;
            this.hSpacing = (height - padding * 2) / rows;
        }
        //place objecrs into a grid format
        Grid.prototype.addObject = function (object) {
            this.addChild(object);
            object.x = this.getXPos();
            object.y = this.getYPos();
            this.updatePosition();
        };
        Grid.prototype.getXPos = function () {
            return this.padding + this.currentCol * this.wSpacing + this.wSpacing / 2;
        };
        Grid.prototype.getYPos = function () {
            return this.padding + this.currentRow * this.hSpacing + this.hSpacing / 2;
        };
        //define next Item position
        Grid.prototype.updatePosition = function () {
            if (!this.flowHorizontal) {
                this.currentCol++;
                if (this.currentCol >= this.cols) {
                    this.currentCol = 0;
                    this.currentRow++;
                }
            }
            else {
                this.currentRow++;
                if (this.currentRow >= this.rows) {
                    this.currentRow = 0;
                    this.currentCol++;
                }
            }
        };
        return Grid;
    })(gameui.UIItem);
    gameui.Grid = Grid;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
    var Label = (function (_super) {
        __extends(Label, _super);
        //public container: createjs.Container;
        function Label(text, font, color) {
            if (text === void 0) { text = ""; }
            if (font === void 0) { font = "600 90px Myriad Pro"; }
            if (color === void 0) { color = "#82e790"; }
            _super.call(this);
            text = text.toUpperCase();
            //add text into it.
            this.textField = new createjs.Text(text, font, color);
            this.textField.textBaseline = "middle";
            this.textField.textAlign = "center";
            this.addChild(this.textField);
        }
        return Label;
    })(gameui.UIItem);
    gameui.Label = Label;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
    var MenuContainer = (function (_super) {
        __extends(MenuContainer, _super);
        function MenuContainer(width, height, flowHorizontal) {
            if (width === void 0) { width = null; }
            if (height === void 0) { height = null; }
            if (flowHorizontal === void 0) { flowHorizontal = false; }
            if (!flowHorizontal)
                _super.call(this, 1, 0, width, height, 0, flowHorizontal);
            else
                _super.call(this, 0, 1, width, height, 0, flowHorizontal);
        }
        //adds a text object
        MenuContainer.prototype.addLabel = function (text) {
            var textObj;
            textObj = new gameui.Label(text);
            this.addObject(textObj);
            return textObj.textField;
        };
        //creates a button object
        MenuContainer.prototype.addButton = function (text, event) {
            if (event === void 0) { event = null; }
            var buttonObj = new gameui.TextButton(text, null, null, null, event);
            this.addObject(buttonObj);
            return buttonObj;
        };
        MenuContainer.prototype.addOutButton = function (text, event) {
            if (event === void 0) { event = null; }
            var buttonObj = new gameui.TextButton(text, null, null, null, event);
            this.addObject(buttonObj);
            return buttonObj;
        };
        return MenuContainer;
    })(gameui.Grid);
    gameui.MenuContainer = MenuContainer;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
    var ScreenState = (function () {
        function ScreenState() {
            this.view = new createjs.Container();
            this.content = new createjs.Container();
            this.header = new createjs.Container();
            this.footer = new createjs.Container();
            this.background = new createjs.Container();
            this.view.addChild(this.background);
            this.view.addChild(this.content);
            this.view.addChild(this.footer);
            this.view.addChild(this.header);
        }
        ScreenState.prototype.activate = function (parameters) {
            this.content.visible = true;
        };
        ScreenState.prototype.desactivate = function (parameters) {
            this.content.visible = false;
        };
        ScreenState.prototype.redim = function (headerY, footerY, width, heigth) {
            this.screenHeight = heigth;
            this.screenWidth = width;
            this.footer.y = footerY;
            this.header.y = headerY;
            var dh = footerY + headerY;
            var ch = footerY - headerY;
            var scale = ch / dh;
            if (scale < 1) {
                scale = 1;
                this.background.y = 0;
                this.background.x = 0;
            }
            else {
                this.background.y = headerY;
                this.background.x = -(width * scale - width) / 2;
            }
            this.background.scaleX = this.background.scaleY = scale;
            var mask = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0, -(heigth - defaultHeight) / 2, width, heigth));
            this.background.mask = mask;
            this.footer.mask = mask;
            this.header.mask = mask;
            this.content.mask = mask;
        };
        ScreenState.prototype.back = function () {
            exitApp();
        };
        return ScreenState;
    })();
    gameui.ScreenState = ScreenState;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
    var Transition = (function () {
        function Transition() {
            this.time = 300;
            this.type = "fade"; // none,fade,left,top,right,bottom
        }
        return Transition;
    })();
    gameui.Transition = Transition;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
    // Class
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(soundId) {
            var _this = this;
            _super.call(this);
            this.enableAnimation = true;
            this.mouse = false;
            this.addEventListener("mousedown", function (event) {
                _this.onPress(event);
            });
            this.addEventListener("pressup", function (event) {
                _this.onPressUp(event);
            });
            this.addEventListener("mouseover", function () {
                _this.mouse = true;
            });
            this.addEventListener("mouseout", function () {
                _this.mouse = false;
            });
            this.soundId = soundId;
        }
        Button.setDefaultSoundId = function (soundId) {
            this.DefaultSoundId = soundId;
        };
        Button.prototype.returnStatus = function () {
            if (!this.mouse) {
                this.scaleX = this.originalScaleX;
                this.scaleY = this.originalScaleY;
            }
        };
        Button.prototype.onPressUp = function (Event) {
            this.mouse = false;
            this.set({ scaleX: this.originalScaleX * 1.1, scaleY: this.originalScaleY * 1.1 });
            createjs.Tween.get(this).to({ scaleX: this.originalScaleX, scaleY: this.originalScaleY }, 200, createjs.Ease.backOut);
        };
        Button.prototype.onPress = function (Event) {
            var _this = this;
            if (!this.enableAnimation)
                return;
            this.mouse = true;
            if (this.originalScaleX == null) {
                this.originalScaleX = this.scaleX;
                this.originalScaleY = this.scaleY;
            }
            createjs.Tween.get(this).to({ scaleX: this.originalScaleX * 1.1, scaleY: this.originalScaleY * 1.1 }, 500, createjs.Ease.elasticOut).call(function () {
                if (!_this.mouse) {
                    createjs.Tween.get(_this).to({ scaleX: _this.originalScaleX, scaleY: _this.originalScaleY }, 300, createjs.Ease.backOut);
                }
            });
            if (!this.soundId)
                this.soundId = Button.DefaultSoundId;
            if (this.soundId)
                gameui.AudiosManager.playSound(this.soundId);
        };
        Button.prototype.setSound = function (soundId) {
            this.soundId = soundId;
        };
        return Button;
    })(gameui.UIItem);
    gameui.Button = Button;
    var ImageButton = (function (_super) {
        __extends(ImageButton, _super);
        function ImageButton(image, event, soundId) {
            var _this = this;
            _super.call(this, soundId);
            if (event != null)
                this.addEventListener("click", event);
            //adds image into it
            if (image != null) {
                this.background = gameui.ImagesManager.getBitmap(image);
                this.addChildAt(this.background, 0);
                //Sets the image into the pivot center.
                if (this.background.getBounds()) {
                    this.centralizeImage();
                }
                else if (this.background["image"])
                    this.background["image"].onload = function () {
                        _this.centralizeImage();
                    };
            }
            this.createHitArea();
        }
        ImageButton.prototype.centralizeImage = function () {
            this.width = this.background.getBounds().width;
            this.height = this.background.getBounds().height;
            this.background.regX = this.width / 2;
            this.background.regY = this.height / 2;
            this.centered = true;
        };
        return ImageButton;
    })(Button);
    gameui.ImageButton = ImageButton;
    var TextButton = (function (_super) {
        __extends(TextButton, _super);
        function TextButton(text, font, color, background, event, soundId) {
            if (text === void 0) { text = ""; }
            _super.call(this, background, event, soundId);
            //add text into it.
            text = text.toUpperCase();
            this.text = new createjs.Text(text, font, color);
            this.text.textBaseline = "middle";
            this.text.textAlign = "center";
            //createHitArea
            if (background == null) {
                this.width = this.text.getMeasuredWidth() * 1.5;
                this.height = this.text.getMeasuredHeight() * 1.5;
            }
            this.addChild(this.text);
            this.createHitArea();
            this.createHitArea();
        }
        return TextButton;
    })(ImageButton);
    gameui.TextButton = TextButton;
    var BitmapTextButton = (function (_super) {
        __extends(BitmapTextButton, _super);
        function BitmapTextButton(text, bitmapFontId, background, event, soundId) {
            _super.call(this, background, event, soundId);
            //add text into it.
            text = text.toUpperCase();
            this.bitmapText = gameui.ImagesManager.getBitmapText(text, bitmapFontId);
            this.addChild(this.bitmapText);
            this.bitmapText.regX = this.bitmapText.getBounds().width / 2;
            this.bitmapText.regY = this.bitmapText.lineHeight / 2;
            this.createHitArea();
        }
        return BitmapTextButton;
    })(ImageButton);
    gameui.BitmapTextButton = BitmapTextButton;
    var IconButton = (function (_super) {
        __extends(IconButton, _super);
        function IconButton(icon, text, font, color, background, event, soundId) {
            var _this = this;
            if (icon === void 0) { icon = ""; }
            if (text === void 0) { text = ""; }
            if (font === void 0) { font = null; }
            //add space before text
            if (text != "")
                text = " " + text;
            _super.call(this, text, font, color, background, event, soundId);
            //loads icon Image
            this.icon = gameui.ImagesManager.getBitmap(icon);
            this.addChild(this.icon);
            this.text.textAlign = "left";
            if (this.icon.getBounds())
                this.icon.regY = this.icon.getBounds().height / 2;
            else if (this.icon["image"])
                this.icon["image"].onload = function () {
                    _this.icon.regY = _this.icon.getBounds().height / 2;
                };
            this.updateLabel(text);
            this.createHitArea();
        }
        IconButton.prototype.updateLabel = function (value) {
            this.text.text = value;
            if (this.icon.getBounds()) {
                this.icon.x = -(this.icon.getBounds().width + 10 + this.text.getMeasuredWidth()) / 2;
                this.text.x = this.icon.x + this.icon.getBounds().width + 10;
            }
        };
        IconButton.prototype.centralizeIcon = function () {
        };
        return IconButton;
    })(TextButton);
    gameui.IconButton = IconButton;
})(gameui || (gameui = {}));
var joinjelly;
(function (joinjelly) {
    var Items = (function () {
        function Items() {
        }
        Items.TIME = "time";
        Items.CLEAN = "clean";
        Items.FAST = "fast";
        Items.REVIVE = "revive";
        Items.LUCKY = "lucky";
        return Items;
    })();
    joinjelly.Items = Items;
    var ItemsData = (function () {
        function ItemsData() {
            this.items = (new Object());
            this.items = UserData.loadItems();
        }
        ItemsData.prototype.getItemAmmount = function (item) {
            return this.items[item] || 0;
        };
        ItemsData.prototype.increaseItemAmmount = function (item, ammount) {
            if (ammount === void 0) { ammount = 1; }
            this.setItemAmmount(item, this.getItemAmmount(item) + ammount);
        };
        ItemsData.prototype.decreaseItemAmmount = function (item, ammount) {
            if (ammount === void 0) { ammount = 1; }
            this.setItemAmmount(item, this.getItemAmmount(item) - ammount);
        };
        ItemsData.prototype.setItemAmmount = function (item, ammount) {
            if (ammount > 99)
                ammount = 99;
            if (ammount < 0)
                ammount = 0;
            this.items[item] = ammount;
            UserData.saveItems(this.items);
        };
        ItemsData.items = [Items.TIME, Items.CLEAN, Items.FAST, Items.REVIVE, Items.LUCKY];
        return ItemsData;
    })();
    joinjelly.ItemsData = ItemsData;
})(joinjelly || (joinjelly = {}));
var StringResources = {
    menus: {
        highScore: "High Score",
        loading: "loading",
        score: "score",
        level: "level",
        options: "options",
        highJelly: "High Jelly",
        gameOver: "GAME OVER",
        jellypedia: "Jellypedia",
        pause: "paused",
        sound: "Sound",
        menu: "menu",
        reset: "Reset All Data",
        resetWarning: "Are you sure. All you progress will be lost",
        about: "About",
        tutorial: "Tutorial",
        shop: "shop",
    },
    tutorial: {
        msgheplme: "Help me to evolve\nJoin another jelly to me",
        msgOnceMore: "Great! now I'm bigger, \nevolve me once more",
        msgDirt: "Ow, a dirt appears \n Join two jelly near to destroy it.",
        msgPlay: "Perfect!\nNow let's play this game.",
        msgItemClean: "You can always use items.\n this cleans the board",
        msgItemFast: "this one join some jellies",
        msgItemTime: "this one make time slower",
        msgItemRevive: "if you loose, use this to revive",
        msgBoardFill: "but be careful, \ndo not let the board fill, \nthis is the end for us.",
    },
    jellys: {
        1: { name: "Little Jelly", description: "description" },
        2: { name: "Jelly", description: "description" },
        4: { name: "Angry Jelly", description: "description" },
        8: { name: "Kawaii Jelly", description: "description" },
        16: { name: "indiferent Jelly", description: "description" },
        32: { name: "Bored Jelly", description: "description" },
        64: { name: "Sad Jelly", description: "description" },
        128: { name: "Histeric Jelly", description: "description" },
        256: { name: "Crazy Jelly", description: "description" },
        512: { name: "Phanton1 Jelly", description: "description" },
        1024: { name: "Phanton2 Jelly", description: "description" },
        2048: { name: "Phanton3 Jelly", description: "description" },
        4096: { name: "Phanton4 Jelly", description: "description" },
        8192: { name: "Phanton5 Jelly", description: "description" },
        16384: { name: "Phanton6 Jelly", description: "description" },
    },
    items: {
        clean: "Clean",
        fast: "Fast",
        time: "Time",
        revive: "Revive",
    },
    store: {
        title: "Store",
        clean: {
            name: "Clean 3x",
            desc: "Remove all dirt and small jellies",
        },
        fast: {
            name: "Fast 3x",
            desc: "Join 5 avaliable jellies",
        },
        time: {
            name: "Freeze Time 3x",
            desc: "Freeze times for 5 seconds",
        },
        revive: {
            name: "Revive 3x",
            desc: "Return to play after losing",
        },
        lucky: {
            name: "Lucky clover",
            desc: "Doubles the chance of finding an item",
        },
        pack: {
            name: "Item Pack",
            desc: "A package with 3 units of each item",
        },
    },
    credit: {},
};
var StringResources_pt = {
    menus: {
        highScore: "Recorde",
        loading: "Carregando",
        score: "Pontos",
        level: "level",
        options: "opções",
        highJelly: "maior",
        gameOver: "GAME OVER",
        jellypedia: "Jellypedia",
        pause: "pausa",
        sound: "Sons",
        menu: "Menu",
        reset: "Apagar tudo",
        resetWarning: "Você tem certeza? tudo que voce consquistou será perdido.",
        about: "Sobre",
        tutorial: "Tutorial",
        shop: "Compras",
    },
    tutorial: {
        msgheplme: "Me ajude a desenvolver\nJunte outra geleia comigo",
        msgOnceMore: "Legal! Estou maior, \nMe desenvolva novamente",
        msgDirt: "Olha, sujeiras\n Junte uma geleia lá para limpar.",
        msgPlay: "Perfeito!\nVamos jogar !.",
        msgItemClean: "Sempre que precisar use items.\n Este limpa a bagunça",
        msgItemFast: "Esse junta algumas geleias",
        msgItemTime: "Esse congela o tempo",
        msgItemRevive: "Se voce perder, use este para reviver",
        msgBoardFill: "Tenha cuidado, \nNão deixe encher, \ntIsto é o nosso fim.",
    },
    jellys: {
        1: { name: "Geleinha", description: "" },
        2: { name: "Gotinha", description: "" },
        4: { name: "", description: "" },
        8: { name: "", description: "" },
        16: { name: "SunBronze", description: "Com corpinho \nbronzeado" },
        32: { name: "", description: "Entediada de tanto\ngelatinar" },
        64: { name: "", description: "Não gosta de ser tocada" },
        128: { name: "Gelerda", description: "A geleia lerdinha" },
        256: { name: "Moti", description: "Irresistivel vontade\nde comer com shoyu" },
        512: { name: "Xexão", description: "Lembra as boxexas\ndo meu irmão" },
        1024: { name: "Geleialien", description: "Veio de outro \nplanetapara geleiar" },
        2048: { name: "BayGeleia", description: "Sua geleia pessoal \nde saúde" },
        4096: { name: "Geleia Caroço", description: "Mau humorada e \nencaroçada" },
        8192: { name: "Geleia sonica", description: "Uma geleia \nmuito rápida" },
        16384: { name: "Super Sayagele", description: "A geleia mais forte \ndo universo" },
    },
    items: {
        clean: "Limpa",
        fast: "Rápido",
        time: "Tempo",
        revive: "Reviver",
    },
    store: {
        title: "Loja",
        clean: {
            name: "Limpar 3x",
            desc: "Limpa sujeira e geleinhas",
        },
        fast: {
            name: "Rápido 3x",
            desc: "Junta algumas geleias",
        },
        time: {
            name: "Tempo 3x",
            desc: "para o tempo por 5 segundos",
        },
        revive: {
            name: "Reviver 3x",
            desc: "Retorne a jogar depis que perder.",
        },
        lucky: {
            name: "Trevo da Sorte",
            desc: "Dobra a chance de encontrar items",
        },
        pack: {
            name: "Pacotinho",
            desc: "Contem 5 items de cada",
        },
        gibpack: {
            name: "Pacotão",
            desc: "Contem 10 items de cada.",
        },
    },
    credit: {},
};
var StringResources_es = {
    menus: {
        highScore: "High Score",
        loading: "loading",
        score: "score",
        level: "level",
        options: "options",
        highJelly: "High Jelly",
        gameOver: "GAME OVER",
        jellypedia: "Jellypedia",
        pause: "paused",
        sound: "Sound",
        menu: "menu",
        reset: "Reset All Data",
        resetWarning: "Are you sure. All you progress will be lost",
        about: "About",
        tutorial: "Tutorial",
        shop: "shop",
    },
    tutorial: {
        msgheplme: "Help me to evolve\nJoin another jelly to me",
        msgOnceMore: "Great! now I'm bigger, \nevolve me once more",
        msgDirt: "Ow, a dirt appears \n Join two jelly near to destroy it.",
        msgPlay: "Perfect!\nNow let's play this game.",
        msgItemClean: "You can always use items.\n this cleans the board",
        msgItemFast: "this one join some jellies",
        msgItemTime: "this one make time slower",
        msgItemRevive: "if you loose, use this to revive",
        msgBoardFill: "but be careful, \ndo not let the board fill, \nthis is the end for us.",
    },
    jellys: {
        1: { name: "Little Jelly", description: "description" },
        2: { name: "Go Jelly", description: "description" },
        4: { name: "Angry Jelly", description: "description" },
        8: { name: "Kawaii Jelly", description: "description" },
        16: { name: "indiferent Jelly", description: "description" },
        32: { name: "Bored Jelly", description: "description" },
        64: { name: "Sad Jelly", description: "description" },
        128: { name: "Histeric Jelly", description: "description" },
        256: { name: "Crazy Jelly", description: "description" },
        512: { name: "Phanton1 Jelly", description: "description" },
        1024: { name: "Phanton2 Jelly", description: "description" },
        2048: { name: "Phanton3 Jelly", description: "description" },
        4096: { name: "Phanton4 Jelly", description: "description" },
        8192: { name: "Phanton5 Jelly", description: "description" },
        16384: { name: "Phanton6 Jelly", description: "description" },
    },
    items: {
        clean: "Clean",
        fast: "Fast",
        time: "Time",
        revive: "Revive",
    },
    store: {
        title: "Store",
        clean: {
            name: "Clean 3x",
            desc: "Remove all dirt and small jellies",
        },
        fast: {
            name: "Fast 3x",
            desc: "Join 5 avaliable jellies",
        },
        time: {
            name: "Freeze Time 3x",
            desc: "Freeze times for 5 seconds",
        },
        revive: {
            name: "Revive 3x",
            desc: "Return to play after losing",
        },
        lucky: {
            name: "Lucky clover",
            desc: "Doubles the chance of finding an item",
        },
        pack: {
            name: "Item Pack",
            desc: "A package with 3 units of each item",
        },
    },
    credit: {},
};
var defaultWidth = 768 * 2;
var defaultHeight = 1024 * 2;
var Analytics = (function () {
    function Analytics() {
    }
    //create a random user ID
    Analytics.prototype.getUser = function () {
        if (!this.userId)
            this.userId = localStorage.getItem("lirum_userId");
        if (!this.userId) {
            this.userId = (Math.random() * 9999999999).toString();
            localStorage.setItem("lirum_userId", this.userId);
        }
        return this.userId;
    };
    Analytics.prototype.getSession = function () {
        if (!this.sessionId)
            this.sessionId = (Math.random() * 9999999999).toString();
        return this.sessionId;
    };
    Analytics.prototype.getBuild = function () {
        return "alpha1";
    };
    Analytics.prototype.logGameStart = function () {
        this.sendEvent("Game", "start", 1);
    };
    Analytics.prototype.logEndGame = function (moves, score, level, jelly) {
        this.sendEvent("LevelEnd", "level", level, moves.toString());
        this.sendEvent("LevelEnd", "jelly", jelly, moves.toString());
        this.sendEvent("LevelEnd", "score", score, moves.toString());
        this.sendEvent("LevelEnd", "move", moves);
    };
    Analytics.prototype.logMove = function (moves, score, level, freeSpaces) {
        this.sendEvent("level", "freeSpaces", freeSpaces, moves.toString());
        this.sendEvent("level", "score", score, moves.toString());
        this.sendEvent("level", "level", level, moves.toString());
        this.sendEvent("level", "move", moves);
    };
    // public logUsedItem(itemId: string, levelId: string) {
    //     this.sendEvent("item", itemId, 1, levelId);
    // }
    // public loglevelTime(levelId: string, time: number, final: string) {
    //     this.sendEvent("time", final, time / 1000, levelId);
    // }
    //
    // public logBonus(bonusid: string, items: number) {
    //     this.sendEvent("bonus", bonusid.toString(), items, bonusid);
    // }
    //======================================================================================================================
    Analytics.prototype.sendEvent = function (eventId, subEventId, value, level, x, y) {
        return;
        if (typeof $ == "undefined")
            return;
        var game_key = '8c544aeba45e500f2af6e9b1beee996a';
        var secret_key = 'cd5bce1753ceadacad6b990046fd1fb5d884c9a0';
        //var data_api_key = 'd519f8572c1893fb49873fa2345d444c03afa172'
        var category = "design";
        var message = {
            "user_id": this.getUser(),
            "session_id": this.getSession(),
            "build": this.getBuild(),
            "event_id": eventId + ":" + subEventId,
            "value": value,
            "area": level,
            "x": x,
            "y": y,
        };
        var json_message = JSON.stringify(message);
        var md5_msg = CryptoJS.MD5(json_message + secret_key);
        var header_auth_hex = CryptoJS.enc.Hex.stringify(md5_msg);
        var url = 'http://api-eu.gameanalytics.com/1/' + game_key + '/' + category;
        $.ajax({
            type: 'POST',
            url: url,
            data: json_message,
            headers: {
                "Authorization": header_auth_hex,
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-Type', 'text/plain');
            },
        });
    };
    return Analytics;
})();
var InAppPurchases = (function () {
    function InAppPurchases() {
    }
    InAppPurchases.requestProductList = function (callback) {
        setTimeout(function () {
            if (callback)
                callback([
                    { ProductId: "time5x", Name: "5x Time", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$1,99", },
                    { ProductId: "fast5x", Name: "5x Fast", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$1,99", },
                    { ProductId: "revive5x", Name: "5x Revive", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$1,99", },
                    { ProductId: "clean5x", Name: "5x Clean", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$1,99", },
                    { ProductId: "pack5x", Name: "Item Pack 3x", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$4,99", },
                    { ProductId: "pack10x", Name: "Item Pack 9x", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$6,99", },
                    { ProductId: "lucky", Name: "Lucky Clover", Description: "Removes all little\njellys and dirtys", FormattedPrice: "R$3,99", },
                ]);
        }, 1000);
    };
    InAppPurchases.purchaseProductRequest = function (productId, callback) {
        setTimeout(function () {
            if (callback)
                callback(productId, true);
        }, 2000);
    };
    InAppPurchases.reportProductFullfillment = function (productId, callback) {
        setTimeout(function () {
            if (callback)
                callback();
        }, 2000);
    };
    return InAppPurchases;
})();
var ProductAvaliability;
(function (ProductAvaliability) {
    ProductAvaliability[ProductAvaliability["AVALIABLE"] = 0] = "AVALIABLE";
    ProductAvaliability[ProductAvaliability["PURCHASED"] = 1] = "PURCHASED";
    ProductAvaliability[ProductAvaliability["NOTAVALIABLE"] = 2] = "NOTAVALIABLE";
})(ProductAvaliability || (ProductAvaliability = {}));
var joinjelly;
(function (joinjelly) {
    var ScrollablePage = (function (_super) {
        __extends(ScrollablePage, _super);
        function ScrollablePage(title) {
            _super.call(this);
            this.maxScroll = 1700;
            this.addBackground(title);
            this.addScrollableArea();
            this.addButton();
        }
        ScrollablePage.prototype.addBackground = function (title) {
            // add Background
            this.background.addChild(gameui.ImagesManager.getBitmap("backhome"));
            var bg = gameui.ImagesManager.getBitmap('BigBG');
            bg.mouseEnabled = true;
            this.content.addChild(bg);
            bg.x = (defaultWidth - 1463) / 2;
            bg.y = (defaultHeight - 1788) / 2;
            // add Title
            var titleObj = gameui.ImagesManager.getBitmapText(title.toUpperCase(), "debussy");
            this.content.addChild(titleObj);
            titleObj.y = bg.y + 50;
            titleObj.x = defaultWidth / 2;
            titleObj.regX = titleObj.getBounds().width / 2;
            titleObj.scaleX = titleObj.scaleY = 1.5;
        };
        ScrollablePage.prototype.addScrollableArea = function () {
            var _this = this;
            var scrollContent = new createjs.Container();
            var ScrollArea = new createjs.Container();
            this.content.addChild(ScrollArea);
            ScrollArea.addChild(scrollContent);
            this.scrollableContent = scrollContent;
            var mask = new createjs.Shape(new createjs.Graphics().f("rgb(254,254,254)").p("EALkCFSYAAomAAocAAomYAAgUAKgUAAgUYAAjwgKjwAKj6YAKi+AKi+AAi+YAKjwAKjmAKjwYAKiMAKiWAKiMYAylUB4lADIkiYEYmaFykEH0hQYDcgeDcgeDcgeYAKAAAAAAAKAAYAAAogKAoAAAoYAABuAKBkgKBuYgKC0AACqAAC0YgKCMA8BuBuBaYBkBQB4AUB4AAcArmAAAArmAAAArmAAAYAUAAAKAAAUAAYEOgKC+i+gKkOYAAiCAAh4AAh4YgKi+gKi+AAi+YAeAAAeAAAeAAYAKAAAKAKAUAAYDSAUDIAeDSAoYFUA8EiCgDwDwYCgCqCCDIBkDcYBuDmBGDwAUEEYAKCCAKB4AACCYAKDwAKDwAUDwYAABQgKBQAUBQYAAA8AAAyAAA8YgKAyAAA8AAAyYgKIIAKH+gKIIYAACqAACqAAC0YgKD6gKD6AAD6YgKC0AAC0AAC0YgUGQgKGGgKGQYgKC+gKDIAAC+YgUEigKEsgKEiYgKCqgKCqgKCqYgKD6gKDwgKD6YgKDcgUDcgKDmYgKDSgKDSgKDSYgKDcgUDcgKDcYgKC+gKDIgKC+YgKCWAACWgyCMYgoB4geB4gyB4YiWFKjIEYkYDcYjSCgjmBukYAKYi0AKi+AKi+AKYjSAKjSAAjSAKYiMAKiMgKiMAKYi0AKi0AAi0AAYnCAAnCAUnMgKYhaAAhQAAhaAAYgUAAgUAAgUAKYywAAy6AAywAAYgUAAgKgKgUAAYlyAAlyAAlygKYiCAAiCAAiCgKYkEAAkOgKkEgKYiqgKigAAiqgKYg8AAhGgKhGgUYjwg8i+iCi0igYiWiMhuiWhuigYiMjmhaj6g8kEYgeh4AKh4gKh4YgKjSgKjSgKjSYgUjmgKjwgKjmYgKkEgKj6gKkEYgKk2gUk2gKk2YgKjmAAjcgKjmYgKmkgUmkgKmkYgKlKAAlKgKlUYAAj6gKkEAAj6YAAjSAAjcAAjSYAAgUgKgKAAgU").cp().ef());
            ScrollArea.mask = mask;
            // add scroll event
            var targetY = 0;
            var last;
            this.content.addEventListener("pressmove", function (evt) {
                if (!last)
                    last = evt.localY;
                targetY += (evt.localY - last) * 1.3;
                if (targetY > 400)
                    targetY = 400;
                if (targetY < -_this.maxScroll)
                    targetY = -_this.maxScroll;
                last = evt.localY;
            });
            this.content.addEventListener("pressup", function (evt) {
                last = null;
            });
            this.content.addEventListener("tick", function () {
                ScrollArea.y = (ScrollArea.y * 2 + targetY) / 3;
            });
        };
        ScrollablePage.prototype.addButton = function () {
            var _this = this;
            // add ok button
            var okButton = new gameui.ImageButton("BtOk", function () {
                if (_this.okButtonAction)
                    _this.okButtonAction();
                else
                    joinjelly.JoinJelly.showMainMenu();
            });
            okButton.x = defaultWidth / 2;
            okButton.y = defaultHeight - 200;
            this.content.addChild(okButton);
        };
        return ScrollablePage;
    })(gameui.ScreenState);
    joinjelly.ScrollablePage = ScrollablePage;
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var Loading = (function (_super) {
        __extends(Loading, _super);
        function Loading() {
            _super.call(this);
            this.imageManifest = [
                { id: "j1024", src: "j1024.png" },
                { id: "j2048", src: "j2048.png" },
                { id: "j4096", src: "j4096.png" },
                { id: "j8192", src: "j8192.png" },
                { id: "j16384", src: "j16384.png" },
                { id: "Background", src: "Background.jpg" },
                { id: "backhome", src: "BackMain.jpg" },
                { id: "bonus_bar", src: "bonus_bar.png" },
                { id: "bonus_border", src: "bonus_border.png" },
                { id: "ChubbyFont", src: "ChubbyFont.png" },
                { id: "font", src: "font.png" },
                { id: "e1", src: "e1.png" },
                { id: "e128", src: "e128.png" },
                { id: "e16", src: "e16.png" },
                { id: "e2", src: "e2.png" },
                { id: "e256", src: "e256.png" },
                { id: "e32", src: "e32.png" },
                { id: "e4", src: "e4.png" },
                { id: "e512", src: "e512.png" },
                { id: "e64", src: "e64.png" },
                { id: "e8", src: "e8.png" },
                { id: "e1024", src: "e1024.png" },
                { id: "e2048", src: "e2048.png" },
                { id: "e4096", src: "e4096.png" },
                { id: "e8192", src: "e8192.png" },
                { id: "e16384", src: "e16384.png" },
                { id: "footer", src: "footer.png" },
                { id: "header", src: "header.png" },
                { id: "j-1", src: "j-1.png" },
                { id: "e-1", src: "e-1.png" },
                { id: "j1", src: "j1.png" },
                { id: "j128", src: "j128.png" },
                { id: "j16", src: "j16.png" },
                { id: "j2", src: "j2.png" },
                { id: "j256", src: "j256.png" },
                { id: "j32", src: "j32.png" },
                { id: "j4", src: "j4.png" },
                { id: "j512", src: "j512.png" },
                { id: "j64", src: "j64.png" },
                { id: "j8", src: "j8.png" },
                { id: "time_bar", src: "time_bar.png" },
                { id: "time_bar_red", src: "time_bar_red.png" },
                { id: "time_bar_bright", src: "time_bar_bright.png" },
                { id: "time_border", src: "time_border.png" },
                { id: "shadow", src: "shadow.png" },
                { id: "particle", src: "Particle.png" },
                { id: "BtRestart", src: "BtRestart.png" },
                { id: "BtHome", src: "BtHome.png" },
                { id: "BtPlay", src: "BtPlay.png" },
                { id: "BtStore", src: "BtStore.png" },
                { id: "BtSettings", src: "BtSettings.png" },
                { id: "BtRefresh", src: "BtRefresh.png" },
                { id: "BtHelp", src: "BtHelp.png" },
                { id: "BtInfo", src: "BtInfo.png" },
                { id: "BtJelly", src: "BtJelly.png" },
                { id: "BtPause", src: "BtPause.png" },
                { id: "BtMusic", src: "BtMusic.png" },
                { id: "BtMusicOff", src: "BtMusicOff.png" },
                { id: "BtSound", src: "BtSound.png" },
                { id: "BtSoundOff", src: "BtSoundOff.png" },
                { id: "BtTutorial", src: "BtTutorial.png" },
                { id: "BtBoard", src: "BtBoard.png" },
                { id: "BtOk", src: "BtOk.png" },
                { id: "BtShare", src: "BtShare.png" },
                { id: "BtTextBg", src: "BtTextBg.png" },
                { id: "BtPlusMini", src: "BtPlusMini.png" },
                { id: "BtMenu", src: "BtMenu.png" },
                { id: "BtPlusMini", src: "BtPlusMini.png" },
                { id: "GameOverBgJelly", src: "GameOverBgJelly.png" },
                { id: "GameOverBgPoints", src: "GameOverBgPoints.png" },
                { id: "fxJoin", src: "fxJoin.png" },
                { id: "t0", src: "t0.png" },
                { id: "t1", src: "t1.png" },
                { id: "t2", src: "t2.png" },
                { id: "t3", src: "t3.png" },
                { id: "t4", src: "t4.png" },
                { id: "t5", src: "t5.png" },
                { id: "FlyBG", src: "FlyBG.png" },
                { id: "FlyGroup", src: "FlyGroup.png" },
                { id: "footer", src: "footer.png" },
                { id: "itemclean", src: "itemClean.png" },
                { id: "itemfast", src: "itemFast.png" },
                { id: "itemrevive", src: "itemRevive.png" },
                { id: "itemtime", src: "itemTime.png" },
                { id: "itemPack", src: "itemPack.png" },
                { id: "lucky", src: "lucky.png" },
                { id: "itemBG", src: "itemBg.png" },
                { id: "itemBGDisabled", src: "itemBgDisabled.png" },
                { id: "tutorialFinger", src: "tutorialFinger.png" },
                { id: "tutorialFingerDown", src: "tutorialFingerDown.png" },
                { id: "ballon", src: "ballon.png" },
                { id: "pediaItem", src: "pediaItem.png" },
                { id: "BigBG", src: "BigBG.png" },
                { id: "freezeEffect", src: "freezeEffect.png" },
                { id: "fastEffect", src: "fastEffect.png" },
                { id: "reviveEffect", src: "reviveEffect.png" },
                { id: "cleanEffect", src: "cleanEffect.png" },
                { id: "check", src: "check.png" },
                { id: "unchecked", src: "unchecked.png" },
                { id: "MessageBox", src: "MessageBox.png" },
            ];
            this.audioManifest = [
                { id: "sound_h1", src: "sound_h1.mp3" },
                { id: "sound_r1", src: "sound_r1.mp3" },
                { id: "sound_s1", src: "sound_s1.mp3" },
                { id: "sound_s2", src: "sound_s2.mp3" },
                { id: "sound_s3", src: "sound_s3.mp3" },
                { id: "sound_j1", src: "sound_j1.mp3" },
                { id: "sound_j2", src: "sound_j2.mp3" },
                { id: "sound_j3", src: "sound_j3.mp3" },
                { id: "sound_j4", src: "sound_j4.mp3" },
                { id: "levelUp", src: "levelUp.mp3" },
                { id: "sounditemfast", src: "sounditemfast.mp3" },
                { id: "sounditemclean", src: "sounditemclean.mp3" },
                { id: "sounditemrevive", src: "sounditemrevive.mp3" },
                { id: "sounditemtime", src: "sounditemtime.mp3" },
                { id: "Interface Sound-06", src: "Interface Sound-06.mp3" },
                { id: "Interface Sound-07", src: "Interface Sound-07.mp3" },
                { id: "Interface Sound-08", src: "Interface Sound-08.mp3" },
                { id: "Interface Sound-09", src: "Interface Sound-09.mp3" },
                { id: "Interface Sound-11", src: "Interface Sound-11.mp3" },
                { id: "Interface Sound-14", src: "Interface Sound-14.mp3" },
                { id: "Interface Sound-15", src: "Interface Sound-15.mp3" },
                { id: "end", src: "end.mp3" },
                { id: "musicIntro", src: "musicIntro.mp3" },
                { id: "music1", src: "music1.mp3" },
            ];
            this.initializeImages();
        }
        Loading.prototype.initializeImages = function () {
            var _this = this;
            assetscale = 1;
            if (window.innerWidth <= 1024)
                assetscale = 0.5;
            if (window.innerWidth <= 384)
                assetscale = 0.25;
            if (assetscale == 1)
                this.imagePath = "/assets/images/";
            else
                this.imagePath = "/assets/images_" + assetscale + "x/";
            var imageQueue = gameui.ImagesManager.loadAssets(this.imageManifest, this.imagePath);
            if (WEB)
                imageQueue.loadManifest(this.audioManifest, true, "/assets/sounds/");
            if (!WP)
                createjs.Sound.registerManifest(this.audioManifest, "/assets/sounds/");
            //loader text
            var text = new createjs.Text("", "90px Arial", "#FFF");
            text.x = defaultWidth / 2;
            text.y = defaultHeight / 2;
            text.textAlign = "center";
            this.content.addChild(text);
            //loading animation
            var anim = new joinjelly.view.LoadingBall();
            anim.x = defaultWidth / 2;
            anim.y = defaultHeight / 2 + 400;
            this.content.addChild(anim);
            //add update% functtion
            imageQueue.addEventListener("progress", function (evt) {
                text.text = StringResources.menus.loading + "\n" + Math.floor(evt["progress"] * 100).toString() + "%";
                return true;
            });
            //creates load complete action
            imageQueue.addEventListener("complete", function (evt) {
                if (_this.loaded)
                    _this.loaded();
                return true;
            });
            //set default sound button
            gameui.Button.DefaultSoundId = "Interface Sound-06";
            //load font
            debussy = createSpriteSheetFromFont(debussyFont, this.imagePath);
            gameui.ImagesManager.loadFontSpriteSheet("debussy", debussy);
        };
        return Loading;
    })(gameui.ScreenState);
    joinjelly.Loading = Loading;
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var MainScreen = (function (_super) {
        __extends(MainScreen, _super);
        function MainScreen(userData) {
            _super.call(this);
            this.timeStep = 2;
            this.boardSize = 5;
            this.userData = userData;
            this.createContent();
            this.createBackground();
            this.createHeader();
            this.createFooter();
            this.createTitle();
            gameui.AudiosManager.playMusic("musicIntro");
        }
        MainScreen.prototype.createContent = function () {
            // adds jelly
            var lobby = new joinjelly.menus.view.JellyLobby(this.userData.getLastJelly());
            lobby.x = defaultWidth / 2;
            lobby.y = 1000;
            this.content.addChild(lobby);
            // play button
            var button = new gameui.ImageButton("BtPlay", function () {
                if (joinjelly.JoinJelly.userData.getLastJelly() > 1)
                    joinjelly.JoinJelly.startLevel();
                else
                    joinjelly.JoinJelly.startTutorial();
            });
            button.y = 1168;
            button.x = 768;
            this.content.addChild(button);
        };
        MainScreen.prototype.createTitle = function () {
            var t = new joinjelly.menus.view.GameTitle();
            this.content.addChild(t);
        };
        MainScreen.prototype.createBackground = function () {
            this.background.addChild(gameui.ImagesManager.getBitmap("backhome"));
        };
        MainScreen.prototype.createHeader = function () {
        };
        MainScreen.prototype.createFooter = function () {
            var _this = this;
            if (this.userData) {
                this.scoreText = gameui.ImagesManager.getBitmapText(StringResources.menus.highScore + " " + this.userData.getHighScore(), "debussy");
                this.scoreText.x = 50;
                this.scoreText.y = -100;
                this.scoreText.scaleX = this.scoreText.scaleY = 0.8;
                this.footer.addChild(this.scoreText);
            }
            var x = defaultWidth + 100;
            var space = 250;
            //add About button
            var settingsBt = new gameui.ImageButton("BtInfo", function () {
                joinjelly.JoinJelly.showAbout();
            });
            settingsBt.y = 150;
            settingsBt.x = x - space;
            this.header.addChild(settingsBt);
            //add Menu button
            var settingsBt = new gameui.ImageButton("BtMenu", function () {
                joinjelly.JoinJelly.showSettings();
            });
            settingsBt.y = -150;
            settingsBt.x = x -= space;
            this.footer.addChild(settingsBt);
            //add pedia button
            var aboutBt = new gameui.ImageButton("BtJelly", function () {
                joinjelly.JoinJelly.showPedia();
            });
            aboutBt.y = -150;
            aboutBt.x = x -= space;
            this.footer.addChild(aboutBt);
            //add store bt
            var storeBt = new gameui.ImageButton("BtStore", function () {
                joinjelly.JoinJelly.showStore(_this);
            });
            storeBt.y = -150;
            storeBt.x = x -= space;
            this.footer.addChild(storeBt);
        };
        return MainScreen;
    })(gameui.ScreenState);
    joinjelly.MainScreen = MainScreen;
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var Jellypedia = (function (_super) {
        __extends(Jellypedia, _super);
        function Jellypedia(userData, jellyInfos) {
            _super.call(this, StringResources.menus.jellypedia);
            // add jelly items
            var itensContainer = new createjs.Container();
            this.scrollableContent.addChild(itensContainer);
            itensContainer.y = 400;
            var index = 0;
            for (var j = 1; j <= joinjelly.JoinJelly.maxJelly; j *= 2) {
                if (true)
                    var pi = new joinjelly.menus.view.JellyPediaItem(j, jellyInfos[j].name, jellyInfos[j].description);
                else
                    var pi = new joinjelly.menus.view.JellyPediaItem(0, "?", "");
                itensContainer.addChild(pi);
                pi.y = 500 * index;
                pi.x = 150;
                index++;
            }
            this.maxScroll = 6300;
        }
        return Jellypedia;
    })(joinjelly.ScrollablePage);
    joinjelly.Jellypedia = Jellypedia;
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var view;
        (function (view) {
            var GameTitle = (function (_super) {
                __extends(GameTitle, _super);
                function GameTitle() {
                    _super.call(this);
                    this.createJoin();
                    this.createJelly();
                }
                GameTitle.prototype.createJoin = function () {
                    var j = new joinjelly.view.JellyContainer();
                    var i = gameui.ImagesManager.getBitmap("t0");
                    j.addChild(i);
                    j.y = 114;
                    j.x = 325;
                    this.addChild(j);
                    j.alpha = 0;
                    j.y = 0;
                    createjs.Tween.get(j).to({ alpha: 1, y: 114 }, 600, createjs.Ease.quadOut);
                };
                GameTitle.prototype.createJelly = function () {
                    var xs = [213, 492, 761, 1039, 1278];
                    for (var l = 1; l <= 5; l++) {
                        var j = new joinjelly.view.JellyContainer();
                        j.visible = false;
                        var x = 0;
                        //setTimeout(() => {
                        j.executeAnimationIn();
                        ///}, l * 200 + 600);
                        var i = gameui.ImagesManager.getBitmap("t" + l);
                        j.imageContainer.addChild(i);
                        this.addChild(j);
                        i.regX = i.getBounds().width / 2;
                        i.regY = i.getBounds().height;
                        j.x = xs[l - 1];
                        j.y = 769;
                    }
                };
                return GameTitle;
            })(createjs.Container);
            view.GameTitle = GameTitle;
        })(view = menus.view || (menus.view = {}));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var view;
        (function (view) {
            var JellyLobby = (function (_super) {
                __extends(JellyLobby, _super);
                function JellyLobby(lastJelly) {
                    _super.call(this);
                    // drop all jellies
                    this.dropAllJellys(lastJelly);
                }
                //add all jellys to the container
                JellyLobby.prototype.dropAllJellys = function (lastJelly) {
                    var _this = this;
                    // set a default value to the last jelly
                    if (!lastJelly)
                        lastJelly = 1;
                    // calculate all jellys already unlocked
                    var jellys = new Array();
                    for (var j = 1; j <= lastJelly; j *= 2)
                        jellys.push(j);
                    var i = 0;
                    var p = 1;
                    for (var j = 0; j < jellys.length; j++)
                        setTimeout(function () {
                            _this.dropJelly(p, i);
                            i++;
                            p *= 2;
                        }, j * 200);
                };
                //adds a single jelly to the container
                JellyLobby.prototype.dropJelly = function (value, position) {
                    var positions = [
                        [2 / 4, 0],
                        [3 / 4, 0.2],
                        [1 / 4, 0.2],
                        [2 / 5, 1],
                        [3 / 5, 1],
                        [1 / 5, 1.2],
                        [4 / 5, 1.2],
                        [1 / 6, 2.3],
                        [2 / 6, 2],
                        [4 / 6, 2],
                        [5 / 6, 2.3],
                        [1 / 4, 2.6],
                        [3 / 4, 2.6],
                        [2 / 4, 3],
                    ];
                    var jelly = new joinjelly.gameplay.Tile(0, 0, 500);
                    // adds jelly
                    this.addChildAt(jelly, 0);
                    jelly.setNumber(value);
                    var m = (position % 2) ? -1 : 1;
                    jelly.x = (positions[position][0] * defaultWidth - defaultWidth / 2) * 1.2;
                    jelly.y = positions[position][1] * -200 + 550;
                    jelly.scaleX = jelly.scaleY = 1 - positions[position][1] / 4;
                    //play JellySound
                    gameui.AudiosManager.playSound('sound_s' + (Math.floor(Math.random() * 3) + 1), null, 400);
                };
                return JellyLobby;
            })(createjs.Container);
            view.JellyLobby = JellyLobby;
        })(view = menus.view || (menus.view = {}));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var view;
        (function (view) {
            var FlyOutMenu = (function (_super) {
                __extends(FlyOutMenu, _super);
                function FlyOutMenu(title, heigth) {
                    if (heigth === void 0) { heigth = 1022; }
                    _super.call(this);
                    this.top = defaultHeight / 2 + 1022 - heigth;
                    this.regX = this.x = defaultWidth / 2;
                    this.regY = this.y = defaultHeight / 2;
                    this.AddBG(heigth);
                    this.addTitle(title);
                    this.visible = false;
                }
                FlyOutMenu.prototype.setTitle = function (title) {
                    this.title.text = title.toUpperCase();
                    this.title.regX = this.title.getBounds().width / 2;
                };
                // creates menu background
                FlyOutMenu.prototype.AddBG = function (heigth) {
                    var bg = gameui.ImagesManager.getBitmap("FlyBG");
                    bg.set({ x: defaultWidth / 2, y: 557, regX: 1305 / 2 });
                    bg.scaleY = heigth / 1022;
                    this.addChild(bg);
                    bg.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(-bg.x + bg.regX, -bg.y + bg.regY, defaultWidth, defaultHeight));
                };
                // creates menu title
                FlyOutMenu.prototype.addTitle = function (title) {
                    //create "points" text
                    this.title = gameui.ImagesManager.getBitmapText("", "debussy");
                    this.title.set({ x: defaultWidth / 2, y: 600 });
                    this.addChild(this.title);
                    this.setTitle(title);
                };
                // animates menu entrance
                FlyOutMenu.prototype.animateIn = function () {
                    createjs.Tween.removeTweens(this);
                    // shows menus
                    this.visible = true;
                    this.y = this.top - 500;
                    this.alpha = 0;
                    this.scaleX = 0.5;
                    this.scaleY = 2;
                    createjs.Tween.get(this).to({ x: defaultWidth / 2, y: this.top, alpha: 1, scaleX: 1, scaleY: 1 }, 1400, createjs.Ease.elasticOut);
                };
                FlyOutMenu.prototype.animateOut = function () {
                    var _this = this;
                    // animate all
                    createjs.Tween.removeTweens(this);
                    this.alpha = 1;
                    this.scaleX = 1;
                    this.scaleY = 1;
                    createjs.Tween.get(this).to({ alpha: 0, scaleX: 0.5, scaleY: 0.75 }, 200, createjs.Ease.quadIn).call(function () {
                        _this.visible = false;
                    });
                };
                FlyOutMenu.prototype.show = function () {
                    this.animateIn();
                    gameui.AudiosManager.playSound("Interface Sound-14");
                };
                FlyOutMenu.prototype.hide = function () {
                    if (!this.visible)
                        return;
                    this.animateOut();
                    gameui.AudiosManager.playSound("Interface Sound-15");
                };
                return FlyOutMenu;
            })(createjs.Container);
            view.FlyOutMenu = FlyOutMenu;
        })(view = menus.view || (menus.view = {}));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var view;
        (function (view) {
            var JellyPediaItem = (function (_super) {
                __extends(JellyPediaItem, _super);
                function JellyPediaItem(value, title, description) {
                    _super.call(this);
                    // Add Background
                    var bg = gameui.ImagesManager.getBitmap("pediaItem");
                    this.addChild(bg);
                    // Add Texts
                    var tContainer = new createjs.Container();
                    var titleObj = gameui.ImagesManager.getBitmapText(title, "debussy");
                    var descriptionObj = gameui.ImagesManager.getBitmapText(description, "debussy");
                    titleObj.y = 30;
                    descriptionObj.y = 130;
                    titleObj.scaleX = titleObj.scaleY = 1.2;
                    descriptionObj.scaleX = descriptionObj.scaleY = 0.9;
                    titleObj.x = descriptionObj.x = 450;
                    tContainer.addChild(titleObj);
                    tContainer.addChild(descriptionObj);
                    this.addChild(tContainer);
                    tContainer.cache(450, 0, 1000, 356);
                    // Add Jelly
                    var j = new joinjelly.gameplay.view.Jelly();
                    j.setNumber(value);
                    j.x = 332 / 2;
                    j.y = 332;
                    j.scaleX = j.scaleY = 1.4;
                    this.addChild(j);
                }
                return JellyPediaItem;
            })(createjs.Container);
            view.JellyPediaItem = JellyPediaItem;
        })(view = menus.view || (menus.view = {}));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var view;
        (function (view) {
            var StoreItem = (function (_super) {
                __extends(StoreItem, _super);
                function StoreItem(product) {
                    var _this = this;
                    _super.call(this);
                    this.product = product;
                    var tContainer = new createjs.Container();
                    // Add Background
                    var bg = gameui.ImagesManager.getBitmap("FlyGroup");
                    bg.x = 232;
                    bg.y = 27;
                    bg.scaleY = 1.25;
                    bg.scaleX = 0.75;
                    tContainer.addChild(bg);
                    // Add Icon
                    var iconId = "";
                    switch (product.ProductId) {
                        case "time5x":
                            iconId = "itemtime";
                            break;
                        case "fast5x":
                            iconId = "itemfast";
                            break;
                        case "revive5x":
                            iconId = "itemrevive";
                            break;
                        case "clean5x":
                            iconId = "itemclean";
                            break;
                        case "pack5x":
                        case "pack10x":
                            iconId = "itemPack";
                            break;
                        case "lucky":
                            iconId = "lucky";
                            break;
                    }
                    var icon = gameui.ImagesManager.getBitmap(iconId);
                    icon.regX = icon.getBounds().width / 2;
                    icon.regY = icon.getBounds().height / 2;
                    icon.x = 225;
                    icon.y = 188;
                    icon.scaleX = icon.scaleY = 1.5;
                    tContainer.addChild(icon);
                    // Add Texts
                    var titleObj = gameui.ImagesManager.getBitmapText(product.Name, "debussy");
                    var descriptionObj = gameui.ImagesManager.getBitmapText(product.Description, "debussy");
                    titleObj.y = 40;
                    descriptionObj.y = 140;
                    titleObj.scaleX = titleObj.scaleY = 1.1;
                    descriptionObj.scaleX = descriptionObj.scaleY = 0.8;
                    titleObj.x = descriptionObj.x = 400;
                    tContainer.addChild(titleObj);
                    tContainer.addChild(descriptionObj);
                    // add price
                    var priceDO = gameui.ImagesManager.getBitmapText(product.FormattedPrice, "debussy");
                    priceDO.y = 251;
                    priceDO.x = 1199;
                    priceDO.regX = priceDO.getBounds().width / 2;
                    priceDO.scaleX = priceDO.scaleY = 0.8;
                    tContainer.addChild(priceDO);
                    this.addChild(tContainer);
                    tContainer.cache(100, 27, 1250, 300);
                    // add Check
                    var unchecked = gameui.ImagesManager.getBitmap("unchecked");
                    unchecked.regX = unchecked.getBounds().width / 2;
                    unchecked.regY = unchecked.getBounds().height / 2;
                    unchecked.y = 152;
                    unchecked.x = 1199;
                    this.addChild(unchecked);
                    // add Check
                    var check = gameui.ImagesManager.getBitmap("check");
                    check.regX = check.getBounds().width / 2;
                    check.regY = check.getBounds().height / 2;
                    check.y = 152;
                    check.x = 1199;
                    this.purchasedIcon = check;
                    this.addChild(check);
                    // add loading
                    var loading = new joinjelly.view.LoadingBall();
                    loading.y = 152;
                    loading.x = 1199;
                    this.loadingIcon = loading;
                    this.addChild(loading);
                    // add purchase buttton
                    var button = new gameui.ImageButton("BtStore", function () {
                        _this.dispatchEvent({ type: "buy", product: _this.product.ProductId });
                    });
                    button.y = 152;
                    button.x = 1199;
                    this.purchaseButton = button;
                    this.addChild(button);
                }
                StoreItem.prototype.setPurchasing = function () {
                    this.disable();
                };
                StoreItem.prototype.loading = function () {
                    this.disable();
                    this.loadingIcon.visible = true;
                };
                StoreItem.prototype.setNotAvaliable = function () {
                    this.purchaseButton.fadeOut();
                    this.purchasedIcon.visible = false;
                    this.loadingIcon.visible = false;
                };
                StoreItem.prototype.setAvaliable = function () {
                };
                StoreItem.prototype.setPurchased = function () {
                    this.purchaseButton.fadeOut();
                    this.purchasedIcon.visible = true;
                    this.loadingIcon.visible = false;
                };
                StoreItem.prototype.enable = function () {
                    this.purchaseButton.fadeIn();
                    this.loadingIcon.visible = false;
                };
                StoreItem.prototype.disable = function () {
                    this.purchasedIcon.visible = false;
                    this.purchaseButton.fadeOut();
                };
                return StoreItem;
            })(createjs.Container);
            view.StoreItem = StoreItem;
        })(view = menus.view || (menus.view = {}));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var StoreMenu = (function (_super) {
            __extends(StoreMenu, _super);
            function StoreMenu(previousScreen) {
                var _this = this;
                _super.call(this, StringResources.store.title);
                this.previousScreen = previousScreen;
                // add loading info
                var loading = gameui.ImagesManager.getBitmapText(StringResources.menus.loading, "debussy");
                loading.y = 500;
                loading.x = defaultWidth / 2;
                loading.regX = loading.getBounds().width / 2;
                this.scrollableContent.addChild(loading);
                var ball = new joinjelly.view.LoadingBall();
                this.scrollableContent.addChild(ball);
                ball.y = 800;
                ball.x = defaultWidth / 2;
                // request product list
                InAppPurchases.requestProductList(function (productList) {
                    _this.scrollableContent.removeChild(loading);
                    _this.scrollableContent.removeChild(ball);
                    _this.fillProducts(productList);
                });
                // add Footer
                this.gameFooter = new joinjelly.gameplay.view.GameFooter(["time", "clean", "fast", "revive"]);
                this.footer.addChild(this.gameFooter);
                this.gameFooter.mouseEnabled = false;
                this.updateFooter();
                this.content.y -= 200;
                this.okButtonAction = function () {
                    joinjelly.JoinJelly.gameScreen.switchScreen(previousScreen);
                };
            }
            // add all products in the list
            StoreMenu.prototype.fillProducts = function (productList) {
                var _this = this;
                for (var p in productList) {
                    var pi = new menus.view.StoreItem(productList[p]);
                    this.scrollableContent.addChild(pi);
                    pi.y = p * 380 + 380;
                    pi.x = 70;
                    // executa a compra do app.
                    pi.addEventListener("buy", function (event) {
                        var si = event.currentTarget;
                        si.setPurchasing();
                        _this.lockUI();
                        _this.purchaseProduct(event["product"], function (sucess) {
                            if (sucess) {
                                si.setPurchased();
                                gameui.AudiosManager.playSound("Interface Sound-11");
                            }
                            _this.updateFooter();
                            _this.unlockUI();
                        });
                    });
                }
            };
            // call for product purchasing
            StoreMenu.prototype.purchaseProduct = function (productId, callback) {
                var _this = this;
                InAppPurchases.purchaseProductRequest(productId, function (productId, sucess) {
                    _this.fullFillPurchase(productId);
                    InAppPurchases.reportProductFullfillment(productId);
                    callback(sucess);
                });
            };
            StoreMenu.prototype.lockUI = function (timeout) {
                var _this = this;
                if (timeout === void 0) { timeout = 5000; }
                this.content.mouseEnabled = false;
                setTimeout(function () {
                    _this.unlockUI();
                }, timeout);
            };
            //locks unlocks ui
            StoreMenu.prototype.unlockUI = function () {
                this.content.mouseEnabled = true;
            };
            StoreMenu.prototype.updateProductsAvaliability = function () {
            };
            StoreMenu.prototype.fullFillPurchase = function (productId) {
                switch (productId) {
                    case "time5x":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("time", 5);
                        break;
                    case "fast5x":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("fast", 5);
                        break;
                    case "clean5x":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("clean", 5);
                        break;
                    case "revive5x":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("revive", 5);
                        break;
                    case "pack5x":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("time", 5);
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("clean", 5);
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("fast", 5);
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("revive", 5);
                        break;
                    case "pack10x":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("clean", 10);
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("fast", 10);
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("time", 10);
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("revive", 10);
                        break;
                    case "lucky":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount("lucky", 1);
                        break;
                }
                return true;
            };
            // update footer
            StoreMenu.prototype.updateFooter = function () {
                var items = joinjelly.ItemsData.items;
                for (var i in items)
                    this.gameFooter.setItemAmmount(items[i], joinjelly.JoinJelly.itemData.getItemAmmount(items[i]));
            };
            return StoreMenu;
        })(joinjelly.ScrollablePage);
        menus.StoreMenu = StoreMenu;
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.call(this, StringResources.menus.menu);
            this.maxScroll = 1700;
            var space = 270;
            var y = 400;
            // add Sound Button
            var soundOptions = new joinjelly.menus.view.SoundOptions();
            this.scrollableContent.addChild(soundOptions);
            this.scrollableContent.x = defaultWidth / 2;
            soundOptions.y = y += space;
            // add Tutorial button
            var tutorial = new gameui.BitmapTextButton(StringResources.menus.tutorial, "debussy", "BtTextBg", function () {
                joinjelly.JoinJelly.startTutorial();
            });
            tutorial.y = y += space;
            this.scrollableContent.addChild(tutorial);
            //// add About Button
            //var about = new gameui.BitmapTextButton(StringResources.menus.about, "debussy", "BtTextBg", () => { alert("beta"); })
            //about.y = y += space;
            //this.scrollableContent.addChild(about);
            // add Reset Button
            var reset = new gameui.BitmapTextButton(StringResources.menus.reset, "debussy", "BtTextBg", function () {
                if (confirm(StringResources.menus.resetWarning)) {
                    joinjelly.JoinJelly.userData.resetAll();
                    joinjelly.JoinJelly.showMainMenu();
                }
            });
            reset.y = y += space;
            this.scrollableContent.addChild(reset);
        }
        return MainMenu;
    })(joinjelly.ScrollablePage);
    joinjelly.MainMenu = MainMenu;
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var About = (function (_super) {
        __extends(About, _super);
        function About() {
            _super.call(this, StringResources.menus.about);
            this.maxScroll = 1700;
        }
        return About;
    })(joinjelly.ScrollablePage);
    joinjelly.About = About;
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var view;
        (function (view) {
            var SoundOptions = (function (_super) {
                __extends(SoundOptions, _super);
                function SoundOptions() {
                    _super.call(this);
                    this.addSoundOptions();
                }
                SoundOptions.prototype.addSoundOptions = function () {
                    var _this = this;
                    var f = gameui.ImagesManager.getBitmap("FlyGroup");
                    f.y = -130;
                    f.regX = f.getBounds().width / 2;
                    this.addChild(f);
                    var t = gameui.ImagesManager.getBitmapText(StringResources.menus.sound, "debussy");
                    t.y = -190;
                    t.regX = t.getBounds().width / 2;
                    this.addChild(t);
                    //add continue button;
                    this.musicBtOn = new gameui.ImageButton("BtMusic", (function () {
                        _this.setMusic(0);
                    }));
                    this.musicBtOn.x = -145;
                    this.addChild(this.musicBtOn);
                    //add share button;
                    this.soundBtOn = new gameui.ImageButton("BtSound", (function () {
                        _this.setSound(0);
                    }));
                    this.soundBtOn.x = 155;
                    this.addChild(this.soundBtOn);
                    //add continue button;
                    this.musicBtOff = new gameui.ImageButton("BtMusicOff", (function () {
                        _this.setMusic(1);
                    }));
                    this.musicBtOff.x = -145;
                    this.addChild(this.musicBtOff);
                    //add share button;
                    this.soundBtOff = new gameui.ImageButton("BtSoundOff", (function () {
                        _this.setSound(1);
                    }));
                    this.soundBtOff.x = 155;
                    this.addChild(this.soundBtOff);
                    var mus = joinjelly.JoinJelly.userData.getMusicVol();
                    var snd = joinjelly.JoinJelly.userData.getSoundVol();
                    this.musicBtOff.visible = !mus;
                    this.soundBtOff.visible = !snd;
                    this.musicBtOn.visible = !!mus;
                    this.soundBtOn.visible = !!snd;
                };
                SoundOptions.prototype.setMusic = function (value) {
                    if (value) {
                        this.musicBtOff.fadeOut();
                        this.musicBtOn.fadeIn();
                    }
                    else {
                        this.musicBtOn.fadeOut();
                        this.musicBtOff.fadeIn();
                    }
                    joinjelly.JoinJelly.userData.setMusicVol(value);
                    gameui.AudiosManager.setMusicVolume(value ? 1 : 0);
                };
                SoundOptions.prototype.setSound = function (value) {
                    if (value) {
                        this.soundBtOff.fadeOut();
                        this.soundBtOn.fadeIn();
                    }
                    else {
                        this.soundBtOn.fadeOut();
                        this.soundBtOff.fadeIn();
                    }
                    joinjelly.JoinJelly.userData.setSoundVol(value);
                    gameui.AudiosManager.setSoundVeolume(value ? 1 : 0);
                };
                return SoundOptions;
            })(createjs.Container);
            view.SoundOptions = SoundOptions;
        })(view = menus.view || (menus.view = {}));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var view;
    (function (view) {
        var JellyContainer = (function (_super) {
            __extends(JellyContainer, _super);
            function JellyContainer() {
                _super.call(this);
                this.shadowContainer = new createjs.Container();
                this.imageContainer = new createjs.Container();
                this.addChild(this.shadowContainer);
                this.addChild(this.imageContainer);
            }
            //#region animations =============================================
            JellyContainer.prototype.executeAnimationIn = function () {
                var _this = this;
                if (this.state == "in")
                    return;
                this.state = "in";
                this.restore();
                this.imageContainer.set({
                    alpha: 0,
                    scaleX: 0,
                    scaleY: 0,
                    y: -40
                });
                this.shadowContainer.set({
                    alpha: 0,
                    scaleX: 0,
                });
                createjs.Tween.get(this.imageContainer).to({ alpha: 1, scaleX: 0.8, scaleY: 1.2 }, 200, createjs.Ease.sineOut).to({ scaleX: 1, scaleY: 1, y: 0 }, 2000, createjs.Ease.elasticOut).call(function () {
                    _this.executeIdle();
                });
                createjs.Tween.get(this.shadowContainer).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 400, createjs.Ease.sineOut).call(function () {
                    //this.executeIdle();
                });
                ;
            };
            JellyContainer.prototype.executeAnimationHold = function () {
                if (this.state == "hold")
                    return;
                this.state = "hold";
                this.restore();
                createjs.Tween.get(this.imageContainer).to({
                    scaleX: 0.8,
                    scaleY: 1.2
                }, 1000, createjs.Ease.elasticOut);
                createjs.Tween.get(this.shadowContainer).to({ alpha: 0 }, 200);
            };
            JellyContainer.prototype.executeAimationRelease = function () {
                var _this = this;
                if (this.state == "release")
                    return;
                this.state = "release";
                this.restore();
                createjs.Tween.get(this.imageContainer).to({
                    scaleX: 0.8,
                    scaleY: 1.2
                }, 5, createjs.Ease.sineInOut).to({
                    scaleX: 1,
                    scaleY: 1
                }, 2000, createjs.Ease.elasticOut).call(function () {
                    _this.executeIdle();
                });
                createjs.Tween.get(this.shadowContainer).to({ alpha: 1 }, 200);
            };
            //#endregion
            //#region idle animations  =============================================
            JellyContainer.prototype.restore = function () {
                this.state = "";
                createjs.Tween.removeTweens(this.imageContainer);
                createjs.Tween.removeTweens(this.shadowContainer);
                this.visible = true;
                this.alpha = 1;
                this.imageContainer.scaleX = this.imageContainer.scaleY = 1;
                this.imageContainer.skewX = this.imageContainer.skewY = 0;
                this.imageContainer.rotation = 0;
                this.imageContainer.alpha = 1;
                this.imageContainer.visible = true;
                this.imageContainer.y = 0;
                this.shadowContainer.visible = true;
                this.shadowContainer.alpha = 1;
                this.shadowContainer.skewX = this.shadowContainer.skewY = 0;
            };
            JellyContainer.prototype.executeIdle = function () {
                if (this.state == "idle")
                    return;
                this.state = "idle";
                switch (Math.floor(Math.random() * 3)) {
                    case 0:
                        this.executeIdle1();
                        break;
                    case 1:
                        this.executeIdle2();
                        break;
                    case 2:
                        this.executeIdle3();
                        break;
                }
            };
            JellyContainer.prototype.executeIdle1 = function () {
                var _this = this;
                var f = Math.random() * 500 + 600;
                var skew = Math.random();
                if (skew < 0.6)
                    skew = skew / 2;
                var scale = Math.random();
                var loop = 4 + Math.floor(Math.random() * 3);
                //if (scale < 0.6) scale = scale / 2;
                scale = scale / 10;
                createjs.Tween.get(this.imageContainer).to({
                    skewX: 0,
                    scaleX: 1 + scale,
                    scaleY: 1 - scale
                }, 400, createjs.Ease.quadInOut).call(function () {
                    createjs.Tween.get(_this.imageContainer, { loop: true }).to({ skewX: skew * 10 }, f, createjs.Ease.quadOut).to({ skewX: skew * 0 }, f, createjs.Ease.quadIn).to({ skewX: skew * -10 }, f, createjs.Ease.quadOut).to({ skewX: skew * 0 }, f, createjs.Ease.quadIn);
                    createjs.Tween.get(_this.imageContainer, { loop: true }).to({ scaleX: 1 - scale, scaleY: 1 + scale }, f, createjs.Ease.quadInOut).to({ scaleX: 1 + scale, scaleY: 1 - scale }, f, createjs.Ease.quadInOut).to({ scaleX: 1 - scale, scaleY: 1 + scale }, f, createjs.Ease.quadInOut).to({ scaleX: 1 + scale, scaleY: 1 - scale }, f, createjs.Ease.quadInOut);
                });
                createjs.Tween.get(this.shadowContainer).to({ alpha: 1, scaleY: 1, scaleX: 1, skewX: 0 }, 400, createjs.Ease.quadInOut).call(function () {
                    createjs.Tween.get(_this.shadowContainer, { loop: true }).to({ skewX: -5 * skew }, f, createjs.Ease.quadOut).to({ skewX: 0 * skew }, f, createjs.Ease.quadIn).to({ skewX: 5 * skew }, f, createjs.Ease.quadOut).to({ skewX: 0 * skew }, f, createjs.Ease.quadIn);
                });
            };
            JellyContainer.prototype.executeIdle2 = function () {
                var _this = this;
                var time = Math.random() * 500 + 600;
                var skew = Math.random();
                if (skew < 0.6)
                    skew = skew / 2;
                var scale = Math.random() * 0.5 + 0.5;
                var loop = 4 + Math.floor(Math.random() * 3);
                //if (scale < 0.6) scale = scale / 2;
                scale = scale / 10;
                createjs.Tween.get(this.imageContainer).to({
                    scaleX: 1,
                    scaleY: 1
                }, 400, createjs.Ease.quadInOut).call(function () {
                    createjs.Tween.get(_this.imageContainer, { loop: true }).to({ scaleX: 1 - scale, scaleY: 1 + scale }, time / 4, createjs.Ease.quadInOut).to({ scaleX: 1 + scale, scaleY: 1 - scale }, time / 4, createjs.Ease.quadInOut).to({ scaleX: 1 - scale, scaleY: 1 + scale }, time / 4, createjs.Ease.quadInOut).to({ scaleX: 1 + scale, scaleY: 1 - scale }, time / 4, createjs.Ease.quadInOut).to({ scaleX: 1, scaleY: 1 }, time * 2, createjs.Ease.elasticOut);
                });
            };
            JellyContainer.prototype.executeIdle3 = function () {
                var _this = this;
                var time = Math.random() * 500 + 600;
                var skew = Math.random();
                if (skew < 0.6)
                    skew = skew / 2;
                var scale = Math.random() * 0.5 + 0.5;
                var loop = 4 + Math.floor(Math.random() * 3);
                scale = scale / 10;
                createjs.Tween.get(this.imageContainer).to({
                    scaleX: 1,
                    scaleY: 1,
                    y: 0
                }, 400, createjs.Ease.quadInOut).call(function () {
                    createjs.Tween.get(_this.imageContainer, { loop: true }).to({ scaleX: 1 + scale * 2, scaleY: 1 - scale * 2, y: 0 }, time / 2, createjs.Ease.quadInOut).to({ scaleX: 1 - scale * 2, scaleY: 1 + scale * 2, y: 0 }, time / 4, createjs.Ease.quadIn).to({ scaleX: 1 + scale * 1, scaleY: 1 - scale * 1, y: -70 }, time / 4, createjs.Ease.quadOut).to({ scaleX: 1 - scale * 2, scaleY: 1 + scale * 2, y: 0 }, time / 5, createjs.Ease.quadIn).to({ scaleX: 1, scaleY: 1 }, time * 2, createjs.Ease.elasticOut);
                });
            };
            return JellyContainer;
        })(createjs.Container);
        view.JellyContainer = JellyContainer;
    })(view = joinjelly.view || (joinjelly.view = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var view;
    (function (view) {
        var LoadingBall = (function (_super) {
            __extends(LoadingBall, _super);
            function LoadingBall() {
                _super.call(this);
                var b = new createjs.Bitmap("assets/images/loadingBall.png");
                this.addChild(b);
                b.regX = 94 / 2;
                b.regY = 94;
                b.y = 94 / 2;
                var f = 600;
                var skew = 1;
                var scale = 0.1;
                createjs.Tween.get(b).to({
                    skewX: 0,
                    scaleX: 1 + scale,
                    scaleY: 1 - scale
                }, 400, createjs.Ease.quadInOut).call(function () {
                    createjs.Tween.get(b, { loop: true }).to({ skewX: skew * 10 }, f, createjs.Ease.quadOut).to({ skewX: skew * 0 }, f, createjs.Ease.quadIn).to({ skewX: skew * -10 }, f, createjs.Ease.quadOut).to({ skewX: skew * 0 }, f, createjs.Ease.quadIn);
                    createjs.Tween.get(b, { loop: true }).to({ scaleX: 1 - scale, scaleY: 1 + scale }, f, createjs.Ease.quadInOut).to({ scaleX: 1 + scale, scaleY: 1 - scale }, f, createjs.Ease.quadInOut).to({ scaleX: 1 - scale, scaleY: 1 + scale }, f, createjs.Ease.quadInOut).to({ scaleX: 1 + scale, scaleY: 1 - scale }, f, createjs.Ease.quadInOut);
                });
            }
            return LoadingBall;
        })(createjs.Container);
        view.LoadingBall = LoadingBall;
    })(view = joinjelly.view || (joinjelly.view = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var view;
        (function (view) {
            var GameHeader = (function (_super) {
                __extends(GameHeader, _super);
                function GameHeader() {
                    _super.call(this);
                    this.addObjects();
                }
                GameHeader.prototype.addObjects = function () {
                    var _this = this;
                    //add background
                    var bg = gameui.ImagesManager.getBitmap("header");
                    this.addChild(bg);
                    bg.x = 0;
                    bg.mouseEnabled = false;
                    //add pause button
                    var pauseButton = new gameui.ImageButton("BtPause", function () {
                        _this.dispatchEvent("pause");
                    });
                    pauseButton.x = 106;
                    pauseButton.y = 219;
                    this.addChild(pauseButton);
                    //add levelBar
                    var levelBarBorder = gameui.ImagesManager.getBitmap("bonus_border");
                    this.addChild(levelBarBorder);
                    levelBarBorder.x = 223;
                    levelBarBorder.y = 122;
                    var levelBar = gameui.ImagesManager.getBitmap("bonus_bar");
                    this.addChild(levelBar);
                    levelBar.x = 282;
                    levelBar.y = 151;
                    this.levelBar = levelBar;
                    //add scores text
                    var score = gameui.ImagesManager.getBitmapText(StringResources.menus.score, "debussy");
                    //score.textBaseline = "middle";
                    score.x = 323;
                    score.y = 124 - 80;
                    this.scoreText = score;
                    this.addChild(score);
                    //add scores text
                    var level = gameui.ImagesManager.getBitmapText(StringResources.menus.level, "debussy");
                    //level.textBaseline = "middle";
                    level.x = 1099;
                    level.y = 242 - 200;
                    level.scaleX = level.scaleY = 2;
                    this.levelText = level;
                    this.addChild(level);
                    //add timebar
                    this.timebar = new view.TimeBar();
                    this.addChild(this.timebar);
                    this.timebar.x = 281;
                    this.timebar.y = 233;
                };
                // updates level ad score status
                GameHeader.prototype.updateStatus = function (score, level, percent, emptyPercent, alarm) {
                    var _this = this;
                    this.scoreText.text = StringResources.menus.score.toUpperCase() + " " + score.toString();
                    this.levelText.text = level.toString();
                    var value = 1;
                    //updates timebar
                    this.timebar.setPercent(emptyPercent, alarm);
                    //updates percent
                    if (percent != undefined)
                        if (score != this.lastScore) {
                            value = percent / 100;
                            createjs.Tween.removeTweens(this.levelBar);
                            createjs.Tween.get(this.levelBar).to({ scaleX: value }, 1000, createjs.Ease.elasticOut);
                        }
                    // if level changes. do some animations
                    if (this.lastLevel != level) {
                        //moves the bar
                        createjs.Tween.removeTweens(this.levelBar);
                        createjs.Tween.get(this.levelBar).to({ scaleX: 1 }, 100, createjs.Ease.quadIn).call(function () {
                            _this.levelBar.scaleX = 0;
                        });
                        //increase number
                        createjs.Tween.removeTweens(this.levelText);
                        this.levelText.scaleY = this.levelText.scaleX = 4;
                        createjs.Tween.get(this.levelText).to({ scaleX: 2, scaleY: 2 }, 1000, createjs.Ease.elasticOut);
                    }
                    this.lastLevel = level;
                    this.lastScore = score;
                };
                return GameHeader;
            })(createjs.Container);
            view.GameHeader = GameHeader;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var view;
        (function (view) {
            var Jelly = (function (_super) {
                __extends(Jelly, _super);
                // #region initialization =========================================
                function Jelly() {
                    _super.call(this);
                    this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("black").rect(-115, -230, 230, 230));
                    this.joinFx = gameui.ImagesManager.getBitmap("fxJoin");
                    this.joinFx.visible = false;
                    this.joinFx.regX = 100;
                    this.joinFx.regY = 100;
                    this.joinFx.y = -115;
                }
                Jelly.prototype.createJelly = function (value) {
                    var img = gameui.ImagesManager.getBitmap("j" + value);
                    //centralize
                    img.regX = img.getBounds().width / 2;
                    img.regY = img.getBounds().height;
                    var shadow = gameui.ImagesManager.getBitmap("shadow");
                    shadow.regY = 45;
                    shadow.regX = 108;
                    shadow.scaleX = shadow.scaleY = img.getBounds().width / 216;
                    this.shadowContainer.addChild(shadow);
                    this.imageContainer.addChild(img);
                };
                Jelly.prototype.createEyes = function (value) {
                    //add Eyes
                    var eye = new createjs.Container();
                    var eyeImg = gameui.ImagesManager.getBitmap("e" + value);
                    eyeImg.regY = 20;
                    createjs.Tween.get(eyeImg, { loop: true }).wait(3000 + Math.random() * 1000).to({ scaleY: 0.2 }, 100).to({ scaleY: 1 }, 100);
                    eye.addChild(eyeImg);
                    eye.regX = 133 / 2;
                    if (eyeImg.getBounds())
                        eye.regX = eyeImg.getBounds().width / 2;
                    eye.y = Math.min(-50, -eye.getBounds().height);
                    this.imageContainer.addChild(eye);
                    this.eyeImg = eyeImg;
                };
                /// #endregion
                // #region behaviour ==============================================
                //set tile number
                Jelly.prototype.setNumber = function (value) {
                    if (this.currentValue == value)
                        return;
                    this.currentValue = value;
                    //update image 
                    if (this.eyeImg)
                        createjs.Tween.removeTweens(this.eyeImg);
                    this.imageContainer.removeAllChildren();
                    this.shadowContainer.removeAllChildren();
                    //if values equals zero, hide the tile
                    if (value == 0 || !value) {
                        this.visible = false;
                    }
                    else {
                        //enable visibility
                        this.visible = true;
                        this.alpha = 1;
                        this.createJelly(value);
                        this.createEyes(value);
                        this.executeAnimationIn();
                        if (value > 1)
                            this.playJoinFX();
                    }
                };
                // #endregion
                // #region Animation ==============================================
                Jelly.prototype.playJoinFX = function () {
                    var _this = this;
                    this.joinFx.visible = true;
                    this.joinFx.set({ scaleX: 0, scaleY: 0, alpha: 1, visible: true });
                    this.addChild(this.joinFx);
                    createjs.Tween.get(this.joinFx).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 200).call(function () {
                        _this.removeChild(_this.joinFx);
                        _this.joinFx.visible = false;
                    });
                    setTimeout(function () {
                        var x = 1;
                    }, 1000);
                };
                Jelly.prototype.playLevelUp = function () {
                    var _this = this;
                    this.joinFx.visible = true;
                    this.joinFx.set({ scaleX: 0, scaleY: 0, alpha: 0.6, visible: true });
                    this.addChild(this.joinFx);
                    createjs.Tween.get(this.joinFx).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 200).call(function () {
                        _this.joinFx.visible = false;
                        _this.removeChild(_this.joinFx);
                    });
                    setTimeout(function () {
                        var x = 1;
                    }, 1000);
                };
                return Jelly;
            })(joinjelly.view.JellyContainer);
            view.Jelly = Jelly;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var view;
        (function (view) {
            var LevelIndicator = (function (_super) {
                __extends(LevelIndicator, _super);
                function LevelIndicator() {
                    _super.apply(this, arguments);
                }
                LevelIndicator.prototype.showLevel = function (levelId) {
                    var _this = this;
                    var text = gameui.ImagesManager.getBitmapText("level", "debussy");
                    this.addChild(text);
                    //text.textAlign = "center";
                    text.text = "LEVEL " + levelId;
                    text.x = defaultWidth / 2;
                    text.y = defaultHeight / 2 + 140;
                    text.alpha = 0;
                    text.regX = text.getBounds().width / 2;
                    createjs.Tween.get(text).to({ y: defaultHeight / 2, alpha: 1 }, 200, createjs.Ease.quadOut).wait(500).to({ y: defaultHeight / 2 - 200, alpha: 0 }, 200, createjs.Ease.quadIn).call(function () {
                        _this.removeChild(text);
                        delete text;
                    });
                    ;
                };
                return LevelIndicator;
            })(createjs.Container);
            view.LevelIndicator = LevelIndicator;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var view;
        (function (view) {
            var ItemButton = (function (_super) {
                __extends(ItemButton, _super);
                function ItemButton(item) {
                    var _this = this;
                    _super.call(this);
                    this.ammount = 0;
                    this.locked = false;
                    this.item = item;
                    this.addEventListener("click", function () {
                        _this.dispatchEvent({ type: "useitem", item: item });
                    });
                    //create Item
                    var bg = gameui.ImagesManager.getBitmap("itemBG");
                    var bgd = gameui.ImagesManager.getBitmap("itemBGDisabled");
                    var img = gameui.ImagesManager.getBitmap("item" + item);
                    var text = gameui.ImagesManager.getBitmapText("0", "debussy");
                    var name = gameui.ImagesManager.getBitmapText(StringResources.items[item], "debussy");
                    var add = gameui.ImagesManager.getBitmap("BtPlusMini");
                    this.disabled = bgd;
                    this.addChild(bg);
                    this.addChild(bgd);
                    this.addChild(img);
                    this.addChild(text);
                    this.addChild(name);
                    this.addChild(add);
                    //organize items
                    bgd.visible = false;
                    bgd.regX = bg.regX = bg.getBounds().width / 2;
                    bgd.regY = bg.regY = bg.getBounds().height / 2;
                    img.regX = img.getBounds().width / 2;
                    img.regY = img.getBounds().height / 2;
                    img.scaleX = img.scaleY = 0.8;
                    img.y = -25;
                    text.scaleX = text.scaleY = 0.7;
                    text.y = -110;
                    text.x = -80;
                    text.name = 'value';
                    name.scaleX = name.scaleY = 0.6;
                    name.y = 30;
                    name.x = 0;
                    name.regX = name.getBounds().width / 2;
                    name.name = 'value';
                    add.y = 0;
                    add.x = 55;
                    this.text = text;
                    this.createHitArea();
                    this.addBt = add;
                    this.addEventListener("click", function () {
                        _this.unHighlight();
                    });
                }
                ItemButton.prototype.setAmmount = function (ammount) {
                    this.ammount = ammount;
                    if (this.ammount <= 0) {
                        this.disabled.visible = true;
                        this.addBt.visible = true;
                    }
                    else {
                        this.disabled.visible = false;
                        this.addBt.visible = false;
                    }
                    this.text.text = ammount.toString();
                    this.updateColor();
                };
                ItemButton.prototype.lock = function () {
                    this.mouseEnabled = false;
                    this.locked = true;
                    this.updateColor();
                };
                ItemButton.prototype.unlock = function () {
                    this.mouseEnabled = true;
                    this.locked = false;
                    this.updateColor();
                };
                ItemButton.prototype.highLight = function () {
                    createjs.Tween.get(this, { loop: true }).to({ rotation: -10, scaleX: 1, scaleY: 1 }, 100, createjs.Ease.quadInOut).to({ rotation: +10, scaleX: 1.3, scaleY: 1.3 }, 200, createjs.Ease.quadInOut).to({ rotation: -10, scaleX: 1.3, scaleY: 1.3 }, 200, createjs.Ease.quadInOut).to({ rotation: +10, scaleX: 1.3, scaleY: 1.3 }, 200, createjs.Ease.quadInOut).to({ rotation: 0, scaleX: 1, scaleY: 1 }, 100, createjs.Ease.quadInOut).wait(400);
                };
                ItemButton.prototype.unHighlight = function () {
                    createjs.Tween.removeTweens(this);
                    this.set({ rotation: 0, scaleX: 1, scaleY: 1 });
                };
                ItemButton.prototype.updateColor = function () {
                    if (this.locked || this.ammount <= 0)
                        this.disabled.visible = true;
                    else
                        this.disabled.visible = false;
                };
                return ItemButton;
            })(gameui.Button);
            view.ItemButton = ItemButton;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var view;
        (function (view) {
            var GameFooter = (function (_super) {
                __extends(GameFooter, _super);
                function GameFooter(items) {
                    _super.call(this);
                    this.itemSize = 270;
                    this.itemsButtons = [];
                    this.addObjects();
                    this.setItems(items);
                }
                // add all button items
                GameFooter.prototype.setItems = function (items) {
                    // clean all buttons
                    this.cleanButtons();
                    if (!items)
                        return;
                    for (var i in items)
                        this.addItem(items[i], i);
                    for (var i in items) {
                        //set button position
                        this.itemsButtons[items[i]].y = -150;
                        this.itemsButtons[items[i]].x = (defaultWidth - (items.length - 1) * this.itemSize) / 2 + i * this.itemSize;
                    }
                };
                // clean buttons
                GameFooter.prototype.cleanButtons = function () {
                    for (var i in this.itemsButtons)
                        this.removeChild(this.itemsButtons[i]);
                    this.itemsButtons = [];
                };
                // add objects to the footer
                GameFooter.prototype.addObjects = function () {
                    //add background
                    var bg = gameui.ImagesManager.getBitmap("footer");
                    this.addChild(bg);
                    bg.y = -162;
                    bg.x = (defaultWidth - 1161) / 2;
                    // add Lucky clover
                    // TODO verify with item
                    var lucky = gameui.ImagesManager.getBitmap("lucky");
                    this.addChild(lucky);
                    lucky.y = -210;
                    lucky.x = 1285;
                    this.lucky = lucky;
                    // lucky.visible = false;
                };
                //add a single item button to the footer
                GameFooter.prototype.addItem = function (item, pos) {
                    var _this = this;
                    //create button
                    var bt = new view.ItemButton(item);
                    this.addChild(bt);
                    this.itemsButtons[item] = bt;
                    //add event listener
                    bt.addEventListener("click", function () {
                        _this.dispatchEvent({ type: "useitem", item: item });
                    });
                };
                // get a item display object
                GameFooter.prototype.getItemButton = function (item) {
                    return this.itemsButtons[item];
                };
                // set item ammount
                GameFooter.prototype.setItemAmmount = function (item, ammount) {
                    if (this.itemsButtons[item])
                        this.itemsButtons[item].setAmmount(ammount);
                    if (item == "lucky")
                        this.lucky.visible = (ammount > 0);
                };
                GameFooter.prototype.highlight = function (item) {
                    this.unHighlightAll();
                    this.getItemButton(item).highLight();
                };
                GameFooter.prototype.unHighlightAll = function () {
                    for (var i in this.itemsButtons)
                        this.itemsButtons[i].unHighlight();
                };
                // lock a item
                GameFooter.prototype.lockItem = function (itemId) {
                    var b = this.getItemButton(itemId);
                    b.lock();
                };
                GameFooter.prototype.unlockItem = function (itemId) {
                    var b = this.getItemButton(itemId);
                    b.unlock();
                };
                GameFooter.prototype.lockAll = function () {
                    for (var b in this.itemsButtons)
                        this.itemsButtons[b].lock();
                };
                GameFooter.prototype.unlockAll = function () {
                    for (var b in this.itemsButtons)
                        this.itemsButtons[b].unlock();
                };
                return GameFooter;
            })(createjs.Container);
            view.GameFooter = GameFooter;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var view;
        (function (view) {
            var PauseMenu = (function (_super) {
                __extends(PauseMenu, _super);
                function PauseMenu() {
                    _super.call(this, StringResources.menus.pause);
                    this.addButtons();
                    var soundOptions = new joinjelly.menus.view.SoundOptions();
                    this.addChild(soundOptions);
                    soundOptions.set({ x: defaultWidth / 2, y: 1000 });
                }
                //creates buttons controls
                PauseMenu.prototype.addButtons = function () {
                    var _this = this;
                    //add continue button;
                    var ok = new gameui.ImageButton("BtPlay", (function () {
                        _this.dispatchEvent("play");
                    }));
                    ok.set({ x: 771, y: 1599 });
                    this.addChild(ok);
                    //add share button;
                    var board = new gameui.ImageButton("BtHome", (function () {
                        _this.dispatchEvent("home");
                    }));
                    board.set({ x: 353, y: 1570 });
                    this.addChild(board);
                    //add showBoard button
                    var share = new gameui.ImageButton("BtRestart", (function () {
                        _this.dispatchEvent("restart");
                    }));
                    share.set({ x: 1190, y: 1570 });
                    this.addChild(share);
                };
                return PauseMenu;
            })(joinjelly.menus.view.FlyOutMenu);
            view.PauseMenu = PauseMenu;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var view;
        (function (view) {
            var TimeBar = (function (_super) {
                __extends(TimeBar, _super);
                function TimeBar() {
                    _super.call(this);
                    this.value = 1;
                    this.initializeObjects();
                }
                TimeBar.prototype.initializeObjects = function () {
                    var percentBar = new createjs.Container();
                    var bar = gameui.ImagesManager.getBitmap("time_bar");
                    var bright = gameui.ImagesManager.getBitmap("time_bar_bright");
                    var red = gameui.ImagesManager.getBitmap("time_bar_red");
                    bright.alpha = 0;
                    this.redFx = red;
                    this.brightFx = bright;
                    createjs.Tween.get(this.redFx, { loop: true }).to({ alpha: 0 }, 500);
                    percentBar.addChild(bar);
                    this.addChild(red);
                    percentBar.addChild(bright);
                    this.addChild(percentBar);
                    var shape = new createjs.Shape();
                    shape.graphics.beginFill("red").drawRect(0, 0, 991, 35);
                    this.percentBarMask = shape;
                    percentBar.mask = this.percentBarMask;
                };
                TimeBar.prototype.setPercent = function (percent, alarm) {
                    //if value is greater, do a animation for increasing
                    if (this.value < percent)
                        this.incrasePercent();
                    this.value = percent;
                    // animates the bar
                    createjs.Tween.removeTweens(this.percentBarMask);
                    createjs.Tween.get(this.percentBarMask).to({ scaleX: percent }, 200, createjs.Ease.quadInOut);
                    // set alarm
                    if (alarm)
                        this.setAlarmOn();
                    else
                        this.setAlarmOff();
                };
                // #region animations
                TimeBar.prototype.incrasePercent = function () {
                    this.brightFx.alpha = 1;
                    createjs.Tween.get(this.brightFx).to({ alpha: 0 }, 300);
                };
                TimeBar.prototype.setAlarmOn = function () {
                    this.redFx.visible = true;
                };
                TimeBar.prototype.setAlarmOff = function () {
                    this.redFx.visible = false;
                };
                return TimeBar;
            })(createjs.Container);
            view.TimeBar = TimeBar;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var view;
        (function (view) {
            var FinishMenu = (function (_super) {
                __extends(FinishMenu, _super);
                function FinishMenu() {
                    _super.call(this, StringResources.menus.gameOver.toUpperCase(), 1250);
                    this.addButtons();
                    this.addPoints();
                    this.addLastJelly();
                }
                //creates buttons controls
                FinishMenu.prototype.addButtons = function () {
                    var _this = this;
                    //add continue button;
                    var ok = new gameui.ImageButton("BtOk", (function () {
                        _this.dispatchEvent("ok");
                    }));
                    ok.set({ x: 771, y: 1810 });
                    this.addChild(ok);
                    //add share button;
                    var board = new gameui.ImageButton("BtBoard", (function () {
                        _this.dispatchEvent("board");
                    }));
                    board.set({ x: 353, y: 1780 });
                    this.addChild(board);
                    //add showBoard button
                    var share = new gameui.ImageButton("BtShare", (function () {
                        _this.dispatchEvent("share");
                    }));
                    share.set({ x: 1190, y: 1780 });
                    this.addChild(share);
                };
                // create points control
                FinishMenu.prototype.addPoints = function () {
                    var container = new createjs.Container();
                    //creates points Bg
                    var bg = gameui.ImagesManager.getBitmap("GameOverBgPoints");
                    bg.set({ x: defaultWidth / 2, y: 565, regX: 1056 / 2 });
                    container.addChild(bg);
                    //create points object
                    var tx = gameui.ImagesManager.getBitmapText("Score", "debussy");
                    tx.set({ x: 288, y: 442 });
                    tx.scaleX = tx.scaleY = 0.7;
                    //container.addChild(tx);
                    //create "points" text
                    var tx = gameui.ImagesManager.getBitmapText("", "debussy");
                    tx.set({ x: defaultWidth / 2, y: 587 });
                    container.addChild(tx);
                    tx.scaleX = tx.scaleY = 2;
                    this.scoreText = tx;
                    //create HighScore text
                    var tx = gameui.ImagesManager.getBitmapText("", "debussy");
                    tx.set({ x: 1240, y: 775 });
                    container.addChild(tx);
                    tx.scaleX = tx.scaleY = 0.7;
                    this.higghScoreText = tx;
                    container.y += 260;
                    this.addChild(container);
                    return container;
                };
                // creates last jelly control
                FinishMenu.prototype.addLastJelly = function () {
                    var container = new createjs.Container();
                    this.addChild(container);
                    //add background
                    var bg = gameui.ImagesManager.getBitmap("GameOverBgJelly");
                    bg.set({ x: defaultWidth / 2, y: 951, regX: 797 / 2 });
                    container.addChild(bg);
                    //add "LastJelly" Text
                    var tx = gameui.ImagesManager.getBitmapText(StringResources.menus.highJelly, "debussy");
                    tx.set({ x: 420, y: 820 });
                    //container.addChild(tx);
                    tx.scaleX = tx.scaleY = 0.7;
                    //add Jelly
                    var jelly = new gameplay.view.Jelly();
                    container.addChild(jelly);
                    this.addChild(container);
                    jelly.scaleX = jelly.scaleY = 1.75;
                    jelly.set({ x: defaultWidth / 2, y: 1350 });
                    this.jelly = jelly;
                    //add "LastJelly" name Text
                    var tx = gameui.ImagesManager.getBitmapText("1", "debussy");
                    tx.set({ x: defaultWidth / 2, y: 1358 });
                    tx.scaleX = tx.scaleY = 0.7;
                    this.jellyText = tx;
                    container.addChild(tx);
                    container.y += 200;
                    return container;
                };
                //set values
                FinishMenu.prototype.setValues = function (score, best, jelly, title) {
                    var _this = this;
                    if (title)
                        this.setTitle(title);
                    var t = { value: 0 };
                    createjs.Tween.get(t).to({ value: 1 }, 3000, createjs.Ease.quadOut);
                    var interval = setInterval(function () {
                        _this.scoreText.text = Math.floor(t.value * score).toString();
                        _this.scoreText.regX = _this.scoreText.getBounds().width / 2;
                        if (t.value >= 1)
                            clearInterval(interval);
                    }, 30);
                    this.higghScoreText.text = StringResources.menus.highScore + ": " + best.toString();
                    this.jelly.setNumber(jelly);
                    this.jellyText.text = StringResources.jellys[jelly].name;
                    if (this.jellyText.getBounds())
                        this.jellyText.regX = this.jellyText.getBounds().width / 2;
                    this.higghScoreText.regX = this.higghScoreText.getBounds().width;
                };
                return FinishMenu;
            })(joinjelly.menus.view.FlyOutMenu);
            view.FinishMenu = FinishMenu;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var view;
        (function (view) {
            var TutorialMove = (function (_super) {
                __extends(TutorialMove, _super);
                function TutorialMove() {
                    _super.call(this);
                    this.fingerUp = gameui.ImagesManager.getBitmap("tutorialFinger");
                    this.fingerDown = gameui.ImagesManager.getBitmap("tutorialFingerDown");
                    this.addChild(this.fingerUp);
                    this.addChild(this.fingerDown);
                    this.fingerDown.y = this.fingerUp.image.height - this.fingerDown.image.height;
                    this.regX = 80;
                    this.mouseEnabled = false;
                    this.visible = false;
                }
                TutorialMove.prototype.showMove = function (x1, y1, x2, y2) {
                    var _this = this;
                    this.visible = true;
                    this.x = x1;
                    this.y = y1;
                    this.alpha = 0;
                    this.fu();
                    createjs.Tween.removeTweens(this);
                    createjs.Tween.get(this, { loop: true }).to({ alpha: 1 }, 500).call(function () {
                        _this.fd();
                    }).to({ x: x2, y: y2 }, 1600, createjs.Ease.quadInOut).call(function () {
                        _this.fu();
                    }).to({ alpha: 0 }, 500);
                };
                TutorialMove.prototype.showClick = function (x1, y1) {
                    var _this = this;
                    this.visible = true;
                    this.x = x1;
                    this.y = y1;
                    this.alpha = 1;
                    this.fu();
                    createjs.Tween.removeTweens(this);
                    createjs.Tween.get(this, { loop: true }).wait(500).call(function () {
                        _this.fd();
                    }).wait(1000).call(function () {
                        _this.fu();
                    });
                };
                TutorialMove.prototype.fd = function () {
                    this.fingerDown.visible = true;
                    this.fingerUp.visible = false;
                };
                TutorialMove.prototype.fu = function () {
                    this.fingerDown.visible = false;
                    this.fingerUp.visible = true;
                };
                TutorialMove.prototype.hide = function () {
                    createjs.Tween.removeTweens(this);
                    this.visible = false;
                };
                return TutorialMove;
            })(createjs.Container);
            view.TutorialMove = TutorialMove;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var view;
        (function (view) {
            var TutoralMessage = (function (_super) {
                __extends(TutoralMessage, _super);
                function TutoralMessage() {
                    var _this = this;
                    _super.call(this);
                    this.addChild(gameui.ImagesManager.getBitmap("ballon"));
                    this.visible = false;
                    this.regX = 316;
                    this.regY = 366;
                    this.x = 164 + this.regX;
                    this.y = 941 + this.regY;
                    var t = gameui.ImagesManager.getBitmapText("", "debussy");
                    this.addChild(t);
                    t.scaleX = t.scaleY = 0.7;
                    t.x = 50;
                    t.y = 50;
                    this.bitmapText = t;
                    t.mouseEnabled = false;
                    // add hitArea
                    this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(-this.x + this.regX, -this.y + this.regY, defaultWidth, defaultHeight));
                    // add click event
                    this.addEventListener("click", function () {
                        _this.fadeOut();
                        _this.dispatchEvent("closed");
                        gameui.AudiosManager.playSound("Interface Sound-15");
                    });
                }
                // show a text on screen
                TutoralMessage.prototype.show = function (text) {
                    this.bitmapText.text = text;
                    this.fadeIn();
                    gameui.AudiosManager.playSound("Interface Sound-14");
                };
                return TutoralMessage;
            })(gameui.Button);
            view.TutoralMessage = TutoralMessage;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var Board = (function (_super) {
            __extends(Board, _super);
            // #region Initialization ----------------------------------------------------------------------
            function Board(boardWidth, boardHeight, tileSize, img) {
                _super.call(this);
                this.touchDictionary = new Array();
                this.alarming = false;
                //initialize variables
                this.tiles = [];
                this.boardHeight = boardHeight;
                this.boardWidth = boardWidth;
                this.tileSize = tileSize;
                // create tiles container
                this.tilesContainer = new createjs.Container();
                this.addChild(this.tilesContainer);
                //define cache for click
                this.tilesContainer.hitArea = new createjs.Shape(new createjs.Graphics().f("red").r(0, 0, boardWidth * tileSize, (boardHeight + 0.5) * tileSize));
                // create all tiles
                this.addTiles(boardWidth, boardHeight, tileSize, img);
                this.addMouseEvents(tileSize);
                //set pivot
                this.regX = (boardWidth * tileSize / 2);
                this.regY = (boardHeight * tileSize / 2);
            }
            // add tiles on the board
            Board.prototype.addTiles = function (boardWidth, boardHeight, tileSize, img) {
                for (var x = 0; x < boardWidth; x++)
                    for (var y = 0; y < boardHeight; y++)
                        this.addTile(x, y, tileSize);
            };
            // add a single tile on board
            Board.prototype.addTile = function (x, y, tileSize) {
                var tileDO = new gameplay.Tile(x, y, tileSize);
                // add a jelly on tile
                this.tiles.push(tileDO);
                this.tilesContainer.addChild(tileDO);
                tileDO.setNumber(0);
                tileDO.name = (this.boardWidth * y + x).toString();
                tileDO.set(this.getTilePositionByCoords(x, y, tileSize));
            };
            // add mouse board interacion
            Board.prototype.addMouseEvents = function (tileSize) {
                var _this = this;
                var touchOffset = [];
                this.tilesContainer.addEventListener("mousedown", function (e) {
                    var tile = _this.getTileByRawPos(e.localX, e.localY, tileSize);
                    if (tile && tile.isUnlocked() && tile.isEnabled()) {
                        tile.lock();
                        _this.touchDictionary[e.pointerID] = tile;
                        //store offset mouse position
                        touchOffset[e.pointerID] = { x: tile.x - e.localX, y: tile.y - e.localY };
                        tile.drag();
                        //bring to front
                        _this.tilesContainer.setChildIndex(tile, _this.tilesContainer.getNumChildren() - 1);
                        gameui.AudiosManager.playSound('soundh_1');
                    }
                });
                //Press Move
                this.tilesContainer.addEventListener("pressmove", function (e) {
                    //get tile by touch
                    var tile = _this.touchDictionary[e.pointerID];
                    if (tile) {
                        tile.x = e.localX + touchOffset[e.pointerID].x;
                        tile.y = e.localY + touchOffset[e.pointerID].y;
                        tile.lock();
                        //var targetName = this.getTileIdByPos(e.localX, e.localY, tileSize);
                        var target = _this.getTileByRawPos(e.localX, e.localY, tileSize);
                        if (target && target.name.toString() != tile.name) {
                            if (target.isUnlocked()) {
                                var x = { origin: tile, target: target };
                                var ev = new createjs.Event("dragging", false, false);
                                ev["originTile"] = tile;
                                ev["targetTile"] = target;
                                _this.dispatchEvent(ev);
                            }
                        }
                    }
                });
                //Press Up
                this.tilesContainer.addEventListener("pressup", function (e) {
                    var tile = _this.touchDictionary[e.pointerID];
                    if (tile) {
                        tile.unlock;
                        _this.releaseDrag(tile, false);
                        tile.release();
                    }
                });
            };
            // #endregion
            // #region Tile manager ------------------------------------------------------------------------
            Board.prototype.setTiles = function (tiles) {
                this.unlock();
                for (var t in tiles) {
                    this.setTileValue(t, tiles[t]);
                    this.getTileById(t).unlock();
                    this.getTileById(t).enable();
                }
            };
            // set a tile value
            Board.prototype.setTileValue = function (tileId, value) {
                var t = this.getTileById(tileId);
                if (t)
                    t.setNumber(value);
                //plays sound if is new jelly
                if (value == 1)
                    gameui.AudiosManager.playSound("sound_s" + (Math.floor(Math.random() * 3) + 1), null, 400);
            };
            // get a tile id by its x and y pos
            Board.prototype.getTileIdByPos = function (rawx, rawy, tileSize) {
                var coords = this.getTileCoordsByRawPos(rawx, rawy, tileSize);
                return (this.boardWidth * coords.y + coords.x);
            };
            // get tule position by pointer position
            Board.prototype.getTileByRawPos = function (rawx, rawy, tileSize) {
                var id = this.getTileIdByPos(rawx, rawy, tileSize);
                return this.getTileById(id);
            };
            // get tile coordinates by pointer position
            Board.prototype.getTileCoordsByRawPos = function (rawx, rawy, tileSize) {
                var x = Math.floor(rawx / tileSize);
                var hexaOffset = (x == 1 || x == 3) ? tileSize / 2 : 0;
                var y = Math.floor((rawy - hexaOffset) / tileSize);
                return { x: x, y: y };
            };
            // get a tile basend on x and y index
            Board.prototype.getTileByIndex = function (x, y) {
                var id = this.boardWidth * y + x;
                return this.getTileById(id);
            };
            // get a new position for a tile based on its index
            Board.prototype.getTilePositionByCoords = function (x, y, tileSize) {
                var hexaOffset = (x == 1 || x == 3) ? tileSize / 2 : 0;
                return {
                    x: (x + 1 / 2) * tileSize + (Math.random() - 0.5) * tileSize / 5,
                    y: (y + 1 / 2) * tileSize + (Math.random() - 0.5) * tileSize / 5 + hexaOffset - tileSize / 5
                };
            };
            // get a tile object by its id
            Board.prototype.getTileById = function (id) {
                return this.tilesContainer.getChildByName(id.toString());
            };
            // release all Jellyies
            Board.prototype.releaseAll = function () {
                for (var t in this.touchDictionary)
                    this.releaseDrag(this.touchDictionary[t]);
            };
            Board.prototype.sumAllTiles = function () {
                var sum = 0;
                for (var t in this.tiles) {
                    sum += this.tiles[t].getNumber();
                }
                return sum;
            };
            Board.prototype.getEmptyTiles = function () {
                //get next jelly
                var total = this.boardHeight * this.boardWidth;
                var tiles = [];
                for (var t = 0; t < total; t++)
                    if (this.tiles[t].isEmpty())
                        tiles.push(this.tiles[t]);
                return tiles;
            };
            Board.prototype.getLockedTiles = function () {
                //get next jelly
                var total = this.boardHeight * this.boardWidth;
                var tiles = [];
                for (var t = 0; t < total; t++)
                    if (!this.tiles[t].isUnlocked())
                        tiles.push(this.tiles[t]);
                return tiles;
            };
            Board.prototype.getAllTiles = function () {
                return this.tiles;
            };
            Board.prototype.getAllTilesValues = function () {
                var values = new Array();
                for (var t = 0; t < this.boardHeight * this.boardWidth; t++)
                    values[t] = this.getTileById(t).getNumber();
                return values;
            };
            Board.prototype.getTileId = function (tile) {
                return parseInt(tile.name);
            };
            // get all neighbor tiles 
            Board.prototype.getNeighborTiles = function (tile) {
                var neighbor = [];
                var tileId = this.getTileId(tile);
                var hexaOffset = (tile.posx == 1 || tile.posx == 3) ? 1 : -1;
                // consider all neighbores
                var neighborCoords = [
                    { x: tile.posx, y: tile.posy - 1 },
                    { x: tile.posx, y: tile.posy + 1 },
                    { x: tile.posx - 1, y: tile.posy },
                    { x: tile.posx + 1, y: tile.posy },
                    { x: tile.posx - 1, y: tile.posy + hexaOffset },
                    { x: tile.posx + 1, y: tile.posy + hexaOffset },
                ];
                for (var p in neighborCoords)
                    // remove beyound borders
                    if (neighborCoords[p].x >= 0 && neighborCoords[p].y >= 0 && neighborCoords[p].x < this.boardWidth && neighborCoords[p].y < this.boardHeight)
                        // add to array
                        neighbor.push(this.getTileByIndex(neighborCoords[p].x, neighborCoords[p].y));
                return neighbor;
            };
            // calculate a percent 
            Board.prototype.getPercentEmptySpaces = function () {
                var total = this.boardHeight * this.boardWidth;
                var empty = this.getEmptyTiles().length;
                return empty / total;
            };
            // release e tile
            Board.prototype.releaseDrag = function (tile, match, target) {
                var _this = this;
                if (match === void 0) { match = true; }
                var index = this.touchDictionary.indexOf(tile);
                delete this.touchDictionary[index];
                createjs.Tween.removeTweens(tile);
                tile.scaleY = tile.scaleX = 1;
                //if tiles match
                if (match && target) {
                    var pos = this.getTilePositionByCoords(target.posx, target.posy, this.tileSize);
                    this.fadeTileToPos(tile, pos.x, pos.y);
                }
                else {
                    tile.release();
                    createjs.Tween.get(tile).to(this.getTilePositionByCoords(tile.posx, tile.posy, this.tileSize), 200, createjs.Ease.sineInOut).call(function () {
                        // set the z-order
                        _this.arrangeZOrder();
                        // unlock that tile
                        tile.unlock();
                    });
                }
            };
            Board.prototype.getHighestTileValue = function () {
                var highestTile = 0;
                for (var j in this.tiles)
                    if (this.tiles[j].getNumber() > highestTile)
                        highestTile = this.tiles[j].getNumber();
                return highestTile;
            };
            Board.prototype.lock = function () {
                this.tilesContainer.mouseEnabled = false;
            };
            Board.prototype.unlock = function () {
                this.tilesContainer.mouseEnabled = true;
            };
            // #endregion
            // #region behaviour ---------------------------------------------------------------------------
            // organize all z-order
            Board.prototype.arrangeZOrder = function () {
                for (var t = 0; t < this.tiles.length; t++)
                    this.tilesContainer.setChildIndex(this.tiles[t], this.tilesContainer.getNumChildren() - 1);
            };
            // match 2 tiles
            Board.prototype.match = function (origin, target) {
                this.releaseDrag(origin, true, target);
                target.set({ scaleX: 1.8, scaleY: 1.8, alpha: 0 });
                createjs.Tween.get(target).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 140, createjs.Ease.cubicOut);
                gameui.AudiosManager.playSound('sound_j' + (Math.floor(Math.random() * 4) + 1));
            };
            // clar all board
            Board.prototype.cleanBoard = function () {
                for (var t in this.tiles)
                    this.tiles[t].setNumber(0);
            };
            // #endregion
            // #region Animations --------------------------------------------------------------------------
            Board.prototype.fadeTileToPos = function (tile, posx, posy, time, delay, alpha) {
                var _this = this;
                if (time === void 0) { time = 100; }
                if (delay === void 0) { delay = 0; }
                if (alpha === void 0) { alpha = 0; }
                tile.lock();
                createjs.Tween.get(tile).wait(delay).to({ x: posx, y: posy, alpha: alpha }, time, createjs.Ease.quadInOut).call(function () {
                    tile.set(_this.getTilePositionByCoords(tile.posx, tile.posy, _this.tileSize));
                    _this.arrangeZOrder();
                    tile.unlock();
                    tile.alpha = 1;
                });
            };
            // create and execute a level up effect on tiles
            Board.prototype.levelUpEffect = function () {
                var _this = this;
                // reseteffect timeOut id
                var currentTile = 0;
                for (var t in this.tiles) {
                    // set timeout for the animation. each tile by time interval
                    setTimeout(function () {
                        // calculate tile id
                        var calculatedTile = (_this.boardHeight * _this.boardWidth) - (currentTile % _this.boardWidth * _this.boardWidth + Math.floor(currentTile / _this.boardWidth)) - 1;
                        // define tile by it id
                        var tile = _this.tiles[calculatedTile];
                        // create a tween fast move
                        createjs.Tween.get(tile).to({ scaleY: 1.5 }, 100).to({ scaleY: 1 }, 100);
                        // play a jelly light effect
                        tile.jelly.playLevelUp();
                        // unlocks it
                        tile.unlock();
                        // increment effect timeOut id
                        currentTile++;
                    }, 20 * t);
                }
            };
            // create and execute a end game effect on tiles
            Board.prototype.endGameEffect = function () {
                var _this = this;
                // reseteffect timeOut id
                var currentTile = 0;
                for (var t in this.tiles) {
                    // set timeout for the animation. each tile by time interval
                    setTimeout(function () {
                        // increment effect timeOut id
                        currentTile++;
                        // calculate tile id
                        var x = (currentTile % _this.boardWidth * _this.boardWidth + Math.floor(currentTile / _this.boardWidth));
                        // define tile by it id
                        var tile = _this.tiles[x];
                        // create a tween fast move
                        createjs.Tween.get(tile).to({ scaleY: 0.5 }, 100).to({ scaleY: 1 }, 100);
                        // play a jelly light effect
                        tile.jelly.playLevelUp();
                    }, 20 * t);
                }
            };
            Board.prototype.setAlarm = function (alarm) {
                if (alarm) {
                    if (this.alarming)
                        return;
                    createjs.Tween.get(this.tilesContainer, { loop: true }).to({ x: -10 }, 50).to({ x: +10 }, 100).to({ x: -10 }, 100).to({ x: 0 }, 50).wait(200);
                }
                else {
                    if (!this.alarming)
                        return;
                    createjs.Tween.removeTweens(this.tilesContainer);
                }
                this.alarming = alarm;
            };
            return Board;
        })(createjs.Container);
        gameplay.Board = Board;
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var Tile = (function (_super) {
            __extends(Tile, _super);
            // contructr
            function Tile(posx, posy, tileSize) {
                _super.call(this);
                //store local variables
                this.tileSize = tileSize;
                this.posx = posx;
                this.posy = posy;
                ///set local positio
                this.regX = this.regY = tileSize / 2;
                //addObjects
                this.jelly = new gameplay.view.Jelly();
                this.jelly.x = tileSize / 2;
                this.jelly.y = tileSize;
                this.jelly.scaleX = this.jelly.scaleY = this.tileSize / (220);
                this.addChild(this.jelly);
                //creates hitArea for the tile
                this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("000").drawRect(0, 0, tileSize, tileSize));
            }
            Tile.prototype.release = function () {
                this.jelly.executeAimationRelease();
                this.unlock();
            };
            Tile.prototype.drag = function () {
                this.jelly.executeAnimationHold();
            };
            Tile.prototype.isUnlocked = function () {
                return !this.locked;
            };
            Tile.prototype.lock = function () {
                this.locked = true;
            };
            Tile.prototype.unlock = function () {
                this.locked = false;
                this.jelly.setNumber(this.value);
            };
            Tile.prototype.enable = function () {
                this.enabled = true;
            };
            Tile.prototype.disable = function () {
                this.enabled = false;
            };
            Tile.prototype.isEnabled = function () {
                return this.enabled;
            };
            // set tile number
            Tile.prototype.setNumber = function (value) {
                this.value = value;
                if (value > 0)
                    this.enable();
                else
                    this.disable();
                if (this.isUnlocked())
                    this.jelly.setNumber(value);
            };
            Tile.prototype.getNumber = function () {
                return this.value;
            };
            Tile.prototype.isEmpty = function () {
                return (this.value == 0);
            };
            return Tile;
        })(createjs.Container);
        gameplay.Tile = Tile;
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var GamePlayScreen = (function (_super) {
            __extends(GamePlayScreen, _super);
            //#region =================================== initialization ================================================
            function GamePlayScreen(userData, saveGame) {
                _super.call(this);
                this.matches = 0;
                // parameters
                this.boardSize = 5;
                this.itemProbability = 0.005;
                this.timeByLevel = 10000;
                this.initialInterval = 900;
                this.finalInterval = 150;
                this.easeInterval = 0.98;
                // #endregion
                this.log = "";
                this.userData = userData;
                this.score = 0;
                this.createBackground();
                this.createBoard();
                this.createGUI();
                this.createEffects();
                this.start();
                // try to load a saved Game
                if (saveGame)
                    this.loadGame();
            }
            // create game effects
            GamePlayScreen.prototype.createEffects = function () {
                this.freezeEffect = gameui.ImagesManager.getBitmap("freezeEffect");
                this.content.addChild(this.freezeEffect);
                this.normalizeEffect(this.freezeEffect);
                this.fastEffect = gameui.ImagesManager.getBitmap("fastEffect");
                this.content.addChild(this.fastEffect);
                this.normalizeEffect(this.fastEffect);
                this.reviveEffect = gameui.ImagesManager.getBitmap("reviveEffect");
                this.content.addChild(this.reviveEffect);
                this.normalizeEffect(this.reviveEffect);
                this.cleanEffect = gameui.ImagesManager.getBitmap("cleanEffect");
                this.content.addChild(this.cleanEffect);
                this.normalizeEffect(this.cleanEffect);
            };
            GamePlayScreen.prototype.normalizeEffect = function (fxObj) {
                fxObj.visible = false;
                fxObj.y = joinjelly.JoinJelly.gameScreen.headerPosition;
                fxObj.scaleX = 2;
                fxObj.scaleY = 2 * joinjelly.JoinJelly.gameScreen.currentHeight / defaultHeight;
                fxObj.mouseEnabled = false;
            };
            // create game background
            GamePlayScreen.prototype.createBackground = function () {
                var bg = gameui.ImagesManager.getBitmap("Background");
                this.background.addChild(bg);
            };
            // create a new board
            GamePlayScreen.prototype.createBoard = function () {
                var _this = this;
                this.board = new gameplay.Board(this.boardSize, this.boardSize, 1536 / 5, true);
                this.board.addEventListener("dragging", function (e) {
                    _this.dragged(e["originTile"], e["targetTile"]);
                });
                this.content.addChild(this.board);
                this.board.x = defaultWidth / 2;
                this.board.y = defaultHeight / 2;
            };
            // creates the game GUI
            GamePlayScreen.prototype.createGUI = function () {
                var _this = this;
                // creates game level indicator
                this.gameLevelIndicator = new gameplay.view.LevelIndicator();
                this.content.addChild(this.gameLevelIndicator);
                // creates game header
                this.gameHeader = new gameplay.view.GameHeader();
                this.header.addChild(this.gameHeader);
                // create game footer
                var items = [joinjelly.Items.TIME, joinjelly.Items.CLEAN, joinjelly.Items.FAST, joinjelly.Items.REVIVE];
                this.gameFooter = new gameplay.view.GameFooter(items);
                this.gameFooter.lockItem(joinjelly.Items.REVIVE);
                this.footer.addChild(this.gameFooter);
                this.updateFooter();
                this.gameFooter.addEventListener("useitem", function (e) {
                    _this.useItem(e.item);
                });
                // creates pause menu
                this.pauseMenu = new gameplay.view.PauseMenu();
                this.content.addChild(this.pauseMenu);
                // creates a end menu
                this.finishMenu = new gameplay.view.FinishMenu();
                this.content.addChild(this.finishMenu);
                this.finishMenu.y = -200;
                // creates a toggle button
                var tbt = new gameui.ImageButton("BtBoard", function () {
                    _this.finishMenu.show();
                    tbt.fadeOut();
                    gameui.AudiosManager.playSound("Interface Sound-06");
                });
                tbt.set({ x: 150, y: -150, visible: false });
                this.footer.addChild(tbt);
                this.showBoardButton = tbt;
                //add eventListener
                this.finishMenu.addEventListener("ok", function () {
                    joinjelly.JoinJelly.showMainMenu();
                });
                this.finishMenu.addEventListener("board", function () {
                    _this.finishMenu.hide();
                    tbt.fadeIn();
                });
                this.finishMenu.addEventListener("share", function () {
                    //
                    _this.selfPeformanceTest();
                });
                this.gameHeader.addEventListener("pause", function () {
                    _this.pauseGame();
                });
                this.pauseMenu.addEventListener("play", function () {
                    _this.continueGame();
                });
                this.pauseMenu.addEventListener("home", function () {
                    _this.pauseMenu.hide();
                    setTimeout(function () {
                        joinjelly.JoinJelly.showMainMenu();
                    }, 200);
                    _this.userData.deleteSaveGame();
                });
                this.pauseMenu.addEventListener("restart", function () {
                    _this.pauseMenu.hide();
                    _this.userData.deleteSaveGame();
                    setTimeout(function () {
                        joinjelly.JoinJelly.startLevel();
                    }, 200);
                });
            };
            // redim screen
            GamePlayScreen.prototype.redim = function (headerY, footerY, width, heigth) {
                _super.prototype.redim.call(this, headerY, footerY, width, heigth);
                var relativeScale = (this.screenHeight - 2048) / 400;
                if (relativeScale < 0)
                    relativeScale = 0;
                if (relativeScale > 1)
                    relativeScale = 1;
                this.board.scaleX = this.board.scaleY = 1 - (0.2 - relativeScale * 0.2);
            };
            //acivate the screen
            GamePlayScreen.prototype.activate = function (parameters) {
                var _this = this;
                _super.prototype.activate.call(this, parameters);
                this.gameHeader.alpha = 0;
                setTimeout(function () {
                    createjs.Tween.get(_this.gameHeader).to({ alpha: 1 }, 500);
                }, 500);
                this.updateFooter();
            };
            //#endregion
            // #region =================================== interface =====================================================
            // update GUI iformaion
            GamePlayScreen.prototype.updateInterfaceInfos = function () {
                //calculate interval 
                var nextLevelScore = this.getMovesByLevel(this.level);
                var currentLevelScore = this.getMovesByLevel(this.level - 1);
                var percent = (this.matches - currentLevelScore) / (nextLevelScore - currentLevelScore) * 100;
                // defines alarm condition
                var emptySpaces = this.board.getPercentEmptySpaces();
                var alarm = false;
                if (emptySpaces < 0.25 && emptySpaces > 0)
                    var alarm = true;
                // updates the header
                this.gameHeader.updateStatus(this.score, this.level, percent, emptySpaces, alarm);
                // updates board shaking.
                this.board.setAlarm(alarm);
            };
            // level up
            GamePlayScreen.prototype.levelUpInterfaceEffect = function (level) {
                this.gameLevelIndicator.showLevel(level);
                gameui.AudiosManager.playSound("levelUp");
                this.board.levelUpEffect();
            };
            // #endregion
            // #region =================================== gamelay =======================================================
            // starts the game
            GamePlayScreen.prototype.start = function () {
                //this.selfPeformanceTest()
                this.level = 1;
                this.matches = 0;
                // board initialization
                this.board.cleanBoard();
                this.board.unlock();
                // update interfaces
                this.updateInterfaceInfos();
                // play music
                gameui.AudiosManager.playMusic("music1");
                // initialize gameloop
                this.gamestate = 1 /* playing */;
                this.step(500);
                // log game start event
                joinjelly.JoinJelly.analytics.logGameStart();
            };
            // time step for adding tiles.
            GamePlayScreen.prototype.step = function (timeout) {
                var _this = this;
                clearTimeout(this.timeoutInterval);
                this.timeoutInterval = setTimeout(function () {
                    // if is not playing, than does not execute a step
                    if (_this.gamestate == 1 /* playing */)
                        _this.gameInteraction();
                    // set timeout to another iteraction if game is not over
                    if (_this.gamestate != 3 /* ended */)
                        _this.step(_this.getTimeInterval(_this.level, _this.initialInterval, _this.finalInterval, _this.easeInterval));
                }, timeout);
            };
            // executes a game interaction
            GamePlayScreen.prototype.gameInteraction = function () {
                // add a new tile  on board
                this.addRandomTileOnBoard();
                // updates interafce information
                this.updateInterfaceInfos();
                // verifies if game is loosed after 500ms again. if them both than loose game
                if (this.verifyGameLoose())
                    this.endGame();
                // update currentLevel
                this.updateCurrentLevel();
            };
            // pause game
            GamePlayScreen.prototype.pauseGame = function () {
                this.pauseMenu.show();
                this.gamestate = 2 /* paused */;
                this.board.lock();
                this.gameHeader.mouseEnabled = false;
            };
            // unpause game
            GamePlayScreen.prototype.continueGame = function () {
                this.pauseMenu.hide();
                this.gamestate = 1 /* playing */;
                this.board.unlock();
                this.gameHeader.mouseEnabled = true;
            };
            // finishes the game
            GamePlayScreen.prototype.endGame = function (message) {
                var _this = this;
                this.userData.deleteSaveGame();
                this.gamestate = 4 /* standBy */;
                var score = this.score;
                var highScore = joinjelly.JoinJelly.userData.getHighScore();
                var highJelly = this.board.getHighestTileValue();
                // disable mouse interaction
                this.board.lock();
                this.board.setAlarm(false);
                // releases all jellys
                this.board.releaseAll();
                // save high score
                joinjelly.JoinJelly.userData.setScore(score);
                // remove other ui items
                this.gameHeader.mouseEnabled = false;
                this.gameFooter.mouseEnabled = false;
                createjs.Tween.get(this.gameHeader).to({ y: -425 }, 200, createjs.Ease.quadIn);
                createjs.Tween.get(this.gameFooter).to({ y: +300 }, 200, createjs.Ease.quadIn);
                // shows finished game menu
                setTimeout(function () {
                    _this.gamestate = 3 /* ended */;
                    _this.finishMenu.show();
                    _this.gameFooter.mouseEnabled = true;
                    // set footer items form revive
                    _this.gameFooter.setItems([joinjelly.Items.REVIVE]);
                    _this.gameFooter.unlockItem(joinjelly.Items.REVIVE);
                    _this.gameFooter.highlight(joinjelly.Items.REVIVE);
                    _this.updateFooter();
                    createjs.Tween.get(_this.gameFooter).to({ y: 0 }, 200, createjs.Ease.quadIn);
                }, 1200);
                this.finishMenu.setValues(score, highScore, highJelly, message);
                // log event
                joinjelly.JoinJelly.analytics.logEndGame(this.matches, this.score, this.level, highJelly);
                // play end soud
                gameui.AudiosManager.playSound("end");
                // play end game effect
                this.board.endGameEffect();
            };
            // winTheGame
            GamePlayScreen.prototype.winGame = function () {
                this.endGame(StringResources.menus.gameOver);
                // TODO something great
            };
            // update current level
            GamePlayScreen.prototype.updateCurrentLevel = function () {
                var newLevel = this.getLevelByMoves(this.matches);
                if (newLevel > this.level)
                    this.levelUpInterfaceEffect(newLevel);
                this.level = newLevel;
            };
            // calculate current level by moves. once level calculation is a iterative processe, this method uses a iterative calculation
            GamePlayScreen.prototype.getLevelByMoves = function (moves) {
                var totalMoves = 0;
                var level = 0;
                while (totalMoves < moves) {
                    var interval = this.getTimeInterval(level, this.initialInterval, this.finalInterval, this.easeInterval);
                    var levelMoves = this.timeByLevel / interval;
                    totalMoves += levelMoves;
                    level++;
                }
                return Math.max(level, 1);
            };
            // get how moves is needed for each level;
            GamePlayScreen.prototype.getMovesByLevel = function (level) {
                var totalMoves = 0;
                for (var calculatedLevel = 0; calculatedLevel < level; calculatedLevel++) {
                    var interval = this.getTimeInterval(calculatedLevel, this.initialInterval, this.finalInterval, this.easeInterval);
                    var levelMoves = this.timeByLevel / interval;
                    totalMoves += levelMoves;
                }
                return totalMoves;
            };
            // calculate time interval for a level.
            GamePlayScreen.prototype.getTimeInterval = function (level, initialInterval, finalInterval, intervalEase) {
                return initialInterval * Math.pow(intervalEase, level) + finalInterval * (1 - Math.pow(intervalEase, level));
            };
            // Verifies if game is over
            GamePlayScreen.prototype.verifyGameLoose = function () {
                var empty = this.board.getEmptyTiles();
                var locked = this.board.getLockedTiles();
                if (empty.length == 0 && locked.length == 0)
                    return true;
                return false;
            };
            // add a random tile with value 1 on board
            GamePlayScreen.prototype.addRandomTileOnBoard = function (value) {
                if (value === void 0) { value = 1; }
                var empty = this.board.getEmptyTiles();
                // if there is no more empty tiles, ends the game
                if (empty.length > 0) {
                    var i = Math.floor(Math.random() * empty.length);
                    var tile = empty[i];
                    tile.setNumber(value);
                    this.saveGame();
                }
            };
            //called when a tile is dragged
            GamePlayScreen.prototype.dragged = function (origin, target) {
                //try to match the tiles
                this.match(origin, target);
            };
            // verifies if 2 tiles can match
            GamePlayScreen.prototype.canMatch = function (origin, target) {
                return (origin.getNumber() != 0 && target != origin && target.getNumber() == origin.getNumber() && target.isUnlocked());
            };
            // verifies if a tile can pair another, and make it happens
            GamePlayScreen.prototype.match = function (origin, target) {
                //check if match is correct
                if (!this.canMatch(origin, target))
                    return false;
                this.matches++;
                // update currentLevel
                this.updateCurrentLevel();
                //calculate new value
                var newValue = target.getNumber() + origin.getNumber();
                //sum the tiles values
                target.setNumber(newValue);
                //reset the previous tile
                origin.setNumber(0);
                //animate the mach
                this.board.match(origin, target);
                // increase score
                var sum = newValue * 10 + Math.floor(Math.random() * newValue * 10);
                this.score += sum;
                this.animateScoreFromTile(target, sum); // animate a score number
                // chance to win a item
                var item = this.giveItemChance(["time", "clean", "fast", "revive"]);
                if (item)
                    this.animateItemFromTile(target, item);
                // update score
                this.userData.setScore(this.score);
                this.userData.setLastJelly(newValue);
                this.updateInterfaceInfos();
                // notify match
                if (this.matchNotify)
                    this.matchNotify();
                // verify winGame
                if (newValue >= joinjelly.JoinJelly.maxJelly)
                    this.winGame();
                // log event
                joinjelly.JoinJelly.analytics.logMove(this.matches, this.score, this.level, this.board.getEmptyTiles().length);
                this.saveGame();
                return true;
            };
            //give item to user
            GamePlayScreen.prototype.giveItemChance = function (items) {
                var item = null;
                var lucky = joinjelly.JoinJelly.itemData.getItemAmmount(joinjelly.Items.LUCKY) ? 2 : 1;
                // calculate random change to win a item
                var goodChance = (Math.random() < this.itemProbability * lucky);
                // if true
                if (goodChance) {
                    item = items[Math.floor(Math.random() * items.length)];
                    // give item to user (user data)
                    joinjelly.JoinJelly.itemData.increaseItemAmmount(item);
                }
                return item;
            };
            // animate a item moving from tile to the footer
            GamePlayScreen.prototype.animateItemFromTile = function (tile, item) {
                var _this = this;
                // play sound
                gameui.AudiosManager.playSound("Interface Sound-11");
                // create item Object
                var itemDO = gameui.ImagesManager.getBitmap("item" + item);
                itemDO.mouseEnabled = false;
                itemDO.regX = itemDO.getBounds().width / 2;
                itemDO.regY = itemDO.getBounds().height / 2;
                this.content.addChild(itemDO);
                // animate item to footer
                var xi = this.board.localToLocal(tile.x, tile.y, this.content).x;
                var yi = this.board.localToLocal(tile.x, tile.y, this.content).y;
                var xf = defaultWidth / 2;
                var yf = this.footer.y;
                ;
                var footerItem = this.gameFooter.getItemButton(item);
                if (footerItem) {
                    xf = this.gameFooter.localToLocal(footerItem.x, footerItem.y, this.content).x;
                    yf = this.gameFooter.localToLocal(footerItem.x, footerItem.y, this.content).y;
                }
                createjs.Tween.get(itemDO).to({ x: xi, y: yi, alpha: 0 }).to({ y: tile.y - 70, alpha: 1 }, 400, createjs.Ease.quadInOut).to({ x: xf, y: yf }, 1000, createjs.Ease.quadInOut).call(function () {
                    _this.content.removeChild(itemDO);
                    _this.updateFooter();
                });
            };
            // animate a score in the board
            GamePlayScreen.prototype.animateScoreFromTile = function (tile, score) {
                var _this = this;
                // create text Object
                var textDO = gameui.ImagesManager.getBitmapText(score.toString(), "debussy");
                textDO.regX = textDO.getBounds().width / 2;
                textDO.mouseEnabled = false;
                this.content.addChild(textDO);
                var xi = this.board.localToLocal(tile.x, tile.y, this.content).x;
                var yi = this.board.localToLocal(tile.x, tile.y, this.content).y;
                createjs.Tween.get(textDO).to({ x: xi, y: yi, alpha: 0 }).to({ y: yi - 170, alpha: 1 }, 400, createjs.Ease.quadOut).to({ alpha: 0 }, 400).call(function () {
                    _this.content.removeChild(textDO);
                    delete textDO;
                });
            };
            // #endregion
            // #region =================================== Items =========================================================
            GamePlayScreen.prototype.useItem = function (item) {
                if (joinjelly.JoinJelly.itemData.getItemAmmount(item) > 0) {
                    var sucess = false;
                    switch (item) {
                        case joinjelly.Items.TIME:
                            sucess = this.useTime();
                            break;
                        case joinjelly.Items.FAST:
                            sucess = this.useFast();
                            break;
                        case joinjelly.Items.CLEAN:
                            sucess = this.useClean();
                            break;
                        case joinjelly.Items.REVIVE:
                            sucess = this.useRevive();
                            break;
                    }
                    if (sucess) {
                        // decrease item quantity
                        joinjelly.JoinJelly.itemData.decreaseItemAmmount(item);
                        //notify utem used
                        if (this.itemNotify)
                            this.itemNotify();
                    }
                }
                else {
                    this.pauseGame();
                    joinjelly.JoinJelly.showStore(this);
                }
                this.updateFooter();
            };
            // reduces jellys per time during 5 seconds.
            GamePlayScreen.prototype.useTime = function () {
                var _this = this;
                if (this.gamestate == 3 /* ended */)
                    return;
                this.step(5000);
                //cast effects
                this.freezeEffect.alpha = 0;
                this.freezeEffect.visible = true;
                createjs.Tween.removeTweens(this.freezeEffect);
                createjs.Tween.get(this.freezeEffect).to({ alpha: 1 }, 1000).to({ alpha: 0 }, 4000).call(function () {
                    _this.freezeEffect.visible = false;
                });
                gameui.AudiosManager.playSound("sounditemtime");
                return true;
            };
            //clan all simple jellys
            GamePlayScreen.prototype.useClean = function () {
                var _this = this;
                if (this.gamestate == 3 /* ended */)
                    return;
                var tiles = this.board.getAllTiles();
                for (var t in tiles)
                    if (tiles[t].getNumber() < 2) {
                        this.board.fadeTileToPos(tiles[t], tiles[t].x, tiles[t].y - 100, 200, 300 * Math.random());
                        tiles[t].setNumber(0);
                    }
                this.updateInterfaceInfos();
                //cast effects
                this.cleanEffect.alpha = 0;
                this.cleanEffect.visible = true;
                createjs.Tween.removeTweens(this.cleanEffect);
                createjs.Tween.get(this.cleanEffect).to({ alpha: 0 }, 200).to({ alpha: 1 }, 200).to({ alpha: 0 }, 200);
                createjs.Tween.get(this.cleanEffect).to({ x: -600, y: 2000 }).to({ x: 300, y: -500 }, 600).call(function () {
                    _this.cleanEffect.visible = false;
                });
                gameui.AudiosManager.playSound("sounditemclean");
                return true;
            };
            // revive after game end
            GamePlayScreen.prototype.useRevive = function (test) {
                var _this = this;
                if (test === void 0) { test = false; }
                if (this.gamestate != 3 /* ended */)
                    return false;
                this.saveGame();
                // back state to playing
                this.gamestate = 1 /* playing */;
                //ullock board
                this.board.unlock();
                // hide finish menu
                this.finishMenu.hide();
                // set next iteraction after 4 seconds
                this.step(4000);
                // update all interface
                this.updateInterfaceInfos();
                // set board alarm
                this.board.setAlarm(true);
                // hide show board button
                this.showBoardButton.fadeOut();
                // set footer items
                this.gameFooter.setItems([joinjelly.Items.TIME, joinjelly.Items.CLEAN, joinjelly.Items.FAST, joinjelly.Items.REVIVE]);
                this.gameFooter.unlockAll();
                this.gameFooter.lockItem(joinjelly.Items.REVIVE);
                // remove other ui items
                this.gameHeader.mouseEnabled = true;
                createjs.Tween.get(this.gameHeader).to({ y: -0 }, 200, createjs.Ease.quadIn);
                if (!test) {
                    //cast effects
                    this.reviveEffect.alpha = 0;
                    this.reviveEffect.visible = true;
                    createjs.Tween.removeTweens(this.reviveEffect);
                    createjs.Tween.get(this.reviveEffect).to({ y: 1200 }).to({ y: 600, alpha: 1 }, 600).to({ y: 0, alpha: 0 }, 600).call(function () {
                        _this.reviveEffect.visible = false;
                    });
                    gameui.AudiosManager.playSound("sounditemrevive");
                }
                return true;
            };
            // match 5 pair of jelly if avaliabe
            GamePlayScreen.prototype.useFast = function (test) {
                var _this = this;
                if (test === void 0) { test = false; }
                if (this.gamestate == 3 /* ended */)
                    return;
                var tiles = this.board.getAllTiles();
                var matches = [];
                for (var t in tiles) {
                    // 5 times
                    if (matches.length >= 5)
                        break;
                    var origin = tiles[t];
                    if (origin.getNumber() > 0 && origin.isUnlocked()) {
                        for (var t2 in tiles) {
                            var target = tiles[t2];
                            if (this.canMatch(origin, target)) {
                                origin.lock();
                                target.lock();
                                matches.push([origin, target]);
                                break;
                            }
                        }
                    }
                }
                for (var m in matches)
                    this.matchJelly(matches[m][0], matches[m][1]);
                if (!test) {
                    //cast effects
                    this.fastEffect.alpha = 1;
                    this.fastEffect.visible = true;
                    createjs.Tween.removeTweens(this.fastEffect);
                    createjs.Tween.get(this.fastEffect).to({ alpha: 0 }, 500).call(function () {
                        _this.fastEffect.visible = false;
                    });
                    gameui.AudiosManager.playSound("sounditemfast");
                }
                return true;
            };
            // match two jellys with animation
            GamePlayScreen.prototype.matchJelly = function (origin, target) {
                var _this = this;
                this.board.fadeTileToPos(origin, target.x, target.y, 400, 200 * Math.random(), 1);
                setTimeout(function () {
                    target.unlock();
                    origin.unlock();
                    _this.match(origin, target);
                }, 300);
            };
            // update footer
            GamePlayScreen.prototype.updateFooter = function () {
                var items = joinjelly.ItemsData.items;
                for (var i in items)
                    this.gameFooter.setItemAmmount(items[i], joinjelly.JoinJelly.itemData.getItemAmmount(items[i]));
            };
            // #endregion
            // #region =================================== SaveGame =====================================================
            GamePlayScreen.prototype.saveGame = function () {
                var sg = {
                    level: this.level,
                    matches: this.matches,
                    score: this.score,
                    tiles: this.board.getAllTilesValues(),
                };
                this.userData.saveGame(sg);
            };
            GamePlayScreen.prototype.loadGame = function () {
                var saveGame = this.userData.loadGame();
                if (!saveGame || saveGame == null)
                    return;
                this.board.setTiles(saveGame.tiles);
                this.score = saveGame.score;
                this.matches = saveGame.matches;
                this.level = saveGame.level;
                this.updateCurrentLevel();
                this.updateFooter();
                this.updateInterfaceInfos();
                this.pauseGame();
            };
            GamePlayScreen.prototype.selfPeformanceTest = function () {
                var _this = this;
                this.initialInterval = 250;
                setInterval(function () {
                    var value = _this.countChild(_this.view.getStage()).toString() + "\t" + Math.floor(createjs.Ticker.getMeasuredFPS());
                    _this.log += value + "\n";
                    window.localStorage.setItem("log", _this.log);
                    console.log(value);
                    if (_this.gamestate == 2 /* paused */)
                        return;
                    _this.useRevive();
                    _this.useFast(true);
                }, 250);
            };
            GamePlayScreen.prototype.countChild = function (container) {
                var childrens = 0;
                for (var c in container.children) {
                    if (container.children[c].visible) {
                        childrens++;
                        if (container.children[c] instanceof createjs.Container)
                            childrens += this.countChild(container.children[c]);
                    }
                }
                return childrens;
            };
            return GamePlayScreen;
        })(gameui.ScreenState);
        gameplay.GamePlayScreen = GamePlayScreen;
        var GameState;
        (function (GameState) {
            GameState[GameState["starting"] = 0] = "starting";
            GameState[GameState["playing"] = 1] = "playing";
            GameState[GameState["paused"] = 2] = "paused";
            GameState[GameState["ended"] = 3] = "ended";
            GameState[GameState["standBy"] = 4] = "standBy";
        })(GameState || (GameState = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var ExplodeBricks = (function (_super) {
            __extends(ExplodeBricks, _super);
            function ExplodeBricks() {
                _super.apply(this, arguments);
                this.initialDirtyProbability = 0.1;
                this.finalDirtyProbability = 0.6;
                this.easeDirtyProbability = 0.98;
            }
            // add a random tile with value 1 on board
            ExplodeBricks.prototype.addRandomTileOnBoard = function () {
                var _this = this;
                _super.prototype.addRandomTileOnBoard.call(this);
                // randomly adda a dirty to the board
                if (this.getDirtyProbabilityByLevel(this.level, this.initialDirtyProbability, this.finalDirtyProbability, this.easeDirtyProbability) > Math.random())
                    setTimeout(function () {
                        _super.prototype.addRandomTileOnBoard.call(_this, -1);
                    }, 500);
            };
            // verifies if a tile can pair another, and make it happens
            ExplodeBricks.prototype.match = function (origin, target) {
                var match = _super.prototype.match.call(this, origin, target);
                if (match) {
                    var neighborTiles = this.board.getNeighborTiles(target);
                    for (var t in neighborTiles) {
                        var tile = neighborTiles[t];
                        if (tile && tile.getNumber() < 0) {
                            var posx = target.x + (tile.x - target.x) * 1.5;
                            var posy = target.y + (tile.y - target.y) * 1.5;
                            this.board.fadeTileToPos(tile, posx, posy, 500);
                            tile.setNumber(0);
                        }
                    }
                }
                return match;
            };
            // level up
            ExplodeBricks.prototype.levelUpInterfaceEffect = function (level) {
                _super.prototype.levelUpInterfaceEffect.call(this, level);
                this.cleanDirty();
            };
            // clean dirty
            ExplodeBricks.prototype.cleanDirty = function () {
                var tiles = this.board.getAllTiles();
                for (var t in tiles) {
                    if (tiles[t].getNumber() < 0)
                        tiles[t].setNumber(0);
                }
            };
            // calculate time interval for a level.
            ExplodeBricks.prototype.getDirtyProbabilityByLevel = function (level, initialDirtyProbability, finalDirtyProbability, easeDirtyProbability) {
                return initialDirtyProbability * Math.pow(easeDirtyProbability, level) + finalDirtyProbability * (1 - Math.pow(easeDirtyProbability, level));
            };
            return ExplodeBricks;
        })(gameplay.GamePlayScreen);
        gameplay.ExplodeBricks = ExplodeBricks;
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var Tutorial = (function (_super) {
            __extends(Tutorial, _super);
            function Tutorial() {
                _super.apply(this, arguments);
                // tutoral current step
                this.currentTutorialStep = 0;
            }
            // #region tutorial ====================================================================================================
            Tutorial.prototype.createGUI = function () {
                var _this = this;
                this.tutorialJellyFinger = new gameplay.view.TutorialMove();
                this.tutorialItemFinger = new gameplay.view.TutorialMove();
                this.tutorialMessage = new gameplay.view.TutoralMessage();
                this.tutorialMessage.addEventListener("closed", function () {
                    if (_this.messageNotify)
                        _this.messageNotify();
                });
                this.tutorialItemFinger.rotation = -45;
                _super.prototype.createGUI.call(this);
                this.content.addChild(this.tutorialJellyFinger);
                this.footer.addChild(this.tutorialItemFinger);
                this.content.addChild(this.tutorialMessage);
                this.gameFooter.setItemAmmount(joinjelly.Items.REVIVE, 1);
                this.gameFooter.setItemAmmount(joinjelly.Items.FAST, 1);
                this.gameFooter.setItemAmmount(joinjelly.Items.CLEAN, 1);
                this.gameFooter.setItemAmmount(joinjelly.Items.TIME, 1);
                this.gameFooter.lockAll();
            };
            Tutorial.prototype.start = function () {
                _super.prototype.start.call(this);
                this.resetTutorialStep();
                this.executeTutorialStep();
            };
            Tutorial.prototype.step = function () {
                //do nothing
            };
            Tutorial.prototype.resetTutorialStep = function () {
                this.currentTutorialStep = -1;
            };
            Tutorial.prototype.executeTutorialStep = function () {
                var _this = this;
                this.currentTutorialStep++;
                var steps = [
                    function () {
                        _this.tutorialWait(1500);
                        _this.board.getTileById(16).setNumber(1);
                        _this.board.getTileById(16).disable();
                    },
                    function () {
                        _this.board.getTileById(18).setNumber(1);
                        _this.showTutorialMessage(StringResources.tutorial.msgheplme);
                        _this.board.getTileById(18).disable();
                        _this.waitMessage();
                    },
                    function () {
                        _this.board.getTileById(18).enable();
                        _this.showTutorialMove(18, 16);
                        _this.waitMatch();
                    },
                    function () {
                        _this.board.getTileById(16).disable();
                        _this.hideTutorialFinger();
                        _this.tutorialWait(700);
                    },
                    function () {
                        _this.showTutorialMessage(StringResources.tutorial.msgOnceMore);
                        _this.waitMessage();
                    },
                    function () {
                        _this.board.getTileById(24).setNumber(2);
                        _this.board.getTileById(16).disable();
                        _this.showTutorialMove(24, 16);
                        _this.waitMatch();
                    },
                    function () {
                        _this.board.getTileById(16).disable();
                        _this.hideTutorialFinger();
                        _this.tutorialWait(700);
                    },
                    function () {
                        _this.tutorialWait(500);
                    },
                    function () {
                        _this.board.getTileById(17).setNumber(-1);
                        _this.board.getTileById(19).setNumber(-1);
                        _this.board.getTileById(23).setNumber(-1);
                        _this.board.getTileById(22).setNumber(-1);
                        _this.board.getTileById(24).setNumber(-1);
                        _this.board.getTileById(13).setNumber(-1);
                        _this.board.getTileById(18).setNumber(1);
                        _this.board.getTileById(20).setNumber(1);
                        _this.board.getTileById(18).disable();
                        _this.showTutorialMessage(StringResources.tutorial.msgDirt);
                        _this.waitMessage();
                    },
                    function () {
                        _this.showTutorialMove(20, 18);
                        _this.waitMatch();
                    },
                    function () {
                        _this.tutorialWait(1000);
                    },
                    function () {
                        _this.hideTutorialFinger();
                        _this.board.getTileById(0).setNumber(2);
                        _this.board.getTileById(1).setNumber(1);
                        _this.board.getTileById(2).setNumber(2);
                        _this.board.getTileById(3).setNumber(1);
                        _this.board.getTileById(4).setNumber(2);
                        _this.board.getTileById(5).setNumber(1);
                        _this.board.getTileById(6).setNumber(1);
                        _this.board.getTileById(7).setNumber(1);
                        _this.board.getTileById(8).setNumber(1);
                        _this.board.getTileById(9).setNumber(1);
                        _this.board.getTileById(10).setNumber(1);
                        _this.board.getTileById(11).setNumber(1);
                        _this.board.getTileById(12).setNumber(1);
                        _this.board.getTileById(13).setNumber(1);
                        _this.board.getTileById(14).setNumber(1);
                        _this.board.getTileById(0).disable();
                        _this.board.getTileById(1).disable();
                        _this.board.getTileById(2).disable();
                        _this.board.getTileById(3).disable();
                        _this.board.getTileById(4).disable();
                        _this.board.getTileById(5).disable();
                        _this.board.getTileById(6).disable();
                        _this.board.getTileById(7).disable();
                        _this.board.getTileById(8).disable();
                        _this.board.getTileById(9).disable();
                        _this.board.getTileById(10).disable();
                        _this.board.getTileById(11).disable();
                        _this.board.getTileById(12).disable();
                        _this.board.getTileById(13).disable();
                        _this.board.getTileById(14).disable();
                        _this.board.getTileById(18).disable();
                        _this.tutorialWait(1000);
                    },
                    function () {
                        _this.showTutorialItem(joinjelly.Items.CLEAN);
                        _this.gameFooter.highlight(joinjelly.Items.CLEAN);
                        _this.showTutorialMessage(StringResources.tutorial.msgItemClean);
                        _this.waitItem();
                    },
                    function () {
                        _this.hideTutorialFinger();
                        _this.gameFooter.setItemAmmount(joinjelly.Items.CLEAN, 0);
                        _this.tutorialWait(1000);
                    },
                    function () {
                        _this.showTutorialItem(joinjelly.Items.TIME);
                        _this.gameFooter.highlight(joinjelly.Items.TIME);
                        _this.showTutorialMessage(StringResources.tutorial.msgItemTime);
                        _this.waitItem();
                    },
                    function () {
                        _this.hideTutorialFinger();
                        _this.gameFooter.setItemAmmount(joinjelly.Items.TIME, 0);
                        _this.tutorialWait(1000);
                    },
                    function () {
                        _this.showTutorialItem(joinjelly.Items.FAST);
                        _this.gameFooter.highlight(joinjelly.Items.FAST);
                        _this.showTutorialMessage(StringResources.tutorial.msgItemFast);
                        _this.waitItem();
                    },
                    function () {
                        _this.hideTutorialFinger();
                        _this.gameFooter.setItemAmmount(joinjelly.Items.FAST, 0);
                        _this.tutorialWait(1000);
                    },
                    function () {
                        _this.gameFooter.highlight(joinjelly.Items.REVIVE);
                        _this.showTutorialMessage(StringResources.tutorial.msgItemRevive);
                        _this.waitMessage();
                    },
                    function () {
                        _this.hideTutorialFinger();
                        _this.tutorialWait(500);
                    },
                    function () {
                        _this.hideTutorialFinger();
                        _this.showTutorialMessage(StringResources.tutorial.msgPlay);
                        _this.waitMessage();
                    },
                    function () {
                        _this.showTutorialMessage(StringResources.tutorial.msgBoardFill);
                        _this.waitMessage();
                    },
                    function () {
                        joinjelly.JoinJelly.startLevel();
                    }
                ];
                // execute the step
                if (steps[this.currentTutorialStep])
                    steps[this.currentTutorialStep]();
            };
            Tutorial.prototype.tutorialWait = function (delay) {
                var _this = this;
                setTimeout(function () {
                    _this.executeTutorialStep();
                }, delay);
            };
            Tutorial.prototype.waitMatch = function () {
                var _this = this;
                this.matchNotify = function () {
                    _this.matchNotify = null;
                    _this.executeTutorialStep();
                };
            };
            Tutorial.prototype.waitItem = function () {
                var _this = this;
                this.itemNotify = function () {
                    _this.itemNotify = null;
                    _this.executeTutorialStep();
                };
            };
            Tutorial.prototype.waitMessage = function () {
                var _this = this;
                this.messageNotify = function () {
                    _this.messageNotify = null;
                    _this.executeTutorialStep();
                };
            };
            Tutorial.prototype.showTutorialMessage = function (text) {
                this.tutorialMessage.show(text);
            };
            Tutorial.prototype.showTutorialMove = function (source, target) {
                var sourceTile = this.board.getTileById(source);
                var targetTile = this.board.getTileById(target);
                this.tutorialJellyFinger.showMove(sourceTile.x, sourceTile.y + this.board.y - this.board.regY, targetTile.x, targetTile.y + this.board.y - this.board.regY);
            };
            Tutorial.prototype.showTutorialItem = function (itemId) {
                var source = this.gameFooter.getItemButton(itemId).localToLocal(0, 0, this.footer);
                this.tutorialItemFinger.showClick(source.x, source.y - 100);
                this.gameFooter.lockAll();
                this.gameFooter.unlockItem(itemId);
                this.gameFooter.setItemAmmount(itemId, 1);
            };
            Tutorial.prototype.hideTutorialFinger = function () {
                this.tutorialJellyFinger.hide();
                this.tutorialItemFinger.hide();
            };
            Tutorial.prototype.giveItemChance = function (items) {
                return null;
            };
            Tutorial.prototype.useItem = function (item) {
                var sucess = false;
                switch (item) {
                    case "time":
                        sucess = this.useTime();
                        break;
                    case "fast":
                        sucess = this.useFast();
                        break;
                    case "clean":
                        sucess = this.useClean();
                        break;
                    case "revive":
                        sucess = this.useRevive();
                        break;
                }
                if (sucess) {
                    // decrease item quantity
                    joinjelly.JoinJelly.itemData.decreaseItemAmmount(item);
                    //notify utem used
                    if (this.itemNotify)
                        this.itemNotify();
                }
            };
            // #endregion 
            // update footer
            Tutorial.prototype.updateFooter = function () {
            };
            // override savegame
            Tutorial.prototype.saveGame = function () {
            };
            return Tutorial;
        })(gameplay.ExplodeBricks);
        gameplay.Tutorial = Tutorial;
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var view;
        (function (view) {
            var Message = (function (_super) {
                __extends(Message, _super);
                function Message() {
                    var _this = this;
                    _super.call(this);
                    this.addChild(new createjs.Shape(new createjs.Graphics().beginFill("darkGray").beginStroke("black").drawRect(-200, -60, 400, 120)));
                    var t = new createjs.Text("", "60px Arial", "white");
                    t.textAlign = "center";
                    t.textBaseline = "middle";
                    this.addChild(t);
                    this.text = t;
                    this.addEventListener("click", function () {
                        _this.fadeOut();
                    });
                }
                Message.prototype.showMessage = function (message) {
                    this.text.text = message;
                    this.fadeIn();
                };
                return Message;
            })(gameui.Button);
            view.Message = Message;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var UserData = (function () {
    function UserData() {
        gameui.AudiosManager.setSoundVeolume(this.getSoundVol());
        gameui.AudiosManager.setMusicVolume(this.getMusicVol());
    }
    // #region score
    UserData.prototype.setScore = function (score) {
        var highscore = this.getHighScore();
        if (score > highscore)
            UserData.saveValue("HighScore", score);
    };
    UserData.prototype.getHighScore = function () {
        var value = UserData.loadValue("HighScore");
        if (value)
            return value;
        return 0;
    };
    UserData.prototype.setLastJelly = function (value) {
        var highValue = this.getLastJelly();
        if (value > highValue)
            UserData.saveValue("LastJelly", value);
    };
    UserData.prototype.getLastJelly = function () {
        var value = UserData.loadValue("LastJelly");
        if (value)
            return value;
        return 0;
    };
    //#endregion
    //#region options
    UserData.prototype.getMusicVol = function () {
        return UserData.loadValue("music", 1);
    };
    UserData.prototype.setMusicVol = function (volume) {
        UserData.saveValue("music", volume);
    };
    UserData.prototype.getSoundVol = function () {
        return UserData.loadValue("sound", 1);
    };
    UserData.prototype.setSoundVol = function (volume) {
        UserData.saveValue("sound", volume);
    };
    //#endregion
    // #region items
    UserData.saveItems = function (items) {
        return this.saveValue("items", items);
    };
    UserData.loadItems = function () {
        return this.loadValue("items", {});
    };
    // #endregion
    //#region gamestate
    UserData.prototype.saveGame = function (savegame) {
        UserData.saveValue("savegame", savegame);
    };
    UserData.prototype.loadGame = function () {
        return UserData.loadValue("savegame", undefined);
    };
    UserData.prototype.deleteSaveGame = function () {
        UserData.saveValue("savegame", null);
    };
    UserData.saveValue = function (key, value) {
        if (value == null)
            localStorage.removeItem(UserData.prefix + key);
        else {
            var serialized = JSON.stringify(value);
            localStorage.setItem(UserData.prefix + key, serialized);
        }
    };
    UserData.loadValue = function (key, defaultVaule) {
        var value = localStorage.getItem(UserData.prefix + key);
        if (!value)
            return defaultVaule;
        return JSON.parse(value);
    };
    // #endregion
    UserData.prototype.resetAll = function () {
        localStorage.clear();
    };
    //#endregion
    // #region generic
    UserData.prefix = "FastPair_";
    return UserData;
})();
var joinjelly;
(function (joinjelly) {
    var JoinJelly = (function () {
        function JoinJelly() {
        }
        JoinJelly.init = function () {
            var _this = this;
            this.analytics = new Analytics();
            this.itemData = new joinjelly.ItemsData();
            //define language
            var lang = (window.navigator.userLanguage || window.navigator.language).substr(0, 2).toLowerCase();
            switch (lang) {
                case "pt":
                    StringResources = StringResources_pt;
                    break;
                case "es":
                    StringResources = StringResources_es;
                    break;
            }
            this.gameScreen = new gameui.GameScreen("gameCanvas", defaultWidth, defaultHeight, 60, true);
            this.userData = new UserData();
            var loadingScreen = new joinjelly.Loading();
            this.gameScreen.switchScreen(loadingScreen);
            // verifies if there is a savedGame
            loadingScreen.loaded = function () {
                var loadedGame = _this.userData.loadGame();
                if (loadedGame)
                    joinjelly.JoinJelly.startLevel(loadedGame);
                else
                    JoinJelly.showMainMenu();
            };
        };
        JoinJelly.showAboutScreen = function () {
            //not Implemented
            alert("beta");
        };
        JoinJelly.showMainMenu = function () {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.gameplay.GamePlayScreen)
                transition = { type: "top", time: 500 };
            if (this.gameScreen.currentScreen instanceof joinjelly.Jellypedia)
                transition = { type: "right", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.MainScreen(this.userData), null, transition);
        };
        JoinJelly.startLevel = function (loadedGame) {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "bottom", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.gameplay.ExplodeBricks(this.userData, loadedGame), null, transition);
        };
        JoinJelly.startTutorial = function () {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "bottom", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.gameplay.Tutorial(this.userData), null, transition);
        };
        JoinJelly.showStore = function (previousScreen) {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "right", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.menus.StoreMenu(previousScreen), null, transition);
        };
        JoinJelly.showPedia = function () {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "left", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.Jellypedia(this.userData, StringResources.jellys), null, transition);
        };
        JoinJelly.showSettings = function () {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "left", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.MainMenu(), null, transition);
        };
        JoinJelly.showAbout = function () {
            this.gameScreen.switchScreen(new joinjelly.About());
        };
        JoinJelly.maxJelly = 16384;
        return JoinJelly;
    })();
    joinjelly.JoinJelly = JoinJelly;
})(joinjelly || (joinjelly = {}));
window.onload = function () {
    joinjelly.JoinJelly.init();
};
/// <reference path="gameui/uiitem.ts" />
//module gameui {
//# sourceMappingURL=script.js.map