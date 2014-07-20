var gameScreen: gameui.GameScreen;
window.onload = () => {

    gameScreen = new gameui.GameScreen("gameCanvas", 768*2, 1024*2);
    gameScreen.stage.enableMouseOver(60);
    gameScreen.stage.mouseMoveOutside = true;

    var userData: UserData = new UserData();
    var mainScreen = new MainScreen (userData);

    gameScreen.switchScreen(mainScreen);

};