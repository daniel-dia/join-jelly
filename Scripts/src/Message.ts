module joinjelly.gameplay.view {
    export class Message extends gameui.Button {
        private text: createjs.Text;
        constructor() {
            super();

            this.addChild(new createjs.Shape(new createjs.Graphics().beginFill("darkGray").beginStroke("black").drawRect(-200, -60, 400, 120)));
            var t = new createjs.Text("", "60px Arial", "white");
            t.textAlign = "center";
            t.textBaseline = "middle";
            this.addChild(t);
            this.text = t;

            this.addEventListener("click", () => {
                this.fadeOut();
            });
        }

        public showMessage(message: string) {

            this.text.text = message;
            this.fadeIn();
        }
    }
}