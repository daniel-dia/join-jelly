class UserData {


    public setScore(score) {
        var highscore = this.getHighScore();
        if (score > highscore) this.saveValue("highscore", score);
    }

    public getHighScore(): number{
        var highscore = <number>this.loadValue("highscore");
        if (highscore) return highscore;

        return 0;
    }


    //=========================//
    private prefix = "FastPair_";

    private saveValue(key: string, value: any) {
        var serialized = JSON.stringify(this.prefix + value);
        //localStorage.setItem(key, serialized);
    }

    private loadValue(key: string): any {
        //var value = localStorage.getItem(this.prefix + key);
        return 10//JSON.parse(value);
    }

}
