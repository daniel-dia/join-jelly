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
            j.y = 114;
            j.x = 325;
            this.addChild(j);

            j.alpha = 0;
            j.y = 0;
            createjs.Tween.get(j).to({alpha:1,y:114},600,createjs.Ease.quadOut);
        }

        private createJelly() {
            var xs = [213, 492, 761, 1039, 1278];

            for (var l = 1; l <= 5; l++) {
                var j = new joinjelly.view.JellyContainer();
                j.visible = false;
                setTimeout((j1) => {
                    j1.executeAnimationIn()
                }, l * 200 + 600, j);

                var i = <createjs.Bitmap>gameui.AssetsManager.getBitmap("t"+l);
                j.imageContainer.addChild(i);
                this.addChild(j);


                i.regX = i.image.width / 2;
                i.regY = i.image.height;

                

                j.x = xs[l - 1];
                j.y = 769;

                j.executeIdle();
            }

        }

        


    }
} 