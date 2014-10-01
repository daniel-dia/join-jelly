module joinjelly.menus.view {

    export class GameTitle extends createjs.Container {

        constructor() {
            super();

            this.createJoin();
            this.createJelly();

        }

        private createJoin() {
            var j = new joinjelly.view.JellyContainer();
            var i = gameui.AssetsManager.getBitmap("t0");
            j.addChild(i);
            this.addChild(j);
        }

        private createJelly() {
            var xs = [213, 492, 761, 1039, 1278];

            for (var l = 1; l <= 5; l++) {
                var j = new joinjelly.view.JellyContainer();
                var i = <createjs.Bitmap>gameui.AssetsManager.getBitmap("t"+l);
                j.imageContainer.addChild(i);
                this.addChild(j);


                i.regX = i.image.width / 2;
                i.regY = i.image.height;
                

                j.x = xs[l - 1];
                j.y = defaultHeight / 2;

                j.executeIdle();
            }

        }

        


    }
} 