module joinjelly.gameplay.view {
 
    export class FinishMenu extends gameui.ui.UIItem{

        constructor(score:number,best:number, jelly?:number) {
            super();

            this.addTitle();
            this.addButtons();
            this.addPoints(score,best);
            this.addLastJelly();
        }

        //creates menu title
        private addTitle() {
            var title = gameui.AssetsManager.getBitmap("GameOverTitle")
            title.set({ x: 75, y: 257});
            this.addChild(title);
        }

        //creates buttons controls
        private addButtons() {

            //add continue button;
            var ok = new gameui.ui.ImageButton("GameOverOk", (() => { this.dispatchEvent("ok") }));
            ok.set({ x: 771, y: 1599 });
            this.addChild(ok);

            //add share button;
            var board = new gameui.ui.ImageButton("GameOverBoard", (() => { this.dispatchEvent("board") }));
            board.set({ x: 353, y: 1570 });
            this.addChild(board);

            //add showBoard button
            var share = new gameui.ui.ImageButton("GameOverShare", (() => { this.dispatchEvent("share") }));
            share.set({ x: 1190, y: 1570 });
            this.addChild(share);
        }


        // create points control
        private addPoints(score:number,best:number):createjs.DisplayObject {

            var container = new createjs.Container();
            var textSprites = new createjs.SpriteSheet(Deburilfont);

            //creates points Bg
            var bg = gameui.AssetsManager.getBitmap("GameOverBgPoints");
            bg.set({ x: 233, y: 565});
            container .addChild(bg);

            //create points object
            var tx = new createjs.BitmapText("Score", textSprites)
            tx.set({ x: 288, y: 592 });
            tx.scaleX = tx.scaleY = 0.7;
            container .addChild(tx);
            

            //create "points" text
            var tx = new createjs.BitmapText(score.toString(), textSprites)
            tx.set({ x: 794, y: 747});
            container.addChild(tx);
            tx.scaleX = tx.scaleY = 2;
            tx.regX = tx.getBounds().width / 2;
            

            //create HighScore text
            var tx = new createjs.BitmapText("High Score: "+best.toString(), textSprites)
            tx.set({ x: 1240, y: 835 });
            container.addChild(tx);
            tx.scaleX = tx.scaleY = 0.7;
            tx.regX = tx.getBounds().width;
            
            this.addChild(container);

            return container;

        }


        // creates last jelly control
        private addLastJelly(): createjs.DisplayObject {

            var container = new createjs.Container();
            var textSprites = new createjs.SpriteSheet(Deburilfont);

            this.addChild(container);

            //add background
            var bg = gameui.AssetsManager.getBitmap("GameOverBgJelly");
            bg.set({ x: 363, y: 951});
            container.addChild(bg);


            //add "LastJelly" Text
            var tx = new createjs.BitmapText("High Score:", textSprites)
            tx.set({ x: 1295, y: 784 });
            container.addChild(tx);
            tx.scaleX = tx.scaleY = 0.5;
            tx.regX = tx.getBounds().width;
            return container;

            //add "LastJelly" name Text
            var tx = new createjs.BitmapText("High Score:", textSprites)
            tx.set({ x: 1295, y: 784 });
            container.addChild(tx);
            tx.scaleX = tx.scaleY = 0.5;
            tx.regX = tx.getBounds().width;
            return container;

            //add Jelly
            var jelly = new gameplay.view.Jelly();
            container.addChild(jelly);
            this.addChild(container);

            return container;

            
        }


        // animates menu entrance
        private animateIn() {
            //animate title

            //animate points

            //animate last jelly

            //animate buttons

            
        }



    }
}