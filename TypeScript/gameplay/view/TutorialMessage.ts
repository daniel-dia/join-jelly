module joinjelly.gameplay.view {

    export class TutoralMessage extends gameui.ui.Button {

        private bitmapText: createjs.BitmapText;
        constructor() {
            super();

            this.addChild(gameui.AssetsManager.getBitmap("ballon"));

            this.visible = false;

            this.regX = 316
            this.regY = 366;
            this.x = 164 + this.regX;
            this.y = 941 + this.regY;

            var t = new createjs.BitmapText("", new createjs.SpriteSheet(Deburilfont));
            this.addChild(t);
            t.scaleX = t.scaleY = 0.7;
            t.x = 50;
            t.y = 100;
            this.bitmapText = t;
            t.mouseEnabled = false;

            this.addEventListener("click", () => {
                this.fadeOut();
                this.dispatchEvent("closed");
            })
        }

        public show(text: string) {
            this.bitmapText.text = text;
            this.fadeIn();
        }

   }
}