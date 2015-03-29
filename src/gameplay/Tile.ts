module joinjelly.gameplay {

    export class Tile extends createjs.Container {

        private tileSize: number;
        public posx: number;
        public posy: number;
        private locked: boolean;
        private enabled: boolean;

        private value: number;

        public jelly: view.Jelly;

        // contructr
        constructor(posx: number, posy: number, tileSize: number) {

            super();

            //store local variables
            this.tileSize = tileSize;
            this.posx = posx;
            this.posy = posy;

            ///set local position
            this.regX = this.regY = tileSize / 2;

            //addObjects
            this.jelly = new view.Jelly();
            this.jelly.x = tileSize / 2;
            this.jelly.y = tileSize;
            this.jelly.scaleX = this.jelly.scaleY = this.tileSize / (450);
            this.addChild(this.jelly);

            //creates hitArea for the tile
            this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("000").drawRect(0, 0, tileSize, tileSize));
      
        }

        public release() {
            this.jelly.executeAimationRelease();
            this.unlock();
        }

        public drag() {
            this.jelly.executeAnimationHold();
        }

        public isUnlocked(): boolean { return !this.locked; }

        public lock() { 
            this.locked = true;
         }

        public unlock() {
            this.locked = false;
            this.jelly.setNumber(this.value);
        } 

        public enable() { this.enabled = true ; }

        public disable() { this.enabled = false; }

        public isEnabled():boolean { return this.enabled;}

        // set tile number
        public setNumber(value: number) {
            if (value > JoinJelly.maxJelly) value = JoinJelly.maxJelly;
            this.value = value;

            if (value > 0) this.enable();
            else this.disable();

            if (this.isUnlocked())
                this.jelly.setNumber(value);
        }

        public getNumber(): number {
            return this.value;
        }

        public isEmpty() {
            return (this.value == 0);
        }
    }
}