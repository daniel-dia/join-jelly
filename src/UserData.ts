class UserData {

    constructor() {

        gameui.AudiosManager.setSoundVolume(this.getSoundVol());
        gameui.AudiosManager.setMusicVolume(this.getMusicVol());


    }

    // #region score
    public setScore(score) {
        var highscore = this.getHighScore();
        if (score > highscore) UserData.saveValue("HighScore", score);
    }

    public getHighScore(): number {
        var value = <number>UserData.loadValue("HighScore");
        if (value) return value;
        return 0;
    }

    public setLastJelly(value: number) {
        var highValue = this.getLastJelly();
        if (value > highValue)
            UserData.saveValue("LastJelly", value);
    }

    public getLastJelly(): number {
        var value = UserData.loadValue("LastJelly");
        if (value) return value;
        return 0;
    }

    public setPlayerName(userName: string) {
        UserData.saveValue("username", userName);
    }

    public getPlayerName(): string {
        var un = UserData.loadValue("username");
        if (!un) un = "";
        return un;
    }

    public promptPlayerName(callback?: () => void) {

        DeviceServices.prompt({
            title: StringResources.menus.playerName,
            message: StringResources.menus.playerNameDesc,
            text: this.getPlayerName(),
            type: "text",
        },
            {
                success: (text) => {
                    this.setPlayerName(text);
                    callback();
                },
                cancel: function () {
                    callback();
                }
            }
            );
    }

    public addOneMorePlay() {
        var un = UserData.loadValue("plays",0);
        un++;
        UserData.saveValue("plays", un);
    }

    public getPlays() {
        return UserData.loadValue("plays", 0);
    }

    //#endregion

    //#region options

    public getMusicVol(): number {
        return UserData.loadValue("music", 1);
    }

    public setMusicVol(volume: number) {
        UserData.saveValue("music", volume);
    }

    public getSoundVol(): number {
        return UserData.loadValue("sound", 1);
    }

    public setSoundVol(volume: number) {
        UserData.saveValue("sound", volume);
    }

    //#endregion

    // #region items
    public saveItems(items: Array<number>) {
        return UserData.saveValue("items", items);
    }

    public loadItems(): Array<number> {
        return UserData.loadValue("items", {});
    }

    // #endregion

    //#region gamestate

    public saveGame(savegame: SaveGame) {
        UserData.saveValue("savegame", savegame);
    }

    public loadGame(): SaveGame {
        return UserData.loadValue("savegame", undefined);
    }

    public deleteSaveGame() {
        UserData.saveValue("savegame", null);
    }

    //#endregion

    // #region generic
    private static prefix = "FastPair_";

    private static saveValue(key: string, value?) {
        if (value == null)
            localStorage.removeItem(UserData.prefix + key);
        else {
            var serialized = JSON.stringify(value);
            localStorage.setItem(UserData.prefix + key, serialized);
        }
    }

    private static loadValue(key: string, defaultVaule?): any {
        var value = localStorage.getItem(UserData.prefix + key);
        if (!value)
            return defaultVaule;
        return JSON.parse(value);
    }
    // #endregion

    //#region history
	
    public history(key: string, value:any=true) {
        var history = UserData.loadValue("history", {});
        history[key] = value;
        UserData.saveValue("history", history);
    }

    public getHistory(value: string): any {
        var hist = UserData.loadValue("history", {});
        return hist[value];
    }

    public static getHistoryRevive() {
        return this.loadValue("revive");
    }

    //#endregion

    public resetAll() {
        localStorage.clear();
    }
}

class histories {
    static TUTORIAL = "tutorial_intro";
    static REVIVE = "revive";
    static EVOLVE = "evolve";
    static FIRSTPLAY = "firstplay";
}


interface SaveGame {
    tiles: Array<number>;
    matches: number;
    score: number;
    level: number;
    reviveCost: number;
}


