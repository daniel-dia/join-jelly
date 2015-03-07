module joinjelly.menus.view {

    export class PlayerNameOptions extends createjs.Container {

        private playerName: createjs.BitmapText;

        constructor() {
            super();
            this.addObjects();
        }

        private addObjects() {

            var bg = gameui.ImagesManager.getBitmap("FlyGroup");
            bg.y = - 130;
            bg.regX = bg.getBounds().width / 2;
            this.addChild(bg);

            var title = gameui.ImagesManager.getBitmapText(StringResources.menus.playerName, "debussy")
            title.y = -190;
            title.scaleX = title.scaleY = 1.1;
            title.regX = title.getBounds().width / 2;
            this.addChild(title)
            
            var playerName = gameui.ImagesManager.getBitmapText(JoinJelly.userData.getPlayerName(), "debussy");
            this.addChild(playerName);
            this.playerName = playerName;
            playerName.x= -450
            playerName.y = -60;

            var playerNameEdit = new gameui.ImageButton("BtEdit", () => { JoinJelly.userData.promptPlayerName(() => { 
                this.playerName.text = JoinJelly.userData.getPlayerName(); ;
            })});
            this.addChild(playerNameEdit);
            playerNameEdit.x = 400;
        }
    }
}