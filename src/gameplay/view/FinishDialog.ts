﻿module joinjelly.gameplay.view {

    export class FinishMenu extends joinjelly.menus.view.FlyOutMenu {

        private jellyText: createjs.BitmapText;
        private jelly: view.Jelly;
        private scoreText: createjs.BitmapText;
        private highScoreText: createjs.BitmapText;

        constructor() {
            super(StringResources.menus.gameOver, 1250);
            this.addPoints();
            this.addLastJelly();
            this.addButtons();
        }

        // creates buttons controls
        private addButtons() {

            //add share button;
            var board = new gameui.ImageButton("BtBoard", (() => {
                this.dispatchEvent("board")
            }));
            board.set({ x: defaultWidth / 2, y: 1780 });
            this.addChild(board);

            //add showBoard button
            var share = new gameui.ImageButton("BtShare", (() => {
                this.dispatchEvent("share")
            }));
            share.set({ x: 1240, y: 1020 });
            // this.addChild(share);

            //add home button;
            var home = new gameui.ImageButton("BtHome", (() => {
                this.dispatchEvent("ok")
            }));
            home.set({ x: 353, y: 1780 });
            this.addChild(home);

            //add showBoard button
            var restart = new gameui.ImageButton("BtRestart", (() => {
                this.dispatchEvent("restart")
            }));
            restart.set({ x: 1190, y: 1780 });
            this.addChild(restart);
        }

        // create points control
        private addPoints(): createjs.DisplayObject {

            var container = new createjs.Container();
            
            // creates points Bg
            var bg = gameui.AssetsManager.getBitmap("GameOverBgPoints");
            bg.set({ x: defaultWidth / 2, y: 565, regX: 1056 / 2 });
            container.addChild(bg);

            // create "points" text
            var tx = gameui.AssetsManager.getBitmapText("", "debussyBig")
            tx.set({ x: defaultWidth / 2, y: 630 });
            container.addChild(tx);
            this.scoreText = tx;            

            // create HighScore text
            var tx = gameui.AssetsManager.getBitmapText("", "debussy")
            tx.set({ x: 300, y: 775 });
            tx.scaleX = tx.scaleY = 0.8;
            container.addChild(tx);
            this.highScoreText = tx;

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
            bg.set({ x: defaultWidth / 2, y: 951, regX: 797 / 2 });
            container.addChild(bg);

            //add "LastJelly" Text
            var tx = gameui.AssetsManager.getBitmapText(StringResources.menus.highJelly, "debussy")
            tx.set({ x: 420, y: 820 });
            //container.addChild(tx);
            tx.scaleX = tx.scaleY = 0.5;
                                    
            //add Jelly
            var jelly = new gameplay.view.Jelly();
            container.addChild(jelly);
            this.addChild(container);
            jelly.scaleX = jelly.scaleY = 1;
            jelly.set({ x: defaultWidth / 2, y: 1350 });
            this.jelly = jelly;


            //add "LastJelly" name Text
            var tx = gameui.AssetsManager.getBitmapText("1", "debussy")
            tx.set({ x: defaultWidth / 2, y: 1358 });
            tx.scaleX = tx.scaleY = 0.9;
            this.jellyText = tx;
            container.addChild(tx);

            container.y += 200;
            return container;
        }

        // set values
        public setValues(score: number, best: number, jelly?: number, title?: string) {
            if (best > JoinJelly.maxJelly) best = JoinJelly.maxJelly;
            if (title)
                this.setTitle(title);

            var t = { value: 0 };

            createjs.Tween.get(t).to({ value: 1 }, 3000, createjs.Ease.quadOut);

            var interval = setInterval(() => {
                this.scoreText.text = Math.floor(t.value * score).toString();
                this.scoreText.regX = this.scoreText.getBounds().width / 2;
                if (t.value >= 1) clearInterval(interval);
            }, 30);


            this.highScoreText.text = StringResources.menus.highScore + ": " + best.toString();
            this.jelly.setNumber(jelly);

            this.jellyText.text = StringResources.jellies[jelly].name;
            if (this.jellyText.getBounds())
                this.jellyText.regX = this.jellyText.getBounds().width / 2;

        }
    }
}