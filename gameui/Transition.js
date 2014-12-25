var gameui;
(function (gameui) {
    var Transition = (function () {
        function Transition() {
            this.time = 300;
            this.type = "fade"; // none,fade,left,top,right,bottom
        }
        return Transition;
    })();
    gameui.Transition = Transition;
})(gameui || (gameui = {}));
//# sourceMappingURL=Transition.js.map