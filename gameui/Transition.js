var gameui;
(function (gameui) {
    var Transition = (function () {
        function Transition() {
            this.time = 300;
            this.type = "fade";
        }
        return Transition;
    })();
    gameui.Transition = Transition;
})(gameui || (gameui = {}));
//# sourceMappingURL=Transition.js.map
