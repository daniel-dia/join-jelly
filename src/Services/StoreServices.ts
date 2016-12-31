class StoreServices {

    public static showRating(storeURLs: StoreServices.StoreURLs) {
        var os = DeviceServices.getOs();

        switch (os) {
            case "ios": DeviceServices.openURL(storeURLs.ios); break;
            case "android": DeviceServices.openURL(storeURLs.android); break;
            case "windows": DeviceServices.openURL(storeURLs.windows); break;
        }

    }
}

module StoreServices {
    export interface StoreURLs {

        ios: string;
        android: string;
        windows: string;

    }
}