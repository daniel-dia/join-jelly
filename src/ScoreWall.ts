declare var WindowsAzure: any;
module joinjelly {
 
    export class ScoreWall {

        private static deviceId: string;
        private static client: any;
        private static table: any;

        private static key: string = "NpqzgtfXbOrCcxFjabUgkhBSpaJPbK51";
        private static host: string = "https://joinjelly.azure-mobile.net/";
        private static gameId: string = "joinjelly";

        public static init() {
            this.deviceId = localStorage.getItem("deviceId");
            this.client = new WindowsAzure.MobileServiceClient(this.host,this.key);
            this.table = this.client.getTable("ScoreWall");
        }

        // get all scores wall
        public static getScoreNames(callback:(result:Array<any>)=>void) {
            this.table.orderByDescending("score").take(50).where({ gameid: this.gameId }).read().then(function (queryResults) {
                callback(queryResults);
            });
        }

        // saves scores to the cloud
        public static setScore(name, score) {
            // if device id is already saved
            if (this.deviceId)
                //update the current id
                this.table.update({ name: name, score: score, id: this.deviceId, gameid:this.gameId});
                
            else
                // insert a new id and get the device ID from server
                this.table.insert({ name: name, score: score }).then((result) => {
                    if (result[0] && result[0].id) {
                        //get id from server
                        this.deviceId = result[0].id;
                        //save local storage
                        localStorage.setItem("deviceId", this.deviceId);
                    }
                });
        
        }

    }
}