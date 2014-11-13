var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    (function (gameplay) {
        var Tutorial = (function (_super) {
            __extends(Tutorial, _super);
            function Tutorial() {
                _super.apply(this, arguments);
                // tutoral current step
                this.currentTutorialStep = 0;
            }
            // #region tutorial ====================================================================================================
            Tutorial.prototype.start = function () {
                var _this = this;
                _super.prototype.start.call(this);

                this.tutorialMoveIndicator = new gameplay.view.TutorialMove();
                this.tutorialMessage = new gameplay.view.TutoralMessage();

                this.content.addChild(this.tutorialMoveIndicator);
                this.content.addChild(this.tutorialMessage);

                this.tutorialMessage.addEventListener("closed", function () {
                    _this.executeTutorialStep();
                });

                clearInterval(this.gamePlayLoop);
                this.resetTutorialStep();
                this.executeTutorialStep();
            };

            Tutorial.prototype.resetTutorialStep = function () {
                this.currentTutorialStep = -1;
            };

            Tutorial.prototype.executeTutorialStep = function () {
                var _this = this;
                this.currentTutorialStep++;

                var steps = [
                    function () {
                        _this.tutorialWait(1500);
                        _this.setTileValue(16, 1);
                        _this.board.getTileById(16).mouseEnabled = false;
                    },
                    function () {
                        _this.showTutorialMessage("Hello, I'm little Jelly");
                    },
                    function () {
                        _this.tutorialWait(700);
                    },
                    function () {
                        _this.setTileValue(18, 1);
                        _this.showTutorialMessage("Help me to evolve\nJoin another jelly to me");
                        _this.board.getTileById(18).mouseEnabled = false;
                    },
                    function () {
                        _this.board.getTileById(18).mouseEnabled = true;
                        _this.showTutorialMove(18, 16);
                        _this.tutorialwaitMatch();
                    },
                    function () {
                        _this.board.getTileById(16).mouseEnabled = false;
                        _this.hideTutorialMove();
                        _this.tutorialWait(700);
                    },
                    function () {
                        _this.showTutorialMessage("Great! now I'm bigger, \nevolve me once more");
                    },
                    function () {
                        _this.setTileValue(24, 2);
                        _this.board.getTileById(16).mouseEnabled = false;
                        _this.showTutorialMove(24, 16);
                        _this.tutorialwaitMatch();
                    },
                    function () {
                        _this.hideTutorialMove();
                        _this.tutorialWait(700);
                    },
                    function () {
                        _this.showTutorialMessage("Perfect! Now I'm ...,\nLet's play this game.");
                    },
                    function () {
                        _this.tutorialWait(500);
                    },
                    function () {
                        _this.showTutorialMessage("but be careful, \ndo not let the board fill, \nthis is the end for us.");
                    },
                    function () {
                        joinjelly.JoinJelly.startLevel();
                    }];

                // execute the step
                if (steps[this.currentTutorialStep])
                    steps[this.currentTutorialStep]();
            };

            Tutorial.prototype.tutorialWait = function (delay) {
                var _this = this;
                setTimeout(function () {
                    _this.executeTutorialStep();
                }, delay);
            };

            Tutorial.prototype.tutorialwaitMatch = function () {
                var _this = this;
                this.matchNotify = function () {
                    _this.matchNotify = null;
                    _this.executeTutorialStep();
                };
            };

            Tutorial.prototype.showTutorialMessage = function (text) {
                this.tutorialMessage.show(text);
            };

            Tutorial.prototype.showTutorialMove = function (source, target) {
                var sourceTile = this.board.getTileById(source);
                var targetTile = this.board.getTileById(target);
                this.tutorialMoveIndicator.show(sourceTile.x, sourceTile.y + this.board.y, targetTile.x, targetTile.y + this.board.y);
            };

            Tutorial.prototype.hideTutorialMove = function () {
                this.tutorialMoveIndicator.hide();
            };
            return Tutorial;
        })(gameplay.GamePlayScreen);
        gameplay.Tutorial = Tutorial;
    })(joinjelly.gameplay || (joinjelly.gameplay = {}));
    var gameplay = joinjelly.gameplay;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=Tutorial.js.map
