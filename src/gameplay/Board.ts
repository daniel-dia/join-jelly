module joinjelly.gameplay {
    interface point { x: number; y: number }

    export class Board extends PIXI.Container {

        private boardWidth: number;
        private boardHeight: number;
        private tiles: Array<Tile>;

        private tileSize: number;
        private touchDictionary: Array<Tile> = new Array();

        private alarming: boolean = false;
        private tilesContainer: PIXI.Container;

        private touchOffset: Array<point>;
        private touchDeltas: Array<number>;

        // #region Initialization ------------------------------------------------------------------------

        constructor(boardWidth: number, boardHeight: number, tileSize: number, img: boolean) {
            super();
            //initialize variables
            this.tiles = [];
            this.boardHeight = boardHeight;
            this.boardWidth = boardWidth;
            this.tileSize = tileSize;

            // create tiles container
            this.tilesContainer = new PIXI.Container();
            this.addChild(this.tilesContainer);

            //define cache for click
            /// this.tilesContainer.hitArea = (new PIXI.Graphics().beginFill(0xFF0000).drawRect(0, 0, boardWidth * tileSize, (boardHeight + 0.5) * tileSize));

            // create all tiles
            this.addTiles(boardWidth, boardHeight, tileSize, img);
            this.addMouseEvents();

            //set pivot
            this.pivot.x = (boardWidth * tileSize / 2);
            this.pivot.y = (boardHeight * tileSize / 2);

        }

        // add tiles on the board
        private addTiles(boardWidth: number, boardHeight: number, tileSize: number, img: boolean) {


            for (var x = 0; x < boardWidth; x++)
                for (var y = 0; y < boardHeight; y++)
                    this.addTile(x, y, tileSize);
        }


        // add a single tile on board
        private addTile(x: number, y: number, tileSize: number) {

            var bg = gameui.AssetsManager.getBitmap("hex");
            this.tilesContainer.addChild(bg);
            bg.pivot.x = 358 / 2;
            bg.pivot.y = 0;
            bg.alpha = 0.15;
            bg.set(this.getTilePositionByCoords(x, y, tileSize, 0));


            var tileDO = new Tile(x, y, tileSize);
            tileDO.background = bg;

            // add a jelly on tile
            this.tiles.push(tileDO);
            this.tilesContainer.addChild(tileDO);
            tileDO.setNumber(0);
            tileDO.name = (this.boardWidth * y + x).toString();
            tileDO.set(this.getTilePositionByCoords(x, y, tileSize));

        }

        // add mouse board interacion
        private addMouseEvents() {

            this.touchOffset = new Array<point>();
            this.touchDeltas = new Array<number>();

            // Pess Start
            this.tilesContainer.on("touchstart", this.boardTouchStart, this);
            this.tilesContainer.on("mousedown", this.boardTouchStart, this);
            
            // Press Move
            this.tilesContainer.on("touchmove", this.boardTouchMove, this);
            this.tilesContainer.on("mousemove", this.boardTouchMove, this);
            
            // Press Up
            this.tilesContainer.on("touchend", this.boardTouchEnd, this);
            this.tilesContainer.on("touchendoutside", this.boardTouchEnd, this);
            this.tilesContainer.on("mouseupoutside", this.boardTouchEnd, this);
            this.tilesContainer.on("mouseup", this.boardTouchEnd, this);
            this.tilesContainer.on("mouseout", this.boardTouchEnd, this);
        }

        // callback to the event start
        private boardTouchStart(e: PIXI.interaction.InteractionEvent) {

            var pid = this.getPointerId(e);
            var pos = e.data.getLocalPosition(this);
            
            var tile = this.getTileByRawPos(pos.x, pos.y, this.tileSize);

            if (tile && tile.isUnlocked() && tile.isEnabled()) {

                tile.lock();

                this.touchDictionary[pid] = tile;

                //store offset mouse position
                this.touchOffset[pid] = { x: tile.x - pos.x, y: tile.y - pos.y };
                tile.drag();

                //bring to front
                this.tilesContainer.setChildIndex(tile, this.tilesContainer.children.length - 1);

                gameui.AudiosManager.playSound('soundh_1');
            }

        }

        // callback to the a pointer move event
        private boardTouchMove(e: PIXI.interaction.InteractionEvent) {
            var pid = this.getPointerId(e)
            var pos = e.data.getLocalPosition(this);

            var delta = Date.now() - this.touchDeltas[pid];
            if (delta < 20) return;
            this.touchDeltas[pid] = Date.now();
            
            //get tile by touch
            var tile = this.touchDictionary[pid];
            if (tile) {

                tile.x = e.data.getLocalPosition(this).x + this.touchOffset[pid].x;
                tile.y = e.data.getLocalPosition(this).y + this.touchOffset[pid].y;
                tile.lock();

                //var targetName = this.getTileIdByPos(e.localX, e.localY, tileSize);
                var target = this.getTileByRawPos(pos.x, pos.y, this.tileSize);
                if (target && target.name.toString() != tile.name) {
                    if (target.isUnlocked()) {
                        this.emit("dragging", { originTile: tile, targetTile: target });
                    }
                }
            }
        }

        // callback to the event end
        private boardTouchEnd(e: PIXI.interaction.InteractionEvent) {
            var pid = this.getPointerId(e)
            var tile = this.touchDictionary[pid];
            if (tile) {
                tile.unlock;
                this.releaseDrag(tile, false);
                tile.release();
            }}

        // gets a pointer id based on the interaction event
        private getPointerId(e: PIXI.interaction.InteractionEvent) {
            var pid = e.data["identifier"] || e.data.originalEvent["pointerId"] || 0;
            return pid;
        }

        // #endregion

        // #region Tile manager ------------------------------------------------------------------------

        public setTiles(tiles: Array<number>) {
            this.unlock();
            for (var t = 0; t < tiles.length; t++) {

                this.setTileValue(t, tiles[t]);
                this.getTileById(t).unlock();
                this.getTileById(t).enable();
            }
        }

        // set a tile value
        public setTileValue(tileId, value) {
            var t = this.getTileById(tileId)
            if (t) t.setNumber(value);

            //plays sound if is new jelly
            if (value == 1)
                gameui.AudiosManager.playSound("sound_s" + (Math.floor(Math.random() * 3) + 1), null, 400);

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

        // get a tile basend on x and y index
        private getTileByIndex(x: number, y: number): Tile {
            var id = this.boardWidth * y + x;
            return this.getTileById(id);
        }

        // get a new position for a tile based on its index
        private getTilePositionByCoords(x: number, y: number, tileSize: number, random: number = 1): point {

            var hexaOffset = (x == 1 || x == 3) ? tileSize / 2 : 0;
            return {
                x: (x + 1 / 2) * tileSize + random * (Math.random() - 0.5) * tileSize / 10,
                y: (y + 1 / 2) * tileSize + random * (Math.random() - 0.5) * tileSize / 10 + hexaOffset - tileSize / 5
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

        public getLockedNotDraggingTiles(): Array<Tile> {

            //get next jelly
            var total = this.boardHeight * this.boardWidth;
            var tiles: Array<Tile> = [];

            //get all empty tiles
            for (var t = 0; t < total; t++)
                if (!this.tiles[t].isUnlocked() && !this.tiles[t].isDragging())
                    tiles.push(this.tiles[t]);

            return tiles;
        }

        public getAllTiles(): Array<Tile> {
            return this.tiles;
        }
        public getAllTilesValues(): Array<number> {
            var values = new Array();

            for (var t = 0; t < this.boardHeight * this.boardWidth; t++)
                values[t] = this.getTileById(t).getNumber();

            return values;
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
                    neighbor.push(this.getTileByIndex(neighborCoords[p].x, neighborCoords[p].y));

            return neighbor;
        }

        // calculate a percent 
        public getPercentEmptySpaces(): number {
            var total = this.boardHeight * this.boardWidth;
            var empty: number = this.getEmptyTiles().length;
            return empty / total;
        }

        // release e tile
        private releaseDrag(tile: Tile, match: boolean = true, target?: Tile) {

            var index = this.touchDictionary.indexOf(tile);
            delete this.touchDictionary[index];

            createjs.Tween.removeTweens(tile);
            tile.scale.y = tile.scale.x = 1;

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

        public lock() { this.tilesContainer.interactive = false; }

        public unlock() { this.tilesContainer.interactive = true; }

        // #endregion

        // #region behaviour ---------------------------------------------------------------------------

        // organize all z-order
        private arrangeZOrder() {
            for (var t = 0; t < this.tiles.length; t++)
                this.tilesContainer.setChildIndex(this.tiles[t], this.tilesContainer.children.length - 1);
        }

        // match 2 tiles
        public match(origin: Tile, target: Tile) {

            this.releaseDrag(origin, true, target);
            gameui.AudiosManager.playSound('sound_j' + (Math.floor(Math.random() * 4) + 1));
        }

        // clar all board
        public cleanBoard() {
            for (var t in this.tiles)
                this.tiles[t].setNumber(0);
        }

        // #endregion

        // #region Animations --------------------------------------------------------------------------

        public fadeTileToPos(tile: Tile, posx: number, posy: number, time: number = 100, delay: number = 0, alpha: number = 0) {
            tile.lock();
            createjs.Tween.get(tile).wait(delay).to({ x: posx, y: posy, alpha: alpha }, time, createjs.Ease.quadIn).call(() => {
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
            for (var t = 0; t < this.tiles.length; t++) {

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
                    ///tile.unlock();

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
            for (var t = 0; t < this.tiles.length; t++) {

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