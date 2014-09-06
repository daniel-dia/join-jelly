module fpair.gameplay.view {
    export class LevelIndicator extends createjs.Container {

        public showLevel(levelId: number) {
            var text = new createjs.Text("",defaultFont,defaultFontColor); 
            this.addChild(text);
            text.textAlign = "center";
            text.text = "LEVEL " + levelId;
            text.x = defaultWidth / 2;
            text.y = defaultHeigth / 2+200;
            text.alpha = 0;
            createjs.Tween.get(text)
                .to({ y: defaultHeigth / 2, alpha: 1 },200,createjs.Ease.quadOut)
                .wait(500)
                .to({ y: defaultHeigth / 2 - 200, alpha: 0 }, 200, createjs.Ease.quadIn);

        }
    }
}