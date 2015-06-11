module joinjelly.menus.view {

    export class GameTitle extends createjs.Container {

        constructor() {
            super();
            this.createJoin();
            this.createJelly();
        }

        private createJoin() {

            var xPositions = [0, 213, 442, 631, 839];
            var waits = [0, 1, 0, 0, 1];
            var side = [0, 1, 1, -1, -1];

            var images = [];

            for (var char = 1; char <= 4; char++) {
                var image = gameui.AssetsManager.getBitmap("title_join_" + char);

                image.regX = image.getBounds().width / 2;
                image.regY = image.getBounds().height / 2;
                image.y = 514 + image.getBounds().height / 2 - image.getBounds().height;
                image.x = xPositions[char];
                image.alpha = 0;
                this.addChild(image);
                images[char] = image;

                createjs.Tween.get(image)
                    .wait(waits[char] * 400)
                    .to({ alpha: 0, x: xPositions[char] - 300 * side[char], scaleX: 3, scaleY: 0.333 })
                    .to({ alpha: 2, x: xPositions[char], scaleX: 1, scaleY: 1 }, 2000, createjs.Ease.elasticInOut);

            }



        }

        private createJelly() {
            var xPositions = [213, 492, 761, 1039, 1278];

            for (var char = 1; char <= 5; char++) {

                var image = <createjs.Bitmap>gameui.AssetsManager.getBitmap("title_jelly_" + char);

                image.regX = image.getBounds().width / 2;
                image.regY = image.getBounds().height;

                var jelly = new joinjelly.view.JellyContainer();
                jelly.visible = false;
                jelly.executeAnimationIn(char * 100 + 1600)
                jelly.imageContainer.addChild(image);
                this.addChild(jelly);

                jelly.x = xPositions[char - 1];
                jelly.y = 800;
            }

        }


    }
} 