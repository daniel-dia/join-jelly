var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var fpair;
(function (fpair) {
    (function (gameplay) {
        (function (view) {
            var Jelly = (function (_super) {
                __extends(Jelly, _super);
                // #region initialization =========================================
                function Jelly() {
                    _super.call(this);
                }
                /// #endregion
                // #region behaviour ==============================================
                //set tile number
                Jelly.prototype.setNumber = function (value) {
                    //update image
                    this.imageContainer.removeAllChildren();
                    this.shadowContainer.removeAllChildren();

                    //if values equals zero, hide the tile
                    if (value == 0) {
                        this.mouseEnabled = false;
                        this.shadowContainer.visible = false;
                    } else {
                        //enable mouse and visibility
                        this.mouseEnabled = true;
                        this.shadowContainer.visible = true;

                        this.visible = true;
                        this.alpha = 1;

                        this.createJelly(value);
                        this.createEyes(value);

                        this.executeAnimationIn();
                    }
                };

                Jelly.prototype.createJelly = function (value) {
                    var _this = this;
                    var img = new createjs.Bitmap("assets/j" + value + ".png");

                    //centralize
                    img.image.onload = function () {
                        img.regX = img.image.width / 2;
                        img.regY = img.image.height;

                        var shadow = gameui.AssetsManager.getBitmap("shadow");
                        shadow.regY = 45;
                        shadow.regX = 108;
                        shadow.scaleX = shadow.scaleY = img.image.width / 216;
                        _this.shadowContainer.addChild(shadow);
                    };

                    this.imageContainer.addChild(img);
                };
                Jelly.prototype.createEyes = function (value) {
                    //add Eyes
                    var eye = new createjs.Container();
                    var eyeImg = new createjs.Bitmap("assets/e" + value + ".png");
                    eyeImg.regY = 20;
                    createjs.Tween.get(eyeImg, { loop: true }).wait(3000 + Math.random() * 1000).to({ scaleY: 0.2 }, 100).to({ scaleY: 1 }, 100);
                    eye.addChild(eyeImg);
                    eye.regX = 133 / 2;
                    eyeImg.image.onload = function () {
                        eye.regX = eyeImg.image.width / 2;
                    };
                    eye.y = -50;
                    this.imageContainer.addChild(eye);
                };
                return Jelly;
            })(fpair.view.JellyContainer);
            view.Jelly = Jelly;
        })(gameplay.view || (gameplay.view = {}));
        var view = gameplay.view;
    })(fpair.gameplay || (fpair.gameplay = {}));
    var gameplay = fpair.gameplay;
})(fpair || (fpair = {}));
//# sourceMappingURL=Jelly.js.map
