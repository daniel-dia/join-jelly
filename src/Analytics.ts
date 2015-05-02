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
        return "alpha 80";
    }

    private sendEvent(eventId: string, subEventId, value: number, area?: number, x?: number, y?: number) {
        //var game_key = '8c544aeba45e500f2af6e9b1beee996a'
        //var secret_key = 'cd5bce1753ceadacad6b990046fd1fb5d884c9a0'
		var game_key = '10b6363c0a7336d2d08a4036c0971226'
        var secret_key = 'f4a554ef98cb148fcc02570e8abf591f43a10996'
        //var data_api_key = '7a0a0ca9b1db2b56a94925ea5c640730e45dffed'

        var category = "design";

        var message = {
            "user_id": this.getUser(),
            "session_id": this.getSession(),
            "build": this.getBuild(),
            "event_id": eventId + ":" + subEventId,
            "value": value,
            "area": this.normalizeNumber(area),
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

        if (xhr.readyState == 1)
            try {
                xhr.send(JSON.stringify(data));
            } catch (e) { }
    }

    private normalizeNumber(value:number): string {
        var s = (Math.floor(value)).toString();
		while (s.length < 3) s = "0" + s;
        return s;
    }

    private log2_number(value: number): number {
        return Math.floor(Math.log(value) / Math.log(2));
    }

	private log2(value: number): string {
        var val = Math.floor(Math.log(value) / Math.log(2));		
		return this.normalizeNumber(val);

    }

	private parseTime(value: number): number {
		return Math.floor(value / 60000);
	}
    //# region log methods ================================================================================================

    public logGameStart() {
        this.sendEvent("GameStart", "start", 1);
    }

    public logUsedItem(itemId: string, level: number) {
        this.sendEvent("UseItem", itemId, 1, level);
    }

    public logEndGame(level: number, lastJelly: number, moves: number, time: number) {
        this.sendEvent("GameEnd", "Time", 1,  parseInt((time / 60000).toFixed()));
        this.sendEvent("GameEnd", "Level", 1, level);
        this.sendEvent("GameEnd:LastJelly", this.log2(lastJelly),1)
    }

    public logWinGame(level: number, lastJelly: number, moves: number, time: number) {
        this.sendEvent("GameWin", "Time", this.parseTime(time))
        this.sendEvent("GameWin", "Moves", moves)
		this.sendEvent("GameWin", "Level", level)
    }

    public logNewJelly(jellyId: number, level: number, time: number) {
        this.sendEvent("NewJelly:Time",  this.normalizeNumber(jellyId), this.parseTime(time));
        this.sendEvent("NewJelly:Level", this.normalizeNumber(jellyId), level);
    }

    //# end region 

} 