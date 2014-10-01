module joinjelly.gameplay.view {

    export class Tile extends createjs.Container {

        private tileSize: number;
        public posx: number;
        public posy: number;
        public locked: boolean;

        private jelly: Jelly;

        //contructr
        constructor(posx: number, posy: number, tileSize: number) {

            super();

            //store local variables
            this.tileSize = tileSize;
            this.posx = posx;
            this.posy = posy;

            ///set local positio
            this.regX = this.regY = tileSize / 2;

            //addObjects
            this.jelly = new Jelly();
            this.jelly.x = tileSize / 2;
            this.jelly.y = tileSize;
            this.jelly.scaleX = this.jelly.scaleY=this.tileSize / (220);
            this.addChild(this.jelly);

            //creates hitArea for the tile
            this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("000").drawRect(0, 0, tileSize, tileSize));

        }

        public release() {
            this.jelly.executeAimationRelease();
        }

        public drag() {
            this.jelly.executeAnimationHold();
        }

        //set tile number
        public setNumber(value: number) {

            this.jelly.setNumber(value);
            if (value == 0)
                this.mouseEnabled = false;
            else {
                //enable mouse and visibility
                this.mouseEnabled = true;
                this.visible = true;
                this.alpha = 1;

            }
        }
    }
}