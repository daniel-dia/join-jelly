class UserData {

    public setScore(score) {
        var highscore = this.getHighScore();
        if (score > highscore) UserData.saveValue("highscore", score);
    }

    public getHighScore(): number{
        var value = <number>UserData.loadValue("highscore");
        if (value) return value;
        return 0;
    }

    public getLastJelly(): number {
        var value = UserData.loadValue("highscore");
        if (value) return value;
        return 0;
    }

    public setLastJelly(value: number) {
        UserData.saveValue("highscore", value);
    }

    //=========================//
    private static prefix = "FastPair_";

    private static saveValue(key: string, value: any) {
        var serialized = JSON.stringify(UserData.prefix + value);
        localStorage.setItem(key, serialized);
    }

    private static loadValue(key: string): any {
        var value = localStorage.getItem(UserData.prefix + key);
        return JSON.parse(value);
    }

}
