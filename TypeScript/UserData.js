var UserData = (function () {
    function UserData() {
        //=========================//
        this.prefix = "FastPair_";
    }
    UserData.prototype.setScore = function (score) {
        var highscore = this.getHighScore();
        if (score > highscore)
            this.saveValue("highscore", score);
    };

    UserData.prototype.getHighScore = function () {
        var highscore = this.loadValue("highscore");
        if (highscore)
            return highscore;

        return 0;
    };

    UserData.prototype.saveValue = function (key, value) {
        var serialized = JSON.stringify(this.prefix + value);
        //localStorage.setItem(key, serialized);
    };

    UserData.prototype.loadValue = function (key) {
        //var value = localStorage.getItem(this.prefix + key);
        return 10;
    };
    return UserData;
})();
//# sourceMappingURL=UserData.js.map
