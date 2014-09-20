var UserData = (function () {
    function UserData() {
    }
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

    UserData.saveValue = function (key, value) {
        var serialized = JSON.stringify(value);
        localStorage.setItem(UserData.prefix + key, serialized);
    };

    UserData.loadValue = function (key) {
        var value = localStorage.getItem(UserData.prefix + key);
        return JSON.parse(value);
    };
    UserData.prefix = "FastPair_";
    return UserData;
})();
//# sourceMappingURL=UserData.js.map
