module joinjelly {
    export class ScrollablePage extends gameui.ScreenState {

        protected scrollableContent: PIXI.Container;
        protected maxScroll: number = 1700;
        public BackButtonAction: () => void;

        private targetY: number = 0;
        private last: number;
        private ScrollArea: PIXI.Container;
        private scrolling: boolean = false;

        constructor(title: string) {
            super();
            this.addBackground(title);
            this.addScrollableArea();
            this.addBackButton();


            this.onback = () => {
                if (this.BackButtonAction)
                    this.BackButtonAction();
                else
                    joinjelly.JoinJelly.showMainScreen()
            }
        }

        private addBackground(title: string) {
            // add Background
            this.background.addChild(gameui.AssetsManager.getBitmap("BackMain"));
            var bg = gameui.AssetsManager.getBitmap('BigBG');
            bg.mouseEnabled = true;
            this.content.addChild(bg);
            bg.x = (defaultWidth - 1463) / 2;
            bg.y = (defaultHeight - 1788) / 2;

            // add Title
            var titleObj = gameui.AssetsManager.getBitmapText(title.toUpperCase(), "debussyBig");
            this.content.addChild(titleObj);
            titleObj.y = bg.y + 50;
            titleObj.x = defaultWidth / 2;
            titleObj.regX = titleObj.getBounds().width / 2;
        }

        private addScrollableArea() {
            this.scrollableContent = new PIXI.Container();
            this.ScrollArea = new PIXI.Container();
            this.content.addChild(this.ScrollArea);
            this.ScrollArea.addChild(this.scrollableContent);

            var scrollMask = new PIXI.Graphics().beginFill(0xFF0000).drawPolygon([1417.556, 333.618, 1399.557, 264.622, 1363.559, 198.625, 1288.563, 146.128, 1197.067, 131.129,
                1197.067, 221.124, 1179.068, 239.123, 1161.069, 254.122, 745.59, 254.122, 301.612, 254.122, 283.613, 239.123, 265.614, 221.124,
                272.25, 131.129, 174.118, 146.128, 99.122, 198.625, 63.124, 264.622, 45.125, 333.618, 36.125, 918.589, 45.125, 1547.058, 58.624, 1593.555,
                85.623, 1647.553, 136.62, 1701.55, 181.618, 1722.549, 717.091, 1728.553, 745.59, 1728.553, 1281.063, 1722.549, 1326.061, 1701.55,
                1377.058, 1647.553, 1404.057, 1593.555, 1417.556, 1547.058, 1426.556, 918.589])
            this.content.addChild(scrollMask);
            scrollMask.interactive = false;
            scrollMask.interactiveChildren = false;

            scrollMask.x = (defaultWidth - 1463) / 2;
            scrollMask.y = (defaultHeight - 1788) / 2;

            this.ScrollArea.mask = scrollMask;

            // add scroll event
            this.ScrollArea.addEventListener("touchmove", this.pressMoveScroll, this);
            this.ScrollArea.addEventListener("touchend", this.pressUpScroll, this);
            this.ScrollArea.addEventListener("touchstart", this.pressDownScroll, this);
            this.ScrollArea.addEventListener("mousemove", this.pressMoveScroll, this);
            this.ScrollArea.addEventListener("mouseup", this.pressUpScroll, this);
            this.ScrollArea.addEventListener("mouseout", this.pressUpScroll, this);
            this.ScrollArea.addEventListener("mousedown", this.pressDownScroll, this);

            this.ScrollArea.interactive = true;
            this.ScrollArea.hitArea = new PIXI.Rectangle(0, 0, defaultWidth, defaultHeight);

        }

        private pressDownScroll(evt) {
            this.scrolling = true;
            this.last = null;
        }

        private pressMoveScroll(evt: PIXI.interaction.InteractionEvent) {
            if (!this.scrolling) return;

            var localY = evt.data.getLocalPosition(evt.currentTarget).y;
            if (!this.last) this.last = localY;
            this.targetY += (localY - this.last) * 1.3;
            if (this.targetY > 400) this.targetY = 400;
            if (this.targetY < -this.maxScroll) this.targetY = -this.maxScroll;
            this.last = localY;

        }

        private pressUpScroll(evt) {
            this.scrolling = false;
            this.last = null;
        }

        private scrollTick(evt) {
            this.scrollableContent.y = (this.scrollableContent.y * 2 + this.targetY) / 3;
        }

        private addBackButton() {
            // add ok button
            var backbutton = new gameui.ImageButton("BtBack", () => {
                if (this.BackButtonAction) this.BackButtonAction();
                else
                    joinjelly.JoinJelly.showMainScreen()
            });
            backbutton.x = 150;
            backbutton.y = 150;
            this.header.addChild(backbutton);

        }

        public activate(parameters?: any) {
            super.activate(parameters);
            PIXI.ticker.shared.add(this.scrollTick, this);

        }

        public desactivate(parameters?: any) {
            super.desactivate(parameters);
            PIXI.ticker.shared.remove(this.scrollTick, this);

        }


    }
}