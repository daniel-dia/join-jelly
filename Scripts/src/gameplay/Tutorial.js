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
                this.tutorialFinger = new gameplay.view.TutorialMove();
                this.tutorialItemFinger = new gameplay.view.TutorialMove();
                this.tutorialMessage = new gameplay.view.TutoralMessage();
                this.tutorialItemFinger.rotation = -45;
                _super.prototype.createGUI.call(this);
                this.content.addChild(this.tutorialFinger);
                this.footer.addChild(this.tutorialItemFinger);
                this.content.addChild(this.tutorialMessage);
                this.gameFooter.setItemAmmount("revive", 1);
                this.gameFooter.setItemAmmount("fast", 1);
                this.gameFooter.setItemAmmount("clean", 1);
                this.gameFooter.setItemAmmount("time", 1);
                this.gameFooter.lockAll();
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
                        _this.board.getTileById(16).disable();
                    },
                    function () {
                        _this.board.getTileById(18).setNumber(1);
                        _this.showTutorialMessage(StringResources.tutorial.msg2);
                        _this.board.getTileById(18).disable();
                    },
                    function () {
                        _this.board.getTileById(18).enable();
                        _this.showTutorialMove(18, 16);
                        _this.tutorialwaitMatch();
                    },
                    function () {
                        _this.board.getTileById(16).disable();
                        _this.hideTutorialFinger();
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
                        _this.board.getTileById(16).disable();
                        _this.hideTutorialFinger();
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
                        _this.board.getTileById(18).setNumber(1);
                        _this.board.getTileById(20).setNumber(1);
                        _this.board.getTileById(18).disable();
                        _this.showTutorialMessage(StringResources.tutorial.msgDirt);
                    },
                    function () {
                        _this.showTutorialMove(20, 18);
                        _this.tutorialwaitMatch();
                    },
                    function () {
                        _this.hideTutorialFinger();
                        _this.board.getTileById(0).setNumber(2);
                        _this.board.getTileById(1).setNumber(1);
                        _this.board.getTileById(2).setNumber(2);
                        _this.board.getTileById(3).setNumber(1);
                        _this.board.getTileById(4).setNumber(2);
                        _this.board.getTileById(5).setNumber(1);
                        _this.board.getTileById(6).setNumber(1);
                        _this.board.getTileById(7).setNumber(1);
                        _this.board.getTileById(8).setNumber(1);
                        _this.board.getTileById(9).setNumber(1);
                        _this.board.getTileById(10).setNumber(1);
                        _this.board.getTileById(11).setNumber(1);
                        _this.board.getTileById(12).setNumber(1);
                        _this.board.getTileById(13).setNumber(1);
                        _this.board.getTileById(14).setNumber(1);
                        _this.board.getTileById(0).disable();
                        _this.board.getTileById(1).disable();
                        _this.board.getTileById(2).disable();
                        _this.board.getTileById(3).disable();
                        _this.board.getTileById(4).disable();
                        _this.board.getTileById(5).disable();
                        _this.board.getTileById(6).disable();
                        _this.board.getTileById(7).disable();
                        _this.board.getTileById(8).disable();
                        _this.board.getTileById(9).disable();
                        _this.board.getTileById(10).disable();
                        _this.board.getTileById(11).disable();
                        _this.board.getTileById(12).disable();
                        _this.board.getTileById(13).disable();
                        _this.board.getTileById(14).disable();
                        _this.board.getTileById(18).disable();
                        _this.tutorialWait(1000);
                    },
                    function () {
                        _this.showTutorialItem("clean");
                        _this.showTutorialMessage("You can always use items.\n this cleans the board", false);
                        _this.tutorialWaitItem();
                    },
                    function () {
                        _this.tutorialWait(1000);
                    },
                    function () {
                        _this.showTutorialItem("time");
                        _this.showTutorialMessage("this one make time slower", false);
                        _this.tutorialWaitItem();
                    },
                    function () {
                        _this.tutorialWait(1000);
                    },
                    function () {
                        _this.showTutorialItem("fast");
                        _this.showTutorialMessage("this one join some jellies", false);
                        _this.tutorialWaitItem();
                    },
                    function () {
                        _this.tutorialWait(1000);
                    },
                    function () {
                        _this.showTutorialItem("revive");
                        _this.showTutorialMessage("if you loose, use this to revive");
                    },
                    function () {
                        _this.tutorialWait(1000);
                    },
                    function () {
                        _this.hideTutorialFinger();
                        _this.showTutorialMessage(StringResources.tutorial.msgPlay);
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
            Tutorial.prototype.tutorialWaitItem = function () {
                var _this = this;
                this.itemNotify = function () {
                    _this.itemNotify = null;
                    _this.executeTutorialStep();
                };
            };
            Tutorial.prototype.showTutorialMessage = function (text, step) {
                var _this = this;
                if (step === void 0) { step = true; }
                this.tutorialMessage.show(text);
                this.tutorialMessage.removeAllEventListeners("closed");
                if (step)
                    this.tutorialMessage.addEventListener("closed", function () {
                        _this.executeTutorialStep();
                        _this.tutorialMessage.removeAllEventListeners("closed");
                    });
            };
            Tutorial.prototype.showTutorialMove = function (source, target) {
                var sourceTile = this.board.getTileById(source);
                var targetTile = this.board.getTileById(target);
                this.tutorialFinger.showMove(sourceTile.x, sourceTile.y + this.board.y - this.board.regY, targetTile.x, targetTile.y + this.board.y - this.board.regY);
            };
            Tutorial.prototype.showTutorialItem = function (itemId) {
                var source = this.gameFooter.getItemButton(itemId).localToLocal(0, 0, this.footer);
                this.tutorialItemFinger.showClick(source.x, source.y - 100);
                this.gameFooter.lockAll();
                this.gameFooter.unlockItem(itemId);
                this.gameFooter.setItemAmmount(itemId, 1);
            };
            Tutorial.prototype.hideTutorialFinger = function () {
                this.tutorialFinger.hide();
                this.tutorialItemFinger.hide();
            };
            Tutorial.prototype.giveItemChance = function (items) {
                return null;
            };
            Tutorial.prototype.useItem = function (item) {
                var sucess = false;
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
                    joinjelly.JoinJelly.itemData.decreaseItemAmmount(item);
                    //notify utem used
                    if (this.itemNotify)
                        this.itemNotify();
                }
            };
            // #endregion 
            // update footer
            Tutorial.prototype.updateFooter = function () {
            };
            // override savegame
            Tutorial.prototype.saveGame = function () {
            };
            return Tutorial;
        })(gameplay.ExplodeBricks);
        gameplay.Tutorial = Tutorial;
    })(gameplay = joinjelly.gameplay || (joinjelly.gameplay = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=Tutorial.js.map