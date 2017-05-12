module joinjelly.gameplay.view {
    export class RandomItemSelector extends gameui.UIItem {

        public onComplete: (string) => void;

        private itemsDO: Array<PIXI.DisplayObject>;
        private items: Array<string>

        private distance = 250;
        private totalDistante = 625;

        private totalTime = 5000;

        private finalPosition: number;
        private initialPosition: number;
        private previousOffset: number = 0;
        private timeStart;
        private itemOffset;

        private listener;

        private effect: joinjelly.view.Effect;

        constructor() {
            super();




            this.itemsDO = [];

            // adiciona background
            this.addChild(gameui.AssetsManager.getBitmap("FlyGroup")
                .set({ regX: 1056 / 2, regY: 250 / 2 }));


            // adiciona Efeitos
            this.effect = new joinjelly.view.Effect();
            this.addChild(this.effect);
            this.effect.scaleX = this.effect.scaleY = 1.5;



            this.items = [Items.CLEAN, Items.FAST, Items.TIME, Items.REVIVE, "loose"]


            for (var i = 0; i < this.items.length; i++) {

                var ido;

                if (this.items[i] == "loose")
                    ido = <PIXI.DisplayObject>new gameplay.view.Jelly(-1).set({ y: 50 })
                else {
                    ido = gameui.AssetsManager.getBitmap("item" + this.capitalizeFirstLetter(this.items[i]));
                    ido.name = this.items[i];
                    ido.x = this.distance * i;
                    ido.regX = ido.regY = 150;
                    ido.scaleX = ido.scaleY = 0.7;

                }
                this.itemsDO.push(ido);
                this.addChild(ido)
            }

            this.visible = false;
        }

        private capitalizeFirstLetter(string:string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        // random
        public random() {

            this.fadeIn();

            // ramdomly selects a itemId
            var chances = [0, 0, 1, 1, 2, 2, 3, 3, 4];
            var itemId = chances[Math.floor(Math.random() * chances.length)];

            // set position to obj
            this.finalPosition = itemId * this.distance;
            this.initialPosition = (Math.random() + 6) * this.distance * this.items.length;

            // add listener
            this.listener = () => { this.tick(); }
            PIXI.ticker.shared.add(this.listener);
            this.timeStart = Date.now();

        }

        // moves it
        private tick() {

            var p = ((this.timeStart + this.totalTime) - Date.now()) / this.totalTime;
            var offset = Math.pow(p, 2) * this.initialPosition + (1 - Math.pow(p, 2)) * this.finalPosition;

            for (var i = 0; i < this.itemsDO.length; i++) {
                var item = this.itemsDO[i];
                var itemOffset = this.distance * i + offset;
                item.visible = true;
                item.x = (itemOffset + this.totalDistante) % (this.totalDistante * 2) - this.totalDistante
                item.scaleX = item.scaleY = (this.totalDistante - (Math.abs(item.x))) / this.totalDistante * 1.2;
                item.alpha = (this.totalDistante - (Math.abs(item.x))) / this.totalDistante * 2;
            }
            //plays sound

            if (offset % this.distance > this.previousOffset % this.distance) {
                gameui.AudiosManager.playSound("Interface Sound-12", true);
                console.log(offset);
            }
            this.previousOffset = offset;

            if (p <= 0) this.end();
        }

        private end() {

            PIXI.ticker.shared.remove(this.listener);
            var closerObj: PIXI.DisplayObject;
            for (var i in this.itemsDO)
                if (!closerObj || Math.abs(this.itemsDO[i].x) < Math.abs(closerObj.x))
                    closerObj = this.itemsDO[i];

            gameui.AudiosManager.playSound("Interface Sound-11", true);
            this.effect.castBothInv();
            

            for (var i in this.itemsDO) {
                if (this.itemsDO[i] == closerObj)
                    createjs.Tween.get(this.itemsDO[i]).to({ x: 0, scaleX: 1.2, scaleY: 1.2, alpha: 1 }, 400, createjs.Ease.quadInOut);
                else
                    createjs.Tween.get(this.itemsDO[i]).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 400, createjs.Ease.quadInOut);
            }
            setTimeout(() => {
                this.fadeOut();
                if (this.onComplete)
                    this.onComplete(closerObj.name);
            }, 700);
        }


    }
}