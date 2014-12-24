﻿module joinjelly.gameplay.view {
 
    export class FinishMenu extends joinjelly.menus.view.FlyOutMenu{

        private jellyText: createjs.BitmapText;
        private jelly: view.Jelly;
        private scoreText: createjs.BitmapText;
        private higghScoreText: createjs.BitmapText;
        

        constructor() {
            super("GAME OVER",1250);
            this.addButtons();
            this.addPoints();
            this.addLastJelly();
        }

        //creates buttons controls
        private addButtons() {

            //add continue button;
            var ok = new gameui.ImageButton("GameOverOk", (() => {
                this.dispatchEvent("ok")
            }));
            ok.set({ x: 771, y: 1810 });
            this.addChild(ok);

            //add share button;
            var board = new gameui.ImageButton("GameOverBoard", (() => {
                this.dispatchEvent("board")
            }));
            board.set({ x: 353, y: 1780 });
            this.addChild(board);

            //add showBoard button
            var share = new gameui.ImageButton("GameOverShare", (() => {
                this.dispatchEvent("share")
            }));
            share.set({ x: 1190, y: 1780 });
            this.addChild(share);
        }

        // create points control
        private addPoints():createjs.DisplayObject {

            var container = new createjs.Container();
            
            //creates points Bg
            var bg = gameui.AssetsManager.getBitmap("GameOverBgPoints");
            bg.set({ x: defaultWidth/2, y: 565,regX:1056/2});
            container .addChild(bg);

            //create points object
            var tx = gameui.AssetsManager.getBitmapText("Score", "debussy")
            tx.set({ x: 288, y: 442 });
            tx.scaleX = tx.scaleY = 0.7;
            //container.addChild(tx);
            
            //create "points" text
            var tx = gameui.AssetsManager.getBitmapText("", "debussy")
            tx.set({ x: defaultWidth/2, y: 587});
            container.addChild(tx);
            tx.scaleX = tx.scaleY = 2;
            this.scoreText = tx;            

            //create HighScore text
            var tx = gameui.AssetsManager.getBitmapText("", "debussy")
            tx.set({ x: 1240, y: 775 });
            container.addChild(tx);
            tx.scaleX = tx.scaleY = 0.7;
            this.higghScoreText = tx;

            container.y += 260;
            this.addChild(container);
             
            return container;

        }

        // creates last jelly control
        private addLastJelly(): createjs.DisplayObject {

            var container = new createjs.Container();

            this.addChild(container);

            //add background
            var bg = gameui.AssetsManager.getBitmap("GameOverBgJelly");
            bg.set({ x: defaultWidth / 2, y: 951,regX:797 / 2});
            container.addChild(bg);

            //add "LastJelly" Text
            var tx = gameui.AssetsManager.getBitmapText("Last Jelly", "debussy")
            tx.set({ x: 420, y:820});
            //container.addChild(tx);
            tx.scaleX = tx.scaleY = 0.7;
                                    
            //add Jelly
            var jelly = new gameplay.view.Jelly();
            container.addChild(jelly);
            this.addChild(container);
            jelly.scaleX = jelly.scaleY = 1.75;
            jelly.set({ x: defaultWidth / 2, y: 1350 });
            this.jelly = jelly;


            //add "LastJelly" name Text
            var tx = gameui.AssetsManager.getBitmapText("1", "debussy")
            tx.set({ x: defaultWidth / 2, y: 1358 });
            tx.scaleX = tx.scaleY = 0.7;
            this.jellyText = tx;
            container.addChild(tx);
            
            container.y += 200;
            return container;
        }

        //set values
        public setValues(score: number, best: number, jelly?: number) {


            var t = {value:0};

            createjs.Tween.get(t).to({ value: 1 }, 3000, createjs.Ease.quadOut);

            var interval = setInterval(() => {
                this.scoreText.text = Math.floor(t.value*score).toString();
                this.scoreText.regX = this.scoreText.getBounds().width / 2;
                if (t.value >= 1) clearInterval(interval);
            }, 30);
        
        
            this.higghScoreText.text = "High Score: " + best.toString();
            this.jelly.setNumber(jelly);

            this.jellyText.text = jellyInfos[jelly].name;
            this.jellyText.regX = this.jellyText.getBounds().width / 2;
            this.higghScoreText.regX = this.higghScoreText.getBounds().width;

        }
    }
}