module joinjelly {
    export class GameServices {

        private socialService: Cocoon.Social.Interface;
        constructor() {
            
            // get device os info
            var os = "web"
            if (Cocoon.Device.getDeviceInfo()) os = Cocoon.Device.getDeviceInfo().os;
                        
            if (os == "ios") {
                //initializes game services
                this.socialService = Cocoon.Social.GameCenter.getSocialInterface();
                // set achievement Map
                this.socialService.setAchievementsMap(constantsiOS)
            }
            
            else { // web windows android:
                //initializes game services
                var gp = Cocoon.Social.GooglePlayGames;
                gp.init({
                    clientId: contantsAndroid.CLIENT_ID,
                    defaultLeaderboard: contantsAndroid.LEAD_LEADERBOARD
                });
                this.socialService = gp.getSocialInterface();
                // set achievement Map
                this.socialService.setAchievementsMap(contantsAndroid)
            }

            // login into game Services
            setTimeout(() => {
                if (!this.socialService.isLoggedIn())
                    this.socialService.login((loggedIn, error) => {
                        if (error) console.error("login error: " + error.message + " " + error.code);
                        else if (!loggedIn) console.log("login cancelled");
                    });
            }, 1000);
        }
        
        // show native leaderboards
        public showLeaderboard() {
             this.socialService.showLeaderboard();
        }

        public showAchievements() {
            this.socialService.showAchievements();
        }

        // submit a score
        public submitScore(score: number) {
            this.socialService.submitScore(score, (error) => {
                if (error)
                    console.error("score error: " + error.message);
                else
                    console.log("submited score: " + score);
            });
        }

        // submit an achievement
        public submitJellyAchievent(jellyValue: number) {
 
            // normalize value to log2
            var jellyNumber = Math.floor(Math.log(jellyValue) / Math.log(2)) +1;
         
            //submit
            this.socialService.submitAchievement("ACH_JELLY_" + jellyNumber, (error) => {
                if (error)
                    console.error("submitAchievement error: " + error.message);
                else
                    console.log("submited Achievement: jelly " + jellyNumber);
            });
        }
    }
}