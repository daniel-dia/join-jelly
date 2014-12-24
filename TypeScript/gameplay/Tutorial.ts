module joinjelly.gameplay {

    export class Tutorial extends ExplodeBricks {

        // tutoral current step
        private currentTutorialStep = 0;

        //tutorial move
        private tutorialMoveIndicator: view.TutorialMove;

        //turorial message
        private tutorialMessage: view.TutoralMessage;


        // #region tutorial ====================================================================================================

        public start() {

            super.start();

            this.tutorialMoveIndicator = new view.TutorialMove();
            this.tutorialMessage = new view.TutoralMessage();

            this.content.addChild(this.tutorialMoveIndicator);
            this.content.addChild(this.tutorialMessage);

            this.tutorialMessage.addEventListener("closed", () => {
                this.executeTutorialStep();
            });

            this.resetTutorialStep();
            this.executeTutorialStep();

        }

        protected step() {}
        
        private resetTutorialStep() {
            this.currentTutorialStep = -1;
        }

        private executeTutorialStep() {

            this.currentTutorialStep++;

            var steps = [
                () => {
                    this.tutorialWait(1500);
                    this.board.getTileById(16).setNumber(1);
                    this.board.getTileById(16).mouseEnabled = false;
                },
                () => {
                    this.showTutorialMessage("Hello, \nI'm little Jelly");
                },
                () => {
                    this.tutorialWait(700);
                },
                () => {
                    this.board.getTileById(18).setNumber(1);
                    this.showTutorialMessage("Help me to evolve\nJoin another jelly to me");
                    this.board.getTileById(18).mouseEnabled = false;
                },
                () => {
                    this.board.getTileById(18).mouseEnabled = true;
                    this.showTutorialMove(18, 16)
                    this.tutorialwaitMatch();
                },
                () => {
                    this.board.getTileById(16).mouseEnabled = false;
                    this.hideTutorialMove();
                    this.tutorialWait(700);
                },
                () => {
                    this.showTutorialMessage("Great! now I'm bigger, \nevolve me once more");
                },
                () => {
                    this.board.getTileById(24).setNumber(2);
                    this.board.getTileById(16).disable();
                    this.showTutorialMove(24, 16)
                    this.tutorialwaitMatch();
                },
                () => {

                    this.hideTutorialMove();
                    this.tutorialWait(700);
                },
                  () => {
                    this.tutorialWait(500);
                },
                () => {
                    this.board.getTileById(17).setNumber(-1);
                    this.board.getTileById(19).setNumber(-1);
                    this.showTutorialMessage("Ow, a dirty appears");
                },
                () => {
                    this.showTutorialMessage("Join two jelly near to destroy it.");
                    this.board.getTileById(18).setNumber(1);
                    this.board.getTileById(24).setNumber(1);
                    this.board.getTileById(18).disable();
                },
                () => {
                    this.showTutorialMove(24, 18)
                    this.tutorialwaitMatch();
                },
                () => {
                    this.showTutorialMessage("Perfect!\nNow let's play this game.");
                },
            
                () => {
                    this.showTutorialMessage("but be careful, \ndo not let the board fill, \nthis is the end for us.");
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

        private tutorialwaitMatch() {
            this.matchNotify = () => {
                this.matchNotify = null;
                this.executeTutorialStep();
            }
        }

        private showTutorialMessage(text: string) {
            this.tutorialMessage.show(text);
        }

        private showTutorialMove(source: number, target: number) {
            var sourceTile = this.board.getTileById(source);
            var targetTile = this.board.getTileById(target);
            this.tutorialMoveIndicator.show(
                sourceTile.x, sourceTile.y + this.board.y,
                targetTile.x, targetTile.y + this.board.y);
        }

        private hideTutorialMove() {
            this.tutorialMoveIndicator.hide();
        }


        // #endregion 


    }
}