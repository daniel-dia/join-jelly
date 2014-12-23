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
                this.initialDirtyProbability = 0.1;
                this.finalDirtyProbability = 0.6;
                this.easeDirtyProbability = 0.98;
            }
            // add a random tile with value 1 on board
            ExplodeBricks.prototype.addRandomTileOnBoard = function () {
                var _this = this;
                _super.prototype.addRandomTileOnBoard.call(this);
                // randomly adda a dirty to the board
                if (this.getDirtyProbabilityByLevel(this.level, this.initialDirtyProbability, this.finalDirtyProbability, this.easeDirtyProbability) > Math.random())
                    setTimeout(function () {
                        _super.prototype.addRandomTileOnBoard.call(_this, -1);
                    }, 500);
            };
            // verifies if a tile can pair another, and make it happens
            ExplodeBricks.prototype.match = function (origin, target) {
                var match = _super.prototype.match.call(this, origin, target);
                if (match) {
                    var neighborTiles = this.board.getNeighborTiles(target);
                    for (var t in neighborTiles) {
                        var tile = neighborTiles[t];
                        if (tile && tile.getNumber() < 0) {
                            var posx = target.x + (tile.x - target.x) * 1.5;
                            var posy = target.y + (tile.y - target.y) * 1.5;
                            this.board.fadeTileToPos(tile, posx, posy, 200);
                            tile.setNumber(0);
                        }
                    }
                }
                return match;
            };
            // level up
            ExplodeBricks.prototype.levelUpInterfaceEffect = function (level) {
                _super.prototype.levelUpInterfaceEffect.call(this, level);
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
            // calculate time interval for a level.
            ExplodeBricks.prototype.getDirtyProbabilityByLevel = function (level, initialDirtyProbability, finalDirtyProbability, easeDirtyProbability) {
                return initialDirtyProbability * Math.pow(easeDirtyProbability, level) + finalDirtyProbability * (1 - Math.pow(easeDirtyProbability, level));
            };
            return ExplodeBricks;
        })(gameplay.GamePlayScreen);
        gameplay.ExplodeBricks = ExplodeBricks;
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=ExplodeBrick.js.map