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
            createjs.Tween.get(j).to({ alpha: 1, y: 114 }, 600, createjs.Ease.quadOut);
        }

        // por que isso ???
        private createJelly() {
            //  var xs = [213, 492, 761, 1039, 1278];

            for (var l = 1; l <= 5; l++) {
                var j = new joinjelly.view.JellyContainer();
                j.visible = false;
                j.executeAnimationIn()
                this.addChild(j);
                //   j.x = xs[l - 1];
                //   j.y = 769;
                //
            }

        }




    }
} 