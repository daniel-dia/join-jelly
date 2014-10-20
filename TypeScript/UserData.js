var UserData = (function () {
    function UserData() {
    }
    // #region score
    UserData.prototype.setScore = function (score) {
        var highscore = this.getHighScore();
        if (score > highscore)
            UserData.saveValue("HighScore", score);
    };

    UserData.prototype.getHighScore = function () {
        var value = UserData.loadValue("HighScore");
        if (value)
            return value;
        return 0;
    };

    UserData.prototype.setLastJelly = function (value) {
        var highValue = this.getLastJelly();
        if (value > highValue)
            UserData.saveValue("LastJelly", value);
    };

    UserData.prototype.getLastJelly = function () {
        var value = UserData.loadValue("LastJelly");
        if (value)
            return value;
        return 0;
    };

    //#endregion
    //#region options
    UserData.prototype.getMusicVol = function () {
        return UserData.loadValue("music", true);
    };

    UserData.prototype.setMusicVol = function (volume) {
        UserData.saveValue("music", volume);
    };

    UserData.prototype.getSoundVol = function () {
        return UserData.loadValue("sound", true);
    };

    UserData.prototype.setSoundVol = function (volume) {
        UserData.saveValue("sound", volume);
    };

    UserData.saveValue = function (key, value) {
        var serialized = JSON.stringify(value);
        localStorage.setItem(UserData.prefix + key, serialized);
    };

    UserData.loadValue = function (key, defaultVaule) {
        var value = localStorage.getItem(UserData.prefix + key);
        if (!value)
            return defaultVaule;
        return JSON.parse(value);
    };
    UserData.prefix = "FastPair_";
    return UserData;
})();
//# sourceMappingURL=UserData.js.map
