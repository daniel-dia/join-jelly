declare var Cocoon;
class GameServices {

    private socialService: any;
    private waitingLogin: boolean;
    private localUserScore: number;

    constructor() {

    }

    public initializeGameservices() {
        if (navigator.onLine || window["Cocoon"]) {


            //Get specific social service form platform
            if (Cocoon.getPlatform() === 'ios') {
                Cocoon.Social.GameCenter.init({ defaultLeaderboard: "leaderboards" });
                this.socialService = Cocoon.Social.GameCenter.getSocialInterface();
                //multiplayerService = gc.getMultiplayerInterface();

            }
            else if (Cocoon.getPlatform() === 'android') {
                Cocoon.Social.GooglePlayGames.init({ defaultLeaderboard: "CgkI49ztp64KEAIQAg " });
                this.socialService = Cocoon.Social.GooglePlayGames.getSocialInterface();
                //multiplayerService = gp.getMultiplayerInterface();

            }

            //Social Service Login and Score Listeners
            var leaderbords = { leaderboardID: "tictactoe2" }


            if (this.socialService) {
                this.socialService.on("loginStatusChanged", (l, e) => { this.onLogin(l, e) });

                //login
                this.loginSocialService();
            }
        }

    }

    private loginSocialService() {

        if (this.waitingLogin) return;

        this.waitingLogin = true;
        this.socialService.login();
    }



    private onLogin(loggedIn, error) {

        this.waitingLogin = false;

        if (!loggedIn || error) {
            console.error("Game service Login failed: " + JSON.stringify(error));
            //Tell the user that Game Center is Disabled
            //if (error.code == 2 && this.usingGameCenter) {
            //    DeviceServices.confirm({
            //        title: "Game Center Disabled",
            //        message: "Sign in with the Game Center application to enable it",
            //        confirmText: "Ok",
            //        cancelText: "Cancel"
            //    }, function (accepted) { if (accepted) Cocoon.App.openURL("gamecenter:"); });
            //}

        }
        else {
            console.log("Game service login");

            this.socialService.requestScore(function (score, error) {
                if (error) {
                    console.error("Error getting user score: " + error.message);
                }
                else if (score) {
                    console.log("score: " + score.score);
                    this.localUserScore = score.score; // TODO set real leaderboard
                }
            });
        }
    }



    // show native leaderboards
    public showLeaderboard() {

        if (!navigator.onLine || !this.socialService) return;

        this.socialService.showLeaderboard(function (error) {
            if (error)
                console.error("showLeaderbord error: " + error.message);
        });

    }

    // show a achievement.
    public showAchievements() {
        if (!navigator.onLine || !this.socialService) return;

        this.socialService.showAchievements(function (error) {
            if (error)
                console.error("showAchievements error: " + error.message);
        });

    }

    // submit a score
    public submitScore(score: number) {

        if (!navigator.onLine || !this.socialService) return;


        this.socialService.submitScore(score.toString(), function (error) {
            if (error)
                console.error("submitScore error: " + error.message);
        });
    }

    // submit an achievement
    public submitAchievent(achievementId: string) {

        if (!navigator.onLine || !this.socialService) return;

        var id = "";
        if (Cocoon.getPlatform() === 'ios') {
            id = constantsiOS[achievementId];
        } else if (Cocoon.getPlatform() === 'android') {
            id = contantsAndroid[achievementId];
        }

        if (id)
            this.socialService.submitAchievement(id, function (error) {
                if (error)
                    console.error("submitAchievement error: " + error.message);
                else
                    console.error("submited");
            });

    }

    public getScore() {
        return this.localUserScore;
    }
}
