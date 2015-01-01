module joinjelly.gameplay {

    export class GamePlayScreen extends gameui.ScreenState {


        // gameplay Control
        protected  gamestate: GameState;
        protected level: number;
        private score: number;
        private matches: number = 0;
        private UserData: UserData;
        protected matchNotify: () => void;

        //interface
        protected board: Board;
        private gameHeader: view.GameHeader;
        private gameFooter: view.GameFooter;
        private gameLevelIndicator: view.LevelIndicator;
        private finishMenu: view.FinishMenu;
        private pauseMenu: view.PauseMenu;
        private showBoardButton: gameui.Button;

        // parameters
        private boardSize: number = 5;
        private itemProbability: number = 0.005;
        private timeByLevel: number = 10000
        private timeoutInterval: number;
        private initialInterval: number = 900;
        private finalInterval: number = 150;
        private easeInterval: number = 0.97;
        
        // effect 
        private freezeEffect: createjs.DisplayObject;
        private fastEffect: createjs.DisplayObject;
        private reviveEffect: createjs.DisplayObject;
        private cleanEffect: createjs.DisplayObject;

        //#region =================================== initialization ================================================

        constructor(userData: UserData) {
            super();

            this.UserData = userData;

            this.score = 0;

            this.createBackground();
            this.createBoard();
            this.createGUI();

            this.createEffects();
        }

        // create game effects
        private createEffects() {

            this.freezeEffect = gameui.AssetsManager.getBitmap("freezeEffect");
            this.content.addChild(this.freezeEffect);
            this.freezeEffect.visible = false;
            this.freezeEffect.scaleX = this.freezeEffect.scaleY = 2;
            this.freezeEffect.mouseEnabled = false;

            this.fastEffect = gameui.AssetsManager.getBitmap("fastEffect");
            this.content.addChild(this.fastEffect);
            this.fastEffect.visible = false;
            this.fastEffect.scaleX = this.fastEffect.scaleY = 2;
            this.fastEffect.mouseEnabled = false;

            this.reviveEffect = gameui.AssetsManager.getBitmap("reviveEffect");
            this.content.addChild(this.reviveEffect);
            this.reviveEffect.visible = false;
            this.reviveEffect.scaleX = this.reviveEffect.scaleY = 2;
            this.reviveEffect.mouseEnabled = false;

            this.cleanEffect = gameui.AssetsManager.getBitmap("cleanEffect");
            this.content.addChild(this.cleanEffect);
            this.cleanEffect.visible = false;
            this.cleanEffect.scaleX = this.cleanEffect.scaleY = 2;
            this.cleanEffect.mouseEnabled = false;

        }

        // create game background
        private createBackground() {
            var bg = gameui.AssetsManager.getBitmap("Background");
            this.background.addChild(bg);
        }

        // create a new board
        private createBoard() {
            this.board = new Board(this.boardSize, this.boardSize, 1536 / 5, true);
            this.board.addEventListener("tileMove", (e: createjs.MouseEvent) => {
                this.dragged(e.target.origin, e.target.target);
            });
            this.content.addChild(this.board);
            
            this.board.x = defaultWidth / 2;
            this.board.y = defaultHeight / 2;
        }

        // creates the game GUI
        protected createGUI() {

            // creates game level indicator
            this.gameLevelIndicator = new view.LevelIndicator();
            this.content.addChild(this.gameLevelIndicator);

            // creates game header
            this.gameHeader = new view.GameHeader();
            this.header.addChild(this.gameHeader);

            // create game footer
            var items = ["time", "clean", "fast", "revive"];
            this.gameFooter = new view.GameFooter(items);
            this.footer.addChild(this.gameFooter);
            this.updateFooter();

            this.gameFooter.addEventListener("useitem", (e: createjs.Event) => { this.useItem(e.target) });



            // creates pause menu
            this.pauseMenu = new view.PauseMenu();
            this.content.addChild(this.pauseMenu);

            // creates a end menu
            this.finishMenu = new view.FinishMenu();
            this.content.addChild(this.finishMenu);
            this.finishMenu.y = -200;

            // creates a toggle button
            var tbt = new gameui.ImageButton("GameOverBoard", () => {
                this.finishMenu.show();
                tbt.fadeOut();

                gameui.AssetsManager.playSound("Interface Sound-06");
            });
            tbt.set({ x: 150, y: -150, visible: false });
            this.footer.addChild(tbt);
            this.showBoardButton = tbt;

            //add eventListener
            this.finishMenu.addEventListener("ok", () => {
                JoinJelly.showMainMenu();
            });

            this.finishMenu.addEventListener("board", () => {
                this.finishMenu.hide();
                tbt.fadeIn();
            });

            this.finishMenu.addEventListener("share", () => {
                //
            });

            this.gameHeader.addEventListener("pause", () => {
                this.pauseGame();
            });

            this.pauseMenu.addEventListener("play", () => {
                this.continueGame();
            });

            this.pauseMenu.addEventListener("home", () => {
                this.pauseMenu.hide();
                setTimeout(() => { joinjelly.JoinJelly.showMainMenu(); }, 200);
            });

            this.pauseMenu.addEventListener("restart", () => {
                this.pauseMenu.hide();
                setTimeout(() => { joinjelly.JoinJelly.startLevel(); }, 200);
            });

        }

        // redim screen
        public redim(headerY: number, footerY: number, width: number, heigth: number) {

            super.redim(headerY, footerY, width, heigth)

            var relativeScale = (this.screenHeight - 2048) / 400;
            if (relativeScale < 0) relativeScale = 0;
            if (relativeScale > 1) relativeScale = 1;

            this.board.scaleX = this.board.scaleY = 1 - (0.2 - relativeScale * 0.2);
        }

        //acivate the screen
        activate(parameters?: any) {
            super.activate(parameters);
            this.gameHeader.alpha = 0;

            setTimeout(() => {
                createjs.Tween.get(this.gameHeader).to({ alpha: 1 }, 500);
                this.start();
            }, 500);
        }

        //#endregion

        // #region =================================== interface =====================================================

        // update GUI iformaion
        private updateInterfaceInfos() {

            //calculate interval 
            var nextLevelScore = this.getMovesByLevel(this.level);
            var currentLevelScore = this.getMovesByLevel(this.level - 1);

            var percent = (this.matches - currentLevelScore) / (nextLevelScore - currentLevelScore) * 100;

            // defines alarm condition
            var emptySpaces = this.board.getPercentEmptySpaces();
            var alarm = false;
            if (emptySpaces < 0.25 && emptySpaces > 0)
                var alarm = true;

            // updates the header
            this.gameHeader.updateStatus(this.score, this.level, percent, emptySpaces, alarm);

            // updates board shaking.
            this.board.setAlarm(alarm);

        }

        // level up
        protected levelUpInterfaceEffect(level: number) {
            this.gameLevelIndicator.showLevel(level);
            gameui.AssetsManager.playSound("Interface Sound-11");
            this.board.levelUpEffect();
        }

        // #endregion

        // #region =================================== gamelay =======================================================

        // starts the game
        protected start() {

            this.level = 1;
            this.matches = 0;

            // board initialization
            this.board.cleanBoard();
            this.board.unlock();

            // update interfaces
            this.updateInterfaceInfos();

            // play music
            gameui.AssetsManager.playMusic("music1");

            // initialize gameloop
            this.gamestate = GameState.playing;
            this.step(500);

            // log game start event
            JoinJelly.analytics.logGameStart();
        }

        // time step for adding tiles.
        protected step(timeout: number) {
            clearInterval(this.timeoutInterval);

            this.timeoutInterval = setTimeout(() => {

                // if is not playing, than does not execute a step
                if (this.gamestate == GameState.playing)
                    this.gameInteraction();

                // set timeout to another iteraction if game is not over
                if (this.gamestate != GameState.ended)
                    this.step(this.getTimeInterval(this.level, this.initialInterval, this.finalInterval, this.easeInterval));

            }, timeout);
        }

        // executes a game interaction
        protected gameInteraction() {

            // add a new tile  on board
            this.addRandomTileOnBoard();

            // updates interafce information
            this.updateInterfaceInfos();

            // verifies if game is loosed after 500ms again. if them both than loose game
            if (this.verifyGameLoose()) this.endGame();

            // update currentLevel
            this.updateCurrentLevel();
        }

        // pause game
        private pauseGame() {

            this.pauseMenu.show();
            this.gamestate = GameState.paused;
            this.board.lock();
            this.gameHeader.mouseEnabled = false;
        }

        // unpause game
        private continueGame() {

            this.pauseMenu.hide();
            this.gamestate = GameState.playing;
            this.board.unlock();
            this.gameHeader.mouseEnabled = true;
        }

        // finishes the game
        private endGame(message?: string) {

            this.gamestate = GameState.ended;

            var score = this.score;
            var highScore = JoinJelly.userData.getHighScore();
            var highJelly = this.board.getHighestTileValue();

            // disable mouse interaction
            this.board.lock();
            this.board.setAlarm(false);

            // releases all jellys
            this.board.releaseAll();

            // save high score
            JoinJelly.userData.setScore(score);

            // remove other ui items
            this.gameHeader.mouseEnabled = false;
            this.gameFooter.mouseEnabled = false;
            createjs.Tween.get(this.gameHeader).to({ y: -425 }, 200, createjs.Ease.quadIn);
            createjs.Tween.get(this.gameFooter).to({ y: +300 }, 200, createjs.Ease.quadIn);

            // shows finished game menu
            setTimeout(() => {
                this.finishMenu.show();
                this.gameFooter.mouseEnabled = true;

                // set footer items form revive
                this.gameFooter.setItems(["revive"]);
                createjs.Tween.get(this.gameFooter).to({ y: 0 }, 200, createjs.Ease.quadIn);

            }, 1200);
            this.finishMenu.setValues(score, highScore, highJelly, message);

            // log event
            JoinJelly.analytics.logEndGame(this.matches, this.score, this.level, highJelly)

            // play end soud
            gameui.AssetsManager.playSound("end");

            // play end game effect
            this.board.endGameEffect();
        }

        // winTheGame
        private winGame() {
            this.endGame(StringResources.menus.gameOver);
            // TODO something great
        }

        // update current level
        private updateCurrentLevel() {
            var newLevel = this.getLevelByMoves(this.matches);
            if (newLevel > this.level)
                this.levelUpInterfaceEffect(newLevel);

            this.level = newLevel;
        }

        // calculate current level by moves. once level calculation is a iterative processe, this method uses a iterative calculation
        protected getLevelByMoves(moves: number): number {
            var totalMoves = 0;
            var level = 0;

            // calculate moves ammount for each level, once it reches more than current moves, it returns the calculated level
            while (totalMoves < moves) {
                var interval = this.getTimeInterval(level, this.initialInterval, this.finalInterval, this.easeInterval);
                var levelMoves = this.timeByLevel / interval;
                totalMoves += levelMoves;
                level++
            }

            return Math.max(level, 1);
        }

        // get how moves is needed for each level;
        protected getMovesByLevel(level: number): number {
            var totalMoves = 0;

            // calculate moves ammount for each level, once it reches more than current moves, it returns the calculated level
            for (var calculatedLevel = 0; calculatedLevel < level; calculatedLevel++) {
                var interval = this.getTimeInterval(calculatedLevel, this.initialInterval, this.finalInterval, this.easeInterval);
                var levelMoves = this.timeByLevel / interval;
                totalMoves += levelMoves;
            }

            return totalMoves;
        }

        // calculate time interval for a level.
        protected getTimeInterval(level: number, initialInterval: number, finalInterval: number, intervalEase: number): number {
            return initialInterval * Math.pow(intervalEase, level) + finalInterval * (1 - Math.pow(intervalEase, level));
        }

        // Verifies if game is over
        private verifyGameLoose(): boolean {

            var empty = this.board.getEmptyTiles();
            var locked = this.board.getLockedTiles();

            if (empty.length == 0 && locked.length == 0)
                return true;

            return false;
        }

        // add a random tile with value 1 on board
        protected addRandomTileOnBoard(value: number= 1) {

            var empty = this.board.getEmptyTiles();

            // if there is no more empty tiles, ends the game
            if (empty.length > 0) {
                var i = Math.floor(Math.random() * empty.length);
                var tile = empty[i];
                tile.setNumber(value);
            }
        }

        //called when a tile is dragged
        private dragged(origin: Tile, target: Tile) {

            //try to match the tiles
            this.match(origin, target);
        }
    
        // verifies if 2 tiles can match
        protected canMatch(origin: Tile, target: Tile): boolean {
            return (origin.getNumber() != 0 && target != origin && target.getNumber() == origin.getNumber() && target.isUnlocked());
        }

        // verifies if a tile can pair another, and make it happens
        protected match(origin: Tile, target: Tile): boolean {
            //check if match is correct
            if (!this.canMatch(origin, target)) return false;

            this.matches++;

            // update currentLevel
            this.updateCurrentLevel()

            //calculate new value
            var newValue = target.getNumber() + origin.getNumber();

            //sum the tiles values
            target.setNumber(newValue);

            //reset the previous tile
            origin.setNumber(0);

            //animate the mach
            this.board.match(origin, target);

            // increase score
            var sum = newValue * 10 + Math.floor(Math.random() * newValue*10);
            this.score += sum;
            this.animateScoreFromTile(target, sum); // animate a score number

            // chance to win a item
            var item = this.giveItemChance(ItemsData.items)
            if (item) this.animateItemFromTile(target, item);

            // update score
            this.UserData.setScore(this.score);
            this.UserData.setLastJelly(newValue);

            this.updateInterfaceInfos();

            // notify match
            if (this.matchNotify)
                this.matchNotify()


            // verify winGame
            if (newValue >= 8192)
                this.winGame();

            // log event
            joinjelly.JoinJelly.analytics.logMove(this.matches, this.score, this.level, this.board.getEmptyTiles().length);

            return true;
        }

        //give item to user
        private giveItemChance(items: Array<string>): string {

            var item = null;

            // calculate random change to win a item
            var goodChance: boolean = (Math.random() < this.itemProbability);
            
            // if true
            if (goodChance) {
                item = items[Math.floor(Math.random() * items.length)];

                // give item to user (user data)
                JoinJelly.itemData.increaseItemAmmount(item);
                
            }
            return item;
        }

        // animate a item moving from tile to the footer
        private animateItemFromTile(tile: Tile, item: string) {

            // create item Object
            var itemDO = gameui.AssetsManager.getBitmap("item" + item);
            itemDO.mouseEnabled = false;
            itemDO.regX = itemDO.getBounds().width / 2;
            itemDO.regY = itemDO.getBounds().height / 2;
            this.content.addChild(itemDO);

            // animate item to footer
            var xi = this.board.localToLocal(tile.x, tile.y, this.content).x;
            var yi = this.board.localToLocal(tile.x, tile.y, this.content).y;
            var xf = defaultWidth/2;
            var yf = this.footer.y;;

            var footerItem = this.gameFooter.getItemButton(item) 
            if (footerItem) {
                xf = this.gameFooter.localToLocal(footerItem.x, footerItem.y, this.content).x;
                yf = this.gameFooter.localToLocal(footerItem.x, footerItem.y, this.content).y;
            }

            createjs.Tween.get(itemDO).to({ x: xi, y: yi, alpha: 0 }).to({ y: tile.y - 70, alpha: 1}, 400, createjs.Ease.quadInOut).to({x:xf,y:yf}, 1000, createjs.Ease.quadInOut).call(() => { 
                this.content.removeChild(itemDO);
                this.updateFooter();
            });


        }

        // animate a score in the board
        private animateScoreFromTile(tile: Tile, score: number) {

            // create text Object
            var textDO = gameui.AssetsManager.getBitmapText(score.toString(), "debussy");
            textDO.regX = textDO.getBounds().width / 2;
            textDO.mouseEnabled = false;
            this.content.addChild(textDO);

            var xi = this.board.localToLocal(tile.x, tile.y, this.content).x;
            var yi = this.board.localToLocal(tile.x, tile.y, this.content).y;
                        
            createjs.Tween.get(textDO).to({ x: xi, y: yi, alpha: 0 }).to({ y: yi-170, alpha: 1 }, 400, createjs.Ease.quadOut).to({alpha:0},400).call(() => {
                this.content.removeChild(textDO);
            });

        }

        // #endregion

        // #region =================================== Items =========================================================

        private useItem(item: string) {

            if (JoinJelly.itemData.getItemAmmount(item) > 0) {

                var sucess:boolean = false;

                switch (item) {
                    case "time":
                        sucess = this.useTime();
                        break;
                    case "fast":
                        sucess = this.useFast();
                        break;
                    case "clean":
                        sucess = this.useClean();
                        break;
                    case "revive":
                        sucess = this.useRevive();
                        break;
                }

                if (sucess) {
                    JoinJelly.itemData.decreaseItemAmmount(item);
                    this.gameFooter.setItemAmmount(item, JoinJelly.itemData.getItemAmmount(item));
                }
            }
        }

        // reduces jellys per time during 5 seconds.
        private useTime() :boolean{
            if (this.gamestate == GameState.ended) return;

            this.step(5000);

            //cast effects
            this.freezeEffect.alpha = 0;
            this.freezeEffect.visible = true;
            createjs.Tween.removeTweens(this.freezeEffect);
            createjs.Tween.get(this.freezeEffect).to({ alpha: 1 }, 1000).to({ alpha: 0 }, 4000).call(() => {
                this.freezeEffect.visible = false
            });

            return true;
        }

        //clan all simple jellys
        private useClean(): boolean {
            if (this.gamestate == GameState.ended) return;
            var tiles = this.board.getAllTiles();
            for (var t in tiles)
                if (tiles[t].getNumber() < 2) {
                    this.board.fadeTileToPos(tiles[t], tiles[t].x, tiles[t].y - 100, 200, 300 * Math.random());
                    tiles[t].setNumber(0);
                }
            this.updateInterfaceInfos()

            //cast effects
            this.cleanEffect.alpha = 0;
            this.cleanEffect.visible = true;

            createjs.Tween.removeTweens(this.cleanEffect);
            createjs.Tween.get(this.cleanEffect).to({ alpha: 0 }, 200).to({ alpha: 1 }, 200).to({ alpha: 0 }, 200);
            createjs.Tween.get(this.cleanEffect).to({ x: -600, y: 2000 }).to({ x: 300, y: -500 }, 600).call(() => {
                this.cleanEffect.visible = false
            });

            return true;
        }

        // revive after game end
        private useRevive(): boolean {

            if (this.gamestate != GameState.ended) return false;

            // back state to playing
            this.gamestate = GameState.playing;

            //ullock board
            this.board.unlock();

            // hide finish menu
            this.finishMenu.hide();

            // set next iteraction after 4 seconds
            this.step(4000);

            // update all interface
            this.updateInterfaceInfos();

            // set board alarm
            this.board.setAlarm(true);

            // hide show board button
            this.showBoardButton.fadeOut();

            // set footer items
            this.gameFooter.setItems(["time", "clean", "fast", "revive"]);

            // remove other ui items
            this.gameHeader.mouseEnabled = true;
            createjs.Tween.get(this.gameHeader).to({ y: -0 }, 200, createjs.Ease.quadIn);

            //cast effects
            this.reviveEffect.alpha = 0;
            this.reviveEffect.visible = true;
            createjs.Tween.removeTweens(this.reviveEffect);
            createjs.Tween.get(this.reviveEffect).to({ y: 1000 }).to({ y: 500, alpha: 1 }, 500).to({ y: 0, alpha: 0 }, 500).call(() => {
                this.reviveEffect.visible = false
            });

            return true;
        }

        // match 5 pair of jelly if avaliabe
        private useFast(): boolean {
            if (this.gamestate == GameState.ended) return;
            var tiles = this.board.getAllTiles();
            var matches = [];
            
            // try to match every tile
            for (var t in tiles) {

                // 5 times
                if (matches.length >= 5) break;

                var origin = tiles[t];
                if (origin.getNumber() > 0 && origin.isUnlocked()) {

                    for (var t2 in tiles) {
                        var target = tiles[t2];

                        if (this.canMatch(origin, target)) {
                            origin.lock();
                            target.lock();
                            matches.push([origin, target]);
                            break;
                        }
                    }
                }
            }

            // do all matches
            for (var m in matches)
                this.matchJelly(matches[m][0], matches[m][1]);

            //cast effects
            this.fastEffect.alpha = 1;
            this.fastEffect.visible = true;
            createjs.Tween.removeTweens(this.fastEffect);
            createjs.Tween.get(this.fastEffect).to({ alpha: 0 }, 500).call(() => {
                this.fastEffect.visible = false
            });

            return true;
        }

        // match two jellys with animation
        private matchJelly(origin: Tile, target: Tile) {
            this.board.fadeTileToPos(origin, target.x, target.y, 400, 200 * Math.random(), 1);
            setTimeout(() => {
                target.unlock();
                origin.unlock();
                this.match(origin, target);
            }, 300);
        }

        // update footer
        private updateFooter() {
            var items = ItemsData.items;
            for (var i in items)
                this.gameFooter.setItemAmmount(items[i], JoinJelly.itemData.getItemAmmount(items[i]));
        }

        // #endregion

    }

    enum GameState {
        starting,
        playing,
        paused,
        ended
    }
}