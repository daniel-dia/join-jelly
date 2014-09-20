var gameScreen;
window.onload = function () {
    gameScreen = new gameui.GameScreen("gameCanvas", defaultWidth, defaultHeight);
    gameScreen.stage.enableMouseOver(60);
    gameScreen.stage.mouseMoveOutside = true;

    var userData = new UserData();

    var loadingScreen = new fpair.Loading();

    loadingScreen.loaded = function () {
        var mainScreen = new fpair.MainScreen(userData);
        gameScreen.switchScreen(mainScreen);
    };
};
//# sourceMappingURL=app.js.map
