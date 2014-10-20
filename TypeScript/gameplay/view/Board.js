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
            var Board = (function (_super) {
                __extends(Board, _super);
                // #region Initialization ----------------------------------------------------------------------
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
                //add tiles on the board
                Board.prototype.addTiles = function (boardWidth, boardHeight, tileSize, img) {
                    var _this = this;
                    var touchOffset = [];

                    for (var x = 0; x < boardWidth; x++) {
                        for (var y = 0; y < boardHeight; y++) {
                            var tileDO = new view.Tile(x, y, tileSize);

                            this.tiles.push(tileDO);
                            this.addChild(tileDO);
                            tileDO.setNumber(0);
                            tileDO.name = (this.boardWidth * y + x).toString();
                            tileDO.set(this.getTilePositionByCoords(x, y, tileSize));
                        }
                    }

                    this.addEventListener("mousedown", function (e) {
                        var tile = _this.getTileByRawPos(e.localX, e.localY, tileSize);

                        if (tile) {
                            _this.touchDictionary[e.pointerID] = tile;

                            //store offset mouse position
                            touchOffset[e.pointerID] = { x: tile.x - e.localX, y: tile.y - e.localY };
                            tile.drag();

                            //bring to front
                            _this.setChildIndex(tile, _this.getNumChildren() - 1);

                            createjs.Sound.play('h1');
                        }
                    });

                    //Press Move
                    this.addEventListener("pressmove", function (e) {
                        //get tile by touch
                        var tile = _this.touchDictionary[e.pointerID];
                        if (tile) {
                            tile.x = e.localX + touchOffset[e.pointerID].x;
                            tile.y = e.localY + touchOffset[e.pointerID].y;
                            tile.locked = true;

                            var targetName = _this.getTileIdByPos(e.localX, e.localY, tileSize);

                            if (targetName.toString() != tile.name) {
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
                            tile.release();
                        }
                    });
                };

                // #endregion
                // #region Tile manager ------------------------------------------------------------------------
                //set a tile value
                Board.prototype.setTileValue = function (tileId, value) {
                    var t = this.getTileById(tileId);
                    if (t)
                        t.setNumber(value);

                    //plays sound if is new jelly
                    if (value == 1)
                        createjs.Sound.play('s' + (Math.floor(Math.random() * 3) + 1), null, 400);
                };

                //get a tile id by its x and y pos
                Board.prototype.getTileIdByPos = function (rawx, rawy, tileSize) {
                    var coords = this.getTileCoordsByRawPos(rawx, rawy, tileSize);
                    return (this.boardWidth * coords.y + coords.x);
                };

                //get tule position by pointer position
                Board.prototype.getTileByRawPos = function (rawx, rawy, tileSize) {
                    var id = this.getTileIdByPos(rawx, rawy, tileSize);
                    return this.getTileById(id);
                };

                //get tile coordinates by pointer position
                Board.prototype.getTileCoordsByRawPos = function (rawx, rawy, tileSize) {
                    var x = Math.floor(rawx / tileSize);
                    var y = Math.floor(rawy / tileSize);
                    return { x: x, y: y };
                };

                //get a new position for a tile based on its index
                Board.prototype.getTilePositionByCoords = function (x, y, tileSize) {
                    return {
                        x: (x + 1 / 2) * tileSize + (Math.random() - 0.5) * tileSize / 5,
                        y: (y + 1 / 2) * tileSize + (Math.random() - 0.5) * tileSize / 5
                    };
                };

                //get a tile object by its id
                Board.prototype.getTileById = function (id) {
                    return this.getChildByName(id.toString());
                };

                // release all Jellyies
                Board.prototype.releaseAll = function () {
                    for (var t in this.touchDictionary)
                        this.releaseDrag(this.touchDictionary[t]);
                };

                //release e tile
                Board.prototype.releaseDrag = function (tile, match, target) {
                    var _this = this;
                    if (typeof match === "undefined") { match = true; }
                    var index = this.touchDictionary.indexOf(tile);
                    delete this.touchDictionary[index];

                    createjs.Tween.removeTweens(tile);
                    tile.scaleY = tile.scaleX = 1;

                    tile.locked = false;

                    //if tiles match
                    if (match && target) {
                        var pos = this.getTilePositionByCoords(target.posx, target.posy, this.tileSize);
                        createjs.Tween.get(tile).to({ x: pos.x, y: pos.y, alpha: 0 }, 100, createjs.Ease.quadInOut).call(function () {
                            tile.set(_this.getTilePositionByCoords(tile.posx, tile.posy, _this.tileSize));
                        });
                    } else {
                        createjs.Tween.get(tile).to(this.getTilePositionByCoords(tile.posx, tile.posy, this.tileSize), 200, createjs.Ease.sineInOut).call(function () {
                            //set the z-order
                            _this.arrangeZOrder();
                        });
                    }
                };

                // #endregion
                // #region behaviour ----------------------------------------------------------------------------------
                //organize all z-order
                Board.prototype.arrangeZOrder = function () {
                    for (var t = this.tiles.length - 1; t >= 0; t--)
                        this.setChildIndex(this.tiles[t], 0);
                };

                //match 2 tiles
                Board.prototype.match = function (origin, target) {
                    var tile = this.getTileById(target);
                    var old = this.getTileById(origin);

                    this.releaseDrag(old, true, tile);

                    tile.set({ scaleX: 1.8, scaleY: 1.8, alpha: 0 });
                    createjs.Tween.get(tile).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 140, createjs.Ease.cubicOut);

                    createjs.Sound.play('j' + (Math.floor(Math.random() * 4) + 1));
                };

                Board.prototype.clean = function () {
                    for (var t in this.tiles)
                        this.tiles[t].setNumber(0);
                };
                return Board;
            })(createjs.Container);
            view.Board = Board;
        })(gameplay.view || (gameplay.view = {}));
        var view = gameplay.view;
    })(joinjelly.gameplay || (joinjelly.gameplay = {}));
    var gameplay = joinjelly.gameplay;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=Board.js.map
