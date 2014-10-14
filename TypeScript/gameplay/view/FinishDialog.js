var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    (function (gameplay) {
        (function (view) {
            var FinishMenu = (function (_super) {
                __extends(FinishMenu, _super);
                function FinishMenu(score, best, jelly) {
                    _super.call(this, "GAME OVER");
                    this.addButtons();
                    this.addPoints(score, best);
                    this.addLastJelly();
                }
                //creates buttons controls
                FinishMenu.prototype.addButtons = function () {
                    var _this = this;
                    //add continue button;
                    var ok = new gameui.ui.ImageButton("GameOverOk", (function () {
                        _this.dispatchEvent("ok");
                    }));
                    ok.set({ x: 771, y: 1599 });
                    this.addChild(ok);

                    //add share button;
                    var board = new gameui.ui.ImageButton("GameOverBoard", (function () {
                        _this.dispatchEvent("board");
                    }));
                    board.set({ x: 353, y: 1570 });
                    this.addChild(board);

                    //add showBoard button
                    var share = new gameui.ui.ImageButton("GameOverShare", (function () {
                        _this.dispatchEvent("share");
                    }));
                    share.set({ x: 1190, y: 1570 });
                    this.addChild(share);
                };

                // create points control
                FinishMenu.prototype.addPoints = function (score, best) {
                    var container = new createjs.Container();
                    var textSprites = new createjs.SpriteSheet(Deburilfont);

                    //creates points Bg
                    var bg = gameui.AssetsManager.getBitmap("GameOverBgPoints");
                    bg.set({ x: defaultWidth / 2, y: 565, regX: 1056 / 2 });
                    container.addChild(bg);

                    //create points object
                    var tx = new createjs.BitmapText("Score", textSprites);
                    tx.set({ x: 288, y: 592 });
                    tx.scaleX = tx.scaleY = 0.7;
                    container.addChild(tx);

                    //create "points" text
                    var tx = new createjs.BitmapText(score.toString(), textSprites);
                    tx.set({ x: defaultWidth / 2, y: 747 });
                    container.addChild(tx);
                    tx.scaleX = tx.scaleY = 2;
                    tx.regX = tx.getBounds().width / 2;

                    //create HighScore text
                    var tx = new createjs.BitmapText("High Score: " + best.toString(), textSprites);
                    tx.set({ x: 1240, y: 835 });
                    container.addChild(tx);
                    tx.scaleX = tx.scaleY = 0.7;
                    tx.regX = tx.getBounds().width;

                    this.addChild(container);
                    return container;
                };

                // creates last jelly control
                FinishMenu.prototype.addLastJelly = function () {
                    var container = new createjs.Container();
                    var textSprites = new createjs.SpriteSheet(Deburilfont);

                    this.addChild(container);

                    //add background
                    var bg = gameui.AssetsManager.getBitmap("GameOverBgJelly");
                    bg.set({ x: defaultWidth / 2, y: 951, regX: 797 / 2 });
                    container.addChild(bg);

                    //add "LastJelly" Text
                    var tx = new createjs.BitmapText("Last Jelly", textSprites);
                    tx.set({ x: 420, y: 980 });
                    container.addChild(tx);
                    tx.scaleX = tx.scaleY = 0.7;

                    //add "LastJelly" name Text
                    var tx = new createjs.BitmapText("Mr Anything", textSprites);
                    tx.set({ x: defaultWidth / 2, y: 1408 });
                    container.addChild(tx);
                    tx.regX = tx.getBounds().width / 2;
                    tx.scaleX = tx.scaleY = 0.7;

                    //add Jelly
                    var jelly = new gameplay.view.Jelly();
                    container.addChild(jelly);
                    this.addChild(container);

                    return container;
                };
                return FinishMenu;
            })(joinjelly.menus.view.FlyOutMenu);
            view.FinishMenu = FinishMenu;
        })(gameplay.view || (gameplay.view = {}));
        var view = gameplay.view;
    })(joinjelly.gameplay || (joinjelly.gameplay = {}));
    var gameplay = joinjelly.gameplay;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=FinishDialog.js.map
