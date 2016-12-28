﻿declare var Cocoon;
class DeviceServices {
    

    private static initialized: boolean = false;

    static getOs(): string {
        var os = "windows"
        if (window["Cocoon"] && Cocoon.Device.getDeviceInfo()) os = Cocoon.Device.getDeviceInfo().os;
        return os;
    }

    static openURL(url: string) {
        if (window["Cocoon"]) Cocoon.App.openURL(url);
        else window.open(url);
    }

    static prompt(options, callback) {
        if (window["Cocoon"]) return Cocoon.Dialog.prompt(options, callback);
        else callback(prompt(options.message));
    }

    static confirm(options, callback) {
        if (window["Cocoon"]) return Cocoon.Dialog.confirm(options, callback);
        else callback(confirm(options.message));
    }

    static registerBackButton(callback) {
        if (window["Cocoon"]) Cocoon.App.exitCallback(callback)
    }

    static exit() {
        if (window["Cocoon"]) Cocoon.App.exit();
        else;
    }
}

