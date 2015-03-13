declare var CryptoJS;

class Analytics {

    private userId: string;
    private sessionId: string;

    //create a random user ID
    private getUser(): string {

        if (!this.userId)
            this.userId = localStorage.getItem("dia_userID");

        if (!this.userId) {
            this.userId = (Math.random() * 9999999999).toString();
            localStorage.setItem("dia_userID", this.userId);
        }

        return this.userId;
    }

    private getSession(): string {

        if (!this.sessionId)
            this.sessionId = (Math.random() * 9999999999).toString();

        return this.sessionId;
    }

    private getBuild(): string {
        return "alpha 72";
    }

    private sendEvent(eventId: string, subEventId, value: number, level?: number, x?: number, y?: number) {
        var game_key = '8c544aeba45e500f2af6e9b1beee996a'
        var secret_key = 'cd5bce1753ceadacad6b990046fd1fb5d884c9a0'
        //var data_api_key = 'd519f8572c1893fb49873fa2345d444c03afa172'

        var category = "design";

        var message = {
            "user_id": this.getUser(),
            "session_id": this.getSession(),
            "build": this.getBuild(),
            "event_id": eventId + ":" + subEventId,
            "value": value,
            "area": this.normalizeNumber(level),
            "x": x,
            "y": y,
        };

        var json_message = JSON.stringify(message);
        var md5_msg = CryptoJS.MD5(json_message + secret_key);
        var header_auth_hex = CryptoJS.enc.Hex.stringify(md5_msg);

        var url = 'http://api-eu.gameanalytics.com/1/' + game_key + '/' + category;

        this.postAjax(url, message, header_auth_hex);
    }

    private postAjax(url: string, data: any, header_auth_hex: string) {
   
        var xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("POST", url, true)

        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.setRequestHeader('Content-Length', JSON.stringify(data).length.toString());
        xhr.setRequestHeader("Authorization", header_auth_hex);
        //xhr.addEventListener('load', function (e) {}, false);

        xhr.send(JSON.stringify(data));
    }

    private normalizeNumber(value: number= 0): string {
        var s = "000000000" + value.toString();
        return s.substr(s.length - 3);
    }

    private log2(value: number): number {
        return Math.log(value) / Math.log(2);
    }

    //# region log methods ================================================================================================

    public logGameStart() {
        this.sendEvent("GameStart", "start", 1);
    }

    public logUsedItem(itemId: string, level: number) {
        this.sendEvent("UseItem", itemId, 1, level);
    }

    public logEndGame(level: number, lastJelly: number, moves: number, time: number) {
        this.sendEvent("GameEnd", "Time:" + this.normalizeNumber(parseInt((time / 60000).toFixed())),1, level)
        this.sendEvent("GameEnd", "Level:"+ this.normalizeNumber(level),1, level)
        this.sendEvent("GameEnd", "LastJelly:" + this.normalizeNumber(this.log2(lastJelly)),1, level)
    }

    public logWinGame(level: number, lastJelly: number, moves: number, time: number) {
        this.sendEvent("GameWin", "Time:" + this.normalizeNumber(parseInt((time / 60000).toFixed())), 1, level)
        this.sendEvent("GameWin", "Moves", moves, level)
    }

    public logNewJelly(jellyId: number, level: number, time: number) {
        this.sendEvent("NewJelly", "Time:"  + this.normalizeNumber(jellyId), parseInt((time / 1000).toFixed()) , level);
        this.sendEvent("NewJelly", "Level:" + this.normalizeNumber(jellyId), level, level);
    }

    //# end region 

} 