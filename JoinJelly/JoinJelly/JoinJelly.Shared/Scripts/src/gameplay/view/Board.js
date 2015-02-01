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
            var Board = (function (_super) {
                __extends(Board, _super);
                // #region Initialization ----------------------------------------------------------------------
                function Board(boardWidth, boardHeight, tileSize, img) {
                    _super.call(this);
                    this.touchDictionary = new Array();
                    this.alarming = false;
                    this.tilesContainer = new createjs.Container();
                    this.addChild(this.tilesContainer);
                    this.tileSize = tileSize;
                    this.tiles = [];
                    this.boardHeight = boardHeight;
                    this.boardWidth = boardWidth;
                    this.addTiles(boardWidth, boardHeight, tileSize, img);
                }
                // add tiles on the board
                Board.prototype.addTiles = function (boardWidth, boardHeight, tileSize, img) {
                    var _this = this;
                    var touchOffset = [];
                    for (var x = 0; x < boardWidth; x++) {
                        for (var y = 0; y < boardHeight; y++) {
                            var tileDO = new gameplay.Tile(x, y, tileSize);
                            // add a tile background
                            if ((x + y) % 2 == 0) {
                                var shape = new createjs.Shape();
                                this.tilesContainer.addChild(shape);
                                shape.graphics.beginFill("rgba(255,255,255,0.2)").drawRect(tileSize * x, tileSize * y + tileSize * 0.2, tileSize, tileSize);
                            }
                            // add a jelly on tile
                            this.tiles.push(tileDO);
                            this.tilesContainer.addChild(tileDO);
                            tileDO.setNumber(0);
                            tileDO.name = (this.boardWidth * y + x).toString();
                            tileDO.set(this.getTilePositionByCoords(x, y, tileSize));
                        }
                    }
                    this.tilesContainer.addEventListener("mousedown", function (e) {
                        var tile = _this.getTileByRawPos(e.localX, e.localY, tileSize);
                        if (tile && tile.isUnlocked()) {
                            tile.lock();
                            _this.touchDictionary[e.pointerID] = tile;
                            //store offset mouse position
                            touchOffset[e.pointerID] = { x: tile.x - e.localX, y: tile.y - e.localY };
                            tile.drag();
                            //bring to front
                            _this.tilesContainer.setChildIndex(tile, _this.tilesContainer.getNumChildren() - 1);
                            gameui.AssetsManager.playSound('soundh_1');
                        }
                    });
                    //Press Move
                    this.tilesContainer.addEventListener("pressmove", function (e) {
                        //get tile by touch
                        var tile = _this.touchDictionary[e.pointerID];
                        if (tile) {
                            tile.x = e.localX + touchOffset[e.pointerID].x;
                            tile.y = e.localY + touchOffset[e.pointerID].y;
                            tile.lock();
                            //var targetName = this.getTileIdByPos(e.localX, e.localY, tileSize);
                            var target = _this.getTileByRawPos(e.localX, e.localY, tileSize);
                            if (target && target.name.toString() != tile.name) {
                                if (target.isUnlocked())
                                    _this.dispatchEvent("tileMove", { origin: tile, target: target });
                            }
                        }
                    });
                    //Press Up
                    this.tilesContainer.addEventListener("pressup", function (e) {
                        var tile = _this.touchDictionary[e.pointerID];
                        if (tile) {
                            tile.unlock;
                            _this.releaseDrag(tile, false);
                            tile.release();
                        }
                    });
                };
                // #endregion
                // #region Tile manager ------------------------------------------------------------------------
                // set a tile value
                Board.prototype.setTileValue = function (tileId, value) {
                    var t = this.getTileById(tileId);
                    if (t)
                        t.setNumber(value);
                    //plays sound if is new jelly
                    if (value == 1)
                        gameui.AssetsManager.playSound("sound_s" + (Math.floor(Math.random() * 3) + 1), null, 400);
                };
                // get a tile id by its x and y pos
                Board.prototype.getTileIdByPos = function (rawx, rawy, tileSize) {
                    var coords = this.getTileCoordsByRawPos(rawx, rawy, tileSize);
                    return (this.boardWidth * coords.y + coords.x);
                };
                // get tule position by pointer position
                Board.prototype.getTileByRawPos = function (rawx, rawy, tileSize) {
                    var id = this.getTileIdByPos(rawx, rawy, tileSize);
                    return this.getTileById(id);
                };
                // get tile coordinates by pointer position
                Board.prototype.getTileCoordsByRawPos = function (rawx, rawy, tileSize) {
                    var x = Math.floor(rawx / tileSize);
                    var y = Math.floor(rawy / tileSize);
                    return { x: x, y: y };
                };
                // get a new position for a tile based on its index
                Board.prototype.getTilePositionByCoords = function (x, y, tileSize) {
                    return {
                        x: (x + 1 / 2) * tileSize + (Math.random() - 0.5) * tileSize / 5,
                        y: (y + 1 / 2) * tileSize + (Math.random() - 0.5) * tileSize / 5
                    };
                };
                // get a tile object by its id
                Board.prototype.getTileById = function (id) {
                    return this.tilesContainer.getChildByName(id.toString());
                };
                // release all Jellyies
                Board.prototype.releaseAll = function () {
                    for (var t in this.touchDictionary)
                        this.releaseDrag(this.touchDictionary[t]);
                };
                Board.prototype.sumAllTiles = function () {
                    var sum = 0;
                    for (var t in this.tiles) {
                        sum += this.tiles[t].getNumber();
                    }
                    return sum;
                };
                Board.prototype.getEmptyTiles = function () {
                    //get next jelly
                    var total = this.boardHeight * this.boardWidth;
                    var emptyTiles = [];
                    for (var t = 0; t < total; t++)
                        if (this.tiles[t].isEmpty())
                            emptyTiles.push(this.tiles[t]);
                    return emptyTiles;
                };
                Board.prototype.getAllTiles = function () {
                    return this.tiles;
                };
                Board.prototype.getTilePosition = function (tile) {
                    return parseInt(tile.name);
                };
                Board.prototype.getNeighborTiles = function (tile) {
                    var position = this.getTilePosition(tile);
                    var neighborPos = [
                        position + 1,
                        position - 1,
                        position + this.boardWidth,
                        position - this.boardWidth,
                        position + this.boardWidth + 1,
                        position - this.boardWidth + 1,
                        position + this.boardWidth - 1,
                        position - this.boardWidth - 1,
                    ];
                    var neighbor = [];
                    for (var p in neighborPos)
                        neighbor.push(this.getTileById(neighborPos[p]));
                    return neighbor;
                };
                // calculate a percent 
                Board.prototype.getPercentEmptySpaces = function () {
                    var total = this.boardHeight * this.boardWidth;
                    var empty = this.getEmptyTiles().length;
                    return empty / total;
                };
                // release e tile
                Board.prototype.releaseDrag = function (tile, match, target) {
                    var _this = this;
                    if (match === void 0) { match = true; }
                    var index = this.touchDictionary.indexOf(tile);
                    delete this.touchDictionary[index];
                    createjs.Tween.removeTweens(tile);
                    tile.scaleY = tile.scaleX = 1;
                    //if tiles match
                    if (match && target) {
                        var pos = this.getTilePositionByCoords(target.posx, target.posy, this.tileSize);
                        createjs.Tween.get(tile).to({ x: pos.x, y: pos.y, alpha: 0 }, 100, createjs.Ease.quadInOut).call(function () {
                            tile.set(_this.getTilePositionByCoords(tile.posx, tile.posy, _this.tileSize));
                            _this.arrangeZOrder();
                            tile.unlock();
                            tile.alpha = 1;
                        });
                    }
                    else {
                        tile.release();
                        createjs.Tween.get(tile).to(this.getTilePositionByCoords(tile.posx, tile.posy, this.tileSize), 200, createjs.Ease.sineInOut).call(function () {
                            //set the z-order
                            _this.arrangeZOrder();
                            tile.unlock();
                        });
                    }
                };
                Board.prototype.getHighestTileValue = function () {
                    var highestTile = 0;
                    for (var j in this.tiles)
                        if (this.tiles[j].getNumber() > highestTile)
                            highestTile = this.tiles[j].getNumber();
                    return highestTile;
                };
                Board.prototype.lock = function () {
                    this.tilesContainer.mouseEnabled = false;
                };
                Board.prototype.unlock = function () {
                    this.tilesContainer.mouseEnabled = true;
                };
                // #endregion
                // #region behaviour ----------------------------------------------------------------------------------
                // organize all z-order
                Board.prototype.arrangeZOrder = function () {
                    for (var t = 0; t < this.tiles.length; t++)
                        this.tilesContainer.setChildIndex(this.tiles[t], this.tilesContainer.getNumChildren() - 1);
                };
                // match 2 tiles
                Board.prototype.match = function (origin, target) {
                    this.releaseDrag(origin, true, target);
                    target.set({ scaleX: 1.8, scaleY: 1.8, alpha: 0 });
                    createjs.Tween.get(target).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 140, createjs.Ease.cubicOut);
                    gameui.AssetsManager.playSound('sound_j' + (Math.floor(Math.random() * 4) + 1));
                };
                // clar all board
                Board.prototype.cleanBoard = function () {
                    for (var t in this.tiles)
                        this.tiles[t].setNumber(0);
                };
                // #endregion
                // #region Animations ----------------------------------------------------------------------------------
                // create and execute a level up effect on tiles
                Board.prototype.levelUpEffect = function () {
                    var _this = this;
                    // reseteffect timeOut id
                    var currentTile = 0;
                    for (var t in this.tiles) {
                        // set timeout for the animation. each tile by time interval
                        setTimeout(function () {
                            // calculate tile id
                            var calculatedTile = (_this.boardHeight * _this.boardWidth) - (currentTile % _this.boardWidth * _this.boardWidth + Math.floor(currentTile / _this.boardWidth)) - 1;
                            // define tile by it id
                            var tile = _this.tiles[calculatedTile];
                            // create a tween fast move
                            createjs.Tween.get(tile).to({ scaleY: 1.5 }, 100).to({ scaleY: 1 }, 100);
                            // play a jelly light effect
                            tile.jelly.playLevelUp();
                            // unlocks it
                            tile.unlock();
                            // increment effect timeOut id
                            currentTile++;
                        }, 20 * t);
                    }
                };
                // create and execute a end game effect on tiles
                Board.prototype.endGameEffect = function () {
                    var _this = this;
                    // reseteffect timeOut id
                    var currentTile = 0;
                    for (var t in this.tiles) {
                        // set timeout for the animation. each tile by time interval
                        setTimeout(function () {
                            // increment effect timeOut id
                            currentTile++;
                            // calculate tile id
                            var x = (currentTile % _this.boardWidth * _this.boardWidth + Math.floor(currentTile / _this.boardWidth));
                            // define tile by it id
                            var tile = _this.tiles[x];
                            // create a tween fast move
                            createjs.Tween.get(tile).to({ scaleY: 0.5 }, 100).to({ scaleY: 1 }, 100);
                            // play a jelly light effect
                            tile.jelly.playLevelUp();
                        }, 20 * t);
                    }
                };
                Board.prototype.setAlarm = function (alarm) {
                    if (alarm) {
                        if (this.alarming)
                            return;
                        createjs.Tween.get(this, { loop: true }).to({ x: -10 }, 50).to({ x: +10 }, 100).to({ x: -10 }, 100).to({ x: 0 }, 50).wait(200);
                    }
                    else {
                        if (!this.alarming)
                            return;
                        createjs.Tween.removeTweens(this);
                    }
                    this.alarming = alarm;
                };
                return Board;
            })(createjs.Container);
            view.Board = Board;
        })(view = gameplay.view || (gameplay.view = {}));
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=Board.js.map