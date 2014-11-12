module joinjelly.gameplay.view {
    interface point { x: number; y: number }

    export class Board extends createjs.Container {

        public boardWidth: number;
        public boardHeight: number;
        private tiles: Array<Tile>;

        private tileSize: number;
        private touchDictionary: Array<Tile> = new Array();

        // #region Initialization ----------------------------------------------------------------------

        constructor(boardWidth: number, boardHeight: number, tileSize: number, img: boolean) {
            super();

            this.tileSize = tileSize;

            this.tiles = [];
            this.boardHeight = boardHeight;
            this.boardWidth = boardWidth;

            this.addTiles(boardWidth, boardHeight, tileSize, img);

        }

        //add tiles on the board
        private addTiles(boardWidth: number, boardHeight: number, tileSize: number, img: boolean) {
            var touchOffset = [];

            for (var x = 0; x < boardWidth; x++) {
                for (var y = 0; y < boardHeight; y++) {
                    var tileDO = new Tile(x, y, tileSize);

                    this.tiles.push(tileDO);
                    this.addChild(tileDO);
                    tileDO.setNumber(0);
                    tileDO.name = (this.boardWidth * y + x).toString();
                    tileDO.set(this.getTilePositionByCoords(x, y, tileSize));
                }
            }

            this.addEventListener("mousedown", (e: createjs.MouseEvent) => {
                var tile = this.getTileByRawPos(e.localX, e.localY, tileSize);

                if (tile) {
                    this.touchDictionary[e.pointerID] = tile;

                    //store offset mouse position
                    touchOffset[e.pointerID] = { x: tile.x - e.localX, y: tile.y - e.localY };
                    tile.drag();

                    //bring to front
                    this.setChildIndex(tile, this.getNumChildren() - 1);

                    gameui.AssetsManager.playSound('soundh_1');
                }
            });

            //Press Move
            this.addEventListener("pressmove", (e: createjs.MouseEvent) => {

                //get tile by touch
                var tile = this.touchDictionary[e.pointerID];
                if (tile) {

                    tile.x = e.localX + touchOffset[e.pointerID].x;
                    tile.y = e.localY + touchOffset[e.pointerID].y;
                    tile.locked = true;

                    //var targetName = this.getTileIdByPos(e.localX, e.localY, tileSize);
                    var target = this.getTileByRawPos(e.localX, e.localY, tileSize);
                    if (target && target.name.toString() != tile.name) {
                        if(!target.locked)
                        this.dispatchEvent("tileMove", { origin: tile.name, target: target.name});
                    }
                }
            });

            //Press Up
            this.addEventListener("pressup", (e: createjs.MouseEvent) => {
                var tile = this.touchDictionary[e.pointerID];
                if (tile) {
                    tile.locked = false;
                    this.releaseDrag(tile, false);
                    tile.release();
                }
            });
        }

        // #endregion

        // #region Tile manager ------------------------------------------------------------------------

        //set a tile value
        public setTileValue(tileId, value){
            var t = this.getTileById(tileId)
            if (t) t.setNumber(value);

            //plays sound if is new jelly
            if (value == 1)
                gameui.AssetsManager.playSound("sound_s" + (Math.floor(Math.random() * 3) + 1), null, 400);
                
        }
        
        //get a tile id by its x and y pos
        private getTileIdByPos(rawx: number, rawy: number, tileSize: number): number {
            var coords = this.getTileCoordsByRawPos(rawx, rawy, tileSize);
            return (this.boardWidth * coords.y + coords.x);
        }

        //get tule position by pointer position
        private getTileByRawPos(rawx: number, rawy: number, tileSize: number): Tile {
            var id = this.getTileIdByPos(rawx, rawy, tileSize);
            return this.getTileById(id);
        }

        //get tile coordinates by pointer position
        private getTileCoordsByRawPos(rawx: number, rawy: number, tileSize: number): point {
            var x = Math.floor(rawx / tileSize);
            var y = Math.floor(rawy / tileSize);
            return { x: x, y: y };
        }

        //get a new position for a tile based on its index
        private getTilePositionByCoords(x: number, y: number, tileSize: number): point {
        return {
                x: (x + 1 / 2) * tileSize + (Math.random() - 0.5) * tileSize / 5,
                y: (y + 1 / 2) * tileSize + (Math.random() - 0.5) * tileSize / 5
            }
        }

        //get a tile object by its id
        public getTileById(id: number): Tile {
            return <Tile> this.getChildByName(id.toString());
        }

        // release all Jellyies
        public releaseAll() {
            for (var t in this.touchDictionary) 
                this.releaseDrag(this.touchDictionary[t]);
            
        }

        //release e tile
        private releaseDrag(tile: Tile, match: boolean= true, target?: Tile) {
            
            var index = this.touchDictionary.indexOf(tile);
            delete this.touchDictionary[index];

            createjs.Tween.removeTweens(tile);
            tile.scaleY = tile.scaleX = 1;

            tile.locked = false;

            //if tiles match
            if (match && target) {
            
                var pos = this.getTilePositionByCoords(target.posx, target.posy, this.tileSize);
                createjs.Tween.get(tile).to({ x: pos.x, y: pos.y, alpha: 0 }, 100, createjs.Ease.quadInOut).call(() => {
                    tile.set(this.getTilePositionByCoords(tile.posx, tile.posy, this.tileSize));
                    this.arrangeZOrder();
                })
            }
            //or else, set it back to its place
            else {
                tile.release();
                createjs.Tween.get(tile).to(this.getTilePositionByCoords(tile.posx, tile.posy, this.tileSize), 200, createjs.Ease.sineInOut).call(() => {
                //set the z-order
                    this.arrangeZOrder();
                });
            }
        }

        // #endregion

        // #region behaviour ----------------------------------------------------------------------------------

        //organize all z-order
        private arrangeZOrder() {
            for (var t = this.tiles.length - 1; t >= 0; t--)
                this.setChildIndex(this.tiles[t], 0);
        }

        //match 2 tiles
        public match(origin: number, target: number) {
            
            var tile = this.getTileById(target);
            var old = this.getTileById(origin);

            this.releaseDrag(old, true, tile);

            tile.set({ scaleX: 1.8, scaleY: 1.8, alpha: 0 });
            createjs.Tween.get(tile).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 140, createjs.Ease.cubicOut);

            gameui.AssetsManager.playSound('sound_j' + (Math.floor(Math.random() * 4) + 1));
        }

        public clean() {
            for (var t in this.tiles)
                this.tiles[t].setNumber(0);
        }

        //#endregion
    }

}