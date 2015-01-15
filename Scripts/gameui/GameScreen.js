//TODO remove universal variable defaultWidth and DefaultHeigth
var gameui;
(function (gameui) {
    var GameScreen = (function () {
        //-----------------------------------------------------------------------
        function GameScreen(canvasElement, gameWidth, gameHeight, fps, showFps) {
            var _this = this;
            if (fps === void 0) { fps = 60; }
            this.defaultWidth = gameWidth;
            this.defaultHeight = gameHeight;
            //Initializes canvas Context            
            this.myCanvas = document.getElementById(canvasElement);
            this.stage = new createjs.Stage(canvasElement);
            createjs.Touch.enable(this.stage);
            createjs.Ticker.addEventListener("tick", function () {
                _this.stage.update();
            });
            createjs.Ticker.setFPS(fps);
            this.stage.enableMouseOver(0);
            this.screenContainer = new createjs.Container();
            this.stage.addChild(this.screenContainer);
            //Framerate meter
            if (showFps) {
                var fpsMeter = new createjs.Text("FPS", " 18px Arial ", "#000");
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
            //save oldscreen
            var oldScreen = this.currentScreen;
            //applies a default trainsition
            if (!transition)
                transition = new gameui.Transition();
            var x = 0;
            var y = 0;
            var alpha = 1;
            //if transition
            if (transition && oldScreen) {
                switch (transition.type) {
                    case "fade":
                        alpha = 0;
                        break;
                    case "top":
                        y = this.currentHeight;
                        break;
                    case "bottom":
                        y = -this.currentHeight;
                        break;
                    case "left":
                        x = -this.currentWidth;
                        break;
                    case "right":
                        x = this.currentWidth;
                        break;
                    case "none":
                        transition.time = 0;
                        break;
                }
                //and transition = fade
                if (transition.type && transition.type != "none") {
                    newScreen.view.mouseEnabled = false;
                    oldScreen.view.mouseEnabled = false;
                    //fade between transitions
                    newScreen.view.set({ alpha: alpha, x: -x, y: -y });
                    oldScreen.view.set({ 1: alpha, x: 0, y: 0 });
                    //fade old screen out
                    createjs.Tween.get(oldScreen.view).to({ alpha: alpha, x: x, y: y }, transition.time, createjs.Ease.quadInOut);
                    createjs.Tween.get(newScreen.view).to({ alpha: 1, x: 0, y: 0 }, transition.time, createjs.Ease.quadInOut).call(function () {
                        oldScreen.view.set({ 1: alpha, x: 0, y: 0 });
                        newScreen.view.set({ 1: alpha, x: 0, y: 0 });
                        newScreen.view.mouseEnabled = true;
                        oldScreen.view.mouseEnabled = true;
                        _this.removeOldScreen(oldScreen);
                        oldScreen = null;
                    });
                }
                else {
                    this.removeOldScreen(oldScreen);
                    oldScreen = null;
                }
            }
            else {
                this.removeOldScreen(oldScreen);
                oldScreen = null;
            }
            //adds the new screen on viewer
            newScreen.activate(parameters);
            this.screenContainer.addChild(newScreen.view);
            this.currentScreen = newScreen;
            //updates current screen
            if (this.currentScreen)
                this.currentScreen.redim(this.headerPosition, this.footerPosition, this.currentWidth, this.currentHeight);
        };
        //resize GameScreen to a diferent scale
        GameScreen.prototype.resizeGameScreen = function (deviceWidth, deviceHeight, updateCSS) {
            if (updateCSS === void 0) { updateCSS = true; }
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
        };
        //updates screen viewer scale
        GameScreen.prototype.updateViewerScale = function (realWidth, realHeight, defaultWidth, defaultHeight) {
            var scale = realWidth / defaultWidth;
            this.currentHeight = realHeight / scale;
            this.currentWidth = realWidth / scale;
            this.defaultWidth = defaultWidth;
            //set header and footer positions
            this.headerPosition = -(this.currentHeight - defaultHeight) / 2;
            this.footerPosition = defaultHeight + (this.currentHeight - defaultHeight) / 2;
            //set the viewer offset to centralize in window
            this.screenContainer.scaleX = this.screenContainer.scaleY = scale;
            this.screenContainer.y = this.viewerOffset = (this.currentHeight - defaultHeight) / 2 * scale;
            //updates current screen
            if (this.currentScreen)
                this.currentScreen.redim(this.headerPosition, this.footerPosition, this.currentWidth, this.currentHeight);
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