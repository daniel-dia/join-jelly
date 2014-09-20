class UserData {

    public setScore(score) {
        var highscore = this.getHighScore();
        if (score > highscore) UserData.saveValue("HighScore", score);
    }

    public getHighScore(): number{
        var value = <number>UserData.loadValue("HighScore");
        if (value) return value;
        return 0;
    }

    public setLastJelly(value: number) {
        var highValue = this.getLastJelly();
        if(value > highValue)
            UserData.saveValue("LastJelly", value);
    }


    public getLastJelly(): number {
        var value = UserData.loadValue("LastJelly");
        if (value) return value;
        return 0;
    }

    //=========================//
    private static prefix = "FastPair_";

    private static saveValue(key: string, value: any) {
        var serialized = JSON.stringify(value);
        localStorage.setItem(UserData.prefix + key, serialized);
    }

    private static loadValue(key: string): any {
        var value = localStorage.getItem(UserData.prefix + key);
        return JSON.parse(value);
    }

}
