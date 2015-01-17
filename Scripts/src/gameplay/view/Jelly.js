var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
                    this.joinFx = gameui.AssetsManager.getBitmap("fxJoin");
                    this.joinFx.visible = false;
                    this.joinFx.regX = 100;
                    this.joinFx.regY = 100;
                    this.joinFx.y = -115;
                }
                Jelly.prototype.createJelly = function (value) {
                    var img = gameui.AssetsManager.getBitmap("j" + value);
                    //centralize
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
                    //add Eyes
                    var eye = new createjs.Container();
                    var eyeImg = gameui.AssetsManager.getBitmap("e" + value);
                    eyeImg.regY = 20;
                    createjs.Tween.get(eyeImg, { loop: true }).wait(3000 + Math.random() * 1000).to({ scaleY: 0.2 }, 100).to({ scaleY: 1 }, 100);
                    eye.addChild(eyeImg);
                    eye.regX = 133 / 2;
                    if (eyeImg.getBounds())
                        eye.regX = eyeImg.getBounds().width / 2;
                    eye.y = Math.min(-50, -eye.getBounds().height);
                    this.imageContainer.addChild(eye);
                };
                /// #endregion
                // #region behaviour ==============================================
                //set tile number
                Jelly.prototype.setNumber = function (value) {
                    if (this.currentValue == value)
                        return;
                    this.currentValue = value;
                    //update image 
                    this.imageContainer.removeAllChildren();
                    this.shadowContainer.removeAllChildren();
                    //if values equals zero, hide the tile
                    if (value == 0) {
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
                    createjs.Tween.get(this.joinFx).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 200).call(function () {
                        _this.joinFx.visible = true;
                    });
                    this.addChild(this.joinFx);
                    setTimeout(function () {
                        var x = 1;
                    }, 1000);
                };
                Jelly.prototype.playLevelUp = function () {
                    var _this = this;
                    this.joinFx.visible = true;
                    this.joinFx.set({ scaleX: 0, scaleY: 0, alpha: 0.6, visible: true });
                    createjs.Tween.get(this.joinFx).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 200).call(function () {
                        _this.joinFx.visible = true;
                    });
                    this.addChild(this.joinFx);
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
//# sourceMappingURL=Jelly.js.map