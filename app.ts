var gameScreen: gameui.GameScreen;
window.onload = () => {

    gameScreen = new gameui.GameScreen("gameCanvas", defaultWidth, defaultHeight);
    gameScreen.stage.enableMouseOver(60);
    gameScreen.stage.mouseMoveOutside = true;

    var userData: UserData = new UserData();

    var loadingScreen = new fpair.Loading();


    loadingScreen.loaded= () => {
        var mainScreen = new fpair.MainScreen(userData);
        gameScreen.switchScreen(mainScreen);
    }

};