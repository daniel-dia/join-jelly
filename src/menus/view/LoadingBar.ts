module joinjelly.menus.view {

    export class LoadingBar extends createjs.Container {

        private barMask;

        constructor(path: string) {
            super();

            var bg = gameui.AssetsManager.getBitmap(path + "bonus_border.png");
            var text = gameui.AssetsManager.getBitmapText(StringResources.menus.loading, "debussy");
            var bar = gameui.AssetsManager.getBitmap(path + "bonus_bar.png");

            this.addChild(bg)
            this.addChild(text)
            this.addChild(bar);

            text.regX = text.getBounds().width / 2;
            bar.x= -939 / 2 -40;
            bg.regX = 1131 / 2;

            text.y = -100;
            bar.y = 85;

            this.barMask = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0, bar.y, 939, 57));
            this.barMask.x = bar.x;
            bar.mask = this.barMask;
        }

        public update(value:number) {
            this.barMask.scaleX = value ;
        }
    }
}
