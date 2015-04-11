module joinjelly {
    export class GameServices {

        private socialService: Cocoon.Social.Interface;
        constructor() {

            //initializes game services
            var gp = Cocoon.Social.GooglePlayGames;
            if(Cocoon.Device.getDeviceInfo() && Cocoon.Device.getDeviceInfo().os=="android")
                gp.init({
                    defaultLeaderboard: constants.LEAD_LEADERBOARD,
                });
            else
                gp.init({
                    clientId: constants.CLIENT_ID,
                    defaultLeaderboard: constants.LEAD_LEADERBOARD,
                });
            this.socialService = gp.getSocialInterface();

            // set achievement Map
            this.socialService.setAchievementsMap(achievementMap)

            // login into game Services
            setTimeout(() => {
                if (!this.socialService.isLoggedIn())
                    this.socialService.login((loggedIn, error) => {
                        if (error) {
                            console.error("login error: " + error.message + " " + error.code);
                        }
                        else if (!loggedIn) {
                            console.log("login cancelled");
                        }
                    });
            }, 2000);
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
        public submitJellyAchievent(jellyValye: number) {
            // dont submit for low values
            if (jellyValye < 8) return;

            // normalize value to log2
            var jellyNumber = Math.floor(Math.log(jellyValye) / Math.log(2)) +1;
         
            //submit
            this.socialService.submitAchievement("ACH_JELLY_" + jellyNumber, (error) => {
                if (error)
                    console.error("submitAchievement error: " + error.message);
                else
                    console.log("submited Achievement: " + achievementId);
            });
        }
    }
}