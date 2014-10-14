module joinjelly.gameplay.view {
 
    export class PauseMenu extends createjs.Container{

        constructor() {
            super();

            this.regX = this.x = defaultWidth / 2;
            this.regY = this.y = defaultHeight / 2;
            
            this.AddBG();
            this.addButtons();
            this.animateIn();
            this.visible = false;
        }

        //creates menu title
        private AddBG() {
            var title = gameui.AssetsManager.getBitmap("FlyBG")
            title.set({ x: defaultWidth / 2, y: 557, regX: 1305 / 2 });
            //1305 1022
            this.addChild(title);
        }

        //creates buttons controls
        private addButtons() {

            //add continue button;
            var ok = new gameui.ui.ImageButton("PlayBt", (() => { this.dispatchEvent("play") }));
            ok.set({ x: 771, y: 1599 });
            this.addChild(ok);

            //add share button;
            var board = new gameui.ui.ImageButton("Home", (() => { this.dispatchEvent("home") }));
            board.set({ x: 353, y: 1570 });
            this.addChild(board);

            //add showBoard button
            var share = new gameui.ui.ImageButton("Restart", (() => { this.dispatchEvent("restart") }));
            share.set({ x: 1190, y: 1570 });
            this.addChild(share);
        }

        // animates menu entrance
        private animateIn() {

            //shows menus
            this.visible = true;

            //animate all
            this.y -= 500;
            this.alpha = 0;
            this.scaleX = 0.5;
            this.scaleY = 2;
            createjs.Tween.get(this).to({ x:defaultWidth/2, y: defaultHeight/2, alpha: 1,scaleX:1,scaleY:1 }, 1400, createjs.Ease.elasticInOut)

            //animate title

            //animate points

            //animate last jelly

            //animate buttons
            
        }

        private animateOut() {

            //animate all
            this.alpha = 1;
            this.scaleX =1;
            this.scaleY = 1;
            createjs.Tween.get(this).to({alpha: 0,scaleX: 0.5,scaleY: 0.75}, 200, createjs.Ease.quadIn).call(() => {this.visible=false })



            
        }


        public show() {
            this.animateIn();
        }

        public hide() {
            this.animateOut();
        }


    }
}