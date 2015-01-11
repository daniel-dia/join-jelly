var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    var gameplay;
    (function (gameplay) {
        var Tutorial = (function (_super) {
            __extends(Tutorial, _super);
            function Tutorial() {
                _super.apply(this, arguments);
                // tutoral current step
                this.currentTutorialStep = 0;
            }
            // #region tutorial ====================================================================================================
            Tutorial.prototype.createGUI = function () {
                var _this = this;
                this.tutorialMoveIndicator = new gameplay.view.TutorialMove();
                this.tutorialMessage = new gameplay.view.TutoralMessage();
                this.content.addChild(this.tutorialMoveIndicator);
                this.content.addChild(this.tutorialMessage);
                this.tutorialMessage.addEventListener("closed", function () {
                    _this.executeTutorialStep();
                });
                _super.prototype.createGUI.call(this);
                this.gameFooter.visible = false;
            };
            Tutorial.prototype.start = function () {
                _super.prototype.start.call(this);
                this.resetTutorialStep();
                this.executeTutorialStep();
            };
            Tutorial.prototype.step = function () {
                //do nothing
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
                        _this.board.getTileById(16).setNumber(1);
                        _this.board.getTileById(16).mouseEnabled = false;
                    },
                    function () {
                        _this.showTutorialMessage(StringResources.tutorial.msg1);
                    },
                    function () {
                        _this.tutorialWait(700);
                    },
                    function () {
                        _this.board.getTileById(18).setNumber(1);
                        _this.showTutorialMessage(StringResources.tutorial.msg2);
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
                        _this.showTutorialMessage(StringResources.tutorial.msg3);
                    },
                    function () {
                        _this.board.getTileById(24).setNumber(2);
                        _this.board.getTileById(16).disable();
                        _this.showTutorialMove(24, 16);
                        _this.tutorialwaitMatch();
                    },
                    function () {
                        _this.hideTutorialMove();
                        _this.tutorialWait(700);
                    },
                    function () {
                        _this.tutorialWait(500);
                    },
                    function () {
                        _this.board.getTileById(17).setNumber(-1);
                        _this.board.getTileById(19).setNumber(-1);
                        _this.board.getTileById(23).setNumber(-1);
                        _this.board.getTileById(22).setNumber(-1);
                        _this.board.getTileById(24).setNumber(-1);
                        _this.board.getTileById(13).setNumber(-1);
                        _this.showTutorialMessage(StringResources.tutorial.msg4);
                    },
                    function () {
                        _this.showTutorialMessage(StringResources.tutorial.msg5);
                        _this.board.getTileById(18).setNumber(1);
                        _this.board.getTileById(20).setNumber(1);
                        _this.board.getTileById(18).disable();
                    },
                    function () {
                        _this.showTutorialMove(20, 18);
                        _this.tutorialwaitMatch();
                    },
                    function () {
                        _this.hideTutorialMove();
                        _this.showTutorialMessage(StringResources.tutorial.msg6);
                    },
                    function () {
                        _this.showTutorialMessage(StringResources.tutorial.msg7);
                    },
                    function () {
                        joinjelly.JoinJelly.startLevel();
                    }
                ];
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
                this.tutorialMoveIndicator.show(sourceTile.x, sourceTile.y + this.board.y - this.board.regY, targetTile.x, targetTile.y + this.board.y - this.board.regY);
            };
            Tutorial.prototype.hideTutorialMove = function () {
                this.tutorialMoveIndicator.hide();
            };
            return Tutorial;
        })(gameplay.ExplodeBricks);
        gameplay.Tutorial = Tutorial;
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=Tutorial.js.map