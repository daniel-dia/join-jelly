var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Board = (function (_super) {
    __extends(Board, _super);
    function Board(boardWidth, boardHeight, tileSize, img) {
        _super.call(this);
        this.touchDictionary = new Array();

        this.tileSize = tileSize;

        this.tiles = [];
        this.boardHeight = boardHeight;
        this.boardWidth = boardWidth;

        //this.addBackground(boardWidth, boardHeight, tileSize, img);
        this.addTiles(boardWidth, boardHeight, tileSize, img);
    }
    //----------------------------------------------------------------------------------
    Board.prototype.getTileIdByPos = function (rawx, rawy, tileSize) {
        var coords = this.getTileCoordsByRawPos(rawx, rawy, tileSize);
        return coords.x + "-" + coords.y;
    };

    Board.prototype.getTileByRawPos = function (rawx, rawy, tileSize) {
        var id = this.getTileIdByPos(rawx, rawy, tileSize);
        return this.getTileById(id);
    };

    Board.prototype.getTileCoordsByRawPos = function (x, y, tileSize) {
        var x = Math.floor(x / tileSize);
        var y = Math.floor(y / tileSize);
        return { x: x, y: y };
    };

    Board.prototype.getTilePositionByCoords = function (x, y, tileSize) {
        return {
            x: (x + 1 / 2) * tileSize + (Math.random() - 0.5) * tileSize / 5,
            y: (y + 1 / 2) * tileSize + (Math.random() - 0.5) * tileSize / 5
        };
    };

    Board.prototype.getTileById = function (id) {
        return this.getChildByName(id);
    };

    Board.prototype.getTile = function (x, y) {
        return this.getChildByName(x + "-" + y);
    };

    //----------------------------------------------------------------------------------
    Board.prototype.addTiles = function (boardWidth, boardHeight, tileSize, img) {
        var _this = this;
        for (var x = 0; x < boardWidth; x++) {
            for (var y = 0; y < boardHeight; y++) {
                var t = new Tile(x, y, tileSize);

                //tile funcionar
                this.tiles.push(t);
                this.addChild(t);
                t.setNumber(0);

                //this.tilesPosition[t.name]=
                t.set(this.getTilePositionByCoords(x, y, tileSize));

                this.addEventListener("mousedown", function (e) {
                    var tile = _this.getTileByRawPos(e.localX, e.localY, tileSize);

                    if (tile) {
                        _this.touchDictionary[e.pointerID] = tile;
                        tile.executeAnimationHold();
                        createjs.Tween.get(tile).to({ x: e.localX, y: e.localY }, 100, createjs.Ease.quadInOut);

                        //bring to front
                        _this.setChildIndex(tile, _this.getNumChildren() - 1);
                    }
                });

                //Press Move
                this.addEventListener("pressmove", function (e) {
                    //get tile by touch
                    var tile = _this.touchDictionary[e.pointerID];
                    if (tile) {
                        tile.x = e.localX;
                        tile.y = e.localY;
                        tile.locked = true;

                        var targetName = _this.getTileIdByPos(e.localX, e.localY, tileSize);

                        if (targetName != tile.name) {
                            _this.dispatchEvent("tileDrop", { origin: tile.name, target: targetName });
                        }
                    }
                });

                //Press Up
                this.addEventListener("pressup", function (e) {
                    var tile = _this.touchDictionary[e.pointerID];
                    if (tile) {
                        tile.locked = false;
                        _this.releaseDrag(tile, false);
                        tile.executeAimationRelease();
                    }
                });
            }
        }
    };

    //---------------------------------------------------------------------------------
    Board.prototype.releaseDrag = function (tile, match) {
        if (typeof match === "undefined") { match = true; }
        var index = this.touchDictionary.indexOf(tile);
        delete this.touchDictionary[index];

        createjs.Tween.removeTweens(tile);
        tile.scaleY = tile.scaleX = 1;
        tile.locked = false;
        if (match)
            tile.set(this.getTilePositionByCoords(tile.posx, tile.posy, this.tileSize));
        else
            createjs.Tween.get(tile).to(this.getTilePositionByCoords(tile.posx, tile.posy, this.tileSize), 200, createjs.Ease.sineInOut);
    };

    Board.prototype.match = function (origin, target) {
        this.releaseDrag(this.getTileById(origin));

        var tile = this.getTileById(target);

        this.releaseDrag(tile);

        tile.set({ scaleX: 1.8, scaleY: 1.8, alpha: 1 });
        createjs.Tween.get(tile).to({ scaleX: 1, scaleY: 1 }, 140, createjs.Ease.cubicOut);
    };

    //---------------------------------------------------------------------------------
    Board.prototype.sumAll = function () {
        var sum = 0;
        for (var t in this.tiles)
            sum += this.tiles[t].getNumber();
        return sum;
    };

    Board.prototype.clean = function () {
        for (var t in this.tiles)
            this.tiles[t].setNumber(0);
    };
    return Board;
})(createjs.Container);
//# sourceMappingURL=Board.js.map
