var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var gameui;
(function (gameui) {
    var UIItem = (function (_super) {
        __extends(UIItem, _super);
        function UIItem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.centered = false;
            _this.animating = false;
            return _this;
        }
        UIItem.prototype.centralize = function () {
            this.pivot.x = this.width / 2;
            this.pivot.y = this.height / 2;
            this.centered = true;
        };
        UIItem.prototype.fadeOut = function (scaleX, scaleY) {
            var _this = this;
            if (scaleX === void 0) { scaleX = 0.5; }
            if (scaleY === void 0) { scaleY = 0.5; }
            this.resetFade();
            if (!this.scale.x)
                this.scale.x = 1;
            if (!this.scale.y)
                this.scale.y = 1;
            this.oldScaleX = this.scale.x;
            this.oldScaleY = this.scale.y;
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
                _this.scale.x = _this.oldScaleX;
                _this.scale.y = _this.oldScaleY;
                _this.alpha = 1;
                _this.animating = false;
                _this.interactive = true;
                ;
            });
        };
        UIItem.prototype.resetFade = function () {
            this.animating = true;
            this.antX = this.x;
            this.antY = this.y;
            this.scale.x = this.oldScaleX;
            this.scale.y = this.oldScaleY;
            this.interactive = false;
            createjs.Tween.removeTweens(this);
        };
        UIItem.prototype.fadeIn = function (scaleX, scaleY) {
            var _this = this;
            if (scaleX === void 0) { scaleX = 0.5; }
            if (scaleY === void 0) { scaleY = 0.5; }
            this.resetFade();
            if (this.visible = true)
                this.antX = null;
            if (!this.scale.x)
                this.scale.x = 1;
            if (!this.scale.y)
                this.scale.y = 1;
            this.oldScaleX = this.scale.x;
            this.oldScaleY = this.scale.y;
            this.visible = true;
            this.animating = true;
            if (this.antX == null) {
                this.antX = this.x;
                this.antY = this.y;
            }
            this.scale.x = scaleX,
                this.scale.y = scaleY,
                this.alpha = 0,
                this.x = this.x;
            this.y = this.y;
            this.interactive = false;
            createjs.Tween.removeTweens(this);
            createjs.Tween.get(this).to({
                scaleX: this.oldScaleX,
                scaleY: this.oldScaleY,
                alpha: 1,
                x: this.antX,
                y: this.antY,
            }, 400, createjs.Ease.quadOut)
                .call(function () {
                _this.interactive = true;
                _this.animating = false;
            });
        };
        UIItem.prototype.createHitArea = function () {
            var b = this.getLocalBounds();
            this.hitArea = new PIXI.Rectangle(b.x, b.y, b.width, b.height);
        };
        return UIItem;
    }(PIXI.Container));
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
        AudiosManager.setSoundVolume = function (volume) {
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
        AudiosManager.pauseMusic = function () {
            if (this.currentMusic)
                this.currentMusic.stop();
        };
        AudiosManager.continueMusic = function () {
            if (this.currentMusic)
                this.currentMusic.play();
        };
        AudiosManager.playMusic = function (name, volume) {
            if (volume === void 0) { volume = 1; }
            if (this.currentMusic) {
                this.currentMusic.setVolume(volume * this.getMusicVolume() * 0.6);
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
    }());
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
            this.assetsManifest = manifest;
            if (!images)
                images = images ? images : new Array();
            if (!this.loader) {
                this.loader = new PIXI.loaders.Loader(path);
                this.loader.on("error ", function (evt) { console.log("error " + evt.item.src); });
                this.loader.on("fileerror ", function (evt) { console.log("ferror " + evt.item.src); });
                this.loader.on("progress", function (evt) { if (_this.onProgress)
                    _this.onProgress(evt.progress); });
                this.loader.on("fileload", function (evt) {
                    if (evt.item.type == "image")
                        images[evt.item.id] = evt.result;
                    return true;
                });
                this.loader.on("complete", function (loader, resources) {
                    for (var r in resources)
                        images[r] = resources[r].texture;
                    if (_this.onComplete)
                        _this.onComplete();
                });
            }
            for (var m in manifest) {
                this.loader.add(manifest[m].id, manifest[m].src);
            }
        };
        AssetsManager.reset = function () {
            this.loader.reset();
        };
        AssetsManager.loadFontSpriteSheet = function (id, fontFile, options) {
            if (options === void 0) { options = null; }
            this.loader.add(id, fontFile, options);
        };
        AssetsManager.loadSpriteSheet = function (id, fontFile) {
            this.loader.add(id, fontFile);
        };
        ;
        AssetsManager.load = function (callback) {
            if (callback)
                this.loader.load(callback);
        };
        ;
        AssetsManager.cleanAssets = function () {
            if (images)
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
            var texture = this.getLoadedImage(name);
            if (!texture)
                texture = PIXI.utils.TextureCache[name];
            if (texture) {
                var imgobj = new PIXI.Sprite(texture);
                imgobj.interactive = AssetsManager.defaultMouseEnabled;
                return imgobj;
            }
            var imgobj = PIXI.Sprite.fromImage(name);
            imgobj.interactive = AssetsManager.defaultMouseEnabled;
            imgobj.texture["resolution"] = assetscale;
            return imgobj;
        };
        AssetsManager.getBitmapText = function (text, bitmapFontId, color, size) {
            if (color === void 0) { color = 0xffffff; }
            if (size === void 0) { size = 1; }
            var bitmapText = new PIXI.extras.BitmapText(text, { font: bitmapFontId, align: 'left' });
            bitmapText.tint = color;
            bitmapText.maxLineHeight = 100;
            bitmapText.interactiveChildren = AssetsManager.defaultMouseEnabled;
            bitmapText.scaleX = bitmapText.scaleY = size;
            return bitmapText;
        };
        AssetsManager.getLoadedImage = function (name) {
            if (this.loader)
                if (!this.loader.resources[name])
                    return null;
            return this.loader.resources[name].texture;
        };
        AssetsManager.getMovieClip = function (name) {
            var textures = [];
            var n2 = function (n) { return n > 9 ? "" + n : "0" + n; };
            for (var i = 0; i < 999; i++) {
                var id = name + n2(i);
                if (!PIXI.utils.TextureCache[id])
                    break;
                var texture = PIXI.Texture.fromFrame(id);
                textures.push(texture);
            }
            var mc = new PIXI.extras.MovieClip(textures);
            return mc;
        };
        return AssetsManager;
    }());
    AssetsManager.defaultMouseEnabled = false;
    gameui.AssetsManager = AssetsManager;
})(gameui || (gameui = {}));
notCocoon = false;
var gameui;
(function (gameui) {
    var PIXIrenderer;
    var PIXIstage;
    var updateFn;
    var minfps = 100;
    var last = 0;
    var doing = false;
    var GameScreen = (function () {
        function GameScreen(divId, gameWidth, gameHeight, fps, legacy) {
            if (fps === void 0) { fps = 60; }
            if (legacy === void 0) { legacy = false; }
            var _this = this;
            this.defaultWidth = gameWidth;
            this.defaultHeight = gameHeight;
            PIXIstage = new PIXI.Container();
            PIXIrenderer = new PIXI.WebGLRenderer(gameWidth, gameHeight, { legacy: legacy });
            document.getElementById(divId).appendChild(PIXIrenderer.view);
            this.screenContainer = new PIXI.Container();
            PIXIstage.addChild(this.screenContainer);
            this.resizeGameScreen(window.innerWidth, window.innerHeight);
            window.onresize = function () { _this.resizeGameScreen(window.innerWidth, window.innerHeight); };
            createjs.Tween["_inited"] = true;
            if (!window["Cocoon"])
                notCocoon = true;
            updateFn = this.update;
            updateFn();
        }
        GameScreen.prototype.update = function (timestamp) {
            if (!timestamp)
                timestamp = Date.now();
            if (!this.time)
                this.time = timestamp;
            var delta = timestamp - this.time;
            this.time = timestamp;
            var fps = 60;
            var delay = Math.min(1000 / fps, (1000 / fps - delta));
            createjs.Tween.tick(delta, false);
            PIXIrenderer.render(PIXIstage);
            if (notCocoon)
                setTimeout(updateFn, delay);
            else
                requestAnimationFrame(updateFn);
        };
        GameScreen.prototype.switchScreen = function (newScreen, parameters, transition) {
            var _this = this;
            var oldScreen = this.currentScreen;
            if (!transition)
                transition = new gameui.Transition();
            var x = 0;
            var y = 0;
            var scale = 1;
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
                    case "zoomOut":
                        scale = 1 / 5;
                        x = (defaultWidth) * 2;
                        y = (defaultHeight) * 2;
                        alpha = 0;
                        break;
                    case "zoomIn":
                        scale = 5;
                        x = -(defaultWidth / 2);
                        y = -(defaultHeight / 2);
                        alpha = 0;
                        break;
                }
                newScreen.view.interactiveChildren = false;
                oldScreen.view.interactiveChildren = false;
                oldScreen.transitioning = true;
                newScreen.transitioning = true;
                if (transition.type && transition.type != "none") {
                    newScreen.view.alpha = alpha;
                    newScreen.view.x = -x;
                    newScreen.view.y = -y;
                    newScreen.view.scaleX = 1 / scale;
                    newScreen.view.scaleY = 1 / scale;
                    oldScreen.view.alpha = 1;
                    oldScreen.view.x = 0;
                    oldScreen.view.y = 0;
                    createjs.Tween.get(oldScreen.view).to({ scaleX: scale, scaleY: scale, alpha: 1, x: x * scale, y: y * scale }, transition.time, createjs.Ease.quadInOut);
                    createjs.Tween.get(newScreen.view).to({ scaleX: 1, scaleY: 1, alpha: 1, x: 0, y: 0 }, transition.time, createjs.Ease.quadInOut).call(function () {
                        oldScreen.view.set({ scaleX: 1, scaleY: 1, alpha: 0, x: 0, y: 0 });
                        newScreen.view.set({ scaleX: 1, scaleY: 1, alpha: 1, x: 0, y: 0 });
                        newScreen.view.interactiveChildren = true;
                        oldScreen.view.interactiveChildren = true;
                        oldScreen.transitioning = false;
                        newScreen.transitioning = false;
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
        GameScreen.prototype.resizeGameScreen = function (deviceWidth, deviceHeight) {
            if (this.defaultHeight) {
                var defaultAspect = this.defaultWidth / this.defaultHeight;
                var aspectReal = deviceWidth / deviceHeight;
                if (aspectReal > defaultAspect) {
                    var s = deviceHeight / this.defaultHeight;
                    deviceWidth = this.defaultWidth * s;
                }
            }
            PIXIrenderer.resize(deviceWidth, deviceHeight);
            this.updateViewerScale(deviceWidth, deviceHeight, this.defaultWidth, this.defaultHeight);
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
            this.currentScale = scale;
        };
        GameScreen.prototype.getCurrentScale = function () {
            return this.currentScale;
        };
        GameScreen.prototype.removeOldScreen = function (oldScreen) {
            if (oldScreen != null) {
                oldScreen.desactivate();
                this.screenContainer.removeChild(oldScreen.view);
                oldScreen = null;
            }
        };
        GameScreen.prototype.sendBackButtonEvent = function () {
            if (this.currentScreen && this.currentScreen.onback && !this.currentScreen.transitioning) {
                this.currentScreen.onback();
                return false;
            }
            else
                return true;
        };
        return GameScreen;
    }());
    gameui.GameScreen = GameScreen;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
    var Grid = (function (_super) {
        __extends(Grid, _super);
        function Grid(cols, rows, width, height, padding, flowHorizontal) {
            if (padding === void 0) { padding = 0; }
            var _this = _super.call(this) || this;
            _this.flowHorizontal = false;
            _this.currentCol = 0;
            _this.currentRow = 0;
            _this.flowHorizontal = flowHorizontal;
            _this.cols = cols;
            _this.rows = rows;
            _this.padding = padding;
            _this.width = width;
            _this.height = height;
            _this.wSpacing = (width - padding * 2) / cols;
            _this.hSpacing = (height - padding * 2) / rows;
            return _this;
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
    }(gameui.UIItem));
    gameui.Grid = Grid;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
    var ScreenState = (function () {
        function ScreenState() {
            this.view = new PIXI.Container();
            this.content = new PIXI.Container();
            this.overlay = new PIXI.Container();
            this.header = new PIXI.Container();
            this.footer = new PIXI.Container();
            this.background = new PIXI.Container();
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
                this.background.x = 0;
                this.background.scaleY = scale;
            }
        };
        return ScreenState;
    }());
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
    }());
    gameui.Transition = Transition;
})(gameui || (gameui = {}));
var gameui;
(function (gameui) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(event, soundId) {
            var _this = _super.call(this) || this;
            _this.enableAnimation = true;
            _this.pressed = false;
            _this.event = event;
            _this.interactive = true;
            if (event)
                _this.on("pointertap", _this.event);
            _this.on("pointerdown", function (event) { _this.onPress(event); });
            _this.on("pointerup", function (event) { _this.onOut(event); });
            _this.on("pointerupoutside", function (event) { _this.onOut(event); });
            _this.soundId = soundId;
            return _this;
        }
        Button.setDefaultSoundId = function (soundId) {
            this.DefaultSoundId = soundId;
        };
        Button.prototype.returnStatus = function () {
            if (!this.pressed) {
                this.scale.x = this.originalScaleX;
                this.scale.y = this.originalScaleY;
            }
        };
        Button.prototype.onOut = function (Event) {
            if (this.pressed) {
                this.pressed = false;
                if (!this.enableAnimation)
                    return;
                this.set({ scaleX: this.originalScaleX * 1.1, scaleY: this.originalScaleY * 1.1 });
                createjs.Tween.get(this).to({ scaleX: this.originalScaleX, scaleY: this.originalScaleY }, 200, createjs.Ease.backOut);
            }
        };
        Button.prototype.onPress = function (Event) {
            var _this = this;
            if (this.pressed)
                return;
            this.pressed = true;
            if (!this.enableAnimation)
                return;
            if (this.originalScaleX == null) {
                this.originalScaleX = this.scaleX;
                this.originalScaleY = this.scaleY;
            }
            createjs.Tween.get(this).to({ scaleX: this.originalScaleX * 1.1, scaleY: this.originalScaleY * 1.1 }, 500, createjs.Ease.elasticOut).call(function () {
                if (!_this.pressed) {
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
    }(gameui.UIItem));
    gameui.Button = Button;
    var ImageButton = (function (_super) {
        __extends(ImageButton, _super);
        function ImageButton(image, event, soundId) {
            var _this = _super.call(this, event, soundId) || this;
            if (image != null) {
                _this.background = gameui.AssetsManager.getBitmap(image);
                _this.addChildAt(_this.background, 0);
                if (_this.background.getBounds()) {
                    _this.centralizeImage(_this.background);
                }
                else if (_this.background["image"])
                    _this.background["image"].onload = function () { _this.centralizeImage(_this.background); };
            }
            _this.createHitArea();
            return _this;
        }
        ImageButton.prototype.centralizeImage = function (image) {
            if (!image.getBounds())
                return;
            image.pivot.x = image.getBounds().width / 2;
            image.pivot.y = image.getBounds().height / 2;
            if (this.centered)
                return;
            this.width = image.getBounds().width;
            this.height = image.getBounds().height;
            this.centered = true;
        };
        return ImageButton;
    }(Button));
    gameui.ImageButton = ImageButton;
    var TwoImageButton = (function (_super) {
        __extends(TwoImageButton, _super);
        function TwoImageButton(image, image2, event, soundId) {
            var _this = _super.call(this, image, event, soundId) || this;
            _this.enableAnimation = false;
            if (image2 != null) {
                _this.background2 = gameui.AssetsManager.getBitmap(image2);
                _this.addChildAt(_this.background2, 0);
                _this.centralizeImage(_this.background2);
                _this.background2.visible = false;
            }
            return _this;
        }
        TwoImageButton.prototype.onOut = function (Event) {
            _super.prototype.onOut.call(this, Event);
            this.background2.visible = false;
            this.background.visible = true;
        };
        TwoImageButton.prototype.onPress = function (Event) {
            _super.prototype.onPress.call(this, Event);
            this.background2.visible = true;
            this.background.visible = false;
        };
        return TwoImageButton;
    }(ImageButton));
    gameui.TwoImageButton = TwoImageButton;
    var TextButton = (function (_super) {
        __extends(TextButton, _super);
        function TextButton(text, font, color, background, event, soundId) {
            if (text === void 0) { text = ""; }
            var _this = _super.call(this, background, event, soundId) || this;
            text = text.toUpperCase();
            _this.text = new PIXI.Text(text, { fontStyle: font, fill: color, align: "center", textBaseline: "middle" });
            if (background == null) {
                _this.width = _this.text.getBounds().width * 1.5;
                _this.height = _this.text.getBounds().height * 1.5;
            }
            _this.addChild(_this.text);
            _this.createHitArea();
            _this.createHitArea();
            return _this;
        }
        return TextButton;
    }(ImageButton));
    gameui.TextButton = TextButton;
    var TwoImageButtonBitmapText = (function (_super) {
        __extends(TwoImageButtonBitmapText, _super);
        function TwoImageButtonBitmapText(text, bitmapFontId, color, background1, background2, event, soundId) {
            if (color === void 0) { color = 0xffffff; }
            var _this = _super.call(this, background1, background2, event, soundId) || this;
            text = text.toUpperCase();
            _this.bitmapText = gameui.AssetsManager.getBitmapText(text, bitmapFontId, color);
            _this.addChild(_this.bitmapText);
            _this.bitmapText.pivot.x = _this.bitmapText.textWidth / 2;
            _this.bitmapText.pivot.y = _this.bitmapText.textHeight / 2;
            _this.bitmapText.y = 10;
            _this.createHitArea();
            return _this;
        }
        TwoImageButtonBitmapText.prototype.onOut = function (Event) {
            _super.prototype.onOut.call(this, Event);
            this.bitmapText.y = 10;
        };
        TwoImageButtonBitmapText.prototype.onPress = function (Event) {
            _super.prototype.onPress.call(this, Event);
            this.bitmapText.y = 0;
        };
        return TwoImageButtonBitmapText;
    }(TwoImageButton));
    gameui.TwoImageButtonBitmapText = TwoImageButtonBitmapText;
    var BitmapTextButton = (function (_super) {
        __extends(BitmapTextButton, _super);
        function BitmapTextButton(text, bitmapFontId, background, event, soundId) {
            var _this = _super.call(this, background, event, soundId) || this;
            text = text.toUpperCase();
            _this.bitmapText = gameui.AssetsManager.getBitmapText(text, bitmapFontId);
            _this.addChild(_this.bitmapText);
            _this.bitmapText.pivot.x = _this.bitmapText.textWidth / 2;
            _this.bitmapText.pivot.y = _this.bitmapText.textHeight / 2 + 20;
            _this.createHitArea();
            return _this;
        }
        return BitmapTextButton;
    }(ImageButton));
    gameui.BitmapTextButton = BitmapTextButton;
    var IconTextButton = (function (_super) {
        __extends(IconTextButton, _super);
        function IconTextButton(icon, text, font, color, background, event, soundId, align) {
            if (icon === void 0) { icon = ""; }
            if (text === void 0) { text = ""; }
            if (font === void 0) { font = null; }
            if (align === void 0) { align = "center"; }
            var _this = _super.call(this, text, font, color, background, event, soundId) || this;
            _this.align = align;
            _this.icon = gameui.AssetsManager.getBitmap(icon);
            _this.addChild(_this.icon);
            _this.text.style.align = "left";
            if (_this.icon.getBounds())
                _this.icon.pivot.y = _this.icon.getBounds().height / 2;
            else if (_this.icon["image"])
                _this.icon["image"].onload = function () {
                    _this.icon.pivot.y = _this.icon.getBounds().height / 2;
                };
            _this.updateLabel(text);
            _this.createHitArea();
            return _this;
        }
        IconTextButton.prototype.updateLabel = function (value) {
            this.text.text = value;
            if (!this.icon.getBounds())
                return;
            switch (this.align) {
                case "center":
                    this.icon.x = -(this.icon.getBounds().width + 10 + this.text.getBounds().width) / 2;
                    this.text.x = this.icon.x + this.icon.getBounds().width + 10;
                    break;
                case "left":
                    this.icon.x = -this.width / 2 + 80;
                    this.text.x = -this.width / 2 + 80 + this.icon.getBounds().width + 100;
                    break;
            }
        };
        IconTextButton.prototype.centralizeIcon = function () {
        };
        return IconTextButton;
    }(TextButton));
    gameui.IconTextButton = IconTextButton;
    var IconBitmapTextButton = (function (_super) {
        __extends(IconBitmapTextButton, _super);
        function IconBitmapTextButton(icon, text, font, background, event, soundId, align) {
            if (icon === void 0) { icon = ""; }
            if (text === void 0) { text = ""; }
            if (font === void 0) { font = null; }
            if (align === void 0) { align = "center"; }
            var _this = _super.call(this, text, font, background, event, soundId) || this;
            _this.align = align;
            _this.icon = gameui.AssetsManager.getBitmap(icon);
            _this.addChild(_this.icon);
            if (_this.icon.getBounds())
                _this.icon.pivot.y = _this.icon.getBounds().height / 2;
            else if (_this.icon["image"])
                _this.icon["image"].onload = function () {
                    _this.icon.pivot.y = _this.icon.getBounds().height / 2;
                };
            _this.updateLabel(text);
            _this.createHitArea();
            return _this;
        }
        IconBitmapTextButton.prototype.updateLabel = function (value) {
            this.bitmapText.text = value;
            if (!this.icon.getBounds())
                return;
            switch (this.align) {
                case "center":
                    this.icon.x = -(this.icon.getBounds().width + 10 + this.bitmapText.getBounds().width) / 2;
                    this.bitmapText.x = this.icon.x + this.icon.getBounds().width + 10;
                    break;
                case "left":
                    this.icon.x = -this.width / 2 + 80;
                    this.bitmapText.pivot.x = 0;
                    this.bitmapText.x = -this.width / 2 + 80 + this.icon.getBounds().width + 100;
                    break;
            }
        };
        IconBitmapTextButton.prototype.centralizeIcon = function () {
        };
        return IconBitmapTextButton;
    }(BitmapTextButton));
    gameui.IconBitmapTextButton = IconBitmapTextButton;
    var IconButton = (function (_super) {
        __extends(IconButton, _super);
        function IconButton(icon, background, event, soundId) {
            if (icon === void 0) { icon = ""; }
            return _super.call(this, icon, "", "", 0xFFFFFF, background, event, soundId) || this;
        }
        return IconButton;
    }(IconTextButton));
    gameui.IconButton = IconButton;
})(gameui || (gameui = {}));
var joinjelly;
(function (joinjelly) {
    var Items = (function () {
        function Items() {
        }
        return Items;
    }());
    Items.TIME = "time";
    Items.CLEAN = "clean";
    Items.FAST = "fast";
    Items.REVIVE = "revive";
    Items.LUCKY = "lucky";
    Items.EVOLVE = "evolve";
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
        return ItemsData;
    }());
    ItemsData.items = [Items.TIME, Items.CLEAN, Items.FAST, Items.REVIVE, Items.EVOLVE, Items.LUCKY];
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
        fbURL: "http://www.facebook.com/diastd",
        fbActionURL: "fb://page/diastd",
        tutorial: "Tutorial",
        shop: "shop",
        playerName: "Player Name",
        playerNameDesc: "Type your name for the leaderboards.",
        error: "Sorry, Something went wrong",
        errorAds: "Can't load Ads, try again",
        rating: "Rate us",
        ratingDesc: "Are you enjoying?\nPlease rate us",
        like: "Like us",
        share: "Share",
        watchVideo: "Watch Video",
        gift: "gift in @ minutes",
        thanks: "Thanks!",
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
        msgLetsGo: "You are ready! Let's Go!",
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
        shareDescription: "Help the jellie neighbourhood to evolve and eliminate your monster enemies! Join equal jellies to see new characters. The more jellies evolved more discoveries! But beware, be aware that the enemy has power over time and his henchmen.Many jellies want to help, many came from far away to fight, but you need to be fast for it to be organized before the desperation defeat you.",
        shareTitle: "JoinJelly",
        shareCaption: "Hi!",
    }
};
var StringResources_pt = {
    menus: {
        highScore: "Recorde",
        loading: "Carregando",
        score: "Pontos",
        level: "level",
        options: "op????es",
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
        resetWarning: "Voc?? tem certeza? tudo que voce consquistou ser?? perdido.",
        about: "Sobre",
        aboutText: "Desenvolvido por",
        aboutURL: "www.dia-studio.com",
        fbURL: "http://www.facebook.com/diastd",
        fbActionURL: "fb://page/diastd",
        tutorial: "Tutorial",
        shop: "Compras",
        playerName: "Nome do Jogador",
        playerNameDesc: "Digite seu nome para aparecer no placar dos melhores",
        error: "Desculpe, algo deu errado.",
        errorAds: "Tente de novo",
        rating: "Avalia????o",
        ratingDesc: "Est?? gostando? \nNos Ajude. D?? sua avalia????o",
        like: "Curtir",
        share: "Compartilhar",
        watchVideo: "Veja um Video",
        gift: "v??deo em @ min",
        thanks: "Obrigado!",
    },
    tutorial: {
        msgheplme: "Me ajude a evoluir\nJunte 2 geleias IGUAIS.",
        msgOnceMore: "Legal! Estou maior, \nMe desenvolva novamente",
        msgDirt: "Oh n??o, sujeira! Junte \numa geleia aqui para limpar.",
        msgPlay: "Perfeito!\nMe evolua ao maximo!",
        msgItemClean: "Sempre que precisar use \nitems. Este limpa a bagun??a",
        msgItemFast: "Esse junta \nalgumas geleias",
        msgItemTime: "Esse congela o tempo",
        msgItemRevive: "Se voce perder, use este para reviver",
        msgBoardFill: "Mas Tenha cuidado, se acabar \nos espa??os no ch??o ?? o fim.",
        msgLetsGo: "Voc?? est?? ronto! Vamos l??!",
    },
    jellies: {
        1: { name: "Geleinha", description: "Pequena mas \nimportante" },
        2: { name: "Gotinha", description: "gotejando por\ntodo lado" },
        4: { name: "Bolinho", description: "Incr??vel sabor de\nLim??o" },
        8: { name: "Gema", description: "Sente falta da\nClara..." },
        16: { name: "SunBronze", description: "Com corpinho \nbronzeado" },
        32: { name: "Morango", description: "Entediada de tanto\ngelatinar" },
        64: { name: "Chatinha", description: "N??o gosta de ser \ntocada" },
        128: { name: "Gelerda", description: "A geleia lerdinha" },
        256: { name: "Moti", description: "Irresist??vel vontade\nde comer com shoyu" },
        512: { name: "Xex??o", description: "Lembra as bochechas \ndo meu irm??o" },
        1024: { name: "Geleialien", description: "Veio de outro \nplaneta para geleiar" },
        2048: { name: "Petr??leo", description: "Uma gotinha de \n??leo" },
        4096: { name: "Saud??vel", description: "Sua geleia pessoal \nde sa??de" },
        8192: { name: "Cuboide", description: "Esse nasceu\nquadrad??o." },
        16384: { name: "Geleia Caro??o", description: "Mau humorada e \nencaro??ada" },
        32768: { name: "Geleia Sonica", description: "Uma geleia\nmuito r??pida" },
        65536: { name: "Super Sayajelly", description: "A geleia mais forte \ndo universo" },
        131072: { name: "Phanton6 Jelly", description: "description" },
        262144: { name: "Phanton6 Jelly", description: "" },
    },
    items: {
        clean: "Limpa",
        fast: "R??pido",
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
            name: "R??pido 3x",
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
            name: "Pacot??o",
            desc: "Contem 10 items de cada.",
        },
    },
    credit: {},
    social: {
        shareDescription: "Ajude a comunidade gele??stica a evoluir e  eliminar seus inimigos! Junte geleias iguais para evoluir e doscrobrir novos personagens. Quanto mais geleias evolu??das mais descobertas! Mas cuidado, voc?? ver?? que o inimigo tem poder sobre o tempo e seus capangas. Muitas geleias querem ajudar, muitas vieram de longe para o combate.  Mas seja r??pido antes que o desespero o derrote!.!",
        shareTitle: "Join Jelly",
        shareCaption: "Hi",
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
        return "alpha 1.0";
    };
    Analytics.prototype.sendEvent = function (eventId, subEventId, value, area, x, y) {
        var game_key = '8c544aeba45e500f2af6e9b1beee996a';
        var secret_key = 'cd5bce1753ceadacad6b990046fd1fb5d884c9a0';
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
            catch (e) { }
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
    Analytics.prototype.logRating = function (rate) {
        this.sendEvent("Rating", "userRate", rate);
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
}());
var joinjelly;
(function (joinjelly) {
    var ScrollablePage = (function (_super) {
        __extends(ScrollablePage, _super);
        function ScrollablePage(title) {
            var _this = _super.call(this) || this;
            _this.maxScroll = 1700;
            _this.targetY = 0;
            _this.scrolling = false;
            _this.addBackground(title);
            _this.addScrollableArea();
            _this.addBackButton();
            _this.onback = function () {
                if (_this.BackButtonAction)
                    _this.BackButtonAction();
                else
                    joinjelly.JoinJelly.showMainScreen();
            };
            return _this;
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
            this.scrollableContent = new PIXI.Container();
            this.ScrollArea = new PIXI.Container();
            this.content.addChild(this.ScrollArea);
            this.ScrollArea.addChild(this.scrollableContent);
            var scrollMask = new PIXI.Graphics().beginFill(0xFF0000).drawPolygon([1417.556, 333.618, 1399.557, 264.622, 1363.559, 198.625, 1288.563, 146.128, 1197.067, 131.129,
                1197.067, 221.124, 1179.068, 239.123, 1161.069, 254.122, 745.59, 254.122, 301.612, 254.122, 283.613, 239.123, 265.614, 221.124,
                272.25, 131.129, 174.118, 146.128, 99.122, 198.625, 63.124, 264.622, 45.125, 333.618, 36.125, 918.589, 45.125, 1547.058, 58.624, 1593.555,
                85.623, 1647.553, 136.62, 1701.55, 181.618, 1722.549, 717.091, 1728.553, 745.59, 1728.553, 1281.063, 1722.549, 1326.061, 1701.55,
                1377.058, 1647.553, 1404.057, 1593.555, 1417.556, 1547.058, 1426.556, 918.589]);
            this.content.addChild(scrollMask);
            scrollMask.interactive = false;
            scrollMask.interactiveChildren = false;
            scrollMask.x = (defaultWidth - 1463) / 2;
            scrollMask.y = (defaultHeight - 1788) / 2;
            this.ScrollArea.mask = scrollMask;
            this.ScrollArea.addEventListener("touchmove", this.pressMoveScroll, this);
            this.ScrollArea.addEventListener("touchend", this.pressUpScroll, this);
            this.ScrollArea.addEventListener("touchstart", this.pressDownScroll, this);
            this.ScrollArea.addEventListener("mousemove", this.pressMoveScroll, this);
            this.ScrollArea.addEventListener("mouseup", this.pressUpScroll, this);
            this.ScrollArea.addEventListener("mouseout", this.pressUpScroll, this);
            this.ScrollArea.addEventListener("mousedown", this.pressDownScroll, this);
            this.ScrollArea.interactive = true;
            this.ScrollArea.hitArea = new PIXI.Rectangle(0, 0, defaultWidth, defaultHeight);
        };
        ScrollablePage.prototype.pressDownScroll = function (evt) {
            this.scrolling = true;
            this.last = null;
        };
        ScrollablePage.prototype.pressMoveScroll = function (evt) {
            if (!this.scrolling)
                return;
            var localY = evt.data.getLocalPosition(evt.currentTarget).y;
            if (!this.last)
                this.last = localY;
            this.targetY += (localY - this.last) * 1.3;
            if (this.targetY > 400)
                this.targetY = 400;
            if (this.targetY < -this.maxScroll)
                this.targetY = -this.maxScroll;
            this.last = localY;
        };
        ScrollablePage.prototype.pressUpScroll = function (evt) {
            this.scrolling = false;
            this.last = null;
        };
        ScrollablePage.prototype.scrollTick = function (evt) {
            this.scrollableContent.y = (this.scrollableContent.y * 2 + this.targetY) / 3;
        };
        ScrollablePage.prototype.addBackButton = function () {
            var _this = this;
            var backbutton = new gameui.ImageButton("BtBack", function () {
                if (_this.BackButtonAction)
                    _this.BackButtonAction();
                else
                    joinjelly.JoinJelly.showMainScreen();
            });
            backbutton.x = 150;
            backbutton.y = 150;
            this.header.addChild(backbutton);
        };
        ScrollablePage.prototype.activate = function (parameters) {
            _super.prototype.activate.call(this, parameters);
            PIXI.ticker.shared.add(this.scrollTick, this);
        };
        ScrollablePage.prototype.desactivate = function (parameters) {
            _super.prototype.desactivate.call(this, parameters);
            PIXI.ticker.shared.remove(this.scrollTick, this);
        };
        return ScrollablePage;
    }(gameui.ScreenState));
    joinjelly.ScrollablePage = ScrollablePage;
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var Loading = (function (_super) {
            __extends(Loading, _super);
            function Loading(scale) {
                var _this = _super.call(this) || this;
                PIXI.RETINA_PREFIX = /@(.+)x.+((png)|(jpg)|(xml)|(json)|(fnt))$/;
                assetscale = 1;
                if (scale < 0.75)
                    assetscale = 0.5;
                if (scale < 0.375)
                    assetscale = 0.25;
                var imagePath = "assets/";
                var audioPath = "assets/sounds/";
                gameui.AssetsManager.loadAssets(imageManifest, imagePath);
                PIXI["settings"].SCALE_BITMAP_FONT = true;
                gameui.AssetsManager.loadFontSpriteSheet("debussy", "debussy@" + assetscale + "x.fnt");
                gameui.AssetsManager.loadFontSpriteSheet("debussyBig", "debussyBig@" + assetscale + "x.fnt");
                gameui.AssetsManager.loadSpriteSheet("s1", "Sprites-1@" + assetscale + "x.json");
                gameui.AssetsManager.loadSpriteSheet("s2", "Sprites-2@" + assetscale + "x.json");
                if (!testMode && typeof WPAudioManager == 'undefined') {
                    createjs.Sound.alternateExtensions = ["mp3"];
                    createjs.Sound.registerSounds(audioManifest, audioPath);
                }
                gameui.Button.DefaultSoundId = "Interface Sound-06";
                var loadinBar = new LoadingBar(imagePath);
                _this.content.addChild(loadinBar);
                loadinBar.x = defaultWidth / 2;
                loadinBar.y = defaultHeight / 2;
                gameui.AssetsManager.onProgress = function (progress) {
                    loadinBar.update(progress);
                };
                gameui.AssetsManager.onComplete = function () { };
                gameui.AssetsManager.load(_this.loaded);
                gameui.AssetsManager.load(function () {
                    if (_this.loaded)
                        _this.loaded();
                });
                return _this;
            }
            return Loading;
        }(gameui.ScreenState));
        menus.Loading = Loading;
        var LoadingBar = (function (_super) {
            __extends(LoadingBar, _super);
            function LoadingBar(imagePath) {
                return _super.call(this) || this;
            }
            LoadingBar.prototype.update = function (value) {
            };
            return LoadingBar;
        }(PIXI.Container));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var MainScreen = (function (_super) {
        __extends(MainScreen, _super);
        function MainScreen(userData) {
            var _this = _super.call(this) || this;
            _this.timeStep = 2;
            _this.boardSize = 5;
            _this.userData = userData;
            _this.createContent();
            _this.createBackground();
            _this.createButtons();
            _this.createTitle();
            _this.rating = new joinjelly.menus.view.RatingFlyOut();
            _this.overlay.addChild(_this.rating);
            _this.rating.x = defaultWidth / 2;
            _this.rating.y = defaultHeight / 2;
            gameui.AudiosManager.playMusic("musicIntro");
            _this.rating.show();
            _this.onback = DeviceServices.exit;
            return _this;
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
            this.background.addChild(gameui.AssetsManager.getBitmap("BackMain"));
        };
        MainScreen.prototype.createButtons = function () {
            var _this = this;
            var x = defaultWidth + 100;
            var space = 250;
            var settingsBt = new gameui.ImageButton("DIAStudioIco", function () { joinjelly.JoinJelly.showAbout(); });
            settingsBt.y = 165 / 2;
            settingsBt.x = defaultWidth - 165 / 2;
            this.header.addChild(settingsBt);
            var settingsBt = new gameui.ImageButton("BtSettings", function () {
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
            var aboutBt = new gameui.ImageButton("BtPedia", function () {
                joinjelly.JoinJelly.showPedia();
            });
            aboutBt.y = -150;
            aboutBt.x = x -= space;
            this.footer.addChild(aboutBt);
            var leaderboardsBt = new gameui.ImageButton("BtTextBg", function () {
                joinjelly.JoinJelly.gameServices.showLeaderboard();
            });
            leaderboardsBt.y = -150;
            leaderboardsBt.x = x = 370;
            this.footer.addChild(leaderboardsBt);
            if (this.userData) {
                this.scoreText = gameui.AssetsManager.getBitmapText(StringResources.menus.highScore, "debussy");
                this.scoreText.x = -300;
                this.scoreText.y = -250 + 100;
                leaderboardsBt.addChild(this.scoreText);
                this.scoreText = gameui.AssetsManager.getBitmapText(this.userData.getHighScore().toString(), "debussyBig");
                this.scoreText.x = -300;
                this.scoreText.y = -170 + 100;
                leaderboardsBt.addChild(this.scoreText);
            }
        };
        return MainScreen;
    }(gameui.ScreenState));
    joinjelly.MainScreen = MainScreen;
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var Jellypedia = (function (_super) {
        __extends(Jellypedia, _super);
        function Jellypedia(userData, jellyInfos) {
            var _this = _super.call(this, StringResources.menus.jellypedia) || this;
            var itensContainer = new PIXI.Container();
            _this.scrollableContent.addChild(itensContainer);
            itensContainer.y = 400;
            var index = 0;
            for (var j = 1; j <= joinjelly.JoinJelly.maxJelly; j *= 2) {
                if (j <= Math.max(1, userData.getLastJelly())) {
                    var pi = new joinjelly.menus.view.JellyPediaItem(j, jellyInfos[j].name, jellyInfos[j].description);
                    itensContainer.addChild(pi);
                    pi.mouseEnabled = false;
                    pi.y = 500 * index;
                    pi.x = 150;
                }
                else {
                    var pi = new joinjelly.menus.view.JellyPediaItem(0, "?", "");
                    itensContainer.addChild(pi);
                    pi.mouseEnabled = false;
                    pi.y = 500 * index;
                    pi.x = 150;
                }
                index++;
            }
            _this.maxScroll = 7300;
            return _this;
        }
        return Jellypedia;
    }(joinjelly.ScrollablePage));
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
                    var _this = _super.call(this) || this;
                    _this.createJoin();
                    _this.createJelly();
                    return _this;
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
                        createjs.Tween.get(image)
                            .wait(waits[char] * 400)
                            .to({ alpha: 0, x: xPositions[char] - 300 * side[char], scaleX: 3, scaleY: 0.333 })
                            .to({ alpha: 2, x: xPositions[char], scaleX: 1, scaleY: 1 }, 2000, createjs.Ease.elasticInOut);
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
            }(PIXI.Container));
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
                    var _this = _super.call(this) || this;
                    _this.dropAllJellys(lastJelly);
                    return _this;
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
            }(PIXI.Container));
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
                function FlyOutMenu(title, height) {
                    if (height === void 0) { height = 1022; }
                    var _this = _super.call(this) || this;
                    _this.top = defaultHeight / 2 - 200;
                    _this.regX = _this.x = defaultWidth / 2;
                    _this.regY = _this.y = defaultHeight / 2;
                    _this.AddBG(height);
                    _this.addTitle(title);
                    _this.visible = false;
                    return _this;
                }
                FlyOutMenu.prototype.setTitle = function (title) {
                    this.title.text = title.toUpperCase();
                    this.title.regX = this.title.getBounds().width / 2;
                };
                FlyOutMenu.prototype.AddBG = function (heigth) {
                    if (heigth === void 0) { heigth = 1022; }
                    var dk = gameui.AssetsManager.getBitmap("popupdark");
                    this.addChild(dk);
                    dk.scaleX = dk.scaleY = 16;
                    dk.x = -defaultWidth / 2;
                    dk.y = -defaultHeight / 2;
                    dk.mouseEnabled = true;
                    var bg = gameui.AssetsManager.getBitmap("FlyBG");
                    bg.set({ x: defaultWidth / 2, y: 557, regX: 1305 / 2 });
                    bg.scaleY = heigth / 1022;
                    this.addChild(bg);
                    bg.mouseEnabled = true;
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
                    createjs.Tween.get(this).to({ alpha: 0, scaleX: 0.5, scaleY: 0.75 }, 200, createjs.Ease.quadIn).call(function () { _this.visible = false; });
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
            }(PIXI.Container));
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
                    var _this = _super.call(this) || this;
                    var bg = gameui.AssetsManager.getBitmap("pediaItem");
                    _this.addChild(bg);
                    var tContainer = new PIXI.Container();
                    var titleObj = gameui.AssetsManager.getBitmapText(title, "debussyBig");
                    var descriptionObj = gameui.AssetsManager.getBitmapText(description, "debussy");
                    titleObj.y = 30;
                    descriptionObj.y = 130;
                    titleObj.scaleX = titleObj.scaleY = 0.9;
                    descriptionObj.scaleX = descriptionObj.scaleY = 0.9;
                    titleObj.x = descriptionObj.x = 450;
                    tContainer.addChild(titleObj);
                    tContainer.addChild(descriptionObj);
                    _this.addChild(tContainer);
                    var j = new joinjelly.gameplay.view.Jelly();
                    j.setNumber(value);
                    j.x = 332 / 2;
                    j.y = 332;
                    _this.addChild(j);
                    return _this;
                }
                return JellyPediaItem;
            }(PIXI.Container));
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
                var _this = _super.call(this, StringResources.store.title) || this;
                _this.previousScreen = previousScreen;
                _this.inAppPurchaseServices = new InAppPurchaseServices(["time5x", "fast5x", "clean5x", "revive5x", "pack5x", "pack10x", "lucky"]);
                var statusText = gameui.AssetsManager.getBitmapText(StringResources.menus.loading, "debussy");
                statusText.y = 500;
                statusText.x = defaultWidth / 2;
                statusText.regX = statusText.getBounds().width / 2;
                _this.StatusText = statusText;
                _this.scrollableContent.addChild(statusText);
                var loadingBall = new joinjelly.view.LoadingBall();
                loadingBall.y = 800;
                loadingBall.x = defaultWidth / 2;
                _this.loadingBall = loadingBall;
                _this.scrollableContent.addChild(loadingBall);
                _this.gameFooter = new joinjelly.gameplay.view.ItemsFooter([joinjelly.Items.TIME, joinjelly.Items.CLEAN, joinjelly.Items.FAST, joinjelly.Items.REVIVE]);
                _this.footer.addChild(_this.gameFooter);
                _this.gameFooter.mouseEnabled = false;
                _this.updateFooter();
                _this.content.y -= 200;
                _this.BackButtonAction = function () { joinjelly.JoinJelly.showMainScreen(); };
                _this.addRestorePurchasesButton();
                _this.showLoading();
                _this.inAppPurchaseServices.onProductsLoaded = function (products) { _this.fillProducts(products); };
                return _this;
            }
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
                joinjelly.JoinJelly.userData.history("purchased");
            };
            StoreMenu.prototype.addRestorePurchasesButton = function () {
                var restore = new gameui.BitmapTextButton(StringResources.menus.restore, "debussy", "BtTextBg", function () {
                    DeviceServices.confirm({
                        title: StringResources.menus.restore,
                        message: StringResources.menus.restoreWarning
                    }, function (accepted) {
                        if (accepted)
                            this.inAppPurchaseServices.restorePurchases();
                    });
                });
                restore.x = defaultWidth * 1 / 3;
                restore.y = defaultHeight - 200;
                this.content.addChild(restore);
            };
            StoreMenu.prototype.fillProducts = function (productList) {
                this.productsListItems = {};
                this.showLoaded();
                for (var p = 0; p < productList.length; p++)
                    this.addProduct(productList[p], p);
            };
            StoreMenu.prototype.addProduct = function (product, p) {
                var _this = this;
                var productListItem = new ProductListItem(product.productId, product.title.replace("(Join Jelly)", ""), product.description, product.localizedPrice);
                this.productsListItems[product.productId] = productListItem;
                this.scrollableContent.addChild(productListItem);
                productListItem.y = p * 380 + 380;
                productListItem.x = 70;
                productListItem.on("buy", function (event) {
                    _this.lockUI();
                    productListItem.setPurchasing();
                    var productId = event["productId"];
                    _this.inAppPurchaseServices.purchaseProduct(event["productId"], 1, function (error) {
                        _this.unlockUI();
                        console.log(JSON.stringify(event));
                        if (error) {
                            console.log("Error:??" + JSON.stringify(error));
                            productListItem.setNormal();
                        }
                        else {
                            console.log("Successfully??purchased");
                            productListItem.setPurchased();
                            _this.fullFillPurchase(productId);
                        }
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
                this.content.interactiveChildren = false;
                setTimeout(function () { _this.unlockUI(); }, timeout);
            };
            StoreMenu.prototype.unlockUI = function () {
                this.content.interactiveChildren = true;
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
            return StoreMenu;
        }(joinjelly.ScrollablePage));
        menus.StoreMenu = StoreMenu;
        var ProductListItem = (function (_super) {
            __extends(ProductListItem, _super);
            function ProductListItem(productId, name, description, localizedPrice) {
                var _this = _super.call(this) || this;
                var tContainer = new PIXI.Container();
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
                description = description.replace(";", "\n");
                var titleObj = gameui.AssetsManager.getBitmapText(name, "debussyBig");
                var descriptionObj = gameui.AssetsManager.getBitmapText(description, "debussy");
                titleObj.y = 40;
                descriptionObj.y = 140;
                titleObj.scaleX = titleObj.scaleY = 0.7;
                descriptionObj.scaleX = descriptionObj.scaleY = 0.8;
                titleObj.x = descriptionObj.x = 360;
                tContainer.addChild(titleObj);
                tContainer.addChild(descriptionObj);
                var unchecked = gameui.AssetsManager.getBitmap("unchecked");
                unchecked.regX = unchecked.getBounds().width / 2;
                unchecked.regY = unchecked.getBounds().height / 2;
                unchecked.y = 152;
                unchecked.x = 1199;
                _this.addChild(unchecked);
                var check = gameui.AssetsManager.getBitmap("check");
                check.regX = check.getBounds().width / 2;
                check.regY = check.getBounds().height / 2;
                check.y = 152;
                check.x = 1199;
                _this.purchasedIcon = check;
                _this.addChild(check);
                var loading = new joinjelly.view.LoadingBall();
                loading.y = 152;
                loading.x = 1199;
                _this.loadingIcon = loading;
                _this.addChild(loading);
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
                        _this.dispatchEvent("share", { productId: productId });
                    });
                }
                else {
                    var button = new gameui.ImageButton("BtStore", function () {
                        _this.emit("buy", { productId: productId });
                    });
                }
                button.y = 152;
                button.x = 1199;
                _this.purchaseButton = button;
                _this.addChild(button);
                _this.addChild(tContainer);
                return _this;
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
            ProductListItem.prototype.setAvaliable = function () { };
            ProductListItem.prototype.setPurchased = function (timeOut) {
                var _this = this;
                if (timeOut === void 0) { timeOut = false; }
                this.purchaseButton.fadeOut();
                this.purchasedIcon.visible = true;
                this.loadingIcon.visible = false;
                gameui.AudiosManager.playSound("Interface Sound-11");
                if (timeOut)
                    setTimeout(function () { _this.setNormal(); }, 1000);
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
        }(PIXI.Container));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                var _this = _super.call(this, StringResources.menus.menu) || this;
                _this.maxScroll = 1700;
                var space = 270;
                var y = 400;
                var soundOptions = new menus.view.SoundOptions();
                _this.scrollableContent.addChild(soundOptions);
                _this.scrollableContent.x = defaultWidth / 2;
                soundOptions.y = y += space;
                var tutorial = new gameui.BitmapTextButton(StringResources.menus.tutorial, "debussy", "BtTextBg", function () {
                    joinjelly.JoinJelly.startTutorial();
                });
                tutorial.y = y += space;
                _this.scrollableContent.addChild(tutorial);
                var reset = new gameui.BitmapTextButton(StringResources.menus.reset, "debussy", "BtTextBg", function () {
                    DeviceServices.confirm({
                        title: StringResources.menus.reset,
                        message: StringResources.menus.resetWarning
                    }, function (accepted) {
                        if (accepted) {
                            joinjelly.JoinJelly.userData.resetAll();
                            joinjelly.JoinJelly.showMainScreen();
                        }
                        else { }
                    });
                });
                reset.y = y += space;
                _this.scrollableContent.addChild(reset);
                return _this;
            }
            return MainMenu;
        }(joinjelly.ScrollablePage));
        menus.MainMenu = MainMenu;
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var About = (function (_super) {
        __extends(About, _super);
        function About() {
            var _this = _super.call(this) || this;
            _this.maxScroll = 1700;
            _this.background.addChild(gameui.AssetsManager.getBitmap("BackMain"));
            var text = gameui.AssetsManager.getBitmapText(StringResources.menus.aboutText, "debussyBig");
            text.regX = text.getBounds().width / 2;
            _this.content.addChild(text);
            text.x = defaultWidth / 2;
            text.y = defaultHeight / 2 - 500;
            var text = gameui.AssetsManager.getBitmapText(StringResources.menus.aboutURL, "debussy");
            text.regX = text.getBounds().width / 2;
            _this.content.addChild(text);
            text.x = defaultWidth / 2;
            text.y = defaultHeight / 2 + 400;
            var logo = new gameui.ImageButton("DIAStudioLogo", function () {
                DeviceServices.openURL("http://" + StringResources.menus.aboutURL);
            });
            logo.x = defaultWidth / 2;
            logo.y = defaultHeight / 2;
            _this.content.addChild(logo);
            var okButton = new gameui.ImageButton("BtOk", function () {
                joinjelly.JoinJelly.showMainScreen();
            });
            okButton.x = defaultWidth / 2;
            okButton.y = defaultHeight - 200;
            _this.content.addChild(okButton);
            _this.footer.addChild(gameui.AssetsManager.getBitmapText("v" + app_version, "debussy").set({ x: 30, y: -100, scaleX: 0.7, scaleY: 0.7 }));
            return _this;
        }
        return About;
    }(gameui.ScreenState));
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
                    var _this = _super.call(this) || this;
                    _this.addSoundOptions();
                    return _this;
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
                    this.musicBtOn = new gameui.ImageButton("BtMusic", (function () { _this.setMusic(0); }));
                    this.musicBtOn.x = -145;
                    this.addChild(this.musicBtOn);
                    this.soundBtOn = new gameui.ImageButton("BtSound", (function () { _this.setSound(0); }));
                    this.soundBtOn.x = 155;
                    this.addChild(this.soundBtOn);
                    this.musicBtOff = new gameui.ImageButton("BtMusicOff", (function () { _this.setMusic(1); }));
                    this.musicBtOff.x = -145;
                    this.addChild(this.musicBtOff);
                    this.soundBtOff = new gameui.ImageButton("BtSoundOff", (function () { _this.setSound(1); }));
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
                    gameui.AudiosManager.setSoundVolume(value ? 1 : 0);
                };
                return SoundOptions;
            }(PIXI.Container));
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
                var _this = _super.call(this) || this;
                _this.shadowContainer = new PIXI.Container();
                _this.imageContainer = new PIXI.Container();
                _this.addChild(_this.shadowContainer);
                _this.addChild(_this.imageContainer);
                return _this;
            }
            JellyContainer.prototype.executeAnimationOut = function (duration) {
                if (this.state == "out")
                    return;
                this.state = "out";
                createjs.Tween.removeTweens(this.imageContainer);
                createjs.Tween.get(this.shadowContainer).to({ alpha: 0 }, duration, createjs.Ease.quadIn);
                createjs.Tween.get(this.imageContainer)
                    .to({ scaleX: 1.3, scaleY: 1.3, y: 0, alpha: 0.3 }, duration, createjs.Ease.quadIn);
            };
            JellyContainer.prototype.executeAnimationIn = function (delay) {
                var _this = this;
                if (delay === void 0) { delay = 0; }
                if (this.state == "in")
                    return;
                this.state = "in";
                this.restore();
                this.imageContainer.set({
                    alpha: 0,
                    scaleX: 0.3,
                    scaleY: 0.3,
                    y: -40
                });
                this.shadowContainer.set({
                    alpha: 0,
                    scaleX: 0,
                });
                createjs.Tween.get(this.imageContainer).wait(delay)
                    .to({ alpha: 1, scaleX: 0.8, scaleY: 1.2 }, 200, createjs.Ease.sineOut)
                    .to({ scaleX: 1, scaleY: 1, y: 0 }, 2000, createjs.Ease.elasticOut).call(function () {
                    _this.executeIdle();
                });
                createjs.Tween.get(this.shadowContainer).wait(delay)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 400, createjs.Ease.sineOut);
            };
            JellyContainer.prototype.executeAnimationHold = function () {
                if (this.state == "hold")
                    return;
                this.state = "hold";
                this.restore();
                createjs.Tween.get(this.imageContainer)
                    .to({
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
                createjs.Tween.get(this.imageContainer)
                    .to({
                    scaleX: 0.8,
                    scaleY: 1.2
                }, 5, createjs.Ease.sineInOut)
                    .to({
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
                    createjs.Tween.get(_this.imageContainer, { loop: true })
                        .to({ skewX: skew * 10 }, f, createjs.Ease.quadOut)
                        .to({ skewX: skew * 0 }, f, createjs.Ease.quadIn)
                        .to({ skewX: skew * -10 }, f, createjs.Ease.quadOut)
                        .to({ skewX: skew * 0 }, f, createjs.Ease.quadIn);
                    createjs.Tween.get(_this.imageContainer, { loop: true })
                        .to({ scaleX: 1 - scale, scaleY: 1 + scale }, f, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 + scale, scaleY: 1 - scale }, f, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 - scale, scaleY: 1 + scale }, f, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 + scale, scaleY: 1 - scale }, f, createjs.Ease.quadInOut);
                });
                createjs.Tween.get(this.shadowContainer).to({ alpha: 1, scaleY: 1, scaleX: 1, skewX: 0 }, 400, createjs.Ease.quadInOut).call(function () {
                    createjs.Tween.get(_this.shadowContainer, { loop: true })
                        .to({ skewX: -5 * skew }, f, createjs.Ease.quadOut)
                        .to({ skewX: 0 * skew }, f, createjs.Ease.quadIn)
                        .to({ skewX: 5 * skew }, f, createjs.Ease.quadOut)
                        .to({ skewX: 0 * skew }, f, createjs.Ease.quadIn);
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
                    createjs.Tween.get(_this.imageContainer, { loop: true })
                        .to({ scaleX: 1 - scale, scaleY: 1 + scale }, time / 4, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 + scale, scaleY: 1 - scale }, time / 4, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 - scale, scaleY: 1 + scale }, time / 4, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 + scale, scaleY: 1 - scale }, time / 4, createjs.Ease.quadInOut)
                        .to({ scaleX: 1, scaleY: 1 }, time * 2, createjs.Ease.elasticOut);
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
                    createjs.Tween.get(_this.imageContainer, { loop: true })
                        .to({ scaleX: 1 + scale * 2, scaleY: 1 - scale * 2, y: 0 }, time / 2, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 - scale * 2, scaleY: 1 + scale * 2, y: 0 }, time / 4, createjs.Ease.quadIn)
                        .to({ scaleX: 1 + scale * 1, scaleY: 1 - scale * 1, y: -70 }, time / 4, createjs.Ease.quadOut)
                        .to({ scaleX: 1 - scale * 2, scaleY: 1 + scale * 2, y: 0 }, time / 5, createjs.Ease.quadIn)
                        .to({ scaleX: 1, scaleY: 1 }, time * 2, createjs.Ease.elasticOut);
                });
            };
            return JellyContainer;
        }(PIXI.Container));
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
                var _this = _super.call(this) || this;
                var b = gameui.AssetsManager.getBitmap("loadingBall");
                _this.addChild(b);
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
                    createjs.Tween.get(b, { loop: true })
                        .to({ skewX: skew * 10 }, f, createjs.Ease.quadOut)
                        .to({ skewX: skew * 0 }, f, createjs.Ease.quadIn)
                        .to({ skewX: skew * -10 }, f, createjs.Ease.quadOut)
                        .to({ skewX: skew * 0 }, f, createjs.Ease.quadIn);
                    createjs.Tween.get(b, { loop: true })
                        .to({ scaleX: 1 - scale, scaleY: 1 + scale }, f, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 + scale, scaleY: 1 - scale }, f, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 - scale, scaleY: 1 + scale }, f, createjs.Ease.quadInOut)
                        .to({ scaleX: 1 + scale, scaleY: 1 - scale }, f, createjs.Ease.quadInOut);
                });
                return _this;
            }
            return LoadingBall;
        }(PIXI.Container));
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
                    var _this = _super.call(this) || this;
                    _this.addObjects();
                    return _this;
                }
                GameHeader.prototype.addObjects = function () {
                    var _this = this;
                    var pauseButton = new gameui.ImageButton("BtPause", function () {
                        _this.dispatchEvent("pause");
                    });
                    this.pauseButton = pauseButton;
                    pauseButton.x = 157;
                    pauseButton.y = 215;
                    this.addChild(pauseButton);
                    var levelBarBorder = gameui.AssetsManager.getBitmap("bonus_border");
                    this.addChild(levelBarBorder);
                    levelBarBorder.x = 309;
                    levelBarBorder.y = 122;
                    var levelIcon = gameui.AssetsManager.getBitmap("bonus_icon");
                    levelIcon.x = 1288 + 213 / 2;
                    levelIcon.y = 90 + 243 / 2;
                    levelIcon.regX = 213 / 2;
                    levelIcon.regY = 243 / 2;
                    levelIcon.mouseEnabled = true;
                    this.levelIcon = levelIcon;
                    this.addChild(levelIcon);
                    levelIcon.addEventListener("click", function () { _this.levelUpEffect(); });
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
                    var levelBarContainer = new PIXI.Container();
                    levelBarContainer.x = 372;
                    levelBarContainer.y = 207;
                    this.addChild(levelBarContainer);
                    var levelBar = gameui.AssetsManager.getBitmap("bonus_bar");
                    this.levelBar = levelBar;
                    levelBarContainer.addChild(levelBar);
                    var mask = new PIXI.Graphics().beginFill(0xFF0000).drawPolygon([0, 0, 0, 67, 939, 67, 939, 0]).endFill();
                    levelBar.mask = mask;
                    mask.interactive = false;
                    mask.interactiveChildren = false;
                    levelBarContainer.addChild(mask);
                    this.levelBarMask = mask;
                    var levelTip = gameui.AssetsManager.getBitmap("powerTip");
                    levelTip.x = 372;
                    levelTip.y = 207;
                    levelTip.regX = 67 / 2;
                    levelTip.regY = 77 / 2;
                    this.levelTip = levelTip;
                    levelBarContainer.addChild(levelTip);
                };
                GameHeader.prototype.hideButtons = function () {
                    this.pauseButton.fadeOut();
                };
                GameHeader.prototype.showButtons = function () {
                    this.pauseButton.fadeIn();
                };
                GameHeader.prototype.hide = function () {
                    createjs.Tween.get(this).to({ y: -425 }, 200, createjs.Ease.quadIn);
                };
                GameHeader.prototype.show = function () {
                    this.visible = true;
                    this.alpha = 1;
                    createjs.Tween.get(this).to({ y: -0 }, 200, createjs.Ease.quadOut);
                };
                GameHeader.prototype.updateStatus = function (score, level, percent, emptyPercent, alarm) {
                    this.scoreText.text = StringResources.menus.score.toUpperCase() + " " + score.toString();
                    this.levelText.text = "Lv. " + level.toString();
                    var value = 1;
                    if (percent != undefined)
                        if (score != this.lastScore || typeof this.lastScore === 'undefined') {
                            value = percent / 100;
                            createjs.Tween.removeTweens(this.levelBarMask);
                            createjs.Tween.get(this.levelBarMask).to({ scaleX: value }, 1000, createjs.Ease.elasticOut);
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
                    createjs.Tween.removeTweens(this.levelBarMask);
                    createjs.Tween.get(this.levelBarMask).to({ scaleX: 1 }, 100, createjs.Ease.quadIn).call(function () { _this.levelBarMask.scaleX = 0; });
                    createjs.Tween.removeTweens(this.levelText);
                    this.levelText.set({ scaleY: 0, scaleX: 4 });
                    createjs.Tween.get(this.levelText).to({ scaleX: 1, scaleY: 1 }, 1000, createjs.Ease.elasticOut);
                    createjs.Tween.removeTweens(this.levelIcon);
                    this.levelIcon.set({ scaleY: 2, scaleX: 0.1 });
                    createjs.Tween.get(this.levelIcon).to({ scaleX: 1, scaleY: 1 }, 1000, createjs.Ease.elasticOut);
                };
                return GameHeader;
            }(PIXI.Container));
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
                function Jelly(value) {
                    var _this = _super.call(this) || this;
                    _this.effect = new joinjelly.view.Effect();
                    _this.addChild(_this.effect);
                    _this.effect.scaleX = _this.effect.scaleY = 1.2;
                    _this.effect.x = 0;
                    _this.effect.y = -100;
                    if (value)
                        _this.setNumber(value);
                    return _this;
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
                    var eye = new PIXI.Container();
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
                    var _this = this;
                    if (this.currentValue == value)
                        return;
                    if (value > joinjelly.JoinJelly.maxJelly)
                        value = joinjelly.JoinJelly.maxJelly;
                    if (this.currentValue > 0 && value > 0) {
                        this.executeAnimationOut(100);
                        setTimeout(function () {
                            _this.updateObjects(value);
                            _this.executeAnimationIn();
                        }, 100);
                    }
                    else {
                        this.updateObjects(value);
                        this.executeAnimationIn();
                    }
                    this.currentValue = value;
                };
                Jelly.prototype.updateObjects = function (value) {
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
                Jelly.prototype.playUltimateEffect = function () {
                    this.effect.alpha = 1;
                    this.effect.castUltimateEffect();
                };
                Jelly.prototype.playDistroyEffect = function () {
                    this.effect.alpha = 1;
                    this.effect.castDistroyEffect();
                };
                Jelly.prototype.playThunder = function () {
                    var _this = this;
                    setTimeout(function () { _this.playEvolve(); }, 10);
                    setTimeout(function () { _this.playLevelUp(); }, 330);
                    setTimeout(function () { _this.playEvolve(); }, 660);
                    setTimeout(function () { _this.playLevelUp(); }, 1000);
                    setTimeout(function () { _this.playLevelUp(); }, 1100);
                };
                return Jelly;
            }(joinjelly.view.JellyContainer));
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
                    return _super !== null && _super.apply(this, arguments) || this;
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
                    createjs.Tween.get(text)
                        .to({ y: defaultHeight / 2, alpha: 1 }, 200, createjs.Ease.quadOut)
                        .wait(500)
                        .to({ y: defaultHeight / 2 - 200, alpha: 0 }, 200, createjs.Ease.quadIn).call(function () {
                        _this.removeChild(text);
                    });
                    ;
                };
                return LevelIndicator;
            }(PIXI.Container));
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
                    var _this = _super.call(this) || this;
                    _this.ammount = 0;
                    _this.locked = false;
                    _this.item = item;
                    _this.addEventListener("click", function () {
                        _this.emit("useitem", { item: item });
                    });
                    var bg = gameui.AssetsManager.getBitmap("itemBg");
                    var bgd = gameui.AssetsManager.getBitmap("itemBgDisabled");
                    var img = gameui.AssetsManager.getBitmap("item" + item.charAt(0).toUpperCase() + item.slice(1));
                    var text = gameui.AssetsManager.getBitmapText("0", "debussy");
                    var name = gameui.AssetsManager.getBitmapText(StringResources.items[item], "debussy");
                    var add = gameui.AssetsManager.getBitmap("BtPlusMini");
                    _this.disabled = bgd;
                    _this.addChild(bg);
                    _this.addChild(bgd);
                    _this.addChild(img);
                    _this.addChild(text);
                    _this.addChild(name);
                    _this.addChild(add);
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
                    text.align = "center";
                    text.name = 'value';
                    name.scaleX = name.scaleY = 0.6;
                    name.y = 30;
                    name.x = 0;
                    name.pivot.x = name.getLocalBounds().width / 2;
                    name.align = "center";
                    name.name = 'value';
                    add.y = 0;
                    add.x = 55;
                    _this.text = text;
                    _this.createHitArea();
                    _this.addBt = add;
                    _this.addEventListener("click", function () { _this.unHighlight(); });
                    return _this;
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
                    createjs.Tween.get(this, { loop: loop })
                        .to({ rotation_d: -10, scaleX: 1, scaleY: 1 }, 100, createjs.Ease.quadInOut)
                        .to({ rotation_d: +10, scaleX: 1.3, scaleY: 1.3 }, 200, createjs.Ease.quadInOut)
                        .to({ rotation_d: -10, scaleX: 1.3, scaleY: 1.3 }, 200, createjs.Ease.quadInOut)
                        .to({ rotation_d: +10, scaleX: 1.3, scaleY: 1.3 }, 200, createjs.Ease.quadInOut)
                        .to({ rotation_d: 0, scaleX: 1, scaleY: 1 }, 100, createjs.Ease.quadInOut).wait(400);
                };
                ItemButton.prototype.unHighlight = function () {
                    createjs.Tween.removeTweens(this);
                    this.set({ rotation_d: 0, scaleX: 1, scaleY: 1 });
                };
                ItemButton.prototype.updateColor = function () {
                    if (this.locked || this.ammount <= 0)
                        this.disabled.visible = true;
                    else
                        this.disabled.visible = false;
                };
                return ItemButton;
            }(gameui.Button));
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
            var PauseMenuOverlay = (function (_super) {
                __extends(PauseMenuOverlay, _super);
                function PauseMenuOverlay() {
                    var _this = _super.call(this) || this;
                    _this.AddBG(1000);
                    _this.addTitle(StringResources.menus.pause);
                    _this.addButtons();
                    _this.visible = false;
                    return _this;
                }
                PauseMenuOverlay.prototype.addButtons = function () {
                    var _this = this;
                    var playBt = new gameui.ImageButton("BtPlay", (function () {
                        _this.dispatchEvent("play");
                    }));
                    playBt.set({ x: 157, y: 215, scaleX: 0.5, scaleY: 0.5 });
                    this.addChild(playBt);
                    var home = new gameui.ImageButton("BtHome", (function () {
                        _this.dispatchEvent("home");
                    }));
                    home.set({ x: 157, y: 215 + 300 });
                    this.addChild(home);
                    var restart = new gameui.ImageButton("BtRestart", (function () {
                        _this.dispatchEvent("restart");
                    }));
                    restart.set({ x: 157, y: 215 + 600 });
                    this.addChild(restart);
                };
                PauseMenuOverlay.prototype.hide = function () {
                    this.fadeOut();
                };
                PauseMenuOverlay.prototype.show = function () {
                    this.fadeIn();
                };
                PauseMenuOverlay.prototype.AddBG = function (heigth) {
                    if (heigth === void 0) { heigth = 1022; }
                    var dk = gameui.AssetsManager.getBitmap("popupdark");
                    this.addChild(dk);
                    dk.scaleX = dk.scaleY = 16;
                    dk.x = -defaultWidth / 2;
                    dk.y = -defaultHeight / 2;
                    dk.mouseEnabled = false;
                };
                PauseMenuOverlay.prototype.addTitle = function (title) {
                    this.title = gameui.AssetsManager.getBitmapText("", "debussyBig");
                    this.title.set({ x: defaultWidth / 2, y: 350 });
                    this.addChild(this.title);
                    this.setTitle(title);
                };
                PauseMenuOverlay.prototype.setTitle = function (title) {
                    this.title.text = title.toUpperCase();
                    this.title.regX = this.title.getBounds().width / 2;
                };
                return PauseMenuOverlay;
            }(gameui.UIItem));
            view.PauseMenuOverlay = PauseMenuOverlay;
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
                    var _this = _super.call(this) || this;
                    _this.value = 1;
                    _this.initializeObjects();
                    return _this;
                }
                TimeBar.prototype.initializeObjects = function () {
                    var percentBar = new PIXI.Container();
                    var bar = gameui.AssetsManager.getBitmap("time_bar");
                    var bright = gameui.AssetsManager.getBitmap("time_bar_bright");
                    var red = gameui.AssetsManager.getBitmap("time_bar_red");
                    bright.alpha = 0;
                    this.redFx = red;
                    this.brightFx = bright;
                    createjs.Tween.get(this.redFx, { loop: true }).to({ alpha: 0 }, 500);
                    percentBar.addChild(bar);
                    percentBar.addChild(bright);
                    percentBar.addChild(red);
                    this.addChild(percentBar);
                };
                TimeBar.prototype.setPercent = function (percent, alarm) {
                    if (this.value < percent)
                        this.incrasePercentEffect();
                    this.value = percent;
                    createjs.Tween.removeTweens(this.percentBarMask);
                    createjs.Tween.get(this.percentBarMask).to({ scaleX: percent }, 200, createjs.Ease.quadInOut);
                    if (alarm)
                        this.setAlarmOn();
                    else
                        this.setAlarmOff();
                };
                TimeBar.prototype.incrasePercentEffect = function () {
                    createjs.Tween.get(this.brightFx).to({ alpha: 1 }).to({ alpha: 0 }, 300);
                };
                TimeBar.prototype.setAlarmOn = function () { this.redFx.visible = true; };
                TimeBar.prototype.setAlarmOff = function () { this.redFx.visible = false; };
                return TimeBar;
            }(PIXI.Container));
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
                    var _this = _super.call(this, StringResources.menus.gameOver, 1250) || this;
                    _this.top -= 200;
                    _this.addPoints();
                    _this.addLastJelly();
                    _this.addButtons();
                    _this.specialOffer = new PIXI.Container();
                    _this.specialOffer.set({ x: defaultWidth / 2, y: 2050 });
                    _this.addChild(_this.specialOffer);
                    return _this;
                }
                FinishMenu.prototype.addButtons = function () {
                    var _this = this;
                    var close = new gameui.ImageButton("BtMinimize", (function () {
                        _this.dispatchEvent("minimize");
                    }));
                    close.set({ x: 1350, y: 660 });
                    this.addChild(close);
                    var home = new gameui.ImageButton("BtHome", (function () {
                        _this.dispatchEvent("home");
                    }));
                    home.set({ x: 353, y: 1780 });
                    this.addChild(home);
                    var restart = new gameui.ImageButton("BtRestart", (function () {
                        _this.dispatchEvent("restart");
                    }));
                    restart.set({ x: 353 + 300, y: 1780 });
                    this.addChild(restart);
                };
                FinishMenu.prototype.addPoints = function () {
                    var container = new PIXI.Container();
                    var bg = gameui.AssetsManager.getBitmap("FlyGroup");
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
                    container.y += 275;
                    this.addChild(container);
                    return container;
                };
                FinishMenu.prototype.addLastJelly = function () {
                    var container = new PIXI.Container();
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
                    tx.pivot.x = tx.getLocalBounds().width / 2;
                    container.y += 200;
                    return container;
                };
                FinishMenu.prototype.setValues = function (score, highScore, jelly, title) {
                    var _this = this;
                    if (jelly > joinjelly.JoinJelly.maxJelly)
                        jelly = joinjelly.JoinJelly.maxJelly;
                    if (title)
                        this.setTitle(title);
                    var t = { value: 0 };
                    createjs.Tween.get(t).to({ value: 1 }, 3000, createjs.Ease.quadOut);
                    var interval = setInterval(function () {
                        _this.scoreText.text = Math.floor(t.value * score).toString();
                        _this.scoreText.regX = _this.scoreText.getLocalBounds().width / 2;
                        if (t.value >= 1)
                            clearInterval(interval);
                    }, 30);
                    this.highScoreText.text = StringResources.menus.highScore + ": " + highScore.toString();
                    this.jelly.setNumber(jelly);
                    this.jellyText.text = StringResources.jellies[jelly].name;
                    if (this.jellyText.getBounds())
                        this.jellyText.regX = this.jellyText.getBounds().width / 2;
                };
                FinishMenu.prototype.showShareButton = function () {
                    var _this = this;
                    this.ClearSpecialOffer();
                    var bt = new gameui.BitmapTextButton(StringResources.menus.share, "debussy", "BtTextBgBlue", function () {
                        _this.dispatchEvent("share");
                    });
                    bt.addChild(gameui.AssetsManager.getBitmap("itemPack").set({ x: -400, y: -50, regX: 307 / 2, regY: 274 / 2, scaleX: 0.6, scaleY: 0.6 }));
                    bt.addChild(gameui.AssetsManager.getBitmap("BtPlusMini").set({ x: -500, y: -100, regX: 63 / 2, regY: 66 / 2, scaleX: 1.5, scaleY: 1.5 }));
                    this.specialOffer.addChild(bt);
                };
                FinishMenu.prototype.showLikeButton = function () {
                    var _this = this;
                    this.ClearSpecialOffer();
                    var bt = new gameui.BitmapTextButton(StringResources.menus.like, "debussy", "BtTextBgBlue", function () {
                        _this.dispatchEvent("like");
                    });
                    bt.addChild(gameui.AssetsManager.getBitmap("itemPack").set({ x: -400, y: -50, regX: 307 / 2, regY: 274 / 2, scaleX: 0.6, scaleY: 0.6 }));
                    bt.addChild(gameui.AssetsManager.getBitmap("BtPlusMini").set({ x: -500, y: -100, regX: 63 / 2, regY: 66 / 2, scaleX: 1.5, scaleY: 1.5 }));
                    this.specialOffer.addChild(bt);
                };
                FinishMenu.prototype.showWhatchVideoButton = function () {
                    var _this = this;
                    this.ClearSpecialOffer();
                    var bt = new gameui.BitmapTextButton(StringResources.menus.watchVideo, "debussy", "BtTextBgBlue", function () {
                        _this.dispatchEvent("watch");
                    });
                    bt.addChild(gameui.AssetsManager.getBitmap("itemPack").set({ x: -400, y: -50, regX: 307 / 2, regY: 274 / 2, scaleX: 0.6, scaleY: 0.6 }));
                    bt.addChild(gameui.AssetsManager.getBitmap("BtPlusMini").set({ x: -500, y: -100, regX: 63 / 2, regY: 66 / 2, scaleX: 1.5, scaleY: 1.5 }));
                    bt.bitmapText.set({ scaleX: 0.9 });
                    this.specialOffer.addChild(bt);
                };
                FinishMenu.prototype.showGiftTimeout = function (minutes) {
                    this.ClearSpecialOffer();
                    var bt = new gameui.BitmapTextButton(StringResources.menus.gift.replace("@", minutes.toString()), "debussy", "", function () { });
                    bt.mouseEnabled = false;
                    this.specialOffer.addChild(bt);
                };
                FinishMenu.prototype.showGiftLoading = function () {
                    this.ClearSpecialOffer();
                    var bt = new gameui.BitmapTextButton(StringResources.menus.loading, "debussy", "", function () { });
                    bt.mouseEnabled = false;
                    this.specialOffer.addChild(bt);
                };
                FinishMenu.prototype.showGiftLoadingError = function () {
                    var _this = this;
                    this.ClearSpecialOffer();
                    var bt = new gameui.BitmapTextButton(StringResources.menus.errorAds, "debussy", "", function () { _this.dispatchEvent("reload"); });
                    bt.mouseEnabled = false;
                    this.specialOffer.addChild(bt);
                };
                FinishMenu.prototype.ClearSpecialOffer = function () {
                    this.specialOffer.removeAllChildren();
                };
                FinishMenu.prototype.showRandomItem = function (callback) {
                    this.ClearSpecialOffer();
                    var randomItem = new view.RandomItemSelector();
                    this.specialOffer.addChild(randomItem);
                    randomItem.random();
                    randomItem.onComplete = function (item) {
                        callback(item);
                    };
                };
                return FinishMenu;
            }(joinjelly.menus.view.FlyOutMenu));
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
                    var _this = _super.call(this) || this;
                    _this.fingerUp = gameui.AssetsManager.getBitmap("tutorialFinger");
                    _this.fingerDown = gameui.AssetsManager.getBitmap("tutorialFingerDown");
                    _this.addChild(_this.fingerUp);
                    _this.addChild(_this.fingerDown);
                    _this.fingerDown.y = 17;
                    _this.regX = 180;
                    _this.mouseEnabled = false;
                    _this.visible = false;
                    return _this;
                }
                TutorialMove.prototype.showMove = function (x1, y1, x2, y2) {
                    var _this = this;
                    this.visible = true;
                    this.x = x1;
                    this.y = y1;
                    this.alpha = 0;
                    this.fu();
                    createjs.Tween.removeTweens(this);
                    createjs.Tween.get(this, { loop: true })
                        .to({ alpha: 1 }, 500).call(function () { _this.fd(); })
                        .to({ x: x2, y: y2 }, 1600, createjs.Ease.quadInOut).call(function () { _this.fu(); })
                        .to({ alpha: 0 }, 500);
                };
                TutorialMove.prototype.showClick = function (x1, y1) {
                    var _this = this;
                    this.visible = true;
                    this.x = x1;
                    this.y = y1;
                    this.alpha = 1;
                    this.fu();
                    createjs.Tween.removeTweens(this);
                    createjs.Tween.get(this, { loop: true })
                        .wait(500).call(function () { _this.fd(); })
                        .wait(1000).call(function () { _this.fu(); });
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
            }(PIXI.Container));
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
                    var _this = _super.call(this, function () {
                        _this.fadeOut();
                        _this.dispatchEvent("closed");
                        gameui.AudiosManager.playSound("Interface Sound-15");
                    }) || this;
                    _this.addChild(gameui.AssetsManager.getBitmap("ballon"));
                    _this.visible = false;
                    _this.regX = 316;
                    _this.regY = 366;
                    _this.x = 164 + _this.regX;
                    _this.y = 941 + _this.regY;
                    var t = gameui.AssetsManager.getBitmapText("", "debussy");
                    _this.addChild(t);
                    t.scaleX = t.scaleY = 0.8;
                    t.x = 50;
                    t.y = 50;
                    _this.bitmapText = t;
                    t.mouseEnabled = false;
                    return _this;
                }
                TutoralMessage.prototype.show = function (text) {
                    this.bitmapText.text = text;
                    this.fadeIn();
                    gameui.AudiosManager.playSound("Interface Sound-14");
                };
                return TutoralMessage;
            }(gameui.Button));
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
                var _this = _super.call(this) || this;
                _this.touchDictionary = new Array();
                _this.alarming = false;
                _this.tiles = [];
                _this.boardHeight = boardHeight;
                _this.boardWidth = boardWidth;
                _this.tileSize = tileSize;
                _this.tilesContainer = new PIXI.Container();
                _this.addChild(_this.tilesContainer);
                var hitArea = new PIXI.Rectangle(-200, -500, defaultWidth + 400, defaultHeight + 600);
                _this.tilesContainer.hitArea = hitArea;
                _this.addTiles(boardWidth, boardHeight, tileSize, img);
                _this.addMouseEvents();
                _this.pivot.x = (boardWidth * tileSize / 2);
                _this.pivot.y = (boardHeight * tileSize / 2);
                return _this;
            }
            Board.prototype.addTiles = function (boardWidth, boardHeight, tileSize, img) {
                for (var x = 0; x < boardWidth; x++)
                    for (var y = 0; y < boardHeight; y++)
                        this.addTile(x, y, tileSize);
            };
            Board.prototype.addTile = function (x, y, tileSize) {
                var bg = gameui.AssetsManager.getBitmap("hex");
                this.tilesContainer.addChild(bg);
                bg.pivot.x = 358 / 2;
                bg.pivot.y = 0;
                bg.alpha = 0.15;
                bg.set(this.getTilePositionByCoords(x, y, tileSize, 0));
                var tileDO = new gameplay.Tile(x, y, tileSize);
                tileDO.background = bg;
                this.tiles.push(tileDO);
                this.tilesContainer.addChild(tileDO);
                tileDO.setNumber(0);
                tileDO.name = (this.boardWidth * y + x).toString();
                tileDO.set(this.getTilePositionByCoords(x, y, tileSize));
            };
            Board.prototype.addMouseEvents = function () {
                this.touchOffset = new Array();
                this.touchDeltas = new Array();
                this.tilesContainer.on("pointerdown", this.boardTouchStart, this);
                this.tilesContainer.on("pointermove", this.boardTouchMove, this);
                this.tilesContainer.on("pointerup", this.boardTouchEnd, this);
                this.tilesContainer.on("pointerupoutside", this.boardTouchEnd, this);
            };
            Board.prototype.boardTouchStart = function (e) {
                var pid = this.getPointerId(e);
                var pos = e.data.getLocalPosition(this);
                var tile = this.getTileByRawPos(pos.x, pos.y, this.tileSize);
                if (tile && tile.isUnlocked() && tile.isEnabled()) {
                    tile.lock();
                    this.touchDictionary[pid] = tile;
                    this.touchOffset[pid] = { x: tile.x - pos.x, y: tile.y - pos.y };
                    tile.drag();
                    this.tilesContainer.setChildIndex(tile, this.tilesContainer.children.length - 1);
                    gameui.AudiosManager.playSound('soundh_1');
                }
            };
            Board.prototype.boardTouchMove = function (e) {
                var delta = Date.now() - this.touchDeltas[pid];
                if (delta < 15)
                    return;
                var pid = this.getPointerId(e);
                var pos = e.data.getLocalPosition(this);
                this.touchDeltas[pid] = Date.now();
                var tile = this.touchDictionary[pid];
                if (tile) {
                    var LocalPosition = e.data.getLocalPosition(this);
                    tile.x = LocalPosition.x + this.touchOffset[pid].x;
                    tile.y = LocalPosition.y + this.touchOffset[pid].y;
                    tile.lock();
                    var target = this.getTileByRawPos(pos.x, pos.y, this.tileSize);
                    if (target && target.name.toString() != tile.name && target.isUnlocked()) {
                        this.emit("dragging", { originTile: tile, targetTile: target });
                    }
                }
            };
            Board.prototype.boardTouchEnd = function (e) {
                var pid = this.getPointerId(e);
                var tile = this.getTileFromTouchId(pid);
                if (tile && tile instanceof gameplay.Tile) {
                    tile.release();
                    this.releaseDrag(tile);
                }
            };
            Board.prototype.getPointerId = function (e) {
                var pid = e.data["identifier"] || e.data.originalEvent["pointerId"] || 0;
                return pid;
            };
            Board.prototype.setTiles = function (tiles) {
                this.unlock();
                for (var t = 0; t < tiles.length; t++) {
                    this.setTileValue(t, tiles[t]);
                    this.getTileById(t).unlock();
                    this.getTileById(t).enable();
                }
            };
            Board.prototype.setTileValue = function (tileId, value) {
                var tile = this.getTileById(tileId);
                this.resetTile(tile);
                if (tile)
                    tile.setNumber(value);
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
                for (var id in this.touchDictionary)
                    this.releaseDrag(this.getTileFromTouchId(id));
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
                    if (!this.tiles[t].isUnlocked() && !this.tiles[t].isDragging())
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
                    if (neighborCoords[p].x >= 0 &&
                        neighborCoords[p].y >= 0 &&
                        neighborCoords[p].x < this.boardWidth &&
                        neighborCoords[p].y < this.boardHeight)
                        neighbor.push(this.getTileByIndex(neighborCoords[p].x, neighborCoords[p].y));
                return neighbor;
            };
            Board.prototype.getPercentEmptySpaces = function () {
                var total = this.boardHeight * this.boardWidth;
                var empty = this.getEmptyTiles().length;
                return empty / total;
            };
            Board.prototype.releaseDrag = function (tile, target) {
                var _this = this;
                this.removeTileFromTouchDictionary(tile);
                createjs.Tween.removeTweens(tile);
                if (target) {
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
            Board.prototype.lock = function () { this.tilesContainer.interactive = false; };
            Board.prototype.unlock = function () { this.tilesContainer.interactive = true; };
            Board.prototype.removeTileFromTouchDictionary = function (tile) {
                for (var id in this.touchDictionary) {
                    if (this.touchDictionary[id] == tile) {
                        delete this.touchDictionary[id];
                        continue;
                    }
                }
            };
            Board.prototype.getTileFromTouchId = function (touchId) {
                return this.touchDictionary[touchId];
            };
            Board.prototype.arrangeZOrder = function () {
                for (var t = 0; t < this.tiles.length; t++)
                    this.tilesContainer.setChildIndex(this.tiles[t], this.tilesContainer.children.length - 1);
            };
            Board.prototype.match = function (origin, target) {
                this.releaseDrag(origin, target);
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
                createjs.Tween.get(tile).wait(delay).to({ x: posx, y: posy, alpha: alpha }, time, createjs.Ease.quadIn).call(function () {
                    _this.resetTile(tile);
                    _this.arrangeZOrder();
                });
            };
            Board.prototype.resetTile = function (tile) {
                createjs.Tween.removeTweens(tile);
                tile.scale.y = tile.scale.x = 1;
                tile.set(this.getTilePositionByCoords(tile.posx, tile.posy, this.tileSize));
                tile.unlock();
                tile.alpha = 1;
            };
            Board.prototype.levelUpEffect = function () {
                var _this = this;
                var currentTile = 0;
                for (var t = 0; t < this.tiles.length; t++) {
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
                for (var t = 0; t < this.tiles.length; t++) {
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
                    createjs.Tween.get(this.tilesContainer, { loop: true })
                        .to({ x: -10 }, 50)
                        .to({ x: +10 }, 100)
                        .to({ x: -10 }, 100)
                        .to({ x: 0 }, 50)
                        .wait(200);
                }
                else {
                    if (!this.alarming)
                        return;
                    createjs.Tween.removeTweens(this.tilesContainer);
                }
                this.alarming = alarm;
            };
            return Board;
        }(PIXI.Container));
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
                var _this = _super.call(this) || this;
                _this.tileSize = tileSize;
                _this.posx = posx;
                _this.posy = posy;
                _this.regX = _this.regY = tileSize / 2;
                _this.jelly = new gameplay.view.Jelly();
                _this.jelly.x = tileSize / 2;
                _this.jelly.y = tileSize;
                _this.jelly.scaleX = _this.jelly.scaleY = _this.tileSize / (450);
                _this.addChild(_this.jelly);
                return _this;
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
            Tile.prototype.isUnlocked = function () { return !this.locked; };
            Tile.prototype.isDragging = function () { return this.dragging; };
            Tile.prototype.lock = function () { this.locked = true; };
            Tile.prototype.unlock = function () {
                this.locked = false;
                this.dragging = false;
                this.jelly.setNumber(this.value);
            };
            Tile.prototype.enable = function () { this.enabled = true; };
            Tile.prototype.disable = function () { this.enabled = false; };
            Tile.prototype.isEnabled = function () { return this.enabled; };
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
        }(PIXI.Container));
        gameplay.Tile = Tile;
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var GamePlayScreen = (function (_super) {
            __extends(GamePlayScreen, _super);
            function GamePlayScreen(userData, itemData) {
                var _this = _super.call(this) || this;
                _this.matches = 0;
                _this.reviveCost = 1;
                _this.userData = userData;
                _this.itemData = itemData;
                _this.score = 0;
                _this.createBackground();
                _this.createBoard();
                _this.createGUI();
                _this.createEffects();
                _this.start();
                _this.loadGame();
                if (_this.userData && !_this.userData.getHistory("firstPlay")) {
                    _this.itemData.setItemAmmount(joinjelly.Items.REVIVE, 1);
                    _this.itemData.setItemAmmount(joinjelly.Items.TIME, 2);
                    _this.itemData.setItemAmmount(joinjelly.Items.FAST, 2);
                    _this.itemData.setItemAmmount(joinjelly.Items.CLEAN, 2);
                    _this.itemData.setItemAmmount(joinjelly.Items.LUCKY, 0);
                    _this.userData.history("firstPlay");
                }
                AdsServices.load();
                return _this;
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
                this.board = new gameplay.Board(gameplay.boardSize, gameplay.boardSize, 1536 / 5, true);
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
                this.updateItemAmmountOnFooter();
                this.gameFooter.addEventListener("useitem", function (e) { _this.useItem(e.item); });
                this.finishMenu = new gameplay.view.FinishMenu();
                this.overlay.addChild(this.finishMenu);
                this.finishMenu.y = -200;
                this.pauseMenuOverlay = new gameplay.view.PauseMenuOverlay();
                this.header.addChild(this.pauseMenuOverlay);
                this.gameMessage = new gameplay.view.TutoralMessage();
                this.content.addChild(this.gameMessage);
                this.countDown = new gameplay.view.CountDown();
                this.content.addChild(this.countDown);
                this.countDown.x = defaultWidth / 2;
                this.countDown.y = defaultHeight / 2;
                var tbt = new gameui.ImageButton("BtMenu", function () {
                    _this.finishMenu.show();
                    _this.gameHeader.hide();
                    tbt.fadeOut();
                    gameui.AudiosManager.playSound("Interface Sound-06");
                });
                tbt.set({ x: defaultWidth - 150, y: -150, visible: false });
                this.footer.addChild(tbt);
                this.showBoardButton = tbt;
                this.finishMenu.addEventListener("restart", function () {
                    _this.pauseMenuOverlay.hide();
                    if (_this.userData)
                        _this.userData.deleteSaveGame();
                    setTimeout(function () { joinjelly.JoinJelly.startLevel(); }, 200);
                });
                this.finishMenu.addEventListener("home", function () {
                    if (_this.userData)
                        _this.userData.deleteSaveGame();
                    _this.userData.setScore(Math.max(_this.score, _this.userData.getHighScore()));
                    joinjelly.JoinJelly.showMainScreen();
                });
                this.finishMenu.addEventListener("minimize", function () {
                    _this.finishMenu.hide();
                    _this.gameHeader.show();
                    tbt.fadeIn();
                });
                this.finishMenu.addEventListener("share", function () {
                    var callback = function (error) {
                        console.log("share callback");
                        var sucess = true;
                        console.log(JSON.stringify(error));
                        if (error)
                            sucess = false;
                        if (sucess) {
                            _this.userData.history("shared");
                            _this.itemData.increaseItemAmmount(joinjelly.Items.REVIVE, 1);
                            _this.itemData.increaseItemAmmount(joinjelly.Items.CLEAN, 1);
                            _this.itemData.increaseItemAmmount(joinjelly.Items.FAST, 1);
                            _this.itemData.increaseItemAmmount(joinjelly.Items.TIME, 1);
                            _this.updateItemAmmountOnFooter();
                            _this.finishMenu.ClearSpecialOffer();
                            console.log("shareded");
                            _this.showSpecialOffer();
                            setTimeout(function () {
                                _this.animateItemFromPos(defaultWidth / 2, defaultHeight / 5 * 4, "Pack");
                                gameui.AudiosManager.playSound("Interface Sound-11");
                            }, 1000);
                        }
                    };
                    var message = {
                        shareDescription: StringResources.social.shareDescription,
                        gameWebsiteIcon: gameWebsiteIcon,
                        gameWebsite: gameWebsite,
                        shareTitle: StringResources.social.shareTitle,
                        shareCaption: StringResources.social.shareCaption
                    };
                    SocialServices.sendMessage(message, callback);
                });
                this.finishMenu.addEventListener("like", function () {
                    DeviceServices.openURL(StringResources.menus.fbURL);
                    _this.userData.history("liked");
                    _this.itemData.increaseItemAmmount(joinjelly.Items.REVIVE, 1);
                    _this.itemData.increaseItemAmmount(joinjelly.Items.CLEAN, 1);
                    _this.itemData.increaseItemAmmount(joinjelly.Items.FAST, 1);
                    _this.itemData.increaseItemAmmount(joinjelly.Items.TIME, 1);
                    _this.updateItemAmmountOnFooter();
                    _this.finishMenu.ClearSpecialOffer();
                    console.log("liked");
                    setTimeout(function () {
                        _this.animateItemFromPos(defaultWidth / 2, defaultHeight / 5 * 4, "Pack");
                        gameui.AudiosManager.playSound("Interface Sound-11");
                    }, 1000);
                    setTimeout(function () {
                        _this.showSpecialOffer();
                    }, 4000);
                });
                this.finishMenu.addEventListener("watch", function () {
                    _this.updateItemAmmountOnFooter();
                    _this.finishMenu.ClearSpecialOffer();
                    console.log("watched");
                    _this.userData.history("watched", Date.now());
                    AdsServices.show(function () {
                        _this.finishMenu.showRandomItem(function (item) {
                            if (item) {
                                gameui.AudiosManager.playSound("Interface Sound-11");
                                _this.itemData.increaseItemAmmount(item, 1);
                                _this.animateItemFromPos(defaultWidth / 2, defaultHeight / 5 * 4, item);
                            }
                            setTimeout(function () { _this.showSpecialOffer(); }, 1000);
                        });
                    });
                });
                this.finishMenu.addEventListener("reloadAds", function () {
                    _this.showSpecialOffer();
                });
                this.gameHeader.addEventListener("pause", function () {
                    _this.pauseGame();
                });
                this.gameHeader.addEventListener("play", function () {
                    _this.continueGame();
                });
                this.pauseMenuOverlay.addEventListener("play", function () {
                    _this.continueGame();
                });
                this.pauseMenuOverlay.addEventListener("test", function () {
                    _this.selfPeformanceTest(false);
                });
                this.pauseMenuOverlay.addEventListener("testFast", function () {
                    _this.selfPeformanceTest(true);
                });
                this.pauseMenuOverlay.addEventListener("home", function () {
                    _this.pauseMenuOverlay.hide();
                    _this.userData.setScore(Math.max(_this.score, _this.userData.getHighScore()));
                    if (_this.userData)
                        _this.userData.deleteSaveGame();
                    setTimeout(function () { joinjelly.JoinJelly.showMainScreen(); }, 200);
                });
                this.gameHeader.addEventListener("restart", function () {
                    _this.pauseMenuOverlay.hide();
                    if (_this.userData)
                        _this.userData.deleteSaveGame();
                    setTimeout(function () { joinjelly.JoinJelly.startLevel(); }, 200);
                });
                this.pauseMenuOverlay.addEventListener("restart", function () {
                    _this.pauseMenuOverlay.hide();
                    _this.userData.deleteSaveGame();
                    setTimeout(function () { joinjelly.JoinJelly.startLevel(); }, 200);
                });
                this.onback = function () {
                    if (_this.gamestate == GameState.paused)
                        _this.continueGame();
                    else if (_this.gamestate == GameState.playing)
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
                _super.prototype.activate.call(this, parameters);
                this.gameHeader.show();
                this.updateItemAmmountOnFooter();
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
                this.gameHeader.showButtons();
                this.reviveCost = 1;
                gameui.AudiosManager.playMusic("music1");
                this.gamestate = GameState.playing;
                this.step(500);
                joinjelly.JoinJelly.analytics.logGameStart();
                if (this.userData)
                    this.userData.addOneMorePlay();
                this.highJellySave(1);
            };
            GamePlayScreen.prototype.step = function (timeout) {
                var _this = this;
                clearTimeout(gameplay.timeoutInterval);
                gameplay.timeoutInterval = setTimeout(function () {
                    if (_this.gamestate == GameState.playing)
                        _this.gameInteraction();
                    if (_this.gamestate != GameState.ended)
                        _this.step(_this.getTimeInterval(_this.level, gameplay.initialInterval, gameplay.finalInterval, gameplay.easeInterval));
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
                if (this.gamestate == GameState.standBy)
                    return;
                if (this.gamestate == GameState.ended)
                    return;
                this.gamestate = GameState.paused;
                this.board.lock();
                this.gameFooter.lockAll();
                this.pauseMenuOverlay.show();
                this.gameHeader.hideButtons();
            };
            GamePlayScreen.prototype.continueGame = function () {
                var _this = this;
                this.pauseMenuOverlay.hide();
                this.gameHeader.hideButtons();
                this.gamestate = GameState.standBy;
                this.board.lock();
                setTimeout(function () {
                    _this.gamestate = GameState.playing;
                    _this.board.unlock();
                    _this.gameHeader.interactiveChildren = true;
                    _this.content.mouseEnabled = true;
                    _this.gameFooter.unlockAll();
                    _this.gameHeader.showButtons();
                }, 3200);
                this.countDown.countDown(3);
            };
            GamePlayScreen.prototype.endGame = function (message, win) {
                var _this = this;
                this.view.setChildIndex(this.footer, this.view.children.length - 1);
                this.gamestate = GameState.standBy;
                var score = this.score;
                var highScore = this.userData.getHighScore();
                var highJelly = this.board.getHighestTileValue();
                this.pauseMenuOverlay.hide();
                this.board.lock();
                this.board.setAlarm(false);
                this.board.releaseAll();
                this.gameHeader.interactiveChildren = false;
                this.gameFooter.mouseEnabled = false;
                this.gameHeader.hide();
                this.gameHeader.hideButtons();
                createjs.Tween.get(this.gameFooter).to({ y: +300 }, 200, createjs.Ease.quadIn);
                this.showSpecialOffer();
                setTimeout(function () {
                    if (win)
                        _this.gamestate = GameState.win;
                    else
                        _this.gamestate = GameState.ended;
                    _this.finishMenu.show();
                    _this.gameFooter.mouseEnabled = true;
                    _this.gameFooter.showContinue(_this.reviveCost);
                    _this.updateItemAmmountOnFooter();
                    createjs.Tween.get(_this.gameFooter).to({ y: 0 }, 200, createjs.Ease.quadIn);
                    _this.userData.setScore(Math.max(score, _this.userData.getHighScore()));
                    joinjelly.JoinJelly.gameServices.submitScore(score);
                }, 1200);
                this.finishMenu.setValues(score, this.userData.getHighScore(), highJelly, message);
                if (win)
                    joinjelly.JoinJelly.analytics.logWinGame(this.level, highJelly, this.matches, Date.now() - this.time);
                else
                    joinjelly.JoinJelly.analytics.logEndGame(this.level, highJelly, this.matches, Date.now() - this.time);
                gameui.AudiosManager.playSound("end");
                this.board.endGameEffect();
            };
            GamePlayScreen.prototype.showSpecialOffer = function () {
                var _this = this;
                var minutes = 30;
                if (!this.userData.getHistory("purchased")) {
                    if (!this.userData.getHistory("watched") ||
                        this.userData.getHistory("watched") + minutes * 60000 < Date.now()) {
                        if (AdsServices.isReady()) {
                            this.finishMenu.showWhatchVideoButton();
                        }
                        else {
                            AdsServices.load();
                            this.finishMenu.showGiftLoading();
                            var timeOut = 30;
                            var interval = setInterval(function () {
                                timeOut--;
                                if (AdsServices.isReady()) {
                                    _this.finishMenu.showWhatchVideoButton();
                                    clearInterval(interval);
                                }
                                if (timeOut <= 0) {
                                    clearInterval(interval);
                                    _this.finishMenu.showGiftLoadingError();
                                }
                            }, 1000);
                            return;
                        }
                    }
                    else {
                        console.log("timeout or share");
                        if (!this.showShareOrLike()) {
                            var minutes = Math.floor((this.userData.getHistory("watched") + minutes * 1000 * 60 - Date.now()) / 60000);
                            this.finishMenu.showGiftTimeout(minutes);
                            setTimeout(function () { _this.showSpecialOffer(); }, 60000);
                        }
                    }
                }
                else
                    this.showShareOrLike();
            };
            GamePlayScreen.prototype.showShareOrLike = function () {
                if (!this.userData.getHistory("liked")) {
                    this.finishMenu.showLikeButton();
                    console.log("like shown");
                    return true;
                }
                if (!this.userData.getHistory("shared") && SocialServices.isAvaliable()) {
                    this.finishMenu.showShareButton();
                    console.log("share shown");
                    return true;
                }
                return false;
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
                    var interval = this.getTimeInterval(level, gameplay.initialInterval, gameplay.finalInterval, gameplay.easeInterval);
                    var levelMoves = gameplay.timeByLevel / interval;
                    totalMoves += levelMoves;
                    level++;
                }
                return Math.max(level, 1);
            };
            GamePlayScreen.prototype.getMovesByLevel = function (level) {
                var totalMoves = 0;
                for (var calculatedLevel = 0; calculatedLevel < level; calculatedLevel++) {
                    var interval = this.getTimeInterval(calculatedLevel, gameplay.initialInterval, gameplay.finalInterval, gameplay.easeInterval);
                    var levelMoves = gameplay.timeByLevel / interval;
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
                for (var i = 10; i < this.level; i++)
                    if (Math.random() < gameplay.increasingJellyValuePerLevel)
                        JellyValue *= 2;
                if (JellyValue > joinjelly.JoinJelly.maxJelly)
                    JellyValue = joinjelly.JoinJelly.maxJelly;
                this.addRandomTileOnBoard(JellyValue);
                this.addRandomDirtyOnBoard();
                this.saveGame();
            };
            GamePlayScreen.prototype.addRandomDirtyOnBoard = function () {
                var _this = this;
                if (this.getDirtyProbabilityByLevel(this.level, gameplay.initialDirtyProbability, gameplay.finalDirtyProbability, gameplay.easeDirtyProbability) > Math.random())
                    setTimeout(function () { _this.addRandomTileOnBoard(-1); }, 500);
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
                    this.winGame(target);
                else
                    target.setNumber(newValue);
                this.updateCurrentLevel();
                this.saveGame();
                if (!this.canMove())
                    this.step(0);
                this.cleanNearDirty(target);
                return true;
            };
            GamePlayScreen.prototype.winGame = function (target) {
                var _this = this;
                target.setNumber(0);
                target.jelly.playUltimateEffect();
                this.board.endGameEffect();
                setTimeout(function () { _this.board.cleanBoard(); }, 200);
                gameui.AudiosManager.playSound("evolve");
            };
            GamePlayScreen.prototype.cleanNearDirty = function (target) {
                var neighborTiles = this.board.getNeighborTiles(target);
                for (var t in neighborTiles) {
                    var tile = neighborTiles[t];
                    if (tile && tile.getNumber() < 0) {
                        var posx = target.x + (tile.x - target.x) * 1.6;
                        var posy = target.y + (tile.y - target.y) * 1.6;
                        tile.jelly.playDistroyEffect();
                        this.board.fadeTileToPos(tile, posx, posy, 350);
                        tile.setNumber(0);
                    }
                }
            };
            GamePlayScreen.prototype.highJellySave = function (newValue) {
                if (this.highJelly < newValue) {
                    joinjelly.JoinJelly.analytics.logNewJelly(newValue, this.level, Date.now() - this.time);
                    try {
                        joinjelly.JoinJelly.gameServices.submitAchievent(newValue);
                    }
                    catch (e) {
                        console.log(e);
                    }
                    this.highJelly = newValue;
                }
            };
            GamePlayScreen.prototype.giveItemChance = function (items) {
                var item = null;
                var lucky = this.itemData.getItemAmmount(joinjelly.Items.LUCKY) ? 2 : 1;
                var goodChance = (Math.random() < gameplay.itemProbability * lucky);
                if (goodChance) {
                    item = items[Math.floor(Math.random() * items.length)];
                    this.itemData.increaseItemAmmount(item);
                }
                return item;
            };
            GamePlayScreen.prototype.animateItemFromTile = function (tile, item) {
                var point = this.content.toLocal(new PIXI.Point(tile.x, tile.y), this.board);
                this.animateItemFromPos(point.x, point.y, item);
            };
            GamePlayScreen.prototype.animateItemFromPos = function (xi, yi, item) {
                var _this = this;
                gameui.AudiosManager.playSound("Interface Sound-11");
                var itemDO = gameui.AssetsManager.getBitmap("item" + item);
                itemDO.mouseEnabled = false;
                itemDO.regX = itemDO.getBounds().width / 2;
                itemDO.regY = itemDO.getBounds().height / 2;
                itemDO.scaleY = itemDO.scaleX = 0.5;
                var xf = defaultWidth / 2;
                var yf = this.footer.y;
                ;
                var footerItem = this.gameFooter.getItemButton(item);
                if (footerItem) {
                    xf = this.content.toLocal(new PIXI.Point(footerItem.x, footerItem.y), this.gameFooter).x;
                    yf = this.content.toLocal(new PIXI.Point(footerItem.x, footerItem.y), this.gameFooter).y;
                }
                itemDO.alpha = 0;
                createjs.Tween.get(itemDO).to({ x: xi, y: yi, alpha: 0 }).to({ y: yi - 70, alpha: 1 }, 400, createjs.Ease.quadInOut).to({ x: xf, y: yf }, 1000, createjs.Ease.quadInOut).to({ alpha: 0 }, 300).call(function () {
                    _this.overlay.removeChild(itemDO);
                    _this.updateItemAmmountOnFooter();
                });
                this.overlay.addChild(itemDO);
            };
            GamePlayScreen.prototype.animateScoreFromTile = function (tile, score) {
                var _this = this;
                var textDO = gameui.AssetsManager.getBitmapText(score.toString(), "debussy");
                textDO.regX = textDO.getBounds().width / 2;
                textDO.mouseEnabled = false;
                var xi = this.content.toLocal(new PIXI.Point(tile.x, tile.y), this.board).x;
                var yi = this.content.toLocal(new PIXI.Point(tile.x, tile.y), this.board).y;
                textDO.alpha = 0;
                createjs.Tween.get(textDO).to({ x: xi, y: yi, alpha: 0 }).to({ y: yi - 170, alpha: 1 }, 400, createjs.Ease.quadOut).to({ alpha: 0 }, 400).call(function () {
                    _this.content.removeChild(textDO);
                });
                this.content.addChild(textDO);
            };
            GamePlayScreen.prototype.useItem = function (item) {
                var itemsAvaliable = this.itemData.getItemAmmount(item);
                var cost = 1;
                if (itemsAvaliable > 0) {
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
                        case joinjelly.Items.EVOLVE:
                            sucess = this.useEvolve();
                            break;
                        case joinjelly.Items.REVIVE:
                            if (itemsAvaliable >= this.reviveCost)
                                sucess = this.useRevive(this.reviveCost);
                            else {
                                this.pauseGame();
                                joinjelly.JoinJelly.showStore(this);
                            }
                            if (sucess) {
                                cost = this.reviveCost;
                                this.reviveCost *= 2;
                                this.saveGame();
                            }
                            break;
                    }
                    if (sucess) {
                        this.itemData.decreaseItemAmmount(item, cost);
                        if (this.itemNotify)
                            this.itemNotify();
                    }
                }
                else {
                    this.pauseGame();
                    joinjelly.JoinJelly.showStore(this);
                }
                this.updateItemAmmountOnFooter();
            };
            GamePlayScreen.prototype.useTime = function () {
                var _this = this;
                if (this.gamestate == GameState.ended)
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
                if (this.gamestate == GameState.ended)
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
            GamePlayScreen.prototype.useRevive = function (cost, test) {
                var _this = this;
                if (test === void 0) { test = false; }
                if (this.gamestate != GameState.ended)
                    return false;
                UserData.getHistoryRevive();
                this.saveGame();
                this.gamestate = GameState.playing;
                this.board.unlock();
                this.finishMenu.hide();
                this.step(4000);
                this.updateInterfaceInfos();
                this.board.setAlarm(true);
                this.showBoardButton.fadeOut();
                this.gameFooter.setItems([joinjelly.Items.TIME, joinjelly.Items.CLEAN, joinjelly.Items.FAST]);
                this.gameFooter.unlockAll();
                this.gameFooter.lockItem(joinjelly.Items.REVIVE);
                this.gameHeader.interactiveChildren = true;
                this.gameHeader.show();
                this.gameHeader.showButtons();
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
                if (this.gamestate == GameState.ended)
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
                setTimeout(function () { tile.unlock(); gameui.AudiosManager.playSound("evolve"); }, 1000);
                gameui.AudiosManager.playSound("sounditemfast");
                var pt = this.evolveEffect.parent.toLocal(new PIXI.Point(0, 0), tile.jelly);
                var po = this.gameHeader.toLocal(new PIXI.Point(1394, 211), this.evolveEffect.parent);
                this.evolveEffect.visible = true;
                this.evolveEffect.set({ alpha: 1, scaleX: 0.5, x: po.x, y: po.y });
                var angle = Math.atan2(pt.y - po.y - 50, pt.x - po.x) - Math.PI / 2;
                var scale = Math.sqrt(Math.pow(pt.y - 50 - po.y, 2) + Math.pow(pt.x - po.x, 2)) / 300;
                this.evolveEffect.rotation = angle;
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
                if (this.gamestate == GameState.ended)
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
            GamePlayScreen.prototype.updateItemAmmountOnFooter = function () {
                var items = joinjelly.ItemsData.items;
                for (var i in items)
                    this.gameFooter.setItemAmmount(items[i], this.itemData.getItemAmmount(items[i]));
            };
            GamePlayScreen.prototype.saveGame = function () {
                var sg = {
                    level: this.level,
                    matches: this.matches,
                    score: this.score,
                    tiles: this.board.getAllTilesValues(),
                    reviveCost: this.reviveCost,
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
                this.reviveCost = saveGame.reviveCost || 1;
                this.updateCurrentLevel();
                this.updateItemAmmountOnFooter();
                this.updateInterfaceInfos();
                if (this.verifyGameLoose())
                    this.endGame();
                else
                    this.continueGame();
            };
            GamePlayScreen.prototype.selfPeformanceTest = function (fast) {
                var _this = this;
                if (fast)
                    gameplay.initialInterval = 200;
                var interval = setInterval(function () {
                    if (_this.gamestate == GameState.paused)
                        return;
                    _this.useRevive(1);
                    _this.useFast(true);
                    if (_this.gamestate == GameState.win) {
                        clearInterval(interval);
                        joinjelly.JoinJelly.startTest();
                    }
                }, 250);
            };
            return GamePlayScreen;
        }(gameui.ScreenState));
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
                var _this = _super.call(this, null, null) || this;
                _this.currentTutorialStep = 0;
                return _this;
            }
            Tutorial.prototype.createGUI = function () {
                var _this = this;
                _super.prototype.createGUI.call(this);
                this.tutorialJellyFinger = new gameplay.view.TutorialMove();
                this.tutorialItemFinger = new gameplay.view.TutorialMove();
                this.gameMessage.addEventListener("closed", function () { if (_this.messageNotify)
                    _this.messageNotify(); });
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
                        _this.showTutorialMessage(StringResources.tutorial.msgLetsGo);
                        _this.waitMessage();
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
                var source = this.gameFooter.getItemButton(itemId).toLocal(new PIXI.Point(0, 0), this.footer);
                this.tutorialItemFinger.showClick(source.x, source.y - 100);
                this.gameFooter.lockAll();
                this.gameFooter.unlockItem(itemId);
                this.gameFooter.setItemAmmount(itemId, 1);
            };
            Tutorial.prototype.hideTutorialFinger = function () {
                this.tutorialJellyFinger.hide();
                this.tutorialItemFinger.hide();
            };
            Tutorial.prototype.giveItemChance = function (items) { return null; };
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
                        sucess = this.useRevive(1);
                        break;
                }
                if (sucess) {
                    if (this.itemNotify)
                        this.itemNotify();
                }
            };
            Tutorial.prototype.updateItemAmmountOnFooter = function () { };
            Tutorial.prototype.saveGame = function () { };
            return Tutorial;
        }(gameplay.GamePlayScreen));
        gameplay.Tutorial = Tutorial;
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var UserData = (function () {
    function UserData() {
        gameui.AudiosManager.setSoundVolume(this.getSoundVol());
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
        DeviceServices.prompt({
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
    UserData.prototype.addOneMorePlay = function () {
        var un = UserData.loadValue("plays", 0);
        un++;
        UserData.saveValue("plays", un);
    };
    UserData.prototype.getPlays = function () {
        return UserData.loadValue("plays", 0);
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
    UserData.prototype.history = function (key, value) {
        if (value === void 0) { value = true; }
        var history = UserData.loadValue("history", {});
        history[key] = value;
        UserData.saveValue("history", history);
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
    return UserData;
}());
UserData.prefix = "FastPair_";
var histories = (function () {
    function histories() {
    }
    return histories;
}());
histories.TUTORIAL = "tutorial_intro";
histories.REVIVE = "revive";
histories.EVOLVE = "evolve";
histories.FIRSTPLAY = "firstplay";
var testMode;
window.onload = function () {
    if (typeof cordova !== 'undefined') {
        document.addEventListener('deviceready', function () {
            joinjelly.JoinJelly.init("gameDiv");
            console.log("Cordova Init");
        }, false);
    }
    else {
        joinjelly.JoinJelly.init("gameDiv");
        console.log("Normal Init");
    }
    // joinjelly.JoinJelly.init("gameDiv");
};
var joinjelly;
(function (joinjelly) {
    var JoinJelly = (function () {
        function JoinJelly() {
        }
        JoinJelly.init = function (canvasName) {
            this.userData = new UserData();
            this.analytics = new Analytics();
            this.itemData = new joinjelly.ItemsData();
            this.gameServices = new GameServices();
            var lang = (window.navigator["userLanguage"] || window.navigator.language).substr(0, 2).toLowerCase();
            switch (lang) {
                case "pt":
                    StringResources = StringResources_pt;
                    break;
            }
            var androidLegacy = DeviceServices.getOs() == "android";
            this.initScreen(canvasName, androidLegacy);
        };
        JoinJelly.initScreen = function (canvasName, legacy) {
            var _this = this;
            if (legacy === void 0) { legacy = false; }
            var fps = 35;
            if (window.location.search == "?test") {
                fps = 10;
                testMode = true;
            }
            this.gameScreen = new gameui.GameScreen(canvasName, defaultWidth, defaultHeight, fps, legacy);
            var scale = this.gameScreen.getCurrentScale();
            var loadingScreen = new joinjelly.menus.Loading(scale);
            this.gameScreen.switchScreen(loadingScreen);
            loadingScreen.loaded = function () {
                setTimeout(function () {
                    AdsServices.initialize();
                }, 1000);
                var loadedGame = _this.userData.loadGame();
                JoinJelly.showMainScreen();
            };
        };
        JoinJelly.startTest = function () {
            var gs = new joinjelly.gameplay.GamePlayScreen(this.userData, this.itemData);
            this.gameScreen.switchScreen(gs);
            gs.selfPeformanceTest(false);
        };
        JoinJelly.showMainScreen = function () {
            var transition = { type: "fade", time: 600 };
            if (this.gameScreen.currentScreen instanceof joinjelly.gameplay.GamePlayScreen)
                transition = { type: "top", time: 500 };
            if (this.gameScreen.currentScreen instanceof joinjelly.Jellypedia)
                transition = { type: "right", time: 500 };
            if (this.gameScreen.currentScreen instanceof joinjelly.menus.MainMenu)
                transition = { type: "right", time: 500 };
            if (this.gameScreen.currentScreen instanceof joinjelly.menus.StoreMenu)
                transition = { type: "right", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.MainScreen(this.userData), null, transition);
        };
        JoinJelly.startLevel = function () {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "bottom", time: 500 };
            else
                transition = { type: "fade", time: 600 };
            this.gameScreen.switchScreen(new joinjelly.gameplay.GamePlayScreen(this.userData, this.itemData), null, transition);
        };
        JoinJelly.startLevelDirectaly = function () {
            this.gameScreen.switchScreen(new joinjelly.gameplay.GamePlayScreen(this.userData, this.itemData));
        };
        JoinJelly.startTutorial = function () {
            this.gameScreen.switchScreen(new joinjelly.gameplay.Tutorial());
        };
        JoinJelly.showStore = function (previousScreen) {
            var transition;
            if (this.gameScreen.currentScreen instanceof joinjelly.MainScreen)
                transition = { type: "left", time: 500 };
            this.gameScreen.switchScreen(new joinjelly.menus.StoreMenu(previousScreen), null, transition);
        };
        JoinJelly.showIntro = function () {
            this.gameScreen.switchScreen(new joinjelly.StoryScreen());
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
        return JoinJelly;
    }());
    JoinJelly.maxJelly = 65536;
    joinjelly.JoinJelly = JoinJelly;
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var view;
        (function (view) {
            var ContinueFooter = (function (_super) {
                __extends(ContinueFooter, _super);
                function ContinueFooter(items) {
                    var _this = _super.call(this) || this;
                    _this.itemSize = 270;
                    _this.itemsButtons = [];
                    _this.addObjects();
                    _this.setItems(items);
                    return _this;
                }
                ContinueFooter.prototype.setItems = function (items) {
                    var itemSize = this.itemSize;
                    if (items.length >= 5)
                        itemSize = 200;
                    this.cleanButtons();
                    if (!items)
                        return;
                    for (var i = 0; i < items.length; i++)
                        this.addItem(items[i], i);
                    for (var i = 0; i < items.length; i++) {
                        this.itemsButtons[items[i]].y = -150;
                        this.itemsButtons[items[i]].x = (defaultWidth - (items.length - 1) * itemSize) / 2 + i * itemSize;
                    }
                };
                ContinueFooter.prototype.cleanButtons = function () {
                    for (var i in this.itemsButtons)
                        this.removeChild(this.itemsButtons[i]);
                    this.itemsButtons = [];
                };
                ContinueFooter.prototype.addObjects = function () {
                    var bg = gameui.AssetsManager.getBitmap("footer");
                    this.addChild(bg);
                    bg.y = -162;
                    bg.x = (defaultWidth - 1161) / 2;
                    this.gameMessage = new view.TutoralMessage();
                    this.addChild(this.gameMessage);
                };
                ContinueFooter.prototype.addItem = function (item, pos) {
                    var _this = this;
                    var bt = new view.ItemButton(item);
                    this.addChild(bt);
                    this.itemsButtons[item] = bt;
                    bt.addEventListener("click", function () { _this.emit("useitem", { item: item }); });
                    bt.addEventListener("tap", function () { _this.emit("useitem", { item: item }); });
                };
                ContinueFooter.prototype.getItemButton = function (item) {
                    return this.itemsButtons[item];
                };
                ContinueFooter.prototype.setItemAmmount = function (item, ammount) {
                    if (this.itemsButtons[item])
                        this.itemsButtons[item].setAmmount(ammount);
                };
                ContinueFooter.prototype.showMessage = function (itemId, message) {
                    this.gameMessage.x = this.getItemButton(itemId).x;
                    this.gameMessage.y = this.getItemButton(itemId).y - 120;
                    this.gameMessage.show(message);
                };
                ContinueFooter.prototype.hideMessage = function () {
                    this.gameMessage.fadeOut();
                };
                ContinueFooter.prototype.bounceItem = function (item) {
                    this.getItemButton(item).highLight(false);
                };
                ContinueFooter.prototype.highlight = function (item) {
                    this.unHighlightAll();
                    this.getItemButton(item).highLight();
                };
                ContinueFooter.prototype.unHighlightAll = function () {
                    for (var i in this.itemsButtons)
                        this.itemsButtons[i].unHighlight();
                };
                ContinueFooter.prototype.lockItem = function (itemId) {
                    var b = this.getItemButton(itemId);
                    if (b)
                        b.lock();
                };
                ContinueFooter.prototype.unlockItem = function (itemId) {
                    var b = this.getItemButton(itemId);
                    b.unlock();
                };
                ContinueFooter.prototype.lockAll = function () {
                    for (var b in this.itemsButtons)
                        this.itemsButtons[b].lock();
                };
                ContinueFooter.prototype.unlockAll = function () {
                    for (var b in this.itemsButtons)
                        this.itemsButtons[b].unlock();
                };
                return ContinueFooter;
            }(PIXI.Container));
            view.ContinueFooter = ContinueFooter;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var AdsServices = (function () {
    function AdsServices() {
    }
    AdsServices.initialize = function () {
        var _this = this;
        var cocoon = window["Cocoon"];
        document.addEventListener('deviceready', function () {
            if (!cocoon || !cocoon.Ad || !cocoon.Ad.MoPub) {
                _this.debug('Cocoon AdMob plugin not installed');
                _this.status = AdsServices.STATUS.FAIL;
                return;
            }
            cocoon.Ad.MoPub.configure({
                ios: { interstitial: "1a895b1b280d48d88ab5ddce11633701" },
                android: { interstitial: "5c4ca98862a04ee09f2f9a67c5b95d80" }
            });
            if (!_this.interstitial)
                _this.interstitial = cocoon.Ad.MoPub.createInterstitial();
            _this.setCallbacks();
            _this.load();
        }, false);
    };
    AdsServices.show = function (callback) {
        if (!this.interstitial) {
            if (callback)
                callback(false, "not_Initialized");
            return;
        }
        if (this.isReady()) {
            this.debug("show");
            this.interstitial.on("dismiss", function (e) {
                if (callback)
                    callback(true, "displayed");
            });
            this.interstitial.show();
        }
        else {
            this.debug("not loaded yet");
            this.load();
            if (callback)
                callback(false, "not_Loaded");
        }
    };
    AdsServices.isReady = function () {
        return (this.interstitial && this.interstitial.isReady());
    };
    AdsServices.getStatus = function () {
        if (!this.interstitial)
            return AdsServices.STATUS.NOT_AVALIABLE;
        if (this.interstitial && this.interstitial.isReady())
            return AdsServices.STATUS.READY;
        return this.status;
    };
    AdsServices.load = function () {
        var _this = this;
        if (!this.interstitial)
            return;
        this.debug("loading");
        this.interstitial.load();
        this.status = AdsServices.STATUS.LOADING;
        if (this.ad_timeout)
            clearTimeout(this.ad_timeout);
        this.ad_timeout = setTimeout(function () {
            _this.debug("timeout");
            _this.status = AdsServices.STATUS.TIMEOUT;
        }, 60000);
    };
    AdsServices.setCallbacks = function () {
        var _this = this;
        this.interstitial.on("show", function (e) {
            _this.debug('music paused');
        });
        this.interstitial.on("load", function (e) {
            _this.debug("Interstitial loaded " + JSON.stringify(e));
            _this.status = AdsServices.STATUS.READY;
            clearTimeout(_this.ad_timeout);
        });
        this.interstitial.on("fail", function (e) {
            _this.debug("Interstitial failed " + JSON.stringify(e));
            _this.status = AdsServices.STATUS.FAIL;
            if (_this.ad_timeout)
                clearTimeout(_this.ad_timeout);
        });
        this.interstitial.on("dismiss", function (e) {
            _this.debug("Interstitial dismissed " + JSON.stringify(e));
            _this.status = AdsServices.STATUS.NOT_LOADED;
            _this.load();
        });
    };
    AdsServices.debug = function (text) {
        console.log("ads " + text);
    };
    return AdsServices;
}());
(function (AdsServices) {
    var STATUS;
    (function (STATUS) {
        STATUS[STATUS["LOADING"] = 0] = "LOADING";
        STATUS[STATUS["READY"] = 1] = "READY";
        STATUS[STATUS["FAIL"] = 2] = "FAIL";
        STATUS[STATUS["NOT_LOADED"] = 3] = "NOT_LOADED";
        STATUS[STATUS["TIMEOUT"] = 4] = "TIMEOUT";
        STATUS[STATUS["NOT_AVALIABLE"] = 5] = "NOT_AVALIABLE";
    })(STATUS = AdsServices.STATUS || (AdsServices.STATUS = {}));
})(AdsServices || (AdsServices = {}));
var DeviceServices = (function () {
    function DeviceServices() {
    }
    DeviceServices.getOs = function () {
        var os = "windows";
        if (window["Cocoon"] && Cocoon.Device.getDeviceInfo())
            os = Cocoon.Device.getDeviceInfo().os;
        return os;
    };
    DeviceServices.openURL = function (url) {
        if (window["Cocoon"])
            Cocoon.App.openURL(url);
        else if (window["Windows"])
            Windows.System.Launcher.launchUriAsync(new Windows.Foundation.Uri(url));
        else
            window.open(url);
    };
    DeviceServices.prompt = function (options, callback) {
        if (window["Cocoon"])
            return Cocoon.Dialog.prompt(options, callback);
        else
            callback(prompt(options.message));
    };
    DeviceServices.confirm = function (options, callback) {
        if (window["Cocoon"])
            return Cocoon.Dialog.confirm(options, callback);
        else if (Windows["Windows"]) {
            var message = Windows.UI.Popups.MessageDialog(options.title, options.message);
            message.commands.append(new Windows.UI.Popups.UICommand("Cancel", function () {
                callback(false);
            }));
            message.commands.append(new Windows.UI.Popups.UICommand("Ok", function () {
                callback(true);
            }));
            message.showAsync();
        }
        else
            callback(confirm(options.message));
    };
    DeviceServices.registerBackButton = function (callback) {
    };
    DeviceServices.exit = function () {
    };
    return DeviceServices;
}());
DeviceServices.initialized = false;
var GameServices = (function () {
    function GameServices() {
    }
    GameServices.prototype.initializeGameservices = function () {
        var _this = this;
        if (navigator.onLine || window["Cocoon"]) {
            if (Cocoon.getPlatform() === 'ios') {
                Cocoon.Social.GameCenter.init({ defaultLeaderboard: "leaderboards" });
                this.socialService = Cocoon.Social.GameCenter.getSocialInterface();
            }
            else if (Cocoon.getPlatform() === 'android') {
                Cocoon.Social.GooglePlayGames.init({ defaultLeaderboard: "CgkI49ztp64KEAIQAg " });
                this.socialService = Cocoon.Social.GooglePlayGames.getSocialInterface();
            }
            var leaderbords = { leaderboardID: "tictactoe2" };
            if (this.socialService) {
                this.socialService.on("loginStatusChanged", function (l, e) { _this.onLogin(l, e); });
                this.loginSocialService();
            }
        }
    };
    GameServices.prototype.loginSocialService = function () {
        if (this.waitingLogin)
            return;
        this.waitingLogin = true;
        this.socialService.login();
    };
    GameServices.prototype.onLogin = function (loggedIn, error) {
        this.waitingLogin = false;
        if (!loggedIn || error) {
            console.error("Game service Login failed: " + JSON.stringify(error));
        }
        else {
            console.log("Game service login");
            this.socialService.requestScore(function (score, error) {
                if (error) {
                    console.error("Error getting user score: " + error.message);
                }
                else if (score) {
                    console.log("score: " + score.score);
                    this.localUserScore = score.score;
                }
            });
        }
    };
    GameServices.prototype.showLeaderboard = function () {
        if (!navigator.onLine || !this.socialService)
            return;
        this.socialService.showLeaderboard(function (error) {
            if (error)
                console.error("showLeaderbord error: " + error.message);
        });
    };
    GameServices.prototype.showAchievements = function () {
        if (!navigator.onLine || !this.socialService)
            return;
        this.socialService.showAchievements(function (error) {
            if (error)
                console.error("showAchievements error: " + error.message);
        });
    };
    GameServices.prototype.submitScore = function (score) {
        if (!navigator.onLine || !this.socialService)
            return;
        this.socialService.submitScore(score.toString(), function (error) {
            if (error)
                console.error("submitScore error: " + error.message);
        });
    };
    GameServices.prototype.submitAchievent = function (achievementId) {
        if (!navigator.onLine || !this.socialService)
            return;
        var id = "";
        if (Cocoon.getPlatform() === 'ios') {
            id = constantsiOS[achievementId];
        }
        else if (Cocoon.getPlatform() === 'android') {
            id = contantsAndroid[achievementId];
        }
        if (id)
            this.socialService.submitAchievement(id, function (error) {
                if (error)
                    console.error("submitAchievement error: " + error.message);
                else
                    console.error("submited");
            });
    };
    GameServices.prototype.getScore = function () {
        return this.localUserScore;
    };
    return GameServices;
}());
var InAppPurchaseServices = (function () {
    function InAppPurchaseServices(productsIds) {
        var _this = this;
        this.initialized = false;
        if (typeof Cocoon != "undefined")
            this.inappsService = Cocoon.InApp;
        else if (typeof Windows != "undefined")
            this.inappsService = WindowsInappsService;
        else {
            if (this.onError)
                this.onError();
            return;
        }
        this.productsIds = productsIds;
        this.inappsService.initialize({ autofinish: true }, function (error) {
            if (error) {
                console.log("initialized Store " + error);
                return;
            }
            _this.inappsService.fetchProducts(_this.productsIds, function (products, error) {
                if (error) {
                    console.log("product loading error " + error);
                    return;
                }
                _this.products = products;
                if (_this.onProductsLoaded)
                    _this.onProductsLoaded(products);
            });
        });
    }
    InAppPurchaseServices.prototype.purchaseProduct = function (productId, quantity, callback) {
        this.inappsService.purchase(productId, quantity, callback);
    };
    InAppPurchaseServices.prototype.restorePurchases = function () {
        this.inappsService.restore();
    };
    return InAppPurchaseServices;
}());
var SocialServices = (function () {
    function SocialServices() {
    }
    SocialServices.initialize = function () {
        var os = DeviceServices.getOs();
        if (navigator.onLine && window["Cocoon"]) {
            var fb = Cocoon.Social.Facebook;
            fb.init({ appId: fbAppId });
            this.FBSocialService = fb.getSocialInterface();
        }
    };
    SocialServices.sendMessage = function (message, callback) {
        if (!this.isAvaliable())
            return;
        this.FBSocialService.publishMessageWithDialog([
            message.shareDescription,
            message.gameWebsiteIcon,
            message.gameWebsite,
            message.shareTitle,
            message.shareCaption
        ], callback);
    };
    SocialServices.isAvaliable = function () {
        return this.FBSocialService ? true : false;
    };
    return SocialServices;
}());
SocialServices.initialized = false;
var StoreServices = (function () {
    function StoreServices() {
    }
    StoreServices.showRating = function (storeURLs) {
        var os = DeviceServices.getOs();
        switch (os) {
            case "ios":
                DeviceServices.openURL(storeURLs.ios);
                break;
            case "android":
                DeviceServices.openURL(storeURLs.android);
                break;
            case "windows":
                DeviceServices.openURL(storeURLs.windows);
                break;
        }
    };
    return StoreServices;
}());
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        gameplay.boardSize = 5;
        gameplay.itemProbability = 0.003;
        gameplay.timeByLevel = 20000;
        gameplay.initialInterval = 800;
        gameplay.finalInterval = 300;
        gameplay.easeInterval = 0.98;
        gameplay.initialDirtyProbability = 0.1;
        gameplay.finalDirtyProbability = 0.5;
        gameplay.easeDirtyProbability = 0.99;
        gameplay.increasingJellyValuePerLevel = 0.008;
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var view;
        (function (view) {
            var RandomItemSelector = (function (_super) {
                __extends(RandomItemSelector, _super);
                function RandomItemSelector() {
                    var _this = _super.call(this) || this;
                    _this.distance = 250;
                    _this.totalDistante = 625;
                    _this.totalTime = 5000;
                    _this.previousOffset = 0;
                    _this.itemsDO = [];
                    _this.addChild(gameui.AssetsManager.getBitmap("FlyGroup")
                        .set({ regX: 1056 / 2, regY: 250 / 2 }));
                    _this.effect = new joinjelly.view.Effect();
                    _this.addChild(_this.effect);
                    _this.effect.scaleX = _this.effect.scaleY = 1.5;
                    _this.items = [joinjelly.Items.CLEAN, joinjelly.Items.FAST, joinjelly.Items.TIME, joinjelly.Items.REVIVE, "loose"];
                    for (var i = 0; i < _this.items.length; i++) {
                        var ido;
                        if (_this.items[i] == "loose")
                            ido = new gameplay.view.Jelly(-1).set({ y: 50 });
                        else {
                            ido = gameui.AssetsManager.getBitmap("item" + _this.capitalizeFirstLetter(_this.items[i]));
                            ido.name = _this.items[i];
                            ido.x = _this.distance * i;
                            ido.regX = ido.regY = 150;
                            ido.scaleX = ido.scaleY = 0.7;
                        }
                        _this.itemsDO.push(ido);
                        _this.addChild(ido);
                    }
                    _this.visible = false;
                    return _this;
                }
                RandomItemSelector.prototype.capitalizeFirstLetter = function (string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                };
                RandomItemSelector.prototype.random = function () {
                    var _this = this;
                    this.fadeIn();
                    var chances = [0, 0, 1, 1, 2, 2, 3, 3, 4];
                    var itemId = chances[Math.floor(Math.random() * chances.length)];
                    this.finalPosition = itemId * this.distance;
                    this.initialPosition = (Math.random() + 6) * this.distance * this.items.length;
                    this.listener = function () { _this.tick(); };
                    PIXI.ticker.shared.add(this.listener);
                    this.timeStart = Date.now();
                };
                RandomItemSelector.prototype.tick = function () {
                    var p = ((this.timeStart + this.totalTime) - Date.now()) / this.totalTime;
                    var offset = Math.pow(p, 2) * this.initialPosition + (1 - Math.pow(p, 2)) * this.finalPosition;
                    for (var i = 0; i < this.itemsDO.length; i++) {
                        var item = this.itemsDO[i];
                        var itemOffset = this.distance * i + offset;
                        item.visible = true;
                        item.x = (itemOffset + this.totalDistante) % (this.totalDistante * 2) - this.totalDistante;
                        item.scaleX = item.scaleY = (this.totalDistante - (Math.abs(item.x))) / this.totalDistante * 1.2;
                        item.alpha = (this.totalDistante - (Math.abs(item.x))) / this.totalDistante * 2;
                    }
                    if (offset % this.distance > this.previousOffset % this.distance) {
                        gameui.AudiosManager.playSound("Interface Sound-12", true);
                        console.log(offset);
                    }
                    this.previousOffset = offset;
                    if (p <= 0)
                        this.end();
                };
                RandomItemSelector.prototype.end = function () {
                    var _this = this;
                    PIXI.ticker.shared.remove(this.listener);
                    var closerObj;
                    for (var i in this.itemsDO)
                        if (!closerObj || Math.abs(this.itemsDO[i].x) < Math.abs(closerObj.x))
                            closerObj = this.itemsDO[i];
                    gameui.AudiosManager.playSound("Interface Sound-11", true);
                    this.effect.castBothInv();
                    for (var i in this.itemsDO) {
                        if (this.itemsDO[i] == closerObj)
                            createjs.Tween.get(this.itemsDO[i]).to({ x: 0, scaleX: 1.2, scaleY: 1.2, alpha: 1 }, 400, createjs.Ease.quadInOut);
                        else
                            createjs.Tween.get(this.itemsDO[i]).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 400, createjs.Ease.quadInOut);
                    }
                    setTimeout(function () {
                        _this.fadeOut();
                        if (_this.onComplete)
                            _this.onComplete(closerObj.name);
                    }, 700);
                };
                return RandomItemSelector;
            }(gameui.UIItem));
            view.RandomItemSelector = RandomItemSelector;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var DevTest = (function (_super) {
            __extends(DevTest, _super);
            function DevTest() {
                var _this = _super.call(this) || this;
                var ri = new joinjelly.gameplay.view.RandomItemSelector();
                _this.content.addChild(ri);
                ri.x = defaultWidth / 2;
                ri.y = defaultHeight / 2;
                setTimeout(function () { ri.random(); }, 1000);
                return _this;
            }
            return DevTest;
        }(gameui.ScreenState));
        menus.DevTest = DevTest;
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var view;
        (function (view) {
            var RatingFlyOut = (function (_super) {
                __extends(RatingFlyOut, _super);
                function RatingFlyOut() {
                    var _this = _super.call(this, StringResources.menus.rating, 1250) || this;
                    _this.addTexts();
                    _this.addCloseButton();
                    _this.addStars();
                    return _this;
                }
                RatingFlyOut.prototype.show = function () {
                    if (!navigator.onLine)
                        return;
                    if (joinjelly.JoinJelly.userData.getHistory("rated"))
                        return;
                    if (joinjelly.JoinJelly.userData.getHistory("rating_asked"))
                        return;
                    if (joinjelly.JoinJelly.userData.getPlays() < 10)
                        return;
                    if (joinjelly.JoinJelly.userData.getHighScore() < 5000)
                        return;
                    joinjelly.JoinJelly.userData.history("rating_asked");
                    _super.prototype.show.call(this);
                };
                RatingFlyOut.prototype.addTexts = function () {
                    var tx = gameui.AssetsManager.getBitmapText(StringResources.menus.ratingDesc, "debussy");
                    tx.align = "center";
                    tx.set({ x: 280, y: 840 });
                    this.addChild(tx);
                    this.scoreText = tx;
                };
                RatingFlyOut.prototype.addCloseButton = function () {
                    var _this = this;
                    var close = new gameui.ImageButton("BtClose", (function () {
                        _this.hide();
                    }));
                    close.set({ x: 1350, y: 660 });
                    this.addChild(close);
                };
                RatingFlyOut.prototype.addStars = function () {
                    var _this = this;
                    this.stars = [];
                    for (var i = 0; i < 5; i++) {
                        var star = new Star();
                        this.addChild(star);
                        star.y = 1150;
                        star.x = 200 * i + (defaultWidth - 800) / 2;
                        this.stars[i] = star;
                    }
                    this.stars[0].on("click", function () { _this.rate(1); });
                    this.stars[1].on("click", function () { _this.rate(2); });
                    this.stars[2].on("click", function () { _this.rate(3); });
                    this.stars[3].on("click", function () { _this.rate(4); });
                    this.stars[4].on("click", function () { _this.rate(5); });
                    this.stars[0].on("tap", function () { _this.rate(1); });
                    this.stars[1].on("tap", function () { _this.rate(2); });
                    this.stars[2].on("tap", function () { _this.rate(3); });
                    this.stars[3].on("tap", function () { _this.rate(4); });
                    this.stars[4].on("tap", function () { _this.rate(5); });
                };
                RatingFlyOut.prototype.rate = function (value) {
                    joinjelly.JoinJelly.userData.history("rated");
                    for (var i = 0; i < value; i++)
                        this.stars[i].turnOn();
                    for (var i = value; i < 5; i++)
                        this.stars[i].turnOff();
                    for (var i = 0; i < 5; i++)
                        this.stars[i].interactive = false;
                    this.saveRating(i);
                    if (value < 3)
                        this.askFeedback();
                    if (value == 3)
                        this.thankUser();
                    if (value > 3)
                        this.thankUserAndAsk();
                };
                RatingFlyOut.prototype.saveRating = function (rate) {
                    joinjelly.JoinJelly.userData.history("rated");
                    joinjelly.JoinJelly.analytics.logRating(rate);
                };
                RatingFlyOut.prototype.askFeedback = function () {
                    var _this = this;
                    var tx = gameui.AssetsManager.getBitmapText("Would you mind give us\nsome feedback?", "debussy");
                    tx.set({ x: 280, y: 1300 });
                    this.addChild(tx);
                    var ok = new gameui.BitmapTextButton("Ok, sure", "debussy", "BtTextBg", function () { _this.sendEmail(); });
                    var no = new gameui.BitmapTextButton("No, thanks", "debussy", "BtTextBg", function () { _this.hide(); });
                    this.addChild(ok);
                    this.addChild(no);
                    ok.y = no.y = 1640;
                    ok.x = defaultWidth / 2 + 400;
                    no.x = defaultWidth / 2 - 400;
                };
                RatingFlyOut.prototype.thankUserAndAsk = function () {
                    var _this = this;
                    var tx = gameui.AssetsManager.getBitmapText("Thanks! How about a rating\non App Store, then?", "debussy");
                    tx.set({ x: 280, y: 1300 });
                    this.addChild(tx);
                    var ok = new gameui.BitmapTextButton("Ok, sure", "debussy", "BtTextBg", function () { _this.gotoStore(); });
                    var no = new gameui.BitmapTextButton("No, thanks", "debussy", "BtTextBg", function () { _this.hide(); });
                    this.addChild(ok);
                    this.addChild(no);
                    ok.y = no.y = 1640;
                    ok.x = defaultWidth / 2 + 400;
                    no.x = defaultWidth / 2 - 400;
                };
                RatingFlyOut.prototype.thankUser = function () {
                    var _this = this;
                    var tx = gameui.AssetsManager.getBitmapText(StringResources.menus.thanks, "debussyBig");
                    tx.set({ x: 280, y: 1480 });
                    this.addChild(tx);
                    setTimeout(function () { _this.hide(); }, 1500);
                };
                RatingFlyOut.prototype.sendEmail = function () {
                    var _this = this;
                    DeviceServices.openURL("mailto:games@diastudio.com.br");
                    setTimeout(function () { _this.hide(); }, 1500);
                };
                RatingFlyOut.prototype.gotoStore = function () {
                    var _this = this;
                    var storeURLs = {
                        ios: "http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=981743649&pageNumber=0&sortOrdering=2&type=Purple+Software&mt=8",
                        android: "market://details?id=com.diastudio.joinjelly",
                        windows: "ms-windows-store:REVIEW?PFN=DIAStudio.JoinJelly_gs119xcmtqkqr"
                    };
                    StoreServices.showRating(storeURLs);
                    setTimeout(function () { _this.hide(); }, 1500);
                };
                return RatingFlyOut;
            }(view.FlyOutMenu));
            view.RatingFlyOut = RatingFlyOut;
            var Star = (function (_super) {
                __extends(Star, _super);
                function Star() {
                    var _this = _super.call(this) || this;
                    var starOff = gameui.AssetsManager.getBitmap("starOff");
                    var star = gameui.AssetsManager.getBitmap("star");
                    star.regX = star.regY = 140 / 2;
                    starOff.regX = starOff.regY = 140 / 2;
                    _this.addChild(starOff);
                    _this.addChild(star);
                    star.visible = false;
                    _this.width = 140;
                    _this.height = 140;
                    _this.createHitArea();
                    _this.star = star;
                    return _this;
                }
                Star.prototype.turnOn = function () {
                    this.star.visible = true;
                };
                Star.prototype.turnOff = function () {
                    this.star.visible = false;
                };
                return Star;
            }(gameui.Button));
        })(view = menus.view || (menus.view = {}));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var view;
        (function (view) {
            var CountDown = (function (_super) {
                __extends(CountDown, _super);
                function CountDown() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                CountDown.prototype.countDown = function (total) {
                    var _this = this;
                    if (total === void 0) { total = 3; }
                    var ns = [];
                    var time = 1000;
                    var transition = 200;
                    var dk = gameui.AssetsManager.getBitmap("popupdark");
                    this.addChild(dk);
                    dk.scaleX = dk.scaleY = 16;
                    dk.x = -defaultWidth / 2;
                    dk.y = -defaultHeight;
                    dk.alpha = 0;
                    dk.interactive = false;
                    dk.interactiveChildren = false;
                    createjs.Tween.get(dk).to({ alpha: 1 }, 200);
                    setTimeout(function () {
                        createjs.Tween.get(dk).to({ alpha: 0 }, 200).call(function () { _this.removeChild(dk); });
                    }, time * total + transition);
                    setTimeout(function () {
                        gameui.AudiosManager.playSound("Interface Sound-12");
                    }, time * total + transition);
                    for (var n = total; n > 0; n--) {
                        ns[n] = gameui.AssetsManager.getBitmap("n" + n);
                        this.addChild(ns[n]);
                        ns[n].regX = ns[n].getBounds().width / 2;
                        ns[n].regY = ns[n].getBounds().height / 2;
                        ns[n].interactiveChildren = false;
                        ns[n].interactive = false;
                        ns[n].name = "count_n";
                        createjs.Tween.get(ns[n])
                            .to({ scaleX: 2, scaleY: 2, alpha: 0 })
                            .wait((total - n) * time)
                            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, transition, createjs.Ease.quadOut)
                            .call(function () { gameui.AudiosManager.playSound("Interface Sound-13"); })
                            .wait(time - transition)
                            .to({ alpha: 0, scaleX: 0.5, scaleY: 0.5 }, transition, createjs.Ease.quadIn)
                            .call(function (obj) { _this.removeChild(obj.target); });
                    }
                };
                return CountDown;
            }(PIXI.Container));
            view.CountDown = CountDown;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
var joinjelly;
(function (joinjelly) {
    var StoryScreen = (function (_super) {
        __extends(StoryScreen, _super);
        function StoryScreen() {
            var _this = _super.call(this) || this;
            var intro = new lib.Intro3();
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
            return _this;
        }
        return StoryScreen;
    }(gameui.ScreenState));
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
                    var _this = _super.call(this) || this;
                    _this.regX = 1056 / 2;
                    var bg = gameui.AssetsManager.getBitmap("FlyGroup");
                    bg.scaleY = 0.65;
                    _this.addChild(bg);
                    var tContainer = new PIXI.Container();
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
                    _this.addChild(tContainer);
                    return _this;
                }
                return LeaderBoardItem;
            }(PIXI.Container));
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
            var PlayerNameOptions = (function (_super) {
                __extends(PlayerNameOptions, _super);
                function PlayerNameOptions() {
                    var _this = _super.call(this) || this;
                    _this.addObjects();
                    return _this;
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
            }(PIXI.Container));
            view.PlayerNameOptions = PlayerNameOptions;
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
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Effect.prototype.castSimple = function () {
                var _this = this;
                var fxs = gameui.AssetsManager.getBitmap("fxJoin");
                fxs.regX = 100;
                fxs.regY = 100;
                this.addChild(fxs);
                createjs.Tween.get(fxs).to({ scaleX: 2, scaleY: 2, alpha: 0 }, 500, createjs.Ease.linear).call(function () { _this.removeChild(fxs); });
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
                createjs.Tween.get(fxs).to({ scaleX: 0.5, scaleY: 0.5, alpha: 2 }, 800, createjs.Ease.linear).call(function () { _this.removeChild(fxs); });
            };
            Effect.prototype.castPart = function () {
                var _this = this;
                var fxp = gameui.AssetsManager.getBitmap("fxPart");
                fxp.regX = 140;
                fxp.regY = 140;
                fxp.scaleX = fxp.scaleY = 0.2;
                fxp.alpha = 2;
                this.addChild(fxp);
                createjs.Tween.get(fxp).to({ scaleX: 1.6, scaleY: 1.6, alpha: 0 }, 500, createjs.Ease.quadOut).call(function () { _this.removeChild(fxp); });
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
                createjs.Tween.get(fxp).to({ scaleX: 2.2, scaleY: 2.2, alpha: 0 }, 500, createjs.Ease.quadOut).call(function () { _this.removeChild(fxp); });
            };
            Effect.prototype.castPartsInv = function () {
                var _this = this;
                var fx = gameui.AssetsManager.getBitmap("fxPart");
                var src = { regX: 140, regY: 140, scaleX: 4, scaleY: 4, rotation_d: 360 / 16, alpha: 0 };
                var dst = { scaleX: 0.5, scaleY: 0.5, alpha: 2, rotation_d: 0 };
                fx.set(src);
                this.addChild(fx);
                createjs.Tween.get(fx).to(dst, 1000, createjs.Ease.quadIn).call(function () { _this.removeChild(fx); });
            };
            Effect.prototype.castBoth = function () {
                this.castPartsInv();
                this.castSimpleInv();
            };
            Effect.prototype.castBothInv = function () {
                this.castSimple();
                this.castParts();
            };
            Effect.prototype.castDistroyEffect = function () {
                var _this = this;
                var fx1 = gameui.AssetsManager.getBitmap("fxPart");
                var src = { regX: 140 + Math.random() * 40, regY: 140 + Math.random() * 40, scaleX: 1, scaleY: 1, rotation_d: 360 / 16, alpha: 4 };
                var dst = { scaleX: 2, scaleY: 2, rotation_d: Math.random() * 360 / 16, alpha: 0 };
                this.addChild(fx1);
                fx1.set(src);
                createjs.Tween.get(fx1).to(dst, 250, createjs.Ease.quadIn).call(function () { _this.removeChild(fx1); });
                var fx2 = gameui.AssetsManager.getBitmap("fxPart");
                var src = { regX: 140 + Math.random() * 40, regY: 140 + Math.random() * 40, scaleX: 1, scaleY: 1, rotation_d: 360 / 16, alpha: 4 };
                var dst = { scaleX: 2, scaleY: 2, rotation_d: Math.random() * 360 / 16, alpha: 0 };
                this.addChild(fx2);
                fx2.set(src);
                createjs.Tween.get(fx2).to(dst, 350, createjs.Ease.quadIn).call(function () { _this.removeChild(fx2); });
                var fx3 = gameui.AssetsManager.getBitmap("fxJoin");
                var src = { regX: 140, regY: 140, scaleX: 1, scaleY: 1, rotation_d: 360 / 16, alpha: 3 };
                var dst = { scaleX: 3, scaleY: 0, rotation_d: Math.random() * 360 / 16, alpha: 0 };
                this.addChild(fx3);
                fx3.set(src);
                createjs.Tween.get(fx3).to(dst, 350, createjs.Ease.quadOut).call(function () { _this.removeChild(fx3); });
            };
            Effect.prototype.castUltimateEffect = function () {
                var _this = this;
                var fx = gameui.AssetsManager.getBitmap("fxPart");
                var src = { regX: 140 + Math.random() * 40, regY: 140 + Math.random() * 40, scaleX: 1, scaleY: 1, rotation_d: 360 / 16, alpha: 4 };
                var dst = { scaleX: 10, scaleY: 10, rotation_d: Math.random() * 360 / 16, alpha: 0 };
                this.addChild(fx);
                fx.set(src);
                createjs.Tween.get(fx).to(dst, 1000, createjs.Ease.quadIn).call(function () { _this.removeChild(fx); });
                var fx = gameui.AssetsManager.getBitmap("fxJoin");
                var src = { regX: 140 + Math.random() * 40, regY: 140 + Math.random() * 40, scaleX: 1, scaleY: 1, rotation_d: 360 / 16, alpha: 4 };
                var dst = { scaleX: 10, scaleY: 10, rotation_d: Math.random() * 360 / 16, alpha: 0 };
                this.addChild(fx);
                fx.set(src);
                createjs.Tween.get(fx).to(dst, 1400, createjs.Ease.quadOut).call(function () { _this.removeChild(fx); });
                var fx = gameui.AssetsManager.getBitmap("fxJoin");
                var src = { regX: 140 - Math.random() * 40, regY: 140 - Math.random() * 40, scaleX: 1, scaleY: 1, rotation_d: 360 / 16, alpha: 4 };
                var dst = { scaleX: 10, scaleY: 10, rotation_d: Math.random() * 360 / 16, alpha: 0 };
                this.addChild(fx);
                fx.set(src);
                createjs.Tween.get(fx).to(dst, 1000, createjs.Ease.quadOut).call(function () { _this.removeChild(fx); });
            };
            return Effect;
        }(PIXI.Container));
        view.Effect = Effect;
    })(view = joinjelly.view || (joinjelly.view = {}));
})(joinjelly || (joinjelly = {}));
var app_version = "75";
var defaultWidth = 768 * 2;
var defaultHeight = 1024 * 2;
var fbAppId = "1416523228649363";
var gameWebsite = "http://www.joinjelly.com";
var gameWebsiteIcon = "http://www.joinjelly.com/preview.jpg";
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
            var ItemsFooter = (function (_super) {
                __extends(ItemsFooter, _super);
                function ItemsFooter(items) {
                    var _this = _super.call(this) || this;
                    _this.itemSize = 270;
                    _this.itemsButtons = [];
                    _this.addObjects();
                    _this.setItems(items);
                    return _this;
                }
                ItemsFooter.prototype.setItems = function (items) {
                    var itemSize = this.itemSize;
                    if (items.length >= 5)
                        itemSize = 200;
                    this.cleanButtons();
                    if (!items)
                        return;
                    for (var i = 0; i < items.length; i++)
                        this.addItem(items[i], i);
                    for (var i = 0; i < items.length; i++) {
                        this.itemsButtons[items[i]].y = -150;
                        this.itemsButtons[items[i]].x = (defaultWidth - (items.length - 1) * itemSize) / 2 + i * itemSize;
                    }
                };
                ItemsFooter.prototype.showContinue = function (price) {
                    this.setItems([joinjelly.Items.REVIVE]);
                    this.unlockItem(joinjelly.Items.REVIVE);
                    this.highlight(joinjelly.Items.REVIVE);
                    this.text = gameui.AssetsManager.getBitmapText("x" + price, "debussyBig");
                    this.addChild(this.text);
                    this.text.y = -200;
                    this.text.x = defaultWidth / 2 + 150;
                };
                ItemsFooter.prototype.cleanButtons = function () {
                    if (this.text)
                        this.removeChild(this.text);
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
                    bt.addEventListener("click", function () { _this.emit("useitem", { item: item }); });
                    bt.addEventListener("tap", function () { _this.emit("useitem", { item: item }); });
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
            }(PIXI.Container));
            view.ItemsFooter = ItemsFooter;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
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
//# sourceMappingURL=script.js.map