class SocialServices {

    
    private static initialized: boolean = false;

    public static FBSocialService: any;

    public static initialize() {

        var os = DeviceServices.getOs();

        //initialize the Facebook Service the same way as the Official JS SDK
        if (navigator.onLine && window["Cocoon"]) {
            var fb = Cocoon.Social.Facebook;
            fb.init({ appId: fbAppId });
            this.FBSocialService = fb.getSocialInterface();
        }
    }

    public static sendMessage(message: SocialServices.Message, callback) {

        if (!this.isAvaliable()) return;

        // mediaURL, linkURL, linkText, linkCaption
        this.FBSocialService.publishMessageWithDialog([
            message.shareDescription,
            message.gameWebsiteIcon,
            message.gameWebsite,
            message.shareTitle,
            message.shareCaption
        ], callback)
    }

    public static isAvaliable() {
        return this.FBSocialService ? true : false;
    }
}

module SocialServices {
    export interface Message {

        shareDescription: string,
        gameWebsiteIcon: string,
        gameWebsite: string,
        shareTitle: string,
        shareCaption: string;

    }
}
