var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameui;
(function (gameui) {
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
            this.resetFade();
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
        UIItem.prototype.resetFade = function () {
            this.animating = true;
            this.antX = this.x;
            this.antY = this.y;
            this.mouseEnabled = false;
            createjs.Tween.removeTweens(this);
        };
        UIItem.prototype.fadeIn = function (scaleX, scaleY) {
            var _this = this;
            if (scaleX === void 0) { scaleX = 0.5; }
            if (scaleY === void 0) { scaleY = 0.5; }
            if (this.visible = true)
                this.antX = null;
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
        UIItem.prototype.createHitArea = function () {
            var hit = new createjs.Shape();
            var b = this.getBounds();
            if (b)
                hit.graphics.beginFill("#000").drawRect(b.x, b.y, b.width, b.height);
            this.hitArea = hit;
        };
        return UIItem;
    })(createjs.Container);
    gameui.UIItem = UIItem;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
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
            if (this.musicVolue == undefined)
                return 1;
            return this.musicVolue;
        };
        AudiosManager.getSoundVolume = function () {
            if (this.soundVolume == undefined)
                return 1;
            return this.soundVolume;
        };
        AudiosManager.playMusic = function (name, volume) {
            if (volume === void 0) { volume = 1; }
            if (this.currentMusic) {
                this.currentMusic.setVolume(volume * this.getMusicVolume());
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
var images;
var gameui;
(function (gameui) {
    var AssetsManager = (function () {
        function AssetsManager() {
        }
        AssetsManager.loadAssets = function (manifest, path, spriteSheets) {
            var _this = this;
            if (path === void 0) { path = ""; }
            this.spriteSheets = spriteSheets ? spriteSheets : new Array();
            this.bitmapFontSpriteSheetDataArray = this.bitmapFontSpriteSheetDataArray ? this.bitmapFontSpriteSheetDataArray : new Array();
            this.assetsManifest = manifest;
            if (!images)
                images = new Array();
            if (!this.loader) {
                this.loader = new createjs.LoadQueue(false);
                this.loader.installPlugin(createjs.Sound);
                createjs.Sound.alternateExtensions = ["mp3"];
                this.loader.addEventListener("filestart", function (evt) {
                    console.log("loading " + evt.item.src);
                });
                this.loader.addEventListener("fileload", function (evt) {
                    console.log("loaded " + evt.item.src);
                });
                this.loader.addEventListener("complete", function (evt) {
                    if (_this.onComplete)
                        _this.onComplete();
                });
                this.loader.addEventListener("progress", function (evt) {
                    if (_this.onProgress)
                        _this.onProgress(evt.progress);
                });
                this.loader.addEventListener("fileload", function (evt) {
                    if (evt.item.type == "image")
                        images[evt.item.id] = evt.result;
                    return true;
                });
            }
            this.loader.loadManifest(manifest, true, path);
        };
        AssetsManager.loadFontSpriteSheet = function (id, spritesheetData) {
            this.bitmapFontSpriteSheetDataArray[id] = new createjs.SpriteSheet(spritesheetData);
        };
        AssetsManager.cleanAssets = function () {
            if (images)
                ;
            for (var i in images) {
                var img = images[i];
                if (img.dispose)
                    img.dispose();
                delete images[i];
            }
        };
        AssetsManager.getImagesArray = function () {
            return images;
        };
        AssetsManager.getBitmap = function (name) {
            if (this.spriteSheets)
                if (this.spriteSheets[name])
                    return this.getSprite(name, false);
            var image = this.getLoadedImage(name);
            if (image) {
                var imgobj = new createjs.Bitmap(image);
                imgobj.mouseEnabled = AssetsManager.defaultMouseEnabled;
                return imgobj;
            }
            var imgobj = new createjs.Bitmap(name);
            imgobj.mouseEnabled = AssetsManager.defaultMouseEnabled;
            return imgobj;
        };
        AssetsManager.getBitmapText = function (text, bitmapFontId) {
            var bitmapText = new createjs.BitmapText(text, this.bitmapFontSpriteSheetDataArray[bitmapFontId]);
            bitmapText.lineHeight = 100;
            bitmapText.mouseEnabled = AssetsManager.defaultMouseEnabled;
            return bitmapText;
        };
        AssetsManager.getLoadedImage = function (name) {
            if (this.loader)
                return this.loader.getResult(name);
            return null;
        };
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
        AssetsManager.defaultMouseEnabled = false;
        return AssetsManager;
    })();
    gameui.AssetsManager = AssetsManager;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
    var GameScreen = (function () {
        function GameScreen(canvasId, gameWidth, gameHeight, fps, showFps) {
            var _this = this;
            if (fps === void 0) { fps = 60; }
            this.defaultWidth = gameWidth;
            this.defaultHeight = gameHeight;
            this.stage = new createjs.Stage(canvasId);
            createjs.Touch.enable(this.stage);
            var x = 0;
            createjs.Ticker.addEventListener("tick", function () {
                _this.stage.update();
            });
            createjs.Ticker.setFPS(fps);
            this.screenContainer = new createjs.Container();
            this.stage.addChild(this.screenContainer);
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
            this.resizeGameScreen(window.innerWidth, window.innerHeight);
            window.onresize = function () {
                _this.resizeGameScreen(window.innerWidth, window.innerHeight);
            };
        }
        GameScreen.prototype.switchScreen = function (newScreen, parameters, transition) {
            var _this = this;
            var oldScreen = this.currentScreen;
            if (!transition)
                transition = new gameui.Transition();
            var x = 0;
            var y = 0;
            var alpha = 1;
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
                if (transition.type && transition.type != "none") {
                    newScreen.view.mouseEnabled = false;
                    oldScreen.view.mouseEnabled = false;
                    newScreen.view.set({ alpha: alpha, x: -x, y: -y });
                    oldScreen.view.set({ 1: alpha, x: 0, y: 0 });
                    createjs.Tween.get(oldScreen.view).to({ alpha: 1, x: x, y: y }, transition.time, createjs.Ease.quadInOut);
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
            newScreen.activate(parameters);
            this.screenContainer.addChild(newScreen.view);
            this.currentScreen = newScreen;
            this.currentScreen.redim(this.headerPosition, this.footerPosition, this.currentWidth, this.currentHeight);
        };
        GameScreen.prototype.resizeGameScreen = function (deviceWidth, deviceHeight, updateCSS) {
            if (updateCSS === void 0) { updateCSS = true; }
            if (this.defaultHeight) {
                var aspect = this.defaultWidth / this.defaultHeight;
                var aspectReal = deviceWidth / deviceHeight;
                if (aspectReal > aspect) {
                    var s = deviceHeight / this.defaultHeight;
                    deviceWidth = this.defaultWidth * s;
                }
            }
            this.stage.canvas.width = deviceWidth;
            this.stage.canvas.height = deviceHeight;
            this.updateViewerScale(deviceWidth, deviceHeight, this.defaultWidth, this.defaultHeight);
        };
        GameScreen.prototype.sendBackButtonEvent = function () {
            if (this.currentScreen && this.currentScreen.onback) {
                this.currentScreen.onback();
                return false;
            }
            else
                return true;
        };
        GameScreen.prototype.updateViewerScale = function (realWidth, realHeight, defaultWidth, defaultHeight) {
            var scale = realWidth / defaultWidth;
            this.currentHeight = realHeight / scale;
            this.currentWidth = realWidth / scale;
            this.defaultWidth = defaultWidth;
            this.headerPosition = -(this.currentHeight - defaultHeight) / 2;
            this.footerPosition = defaultHeight + (this.currentHeight - defaultHeight) / 2;
            this.screenContainer.scaleX = this.screenContainer.scaleY = scale;
            this.screenContainer.y = this.viewerOffset = (this.currentHeight - defaultHeight) / 2 * scale;
            if (this.currentScreen)
                this.currentScreen.redim(this.headerPosition, this.footerPosition, this.currentWidth, this.currentHeight);
        };
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
    var Grid = (function (_super) {
        __extends(Grid, _super);
        function Grid(cols, rows, width, height, padding, flowHorizontal) {
            if (padding === void 0) { padding = 0; }
            _super.call(this);
            this.flowHorizontal = false;
            this.currentCol = 0;
            this.currentRow = 0;
            this.flowHorizontal = flowHorizontal;
            this.cols = cols;
            this.rows = rows;
            this.padding = padding;
            this.width = width;
            this.height = height;
            this.wSpacing = (width - padding * 2) / cols;
            this.hSpacing = (height - padding * 2) / rows;
        }
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
        function Label(text, font, color) {
            if (text === void 0) { text = ""; }
            if (font === void 0) { font = "600 90px Myriad Pro"; }
            if (color === void 0) { color = "#82e790"; }
            _super.call(this);
            text = text.toUpperCase();
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
        MenuContainer.prototype.addLabel = function (text) {
            var textObj;
            textObj = new gameui.Label(text);
            this.addObject(textObj);
            return textObj.textField;
        };
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
            this.overlay = new createjs.Container();
            this.header = new createjs.Container();
            this.footer = new createjs.Container();
            this.background = new createjs.Container();
            this.view.addChild(this.background);
            this.view.addChild(this.content);
            this.view.addChild(this.footer);
            this.view.addChild(this.header);
            this.view.addChild(this.overlay);
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
                if (false) {
                    this.background.x = -(width * scale - width) / 2;
                    this.background.scaleX = this.background.scaleY = scale;
                }
                else {
                    this.background.x = 0;
                    this.background.scaleY = scale;
                }
            }
            var mask = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0, -(heigth - defaultHeight) / 2, width, heigth));
            this.background.mask = mask;
            this.footer.mask = mask;
            this.header.mask = mask;
            this.content.mask = mask;
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
            this.type = "fade";
        }
        return Transition;
    })();
    gameui.Transition = Transition;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
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
            if (image != null) {
                this.background = gameui.AssetsManager.getBitmap(image);
                this.addChildAt(this.background, 0);
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
            text = text.toUpperCase();
            this.text = new createjs.Text(text, font, color);
            this.text.textBaseline = "middle";
            this.text.textAlign = "center";
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
            text = text.toUpperCase();
            this.bitmapText = gameui.AssetsManager.getBitmapText(text, bitmapFontId);
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
            if (text != "")
                text = " " + text;
            _super.call(this, text, font, color, background, event, soundId);
            this.icon = gameui.AssetsManager.getBitmap(icon);
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
        Items.EVOLVE = "evolve";
        return Items;
    })();
    joinjelly.Items = Items;
    var ItemsData = (function () {
        function ItemsData() {
            this.items = (new Object());
            this.items = joinjelly.JoinJelly.userData.loadItems();
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
            joinjelly.JoinJelly.userData.saveItems(this.items);
        };
        ItemsData.items = [Items.TIME, Items.CLEAN, Items.FAST, Items.REVIVE, Items.EVOLVE, Items.LUCKY];
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
        leaderboards: "Leaderboards",
        reset: "Reset All Data",
        restore: "Restore",
        restoreWarning: "It will restore your purchases from store, Continue?",
        resetWarning: "Are you sure. All you progress will be lost",
        about: "About",
        aboutText: "Develop by",
        aboutURL: "www.dia-studio.com",
        tutorial: "Tutorial",
        shop: "shop",
        playerName: "Player Name",
        playerNameDesc: "Type your name for the leaderboards.",
        error: "Sorry, Something went wrong",
    },
    tutorial: {
        msgheplme: "Help me to evolve\nJoin  2 identical jellies.",
        msgOnceMore: "Great! now I'm bigger, \nevolve me once more",
        msgDirt: "Oh no, a dirt appears \n Join a jelly here to destroy it.",
        msgPlay: "Perfect!\nNow evolve me to the max!",
        msgItemClean: "You can always use items.\n this cleans the board",
        msgItemFast: "this one join some jellies",
        msgItemTime: "this one make time slower",
        msgItemRevive: "if you loose, use this to revive",
        msgBoardFill: "but be careful, \ndo not let the board fill, \nthis is the end for us.",
    },
    jellies: {
        1: { name: "Little Jelly", description: "Small but essential" },
        2: { name: "Droplet", description: "Dripping everywhere" },
        4: { name: "Little Cake", description: "Incredible Lemon \nflavor" },
        8: { name: "Yolk", description: "She misses the\nMr. White..." },
        16: { name: "SunBronze", description: "With tanned little \nbody" },
        32: { name: "Strawberry", description: "Bored from jellying" },
        64: { name: "Upsety", description: "'Don't touch me...'" },
        128: { name: "Sluggjelly", description: "The sluggish Jelly" },
        256: { name: "Moti", description: "Irresistible desire to \neat with soy sauce" },
        512: { name: "Big cheeks", description: "Reminds me of my\nbrother cheeks" },
        1024: { name: "Geleialien", description: "Came from another\nplanet to jam" },
        2048: { name: "Oil", description: "An oil droplet" },
        4096: { name: "Healthy", description: "Your personal \nhealth jelly" },
        8192: { name: "Cuboid", description: "This one born boxy." },
        16384: { name: "Lumpy Jelly", description: "Bad tempered and \nlumpy" },
        32768: { name: "Sonic Jelly", description: "A very fast one" },
        65536: { name: "Super Sayajelly", description: "The strongest jelly \nof the universe" },
    },
    items: {
        clean: "Clean",
        fast: "Fast",
        time: "Time",
        revive: "Revive",
        evolve: "Evolve",
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
    social: {
        shareDescription: "I Love this game!",
        shareTitle: "JoinJelly",
        shareCaption: "",
    }
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
        leaderboards: "Placar",
        reset: "Apagar tudo",
        restore: "Recuperar",
        restoreWarning: "Isso vai recuperar suas compras da loja, quer continuar?",
        resetWarning: "Você tem certeza? tudo que voce consquistou será perdido.",
        about: "Sobre",
        aboutText: "Desenvolvido por",
        aboutURL: "www.dia-studio.com",
        tutorial: "Tutorial",
        shop: "Compras",
        playerName: "Nome do Jogador",
        playerNameDesc: "Digite seu nome para aparecer no placar dos melhores",
        error: "Desculpe, algo deu errado.",
    },
    tutorial: {
        msgheplme: "Me ajude a evoluir\nJunte 2 geleias IGUAIS.",
        msgOnceMore: "Legal! Estou maior, \nMe desenvolva novamente",
        msgDirt: "Oh não, sujeira! Junte \numa geleia aqui para limpar.",
        msgPlay: "Perfeito!\nMe evolua ao maximo!.",
        msgItemClean: "Sempre que precisar use items.\nEste limpa a bagunça",
        msgItemFast: "Esse junta \nalgumas geleias",
        msgItemTime: "Esse congela o tempo",
        msgItemRevive: "Se voce perder, use este para reviver",
        msgBoardFill: "Mas Tenha cuidado, se acabar \nos espaços no chão é o fim.",
    },
    jellies: {
        1: { name: "Geleinha", description: "Pequena mas \nimportante" },
        2: { name: "Gotinha", description: "gotejando por\ntodo lado" },
        4: { name: "Bolinho", description: "Incrível sabor de\nLimão" },
        8: { name: "Gema", description: "Sente falta da\nClara..." },
        16: { name: "SunBronze", description: "Com corpinho \nbronzeado" },
        32: { name: "Morango", description: "Entediada de tanto\ngelatinar" },
        64: { name: "Chatinha", description: "Não gosta de ser \ntocada" },
        128: { name: "Gelerda", description: "A geleia lerdinha" },
        256: { name: "Moti", description: "Irresistível vontade\nde comer com shoyu" },
        512: { name: "Xexão", description: "Lembra as bochechas \ndo meu irmão" },
        1024: { name: "Geleialien", description: "Veio de outro \nplaneta para geleiar" },
        2048: { name: "Petróleo", description: "Uma gotinha de \nóleo" },
        4096: { name: "Saudável", description: "Sua geleia pessoal \nde saúde" },
        8192: { name: "Cuboide", description: "Esse nasceu\nquadradão." },
        16384: { name: "Geleia Caroço", description: "Mau humorada e \nencaroçada" },
        32768: { name: "Geleia Sonica", description: "Uma geleia\nmuito rápida" },
        65536: { name: "Super Sayajelly", description: "A geleia mais forte \ndo universo" },
        131072: { name: "Phanton6 Jelly", description: "description" },
        262144: { name: "Phanton6 Jelly", description: "" },
    },
    items: {
        clean: "Limpa",
        fast: "Rápido",
        time: "Tempo",
        revive: "Reviver",
        evolve: "Desenvolve",
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
    social: {
        shareDescription: "Muito bom esse jogo!",
        shareTitle: "JoinJelly",
        shareCaption: "",
    }
};
var Analytics = (function () {
    function Analytics() {
    }
    Analytics.prototype.getUser = function () {
        if (!this.userId)
            this.userId = localStorage.getItem("dia_userID");
        if (!this.userId) {
            this.userId = (Math.random() * 9999999999).toString();
            localStorage.setItem("dia_userID", this.userId);
        }
        return this.userId;
    };
    Analytics.prototype.getSession = function () {
        if (!this.sessionId)
            this.sessionId = (Math.random() * 9999999999).toString();
        return this.sessionId;
    };
    Analytics.prototype.getBuild = function () {
        return "alpha 80";
    };
    Analytics.prototype.sendEvent = function (eventId, subEventId, value, area, x, y) {
        var game_key = '10b6363c0a7336d2d08a4036c0971226';
        var secret_key = 'f4a554ef98cb148fcc02570e8abf591f43a10996';
        var category = "design";
        var message = {
            "user_id": this.getUser(),
            "session_id": this.getSession(),
            "build": this.getBuild(),
            "event_id": eventId + ":" + subEventId,
            "value": value,
            "area": this.normalizeNumber(area),
            "x": x,
            "y": y,
        };
        var json_message = JSON.stringify(message);
        var md5_msg = CryptoJS.MD5(json_message + secret_key);
        var header_auth_hex = CryptoJS.enc.Hex.stringify(md5_msg);
        var url = 'http://api-eu.gameanalytics.com/1/' + game_key + '/' + category;
        this.postAjax(url, message, header_auth_hex);
    };
    Analytics.prototype.postAjax = function (url, data, header_auth_hex) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.setRequestHeader('Content-Length', JSON.stringify(data).length.toString());
        xhr.setRequestHeader("Authorization", header_auth_hex);
        if (xhr.readyState == 1)
            try {
                xhr.send(JSON.stringify(data));
            }
            catch (e) {
            }
    };
    Analytics.prototype.normalizeNumber = function (value) {
        var s = (Math.floor(value)).toString();
        while (s.length < 3)
            s = "0" + s;
        return s;
    };
    Analytics.prototype.log2_number = function (value) {
        return Math.floor(Math.log(value) / Math.log(2));
    };
    Analytics.prototype.log2 = function (value) {
        var val = Math.floor(Math.log(value) / Math.log(2));
        return this.normalizeNumber(val);
    };
    Analytics.prototype.parseTime = function (value) {
        return Math.floor(value / 60000);
    };
    Analytics.prototype.logGameStart = function () {
        this.sendEvent("GameStart", "start", 1);
    };
    Analytics.prototype.logUsedItem = function (itemId, level) {
        this.sendEvent("UseItem", itemId, 1, level);
    };
    Analytics.prototype.logEndGame = function (level, lastJelly, moves, time) {
        this.sendEvent("GameEnd", "Time", 1, parseInt((time / 60000).toFixed()));
        this.sendEvent("GameEnd", "Level", 1, level);
        this.sendEvent("GameEnd:LastJelly", this.log2(lastJelly), 1);
    };
    Analytics.prototype.logWinGame = function (level, lastJelly, moves, time) {
        this.sendEvent("GameWin", "Time", this.parseTime(time));
        this.sendEvent("GameWin", "Moves", moves);
        this.sendEvent("GameWin", "Level", level);
    };
    Analytics.prototype.logNewJelly = function (jellyId, level, time) {
        this.sendEvent("NewJelly:Time", this.normalizeNumber(jellyId), this.parseTime(time));
        this.sendEvent("NewJelly:Level", this.normalizeNumber(jellyId), level);
    };
    return Analytics;
})();
var productsData = {
    "pack1x": { icon: "Item Pack", consumable: false, share: true },
    "time5x": { icon: "5x Snow", consumable: true },
    "fast5x": { icon: "5x Magnet", consumable: true },
    "revive5x": { icon: "5x Revive", consumable: true },
    "clean5x": { icon: "5x Clean", consumable: true },
    "pack5x": { icon: "5x Item Pack", consumable: true },
    "pack10x": { icon: "10x Item Pack", consumable: true },
    "lucky": { icon: "Lucky Clover", consumable: false },
};
var joinjelly;
(function (joinjelly) {
    var ScrollablePage = (function (_super) {
        __extends(ScrollablePage, _super);
        function ScrollablePage(title) {
            var _this = this;
            _super.call(this);
            this.maxScroll = 1700;
            this.addBackground(title);
            this.addScrollableArea();
            this.addButton();
            this.onback = function () {
                if (_this.okButtonAction)
                    _this.okButtonAction();
                else
                    joinjelly.JoinJelly.showMainMenu();
            };
        }
        ScrollablePage.prototype.addBackground = function (title) {
            this.background.addChild(gameui.AssetsManager.getBitmap("BackMain"));
            var bg = gameui.AssetsManager.getBitmap('BigBG');
            bg.mouseEnabled = true;
            this.content.addChild(bg);
            bg.x = (defaultWidth - 1463) / 2;
            bg.y = (defaultHeight - 1788) / 2;
            var titleObj = gameui.AssetsManager.getBitmapText(title.toUpperCase(), "debussyBig");
            this.content.addChild(titleObj);
            titleObj.y = bg.y + 50;
            titleObj.x = defaultWidth / 2;
            titleObj.regX = titleObj.getBounds().width / 2;
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
            var okButton = new gameui.ImageButton("BtOk", function () {
                if (_this.okButtonAction)
                    _this.okButtonAction();
                else
                    joinjelly.JoinJelly.showMainMenu();
            });
            okButton.x = defaultWidth * 3 / 4;
            okButton.y = defaultHeight - 200;
            this.content.addChild(okButton);
        };
        return ScrollablePage;
    })(gameui.ScreenState);
    joinjelly.ScrollablePage = ScrollablePage;
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var Loading = (function (_super) {
            __extends(Loading, _super);
            function Loading() {
                var _this = this;
                _super.call(this);
                this.background.addChild(gameui.AssetsManager.getBitmap("BackMain"));
                var audioPath = "assets/sounds/";
                var imagePath = "assets/images/";
                assetscale = 1;
                if (window.innerWidth <= 1024)
                    assetscale = 0.5;
                if (window.innerWidth <= 384)
                    assetscale = 0.25;
                imagePath = "assets/images_" + assetscale + "x/";
                if (!testMode) {
                    createjs.Sound.alternateExtensions = ["mp3"];
                    createjs.Sound.registerSounds(audioManifest, audioPath);
                }
                gameui.AssetsManager.loadAssets(imageManifest, imagePath);
                gameui.AssetsManager.loadFontSpriteSheet("debussy", createSpriteSheetFromFont(debussyFont, imagePath));
                gameui.AssetsManager.loadFontSpriteSheet("debussyBig", createSpriteSheetFromFont(debussyFontBig, imagePath));
                gameui.AssetsManager.onProgress = function (progress) {
                    loadinBar.update(progress);
                };
                gameui.AssetsManager.onComplete = function () {
                    if (_this.loaded)
                        _this.loaded();
                };
                gameui.Button.DefaultSoundId = "Interface Sound-06";
                var loadinBar = new menus.view.LoadingBar(imagePath);
                this.content.addChild(loadinBar);
                loadinBar.x = defaultWidth / 2;
                loadinBar.y = defaultHeight / 2;
            }
            return Loading;
        })(gameui.ScreenState);
        menus.Loading = Loading;
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
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
            this.createButtons();
            this.createTitle();
            gameui.AudiosManager.playMusic("musicIntro");
        }
        MainScreen.prototype.createContent = function () {
            var lobby = new joinjelly.menus.view.JellyLobby(this.userData.getLastJelly());
            lobby.x = defaultWidth / 2;
            lobby.y = 1000;
            this.content.addChild(lobby);
            var button = new gameui.ImageButton("BtPlay", function () {
                if (joinjelly.JoinJelly.userData.getHistory(histories.TUTORIAL))
                    joinjelly.JoinJelly.startLevel();
                else
                    joinjelly.JoinJelly.showIntro();
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
            this.background.addChild(gameui.AssetsManager.getBitmap("BackMain"));
        };
        MainScreen.prototype.createButtons = function () {
            var _this = this;
            if (this.userData) {
                this.scoreText = gameui.AssetsManager.getBitmapText(StringResources.menus.highScore, "debussy");
                this.scoreText.x = 70;
                this.scoreText.y = -250;
                this.footer.addChild(this.scoreText);
                this.scoreText = gameui.AssetsManager.getBitmapText(this.userData.getHighScore().toString(), "debussyBig");
                this.scoreText.x = 70;
                this.scoreText.y = -170;
                this.footer.addChild(this.scoreText);
            }
            var x = defaultWidth + 100;
            var space = 250;
            var settingsBt = new gameui.ImageButton("DIAStudioIco", function () {
                joinjelly.JoinJelly.showAbout();
            });
            settingsBt.y = 165 / 2;
            settingsBt.x = defaultWidth - 165 / 2;
            this.header.addChild(settingsBt);
            var settingsBt = new gameui.ImageButton("BtMenu", function () {
                joinjelly.JoinJelly.showSettings();
            });
            settingsBt.y = -150;
            settingsBt.x = x -= space;
            this.footer.addChild(settingsBt);
            var storeBt = new gameui.ImageButton("BtStore", function () {
                joinjelly.JoinJelly.showStore(_this);
            });
            storeBt.y = -150;
            storeBt.x = x -= space;
            this.footer.addChild(storeBt);
            var aboutBt = new gameui.ImageButton("BtAchievements", function () {
                joinjelly.JoinJelly.showPedia();
            });
            aboutBt.y = -150;
            aboutBt.x = x -= space;
            this.footer.addChild(aboutBt);
            var leaderboardsBt = new gameui.ImageButton("BtLeaderBoards", function () {
                joinjelly.JoinJelly.gameServices.showLeaderboard();
            });
            leaderboardsBt.y = -150;
            leaderboardsBt.x = x -= space;
            this.footer.addChild(leaderboardsBt);
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
            var itensContainer = new createjs.Container();
            this.scrollableContent.addChild(itensContainer);
            itensContainer.y = 400;
            var index = 0;
            for (var j = 1; j <= joinjelly.JoinJelly.maxJelly; j *= 2) {
                if (j <= Math.max(1, userData.getLastJelly()))
                    var pi = new joinjelly.menus.view.JellyPediaItem(j, jellyInfos[j].name, jellyInfos[j].description);
                else
                    var pi = new joinjelly.menus.view.JellyPediaItem(0, "?", "");
                itensContainer.addChild(pi);
                pi.y = 500 * index;
                pi.x = 150;
                index++;
            }
            this.maxScroll = 7300;
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
                    var xPositions = [0, 213, 442, 631, 839];
                    var waits = [0, 1, 0, 0, 1];
                    var side = [0, 1, 1, -1, -1];
                    var images = [];
                    for (var char = 1; char <= 4; char++) {
                        var image = gameui.AssetsManager.getBitmap("title_join_" + char);
                        image.regX = image.getBounds().width / 2;
                        image.regY = image.getBounds().height / 2;
                        image.y = 514 + image.getBounds().height / 2 - image.getBounds().height;
                        image.x = xPositions[char];
                        image.alpha = 0;
                        this.addChild(image);
                        images[char] = image;
                        createjs.Tween.get(image).wait(waits[char] * 400).to({ alpha: 0, x: xPositions[char] - 300 * side[char], scaleX: 3, scaleY: 0.333 }).to({ alpha: 2, x: xPositions[char], scaleX: 1, scaleY: 1 }, 2000, createjs.Ease.elasticInOut);
                    }
                };
                GameTitle.prototype.createJelly = function () {
                    var xPositions = [213, 492, 761, 1039, 1278];
                    for (var char = 1; char <= 5; char++) {
                        var image = gameui.AssetsManager.getBitmap("title_jelly_" + char);
                        image.regX = image.getBounds().width / 2;
                        image.regY = image.getBounds().height;
                        var jelly = new joinjelly.view.JellyContainer();
                        jelly.visible = false;
                        jelly.executeAnimationIn(char * 100 + 1600);
                        jelly.imageContainer.addChild(image);
                        this.addChild(jelly);
                        jelly.x = xPositions[char - 1];
                        jelly.y = 800;
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
                    this.dropAllJellys(lastJelly);
                }
                JellyLobby.prototype.dropAllJellys = function (lastJelly) {
                    var _this = this;
                    if (!lastJelly)
                        lastJelly = 1;
                    if (lastJelly > joinjelly.JoinJelly.maxJelly)
                        lastJelly = joinjelly.JoinJelly.maxJelly;
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
                JellyLobby.prototype.dropJelly = function (value, position) {
                    var positions = [
                        [3 / 6, 0],
                        [2 / 6, 0.2],
                        [4 / 6, 0.2],
                        [1 / 6, 0.4],
                        [5 / 6, 0.4],
                        [2 / 5, 1],
                        [3 / 5, 1],
                        [1 / 5, 1.7],
                        [4 / 5, 1.7],
                        [1 / 6, 3],
                        [2 / 6, 2.4],
                        [4 / 6, 2.4],
                        [5 / 6, 3],
                        [2 / 7, 3.3],
                        [3 / 7, 2.9],
                        [4 / 7, 3.1],
                        [5 / 7, 3.3],
                    ];
                    var jelly = new joinjelly.gameplay.view.Jelly();
                    this.addChildAt(jelly, 0);
                    jelly.setNumber(value);
                    var m = (position % 2) ? -1 : 1;
                    jelly.x = (positions[position][0] * defaultWidth - defaultWidth / 2) * 1.2;
                    jelly.y = positions[position][1] * -200 + 750;
                    jelly.scaleX = jelly.scaleY = Math.min(1 - positions[position][1] / 7, 1);
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
                FlyOutMenu.prototype.AddBG = function (heigth) {
                    var dk = gameui.AssetsManager.getBitmap("popupdark");
                    this.addChild(dk);
                    dk.scaleX = dk.scaleY = 16;
                    dk.x = -defaultWidth / 2;
                    dk.y = -defaultHeight / 2;
                    dk.mouseEnabled = false;
                    var bg = gameui.AssetsManager.getBitmap("FlyBG");
                    bg.set({ x: defaultWidth / 2, y: 557, regX: 1305 / 2 });
                    bg.scaleY = heigth / 1022;
                    this.addChild(bg);
                    bg.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(-bg.x + bg.regX, -bg.y + bg.regY, defaultWidth, defaultHeight));
                };
                FlyOutMenu.prototype.addTitle = function (title) {
                    this.title = gameui.AssetsManager.getBitmapText("", "debussyBig");
                    this.title.set({ x: defaultWidth / 2, y: 600 });
                    this.addChild(this.title);
                    this.setTitle(title);
                };
                FlyOutMenu.prototype.animateIn = function () {
                    createjs.Tween.removeTweens(this);
                    this.visible = true;
                    this.y = this.top - 500;
                    this.alpha = 0;
                    this.scaleX = 0.5;
                    this.scaleY = 2;
                    createjs.Tween.get(this).to({ x: defaultWidth / 2, y: this.top, alpha: 1, scaleX: 1, scaleY: 1 }, 1400, createjs.Ease.elasticOut);
                };
                FlyOutMenu.prototype.animateOut = function () {
                    var _this = this;
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
                    var bg = gameui.AssetsManager.getBitmap("pediaItem");
                    this.addChild(bg);
                    var tContainer = new createjs.Container();
                    var titleObj = gameui.AssetsManager.getBitmapText(title, "debussyBig");
                    var descriptionObj = gameui.AssetsManager.getBitmapText(description, "debussy");
                    titleObj.y = 30;
                    descriptionObj.y = 130;
                    titleObj.scaleX = titleObj.scaleY = 0.9;
                    descriptionObj.scaleX = descriptionObj.scaleY = 0.9;
                    titleObj.x = descriptionObj.x = 450;
                    tContainer.addChild(titleObj);
                    tContainer.addChild(descriptionObj);
                    this.addChild(tContainer);
                    var j = new joinjelly.gameplay.view.Jelly();
                    j.setNumber(value);
                    j.x = 332 / 2;
                    j.y = 332;
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
        var StoreMenu = (function (_super) {
            __extends(StoreMenu, _super);
            function StoreMenu(previousScreen) {
                _super.call(this, StringResources.store.title);
                this.previousScreen = previousScreen;
                var statusText = gameui.AssetsManager.getBitmapText(StringResources.menus.loading, "debussy");
                statusText.y = 500;
                statusText.x = defaultWidth / 2;
                statusText.regX = statusText.getBounds().width / 2;
                this.StatusText = statusText;
                this.scrollableContent.addChild(statusText);
                var loadingBall = new joinjelly.view.LoadingBall();
                loadingBall.y = 800;
                loadingBall.x = defaultWidth / 2;
                this.loadingBall = loadingBall;
                this.scrollableContent.addChild(loadingBall);
                this.gameFooter = new joinjelly.gameplay.view.ItemsFooter([joinjelly.Items.TIME, joinjelly.Items.CLEAN, joinjelly.Items.FAST, joinjelly.Items.REVIVE]);
                this.footer.addChild(this.gameFooter);
                this.gameFooter.mouseEnabled = false;
                this.updateFooter();
                this.content.y -= 200;
                this.okButtonAction = function () {
                    joinjelly.JoinJelly.gameScreen.switchScreen(previousScreen);
                };
                this.initializeStore();
                var restore = new gameui.BitmapTextButton(StringResources.menus.restore, "debussy", "BtTextBg", function () {
                    Cocoon.Dialog.confirm({
                        title: StringResources.menus.restore,
                        message: StringResources.menus.restoreWarning
                    }, function (accepted) {
                        if (accepted)
                            Cocoon.Store.restore();
                    });
                });
                restore.x = defaultWidth * 1 / 3;
                restore.y = defaultHeight - 200;
                this.content.addChild(restore);
            }
            StoreMenu.prototype.fillProducts = function (productList) {
                var dic = {};
                this.productsListItems = dic;
                this.showLoaded();
                for (var p in productList)
                    this.addProduct(productList[p], p);
            };
            StoreMenu.prototype.addProduct = function (product, p) {
                var _this = this;
                var productListItem = new menus.view.ProductListItem(product.productId, product.title.replace("(Join Jelly)", ""), product.description, product.localizedPrice);
                this.productsListItems[product.productId] = productListItem;
                this.scrollableContent.addChild(productListItem);
                productListItem.y = p * 380 + 380;
                productListItem.x = 70;
                console.log(JSON.stringify(product));
                productListItem.addEventListener("buy", function (event) {
                    Cocoon.Store.purchase(event["productId"]);
                });
                productListItem.addEventListener("share", function (event) {
                    var productObject = event.currentTarget;
                    productObject.setPurchasing();
                    _this.lockUI();
                    _this.purchaseShareProduct(event["productId"], function (sucess) {
                        if (sucess) {
                            productObject.setPurchased();
                            gameui.AudiosManager.playSound("Interface Sound-11");
                        }
                        else {
                            productObject.setNormal();
                        }
                        _this.updateFooter();
                        _this.unlockUI();
                    });
                });
            };
            StoreMenu.prototype.showLoading = function () {
                this.StatusText.text = StringResources.menus.loading;
                this.loadingBall.visible = true;
            };
            StoreMenu.prototype.showLoaded = function () {
                this.StatusText.visible = false;
                this.loadingBall.visible = false;
            };
            StoreMenu.prototype.showError = function () {
                this.StatusText.text = StringResources.menus.error;
                this.loadingBall.visible = false;
            };
            StoreMenu.prototype.lockUI = function (timeout) {
                var _this = this;
                if (timeout === void 0) { timeout = 5000; }
                this.content.mouseEnabled = false;
                setTimeout(function () {
                    _this.unlockUI();
                }, timeout);
            };
            StoreMenu.prototype.unlockUI = function () {
                this.content.mouseEnabled = true;
            };
            StoreMenu.prototype.updateFooter = function () {
                var items = joinjelly.ItemsData.items;
                for (var i in items)
                    this.gameFooter.setItemAmmount(items[i], joinjelly.JoinJelly.itemData.getItemAmmount(items[i]));
            };
            StoreMenu.prototype.getProductListItem = function (productId) {
                return this.productsListItems[productId];
            };
            StoreMenu.prototype.animateItem = function (productId) {
                switch (productId) {
                    case "time5x":
                        this.gameFooter.bounceItem(joinjelly.Items.TIME);
                        break;
                    case "fast5x":
                        this.gameFooter.bounceItem(joinjelly.Items.FAST);
                        break;
                    case "clean5x":
                        this.gameFooter.bounceItem(joinjelly.Items.CLEAN);
                        break;
                    case "revive5x":
                        this.gameFooter.bounceItem(joinjelly.Items.REVIVE);
                        break;
                    case "pack5x":
                        this.gameFooter.bounceItem(joinjelly.Items.TIME);
                        this.gameFooter.bounceItem(joinjelly.Items.FAST);
                        this.gameFooter.bounceItem(joinjelly.Items.CLEAN);
                        this.gameFooter.bounceItem(joinjelly.Items.REVIVE);
                        break;
                    case "pack10x":
                        this.gameFooter.bounceItem(joinjelly.Items.TIME);
                        this.gameFooter.bounceItem(joinjelly.Items.FAST);
                        this.gameFooter.bounceItem(joinjelly.Items.CLEAN);
                        this.gameFooter.bounceItem(joinjelly.Items.REVIVE);
                        break;
                }
            };
            StoreMenu.prototype.initializeStore = function () {
                var _this = this;
                Cocoon.Store.on("load", {
                    started: function () {
                        _this.showLoading();
                    },
                    success: function (products) {
                        _this.fillProducts(products);
                    },
                    error: function (errorMessage) {
                        _this.showError();
                    }
                });
                Cocoon.Store.on("purchase", {
                    started: function (productId) {
                        _this.getProductListItem(productId).setPurchasing();
                        _this.lockUI();
                    },
                    success: function (purchaseInfo) {
                        _this.fullFillPurchase(purchaseInfo.productId);
                        _this.updateFooter();
                        _this.unlockUI();
                        _this.animateItem(purchaseInfo.productId);
                        if (productsData[purchaseInfo.productId].consumable) {
                            _this.getProductListItem(purchaseInfo.productId).setPurchased(true);
                            Cocoon.Store.consume(purchaseInfo.transactionId, purchaseInfo.productId);
                        }
                        _this.getProductListItem(purchaseInfo.productId).setPurchased();
                        Cocoon.Store.finish(purchaseInfo.transactionId);
                    },
                    error: function (productId, error) {
                        _this.getProductListItem(productId).setNormal();
                        _this.unlockUI();
                    }
                });
                Cocoon.Store.initialize({ sandbox: true, managed: true });
                var products = [];
                for (var p in productsData)
                    products.push(p);
                Cocoon.Store.loadProducts(products);
            };
            StoreMenu.prototype.purchaseShareProduct = function (productId, callback) {
                var fb = Cocoon.Social.Facebook;
                fb.init({ appId: fbAppId });
                var socialService = fb.getSocialInterface();
                var message = new Cocoon.Social.Message(StringResources.social.shareDescription, gameWebsiteIcon, gameWebsite, StringResources.social.shareTitle, StringResources.social.shareCaption);
                var that = this;
                socialService.publishMessageWithDialog(message, function (error) {
                    console.log("shared " + JSON.stringify(error));
                    var sucess = true;
                    if (error)
                        sucess = false;
                    if (sucess) {
                        that.fullFillPurchase(productId);
                    }
                    callback(sucess);
                });
            };
            StoreMenu.prototype.updateProductsAvaliability = function () {
            };
            StoreMenu.prototype.fullFillPurchase = function (productId) {
                switch (productId) {
                    case "time5x":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount(joinjelly.Items.TIME, 5);
                        break;
                    case "fast5x":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount(joinjelly.Items.FAST, 5);
                        break;
                    case "clean5x":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount(joinjelly.Items.CLEAN, 5);
                        break;
                    case "revive5x":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount(joinjelly.Items.REVIVE, 5);
                        break;
                    case "pack5x":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount(joinjelly.Items.TIME, 5);
                        joinjelly.JoinJelly.itemData.increaseItemAmmount(joinjelly.Items.FAST, 5);
                        joinjelly.JoinJelly.itemData.increaseItemAmmount(joinjelly.Items.CLEAN, 5);
                        joinjelly.JoinJelly.itemData.increaseItemAmmount(joinjelly.Items.REVIVE, 5);
                        break;
                    case "pack10x":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount(joinjelly.Items.TIME, 10);
                        joinjelly.JoinJelly.itemData.increaseItemAmmount(joinjelly.Items.FAST, 10);
                        joinjelly.JoinJelly.itemData.increaseItemAmmount(joinjelly.Items.CLEAN, 10);
                        joinjelly.JoinJelly.itemData.increaseItemAmmount(joinjelly.Items.REVIVE, 10);
                        break;
                    case "lucky":
                        joinjelly.JoinJelly.itemData.increaseItemAmmount(joinjelly.Items.LUCKY, 1);
                        break;
                }
                return true;
            };
            return StoreMenu;
        })(joinjelly.ScrollablePage);
        menus.StoreMenu = StoreMenu;
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                _super.call(this, StringResources.menus.menu);
                this.maxScroll = 1700;
                var space = 270;
                var y = 400;
                var soundOptions = new menus.view.SoundOptions();
                this.scrollableContent.addChild(soundOptions);
                this.scrollableContent.x = defaultWidth / 2;
                soundOptions.y = y += space;
                var tutorial = new gameui.BitmapTextButton(StringResources.menus.tutorial, "debussy", "BtTextBg", function () {
                    joinjelly.JoinJelly.showIntro();
                });
                tutorial.y = y += space;
                this.scrollableContent.addChild(tutorial);
                var reset = new gameui.BitmapTextButton(StringResources.menus.reset, "debussy", "BtTextBg", function () {
                    Cocoon.Dialog.confirm({
                        title: StringResources.menus.reset,
                        message: StringResources.menus.resetWarning
                    }, function (accepted) {
                        if (accepted) {
                            joinjelly.JoinJelly.userData.resetAll();
                            joinjelly.JoinJelly.showMainMenu();
                        }
                        else {
                        }
                    });
                });
                reset.y = y += space;
                this.scrollableContent.addChild(reset);
            }
            return MainMenu;
        })(joinjelly.ScrollablePage);
        menus.MainMenu = MainMenu;
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var About = (function (_super) {
        __extends(About, _super);
        function About() {
            _super.call(this);
            this.maxScroll = 1700;
            this.background.addChild(gameui.AssetsManager.getBitmap("BackMain"));
            var text = gameui.AssetsManager.getBitmapText(StringResources.menus.aboutText, "debussyBig");
            text.regX = text.getBounds().width / 2;
            this.content.addChild(text);
            text.x = defaultWidth / 2;
            text.y = defaultHeight / 2 - 500;
            var text = gameui.AssetsManager.getBitmapText(StringResources.menus.aboutURL, "debussy");
            text.regX = text.getBounds().width / 2;
            this.content.addChild(text);
            text.x = defaultWidth / 2;
            text.y = defaultHeight / 2 + 400;
            var logo = new gameui.ImageButton("DIAStudioLogo", function () {
                Cocoon.App.openURL("http://" + StringResources.menus.aboutURL);
            });
            logo.x = defaultWidth / 2;
            logo.y = defaultHeight / 2;
            this.content.addChild(logo);
            var okButton = new gameui.ImageButton("BtOk", function () {
                joinjelly.JoinJelly.showMainMenu();
            });
            okButton.x = defaultWidth / 2;
            okButton.y = defaultHeight - 200;
            this.content.addChild(okButton);
        }
        return About;
    })(gameui.ScreenState);
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
                    var f = gameui.AssetsManager.getBitmap("FlyGroup");
                    f.y = -130;
                    f.regX = f.getBounds().width / 2;
                    this.addChild(f);
                    var title = gameui.AssetsManager.getBitmapText(StringResources.menus.sound, "debussy");
                    title.y = -190;
                    title.scaleX = title.scaleY = 1.1;
                    title.regX = title.getBounds().width / 2;
                    this.addChild(title);
                    this.musicBtOn = new gameui.ImageButton("BtMusic", (function () {
                        _this.setMusic(0);
                    }));
                    this.musicBtOn.x = -145;
                    this.addChild(this.musicBtOn);
                    this.soundBtOn = new gameui.ImageButton("BtSound", (function () {
                        _this.setSound(0);
                    }));
                    this.soundBtOn.x = 155;
                    this.addChild(this.soundBtOn);
                    this.musicBtOff = new gameui.ImageButton("BtMusicOff", (function () {
                        _this.setMusic(1);
                    }));
                    this.musicBtOff.x = -145;
                    this.addChild(this.musicBtOff);
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
            JellyContainer.prototype.executeAnimationIn = function (delay) {
                var _this = this;
                if (delay === void 0) { delay = 0; }
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
                createjs.Tween.get(this.imageContainer).wait(delay).to({ alpha: 1, scaleX: 0.8, scaleY: 1.2 }, 200, createjs.Ease.sineOut).to({ scaleX: 1, scaleY: 1, y: 0 }, 2000, createjs.Ease.elasticOut).call(function () {
                    _this.executeIdle();
                });
                createjs.Tween.get(this.shadowContainer).wait(delay).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 400, createjs.Ease.sineOut).call(function () {
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
                var b = gameui.AssetsManager.getBitmap("loadingBall");
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
                    var pauseButton = new gameui.ImageButton("BtPause", function () {
                        _this.dispatchEvent("pause");
                    });
                    pauseButton.x = 157;
                    pauseButton.y = 215;
                    this.addChild(pauseButton);
                    var levelBarBorder = gameui.AssetsManager.getBitmap("bonus_border");
                    this.addChild(levelBarBorder);
                    levelBarBorder.x = 309;
                    levelBarBorder.y = 122;
                    var levelBar = gameui.AssetsManager.getBitmap("bonus_bar");
                    levelBar.x = 372;
                    levelBar.y = 207;
                    levelBar.mask = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0, 0, 939, 57));
                    levelBar.mask.x = 372;
                    levelBar.mask.y = 207;
                    this.levelBar = levelBar;
                    this.addChild(levelBar);
                    var levelTip = gameui.AssetsManager.getBitmap("powerTip");
                    levelTip.x = 372;
                    levelTip.y = 207;
                    levelTip.regX = 67 / 2;
                    levelTip.regY = 77 / 2;
                    this.levelTip = levelTip;
                    this.addChild(levelTip);
                    var levelIcon = gameui.AssetsManager.getBitmap("bonus_icon");
                    levelIcon.x = 1288 + 213 / 2;
                    levelIcon.y = 90 + 243 / 2;
                    levelIcon.regX = 213 / 2;
                    levelIcon.regY = 243 / 2;
                    levelIcon.mouseEnabled = true;
                    this.levelIcon = levelIcon;
                    this.addChild(levelIcon);
                    levelIcon.addEventListener("click", function () {
                        _this.levelUpEffect();
                    });
                    this.effect = new joinjelly.view.Effect();
                    this.addChild(this.effect);
                    this.effect.x = 1288 + 213 / 2;
                    this.effect.y = 90 + 243 / 2;
                    var score = gameui.AssetsManager.getBitmapText(StringResources.menus.score, "debussy");
                    score.x = 323 + 50;
                    score.y = 124 - 80 + 80;
                    score.scaleX = score.scaleY = 0.85;
                    this.scoreText = score;
                    this.addChild(score);
                    var level = gameui.AssetsManager.getBitmapText(StringResources.menus.level, "debussyBig");
                    level.x = 1000;
                    level.y = 242 - 165;
                    this.levelText = level;
                    this.addChild(level);
                };
                GameHeader.prototype.updateStatus = function (score, level, percent, emptyPercent, alarm) {
                    this.scoreText.text = StringResources.menus.score.toUpperCase() + " " + score.toString();
                    this.levelText.text = "Lv. " + level.toString();
                    var value = 1;
                    if (percent != undefined)
                        if (score != this.lastScore) {
                            value = percent / 100;
                            createjs.Tween.removeTweens(this.levelBar.mask);
                            createjs.Tween.get(this.levelBar.mask).to({ scaleX: value }, 1000, createjs.Ease.elasticOut);
                            createjs.Tween.removeTweens(this.levelTip);
                            createjs.Tween.get(this.levelTip).to({ x: value * 940 + this.levelBar.x, y: this.levelBar.y + 24 }, 1000, createjs.Ease.elasticOut);
                            createjs.Tween.get(this.levelTip).to({ scaleX: 2, scaleY: 2 }).to({ scaleX: 1, scaleY: 1 }, 1000, createjs.Ease.elasticOut);
                        }
                    if (this.lastLevel != level)
                        this.levelUpEffect();
                    this.lastLevel = level;
                    this.lastScore = score;
                };
                GameHeader.prototype.levelUpEffect = function () {
                    var _this = this;
                    this.effect.castBoth();
                    createjs.Tween.removeTweens(this.levelBar.mask);
                    createjs.Tween.get(this.levelBar.mask).to({ scaleX: 1 }, 100, createjs.Ease.quadIn).call(function () {
                        _this.levelBar.mask.scaleX = 0;
                    });
                    createjs.Tween.removeTweens(this.levelText);
                    this.levelText.set({ scaleY: 0, scaleX: 4 });
                    createjs.Tween.get(this.levelText).to({ scaleX: 1, scaleY: 1 }, 1000, createjs.Ease.elasticOut);
                    createjs.Tween.removeTweens(this.levelIcon);
                    this.levelIcon.set({ scaleY: 2, scaleX: 0.1 });
                    createjs.Tween.get(this.levelIcon).to({ scaleX: 1, scaleY: 1 }, 1000, createjs.Ease.elasticOut);
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
                function Jelly() {
                    _super.call(this);
                    this.effect = new joinjelly.view.Effect();
                    this.addChild(this.effect);
                    this.effect.scaleX = this.effect.scaleY = 1.2;
                    this.effect.x = 0;
                    this.effect.y = -100;
                }
                Jelly.prototype.getAssetIdByValue = function (value) {
                    if (value < 0)
                        return value.toString();
                    return Jelly.jellies[Math.log(value) / Math.log(2)];
                };
                Jelly.prototype.createJelly = function (value) {
                    var img = gameui.AssetsManager.getBitmap("j" + this.getAssetIdByValue(value));
                    img.regX = img.getBounds().width / 2;
                    img.regY = img.getBounds().height;
                    var shadow = gameui.AssetsManager.getBitmap("shadow");
                    shadow.regY = 45;
                    shadow.regX = 108;
                    shadow.scaleX = shadow.scaleY = img.getBounds().width / 216;
                    this.shadowContainer.addChild(shadow);
                    this.imageContainer.addChild(img);
                };
                Jelly.prototype.createEyes = function (value) {
                    var eye = new createjs.Container();
                    var eyeImg = gameui.AssetsManager.getBitmap("e" + this.getAssetIdByValue(value));
                    eyeImg.regY = 20;
                    createjs.Tween.get(eyeImg, { loop: true }).wait(3000 + Math.random() * 1000).to({ scaleY: 0.2 }, 100).to({ scaleY: 1 }, 100);
                    eye.addChild(eyeImg);
                    eye.regX = 133 / 2;
                    if (eyeImg.getBounds())
                        eye.regX = eyeImg.getBounds().width / 2;
                    eye.y = Math.min(-100, -eye.getBounds().height);
                    this.imageContainer.addChild(eye);
                    this.eyeImg = eyeImg;
                };
                Jelly.prototype.setNumber = function (value) {
                    if (value > joinjelly.JoinJelly.maxJelly)
                        value = joinjelly.JoinJelly.maxJelly;
                    if (this.currentValue == value)
                        return;
                    this.currentValue = value;
                    if (this.eyeImg)
                        createjs.Tween.removeTweens(this.eyeImg);
                    this.imageContainer.removeAllChildren();
                    this.shadowContainer.removeAllChildren();
                    if (value == 0 || !value) {
                        this.visible = false;
                    }
                    else {
                        this.visible = true;
                        this.alpha = 1;
                        this.createJelly(value);
                        this.createEyes(value);
                        this.executeAnimationIn();
                        if (value > 1)
                            this.playJoinFX();
                    }
                };
                Jelly.prototype.playJoinFX = function () {
                    this.effect.alpha = 0.5;
                    this.effect.castSimple();
                };
                Jelly.prototype.playLevelUp = function () {
                    this.effect.alpha = 0.25;
                    this.effect.castSimple();
                };
                Jelly.prototype.playEvolve = function () {
                    this.effect.alpha = 1;
                    this.effect.castBoth();
                };
                Jelly.prototype.playThunder = function () {
                    var _this = this;
                    setTimeout(function () {
                        _this.playEvolve();
                    }, 10);
                    setTimeout(function () {
                        _this.playLevelUp();
                    }, 330);
                    setTimeout(function () {
                        _this.playEvolve();
                    }, 660);
                    setTimeout(function () {
                        _this.playLevelUp();
                    }, 1000);
                    setTimeout(function () {
                        _this.playLevelUp();
                    }, 1100);
                };
                Jelly.jellies = [
                    "1",
                    "2",
                    "4",
                    "8",
                    "16",
                    "32",
                    "64",
                    "128",
                    "256",
                    "512",
                    "1024",
                    "oil",
                    "2048",
                    "square",
                    "4096",
                    "8192b",
                    "8192",
                ];
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
                    var text = gameui.AssetsManager.getBitmapText("level", "debussy");
                    this.addChild(text);
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
                    var bg = gameui.AssetsManager.getBitmap("itemBG");
                    var bgd = gameui.AssetsManager.getBitmap("itemBGDisabled");
                    var img = gameui.AssetsManager.getBitmap("item" + item);
                    var text = gameui.AssetsManager.getBitmapText("0", "debussy");
                    var name = gameui.AssetsManager.getBitmapText(StringResources.items[item], "debussy");
                    var add = gameui.AssetsManager.getBitmap("BtPlusMini");
                    this.disabled = bgd;
                    this.addChild(bg);
                    this.addChild(bgd);
                    this.addChild(img);
                    this.addChild(text);
                    this.addChild(name);
                    this.addChild(add);
                    bgd.visible = false;
                    bgd.regX = bg.regX = bg.getBounds().width / 2;
                    bgd.regY = bg.regY = bg.getBounds().height / 2;
                    img.regX = img.getBounds().width / 2;
                    img.regY = img.getBounds().height / 2;
                    img.scaleX = img.scaleY = 0.4;
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
                ItemButton.prototype.highLight = function (loop) {
                    if (loop === void 0) { loop = true; }
                    createjs.Tween.get(this, { loop: loop }).to({ rotation: -10, scaleX: 1, scaleY: 1 }, 100, createjs.Ease.quadInOut).to({ rotation: +10, scaleX: 1.3, scaleY: 1.3 }, 200, createjs.Ease.quadInOut).to({ rotation: -10, scaleX: 1.3, scaleY: 1.3 }, 200, createjs.Ease.quadInOut).to({ rotation: +10, scaleX: 1.3, scaleY: 1.3 }, 200, createjs.Ease.quadInOut).to({ rotation: 0, scaleX: 1, scaleY: 1 }, 100, createjs.Ease.quadInOut).wait(400);
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
            var PauseMenu = (function (_super) {
                __extends(PauseMenu, _super);
                function PauseMenu() {
                    _super.call(this, StringResources.menus.pause);
                    this.addButtons();
                    var soundOptions = new joinjelly.menus.view.SoundOptions();
                    this.addChild(soundOptions);
                    soundOptions.set({ x: defaultWidth / 2, y: 1000 });
                }
                PauseMenu.prototype.addButtons = function () {
                    var _this = this;
                    var ok = new gameui.ImageButton("BtPlay", (function () {
                        _this.dispatchEvent("play");
                    }));
                    ok.set({ x: 771, y: 1599 });
                    this.addChild(ok);
                    var home = new gameui.ImageButton("BtHome", (function () {
                        _this.dispatchEvent("home");
                    }));
                    home.set({ x: 353, y: 1570 });
                    this.addChild(home);
                    var restart = new gameui.ImageButton("BtRestart", (function () {
                        _this.dispatchEvent("restart");
                    }));
                    restart.set({ x: 1190, y: 1570 });
                    this.addChild(restart);
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
                    var bar = gameui.AssetsManager.getBitmap("time_bar");
                    var bright = gameui.AssetsManager.getBitmap("time_bar_bright");
                    var red = gameui.AssetsManager.getBitmap("time_bar_red");
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
                    if (this.value < percent)
                        this.incrasePercent();
                    this.value = percent;
                    createjs.Tween.removeTweens(this.percentBarMask);
                    createjs.Tween.get(this.percentBarMask).to({ scaleX: percent }, 200, createjs.Ease.quadInOut);
                    if (alarm)
                        this.setAlarmOn();
                    else
                        this.setAlarmOff();
                };
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
                    this.addPoints();
                    this.addLastJelly();
                    this.addButtons();
                }
                FinishMenu.prototype.addButtons = function () {
                    var _this = this;
                    var board = new gameui.ImageButton("BtBoard", (function () {
                        _this.dispatchEvent("board");
                    }));
                    board.set({ x: defaultWidth / 2, y: 1780 });
                    this.addChild(board);
                    var share = new gameui.ImageButton("BtShare", (function () {
                        _this.dispatchEvent("share");
                    }));
                    share.set({ x: 1240, y: 1020 });
                    this.addChild(share);
                    var home = new gameui.ImageButton("BtHome", (function () {
                        _this.dispatchEvent("ok");
                    }));
                    home.set({ x: 353, y: 1780 });
                    this.addChild(home);
                    var restart = new gameui.ImageButton("BtRestart", (function () {
                        _this.dispatchEvent("restart");
                    }));
                    restart.set({ x: 1190, y: 1780 });
                    this.addChild(restart);
                };
                FinishMenu.prototype.addPoints = function () {
                    var container = new createjs.Container();
                    var bg = gameui.AssetsManager.getBitmap("GameOverBgPoints");
                    bg.set({ x: defaultWidth / 2, y: 565, regX: 1056 / 2 });
                    container.addChild(bg);
                    var tx = gameui.AssetsManager.getBitmapText("", "debussyBig");
                    tx.set({ x: defaultWidth / 2, y: 630 });
                    container.addChild(tx);
                    this.scoreText = tx;
                    var tx = gameui.AssetsManager.getBitmapText("", "debussy");
                    tx.set({ x: 300, y: 775 });
                    tx.scaleX = tx.scaleY = 0.8;
                    container.addChild(tx);
                    this.highScoreText = tx;
                    container.y += 260;
                    this.addChild(container);
                    return container;
                };
                FinishMenu.prototype.addLastJelly = function () {
                    var container = new createjs.Container();
                    this.addChild(container);
                    var bg = gameui.AssetsManager.getBitmap("GameOverBgJelly");
                    bg.set({ x: defaultWidth / 2, y: 951, regX: 797 / 2 });
                    container.addChild(bg);
                    var tx = gameui.AssetsManager.getBitmapText(StringResources.menus.highJelly, "debussy");
                    tx.set({ x: 420, y: 820 });
                    tx.scaleX = tx.scaleY = 0.5;
                    var jelly = new gameplay.view.Jelly();
                    container.addChild(jelly);
                    this.addChild(container);
                    jelly.scaleX = jelly.scaleY = 1;
                    jelly.set({ x: defaultWidth / 2, y: 1350 });
                    this.jelly = jelly;
                    var tx = gameui.AssetsManager.getBitmapText("1", "debussy");
                    tx.set({ x: defaultWidth / 2, y: 1358 });
                    tx.scaleX = tx.scaleY = 0.9;
                    this.jellyText = tx;
                    container.addChild(tx);
                    container.y += 200;
                    return container;
                };
                FinishMenu.prototype.setValues = function (score, best, jelly, title) {
                    var _this = this;
                    if (best > joinjelly.JoinJelly.maxJelly)
                        best = joinjelly.JoinJelly.maxJelly;
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
                    this.highScoreText.text = StringResources.menus.highScore + ": " + best.toString();
                    this.jelly.setNumber(jelly);
                    this.jellyText.text = StringResources.jellies[jelly].name;
                    if (this.jellyText.getBounds())
                        this.jellyText.regX = this.jellyText.getBounds().width / 2;
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
                    this.fingerUp = gameui.AssetsManager.getBitmap("tutorialFinger");
                    this.fingerDown = gameui.AssetsManager.getBitmap("tutorialFingerDown");
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
                    this.addChild(gameui.AssetsManager.getBitmap("ballon"));
                    this.visible = false;
                    this.regX = 316;
                    this.regY = 366;
                    this.x = 164 + this.regX;
                    this.y = 941 + this.regY;
                    var t = gameui.AssetsManager.getBitmapText("", "debussy");
                    this.addChild(t);
                    t.scaleX = t.scaleY = 0.8;
                    t.x = 50;
                    t.y = 50;
                    this.bitmapText = t;
                    t.mouseEnabled = false;
                    this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(-this.x + this.regX, -this.y + this.regY, defaultWidth, defaultHeight));
                    this.addEventListener("click", function () {
                        _this.fadeOut();
                        _this.dispatchEvent("closed");
                        gameui.AudiosManager.playSound("Interface Sound-15");
                    });
                }
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
            function Board(boardWidth, boardHeight, tileSize, img) {
                _super.call(this);
                this.touchDictionary = new Array();
                this.alarming = false;
                this.tiles = [];
                this.boardHeight = boardHeight;
                this.boardWidth = boardWidth;
                this.tileSize = tileSize;
                this.tilesContainer = new createjs.Container();
                this.addChild(this.tilesContainer);
                this.tilesContainer.hitArea = new createjs.Shape(new createjs.Graphics().f("red").r(0, 0, boardWidth * tileSize, (boardHeight + 0.5) * tileSize));
                this.addTiles(boardWidth, boardHeight, tileSize, img);
                this.addMouseEvents(tileSize);
                this.regX = (boardWidth * tileSize / 2);
                this.regY = (boardHeight * tileSize / 2);
            }
            Board.prototype.addTiles = function (boardWidth, boardHeight, tileSize, img) {
                for (var x = 0; x < boardWidth; x++)
                    for (var y = 0; y < boardHeight; y++)
                        this.addTile(x, y, tileSize);
            };
            Board.prototype.addTile = function (x, y, tileSize) {
                var bg = gameui.AssetsManager.getBitmap("hex");
                this.tilesContainer.addChild(bg);
                bg.regX = 358 / 2;
                bg.regY = 0;
                bg.alpha = 0.15;
                bg.set(this.getTilePositionByCoords(x, y, tileSize, 0));
                var tileDO = new gameplay.Tile(x, y, tileSize);
                this.tiles.push(tileDO);
                this.tilesContainer.addChild(tileDO);
                tileDO.setNumber(0);
                tileDO.name = (this.boardWidth * y + x).toString();
                tileDO.set(this.getTilePositionByCoords(x, y, tileSize));
            };
            Board.prototype.addMouseEvents = function (tileSize) {
                var _this = this;
                var touchOffset = [];
                this.tilesContainer.addEventListener("mousedown", function (e) {
                    var tile = _this.getTileByRawPos(e.localX, e.localY, tileSize);
                    if (tile && tile.isUnlocked() && tile.isEnabled()) {
                        tile.lock();
                        _this.touchDictionary[e.pointerID] = tile;
                        touchOffset[e.pointerID] = { x: tile.x - e.localX, y: tile.y - e.localY };
                        tile.drag();
                        _this.tilesContainer.setChildIndex(tile, _this.tilesContainer.getNumChildren() - 1);
                        gameui.AudiosManager.playSound('soundh_1');
                    }
                });
                this.tilesContainer.addEventListener("pressmove", function (e) {
                    var tile = _this.touchDictionary[e.pointerID];
                    if (tile) {
                        tile.x = e.localX + touchOffset[e.pointerID].x;
                        tile.y = e.localY + touchOffset[e.pointerID].y;
                        tile.lock();
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
                this.tilesContainer.addEventListener("pressup", function (e) {
                    var tile = _this.touchDictionary[e.pointerID];
                    if (tile) {
                        tile.unlock;
                        _this.releaseDrag(tile, false);
                        tile.release();
                    }
                });
            };
            Board.prototype.setTiles = function (tiles) {
                this.unlock();
                for (var t in tiles) {
                    this.setTileValue(t, tiles[t]);
                    this.getTileById(t).unlock();
                    this.getTileById(t).enable();
                }
            };
            Board.prototype.setTileValue = function (tileId, value) {
                var t = this.getTileById(tileId);
                if (t)
                    t.setNumber(value);
                if (value == 1)
                    gameui.AudiosManager.playSound("sound_s" + (Math.floor(Math.random() * 3) + 1), null, 400);
            };
            Board.prototype.getTileIdByPos = function (rawx, rawy, tileSize) {
                var coords = this.getTileCoordsByRawPos(rawx, rawy, tileSize);
                return (this.boardWidth * coords.y + coords.x);
            };
            Board.prototype.getTileByRawPos = function (rawx, rawy, tileSize) {
                var id = this.getTileIdByPos(rawx, rawy, tileSize);
                return this.getTileById(id);
            };
            Board.prototype.getTileCoordsByRawPos = function (rawx, rawy, tileSize) {
                var x = Math.floor(rawx / tileSize);
                var hexaOffset = (x == 1 || x == 3) ? tileSize / 2 : 0;
                var y = Math.floor((rawy - hexaOffset) / tileSize);
                return { x: x, y: y };
            };
            Board.prototype.getTileByIndex = function (x, y) {
                var id = this.boardWidth * y + x;
                return this.getTileById(id);
            };
            Board.prototype.getTilePositionByCoords = function (x, y, tileSize, random) {
                if (random === void 0) { random = 1; }
                var hexaOffset = (x == 1 || x == 3) ? tileSize / 2 : 0;
                return {
                    x: (x + 1 / 2) * tileSize + random * (Math.random() - 0.5) * tileSize / 10,
                    y: (y + 1 / 2) * tileSize + random * (Math.random() - 0.5) * tileSize / 10 + hexaOffset - tileSize / 5
                };
            };
            Board.prototype.getTileById = function (id) {
                return this.tilesContainer.getChildByName(id.toString());
            };
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
                var total = this.boardHeight * this.boardWidth;
                var tiles = [];
                for (var t = 0; t < total; t++)
                    if (this.tiles[t].isEmpty())
                        tiles.push(this.tiles[t]);
                return tiles;
            };
            Board.prototype.getLockedNotDraggingTiles = function () {
                var total = this.boardHeight * this.boardWidth;
                var tiles = [];
                for (var t = 0; t < total; t++)
                    if (!this.tiles[t].isUnlocked() && !this.tiles[t].isDragging)
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
            Board.prototype.getNeighborTiles = function (tile) {
                var neighbor = [];
                var tileId = this.getTileId(tile);
                var hexaOffset = (tile.posx == 1 || tile.posx == 3) ? 1 : -1;
                var neighborCoords = [
                    { x: tile.posx, y: tile.posy - 1 },
                    { x: tile.posx, y: tile.posy + 1 },
                    { x: tile.posx - 1, y: tile.posy },
                    { x: tile.posx + 1, y: tile.posy },
                    { x: tile.posx - 1, y: tile.posy + hexaOffset },
                    { x: tile.posx + 1, y: tile.posy + hexaOffset },
                ];
                for (var p in neighborCoords)
                    if (neighborCoords[p].x >= 0 && neighborCoords[p].y >= 0 && neighborCoords[p].x < this.boardWidth && neighborCoords[p].y < this.boardHeight)
                        neighbor.push(this.getTileByIndex(neighborCoords[p].x, neighborCoords[p].y));
                return neighbor;
            };
            Board.prototype.getPercentEmptySpaces = function () {
                var total = this.boardHeight * this.boardWidth;
                var empty = this.getEmptyTiles().length;
                return empty / total;
            };
            Board.prototype.releaseDrag = function (tile, match, target) {
                var _this = this;
                if (match === void 0) { match = true; }
                var index = this.touchDictionary.indexOf(tile);
                delete this.touchDictionary[index];
                createjs.Tween.removeTweens(tile);
                tile.scaleY = tile.scaleX = 1;
                if (match && target) {
                    var pos = this.getTilePositionByCoords(target.posx, target.posy, this.tileSize);
                    this.fadeTileToPos(tile, pos.x, pos.y);
                }
                else {
                    tile.release();
                    createjs.Tween.get(tile).to(this.getTilePositionByCoords(tile.posx, tile.posy, this.tileSize), 200, createjs.Ease.sineInOut).call(function () {
                        _this.arrangeZOrder();
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
            Board.prototype.arrangeZOrder = function () {
                for (var t = 0; t < this.tiles.length; t++)
                    this.tilesContainer.setChildIndex(this.tiles[t], this.tilesContainer.getNumChildren() - 1);
            };
            Board.prototype.match = function (origin, target) {
                this.releaseDrag(origin, true, target);
                target.set({ scaleX: 1.8, scaleY: 1.8, alpha: 0 });
                createjs.Tween.get(target).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 140, createjs.Ease.cubicOut);
                gameui.AudiosManager.playSound('sound_j' + (Math.floor(Math.random() * 4) + 1));
            };
            Board.prototype.cleanBoard = function () {
                for (var t in this.tiles)
                    this.tiles[t].setNumber(0);
            };
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
            Board.prototype.levelUpEffect = function () {
                var _this = this;
                var currentTile = 0;
                for (var t in this.tiles) {
                    setTimeout(function () {
                        var calculatedTile = (_this.boardHeight * _this.boardWidth) - (currentTile % _this.boardWidth * _this.boardWidth + Math.floor(currentTile / _this.boardWidth)) - 1;
                        var tile = _this.tiles[calculatedTile];
                        createjs.Tween.get(tile).to({ scaleY: 1.5 }, 100).to({ scaleY: 1 }, 100);
                        tile.jelly.playLevelUp();
                        currentTile++;
                    }, 20 * t);
                }
            };
            Board.prototype.endGameEffect = function () {
                var _this = this;
                var currentTile = 0;
                for (var t in this.tiles) {
                    setTimeout(function () {
                        currentTile++;
                        var x = (currentTile % _this.boardWidth * _this.boardWidth + Math.floor(currentTile / _this.boardWidth));
                        var tile = _this.tiles[x];
                        createjs.Tween.get(tile).to({ scaleY: 0.5 }, 100).to({ scaleY: 1 }, 100);
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
            function Tile(posx, posy, tileSize) {
                _super.call(this);
                this.tileSize = tileSize;
                this.posx = posx;
                this.posy = posy;
                this.regX = this.regY = tileSize / 2;
                this.jelly = new gameplay.view.Jelly();
                this.jelly.x = tileSize / 2;
                this.jelly.y = tileSize;
                this.jelly.scaleX = this.jelly.scaleY = this.tileSize / (450);
                this.addChild(this.jelly);
                this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("000").drawRect(0, 0, tileSize, tileSize));
            }
            Tile.prototype.release = function () {
                this.jelly.executeAimationRelease();
                this.unlock();
                this.dragging = false;
            };
            Tile.prototype.drag = function () {
                this.jelly.executeAnimationHold();
                this.dragging = true;
            };
            Tile.prototype.isUnlocked = function () {
                return !this.locked;
            };
            Tile.prototype.isDragging = function () {
                return this.dragging;
            };
            Tile.prototype.lock = function () {
                this.locked = true;
            };
            Tile.prototype.unlock = function () {
                this.locked = false;
                this.dragging = false;
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
            Tile.prototype.setNumber = function (value) {
                if (value > joinjelly.JoinJelly.maxJelly)
                    value = joinjelly.JoinJelly.maxJelly;
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
            function GamePlayScreen(userData) {
                _super.call(this);
                this.matches = 0;
                this.boardSize = 5;
                this.itemProbability = 0.005;
                this.timeByLevel = 20000;
                this.initialInterval = 800;
                this.finalInterval = 300;
                this.easeInterval = 0.99;
                this.initialDirtyProbability = 0.1;
                this.finalDirtyProbability = 0.5;
                this.easeDirtyProbability = 0.99;
                this.userData = userData;
                this.score = 0;
                this.createBackground();
                this.createBoard();
                this.createGUI();
                this.createEffects();
                this.start();
                this.loadGame();
                if (joinjelly.JoinJelly.userData.getHistory("firstPlay")) {
                    joinjelly.JoinJelly.itemData.setItemAmmount(joinjelly.Items.REVIVE, 1);
                    joinjelly.JoinJelly.itemData.setItemAmmount(joinjelly.Items.TIME, 2);
                    joinjelly.JoinJelly.itemData.setItemAmmount(joinjelly.Items.FAST, 2);
                    joinjelly.JoinJelly.itemData.setItemAmmount(joinjelly.Items.CLEAN, 2);
                    joinjelly.JoinJelly.itemData.setItemAmmount(joinjelly.Items.LUCKY, 0);
                }
                joinjelly.JoinJelly.userData.history("firstPlay");
            }
            GamePlayScreen.prototype.createEffects = function () {
                this.freezeEffect = gameui.AssetsManager.getBitmap("freezeEffect");
                this.content.addChild(this.freezeEffect);
                this.normalizeEffect(this.freezeEffect);
                this.evolveEffect = gameui.AssetsManager.getBitmap("fxEvolve");
                this.content.addChild(this.evolveEffect);
                this.evolveEffect.regX = 150;
                this.normalizeEffect(this.evolveEffect);
                this.reviveEffect = gameui.AssetsManager.getBitmap("reviveEffect");
                this.content.addChild(this.reviveEffect);
                this.normalizeEffect(this.reviveEffect);
                this.cleanEffect = gameui.AssetsManager.getBitmap("cleanEffect");
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
            GamePlayScreen.prototype.createBackground = function () {
                var bg = gameui.AssetsManager.getBitmap("Background");
                this.background.addChild(bg);
            };
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
            GamePlayScreen.prototype.createGUI = function () {
                var _this = this;
                this.gameLevelIndicator = new gameplay.view.LevelIndicator();
                this.content.addChild(this.gameLevelIndicator);
                this.gameHeader = new gameplay.view.GameHeader();
                this.header.addChild(this.gameHeader);
                var items = [joinjelly.Items.TIME, joinjelly.Items.CLEAN, joinjelly.Items.FAST];
                this.gameFooter = new gameplay.view.ItemsFooter(items);
                this.gameFooter.lockItem(joinjelly.Items.REVIVE);
                this.footer.addChild(this.gameFooter);
                this.updateFooter();
                this.gameFooter.addEventListener("useitem", function (e) {
                    _this.useItem(e.item);
                });
                this.pauseMenu = new gameplay.view.PauseMenu();
                this.overlay.addChild(this.pauseMenu);
                this.finishMenu = new gameplay.view.FinishMenu();
                this.overlay.addChild(this.finishMenu);
                this.finishMenu.y = -200;
                this.gameMessage = new gameplay.view.TutoralMessage();
                this.content.addChild(this.gameMessage);
                this.countDown = new gameplay.view.CountDown();
                this.content.addChild(this.countDown);
                this.countDown.x = defaultWidth / 2;
                this.countDown.y = defaultHeight / 2;
                var tbt = new gameui.ImageButton("BtBoard", function () {
                    _this.finishMenu.show();
                    tbt.fadeOut();
                    gameui.AudiosManager.playSound("Interface Sound-06");
                });
                tbt.set({ x: 150, y: -150, visible: false });
                this.footer.addChild(tbt);
                this.showBoardButton = tbt;
                this.finishMenu.addEventListener("restart", function () {
                    _this.pauseMenu.hide();
                    _this.userData.deleteSaveGame();
                    setTimeout(function () {
                        joinjelly.JoinJelly.startLevel();
                    }, 200);
                });
                this.finishMenu.addEventListener("ok", function () {
                    joinjelly.JoinJelly.showMainMenu();
                });
                this.finishMenu.addEventListener("board", function () {
                    _this.finishMenu.hide();
                    tbt.fadeIn();
                });
                this.finishMenu.addEventListener("share", function () {
                    alert("share");
                    var fb = Cocoon.Social.Facebook;
                    fb.init({ appId: fbAppId });
                    var socialService = fb.getSocialInterface();
                    alert("share");
                    var message = new Cocoon.Social.Message(StringResources.social.shareDescription, gameWebsiteIcon, gameWebsite, StringResources.social.shareTitle + " - " + _this.score + " " + StringResources.menus.score, StringResources.social.shareCaption);
                    var that = _this;
                    socialService.publishMessageWithDialog(message, function (error) {
                        console.log("shared " + JSON.stringify(error));
                        var sucess = true;
                        if (error)
                            sucess = false;
                        if (sucess)
                            alert("K");
                    });
                });
                this.gameHeader.addEventListener("pause", function () {
                    _this.pauseGame();
                });
                this.pauseMenu.addEventListener("play", function () {
                    _this.continueGame();
                });
                this.pauseMenu.addEventListener("test", function () {
                    _this.selfPeformanceTest(false);
                });
                this.pauseMenu.addEventListener("testFast", function () {
                    _this.selfPeformanceTest(true);
                });
                this.pauseMenu.addEventListener("home", function () {
                    _this.pauseMenu.hide();
                    setTimeout(function () {
                        joinjelly.JoinJelly.showMainMenu();
                    }, 200);
                });
                this.pauseMenu.addEventListener("restart", function () {
                    _this.pauseMenu.hide();
                    _this.userData.deleteSaveGame();
                    setTimeout(function () {
                        joinjelly.JoinJelly.startLevel();
                    }, 200);
                });
                this.onback = function () {
                    if (_this.gamestate == 2 /* paused */)
                        _this.continueGame();
                    else if (_this.gamestate == 1 /* playing */)
                        _this.pauseGame();
                };
            };
            GamePlayScreen.prototype.redim = function (headerY, footerY, width, heigth) {
                _super.prototype.redim.call(this, headerY, footerY, width, heigth);
                var relativeScale = (this.screenHeight - 2048) / 400;
                if (relativeScale < 0)
                    relativeScale = 0;
                if (relativeScale > 1)
                    relativeScale = 1;
                this.board.scaleX = this.board.scaleY = 1 - (0.2 - relativeScale * 0.2);
            };
            GamePlayScreen.prototype.activate = function (parameters) {
                var _this = this;
                _super.prototype.activate.call(this, parameters);
                this.gameHeader.alpha = 0;
                setTimeout(function () {
                    createjs.Tween.get(_this.gameHeader).to({ alpha: 1 }, 500);
                }, 500);
                this.updateFooter();
            };
            GamePlayScreen.prototype.updateInterfaceInfos = function () {
                var nextLevelScore = this.getMovesByLevel(this.level);
                var currentLevelScore = this.getMovesByLevel(this.level - 1);
                var percent = (this.matches - currentLevelScore) / (nextLevelScore - currentLevelScore) * 100;
                var emptySpaces = this.board.getPercentEmptySpaces();
                var alarm = false;
                if (emptySpaces < 0.15 && emptySpaces > 0)
                    var alarm = true;
                this.gameHeader.updateStatus(this.score, this.level, percent, emptySpaces, alarm);
                this.board.setAlarm(alarm);
            };
            GamePlayScreen.prototype.levelUpInterfaceEffect = function (level) {
                this.gameLevelIndicator.showLevel(level);
                gameui.AudiosManager.playSound("levelUp");
                this.board.levelUpEffect();
            };
            GamePlayScreen.prototype.start = function () {
                this.level = 1;
                this.matches = 0;
                this.time = Date.now();
                this.highJelly = 0;
                this.board.cleanBoard();
                this.board.unlock();
                this.updateInterfaceInfos();
                gameui.AudiosManager.playMusic("music1");
                this.gamestate = 1 /* playing */;
                this.step(500);
                joinjelly.JoinJelly.analytics.logGameStart();
                this.highJellySave(1);
            };
            GamePlayScreen.prototype.step = function (timeout) {
                var _this = this;
                clearTimeout(this.timeoutInterval);
                this.timeoutInterval = setTimeout(function () {
                    if (_this.gamestate == 1 /* playing */)
                        _this.gameInteraction();
                    if (_this.gamestate != 3 /* ended */)
                        _this.step(_this.getTimeInterval(_this.level, _this.initialInterval, _this.finalInterval, _this.easeInterval));
                }, timeout);
            };
            GamePlayScreen.prototype.gameInteraction = function () {
                if (this.verifyGameLoose())
                    this.endGame();
                this.addRandomJellyOnBoard(1);
                this.updateInterfaceInfos();
                this.updateCurrentLevel();
            };
            GamePlayScreen.prototype.pauseGame = function () {
                if (this.gamestate == 4 /* standBy */)
                    return;
                if (this.gamestate == 3 /* ended */)
                    return;
                this.pauseMenu.show();
                this.gamestate = 2 /* paused */;
                this.board.lock();
                this.gameFooter.lockAll();
                this.gameHeader.mouseEnabled = false;
                this.content.mouseEnabled = false;
            };
            GamePlayScreen.prototype.continueGame = function () {
                var _this = this;
                this.pauseMenu.hide();
                this.gamestate = 4 /* standBy */;
                setTimeout(function () {
                    _this.gamestate = 1 /* playing */;
                    _this.board.unlock();
                    _this.gameHeader.mouseEnabled = true;
                    _this.content.mouseEnabled = true;
                    _this.gameFooter.unlockAll();
                }, 3200);
                this.countDown.countDown(3);
            };
            GamePlayScreen.prototype.winGame = function () {
                this.endGame(StringResources.menus.gameOver, true);
                this.gameFooter.visible = false;
            };
            GamePlayScreen.prototype.endGame = function (message, win) {
                var _this = this;
                this.view.setChildIndex(this.footer, this.view.getNumChildren() - 1);
                this.gamestate = 4 /* standBy */;
                var score = this.score;
                var highScore = joinjelly.JoinJelly.userData.getHighScore();
                var highJelly = this.board.getHighestTileValue();
                this.pauseMenu.hide();
                this.board.lock();
                this.board.setAlarm(false);
                this.board.releaseAll();
                this.gameHeader.mouseEnabled = false;
                this.gameFooter.mouseEnabled = false;
                createjs.Tween.get(this.gameHeader).to({ y: -425 }, 200, createjs.Ease.quadIn);
                createjs.Tween.get(this.gameFooter).to({ y: +300 }, 200, createjs.Ease.quadIn);
                setTimeout(function () {
                    if (win)
                        _this.gamestate = 5 /* win */;
                    else
                        _this.gamestate = 3 /* ended */;
                    _this.finishMenu.show();
                    _this.gameFooter.mouseEnabled = true;
                    _this.gameFooter.setItems([joinjelly.Items.REVIVE]);
                    _this.gameFooter.unlockItem(joinjelly.Items.REVIVE);
                    _this.gameFooter.highlight(joinjelly.Items.REVIVE);
                    _this.updateFooter();
                    createjs.Tween.get(_this.gameFooter).to({ y: 0 }, 200, createjs.Ease.quadIn);
                    joinjelly.JoinJelly.userData.setScore(Math.max(score, joinjelly.JoinJelly.userData.getHighScore()));
                    joinjelly.JoinJelly.gameServices.submitScore(Math.max(score, joinjelly.JoinJelly.userData.getHighScore()));
                }, 1200);
                this.finishMenu.setValues(score, Math.max(highScore, score), highJelly, message);
                if (win)
                    joinjelly.JoinJelly.analytics.logWinGame(this.level, highJelly, this.matches, Date.now() - this.time);
                else
                    joinjelly.JoinJelly.analytics.logEndGame(this.level, highJelly, this.matches, Date.now() - this.time);
                gameui.AudiosManager.playSound("end");
                this.board.endGameEffect();
            };
            GamePlayScreen.prototype.updateCurrentLevel = function () {
                var newLevel = this.getLevelByMoves(this.matches);
                if (newLevel > this.level) {
                    this.level = newLevel;
                    this.levelUpInterfaceEffect(newLevel);
                    this.updateInterfaceInfos();
                    this.levelUpBonus();
                }
                this.level = newLevel;
            };
            GamePlayScreen.prototype.levelUpBonus = function () {
                this.useEvolve();
                this.cleanAllDirty();
            };
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
            GamePlayScreen.prototype.getMovesByLevel = function (level) {
                var totalMoves = 0;
                for (var calculatedLevel = 0; calculatedLevel < level; calculatedLevel++) {
                    var interval = this.getTimeInterval(calculatedLevel, this.initialInterval, this.finalInterval, this.easeInterval);
                    var levelMoves = this.timeByLevel / interval;
                    totalMoves += levelMoves;
                }
                return totalMoves;
            };
            GamePlayScreen.prototype.getTimeInterval = function (level, initialInterval, finalInterval, intervalEase) {
                return initialInterval * Math.pow(intervalEase, level) + finalInterval * (1 - Math.pow(intervalEase, level));
            };
            GamePlayScreen.prototype.verifyGameLoose = function () {
                var empty = this.board.getEmptyTiles();
                var locked = this.board.getLockedNotDraggingTiles();
                if (empty.length == 0 && locked.length == 0)
                    return true;
                return false;
            };
            GamePlayScreen.prototype.addRandomJellyOnBoard = function (JellyValue) {
                for (var i = 10; i < this.level; i += 10)
                    if (Math.random() > 0.9)
                        JellyValue *= 2;
                if (JellyValue > joinjelly.JoinJelly.maxJelly)
                    JellyValue = joinjelly.JoinJelly.maxJelly;
                this.addRandomTileOnBoard(JellyValue);
                this.addRandomDirtyOnBoard();
                this.saveGame();
            };
            GamePlayScreen.prototype.addRandomDirtyOnBoard = function () {
                var _this = this;
                if (this.getDirtyProbabilityByLevel(this.level, this.initialDirtyProbability, this.finalDirtyProbability, this.easeDirtyProbability) > Math.random())
                    setTimeout(function () {
                        _this.addRandomTileOnBoard(-1);
                    }, 500);
            };
            GamePlayScreen.prototype.addRandomTileOnBoard = function (value) {
                var empty = this.board.getEmptyTiles();
                if (empty.length > 0) {
                    var i = Math.floor(Math.random() * empty.length);
                    var tile = empty[i];
                    tile.setNumber(value);
                }
            };
            GamePlayScreen.prototype.cleanAllDirty = function () {
                var tiles = this.board.getAllTiles();
                for (var t in tiles) {
                    if (tiles[t].getNumber() < 0)
                        tiles[t].setNumber(0);
                }
            };
            GamePlayScreen.prototype.getDirtyProbabilityByLevel = function (level, initialDirtyProbability, finalDirtyProbability, easeDirtyProbability) {
                return initialDirtyProbability * Math.pow(easeDirtyProbability, level) + finalDirtyProbability * (1 - Math.pow(easeDirtyProbability, level));
            };
            GamePlayScreen.prototype.dragged = function (origin, target) {
                this.match(origin, target);
            };
            GamePlayScreen.prototype.canMatch = function (origin, target) {
                return (origin.getNumber() != 0 && target != origin && target.getNumber() == origin.getNumber() && target.isUnlocked());
            };
            GamePlayScreen.prototype.canMove = function () {
                var tiles = this.board.getAllTiles();
                var tilesCount = this.board.getEmptyTiles().length;
                var numberCount = {};
                for (var t in tiles) {
                    var n = tiles[t].getNumber();
                    if (n > 0 && !numberCount[n])
                        numberCount[n] = 0;
                    numberCount[n]++;
                }
                for (var c in numberCount)
                    if (numberCount[c] > 1)
                        return true;
                return false;
            };
            GamePlayScreen.prototype.match = function (origin, target) {
                var newValue = target.getNumber() + origin.getNumber();
                if (!this.canMatch(origin, target))
                    return false;
                this.matches++;
                this.board.match(origin, target);
                var sum = newValue * 10 + Math.floor(Math.random() * newValue * 10);
                this.score += sum;
                this.animateScoreFromTile(target, sum);
                origin.setNumber(0);
                var item = this.giveItemChance([joinjelly.Items.CLEAN, joinjelly.Items.REVIVE, joinjelly.Items.TIME, joinjelly.Items.FAST]);
                if (item)
                    this.animateItemFromTile(target, item);
                if (this.userData)
                    this.userData.setLastJelly(newValue);
                this.updateInterfaceInfos();
                if (this.matchNotify)
                    this.matchNotify();
                this.highJellySave(newValue);
                if (newValue > joinjelly.JoinJelly.maxJelly)
                    this.winGame();
                else
                    target.setNumber(newValue);
                this.updateCurrentLevel();
                this.saveGame();
                if (!this.canMove())
                    this.step(0);
                this.cleanNearDirty(target);
                return true;
            };
            GamePlayScreen.prototype.cleanNearDirty = function (target) {
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
            };
            GamePlayScreen.prototype.highJellySave = function (newValue) {
                if (this.highJelly < newValue) {
                    joinjelly.JoinJelly.analytics.logNewJelly(newValue, this.level, Date.now() - this.time);
                    try {
                        joinjelly.JoinJelly.gameServices.submitJellyAchievent(newValue);
                    }
                    catch (e) {
                        console.log(e);
                    }
                    this.highJelly = newValue;
                }
            };
            GamePlayScreen.prototype.giveItemChance = function (items) {
                var item = null;
                var lucky = joinjelly.JoinJelly.itemData.getItemAmmount(joinjelly.Items.LUCKY) ? 2 : 1;
                var goodChance = (Math.random() < this.itemProbability * lucky);
                if (goodChance) {
                    item = items[Math.floor(Math.random() * items.length)];
                    joinjelly.JoinJelly.itemData.increaseItemAmmount(item);
                }
                return item;
            };
            GamePlayScreen.prototype.animateItemFromTile = function (tile, item) {
                var _this = this;
                gameui.AudiosManager.playSound("Interface Sound-11");
                var itemDO = gameui.AssetsManager.getBitmap("item" + item);
                itemDO.mouseEnabled = false;
                itemDO.regX = itemDO.getBounds().width / 2;
                itemDO.regY = itemDO.getBounds().height / 2;
                itemDO.scaleY = itemDO.scaleX = 0.5;
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
                itemDO.alpha = 0;
                createjs.Tween.get(itemDO).to({ x: xi, y: yi, alpha: 0 }).to({ y: tile.y - 70, alpha: 1 }, 400, createjs.Ease.quadInOut).to({ x: xf, y: yf }, 1000, createjs.Ease.quadInOut).call(function () {
                    _this.content.removeChild(itemDO);
                    _this.updateFooter();
                });
                this.content.addChild(itemDO);
            };
            GamePlayScreen.prototype.animateScoreFromTile = function (tile, score) {
                var _this = this;
                var textDO = gameui.AssetsManager.getBitmapText(score.toString(), "debussy");
                textDO.regX = textDO.getBounds().width / 2;
                textDO.mouseEnabled = false;
                var xi = this.board.localToLocal(tile.x, tile.y, this.content).x;
                var yi = this.board.localToLocal(tile.x, tile.y, this.content).y;
                textDO.alpha = 0;
                createjs.Tween.get(textDO).to({ x: xi, y: yi, alpha: 0 }).to({ y: yi - 170, alpha: 1 }, 400, createjs.Ease.quadOut).to({ alpha: 0 }, 400).call(function () {
                    _this.content.removeChild(textDO);
                    delete textDO;
                });
                this.content.addChild(textDO);
            };
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
                        case joinjelly.Items.EVOLVE:
                            sucess = this.useEvolve();
                            break;
                    }
                    if (sucess) {
                        joinjelly.JoinJelly.itemData.decreaseItemAmmount(item);
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
            GamePlayScreen.prototype.useTime = function () {
                var _this = this;
                if (this.gamestate == 3 /* ended */)
                    return;
                this.step(4000);
                this.gameFooter.lockItem(joinjelly.Items.TIME);
                this.freezeEffect.alpha = 0;
                this.freezeEffect.visible = true;
                createjs.Tween.removeTweens(this.freezeEffect);
                createjs.Tween.get(this.freezeEffect).to({ alpha: 1 }, 1000).to({ alpha: 0 }, 4000).call(function () {
                    _this.freezeEffect.visible = false;
                    _this.gameFooter.unlockItem(joinjelly.Items.TIME);
                });
                gameui.AudiosManager.playSound("sounditemtime");
                return true;
            };
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
            GamePlayScreen.prototype.useRevive = function (test) {
                var _this = this;
                if (test === void 0) { test = false; }
                if (this.gamestate != 3 /* ended */)
                    return false;
                UserData.getHistoryRevive();
                this.saveGame();
                this.gamestate = 1 /* playing */;
                this.board.unlock();
                this.finishMenu.hide();
                this.step(4000);
                this.updateInterfaceInfos();
                this.board.setAlarm(true);
                this.showBoardButton.fadeOut();
                this.gameFooter.setItems([joinjelly.Items.TIME, joinjelly.Items.CLEAN, joinjelly.Items.FAST]);
                this.gameFooter.unlockAll();
                this.gameFooter.lockItem(joinjelly.Items.REVIVE);
                this.gameHeader.mouseEnabled = true;
                createjs.Tween.get(this.gameHeader).to({ y: -0 }, 200, createjs.Ease.quadIn);
                if (!test) {
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
            GamePlayScreen.prototype.useEvolve = function () {
                var _this = this;
                if (this.gamestate == 3 /* ended */)
                    return;
                var tiles = this.board.getAllTiles();
                var maxTile = 0;
                for (var t in tiles)
                    if (tiles[t].getNumber() > maxTile)
                        maxTile = tiles[t].getNumber();
                var selectedTiles = new Array();
                for (var t in tiles)
                    if ((tiles[t].getNumber() < maxTile && tiles[t].getNumber() > 2) && tiles[t].isUnlocked())
                        selectedTiles.push(tiles[t]);
                if (selectedTiles.length == 0)
                    for (var t in tiles)
                        if ((tiles[t].getNumber() < maxTile && tiles[t].getNumber() > 1) && tiles[t].isUnlocked())
                            selectedTiles.push(tiles[t]);
                if (selectedTiles.length == 0)
                    for (var t in tiles)
                        if (tiles[t].getNumber() > 1 && tiles[t].isUnlocked())
                            selectedTiles.push(tiles[t]);
                if (selectedTiles.length == 0)
                    for (var t in tiles)
                        if (tiles[t].getNumber() > 0 && tiles[t].isUnlocked())
                            selectedTiles.push(tiles[t]);
                if (selectedTiles.length == 0)
                    return false;
                var selected = Math.floor(Math.random() * selectedTiles.length);
                var tile = selectedTiles[selected];
                var newValue = tile.getNumber() * 2;
                tile.lock();
                tile.setNumber(newValue);
                this.highJellySave(newValue);
                tile.jelly.playThunder();
                setTimeout(function () {
                    tile.unlock();
                    gameui.AudiosManager.playSound("evolve");
                }, 1000);
                gameui.AudiosManager.playSound("sounditemfast");
                var pt = tile.jelly.localToLocal(0, 0, this.evolveEffect.parent);
                var po = this.gameHeader.localToLocal(1394, 211, this.evolveEffect.parent);
                this.evolveEffect.visible = true;
                this.evolveEffect.set({ alpha: 1, scaleX: 0.5, x: po.x, y: po.y });
                var angleDeg = Math.atan2(pt.y - po.y - 50, pt.x - po.x) * 180 / Math.PI - 90;
                var scale = Math.sqrt(Math.pow(pt.y - 50 - po.y, 2) + Math.pow(pt.x - po.x, 2)) / 300;
                this.evolveEffect.rotation = angleDeg;
                this.evolveEffect.scaleY = 0;
                createjs.Tween.removeTweens(this.evolveEffect);
                createjs.Tween.get(this.evolveEffect).to({ scaleY: scale }, 200);
                createjs.Tween.get(this.evolveEffect).to({ alpha: 0 }, 1200, createjs.Ease.quadIn).call(function () {
                    _this.evolveEffect.visible = false;
                });
                return true;
            };
            GamePlayScreen.prototype.useFast = function (test) {
                if (test === void 0) { test = false; }
                if (this.gamestate == 3 /* ended */)
                    return;
                var tiles = this.board.getAllTiles();
                var matches = [];
                for (var t in tiles) {
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
                return true;
            };
            GamePlayScreen.prototype.matchJelly = function (origin, target) {
                var _this = this;
                target.lock();
                origin.lock();
                this.board.fadeTileToPos(origin, target.x, target.y, 400, 200 * Math.random(), 1);
                setTimeout(function () {
                    target.unlock();
                    origin.unlock();
                    _this.match(origin, target);
                }, 300);
            };
            GamePlayScreen.prototype.updateFooter = function () {
                var items = joinjelly.ItemsData.items;
                for (var i in items)
                    this.gameFooter.setItemAmmount(items[i], joinjelly.JoinJelly.itemData.getItemAmmount(items[i]));
            };
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
                if (!this.userData)
                    return;
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
                if (this.verifyGameLoose())
                    this.endGame();
                else
                    this.continueGame();
            };
            GamePlayScreen.prototype.selfPeformanceTest = function (fast) {
                var _this = this;
                if (fast)
                    this.initialInterval = 200;
                var interval = setInterval(function () {
                    if (_this.gamestate == 2 /* paused */)
                        return;
                    _this.useRevive();
                    _this.useFast(true);
                    if (_this.gamestate == 5 /* win */) {
                        clearInterval(interval);
                        joinjelly.JoinJelly.startTest();
                    }
                }, 250);
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
            GameState[GameState["win"] = 5] = "win";
        })(GameState || (GameState = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var Tutorial = (function (_super) {
            __extends(Tutorial, _super);
            function Tutorial() {
                _super.call(this, null);
                this.currentTutorialStep = 0;
            }
            Tutorial.prototype.createGUI = function () {
                var _this = this;
                _super.prototype.createGUI.call(this);
                this.tutorialJellyFinger = new gameplay.view.TutorialMove();
                this.tutorialItemFinger = new gameplay.view.TutorialMove();
                this.gameMessage.addEventListener("closed", function () {
                    if (_this.messageNotify)
                        _this.messageNotify();
                });
                this.tutorialItemFinger.rotation = -45;
                this.content.addChild(this.tutorialJellyFinger);
                this.footer.addChild(this.tutorialItemFinger);
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
                        _this.board.getTileById(19).setNumber(1);
                        _this.board.getTileById(19).disable();
                    },
                    function () {
                        _this.board.getTileById(17).setNumber(-1);
                        _this.board.getTileById(20).setNumber(-1);
                        _this.board.getTileById(22).setNumber(-1);
                        _this.board.getTileById(15).setNumber(-1);
                        _this.showTutorialMessage(StringResources.tutorial.msgDirt);
                        _this.waitMessage();
                    },
                    function () {
                        _this.board.getTileById(16).disable();
                        _this.board.getTileById(19).enable();
                        _this.showTutorialMove(19, 16);
                        _this.waitMatch();
                    },
                    function () {
                        _this.board.getTileById(18).disable();
                        _this.hideTutorialFinger();
                        _this.tutorialWait(700);
                    },
                    function () {
                        _this.board.getTileById(16).disable();
                        _this.showTutorialMessage(StringResources.tutorial.msgOnceMore);
                        _this.waitMessage();
                    },
                    function () {
                        _this.board.getTileById(16).disable();
                        _this.board.getTileById(24).setNumber(2);
                        _this.board.getTileById(16).disable();
                        _this.showTutorialMove(24, 16);
                        _this.waitMatch();
                    },
                    function () {
                        _this.hideTutorialFinger();
                        _this.tutorialWait(700);
                        _this.board.getTileById(16).disable();
                    },
                    function () {
                        _this.board.getTileById(16).disable();
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
                        _this.hideTutorialFinger();
                        _this.board.getTileById(0).setNumber(2);
                        _this.board.getTileById(1).setNumber(-1);
                        _this.board.getTileById(2).setNumber(2);
                        _this.board.getTileById(3).setNumber(-1);
                        _this.board.getTileById(4).setNumber(2);
                        _this.board.getTileById(5).setNumber(-1);
                        _this.board.getTileById(6).setNumber(-1);
                        _this.board.getTileById(7).setNumber(-1);
                        _this.board.getTileById(10).setNumber(-1);
                        _this.board.getTileById(12).setNumber(-1);
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
                        _this.gameFooter.showMessage(joinjelly.Items.CLEAN, StringResources.tutorial.msgItemClean);
                        _this.waitItem();
                    },
                    function () {
                        _this.gameFooter.hideMessage();
                        _this.hideTutorialFinger();
                        _this.gameFooter.setItemAmmount(joinjelly.Items.CLEAN, 0);
                        _this.tutorialWait(1000);
                    },
                    function () {
                        _this.showTutorialItem(joinjelly.Items.TIME);
                        _this.gameFooter.highlight(joinjelly.Items.TIME);
                        _this.gameFooter.showMessage(joinjelly.Items.TIME, StringResources.tutorial.msgItemTime);
                        _this.waitItem();
                    },
                    function () {
                        _this.gameFooter.hideMessage();
                        _this.hideTutorialFinger();
                        _this.gameFooter.setItemAmmount(joinjelly.Items.TIME, 0);
                        _this.tutorialWait(1000);
                    },
                    function () {
                        _this.showTutorialItem(joinjelly.Items.FAST);
                        _this.gameFooter.highlight(joinjelly.Items.FAST);
                        _this.gameFooter.showMessage(joinjelly.Items.FAST, StringResources.tutorial.msgItemFast);
                        _this.waitItem();
                    },
                    function () {
                        _this.gameFooter.lockAll();
                        _this.gameFooter.hideMessage();
                        _this.hideTutorialFinger();
                        _this.gameFooter.setItemAmmount(joinjelly.Items.FAST, 0);
                        _this.tutorialWait(1000);
                    },
                    function () {
                        joinjelly.JoinJelly.userData.history(histories.TUTORIAL);
                        joinjelly.JoinJelly.startLevel();
                    }
                ];
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
                this.gameMessage.show(text);
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
                    joinjelly.JoinJelly.itemData.decreaseItemAmmount(item);
                    if (this.itemNotify)
                        this.itemNotify();
                }
            };
            Tutorial.prototype.updateFooter = function () {
            };
            Tutorial.prototype.saveGame = function () {
            };
            return Tutorial;
        })(gameplay.GamePlayScreen);
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
    UserData.prototype.setPlayerName = function (userName) {
        UserData.saveValue("username", userName);
    };
    UserData.prototype.getPlayerName = function () {
        var un = UserData.loadValue("username");
        if (!un)
            un = "";
        return un;
    };
    UserData.prototype.promptPlayerName = function (callback) {
        var _this = this;
        Cocoon.Dialog.prompt({
            title: StringResources.menus.playerName,
            message: StringResources.menus.playerNameDesc,
            text: this.getPlayerName(),
            type: "text",
        }, {
            success: function (text) {
                _this.setPlayerName(text);
                callback();
            },
            cancel: function () {
                callback();
            }
        });
    };
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
    UserData.prototype.saveItems = function (items) {
        return UserData.saveValue("items", items);
    };
    UserData.prototype.loadItems = function () {
        return UserData.loadValue("items", {});
    };
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
    UserData.prototype.history = function (value) {
        var hist = UserData.loadValue("history", {});
        hist[value] = true;
        UserData.saveValue("history", hist);
    };
    UserData.prototype.getHistory = function (value) {
        var hist = UserData.loadValue("history", {});
        return hist[value];
    };
    UserData.getHistoryRevive = function () {
        return this.loadValue("revive");
    };
    UserData.prototype.resetAll = function () {
        localStorage.clear();
    };
    UserData.prefix = "FastPair_";
    return UserData;
})();
var histories = (function () {
    function histories() {
    }
    histories.TUTORIAL = "tutorial_intro";
    histories.REVIVE = "revive";
    histories.EVOLVE = "evolve";
    histories.FIRSTPLAY = "firstplay";
    return histories;
})();
var testMode;
var joinjelly;
(function (joinjelly) {
    var JoinJelly = (function () {
        function JoinJelly() {
        }
        JoinJelly.init = function () {
            var _this = this;
            this.userData = new UserData();
            this.analytics = new Analytics();
            this.itemData = new joinjelly.ItemsData();
            this.gameServices = new joinjelly.GameServices();
            joinjelly.AzureLeaderBoards.init();
            var lang = (window.navigator.userLanguage || window.navigator.language).substr(0, 2).toLowerCase();
            switch (lang) {
                case "pt":
                    StringResources = StringResources_pt;
                    break;
            }
            var fps = 60;
            if (window.location.search == "?test") {
                fps = 10;
                testMode = true;
            }
            this.gameScreen = new gameui.GameScreen("gameCanvas", defaultWidth, defaultHeight, fps);
            Cocoon.App.exitCallback(function () {
                return _this.gameScreen.sendBackButtonEvent();
            });
            var loadingScreen = new joinjelly.menus.Loading();
            this.gameScreen.switchScreen(loadingScreen);
            loadingScreen.loaded = function () {
                if (window.location.search == "?test") {
                    _this.startTest();
                }
                else {
                    var loadedGame = _this.userData.loadGame();
                    if (loadedGame)
                        joinjelly.JoinJelly.startLevel();
                    else
                        JoinJelly.showMainMenu();
                }
            };
        };
        JoinJelly.startTest = function () {
            var gs = new joinjelly.gameplay.GamePlayScreen(this.userData);
            this.gameScreen.switchScreen(gs);
            gs.selfPeformanceTest(false);
        };
        JoinJelly.showMainMenu = function () {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.gameplay.GamePlayScreen)
                transition = { type: "top", time: 500 };
            if (this.gameScreen.currentScreen instanceof joinjelly.Jellypedia)
                transition = { type: "right", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.MainScreen(this.userData), null, transition);
        };
        JoinJelly.startLevel = function () {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "bottom", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.gameplay.GamePlayScreen(this.userData), null, transition);
        };
        JoinJelly.startLevelDirectaly = function () {
            this.gameScreen.switchScreen(new joinjelly.gameplay.GamePlayScreen(this.userData));
        };
        JoinJelly.startTutorial = function () {
            this.gameScreen.switchScreen(new joinjelly.gameplay.Tutorial());
        };
        JoinJelly.showStore = function (previousScreen) {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "right", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.menus.StoreMenu(previousScreen), null, transition);
        };
        JoinJelly.showIntro = function () {
            this.gameScreen.switchScreen(new joinjelly.StoryScreen());
        };
        JoinJelly.showLeaderboards = function () {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "right", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.menus.LeaderBoards(), null, transition);
        };
        JoinJelly.showPedia = function () {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "left", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.Jellypedia(this.userData, StringResources.jellies), null, transition);
        };
        JoinJelly.showSettings = function () {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "left", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.menus.MainMenu(), null, transition);
        };
        JoinJelly.showAbout = function () {
            this.gameScreen.switchScreen(new joinjelly.About());
        };
        JoinJelly.maxJelly = 65536;
        return JoinJelly;
    })();
    joinjelly.JoinJelly = JoinJelly;
})(joinjelly || (joinjelly = {}));
window.onload = function () {
    joinjelly.JoinJelly.init();
};
var defaultWidth = 768 * 2;
var defaultHeight = 1024 * 2;
var fbAppId = "1416523228649363";
var gameWebsite = "www.joinjelly.com";
var gameWebsiteIcon = "www.joinjelly.com/icon.png";
var contantsAndroid = {
    ACH_JELLY_1: 'CgkI49ztp64KEAIQBA',
    ACH_JELLY_2: 'CgkI49ztp64KEAIQBQ',
    ACH_JELLY_3: 'CgkI49ztp64KEAIQBg',
    ACH_JELLY_4: 'CgkI49ztp64KEAIQBA',
    ACH_JELLY_5: 'CgkI49ztp64KEAIQBQ',
    ACH_JELLY_6: 'CgkI49ztp64KEAIQBg',
    ACH_JELLY_7: 'CgkI49ztp64KEAIQBw',
    ACH_JELLY_8: 'CgkI49ztp64KEAIQCA',
    ACH_JELLY_9: 'CgkI49ztp64KEAIQCQ',
    ACH_JELLY_10: 'CgkI49ztp64KEAIQCg',
    ACH_JELLY_11: 'CgkI49ztp64KEAIQCw',
    ACH_JELLY_12: 'CgkI49ztp64KEAIQDA',
    ACH_JELLY_13: 'CgkI49ztp64KEAIQDQ',
    ACH_JELLY_14: 'CgkI49ztp64KEAIQDg',
    ACH_JELLY_15: 'CgkI49ztp64KEAIQDw',
    ACH_JELLY_16: 'CgkI49ztp64KEAIQEA',
    ACH_JELLY_17: 'CgkI49ztp64KEAIQEQ',
    CLIENT_ID: '356029001315-1uh0g6avko4g7aqfsj2kpt3srs6ssiqd.apps.googleusercontent.com',
    LEAD_LEADERBOARD: 'CgkI49ztp64KEAIQAg',
};
var constantsiOS = {
    ACH_JELLY_1: 'jelly01',
    ACH_JELLY_2: 'jelly02',
    ACH_JELLY_3: 'jelly03',
    ACH_JELLY_4: 'jelly04',
    ACH_JELLY_5: 'jelly05',
    ACH_JELLY_6: 'jelly06',
    ACH_JELLY_7: 'jelly07',
    ACH_JELLY_8: 'jelly08',
    ACH_JELLY_9: 'jelly09',
    ACH_JELLY_10: 'jelly10',
    ACH_JELLY_11: 'jelly11',
    ACH_JELLY_12: 'jelly12',
    ACH_JELLY_13: 'jelly13',
    ACH_JELLY_14: 'jelly14',
    ACH_JELLY_15: 'jelly15',
    ACH_JELLY_16: 'jelly16',
    ACH_JELLY_17: 'jelly17',
    LEAD_LEADERBOARD: 'leaderboards',
};
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var view;
        (function (view) {
            var CountDown = (function (_super) {
                __extends(CountDown, _super);
                function CountDown() {
                    _super.apply(this, arguments);
                }
                CountDown.prototype.countDown = function (total) {
                    var _this = this;
                    if (total === void 0) { total = 3; }
                    var ns = [];
                    var time = 1000;
                    var transition = 200;
                    setTimeout(function () {
                        gameui.AudiosManager.playSound("Interface Sound-12");
                    }, time * total + transition);
                    for (var n = total; n > 0; n--) {
                        ns[n] = gameui.AssetsManager.getBitmap("n" + n);
                        this.addChild(ns[n]);
                        ns[n].regX = ns[n].getBounds().width / 2;
                        ns[n].regY = ns[n].getBounds().height / 2;
                        ns[n].mouseEnabled = false;
                        createjs.Tween.get(ns[n]).to({ scaleX: 2, scaleY: 2, alpha: 0 }).wait((total - n) * time).to({ scaleX: 1, scaleY: 1, alpha: 1 }, transition, createjs.Ease.quadOut).call(function () {
                            gameui.AudiosManager.playSound("Interface Sound-13");
                        }).wait(time - transition).to({ alpha: 0, scaleX: 0.5, scaleY: 0.5 }, transition, createjs.Ease.quadIn).call(function (obj) {
                            _this.removeChild(obj);
                        });
                    }
                };
                return CountDown;
            })(createjs.Container);
            view.CountDown = CountDown;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var view;
        (function (view) {
            var ItemsFooter = (function (_super) {
                __extends(ItemsFooter, _super);
                function ItemsFooter(items) {
                    _super.call(this);
                    this.itemSize = 270;
                    this.itemsButtons = [];
                    this.addObjects();
                    this.setItems(items);
                }
                ItemsFooter.prototype.setItems = function (items) {
                    var itemSize = this.itemSize;
                    if (items.length >= 5)
                        itemSize = 200;
                    this.cleanButtons();
                    if (!items)
                        return;
                    for (var i in items)
                        this.addItem(items[i], i);
                    for (var i in items) {
                        this.itemsButtons[items[i]].y = -150;
                        this.itemsButtons[items[i]].x = (defaultWidth - (items.length - 1) * itemSize) / 2 + i * itemSize;
                    }
                };
                ItemsFooter.prototype.cleanButtons = function () {
                    for (var i in this.itemsButtons)
                        this.removeChild(this.itemsButtons[i]);
                    this.itemsButtons = [];
                };
                ItemsFooter.prototype.addObjects = function () {
                    var bg = gameui.AssetsManager.getBitmap("footer");
                    this.addChild(bg);
                    bg.y = -162;
                    bg.x = (defaultWidth - 1161) / 2;
                    var lucky = gameui.AssetsManager.getBitmap("lucky");
                    this.addChild(lucky);
                    lucky.y = -210;
                    lucky.x = (defaultWidth - 250);
                    lucky.scaleX = lucky.scaleY = 0.5;
                    this.lucky = lucky;
                    this.gameMessage = new view.TutoralMessage();
                    this.addChild(this.gameMessage);
                };
                ItemsFooter.prototype.addItem = function (item, pos) {
                    var _this = this;
                    var bt = new view.ItemButton(item);
                    this.addChild(bt);
                    this.itemsButtons[item] = bt;
                    bt.addEventListener("click", function () {
                        _this.dispatchEvent({ type: "useitem", item: item });
                    });
                };
                ItemsFooter.prototype.getItemButton = function (item) {
                    return this.itemsButtons[item];
                };
                ItemsFooter.prototype.setItemAmmount = function (item, ammount) {
                    if (this.itemsButtons[item])
                        this.itemsButtons[item].setAmmount(ammount);
                    if (item == "lucky")
                        this.lucky.visible = (ammount > 0);
                };
                ItemsFooter.prototype.showMessage = function (itemId, message) {
                    this.gameMessage.x = this.getItemButton(itemId).x;
                    this.gameMessage.y = this.getItemButton(itemId).y - 120;
                    this.gameMessage.show(message);
                };
                ItemsFooter.prototype.hideMessage = function () {
                    this.gameMessage.fadeOut();
                };
                ItemsFooter.prototype.bounceItem = function (item) {
                    this.getItemButton(item).highLight(false);
                };
                ItemsFooter.prototype.highlight = function (item) {
                    this.unHighlightAll();
                    this.getItemButton(item).highLight();
                };
                ItemsFooter.prototype.unHighlightAll = function () {
                    for (var i in this.itemsButtons)
                        this.itemsButtons[i].unHighlight();
                };
                ItemsFooter.prototype.lockItem = function (itemId) {
                    var b = this.getItemButton(itemId);
                    if (b)
                        b.lock();
                };
                ItemsFooter.prototype.unlockItem = function (itemId) {
                    var b = this.getItemButton(itemId);
                    b.unlock();
                };
                ItemsFooter.prototype.lockAll = function () {
                    for (var b in this.itemsButtons)
                        this.itemsButtons[b].lock();
                };
                ItemsFooter.prototype.unlockAll = function () {
                    for (var b in this.itemsButtons)
                        this.itemsButtons[b].unlock();
                };
                return ItemsFooter;
            })(createjs.Container);
            view.ItemsFooter = ItemsFooter;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var GameServices = (function () {
        function GameServices() {
            var _this = this;
            var os = "web";
            if (Cocoon.Device.getDeviceInfo())
                os = Cocoon.Device.getDeviceInfo().os;
            if (os == "windows" || os == "web")
                return;
            if (os == "ios") {
                this.socialService = Cocoon.Social.GameCenter.getSocialInterface();
                this.socialService.setAchievementsMap(constantsiOS);
            }
            else if (os == "android") {
                var gp = Cocoon.Social.GooglePlayGames;
                gp.init({ defaultLeaderboard: contantsAndroid.LEAD_LEADERBOARD });
                this.socialService = gp.getSocialInterface();
                this.socialService.setAchievementsMap(contantsAndroid);
            }
            else if (os == "web") {
                var gp = Cocoon.Social.GooglePlayGames;
                gp.init({
                    clientId: contantsAndroid.CLIENT_ID,
                    defaultLeaderboard: contantsAndroid.LEAD_LEADERBOARD
                });
                this.socialService = gp.getSocialInterface();
                this.socialService.setAchievementsMap(contantsAndroid);
                this.socialService.setTemplates("scripts/templates/leaderboards.html", "scripts/templates/achievements.html");
            }
            setTimeout(function () {
                if (!_this.socialService.isLoggedIn()) {
                    _this.socialService.login(function (loggedIn, error) {
                        if (error)
                            console.error("login error: " + error.message + " " + error.code);
                        else if (!loggedIn)
                            console.log("login cancelled");
                    });
                }
            }, 10000);
        }
        GameServices.prototype.showLeaderboard = function () {
            if (!this.socialService)
                return;
            this.socialService.showLeaderboard();
        };
        GameServices.prototype.showAchievements = function () {
            if (!this.socialService)
                return;
            this.socialService.showAchievements();
        };
        GameServices.prototype.submitScore = function (score) {
            if (!this.socialService)
                return;
            this.socialService.submitScore(score, function (error) {
                if (error)
                    console.error("score error: " + error.message);
                else
                    console.log("submited score: " + score);
            });
        };
        GameServices.prototype.submitJellyAchievent = function (jellyValue) {
            if (!this.socialService)
                return;
            var jellyNumber = Math.floor(Math.log(jellyValue) / Math.log(2)) + 1;
            this.socialService.submitAchievement("ACH_JELLY_" + jellyNumber, function (error) {
                if (error)
                    console.error("submitAchievement error: " + error.message);
                else
                    console.log("submited Achievement: jelly " + jellyNumber);
            });
        };
        return GameServices;
    })();
    joinjelly.GameServices = GameServices;
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var AzureLeaderBoards = (function () {
        function AzureLeaderBoards() {
        }
        AzureLeaderBoards.init = function () {
            this.deviceId = localStorage.getItem("deviceId");
            if (typeof WindowsAzure == 'undefined')
                return;
            this.client = new WindowsAzure.MobileServiceClient(this.host, this.key);
            this.table = this.client.getTable("LeaderBoards");
        };
        AzureLeaderBoards.getScoreNames = function (callback, count) {
            if (!this.table)
                return;
            this.table.orderByDescending("score").take(50).where({ gameid: this.gameId }).read().then(function (queryResults) {
                callback(queryResults);
            }, function (queryResults) {
                callback(null);
            });
        };
        AzureLeaderBoards.setScore = function (score, name, newId) {
            var _this = this;
            if (newId === void 0) { newId = false; }
            if (!this.table)
                return;
            if (this.deviceId && !newId) {
                this.table.update({ name: name, score: score, id: this.deviceId, gameid: this.gameId });
            }
            else {
                this.table.insert({ name: name, score: score, gameid: this.gameId }).then(function (result) {
                    if (result.id) {
                        _this.deviceId = result.id;
                        localStorage.setItem("deviceId", _this.deviceId);
                    }
                });
            }
        };
        AzureLeaderBoards.host = "https://dialeaderboards.azure-mobile.net";
        AzureLeaderBoards.key = "GyalJGfVBZeaGMTMGxKuytNMXjjoqC94";
        AzureLeaderBoards.gameId = "joinjelly";
        return AzureLeaderBoards;
    })();
    joinjelly.AzureLeaderBoards = AzureLeaderBoards;
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var LeaderBoards = (function (_super) {
            __extends(LeaderBoards, _super);
            function LeaderBoards() {
                var _this = this;
                _super.call(this, StringResources.menus.leaderboards);
                this.maxScroll = 1700;
                var loading = new joinjelly.view.LoadingBall();
                this.scrollableContent.addChild(loading);
                loading.x = defaultWidth / 2;
                loading.y = 800;
                var message = gameui.AssetsManager.getBitmapText(StringResources.menus.loading, "debussy");
                this.scrollableContent.addChild(message);
                message.regX = message.getBounds().width / 2;
                message.x = defaultWidth / 2;
                message.y = 900;
                message.visible = true;
                this.loadLeaderBoards(function (results) {
                    loading.visible = false;
                    if (results != null) {
                        _this.fillLeaderBoards(results);
                        message.visible = false;
                    }
                    else {
                        message.text = StringResources.menus.error;
                        message.visible = true;
                        message.regX = message.getBounds().width / 2;
                    }
                });
            }
            LeaderBoards.prototype.fillLeaderBoards = function (results) {
                var space = 200;
                var start = 400;
                for (var r in results) {
                    var i = new menus.view.LeaderBoardItem(results[r].score, results[r].name, parseInt(r) + 1);
                    i.x = defaultWidth / 2;
                    i.y = start + space * r;
                    this.scrollableContent.addChild(i);
                }
                this.maxScroll = start + results.length * space;
            };
            LeaderBoards.prototype.loadLeaderBoards = function (callback) {
                joinjelly.AzureLeaderBoards.getScoreNames(callback, 20);
            };
            return LeaderBoards;
        })(joinjelly.ScrollablePage);
        menus.LeaderBoards = LeaderBoards;
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var StoryScreen = (function (_super) {
        __extends(StoryScreen, _super);
        function StoryScreen() {
            _super.call(this);
            var intro = new lib.Intro3();
            this.content.addChild(intro);
            intro.play();
            intro.loop = false;
            intro.addEventListener("click", function () {
                intro.stop();
                joinjelly.JoinJelly.startTutorial();
            });
            intro.addEventListener("complete", function () {
                intro.stop();
                joinjelly.JoinJelly.startTutorial();
            });
        }
        return StoryScreen;
    })(gameui.ScreenState);
    joinjelly.StoryScreen = StoryScreen;
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var view;
        (function (view) {
            var LeaderBoardItem = (function (_super) {
                __extends(LeaderBoardItem, _super);
                function LeaderBoardItem(score, name, position) {
                    if (position === void 0) { position = 1; }
                    _super.call(this);
                    this.regX = 1056 / 2;
                    var bg = gameui.AssetsManager.getBitmap("FlyGroup");
                    bg.scaleY = 0.65;
                    this.addChild(bg);
                    var tContainer = new createjs.Container();
                    var titleObj = gameui.AssetsManager.getBitmapText(name, "debussy");
                    var positionObj = gameui.AssetsManager.getBitmapText(position.toString(), "debussy");
                    var scoreObj = gameui.AssetsManager.getBitmapText(score.toString(), "debussy");
                    scoreObj.regX = scoreObj.getBounds().width;
                    positionObj.y = 30;
                    titleObj.y = 30;
                    scoreObj.y = 30;
                    positionObj.x = 30;
                    titleObj.x = 150;
                    scoreObj.x = 1000;
                    tContainer.addChild(titleObj);
                    tContainer.addChild(scoreObj);
                    tContainer.addChild(positionObj);
                    this.addChild(tContainer);
                }
                return LeaderBoardItem;
            })(createjs.Container);
            view.LeaderBoardItem = LeaderBoardItem;
        })(view = menus.view || (menus.view = {}));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var view;
        (function (view) {
            var LoadingBar = (function (_super) {
                __extends(LoadingBar, _super);
                function LoadingBar(path) {
                    _super.call(this);
                    var bg = gameui.AssetsManager.getBitmap(path + "bonus_border.png");
                    var text = gameui.AssetsManager.getBitmapText(StringResources.menus.loading, "debussy");
                    var bar = gameui.AssetsManager.getBitmap(path + "bonus_bar.png");
                    this.addChild(bg);
                    this.addChild(text);
                    this.addChild(bar);
                    text.regX = text.getBounds().width / 2;
                    bar.x = -939 / 2 - 40;
                    bg.regX = 1131 / 2;
                    text.y = -100;
                    bar.y = 85;
                    this.barMask = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0, bar.y, 939, 57));
                    this.barMask.x = bar.x;
                    bar.mask = this.barMask;
                }
                LoadingBar.prototype.update = function (value) {
                    this.barMask.scaleX = value;
                };
                return LoadingBar;
            })(createjs.Container);
            view.LoadingBar = LoadingBar;
        })(view = menus.view || (menus.view = {}));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var view;
        (function (view) {
            var PlayerNameOptions = (function (_super) {
                __extends(PlayerNameOptions, _super);
                function PlayerNameOptions() {
                    _super.call(this);
                    this.addObjects();
                }
                PlayerNameOptions.prototype.addObjects = function () {
                    var _this = this;
                    var bg = gameui.AssetsManager.getBitmap("FlyGroup");
                    bg.y = -130;
                    bg.regX = bg.getBounds().width / 2;
                    this.addChild(bg);
                    var title = gameui.AssetsManager.getBitmapText(StringResources.menus.playerName, "debussy");
                    title.y = -190;
                    title.scaleX = title.scaleY = 1.1;
                    title.regX = title.getBounds().width / 2;
                    this.addChild(title);
                    var playerName = gameui.AssetsManager.getBitmapText(joinjelly.JoinJelly.userData.getPlayerName(), "debussy");
                    this.addChild(playerName);
                    this.playerName = playerName;
                    playerName.x = -450;
                    playerName.y = -60;
                    var playerNameEdit = new gameui.ImageButton("BtSettings", function () {
                        joinjelly.JoinJelly.userData.promptPlayerName(function () {
                            _this.playerName.text = joinjelly.JoinJelly.userData.getPlayerName();
                            ;
                        });
                    });
                    this.addChild(playerNameEdit);
                    playerNameEdit.x = 400;
                };
                return PlayerNameOptions;
            })(createjs.Container);
            view.PlayerNameOptions = PlayerNameOptions;
        })(view = menus.view || (menus.view = {}));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var view;
        (function (view) {
            var ProductListItem = (function (_super) {
                __extends(ProductListItem, _super);
                function ProductListItem(productId, name, description, localizedPrice) {
                    var _this = this;
                    _super.call(this);
                    var tContainer = new createjs.Container();
                    var bg = gameui.AssetsManager.getBitmap("FlyGroup");
                    bg.x = 232;
                    bg.y = 27;
                    bg.scaleY = 1.25;
                    bg.scaleX = 0.75;
                    tContainer.addChild(bg);
                    var iconId = "";
                    switch (productId) {
                        case "time5x":
                            iconId = "itemtime";
                            break;
                        case "fast5x":
                            iconId = "itemfast";
                            break;
                        case "revive5x":
                            iconId = "itemrevive";
                            break;
                        case "evolve5x":
                            iconId = "itemevolve";
                            break;
                        case "clean5x":
                            iconId = "itemclean";
                            break;
                        case "pack5x":
                        case "pack1x":
                        case "pack10x":
                            iconId = "itemPack";
                            break;
                        case "lucky":
                            iconId = "lucky";
                            break;
                        default: iconId = "itemPack";
                    }
                    var icon = gameui.AssetsManager.getBitmap(iconId);
                    icon.regX = icon.getBounds().width / 2;
                    icon.regY = icon.getBounds().height / 2;
                    icon.scaleX = icon.scaleY = 0.8;
                    icon.x = 225;
                    icon.y = 188;
                    tContainer.addChild(icon);
                    if (description)
                        description = description.replace("  ", "\n");
                    var titleObj = gameui.AssetsManager.getBitmapText(name, "debussyBig");
                    var descriptionObj = gameui.AssetsManager.getBitmapText(description, "debussy");
                    titleObj.y = 40;
                    descriptionObj.y = 140;
                    titleObj.scaleX = titleObj.scaleY = 0.7;
                    descriptionObj.scaleX = descriptionObj.scaleY = 0.8;
                    titleObj.x = descriptionObj.x = 400;
                    tContainer.addChild(titleObj);
                    tContainer.addChild(descriptionObj);
                    var unchecked = gameui.AssetsManager.getBitmap("unchecked");
                    unchecked.regX = unchecked.getBounds().width / 2;
                    unchecked.regY = unchecked.getBounds().height / 2;
                    unchecked.y = 152;
                    unchecked.x = 1199;
                    this.addChild(unchecked);
                    var check = gameui.AssetsManager.getBitmap("check");
                    check.regX = check.getBounds().width / 2;
                    check.regY = check.getBounds().height / 2;
                    check.y = 152;
                    check.x = 1199;
                    this.purchasedIcon = check;
                    this.addChild(check);
                    var loading = new joinjelly.view.LoadingBall();
                    loading.y = 152;
                    loading.x = 1199;
                    this.loadingIcon = loading;
                    this.addChild(loading);
                    var priceDO = gameui.AssetsManager.getBitmapText(localizedPrice, "debussy");
                    priceDO.y = 251;
                    priceDO.x = 1199;
                    priceDO.regX = priceDO.getBounds().width / 2;
                    priceDO.scaleX = priceDO.scaleY = 0.8;
                    if (localizedPrice != "share")
                        tContainer.addChild(priceDO);
                    if (localizedPrice == "share") {
                        var button = new gameui.ImageButton("BtShare", function () {
                            _this.setPurchasing();
                            _this.dispatchEvent({ type: "share", productId: productId });
                        });
                    }
                    else {
                        var button = new gameui.ImageButton("BtStore", function () {
                            _this.setPurchasing();
                            _this.dispatchEvent({ type: "buy", productId: productId });
                        });
                    }
                    button.y = 152;
                    button.x = 1199;
                    this.purchaseButton = button;
                    this.addChild(button);
                    this.addChild(tContainer);
                    tContainer.cache(100, 27, 1250, 300);
                }
                ProductListItem.prototype.setPurchasing = function () {
                    this.disable();
                    this.loadingIcon.visible = true;
                };
                ProductListItem.prototype.loading = function () {
                    this.disable();
                    this.loadingIcon.visible = true;
                };
                ProductListItem.prototype.setNotAvaliable = function () {
                    this.purchaseButton.fadeOut();
                    this.purchasedIcon.visible = false;
                    this.loadingIcon.visible = false;
                };
                ProductListItem.prototype.setAvaliable = function () {
                };
                ProductListItem.prototype.setPurchased = function (timeOut) {
                    var _this = this;
                    if (timeOut === void 0) { timeOut = false; }
                    this.purchaseButton.fadeOut();
                    this.purchasedIcon.visible = true;
                    this.loadingIcon.visible = false;
                    gameui.AudiosManager.playSound("Interface Sound-11");
                    if (timeOut)
                        setTimeout(function () {
                            _this.setNormal();
                        }, 1000);
                };
                ProductListItem.prototype.setNormal = function () {
                    this.purchaseButton.fadeIn();
                    this.purchasedIcon.visible = false;
                    this.loadingIcon.visible = false;
                };
                ProductListItem.prototype.enable = function () {
                    this.purchaseButton.fadeIn();
                    this.loadingIcon.visible = false;
                };
                ProductListItem.prototype.disable = function () {
                    this.purchasedIcon.visible = false;
                    this.purchaseButton.fadeOut();
                };
                return ProductListItem;
            })(createjs.Container);
            view.ProductListItem = ProductListItem;
        })(view = menus.view || (menus.view = {}));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var view;
    (function (view) {
        var Effect = (function (_super) {
            __extends(Effect, _super);
            function Effect() {
                _super.apply(this, arguments);
            }
            Effect.prototype.castSimple = function () {
                var _this = this;
                var fxs = gameui.AssetsManager.getBitmap("fxJoin");
                fxs.regX = 100;
                fxs.regY = 100;
                this.addChild(fxs);
                createjs.Tween.get(fxs).to({ scaleX: 2, scaleY: 2, alpha: 0 }, 500, createjs.Ease.linear).call(function () {
                    _this.removeChild(fxs);
                });
            };
            Effect.prototype.castSimpleInv = function () {
                var _this = this;
                var fxs = gameui.AssetsManager.getBitmap("fxJoin");
                fxs.regX = 100;
                fxs.regY = 100;
                this.addChild(fxs);
                fxs.alpha = 2;
                fxs.scaleX = 2;
                fxs.scaleY = 2;
                createjs.Tween.get(fxs).to({ scaleX: 0.5, scaleY: 0.5, alpha: 2 }, 800, createjs.Ease.linear).call(function () {
                    _this.removeChild(fxs);
                });
            };
            Effect.prototype.castPart = function () {
                var _this = this;
                var fxp = gameui.AssetsManager.getBitmap("fxPart");
                fxp.regX = 140;
                fxp.regY = 140;
                fxp.scaleX = fxp.scaleY = 0.2;
                fxp.alpha = 2;
                this.addChild(fxp);
                createjs.Tween.get(fxp).to({ scaleX: 1.6, scaleY: 1.6, alpha: 0 }, 500, createjs.Ease.quadOut).call(function () {
                    _this.removeChild(fxp);
                });
                this.castParts();
            };
            Effect.prototype.castParts = function () {
                var _this = this;
                var fxp = gameui.AssetsManager.getBitmap("fxPart");
                fxp.regX = 140;
                fxp.regY = 140;
                fxp.scaleX = fxp.scaleY = 0.4;
                fxp.rotation = 360 / 16;
                fxp.alpha = 2;
                this.addChild(fxp);
                createjs.Tween.get(fxp).to({ scaleX: 2.2, scaleY: 2.2, alpha: 0 }, 500, createjs.Ease.quadOut).call(function () {
                    _this.removeChild(fxp);
                });
            };
            Effect.prototype.castPartsInv = function () {
                var _this = this;
                var fxp = gameui.AssetsManager.getBitmap("fxPart");
                fxp.regX = 140;
                fxp.regY = 140;
                fxp.scaleX = fxp.scaleY = 4;
                fxp.rotation = 360 / 16;
                fxp.alpha = 0;
                this.addChild(fxp);
                createjs.Tween.get(fxp).to({ scaleX: 0.5, scaleY: 0.5, alpha: 2, rotation: 0 }, 1000, createjs.Ease.quadIn).call(function () {
                    _this.removeChild(fxp);
                });
            };
            Effect.prototype.castBoth = function () {
                this.castPartsInv();
                this.castSimpleInv();
            };
            return Effect;
        })(createjs.Container);
        view.Effect = Effect;
    })(view = joinjelly.view || (joinjelly.view = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=script.js.map