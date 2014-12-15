var gameui;
(function (gameui) {
    var GameScreen = (function () {
        //-----------------------------------------------------------------------
        function GameScreen(canvasElement, gameWidth, gameHeight, fps, showFps) {
            if (typeof fps === "undefined") { fps = 60; }
            var _this = this;
            this.defaultWidth = gameWidth;
            this.defaultHeight = gameHeight;

            //Initializes canvas Context
            this.myCanvas = document.getElementById(canvasElement);
            var ctx = this.myCanvas.getContext("2d");
            this.stage = new createjs.Stage(this.myCanvas);
            createjs.Touch.enable(this.stage);
            createjs.Ticker.addEventListener("tick", function () {
                _this.stage.update();
            });
            createjs.Ticker.setFPS(fps);

            this.screenContainer = new createjs.Container();
            this.stage.addChild(this.screenContainer);

            //Framerate meter
            if (showFps) {
                var fpsMeter = new createjs.Text("FPS", " 18px Arial ", "#fff");
                fpsMeter.x = 0;
                fpsMeter.y = 0;
                this.stage.addChild(fpsMeter);
                createjs.Ticker.addEventListener("tick", function () {
                    fpsMeter.text = Math.floor(createjs.Ticker.getMeasuredFPS()) + " FPS";
                });
            }

            //var windowWidth = window.innerWidth;
            this.resizeGameScreen(window.innerWidth, window.innerHeight);
            window.onresize = function () {
                _this.resizeGameScreen(window.innerWidth, window.innerHeight);
            };
        }
        //switch current screen, optionaly with a pre defined transition
        GameScreen.prototype.switchScreen = function (newScreen, parameters, transition) {
            var _this = this;
            //applies a default trainsition
            //TODO to it better
            if (!transition)
                transition = new gameui.Transition();

            //save oldscreen
            var oldScreen = this.currentScreen;

            //if transition
            if (transition && oldScreen) {
                //and transition = fade
                if (transition.type == "fade") {
                    //fade between transitions
                    newScreen.view.alpha = 0;
                    newScreen.view.mouseEnabled = false;
                    oldScreen.view.mouseEnabled = false;
                    createjs.Tween.get(newScreen.view).to({ alpha: 1 }, transition.time).call(function () {
                        newScreen.view.mouseEnabled = true;
                        oldScreen.view.mouseEnabled = true;
                        _this.removeOldScreen(oldScreen);
                        oldScreen = null;
                    });

                    //fade old screen out
                    createjs.Tween.get(oldScreen.view).to({ alpha: 0 }, transition.time);
                } else {
                    this.removeOldScreen(oldScreen);
                    oldScreen = null;
                }
            } else {
                this.removeOldScreen(oldScreen);
                oldScreen = null;
            }

            //adds the new screen on viewer
            newScreen.activate(parameters);
            this.screenContainer.addChild(newScreen.view);

            this.currentScreen = newScreen;

            //updates current screen
            if (this.currentScreen)
                this.currentScreen.redim(this.headerPosition, this.footerPosition, this.defaultWidth);
        };

        //resize GameScreen to a diferent scale
        GameScreen.prototype.resizeGameScreen = function (deviceWidth, deviceHeight, updateCSS) {
            if (typeof updateCSS === "undefined") { updateCSS = true; }
            //keep aspect ratio
            if (this.defaultHeight) {
                var aspect = this.defaultWidth / this.defaultHeight;
                var aspectReal = deviceWidth / deviceHeight;

                if (aspectReal > aspect) {
                    var s = deviceHeight / this.defaultHeight;
                    deviceWidth = this.defaultWidth * s;
                }
            }

            this.myCanvas.width = deviceWidth;
            this.myCanvas.height = deviceHeight;

            this.updateViewerScale(deviceWidth, deviceHeight, this.defaultWidth, this.defaultHeight);
            //if (updateCSS) setMobileScale(deviceWidth)
        };

        //updates screen viewer scale
        GameScreen.prototype.updateViewerScale = function (realWidth, realHeight, defaultWidth, defaultHeight) {
            var scale = realWidth / defaultWidth;
            var currentHeight = realHeight / scale;
            var currentWidth = realWidth / scale;
            this.defaultWidth = defaultWidth;

            //set header and footer positions
            this.headerPosition = -(currentHeight - defaultHeight) / 2;
            this.footerPosition = defaultHeight + (currentHeight - defaultHeight) / 2;

            //set the viewer offset to centralize in window
            this.screenContainer.scaleX = this.screenContainer.scaleY = scale;
            this.screenContainer.y = this.viewerOffset = (currentHeight - defaultHeight) / 2 * scale;

            //updates current screen
            if (this.currentScreen)
                this.currentScreen.redim(this.headerPosition, this.footerPosition, this.defaultWidth);
        };

        //deletes old screen
        GameScreen.prototype.removeOldScreen = function (oldScreen) {
            if (oldScreen != null) {
                oldScreen.desactivate();
                this.screenContainer.removeChild(oldScreen.view);
                oldScreen = null;
            }
        };
        return GameScreen;
    })();
    gameui.GameScreen = GameScreen;
})(gameui || (gameui = {}));
//# sourceMappingURL=GameScreen.js.map
