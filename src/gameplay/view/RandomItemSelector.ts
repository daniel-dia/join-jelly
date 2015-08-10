module joinjelly.gameplay.view {
    export class RandomItemSelector extends gameui.UIItem {

        public onComplete: (string) => void;

        private itemsDO: Array<createjs.DisplayObject>;
        private speedFactor=30;
        private distance = 230;
        private totalDistante = 500;

        private timeStart;
        private currentSpeed;
        private itemOffset;

        private listener;
        constructor() {
            super();

            this.itemsDO = [];
            this.addChild(gameui.AssetsManager.getBitmap("FlyGroup").set({regX:1056/2, regY:250/2}));
            var items = [Items.CLEAN, Items.FAST, Items.TIME, Items.REVIVE]

            for (var i in items) {
                var ido = gameui.AssetsManager.getBitmap("item" + items[i]).set({ x: this.distance * i, regX: 150, regY: 150, name: items[i],scaleX:0.7, scaleY:0.7 });
                this.itemsDO.push(ido);
                this.addChild(ido)
            }
        }

        // random
        public random() {
            var total = this.itemsDO.length;
            this.listener = () => { this.tick(); }
            createjs.Ticker.addEventListener("tick", this.listener);
            this.timeStart = Date.now();
            this.currentSpeed = (Math.random() + 0.5) * this.speedFactor;
            //this.itemOffset = Math.floor(Math.random() * 2 * total) + total * 4;
        }
       
        // moves it
        private tick() {

            var diff = Date.now() - this.timeStart;

            for (var i in this.itemsDO) {
                var item = this.itemsDO[i];
                item.x -= this.currentSpeed;
                item.scaleX = item.scaleY = (this.totalDistante - Math.abs(item.x)) / this.totalDistante * 1.2;
                if (item.x < -this.totalDistante)
                    item.x += this.totalDistante * 2;
                if (item.x < 0 && item.x + this.currentSpeed > 0)
                    gameui.AudiosManager.playSound("Interface Sound-12");
            }

            this.currentSpeed-=0.1;
            if (this.currentSpeed < 0)
                this.end();
        }

        private end() {
            createjs.Ticker.removeEventListener("tick", this.listener);
            var closerObj: createjs.DisplayObject;
            for (var i in this.itemsDO) 
                if (!closerObj || Math.abs(this.itemsDO[i].x) < Math.abs(closerObj.x))
                    closerObj = this.itemsDO[i];
            

            for (var i in this.itemsDO) {
                if (this.itemsDO[i] == closerObj)
                    createjs.Tween.get(this.itemsDO[i]).to({ x: 0, scaleX: 1.2, scaleY: 1.2,alpha:1 }, 400, createjs.Ease.quadInOut);
                else
                    createjs.Tween.get(this.itemsDO[i]).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 400, createjs.Ease.quadInOut);
            }
            setTimeout(() => {
                this.fadeOut();
                if (this.onComplete)
                    this.onComplete(closerObj.name);
            }, 500);
        }

       
    }
}