module fpair.menus.view {

    export class GameTitle extends createjs.Container {

        constructor() {
            super();

            this.createJoin();
            this.createJelly();

        }

        private createJoin() {
            var j = new fpair.view.JellyContainer();
            var i = gameui.AssetsManager.getBitmap("t0");
            j.addChild(i);
            this.addChild(j);
        }

        private createJelly() {
            for (var l = 1; l <= 5; l++) {
                var j = new fpair.view.JellyContainer();
                var i = gameui.AssetsManager.getBitmap("t"+l);
                j.imageContainer.addChild(i);
                this.addChild(j);
                i.x = -137;
                i.y = -314;

                j.x = l * 250 -100;
                j.y = defaultHeight / 2;

                j.executeIdle();
            }

        }

        


    }
} 