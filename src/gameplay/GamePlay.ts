module joinjelly.gameplay {

    export class GamePlayScreen extends gameui.ScreenState {
        
        // gameplay Control
        protected matchNotify: () => void;
        protected itemNotify: () => void;
        protected gamestate: GameState;
        protected level: number;
        protected time: number;
        private highJelly: number;
        private score: number;
        private matches: number = 0;
        private userData: UserData;

        //interface
        protected board: Board;
        protected gameHeader: view.GameHeader;
        protected gameFooter: view.ItemsFooter;
        private gameLevelIndicator: view.LevelIndicator;
        private finishMenu: view.FinishMenu;
        private pauseMenu: view.PauseMenu;
        private showBoardButton: gameui.Button;
        private countDown: view.CountDown;
        protected gameMessage: view.TutoralMessage;

        // parameters
        private boardSize: number = 5;
        private itemProbability: number = 0.005;

        private timeByLevel: number = 20000;
        private timeoutInterval: number;

        private initialInterval: number = 800;
        private finalInterval: number = 300;
        private easeInterval: number = 0.98;
        
        // effect 
        private freezeEffect: createjs.DisplayObject;
        private evolveEffect: createjs.DisplayObject;
        private reviveEffect: createjs.DisplayObject;
        private cleanEffect: createjs.DisplayObject;

        //#region =================================== initialization ================================================

        constructor(userData: UserData,saveGame?:SaveGame) {
            super();

            this.userData = userData;

            this.score = 0;

            this.createBackground();
            this.createBoard();
            this.createGUI();

            this.createEffects();
                    
            this.start();
            
            // try to load a saved Game
            if (saveGame) this.loadGame();

            //if is first time then give some items.
            if(JoinJelly.userData.getHistory("firstPlay")) {
                JoinJelly.itemData.setItemAmmount(Items.REVIVE,1)
                JoinJelly.itemData.setItemAmmount(Items.TIME, 2)
                JoinJelly.itemData.setItemAmmount(Items.FAST, 2)
                JoinJelly.itemData.setItemAmmount(Items.CLEAN, 2)
                JoinJelly.itemData.setItemAmmount(Items.LUCKY, 0)
            }

            JoinJelly.userData.history("firstPlay")

        
        }

        // create game effects
        private createEffects() {

            this.freezeEffect = gameui.AssetsManager.getBitmap("freezeEffect");
            this.content.addChild(this.freezeEffect);
            this.normalizeEffect(this.freezeEffect);

            this.evolveEffect = gameui.AssetsManager.getBitmap("fxEvolve");
            this.content.addChild(this.evolveEffect);
            this.evolveEffect.regX=150;
            this.normalizeEffect(this.evolveEffect);

            this.reviveEffect = gameui.AssetsManager.getBitmap("reviveEffect");
            this.content.addChild(this.reviveEffect);
            this.normalizeEffect(this.reviveEffect);

            this.cleanEffect = gameui.AssetsManager.getBitmap("cleanEffect");
            this.content.addChild(this.cleanEffect);
            this.normalizeEffect(this.cleanEffect);

        }

        private normalizeEffect(fxObj) {
            fxObj.visible = false;
            fxObj.y = JoinJelly.gameScreen.headerPosition;
            fxObj.scaleX = 2;
            fxObj.scaleY = 2 * JoinJelly.gameScreen.currentHeight / defaultHeight;
            fxObj.mouseEnabled = false;
        }

        // create game background
        private createBackground() {
            var bg = gameui.AssetsManager.getBitmap("Background");
            this.background.addChild(bg);
        }

        // create a new board
        private createBoard() {
            this.board = new Board(this.boardSize, this.boardSize, 1536 / 5, true);
            this.board.addEventListener("dragging", (e: createjs.MouseEvent) => {

                this.dragged(e["originTile"], e["targetTile"]);
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
            var items = [Items.TIME, Items.CLEAN, Items.FAST];
            this.gameFooter = new view.ItemsFooter(items)
            this.gameFooter.lockItem(Items.REVIVE);
            this.footer.addChild(this.gameFooter);
            this.updateFooter();

            this.gameFooter.addEventListener("useitem", (e: createjs.Event) => { this.useItem(e.item) });
    
            // creates pause menu
            this.pauseMenu = new view.PauseMenu();
            this.overlay.addChild(this.pauseMenu);

            // creates a end menu
            this.finishMenu = new view.FinishMenu();
            this.overlay.addChild(this.finishMenu);
            this.finishMenu.y = -200;

            // create game message
            this.gameMessage = new view.TutoralMessage();
            this.content.addChild(this.gameMessage);

            // countdown
            this.countDown = new view.CountDown();
            this.content.addChild(this.countDown);
            this.countDown.x = defaultWidth / 2;
            this.countDown.y = defaultHeight / 2;

            // creates a toggle button
            var tbt = new gameui.ImageButton("BtBoard", () => {
                this.finishMenu.show();
                tbt.fadeOut();

                gameui.AudiosManager.playSound("Interface Sound-06");
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
                
            });

            this.gameHeader.addEventListener("pause", () => {
                this.pauseGame();
            });

            this.pauseMenu.addEventListener("play", () => {
                this.continueGame();
            });

            this.pauseMenu.addEventListener("test", () => {
                this.selfPeformanceTest(false);
            });

            this.pauseMenu.addEventListener("testFast", () => {
                this.selfPeformanceTest(true);
            });
            
            this.pauseMenu.addEventListener("home", () => {
                this.pauseMenu.hide();
                setTimeout(() => { joinjelly.JoinJelly.showMainMenu(); }, 200);
                this.userData.deleteSaveGame();
            });

            this.pauseMenu.addEventListener("restart", () => {
                this.pauseMenu.hide();
                this.userData.deleteSaveGame();
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
            }, 500);

            this.updateFooter();
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
            if (emptySpaces < 0.15 && emptySpaces > 0)
                var alarm = true;

            // updates the header
            this.gameHeader.updateStatus(this.score, this.level, percent, emptySpaces, alarm);

            // updates board shaking.
            this.board.setAlarm(alarm);

        }

        // level up
        protected levelUpInterfaceEffect(level: number) {
            this.gameLevelIndicator.showLevel(level);
            gameui.AudiosManager.playSound("levelUp");
            this.board.levelUpEffect();
        }

        // #endregion

        // #region =================================== gamelay =======================================================

        // starts the game
        protected start() {

            //this.selfPeformanceTest()

            this.level = 1;
            this.matches = 0;
            this.time = Date.now();
            this.highJelly = 0;

            // board initialization
            this.board.cleanBoard();
            this.board.unlock();

            // update interfaces
            this.updateInterfaceInfos();

            // play music
            gameui.AudiosManager.playMusic("music1");

            // initialize gameloop
            this.gamestate = GameState.playing;
            this.step(500);

            // log game start event
            JoinJelly.analytics.logGameStart();

        }

        // time step for adding tiles.
        protected step(timeout: number) {
            clearTimeout(this.timeoutInterval);

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
        public pauseGame() {
            if (this.gamestate == GameState.ended) return;
            this.pauseMenu.show();
            this.gamestate = GameState.paused;
            this.board.lock();
            this.gameHeader.mouseEnabled = false;
            this.content.mouseEnabled = false;
        }

        // unpause game
        private continueGame() {
            //hide menus
            this.pauseMenu.hide();

            //wait 3 seconds to unpause
            setTimeout(() => {
                this.gamestate = GameState.playing;
                this.board.unlock();
                this.gameHeader.mouseEnabled = true;
                this.content.mouseEnabled = true;

            }, 3000);

            //show a 3 seconds countdown to resume game
            this.countDown.countDown(3);

        }

        // winTheGame
        private winGame() {
            this.endGame(StringResources.menus.gameOver, true)
            this.gameFooter.visible = false;

            // TODO something greater and memorable
        }

        // finishes the game
        private endGame(message?: string,win?:boolean) {

            this.view.setChildIndex(this.footer,this.view.getNumChildren()-1);

            this.userData.deleteSaveGame();
            this.gamestate = GameState.standBy;

            var score = this.score;
            var highScore = JoinJelly.userData.getHighScore();
            var highJelly = this.board.getHighestTileValue();

            // disable mouse interaction
            this.pauseMenu.hide();
            this.board.lock();
            this.board.setAlarm(false);

            // releases all jellys
            this.board.releaseAll();

            // remove other ui items
            this.gameHeader.mouseEnabled = false;
            this.gameFooter.mouseEnabled = false;
            createjs.Tween.get(this.gameHeader).to({ y: -425 }, 200, createjs.Ease.quadIn);
            createjs.Tween.get(this.gameFooter).to({ y: +300 }, 200, createjs.Ease.quadIn);

            // shows finished game menu
            setTimeout(() => {
                if(win)
                    this.gamestate = GameState.win;
                else
                this.gamestate = GameState.ended;

                this.finishMenu.show();
                this.gameFooter.mouseEnabled = true;

                // set footer items form revive
                this.gameFooter.setItems([Items.REVIVE]);
                this.gameFooter.unlockItem(Items.REVIVE);
                this.gameFooter.highlight(Items.REVIVE); 

                this.updateFooter();
                createjs.Tween.get(this.gameFooter).to({ y: 0 }, 200, createjs.Ease.quadIn);

                // save high score
                if (score > JoinJelly.userData.getHighScore()) {

                    if (JoinJelly.userData.getPlayerName() == "")
                        JoinJelly.userData.promptPlayerName(() => {
                            AzureLeaderBoards.setScore(score, JoinJelly.userData.getPlayerName());
                            JoinJelly.userData.setScore(score);
                        });
                    else {
                        AzureLeaderBoards.setScore(score, JoinJelly.userData.getPlayerName());
                        JoinJelly.userData.setScore(score);
                    }
                }

            }, 1200);
            this.finishMenu.setValues(score, highScore, highJelly, message);

            // log event
            if (win)
                JoinJelly.analytics.logWinGame(this.level, highJelly, this.matches, Date.now() - this.time);
            else
                JoinJelly.analytics.logEndGame(this.level, highJelly, this.matches, Date.now() - this.time);

            // play end soud
            gameui.AudiosManager.playSound("end");

            

            // play end game effect
            this.board.endGameEffect();
        }

        // update current level
        private updateCurrentLevel() {
            var newLevel = this.getLevelByMoves(this.matches);
            if (newLevel > this.level) {
                this.level = newLevel;
                this.levelUpInterfaceEffect(newLevel);
                this.updateInterfaceInfos();  
                this.levelUpBonus();
            }
            this.level = newLevel;
        }

        // give bonus when level up
        protected levelUpBonus() {
            this.useEvolve();
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

            // select a random value to add.
            for(var i = 10; i < this.level; i +=10)
                if (Math.random() > 0.9) value *= 2;
            

            // if there is no more empty tiles, ends the game
            if (empty.length > 0) {
                var i = Math.floor(Math.random() * empty.length);
                var tile = empty[i];
                tile.setNumber(value);
                this.saveGame();
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

        // verify if can move
        protected canMove(): boolean {
            var tiles = this.board.getAllTiles();
            var tilesCount = this.board.getEmptyTiles().length;
            var numberCount = {}
            
            for (var t in tiles) {
                var n = tiles[t].getNumber();
                if (n>0 && !numberCount[n]) numberCount[n] = 0;
                numberCount[n]++;
            }

            for(var c in numberCount)
                if (numberCount[c] > 1) return true;

            return false;

        }

        // verifies if a tile can pair another, and make it happens
        protected match(origin: Tile, target: Tile): boolean {

            //calculate new value
            var newValue = target.getNumber() + origin.getNumber();

            //check if match is correct
            if (!this.canMatch(origin, target)) return false;

            this.matches++;
            
            //animate the mach
            this.board.match(origin, target);

            // increase score
            var sum = newValue * 10 + Math.floor(Math.random() * newValue*10);
            this.score += sum;
            this.animateScoreFromTile(target, sum); // animate a score number
            
            //reset the previous tile
            origin.setNumber(0);

            // chance to win a item
            var item = this.giveItemChance([Items.CLEAN, Items.REVIVE, Items.TIME, Items.FAST]);
            if (item) this.animateItemFromTile(target, item);
     
            // update score
            this.userData.setLastJelly(newValue);
            this.updateInterfaceInfos();

            // log HighJelly Event
            if(this.highJelly < newValue)
                joinjelly.JoinJelly.analytics.logNewJelly(newValue, this.level, Date.now() - this.time)

            this.highJelly = newValue;

            // notify match
            if (this.matchNotify) this.matchNotify()
            
            // verify winGame
            if (newValue > JoinJelly.maxJelly)
                this.winGame();
            else
                target.setNumber(newValue);
                
            // update currentLevel
            this.updateCurrentLevel()

            this.saveGame();

            // verifies if it can move, make it a little more faster
            if (!this.canMove()) this.step(0);
            
            return true;
        }

        //give item to user
        protected giveItemChance(items: Array<string>): string {

            var item = null;
            var lucky = JoinJelly.itemData.getItemAmmount(Items.LUCKY) ? 2 : 1;

            // calculate random change to win a item
            var goodChance: boolean = (Math.random() < this.itemProbability*lucky);
            
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
            // play sound
            gameui.AudiosManager.playSound("Interface Sound-11");

            // create item Object
            var itemDO = gameui.AssetsManager.getBitmap("item" + item);
            itemDO.mouseEnabled = false;
            itemDO.regX = itemDO.getBounds().width / 2;
            itemDO.regY = itemDO.getBounds().height / 2;
            itemDO.scaleY = itemDO.scaleX = 0.5;

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
            itemDO.alpha = 0;
            createjs.Tween.get(itemDO).to({ x: xi, y: yi, alpha: 0 }).to({ y: tile.y - 70, alpha: 1}, 400, createjs.Ease.quadInOut).to({x:xf,y:yf}, 1000, createjs.Ease.quadInOut).call(() => { 
                this.content.removeChild(itemDO);
                this.updateFooter();
            });
            
            this.content.addChild(itemDO);
            
        }

        // animate a score in the board
        private animateScoreFromTile(tile: Tile, score: number) {

            // create text Object
            var textDO = gameui.AssetsManager.getBitmapText(score.toString(), "debussy");
            textDO.regX = textDO.getBounds().width / 2;
            textDO.mouseEnabled = false;
           

            var xi = this.board.localToLocal(tile.x, tile.y, this.content).x;
            var yi = this.board.localToLocal(tile.x, tile.y, this.content).y;
            textDO.alpha = 0;
            createjs.Tween.get(textDO).to({ x: xi, y: yi, alpha: 0 }).to({ y: yi-170, alpha: 1 }, 400, createjs.Ease.quadOut).to({alpha:0},400).call(() => {
                this.content.removeChild(textDO);
                delete textDO;
            });
            
            this.content.addChild(textDO);
        }



        // #endregion

        // #region =================================== Items =========================================================

        protected useItem(item: string) {
            if (JoinJelly.itemData.getItemAmmount(item) > 0) {

                var sucess: boolean = false;

                switch (item) {
                    case Items.TIME:
                        sucess = this.useTime();
                        break;
                    case Items.FAST:
                        sucess = this.useFast();
                        break;
                    case Items.CLEAN:
                        sucess = this.useClean();
                        break;
                    case Items.REVIVE:
                        sucess = this.useRevive();
                        break;
                    case Items.EVOLVE:
                        sucess = this.useEvolve();
                        break;
                }

                if (sucess) {
                    // decrease item quantity
                    JoinJelly.itemData.decreaseItemAmmount(item);
                    //notify utem used
                    if (this.itemNotify) this.itemNotify();

                }
            }
            // if there is no item, them show purchase menu
            else {
                this.pauseGame();
                joinjelly.JoinJelly.showStore(this);
            }


            this.updateFooter();
        }

        // reduces jellys per time during 5 seconds.
        protected useTime() :boolean{
            if (this.gamestate == GameState.ended) return;

            this.step(4000);

            //cast effects
            this.freezeEffect.alpha = 0;
            this.freezeEffect.visible = true;
            createjs.Tween.removeTweens(this.freezeEffect);
            createjs.Tween.get(this.freezeEffect).to({ alpha: 1 }, 1000).to({ alpha: 0 }, 4000).call(() => {
                this.freezeEffect.visible = false
            });

            gameui.AudiosManager.playSound("sounditemtime");

            return true;
        }

        //clan all simple jellys
        protected useClean(): boolean {
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

            gameui.AudiosManager.playSound("sounditemclean");

            return true;
        }

        // revive after game end
        protected useRevive(test=false): boolean {

            if (this.gamestate != GameState.ended) return false;

            // set use it
            UserData.getHistoryRevive();

            //save game
            this.saveGame();

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
            this.gameFooter.setItems([Items.TIME, Items.CLEAN, Items.FAST ]);
            this.gameFooter.unlockAll();
            this.gameFooter.lockItem(Items.REVIVE);

            // remove other ui items
            this.gameHeader.mouseEnabled = true;
            createjs.Tween.get(this.gameHeader).to({ y: -0 }, 200, createjs.Ease.quadIn);

            // if not test, than play effects.
            if (!test) {
                //cast effects
                this.reviveEffect.alpha = 0;
                this.reviveEffect.visible = true;
                createjs.Tween.removeTweens(this.reviveEffect);
                createjs.Tween.get(this.reviveEffect).to({ y: 1200 }).to({ y: 600, alpha: 1 }, 600).to({ y: 0, alpha: 0 }, 600).call(() => {
                    this.reviveEffect.visible = false
                });

                gameui.AudiosManager.playSound("sounditemrevive");
            }

            return true;
        }

        protected useEvolve() {
            // evolve some random tile, except maximun tile
            if (this.gamestate == GameState.ended) return;
            var tiles = this.board.getAllTiles();

            var maxTile: number = 0;

            //get max tile
            for(var t in tiles)
                if (tiles[t].getNumber() > maxTile  )
                    maxTile = tiles[t].getNumber();

            //select elegible tiles to evolve
            var selectedTiles: Array<Tile> = new Array();
            for (var t in tiles)
                if ((tiles[t].getNumber() < maxTile && tiles[t].getNumber() > 2 ) && tiles[t].isUnlocked())
                    selectedTiles.push(tiles[t]);

            if(selectedTiles.length==0)
                for (var t in tiles)
                    if ((tiles[t].getNumber() < maxTile && tiles[t].getNumber() > 1) && tiles[t].isUnlocked())
                        selectedTiles.push(tiles[t]);

            if (selectedTiles.length == 0)
                for (var t in tiles)
                    if (tiles[t].getNumber() > 1 && tiles[t].isUnlocked())
                        selectedTiles.push(tiles[t]);


            if (selectedTiles.length == 0)
                for (var t in tiles)
                    if (tiles[t].getNumber() > 0 && tiles[t].isUnlocked())
                        selectedTiles.push(tiles[t]);

            if (selectedTiles.length == 0)
                return false;

            // select random elegible tile
            var selected = Math.floor(Math.random() * selectedTiles.length);
            var tile = selectedTiles[selected];

            //lock tile and change number
            tile.lock();
            tile.setNumber(tile.getNumber() * 2);

            // cast Effect On Tile
            tile.jelly.playThunder();
            setTimeout(() => {tile.unlock();gameui.AudiosManager.playSound("evolve")}, 1000);

            // cast a thunder effects 
            gameui.AudiosManager.playSound("sounditemfast");

            var pt = tile.jelly.localToLocal(0, 0, this.evolveEffect.parent);
            var po = this.gameHeader.localToLocal(1394, 211, this.evolveEffect.parent);
 
            this.evolveEffect.visible = true;
            this.evolveEffect.set({ alpha: 1, scaleX: 0.5, x: po.x, y: po.y });
            
            var angleDeg = Math.atan2(pt.y - po.y-50, pt.x - po.x) * 180 / Math.PI - 90;
            var scale = Math.sqrt(Math.pow(pt.y - 50 - po.y, 2) + Math.pow(pt.x - po.x, 2)) / 300;
            this.evolveEffect.rotation = angleDeg;
            this.evolveEffect.scaleY = 0;
            
            createjs.Tween.removeTweens(this.evolveEffect);
            createjs.Tween.get(this.evolveEffect).to({ scaleY: scale }, 200) 
            createjs.Tween.get(this.evolveEffect).to({ alpha: 0 }, 1200,createjs.Ease.quadIn).call(() => {
                this.evolveEffect.visible = false
            });
            

            return true;
        }

        // match 5 pair of jelly if avaliabe
        protected useFast(test= false): boolean {
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

      
            return true;
        }

        // match two jellys with animation
        private matchJelly(origin: Tile, target: Tile) {
            target.lock();
            origin.lock();
            this.board.fadeTileToPos(origin, target.x, target.y, 400, 200 * Math.random(), 1);
            setTimeout(() => {
                target.unlock();
                origin.unlock();
                this.match(origin, target);
            }, 300);
        }

        // update footer
        protected updateFooter() {
            var items = ItemsData.items;
            for (var i in items)
                this.gameFooter.setItemAmmount(items[i], JoinJelly.itemData.getItemAmmount(items[i]));
        }

        // #endregion

        // #region =================================== SaveGame =====================================================

        public saveGame() {
            var sg: SaveGame = {
                level: this.level,
                matches: this.matches,
                score: this.score,
                tiles: this.board.getAllTilesValues(),
            }

            this.userData.saveGame(sg);
        }

        public loadGame() {
            var saveGame = this.userData.loadGame();
            if (!saveGame || saveGame == null) return;

            this.board.setTiles(saveGame.tiles);
            this.score = saveGame.score;
            this.matches = saveGame.matches;
            this.level = saveGame.level;

            this.updateCurrentLevel();
            this.updateFooter();
            this.updateInterfaceInfos();

            this.pauseGame();
        }

        // #endregion

        public selfPeformanceTest(fast?: boolean) {

            if (fast) this.initialInterval = 200;
            var interval = setInterval(() => {
                // document.title = (this.initialInterval + " " + this.finalInterval + " " + this.easeInterval + " " + this.getTimeInterval(this.level, this.initialInterval, this.finalInterval, this.easeInterval));
                if (this.gamestate == GameState.paused) return;
                this.useRevive();
                this.useFast(true);

                if (this.gamestate == GameState.win) {
                    clearInterval(interval);
                    JoinJelly.startTest();
                }

                
            }, 250);
        }

    }

    enum GameState {
        starting,
        playing,
        paused,
        ended,
        standBy,
        win
    }
}