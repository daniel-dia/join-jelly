﻿module fpair.gameplay.view {
    interface point { x: number; y: number }

    export class Board extends createjs.Container {

        public boardWidth: number;
        public boardHeight: number;
        private tiles: Array<Jelly>;

        private tileSize: number;
        private touchDictionary: Array<Jelly> = new Array();

        //----------------------------------------------------------------------------------

        constructor(boardWidth: number, boardHeight: number, tileSize: number, img: boolean) {
            super();

            this.tileSize = tileSize;

            this.tiles = [];
            this.boardHeight = boardHeight;
            this.boardWidth = boardWidth;

            //this.addBackground(boardWidth, boardHeight, tileSize, img);
            this.addTiles(boardWidth, boardHeight, tileSize, img);

        }

        public setTileValue(tileId, value){
            var t = this.getTileById(tileId)
            if(t)t.setNumber(value);
        }
        //----------------------------------------------------------------------------------

        private getTileIdByPos(rawx: number, rawy: number, tileSize: number): string {
            var coords = this.getTileCoordsByRawPos(rawx, rawy, tileSize);
            return (this.boardWidth * coords.y + coords.x).toString();
        }

        private getTileByRawPos(rawx: number, rawy: number, tileSize: number): Jelly {
            var id = this.getTileIdByPos(rawx, rawy, tileSize);
            return this.getTileById(id);
        }

        private getTileCoordsByRawPos(rawx: number, rawy: number, tileSize: number): point {
            var x = Math.floor(rawx / tileSize);
            var y = Math.floor(rawy / tileSize);
            return { x: x, y: y };
        }

        private getTilePositionByCoords(x: number, y: number, tileSize: number): point {
        return {
                x: (x + 1 / 2) * tileSize + (Math.random() - 0.5) * tileSize / 5,
                y: (y + 1 / 2) * tileSize + (Math.random() - 0.5) * tileSize / 5
            }
        }

        public getTileById(id: string): Jelly {
            return <Jelly> this.getChildByName(id);
        }

        //----------------------------------------------------------------------------------

        private addTiles(boardWidth: number, boardHeight: number, tileSize: number, img: boolean) {
            var touchOffset = [];

            for (var x = 0; x < boardWidth; x++) {
                for (var y = 0; y < boardHeight; y++) {
                    var t = new Jelly(x, y, tileSize);

                    this.tiles.push(t);
                    this.addChild(t);
                    t.setNumber(0);
                    t.name = (this.boardWidth * y + x).toString();
                    t.set(this.getTilePositionByCoords(x, y, tileSize));

                    this.addEventListener("mousedown", (e: createjs.MouseEvent) => {
                        var tile = this.getTileByRawPos(e.localX, e.localY, tileSize);

                        if (tile) {
                            this.touchDictionary[e.pointerID] = tile;

                            //store offset mouse position
                            touchOffset[e.pointerID] = { x: tile.x - e.localX, y: tile.y - e.localY };
                            tile.executeAnimationHold();

                            //bring to front
                            this.setChildIndex(tile, this.getNumChildren() - 1);
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

                            var targetName = this.getTileIdByPos(e.localX, e.localY, tileSize);

                            if (targetName != tile.name) {
                                this.dispatchEvent("tileDrop", { origin: tile.name, target: targetName });
                            }
                        }
                    });

                    //Press Up
                    this.addEventListener("pressup", (e: createjs.MouseEvent) => {
                        var tile = this.touchDictionary[e.pointerID];
                        if (tile) {
                            tile.locked = false;
                            this.releaseDrag(tile, false);
                            tile.executeAimationRelease();
                        }
                    });
                }
            }
        }

        //---------------------------------------------------------------------------------

        private releaseDrag(tile: Jelly, match: boolean= true, target?: Jelly) {
            var index = this.touchDictionary.indexOf(tile);
            delete this.touchDictionary[index];

            createjs.Tween.removeTweens(tile);
            tile.scaleY = tile.scaleX = 1;

            tile.locked = false;



            if (match) {

                var pos = this.getTilePositionByCoords(target.posx, target.posy, this.tileSize);
                createjs.Tween.get(tile).to({ x: pos.x, y: pos.y, alpha: 0 }, 100, createjs.Ease.quadInOut).call(() => {
                    tile.set(this.getTilePositionByCoords(tile.posx, tile.posy, this.tileSize));
                })
        }
            else {
                createjs.Tween.get(tile).to(this.getTilePositionByCoords(tile.posx, tile.posy, this.tileSize), 200, createjs.Ease.sineInOut);
            }
        }

        public match(origin: string, target: string) {
            
            var tile = this.getTileById(target);
            var old = this.getTileById(origin);

            this.releaseDrag(old, true, tile);

            tile.set({ scaleX: 1.8, scaleY: 1.8, alpha: 0 });
            createjs.Tween.get(tile).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 140, createjs.Ease.cubicOut);
        }

        //---------------------------------------------------------------------------------
        
        public clean() {
            for (var t in this.tiles)
                this.tiles[t].setNumber(0);
        }
    }

}