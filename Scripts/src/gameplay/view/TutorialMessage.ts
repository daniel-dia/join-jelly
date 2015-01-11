module joinjelly.gameplay.view {

    export class TutoralMessage extends gameui.Button {

        private bitmapText: createjs.BitmapText;
        constructor() {
            super();

            this.addChild(gameui.AssetsManager.getBitmap("ballon"));

            this.visible = false;
            
            this.regX = 316
            this.regY = 366;
            this.x = 164 + this.regX;
            this.y = 941 + this.regY;


            var t = gameui.AssetsManager.getBitmapText("", "debussy")
            this.addChild(t);
            t.scaleX = t.scaleY = 0.7;
            t.x = 50;
            t.y = 50;
            this.bitmapText = t;
            t.mouseEnabled = false;

            // add hitArea
            this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(-this.x+this.regX, -this.y+this.regY, defaultWidth, defaultHeight));

            // add click event
            this.addEventListener("click", () => {
                this.fadeOut();
                this.dispatchEvent("closed");

                gameui.AssetsManager.playSound("Interface Sound-15");
            })
        }

        // show a text on screen
        public show(text: string) {
            this.bitmapText.text = text;
            this.fadeIn();

            gameui.AssetsManager.playSound("Interface Sound-14");
        }

   }
}