module joinjelly.menus {
    export class MainMenu extends ScrollablePage {

        protected scrollableContent: createjs.Container;
        protected maxScroll: number = 1700;
        public okButtonAction: () => void;

        constructor() {
            super(StringResources.menus.menu);
            var space = 270;
            var y = 400;

            // add Sound Button
            var soundOptions = new menus.view.SoundOptions();
            this.scrollableContent.addChild(soundOptions);
            this.scrollableContent.x = defaultWidth / 2;
            soundOptions.y = y += space ;


            // add Player name
            var playerNameTitle = new view.PlayerNameOptions();
            this.scrollableContent.addChild(playerNameTitle);
            playerNameTitle.y = y += space+80;
        
            // add Tutorial button
            var tutorial = new gameui.BitmapTextButton(StringResources.menus.tutorial, "debussy", "BtTextBg", () => { JoinJelly.startTutorial(); })
            tutorial.y = y += space;
            this.scrollableContent.addChild(tutorial);

            // add Reset Button
            var reset = new gameui.BitmapTextButton(StringResources.menus.reset, "debussy", "BtTextBg", () => {
                Cocoon.Dialog.confirm({
                    title: StringResources.menus.reset,
                    message: StringResources.menus.resetWarning
                }, function (accepted) {
                        if (accepted) {
                            JoinJelly.userData.resetAll();
                            JoinJelly.showMainMenu()
                        } else {}
                    });


            });
            reset.y = y += space;
            this.scrollableContent.addChild(reset);

        }


    }
}