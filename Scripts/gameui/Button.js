var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
                gameui.AssetsManager.playSound(this.soundId);
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
                this.background = gameui.AssetsManager.getBitmap(image);
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
            //add space before text
            if (text != "")
                text = " " + text;
            _super.call(this, text, font, color, background, event, soundId);
            //loads icon Image
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
//# sourceMappingURL=Button.js.map