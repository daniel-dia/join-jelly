var UserData = (function () {
    function UserData() {
        gameui.AssetsManager.setSoundVeolume(this.getSoundVol());
        gameui.AssetsManager.setMusicVolume(this.getMusicVol());
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
        return UserData.loadValue("music", 1);
    };
    UserData.prototype.setMusicVol = function (volume) {
        UserData.saveValue("music", volume);
    };
    UserData.prototype.getSoundVol = function () {
        return UserData.loadValue("sound", 1);
    };
    UserData.prototype.setSoundVol = function (volume) {
        UserData.saveValue("sound", volume);
    };
    //#endregion
    // #region items
    UserData.saveItems = function (items) {
        return this.saveValue("items", items);
    };
    UserData.loadItems = function () {
        return this.loadValue("items", {});
    };
    // #endregion
    //#region gamestate
    UserData.prototype.saveGame = function (savegame) {
        UserData.saveValue("savegame", savegame);
    };
    UserData.prototype.loadGame = function () {
        return UserData.loadValue("savegame", undefined);
    };
    UserData.prototype.deleteSaveGame = function () {
        UserData.saveValue("savegame", null);
    };
    UserData.saveValue = function (key, value) {
        if (value == null)
            localStorage.removeItem(UserData.prefix + key);
        else {
            var serialized = JSON.stringify(value);
            localStorage.setItem(UserData.prefix + key, serialized);
        }
    };
    UserData.loadValue = function (key, defaultVaule) {
        var value = localStorage.getItem(UserData.prefix + key);
        if (!value)
            return defaultVaule;
        return JSON.parse(value);
    };
    // #endregion
    UserData.prototype.resetAll = function () {
        localStorage.clear();
    };
    //#endregion
    // #region generic
    UserData.prefix = "FastPair_";
    return UserData;
})();
//# sourceMappingURL=UserData.js.map