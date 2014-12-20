﻿module joinjelly.gameplay {

    export class ExplodeBricks extends GamePlayScreen {

        // add a random tile with value 1 on board
        protected addRandomTileOnBoard() {

            var badChance = Math.random() * 10;
            var value = 1;
            if (badChance > 5) value = -1;


            // if there is no more empty tiles, ends the game
            var empty = this.board.getEmptyTiles();
            if (empty.length > 0) {
                var i = Math.floor(Math.random() * empty.length);
                var tile = empty[i];

               
                tile.setNumber(value);
                if (value <= 0) tile.lock();

                return true;

            }
            return false;
        }

        // verifies if a tile can pair another, and make it happens
        protected match(origin: view.Tile, target: view.Tile): boolean {
            var position = parseInt(target.name);
            var ok = super.match(origin, target);
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
                ]

                for (var i in array) {
                    var tile = this.board.getTileById(array[i]);
                    if (tile && tile.getNumber() < 0) {
                        tile.unlock();
                        tile.setNumber(0);
                    }
                }
            }
            return ok;
        }

        // level up
        protected levelUp(level) {
            super.levelUp(level);
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
    }
}