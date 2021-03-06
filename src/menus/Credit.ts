module joinjelly {
    export class About extends gameui.ScreenState {

        protected scrollableContent: PIXI.Container;
        protected maxScroll: number = 1700;
        public okButtonAction: () => void;

        constructor() {
            super();

            this.background.addChild(gameui.AssetsManager.getBitmap("BackMain"));

            // Add text
            var text = gameui.AssetsManager.getBitmapText(StringResources.menus.aboutText, "debussyBig");
            text.regX = text.getBounds().width / 2
            this.content.addChild(text);
            text.x = defaultWidth / 2;
            text.y = defaultHeight / 2 - 500;

            // Add text
            var text = gameui.AssetsManager.getBitmapText(StringResources.menus.aboutURL, "debussy");
            text.regX = text.getBounds().width / 2
            this.content.addChild(text);
            text.x = defaultWidth / 2;
            text.y = defaultHeight / 2 + 400;

            // add icon
            var logo = new gameui.ImageButton("DIAStudioLogo", () => {
                DeviceServices.openURL("http://" + StringResources.menus.aboutURL);
            });

            logo.x = defaultWidth / 2;
            logo.y = defaultHeight / 2;
            this.content.addChild(logo); 
            // add ok button
            var okButton = new gameui.ImageButton("BtOk", () => {

                joinjelly.JoinJelly.showMainScreen()
            });
            okButton.x = defaultWidth / 2;
            okButton.y = defaultHeight - 200;
            this.content.addChild(okButton);

            // add version
            this.footer.addChild(gameui.AssetsManager.getBitmapText("v"+app_version, "debussy").set({ x: 30, y: -100, scaleX: 0.7, scaleY: 0.7 }))
        }
    }
}