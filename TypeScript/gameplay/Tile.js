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
        var Tile = (function (_super) {
            __extends(Tile, _super);
            // contructr
            function Tile(posx, posy, tileSize) {
                _super.call(this);
                //store local variables
                this.tileSize = tileSize;
                this.posx = posx;
                this.posy = posy;
                ///set local positio
                this.regX = this.regY = tileSize / 2;
                //addObjects
                this.jelly = new gameplay.view.Jelly();
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
            Tile.prototype.isUnlocked = function () {
                return !this.locked;
            };
            Tile.prototype.lock = function () {
                this.locked = true;
            };
            Tile.prototype.unlock = function () {
                this.locked = false;
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
            // set tile number
            Tile.prototype.setNumber = function (value) {
                this.value = value;
                if (this.isUnlocked()) {
                    this.jelly.setNumber(value);
                    if (value > 0)
                        this.enable();
                    else
                        this.disable();
                }
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
//# sourceMappingURL=Tile.js.map