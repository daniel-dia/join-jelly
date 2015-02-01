module joinjelly {
    export class About extends ScrollablePage {

        protected scrollableContent: createjs.Container;
        protected maxScroll: number = 1700;
        public okButtonAction: () => void;

        constructor() {
            super(StringResources.menus.about);

        }
    }
}