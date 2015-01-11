declare var $;
declare var CryptoJS;

class Analytics {

    private userId: string;
    private sessionId: string;

    //create a random user ID
    private getUser(): string {

        if (!this.userId)
            this.userId = localStorage.getItem("lirum_userId");

        if (!this.userId) {
            this.userId = (Math.random() * 9999999999).toString();
            localStorage.setItem("lirum_userId", this.userId);
        }

        return this.userId;
    }

    private getSession(): string {

        if (!this.sessionId)
            this.sessionId = (Math.random() * 9999999999).toString();

        return this.sessionId;
    }

    private getBuild(): string {
        return "alpha1";
    }

    public logGameStart() {
        this.sendEvent("Game", "start", 1);
    }

    public logEndGame(moves, score, level, jelly) {
        this.sendEvent("LevelEnd", "level", level, moves.toString());
        this.sendEvent("LevelEnd", "jelly", jelly, moves.toString());
        this.sendEvent("LevelEnd", "score", score, moves.toString());

        this.sendEvent("LevelEnd", "move", moves);
    }

    public logMove(moves, score, level, freeSpaces) {
        this.sendEvent("level", "freeSpaces", freeSpaces, moves.toString());
        this.sendEvent("level", "score", score, moves.toString());
        this.sendEvent("level", "level", level, moves.toString());

        this.sendEvent("level", "move", moves);
    }

    // public logUsedItem(itemId: string, levelId: string) {
    //     this.sendEvent("item", itemId, 1, levelId);
    // }
    // public loglevelTime(levelId: string, time: number, final: string) {
    //     this.sendEvent("time", final, time / 1000, levelId);
    // }
    //
    // public logBonus(bonusid: string, items: number) {
    //     this.sendEvent("bonus", bonusid.toString(), items, bonusid);
    // }


    //======================================================================================================================
    private sendEvent(eventId: string, subEventId, value: number, level?: string, x?: number, y?: number) {
        if (typeof $ == "undefined") return;

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
            "area": level,
            "x": x,
            "y": y,
        };

        var json_message = JSON.stringify(message);
        var md5_msg = CryptoJS.MD5(json_message + secret_key);
        var header_auth_hex = CryptoJS.enc.Hex.stringify(md5_msg);

        var url = 'http://api-eu.gameanalytics.com/1/' + game_key + '/' + category;

        $.ajax({
            type: 'POST',
            url: url,
            data: json_message,

            headers: {
                "Authorization": header_auth_hex,
            },

            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-Type', 'text/plain');
            },
            //success: function (data, textStatus, XMLHttpRequest) {
            //    console.log("GOOD! textStatus: " + textStatus);

            //},
            //error: function (XMLHttpRequest, textStatus, errorThrown) {
            //    console.log("ERROR ajax call. error: " + errorThrown + ", url: " + url);

            //} 
        });
    }
} 