var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    var Loading = (function (_super) {
        __extends(Loading, _super);
        function Loading() {
            _super.call(this);
            this.initializeImages();
        }
        Loading.prototype.initializeImages = function () {
            var _this = this;
            assetscale = 1;
            //if (window.innerWidth <= 1024) assetscale = 0.5;
            //if (window.innerWidth <= 384) assetscale = 0.25;
            var queue = gameui.AssetsManager.loadAssets(this.getAssetsManifest(assetscale)); //, spriteSheets, images);
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
            queue.addEventListener("progress", function (evt) {
                text.text = StringResources.menus.loading + "\n" + Math.floor(evt["progress"] * 100).toString() + "%";
                return true;
            });
            //creates load complete action
            queue.addEventListener("complete", function (evt) {
                if (_this.loaded)
                    _this.loaded();
                return true;
            });
            //set default sound button
            gameui.Button.DefaultSoundId = "Interface Sound-06";
            //load font
            debussy = createSpriteSheetFromFont(debussyFont, "assets/images_" + assetscale + "x/");
            gameui.AssetsManager.loadFontSpriteSheet("debussy", debussy);
        };
        Loading.prototype.getAssetsManifest = function (scale) {
            return [
                { id: "j1024", src: "assets/images_" + scale + "x/j1024.png" },
                { id: "j2048", src: "assets/images_" + scale + "x/j2048.png" },
                { id: "j4096", src: "assets/images_" + scale + "x/j4096.png" },
                { id: "j8192", src: "assets/images_" + scale + "x/j8192.png" },
                { id: "Background", src: "assets/images_" + scale + "x/Background.jpg" },
                { id: "backhome", src: "assets/images_" + scale + "x/BackMain.jpg" },
                { id: "bonus_bar", src: "assets/images_" + scale + "x/bonus_bar.png" },
                { id: "bonus_border", src: "assets/images_" + scale + "x/bonus_border.png" },
                { id: "ChubbyFont", src: "assets/images_" + scale + "x/ChubbyFont.png" },
                { id: "font", src: "assets/images_" + scale + "x/font.png" },
                { id: "e1", src: "assets/images_" + scale + "x/e1.png" },
                { id: "e128", src: "assets/images_" + scale + "x/e128.png" },
                { id: "e16", src: "assets/images_" + scale + "x/e16.png" },
                { id: "e2", src: "assets/images_" + scale + "x/e2.png" },
                { id: "e256", src: "assets/images_" + scale + "x/e256.png" },
                { id: "e32", src: "assets/images_" + scale + "x/e32.png" },
                { id: "e4", src: "assets/images_" + scale + "x/e4.png" },
                { id: "e512", src: "assets/images_" + scale + "x/e512.png" },
                { id: "e64", src: "assets/images_" + scale + "x/e64.png" },
                { id: "e8", src: "assets/images_" + scale + "x/e8.png" },
                { id: "e1024", src: "assets/images_" + scale + "x/e1024.png" },
                { id: "e2048", src: "assets/images_" + scale + "x/e2048.png" },
                { id: "e4096", src: "assets/images_" + scale + "x/e4096.png" },
                { id: "e8192", src: "assets/images_" + scale + "x/e8192.png" },
                { id: "footer", src: "assets/images_" + scale + "x/footer.png" },
                { id: "header", src: "assets/images_" + scale + "x/header.png" },
                { id: "j-1", src: "assets/images_" + scale + "x/j-1.png" },
                { id: "e-1", src: "assets/images_" + scale + "x/e-1.png" },
                { id: "j1", src: "assets/images_" + scale + "x/j1.png" },
                { id: "j128", src: "assets/images_" + scale + "x/j128.png" },
                { id: "j16", src: "assets/images_" + scale + "x/j16.png" },
                { id: "j2", src: "assets/images_" + scale + "x/j2.png" },
                { id: "j256", src: "assets/images_" + scale + "x/j256.png" },
                { id: "j32", src: "assets/images_" + scale + "x/j32.png" },
                { id: "j4", src: "assets/images_" + scale + "x/j4.png" },
                { id: "j512", src: "assets/images_" + scale + "x/j512.png" },
                { id: "j64", src: "assets/images_" + scale + "x/j64.png" },
                { id: "j8", src: "assets/images_" + scale + "x/j8.png" },
                { id: "time_bar", src: "assets/images_" + scale + "x/time_bar.png" },
                { id: "time_bar_red", src: "assets/images_" + scale + "x/time_bar_red.png" },
                { id: "time_bar_bright", src: "assets/images_" + scale + "x/time_bar_bright.png" },
                { id: "time_border", src: "assets/images_" + scale + "x/time_border.png" },
                { id: "shadow", src: "assets/images_" + scale + "x/shadow.png" },
                { id: "particle", src: "assets/images_" + scale + "x/Particle.png" },
                { id: "BtRestart", src: "assets/images_" + scale + "x/BtRestart.png" },
                { id: "BtHome", src: "assets/images_" + scale + "x/BtHome.png" },
                { id: "BtPlay", src: "assets/images_" + scale + "x/BtPlay.png" },
                { id: "BtStore", src: "assets/images_" + scale + "x/BtStore.png" },
                { id: "BtSettings", src: "assets/images_" + scale + "x/BtSettings.png" },
                { id: "BtRefresh", src: "assets/images_" + scale + "x/BtRefresh.png" },
                { id: "BtHelp", src: "assets/images_" + scale + "x/BtHelp.png" },
                { id: "BtInfo", src: "assets/images_" + scale + "x/BtInfo.png" },
                { id: "BtJelly", src: "assets/images_" + scale + "x/BtJelly.png" },
                { id: "BtPause", src: "assets/images_" + scale + "x/BtPause.png" },
                { id: "BtMusic", src: "assets/images_" + scale + "x/BtMusic.png" },
                { id: "BtMusicOff", src: "assets/images_" + scale + "x/BtMusicOff.png" },
                { id: "BtSound", src: "assets/images_" + scale + "x/BtSound.png" },
                { id: "BtSoundOff", src: "assets/images_" + scale + "x/BtSoundOff.png" },
                { id: "BtTutorial", src: "assets/images_" + scale + "x/BtTutorial.png" },
                { id: "BtBoard", src: "assets/images_" + scale + "x/BtBoard.png" },
                { id: "BtOk", src: "assets/images_" + scale + "x/BtOk.png" },
                { id: "BtShare", src: "assets/images_" + scale + "x/BtShare.png" },
                { id: "GameOverBgJelly", src: "assets/images_" + scale + "x/GameOverBgJelly.png" },
                { id: "GameOverBgPoints", src: "assets/images_" + scale + "x/GameOverBgPoints.png" },
                { id: "fxJoin", src: "assets/images_" + scale + "x/fxJoin.png" },
                { id: "t0", src: "assets/images_" + scale + "x/t0.png" },
                { id: "t1", src: "assets/images_" + scale + "x/t1.png" },
                { id: "t2", src: "assets/images_" + scale + "x/t2.png" },
                { id: "t3", src: "assets/images_" + scale + "x/t3.png" },
                { id: "t4", src: "assets/images_" + scale + "x/t4.png" },
                { id: "t5", src: "assets/images_" + scale + "x/t5.png" },
                { id: "FlyBG", src: "assets/images_" + scale + "x/FlyBG.png" },
                { id: "FlyGroup", src: "assets/images_" + scale + "x/FlyGroup.png" },
                { id: "footer", src: "assets/images_" + scale + "x/footer.png" },
                { id: "itemclean", src: "assets/images_" + scale + "x/itemClean.png" },
                { id: "itemfast", src: "assets/images_" + scale + "x/itemFast.png" },
                { id: "itemrevive", src: "assets/images_" + scale + "x/itemRevive.png" },
                { id: "itemtime", src: "assets/images_" + scale + "x/itemTime.png" },
                { id: "itemPack", src: "assets/images_" + scale + "x/itemPack.png" },
                { id: "lucky", src: "assets/images_" + scale + "x/lucky.png" },
                { id: "itemBG", src: "assets/images_" + scale + "x/itemBg.png" },
                { id: "itemBGDisabled", src: "assets/images_" + scale + "x/itemBgDisabled.png" },
                { id: "tutorialFinger", src: "assets/images_" + scale + "x/tutorialFinger.png" },
                { id: "ballon", src: "assets/images_" + scale + "x/ballon.png" },
                { id: "pediaItem", src: "assets/images_" + scale + "x/pediaItem.png" },
                { id: "BigBG", src: "assets/images_" + scale + "x/BigBG.png" },
                { id: "freezeEffect", src: "assets/images_" + scale + "x/freezeEffect.png" },
                { id: "fastEffect", src: "assets/images_" + scale + "x/fastEffect.png" },
                { id: "reviveEffect", src: "assets/images_" + scale + "x/reviveEffect.png" },
                { id: "cleanEffect", src: "assets/images_" + scale + "x/cleanEffect.png" },
                { id: "check", src: "assets/images_" + scale + "x/check.png" },
                { id: "unchecked", src: "assets/images_" + scale + "x/unchecked.png" },
                { id: "MessageBox", src: "assets/images_" + scale + "x/MessageBox.png" },
            ];
        };
        return Loading;
    })(gameui.ScreenState);
    joinjelly.Loading = Loading;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=LoadingScreen.js.map