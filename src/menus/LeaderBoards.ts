module joinjelly.menus {
    export class LeaderBoards extends ScrollablePage {

        protected scrollableContent: createjs.Container;
        protected maxScroll: number = 1700;
        public okButtonAction: () => void;



        constructor() {
            super(StringResources.menus.leaderboards);

        }

        public fillLeaderBoards() {

        }

        private loadLeaderBoards(callback:(leaderBoards:any)=>void) {

        }
    }
}