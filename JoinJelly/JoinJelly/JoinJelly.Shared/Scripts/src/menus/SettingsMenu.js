var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    var SettingsMenu = (function (_super) {
        __extends(SettingsMenu, _super);
        function SettingsMenu() {
            _super.call(this, StringResources.menus.menu);
            this.maxScroll = 1700;
            var space = 270;
            var y = 400;
            // add Sound Button
            var soundOptions = new joinjelly.menus.view.SoundOptions();
            this.scrollableContent.addChild(soundOptions);
            this.scrollableContent.x = defaultWidth / 2;
            soundOptions.y = y += space;
            // add Tutorial button
            var tutorial = new gameui.BitmapTextButton(StringResources.menus.tutorial, "debussy", "BtTextBg", function () {
                joinjelly.JoinJelly.startTutorial();
            });
            tutorial.y = y += space;
            this.scrollableContent.addChild(tutorial);
            // add About Button
            var about = new gameui.BitmapTextButton(StringResources.menus.about, "debussy", "BtTextBg");
            about.y = y += space;
            this.scrollableContent.addChild(about);
            // add Reset Button
            var reset = new gameui.BitmapTextButton(StringResources.menus.reset, "debussy", "BtTextBg");
            reset.y = y += space;
            this.scrollableContent.addChild(reset);
        }
        return SettingsMenu;
    })(joinjelly.ScrollablePage);
    joinjelly.SettingsMenu = SettingsMenu;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=SettingsMenu.js.map