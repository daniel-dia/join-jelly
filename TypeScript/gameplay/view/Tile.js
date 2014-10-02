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
            var Tile = (function (_super) {
                __extends(Tile, _super);
                //contructr
                function Tile(posx, posy, tileSize) {
                    _super.call(this);

                    //store local variables
                    this.tileSize = tileSize;
                    this.posx = posx;
                    this.posy = posy;

                    ///set local positio
                    this.regX = this.regY = tileSize / 2;

                    //addObjects
                    this.jelly = new view.Jelly();
                    this.jelly.x = tileSize / 2;
                    this.jelly.y = tileSize;
                    this.jelly.scaleX = this.jelly.scaleY = this.tileSize / (220);
                    this.addChild(this.jelly);

                    //creates hitArea for the tile
                    this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("000").drawRect(0, 0, tileSize, tileSize));
                }
                Tile.prototype.release = function () {
                    this.jelly.executeAimationRelease();
                };

                Tile.prototype.drag = function () {
                    this.jelly.executeAnimationHold();
                };

                //set tile number
                Tile.prototype.setNumber = function (value) {
                    this.jelly.setNumber(value);
                    if (value == 0)
                        this.mouseEnabled = false;
                    else {
                        //enable mouse and visibility
                        this.mouseEnabled = true;
                        this.visible = true;
                        this.alpha = 1;
                    }
                };
                return Tile;
            })(createjs.Container);
            view.Tile = Tile;
        })(gameplay.view || (gameplay.view = {}));
        var view = gameplay.view;
    })(joinjelly.gameplay || (joinjelly.gameplay = {}));
    var gameplay = joinjelly.gameplay;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=Tile.js.map
