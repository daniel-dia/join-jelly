var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var fpair;
(function (fpair) {
    var Loading = (function (_super) {
        __extends(Loading, _super);
        function Loading() {
            _super.call(this);
            this.initializeImages();
        }
        Loading.prototype.initializeImages = function () {
            var _this = this;
            var loader = gameui.AssetsManager.loadAssets(this.getAssetsManifest(1));

            //var loader = Assets.loadAssets();
            var text = new createjs.Text("", "90px Arial", "#FFF");
            text.x = defaultWidth / 2;
            text.y = defaultHeight / 2;
            text.textAlign = "center";

            this.content.addChild(text);

            //add update% functtion
            loader.addEventListener("progress", function (evt) {
                text.text = "Loading" + "\n" + Math.floor(evt["progress"] * 100).toString() + "%";
                return true;
            });

            //creates load complete action
            loader.addEventListener("complete", function (evt) {
                if (_this.loaded)
                    _this.loaded();
                return true;
            });
        };

        Loading.prototype.getAssetsManifest = function (scale) {
            return [
                { id: "1024", src: "assets/1024.png" },
                { id: "2048", src: "assets/2048.png" },
                { id: "4096", src: "assets/4096.png" },
                { id: "8192", src: "assets/8192.png" },
                { id: "Background", src: "assets/Background.jpg" },
                { id: "Background2", src: "assets/Background2.jpg" },
                { id: "backhome", src: "assets/backhome.jpg" },
                { id: "bonus_bar", src: "assets/bonus_bar.png" },
                { id: "bonus_border", src: "assets/bonus_border.png" },
                { id: "bt", src: "assets/bt.png" },
                { id: "ChubbyFont", src: "assets/ChubbyFont.png" },
                { id: "Deburil", src: "assets/Deburil.png" },
                { id: "e1", src: "assets/e1.png" },
                { id: "e128", src: "assets/e128.png" },
                { id: "e16", src: "assets/e16.png" },
                { id: "e2", src: "assets/e2.png" },
                { id: "e256", src: "assets/e256.png" },
                { id: "e32", src: "assets/e32.png" },
                { id: "e4", src: "assets/e4.png" },
                { id: "e512", src: "assets/e512.png" },
                { id: "e64", src: "assets/e64.png" },
                { id: "e8", src: "assets/e8.png" },
                { id: "footer", src: "assets/footer.png" },
                { id: "header", src: "assets/header.png" },
                { id: "htmlBG", src: "assets/htmlBG.jpg" },
                { id: "iconMenu", src: "assets/iconMenu.png" },
                { id: "iconPause", src: "assets/iconPause.png" },
                { id: "iconPlay", src: "assets/iconPlay.png" },
                { id: "j1", src: "assets/j1.png" },
                { id: "j128", src: "assets/j128.png" },
                { id: "j16", src: "assets/j16.png" },
                { id: "j2", src: "assets/j2.png" },
                { id: "j256", src: "assets/j256.png" },
                { id: "j32", src: "assets/j32.png" },
                { id: "j4", src: "assets/j4.png" },
                { id: "j512", src: "assets/j512.png" },
                { id: "j64", src: "assets/j64.png" },
                { id: "j8", src: "assets/j8.png" },
                { id: "pause", src: "assets/pause.png" },
                { id: "PlayBt", src: "assets/PlayBt.png" },
                { id: "time_bar", src: "assets/time_bar.png" },
                { id: "time_border", src: "assets/time_border.png" },
                { id: "shadow", src: "assets/shadow.png" },
                { id: "ho1", src: "Sounds/ho1.mp3" },
                { id: "ho2", src: "Sounds/ho2.mp3" },
                { id: "je5", src: "Sounds/je5.mp3" },
                { id: "rl1", src: "Sounds/rl1.mp3" },
                { id: "sp1", src: "Sounds/sp1.mp3" },
                { id: "sp2", src: "Sounds/sp2.mp3" },
                { id: "sp3", src: "Sounds/sp3.mp3" },
                { id: "sp4", src: "Sounds/sp4.mp3" },
                { id: "bg1", src: "Sounds/bg1.mp3" }
            ];
        };
        return Loading;
    })(gameui.ScreenState);
    fpair.Loading = Loading;
})(fpair || (fpair = {}));
//# sourceMappingURL=LoadingScreen.js.map
