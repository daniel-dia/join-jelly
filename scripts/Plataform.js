window.onblur = function () {
    var cs = joinjelly.JoinJelly.gameScreen.currentScreen;
    if (cs instanceof joinjelly.gameplay.GamePlayScreen)
        (cs).pauseGame();


}