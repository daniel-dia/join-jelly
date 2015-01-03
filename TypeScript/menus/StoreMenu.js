var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    var StoreMenu = (function (_super) {
        __extends(StoreMenu, _super);
        function StoreMenu(previousScreen) {
            _super.call(this, StringResources.store.title);
            this.previousScreen = previousScreen;
        }
        return StoreMenu;
    })(joinjelly.ScrollablePage);
    joinjelly.StoreMenu = StoreMenu;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=StoreMenu.js.map