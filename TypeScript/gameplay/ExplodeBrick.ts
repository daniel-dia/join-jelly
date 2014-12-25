module joinjelly.gameplay {

    export class ExplodeBricks extends GamePlayScreen {

        private initialDirtyProbability: number = 1;
        private finalDirtyProbability: number = 0.6;
        private easeDirtyProbability: number = 0.98;

        // add a random tile with value 1 on board
        protected addRandomTileOnBoard() {

            super.addRandomTileOnBoard();

            // randomly adda a dirty to the board
            if (this.getDirtyProbabilityByLevel(this.level, this.initialDirtyProbability, this.finalDirtyProbability, this.easeDirtyProbability) > Math.random())
                setTimeout(() => { super.addRandomTileOnBoard(-1); }, 500);
        }

        // verifies if a tile can pair another, and make it happens
        protected match(origin: Tile, target: Tile) {
            var match = super.match(origin, target);
            if (match) {

                var neighborTiles = this.board.getNeighborTiles(target);

                for (var t in neighborTiles) {
                    var tile = neighborTiles[t];

                    if (tile && tile.getNumber() < 0) {
                        var posx = target.x + (tile.x - target.x) * 1.5;
                        var posy = target.y + (tile.y - target.y) * 1.5;
                        this.board.fadeTileToPos(tile,posx, posy,500);
                        tile.setNumber(0);
                    }
                }
            }
            return match;
        }

        // level up
        protected levelUpInterfaceEffect(level) {
            super.levelUpInterfaceEffect(level);
            this.cleanDirty();
        }

        // clean dirty
        public cleanDirty() {
            var tiles = this.board.getAllTiles();
            for (var t in tiles) {
                if (tiles[t].getNumber() < 0)
                    tiles[t].setNumber(0);
            }
        }

        // calculate time interval for a level.
        protected getDirtyProbabilityByLevel(level: number, initialDirtyProbability: number, finalDirtyProbability: number, easeDirtyProbability: number): number {
            return initialDirtyProbability * Math.pow(easeDirtyProbability, level) + finalDirtyProbability * (1 - Math.pow(easeDirtyProbability, level));
        }

    }
}