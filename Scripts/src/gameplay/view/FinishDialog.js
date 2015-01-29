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
                    this.jellyText.regX = this.jellyText.getBounds().width / 2;
                    this.higghScoreText.regX = this.higghScoreText.getBounds().width;
                };
                return FinishMenu;
            })(joinjelly.menus.view.FlyOutMenu);
            view.FinishMenu = FinishMenu;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=FinishDialog.js.map