module joinjelly.menus.view {

    export class LeaderBoardItem extends createjs.Container {
        constructor(score: number, name: string, position: number = 1) {
            super();

            this.regX = 1056 / 2;
            // Add Background
            var bg = gameui.AssetsManager.getBitmap("FlyGroup");
            bg.scaleY = 0.65;
            this.addChild(bg);

            // Add Texts
            var tContainer = new createjs.Container();
            var titleObj = gameui.AssetsManager.getBitmapText(name, "debussy");
            var positionObj = gameui.AssetsManager.getBitmapText(position.toString(), "debussy");
            var scoreObj = gameui.AssetsManager.getBitmapText(score.toString(), "debussy");
            scoreObj.regX = scoreObj.getBounds().width;
            positionObj.y = 30;
            titleObj.y = 30;
            scoreObj.y = 30;
            positionObj.x = 30;
            titleObj.x = 150;
            scoreObj.x = 1000;
            //titleObj.scaleX = titleObj.scaleY = 1.2;
            //scoreObj.scaleX = scoreObj.scaleY = 0.9;
            tContainer.addChild(titleObj);
            tContainer.addChild(scoreObj);
            tContainer.addChild(positionObj);
            this.addChild(tContainer);

        }
    }
}