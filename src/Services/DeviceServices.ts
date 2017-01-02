declare var Cocoon;
class DeviceServices {
    

    private static initialized: boolean = false;

    static getOs(): string {
        var os = "windows"
        if (window["Cocoon"] && Cocoon.Device.getDeviceInfo()) os = Cocoon.Device.getDeviceInfo().os;
        return os;
    }

    static openURL(url: string) {
        if (window["Cocoon"]) Cocoon.App.openURL(url);
        else if (window["Windows"]) Windows.System.Launcher.launchUriAsync(new Windows.Foundation.Uri(url));
        else window.open(url);
    }

    static prompt(options, callback) {
        if (window["Cocoon"]) return Cocoon.Dialog.prompt(options, callback);
        else callback(prompt(options.message));
    }

    static confirm(options, callback) {
        if (window["Cocoon"]) return Cocoon.Dialog.confirm(options, callback);
        else if (Windows["Windows"]) {

            var message = Windows.UI.Popups.MessageDialog(options.title, options.message);
            message.commands.append(new Windows.UI.Popups.UICommand("Cancel", function () {
                callback(false)
            }));
            message.commands.append(new Windows.UI.Popups.UICommand("Ok", function () {
                callback(true)
            }));

            message.showAsync()
        }
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

