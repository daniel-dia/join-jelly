module joinjelly.gameplay {
    interface point { x: number; y: number }

    export class Board extends createjs.Container {

        private boardWidth: number;
        private boardHeight: number;
        private tiles: Array<Tile>;

        private tileSize: number;
        private touchDictionary: Array<Tile> = new Array();

        private alarming: boolean = false;
        private tilesContainer: createjs.Container;

        // #region Initialization ----------------------------------------------------------------------

        constructor(boardWidth: number, boardHeight: number, tileSize: number, img: boolean) {
            super();

            this.tilesContainer = new createjs.Container();
            this.addChild(this.tilesContainer);

            this.tileSize = tileSize;

            this.tiles = [];
            this.boardHeight = boardHeight;
            this.boardWidth = boardWidth;

            this.addTiles(boardWidth, boardHeight, tileSize, img);
            this.addMouseEvents(tileSize);

            this.regX = (boardWidth * tileSize / 2);
            this.regY = (boardHeight * tileSize / 2);

        }

        // add tiles on the board
        private addTiles(boardWidth: number, boardHeight: number, tileSize: number, img: boolean) {


            for (var x = 0; x < boardWidth; x++)
                for (var y = 0; y < boardHeight; y++)
                    this.addTile(x, y, tileSize);


        }

        // add a single tile on board
        private addTile(x: number, y: number, tileSize: number) {
            var tileDO = new Tile(x, y, tileSize);

            //// add a tile background
            //if ((x + y) % 2 == 0) {
            //    var shape = new createjs.Shape();
            //    this.tilesContainer.addChild(shape);
            //    shape.graphics.beginFill("rgba(255,255,255,0.2)").drawRect(tileSize * x, tileSize * y + tileSize * 0.2, tileSize, tileSize);
            //}

            // add a jelly on tile
            this.tiles.push(tileDO);
            this.tilesContainer.addChild(tileDO);
            tileDO.setNumber(0);
            tileDO.name = (this.boardWidth * y + x).toString();
            tileDO.set(this.getTilePositionByCoords(x, y, tileSize));

        }

        // add mouse board interacion
        private addMouseEvents(tileSize: number) {
            var touchOffset = [];
            this.tilesContainer.addEventListener("mousedown", (e: createjs.MouseEvent) => {
                var tile = this.getTileByRawPos(e.localX, e.localY, tileSize);

                if (tile && tile.isUnlocked() && tile.isEnabled()) {

                    tile.lock();

                    this.touchDictionary[e.pointerID] = tile;

                    //store offset mouse position
                    touchOffset[e.pointerID] = { x: tile.x - e.localX, y: tile.y - e.localY };
                    tile.drag();

                    //bring to front
                    this.tilesContainer.setChildIndex(tile, this.tilesContainer.getNumChildren() - 1);

                    gameui.AssetsManager.playSound('soundh_1');
                }
            });

            //Press Move
            this.tilesContainer.addEventListener("pressmove", (e: createjs.MouseEvent) => {

                //get tile by touch
                var tile = this.touchDictionary[e.pointerID];
                if (tile) {

                    tile.x = e.localX + touchOffset[e.pointerID].x;
                    tile.y = e.localY + touchOffset[e.pointerID].y;
                    tile.lock();

                    //var targetName = this.getTileIdByPos(e.localX, e.localY, tileSize);
                    var target = this.getTileByRawPos(e.localX, e.localY, tileSize);
                    if (target && target.name.toString() != tile.name) {
                        if (target.isUnlocked())
                            this.dispatchEvent("tileMove", { origin: tile, target: target });
                    }
                }
            });

            //Press Up
            this.tilesContainer.addEventListener("pressup", (e: createjs.MouseEvent) => {
                var tile = this.touchDictionary[e.pointerID];
                if (tile) {
                    tile.unlock;
                    this.releaseDrag(tile, false);
                    tile.release();
                }
            });
        }

        // #endregion

        // #region Tile manager ------------------------------------------------------------------------

        // set a tile value
        public setTileValue(tileId, value) {
            var t = this.getTileById(tileId)
            if (t) t.setNumber(value);

            //plays sound if is new jelly
            if (value == 1)
                gameui.AssetsManager.playSound("sound_s" + (Math.floor(Math.random() * 3) + 1), null, 400);

        }

        // get a tile id by its x and y pos
        private getTileIdByPos(rawx: number, rawy: number, tileSize: number): number {
            var coords = this.getTileCoordsByRawPos(rawx, rawy, tileSize);
            return (this.boardWidth * coords.y + coords.x);
        }

        // get tule position by pointer position
        private getTileByRawPos(rawx: number, rawy: number, tileSize: number): Tile {
            var id = this.getTileIdByPos(rawx, rawy, tileSize);
            return this.getTileById(id);
        }

        // get tile coordinates by pointer position
        private getTileCoordsByRawPos(rawx: number, rawy: number, tileSize: number): point {


            var x = Math.floor(rawx / tileSize);
            var hexaOffset = (x == 1 || x == 3) ? tileSize / 2 : 0;
            var y = Math.floor((rawy - hexaOffset) / tileSize);

            return { x: x, y: y };
        }

        private getTileByCoords(x: number, y: number): Tile {
            var id = this.boardWidth * y + x;
            return this.getTileById(id);
        }

        // get a new position for a tile based on its index
        private getTilePositionByCoords(x: number, y: number, tileSize: number): point {

            var hexaOffset = (x == 1 || x == 3) ? tileSize / 2 : 0;
            return {
                x: (x + 1 / 2) * tileSize + (Math.random() - 0.5) * tileSize / 5,
                y: (y + 1 / 2) * tileSize + (Math.random() - 0.5) * tileSize / 5 + hexaOffset
            }
        }
        
        // get a tile object by its id
        public getTileById(id: number): Tile {
            return <Tile> this.tilesContainer.getChildByName(id.toString());
        }

        // release all Jellyies
        public releaseAll() {
            for (var t in this.touchDictionary)
                this.releaseDrag(this.touchDictionary[t]);

        }

        public sumAllTiles(): number {
            var sum = 0;
            for (var t in this.tiles) {
                sum += this.tiles[t].getNumber();
            }
            return sum;
        }

        public getEmptyTiles(): Array<Tile> {

            //get next jelly
            var total = this.boardHeight * this.boardWidth;
            var tiles: Array<Tile> = [];

            //get all empty tiles
            for (var t = 0; t < total; t++)
                if (this.tiles[t].isEmpty())
                    tiles.push(this.tiles[t]);

            return tiles;
        }
        public getLockedTiles(): Array<Tile> {

            //get next jelly
            var total = this.boardHeight * this.boardWidth;
            var tiles: Array<Tile> = [];

            //get all empty tiles
            for (var t = 0; t < total; t++)
                if (!this.tiles[t].isUnlocked())
                    tiles.push(this.tiles[t]);

            return tiles;
        }
        public getAllTiles(): Array<Tile> {
            return this.tiles;
        }

        public getTileId(tile: Tile): number {
            return parseInt(tile.name);
        }

        // get all neighbor tiles 
        public getNeighborTiles(tile: Tile): Array<Tile> {

            var neighbor: Array<Tile> = [];

            var tileId = this.getTileId(tile);
            var hexaOffset = (tile.posx == 1 || tile.posx == 3) ? 1 : -1;

            // consider all neighbores
            var neighborCoords = [
                { x: tile.posx, y: tile.posy - 1 },
                { x: tile.posx, y: tile.posy + 1 },

                { x: tile.posx - 1, y: tile.posy },
                { x: tile.posx + 1, y: tile.posy },

                { x: tile.posx - 1, y: tile.posy + hexaOffset },
                { x: tile.posx + 1, y: tile.posy + hexaOffset },
            ]


            // for each
            for (var p in neighborCoords)
                // remove beyound borders
                if (neighborCoords[p].x >= 0 &&
                    neighborCoords[p].y >= 0 &&
                    neighborCoords[p].x < this.boardWidth &&
                    neighborCoords[p].y < this.boardHeight)
                    // add to array
                    neighbor.push(this.getTileByCoords(neighborCoords[p].x, neighborCoords[p].y));

            return neighbor;
        }

        // calculate a percent 
        public getPercentEmptySpaces(): number {
            var total = this.boardHeight * this.boardWidth;
            var empty: number = this.getEmptyTiles().length;
            return empty / total;
        }

        // release e tile
        private releaseDrag(tile: Tile, match: boolean= true, target?: Tile) {

            var index = this.touchDictionary.indexOf(tile);
            delete this.touchDictionary[index];

            createjs.Tween.removeTweens(tile);
            tile.scaleY = tile.scaleX = 1;

            //if tiles match
            if (match && target) {
                var pos = this.getTilePositionByCoords(target.posx, target.posy, this.tileSize);
                this.fadeTileToPos(tile, pos.x, pos.y);
            }

            //or else, set it back to its place
            else {
                tile.release();
                createjs.Tween.get(tile).to(this.getTilePositionByCoords(tile.posx, tile.posy, this.tileSize), 200, createjs.Ease.sineInOut).call(() => {
                    // set the z-order
                    this.arrangeZOrder();
                    // unlock that tile
                    tile.unlock();
                });
            }
        }

        public getHighestTileValue(): number {
            var highestTile = 0;
            for (var j in this.tiles)
                if (this.tiles[j].getNumber() > highestTile) highestTile = this.tiles[j].getNumber();
            return highestTile;
        }

        public lock() { this.tilesContainer.mouseEnabled = false; }

        public unlock() { this.tilesContainer.mouseEnabled = true; }

        // #endregion

        // #region behaviour ---------------------------------------------------------------------------

        // organize all z-order
        private arrangeZOrder() {
            for (var t = 0; t < this.tiles.length; t++)
                this.tilesContainer.setChildIndex(this.tiles[t], this.tilesContainer.getNumChildren() - 1);
        }

        // match 2 tiles
        public match(origin: Tile, target: Tile) {

            this.releaseDrag(origin, true, target);

            target.set({ scaleX: 1.8, scaleY: 1.8, alpha: 0 });
            createjs.Tween.get(target).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 140, createjs.Ease.cubicOut);

            gameui.AssetsManager.playSound('sound_j' + (Math.floor(Math.random() * 4) + 1));
        }

        // clar all board
        public cleanBoard() {
            for (var t in this.tiles)
                this.tiles[t].setNumber(0);
        }

        // #endregion

        // #region Animations --------------------------------------------------------------------------

        public fadeTileToPos(tile: Tile, posx: number, posy: number, time: number= 100, delay: number= 0, alpha: number= 0) {
            tile.lock();
            createjs.Tween.get(tile).wait(delay).to({ x: posx, y: posy, alpha: alpha }, time, createjs.Ease.quadInOut).call(() => {
                tile.set(this.getTilePositionByCoords(tile.posx, tile.posy, this.tileSize));
                this.arrangeZOrder();
                tile.unlock();
                tile.alpha = 1;
            })
        }

        // create and execute a level up effect on tiles
        public levelUpEffect() {

            // reseteffect timeOut id
            var currentTile = 0;

            // for each tile
            for (var t in this.tiles) {

                // set timeout for the animation. each tile by time interval
                setTimeout(() => {

                    // calculate tile id
                    var calculatedTile = (this.boardHeight * this.boardWidth) - (currentTile % this.boardWidth * this.boardWidth + Math.floor(currentTile / this.boardWidth)) - 1;

                    // define tile by it id
                    var tile = this.tiles[calculatedTile];

                    // create a tween fast move
                    createjs.Tween.get(tile).to({ scaleY: 1.5 }, 100).to({ scaleY: 1 }, 100);

                    // play a jelly light effect
                    tile.jelly.playLevelUp();

                    // unlocks it
                    tile.unlock();

                    // increment effect timeOut id
                    currentTile++

                }, 20 * t);
            }
        }

        // create and execute a end game effect on tiles
        public endGameEffect() {

            // reseteffect timeOut id
            var currentTile = 0;

            // for each tile
            for (var t in this.tiles) {

                // set timeout for the animation. each tile by time interval
                setTimeout(() => {

                    // increment effect timeOut id
                    currentTile++;
                    // calculate tile id
                    var x = (currentTile % this.boardWidth * this.boardWidth + Math.floor(currentTile / this.boardWidth));

                    // define tile by it id
                    var tile = this.tiles[x];

                    // create a tween fast move
                    createjs.Tween.get(tile).to({ scaleY: 0.5 }, 100).to({ scaleY: 1 }, 100);

                    // play a jelly light effect
                    tile.jelly.playLevelUp();
                }, 20 * t);
            }
        }

        public setAlarm(alarm: boolean) {

            if (alarm) {
                if (this.alarming) return;
                createjs.Tween.get(this.tilesContainer, { loop: true })
                    .to({ x: -10 }, 50)
                    .to({ x: +10 }, 100)
                    .to({ x: -10 }, 100)
                    .to({ x: 0 }, 50)
                    .wait(200);
            }
            else {
                if (!this.alarming) return;
                createjs.Tween.removeTweens(this.tilesContainer);
            }

            this.alarming = alarm;

        }

        // #endregion

    }
}