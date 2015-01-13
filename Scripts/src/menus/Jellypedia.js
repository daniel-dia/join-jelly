var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    var Jellypedia = (function (_super) {
        __extends(Jellypedia, _super);
        function Jellypedia(userData, jellyInfos) {
            _super.call(this, StringResources.menus.jellypedia);
            // add jelly items
            var itensContainer = new createjs.Container();
            this.scrollableContent.addChild(itensContainer);
            itensContainer.y = 400;
            var index = 0;
            for (var j = 1; j <= 8192; j *= 2) {
                if (j <= userData.getLastJelly())
                    var pi = new joinjelly.menus.view.JellyPediaItem(j, jellyInfos[j].name, jellyInfos[j].description);
                else
                    var pi = new joinjelly.menus.view.JellyPediaItem(0, "?", "");
                itensContainer.addChild(pi);
                pi.y = 500 * index;
                pi.x = 150;
                index++;
            }
            this.maxScroll = 5700;
        }
        return Jellypedia;
    })(joinjelly.ScrollablePage);
    joinjelly.Jellypedia = Jellypedia;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=Jellypedia.js.map