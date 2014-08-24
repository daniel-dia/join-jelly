var gameScreen;
window.onload = function () {
    gameScreen = new gameui.GameScreen("gameCanvas", 768 * 2, 1024 * 2);
    gameScreen.stage.enableMouseOver(60);
    gameScreen.stage.mouseMoveOutside = true;

    var userData = new UserData();
    var mainScreen = new fpair.MainScreen(userData);

    gameScreen.switchScreen(mainScreen);
};
//# sourceMappingURL=app.js.map
