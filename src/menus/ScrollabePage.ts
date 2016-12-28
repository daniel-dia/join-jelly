module joinjelly {
    export class ScrollablePage extends gameui.ScreenState {

        protected scrollableContent: PIXI.Container;
        protected maxScroll: number = 1700;
        public okButtonAction: () => void;

        private targetY: number = 0;
        private last: number;
        private ScrollArea: PIXI.Container;
        private scrolling: boolean = false;

        constructor(title: string) {
            super();
            this.addBackground(title);
            this.addScrollableArea();
            this.addButton();


            this.onback = () => {
                if (this.okButtonAction)
                    this.okButtonAction();
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
       
            var mask = gameui.AssetsManager.getBitmap('ScrollMask');
            this.ScrollArea.addChild(mask);
            mask.scaleX = mask.scaleY = 2;
            mask.interactive = false;
            mask.interactiveChildren = false;
      
            mask.x = (defaultWidth - 1463) / 2;
            mask.y = (defaultHeight - 1788) / 2;

            this.ScrollArea.mask = mask;

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
        
        private addButton() {
            // add ok button
            var okButton = new gameui.ImageButton("BtOk", () => {
                if (this.okButtonAction) this.okButtonAction();
                else
                    joinjelly.JoinJelly.showMainScreen()
            });
            okButton.x = defaultWidth * 3 / 4;
            okButton.y = defaultHeight - 200;
            this.content.addChild(okButton);

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