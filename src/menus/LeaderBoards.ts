module joinjelly.menus {
    export class LeaderBoards extends ScrollablePage {

        protected scrollableContent: createjs.Container;
        protected maxScroll: number = 1700;
        public okButtonAction: () => void;


        constructor() {
            super(StringResources.menus.leaderboards);

            var loading = new joinjelly.view.LoadingBall();
            this.scrollableContent.addChild(loading);
            loading.x = defaultWidth / 2;
            loading.y = 800;

            var error = gameui.ImagesManager.getBitmapText(StringResources.menus.error,"debussy");
            this.scrollableContent.addChild(error);
            error.regX = error.getBounds().width / 2;
            error.x = defaultWidth / 2;
            error.y = 800;
            error.visible = false;

            this.loadLeaderBoards((results: Array<any>) => {
                loading.visible = false;

                if (results != null) 
                    this.fillLeaderBoards(results);
                else 
                    error.visible = true;
                
            });
        }


        public fillLeaderBoards(results: Array<any>) {
            var space = 200;
            var start = 400;
            for (var r in results) {
                var i = new view.LeaderBoardItem(results[r].score, results[r].name, parseInt(r) + 1);
                i.x = defaultWidth / 2
                i.y = start + space * r;
                this.scrollableContent.addChild(i);
            }

            this.maxScroll = start + results.length * space;
        }

        private loadLeaderBoards(callback: (leaderBoards: any) => void) {
            AzureLeaderBoards.getScoreNames(callback, 20);
        }
    }
}