declare var WindowsAzure: any;
module joinjelly {
 
    export class AzureLeaderBoards {

        private static deviceId: string;
        private static client: any;
        private static table: any;

        private static host: string = "https://dialeaderboards.azure-mobile.net";
        private static key: string = "GyalJGfVBZeaGMTMGxKuytNMXjjoqC94";
        private static gameId: string = "joinjelly";


        private static capable: boolean;


        public static init() {
            this.deviceId = localStorage.getItem("deviceId");
            this.client = new WindowsAzure.MobileServiceClient(this.host,this.key);
            this.table = this.client.getTable("LeaderBoards");
        }

        // get all scores wall
        public static getScoreNames(callback:(result:Array<any>)=>void,count) {
            this.table.orderByDescending("score").take(50).where({ gameid: this.gameId }).read().then(function (queryResults) {
                callback(queryResults);
            });
        }

        public static addRandomData() {
            for (var t = 0; t < 40; t++) {
                var scpre = Math.floor(Math.random() * 50000);
                var name = "DIA " + Math.floor(Math.random() * 50); 
                this.setScore(scpre, name,true);
            }
        }

        // saves scores to the cloud
        public static setScore(score:number, name:string, newId:boolean=false) {
            // if device id is already saved
            if (this.deviceId  && !newId) {
                //update the current id
                if (this.table)
                    this.table.update({ name: name, score: score, id: this.deviceId, gameid: this.gameId });
            }
            else {
                // insert a new id and get the device ID from server
                if (this.table)
                    this.table.insert({ name: name, score: score, gameid: this.gameId}).then((result) => {
                        if (result.id) {
                            //get id from server
                            this.deviceId = result.id;
                            //save local storage
                            localStorage.setItem("deviceId", this.deviceId);
                        }
                    });
            }
        }

    }
}