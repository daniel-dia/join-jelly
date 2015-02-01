﻿module joinjelly.gameplay {

    export class Tutorial extends ExplodeBricks {

        // tutoral current step
        private currentTutorialStep = 0;

        //tutorial move
        private tutorialJellyFinger: view.TutorialMove;
        private tutorialItemFinger: view.TutorialMove;
        private messageNotify: () => void;

        //turorial message
        private tutorialMessage: view.TutoralMessage;


        // #region tutorial ====================================================================================================

        protected createGUI() {


            this.tutorialJellyFinger = new view.TutorialMove();
            this.tutorialItemFinger = new view.TutorialMove();
            this.tutorialMessage = new view.TutoralMessage();
            this.tutorialMessage.addEventListener("closed", () => { if(this.messageNotify)this.messageNotify();});

            this.tutorialItemFinger.rotation = -45;

            super.createGUI();
            
            this.content.addChild(this.tutorialJellyFinger);
            this.footer.addChild(this.tutorialItemFinger);
            this.content.addChild(this.tutorialMessage);


            this.gameFooter.setItemAmmount(Items.REVIVE,1);
            this.gameFooter.setItemAmmount(Items.FAST,  1);
            this.gameFooter.setItemAmmount(Items.CLEAN, 1);
            this.gameFooter.setItemAmmount(Items.TIME,  1);

            this.gameFooter.lockAll();
        }

        public start() {

            super.start();
            this.resetTutorialStep();
            this.executeTutorialStep();

        }

        protected step() {
            //do nothing
        }

        private resetTutorialStep() {
            this.currentTutorialStep = -1;
        }

        private executeTutorialStep() {

            this.currentTutorialStep++;

            var steps = [

                () => {
                    this.tutorialWait(1500);
                    this.board.getTileById(16).setNumber(1);
                    this.board.getTileById(16).disable();
                },

                () => {
                    this.board.getTileById(18).setNumber(1);
                    this.showTutorialMessage(StringResources.tutorial.msgheplme);
                    this.board.getTileById(18).disable();
                    this.waitMessage();
                },
                () => {
                    this.board.getTileById(18).enable();
                    this.showTutorialMove(18, 16)
                    this.waitMatch();
                },
                () => {
                    this.board.getTileById(16).disable();
                    this.hideTutorialFinger();
                    this.tutorialWait(700);
                },
                () => {
                    this.showTutorialMessage(StringResources.tutorial.msgOnceMore);
                    this.waitMessage();
                },
                () => {
                    this.board.getTileById(24).setNumber(2);
                    this.board.getTileById(16).disable();
                    this.showTutorialMove(24, 16)
                    this.waitMatch();
                },
                () => {
                    this.board.getTileById(16).disable();
                    this.hideTutorialFinger();
                    this.tutorialWait(700);
                },
                () => {
                    this.tutorialWait(500);
                },
                () => {
                    this.board.getTileById(17).setNumber(-1);
                    this.board.getTileById(19).setNumber(-1);
                    this.board.getTileById(23).setNumber(-1);
                    this.board.getTileById(22).setNumber(-1);
                    this.board.getTileById(24).setNumber(-1);
                    this.board.getTileById(13).setNumber(-1);
                    this.board.getTileById(18).setNumber(1);
                    this.board.getTileById(20).setNumber(1);
                    this.board.getTileById(18).disable();
                    this.showTutorialMessage(StringResources.tutorial.msgDirt);
                    this.waitMessage();
                },

                () => {

                    this.showTutorialMove(20, 18)
                    this.waitMatch();
                },

                () => {
                    this.tutorialWait(1000);

                },
                () => {

                    this.hideTutorialFinger();

                    this.board.getTileById(0).setNumber(2);
                    this.board.getTileById(1).setNumber(1);
                    this.board.getTileById(2).setNumber(2);
                    this.board.getTileById(3).setNumber(1);
                    this.board.getTileById(4).setNumber(2);  
                    this.board.getTileById(5).setNumber(1);
                    this.board.getTileById(6).setNumber(1);
                    this.board.getTileById(7).setNumber(1);
                    this.board.getTileById(8).setNumber(1);
                    this.board.getTileById(9).setNumber(1);  
                    this.board.getTileById(10).setNumber(1);
                    this.board.getTileById(11).setNumber(1);
                    this.board.getTileById(12).setNumber(1);
                    this.board.getTileById(13).setNumber(1);
                    this.board.getTileById(14).setNumber(1);  

                    this.board.getTileById(0). disable();
                    this.board.getTileById(1). disable();
                    this.board.getTileById(2). disable();
                    this.board.getTileById(3). disable();
                    this.board.getTileById(4). disable();
                    this.board.getTileById(5). disable();
                    this.board.getTileById(6). disable();
                    this.board.getTileById(7). disable();
                    this.board.getTileById(8). disable();
                    this.board.getTileById(9). disable();
                    this.board.getTileById(10).disable();
                    this.board.getTileById(11).disable();
                    this.board.getTileById(12).disable();
                    this.board.getTileById(13).disable();
                    this.board.getTileById(14).disable(); 


                    this.board.getTileById(18).disable();
                    this.tutorialWait(1000);
  
                },
                () => {
                    this.showTutorialItem(Items.CLEAN);
                    this.gameFooter.highlight(Items.CLEAN);
                    this.showTutorialMessage(StringResources.tutorial.msgItemClean);
                    this.waitItem();
                },
                () => {
                    this.hideTutorialFinger();
                    this.gameFooter.setItemAmmount(Items.CLEAN,0)
                    this.tutorialWait(1000);
                },
                () => {
                    this.showTutorialItem(Items.TIME);
                    this.gameFooter.highlight(Items.TIME);
                    this.showTutorialMessage(StringResources.tutorial.msgItemTime);

                    this.waitItem();
                },
                () => {
                    this.hideTutorialFinger();
                    this.gameFooter.setItemAmmount(Items.TIME, 0)
                    this.tutorialWait(1000);
                },
                () => {
                    this.showTutorialItem(Items.FAST);
                    this.gameFooter.highlight(Items.FAST);
                    this.showTutorialMessage(StringResources.tutorial.msgItemFast);

                    this.waitItem();
                },
                () => {
                    this.hideTutorialFinger();
                    this.gameFooter.setItemAmmount(Items.FAST, 0)
                    this.tutorialWait(1000);
                },
                () => { 
                    this.gameFooter.highlight(Items.REVIVE);
                    this.showTutorialMessage(StringResources.tutorial.msgItemRevive);
                    this.waitMessage();
                },
                () => {
                    this.hideTutorialFinger();
                    this.tutorialWait(500);
                },
                () => {
                    this.hideTutorialFinger();
                    this.showTutorialMessage(StringResources.tutorial.msgPlay);
                    this.waitMessage();
                },
                () => {
                    this.showTutorialMessage(StringResources.tutorial.msgBoardFill);
                    this.waitMessage();
                },
                () => {

                    JoinJelly.startLevel();
                }]

            // execute the step
            if (steps[this.currentTutorialStep])
                steps[this.currentTutorialStep]();
        }

        private tutorialWait(delay: number) {
            setTimeout(() => {
                this.executeTutorialStep();
            }, delay);
        }

        private waitMatch() {
            this.matchNotify = () => {
                this.matchNotify = null;
                this.executeTutorialStep();
            }
        }

        private waitItem() {
            this.itemNotify = () => {
                this.itemNotify = null;
                this.executeTutorialStep();
            }
        }

        private waitMessage() { 
            this.messageNotify = () => {
                this.messageNotify= null;
                this.executeTutorialStep();
            } 
        }

        private showTutorialMessage(text: string) {
            this.tutorialMessage.show(text);
        }

        private showTutorialMove(source: number, target: number) {
            var sourceTile = this.board.getTileById(source);
            var targetTile = this.board.getTileById(target);
            this.tutorialJellyFinger.showMove(
                sourceTile.x, sourceTile.y + this.board.y - this.board.regY,
                targetTile.x, targetTile.y + this.board.y - this.board.regY);
        }

        private showTutorialItem(itemId: string) {
            var source = this.gameFooter.getItemButton(itemId).localToLocal(0, 0, this.footer);
            this.tutorialItemFinger.showClick(source.x, source.y - 100);
            this.gameFooter.lockAll();
            this.gameFooter.unlockItem(itemId);
            this.gameFooter.setItemAmmount(itemId, 1);
        }

        private hideTutorialFinger() {
            this.tutorialJellyFinger.hide();
            this.tutorialItemFinger.hide();
        }

        protected giveItemChance(items: Array<string>): string { return null }

        protected useItem(item: string) {

            var sucess: boolean = false;

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
                // decrease item quantity
                JoinJelly.itemData.decreaseItemAmmount(item);
                //notify utem used
                if (this.itemNotify) this.itemNotify();

            }
        }

        // #endregion 
        
        // update footer
        protected updateFooter() {}
        // override savegame
        public saveGame() {}
    }
}