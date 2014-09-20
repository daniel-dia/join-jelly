var UserData = (function () {
    function UserData() {
    }
    UserData.prototype.setScore = function (score) {
        var highscore = this.getHighScore();
        if (score > highscore)
            UserData.saveValue("highscore", score);
    };

    UserData.prototype.getHighScore = function () {
        var value = UserData.loadValue("highscore");
        if (value)
            return value;
        return 0;
    };

    UserData.prototype.getLastJelly = function () {
        var value = UserData.loadValue("highscore");
        if (value)
            return value;
        return 0;
    };

    UserData.prototype.setLastJelly = function (value) {
        UserData.saveValue("highscore", value);
    };

    UserData.saveValue = function (key, value) {
        var serialized = JSON.stringify(UserData.prefix + value);
        localStorage.setItem(key, serialized);
    };

    UserData.loadValue = function (key) {
        var value = localStorage.getItem(UserData.prefix + key);
        return JSON.parse(value);
    };
    UserData.prefix = "FastPair_";
    return UserData;
})();
//# sourceMappingURL=UserData.js.map
