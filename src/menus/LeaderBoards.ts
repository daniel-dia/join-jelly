module joinjelly.menus {
    export class LeaderBoards extends ScrollablePage {

        protected scrollableContent: createjs.Container;
        protected maxScroll: number = 1700;
        public okButtonAction: () => void;


        constructor() {
            
            super(StringResources.menus.leaderboards);
            this.loadLeaderBoards((results:Array<any>) => {
                this.fillLeaderBoards(results);
            });
        }
         public fillLeaderBoards(results: Array<any>) {
             var space = 200;
             var start = 400;
            for (var r in results) {
                var i = new view.LeaderBoardItem(results[r].score, results[r].name,parseInt(r)+1);
                i.x = defaultWidth / 2
                i.y = start + space*r;
                this.scrollableContent.addChild(i);
            }

             this.maxScroll = start + results.length * space;
        }

        private loadLeaderBoards(callback:(leaderBoards:any)=>void) {
            AzureLeaderBoards.getScoreNames(callback, 20);
        }
    }
}