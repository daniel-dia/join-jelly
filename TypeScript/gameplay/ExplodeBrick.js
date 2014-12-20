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
        var ExplodeBricks = (function (_super) {
            __extends(ExplodeBricks, _super);
            function ExplodeBricks() {
                _super.apply(this, arguments);
            }
            // add a random tile with value 1 on board
            ExplodeBricks.prototype.addRandomTileOnBoard = function () {
                var badChance = Math.random() * 10;
                var value = 1;
                if (badChance > 5)
                    value = -1;
                // if there is no more empty tiles, ends the game
                var empty = this.board.getEmptyTiles();
                if (empty.length > 0) {
                    var i = Math.floor(Math.random() * empty.length);
                    var tile = empty[i];
                    tile.setNumber(value);
                    if (value <= 0)
                        tile.lock();
                    return true;
                }
                return false;
            };
            // verifies if a tile can pair another, and make it happens
            ExplodeBricks.prototype.match = function (origin, target) {
                var position = parseInt(target.name);
                var ok = _super.prototype.match.call(this, origin, target);
                if (ok) {
                    var array = [
                        position + 1,
                        position - 1,
                        position + this.boardSize,
                        position - this.boardSize,
                        position + this.boardSize + 1,
                        position - this.boardSize + 1,
                        position + this.boardSize - 1,
                        position - this.boardSize - 1,
                    ];
                    for (var i in array) {
                        var tile = this.board.getTileById(array[i]);
                        if (tile && tile.getNumber() < 0) {
                            tile.unlock();
                            tile.setNumber(0);
                        }
                    }
                }
                return ok;
            };
            // level up
            ExplodeBricks.prototype.levelUp = function (level) {
                _super.prototype.levelUp.call(this, level);
                this.cleanDirty();
            };
            // clean dirty
            ExplodeBricks.prototype.cleanDirty = function () {
                var tiles = this.board.getAllTiles();
                for (var t in tiles) {
                    if (tiles[t].getNumber() < 0)
                        tiles[t].setNumber(0);
                }
            };
            return ExplodeBricks;
        })(gameplay.GamePlayScreen);
        gameplay.ExplodeBricks = ExplodeBricks;
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=ExplodeBrick.js.map