module joinjelly.gameplay.view {
 
    export class PauseMenu extends joinjelly.menus.view.FlyOutMenu{

        constructor() {
            super("PAUSED");
            this.addButtons();
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


    }
}