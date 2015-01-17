﻿class UserData {
    
    constructor() {

        gameui.AssetsManager.setSoundVeolume(this.getSoundVol());
        gameui.AssetsManager.setMusicVolume(this.getMusicVol());

    }
    
    // #region score
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

    //#endregion

    //#region options

    public getMusicVol(): number {
        return UserData.loadValue("music",1); 
    }

    public setMusicVol(volume: number) {
        UserData.saveValue("music", volume);
    }

    public getSoundVol(): number{
        return UserData.loadValue("sound",1);
    }

    public setSoundVol(volume: number) {
        UserData.saveValue("sound",volume);
    }

    //#endregion

    // #region items
    public static saveItems(items:Array<number>) {
        return this.saveValue("items", items);
    }

    public static loadItems(): Array<number> {
        return this.loadValue("items", {});
    }

    // #endregion

    //#region gamestate

    public saveGame(savegame:SaveGame) {
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

    private static saveValue(key: string, value: any) {

        if (value == null)
            localStorage.removeItem(UserData.prefix + key);
        else {
            var serialized = JSON.stringify(value);
            localStorage.setItem(UserData.prefix + key, serialized);
        }
    }

    private static loadValue(key: string,defaultVaule?): any {
        var value = localStorage.getItem(UserData.prefix + key);
        if (!value)
            return defaultVaule;
        return JSON.parse(value);
    }
    // #endregion

}

interface SaveGame {
    tiles: Array<number>;
    matches: number;
    score: number;
    level: number;
}

