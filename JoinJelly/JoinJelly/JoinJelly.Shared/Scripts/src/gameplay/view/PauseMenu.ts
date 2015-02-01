module joinjelly.gameplay.view {
 
    export class PauseMenu extends joinjelly.menus.view.FlyOutMenu{


        constructor() {
            super(StringResources.menus.pause);
            this.addButtons();

            var soundOptions = new menus.view.SoundOptions();
            this.addChild(soundOptions);
            soundOptions.set({x: defaultWidth / 2,y:1000});
        }

        //creates buttons controls
        private addButtons() {

            //add continue button;
            var ok = new gameui.ImageButton("BtPlay", (() => {
                this.dispatchEvent("play")
            }));
            ok.set({ x: 771, y: 1599 });
            this.addChild(ok);

            //add share button;
            var board = new gameui.ImageButton("BtHome", (() => {
                this.dispatchEvent("home")
            }));
            board.set({ x: 353, y: 1570 });
            this.addChild(board);

            //add showBoard button
            var share = new gameui.ImageButton("BtRestart", (() => {
                this.dispatchEvent("restart")
            }));
            share.set({ x: 1190, y: 1570 });
            this.addChild(share);
        }

    }
}