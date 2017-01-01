module joinjelly.gameplay.view {

    export class PauseMenuOverlay extends gameui.UIItem {
        private title: PIXI.extras.BitmapText;

        constructor() {
            super();
            this.AddBG(1000);

            this.addTitle(StringResources.menus.pause);
            this.addButtons();

            this.visible = false;
        }
 
        //creates buttons controls
        private addButtons() {

            //add continue button;
            var playBt = new gameui.ImageButton("BtPlay",(() => {
                this.dispatchEvent("play")
            }));

            playBt.set({ x: 157, y: 215, scaleX:0.5, scaleY:0.5});
            this.addChild(playBt);

            //add home button;
            var home = new gameui.ImageButton("BtHome",(() => {
                this.dispatchEvent("home")
            }));
            home.set({ x: 157, y: 215 + 300});
            this.addChild(home);
            
            //add showBoard button
            var restart = new gameui.ImageButton("BtRestart",(() => {
                this.dispatchEvent("restart")
            }));
            restart.set({ x: 157, y: 215 + 600 });
            this.addChild(restart);
        }

        public hide() {
            this.fadeOut()
        }

        public show() {
            this.fadeIn();
        }

        // creates menu background
        private AddBG(heigth: number = 1022) {
            var dk = gameui.AssetsManager.getBitmap("popupdark");
            this.addChild(dk);
            dk.scaleX = dk.scaleY = 16
            dk.x = -defaultWidth / 2;
            dk.y = -defaultHeight / 2;
            dk.mouseEnabled = false;
        }

        // creates menu title
        private addTitle(title: string) {
            //create "points" text
            
            this.title = gameui.AssetsManager.getBitmapText("", "debussyBig")
            this.title.set({ x: defaultWidth / 2, y: 350 });
            this.addChild(this.title);

            this.setTitle(title);
        }

        public setTitle(title: string) {
            this.title.text = title.toUpperCase()
            this.title.regX = this.title.getBounds().width / 2;
        }


    }
}