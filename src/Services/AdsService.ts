class AdsServices {

    private static status: AdsServices.STATUS;
    private static interstitial
    private static ad_timeout;

    public static initialize() {

        var cocoon = window["Cocoon"];
        document.addEventListener('deviceready', () => {

            if (!cocoon || !cocoon.Ad || !cocoon.Ad.MoPub) {
                this.debug('Cocoon AdMob plugin not installed');
                this.status = AdsServices.STATUS.FAIL;
                return;
            }

            cocoon.Ad.MoPub.configure({
                ios: { interstitial: "1a895b1b280d48d88ab5ddce11633701" },
                android: { interstitial: "5c4ca98862a04ee09f2f9a67c5b95d80" }
            });

            if (!this.interstitial) this.interstitial = cocoon.Ad.MoPub.createInterstitial();

            this.setCallbacks();

            this.load();

        }, false);

    }

    public static show(callback?: (displayed: boolean, status?: string) => void) {

        if (!this.interstitial) {
            if (callback) callback(false, "not_Initialized");
            return;
        }

        if (this.isReady()) {
            this.debug("show")

            this.interstitial.on("dismiss", (e) => {
                if (callback) callback(true, "displayed");
            });

            this.interstitial.show()
        } else {

            this.debug("not loaded yet");
            this.load();

            if (callback) callback(false, "not_Loaded");
        }
    }

    public static isReady() {
        return (this.interstitial && this.interstitial.isReady());
    }

    public static getStatus(): AdsServices.STATUS {
        if (!this.interstitial) return AdsServices.STATUS.NOT_AVALIABLE;
        if (this.interstitial && this.interstitial.isReady()) return AdsServices.STATUS.READY;
        return this.status;
    }

    public static load() {
        if (!this.interstitial) return;
        this.debug("loading")
        this.interstitial.load();
        this.status = AdsServices.STATUS.LOADING;

        if (this.ad_timeout) clearTimeout(this.ad_timeout);

        this.ad_timeout = setTimeout(() => {
            this.debug("timeout");
            this.status = AdsServices.STATUS.TIMEOUT;
        }, 60000)

    }

    private static setCallbacks() {

        this.interstitial.on("show", (e) => {
            this.debug('music paused')
        });

        this.interstitial.on("load", (e) => {
            this.debug("Interstitial loaded " + JSON.stringify(e));
            this.status = AdsServices.STATUS.READY;
            clearTimeout(this.ad_timeout);
        });

        this.interstitial.on("fail", (e) => {
            this.debug("Interstitial failed " + JSON.stringify(e));
            this.status = AdsServices.STATUS.FAIL;
            if (this.ad_timeout) clearTimeout(this.ad_timeout);
        });

        this.interstitial.on("dismiss", (e) => {
            this.debug("Interstitial dismissed " + JSON.stringify(e));
            this.status = AdsServices.STATUS.NOT_LOADED;
            this.load();
        });

    }
    
    private static debug(text) {
        console.log("ads " + text)
    }

}


module AdsServices {

    export enum STATUS {
        LOADING,
        READY,
        FAIL,
        NOT_LOADED,
        TIMEOUT,
        NOT_AVALIABLE,
    }

}