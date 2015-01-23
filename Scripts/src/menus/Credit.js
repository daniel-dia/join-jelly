var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    var About = (function (_super) {
        __extends(About, _super);
        function About() {
            _super.call(this, StringResources.menus.about);
            this.maxScroll = 1700;
        }
        return About;
    })(joinjelly.ScrollablePage);
    joinjelly.About = About;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=Credit.js.map