window.onblur = function () {
    if(joinjelly.JoinJelly && joinjelly.JoinJelly.gameScreen){
        var cs = joinjelly.JoinJelly.gameScreen.currentScreen;
        if (cs instanceof joinjelly.gameplay.GamePlayScreen)
            (cs).pauseGame();
    }


}