var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    var menus;
    (function (menus) {
        var view;
        (function (view) {
            var JellyLobby = (function (_super) {
                __extends(JellyLobby, _super);
                function JellyLobby(lastJelly) {
                    _super.call(this);
                    // drop all jellies
                    this.dropAllJellys(lastJelly);
                }
                //add all jellys to the container
                JellyLobby.prototype.dropAllJellys = function (lastJelly) {
                    var _this = this;
                    // set a default value to the last jelly
                    if (!lastJelly)
                        lastJelly = 1;
                    // calculate all jellys already unlocked
                    var jellys = new Array();
                    for (var j = 1; j <= lastJelly; j *= 2)
                        jellys.push(j);
                    var i = 0;
                    var p = 1;
                    for (var j = 0; j < jellys.length; j++)
                        setTimeout(function () {
                            _this.dropJelly(p, i);
                            i++;
                            p *= 2;
                        }, j * 200);
                };
                //adds a single jelly to the container
                JellyLobby.prototype.dropJelly = function (value, position) {
                    var positions = [
                        [2 / 4, 0],
                        [3 / 4, 0.2],
                        [1 / 4, 0.2],
                        [2 / 5, 1],
                        [3 / 5, 1],
                        [1 / 5, 1.2],
                        [4 / 5, 1.2],
                        [1 / 6, 2.3],
                        [2 / 6, 2],
                        [4 / 6, 2],
                        [5 / 6, 2.3],
                        [1 / 4, 2.6],
                        [3 / 4, 2.6],
                        [2 / 4, 3],
                    ];
                    var jelly = new joinjelly.gameplay.Tile(0, 0, 500);
                    // adds jelly
                    this.addChildAt(jelly, 0);
                    jelly.setNumber(value);
                    var m = (position % 2) ? -1 : 1;
                    jelly.x = (positions[position][0] * defaultWidth - defaultWidth / 2) * 1.2;
                    jelly.y = positions[position][1] * -200 + 550;
                    jelly.scaleX = jelly.scaleY = 1 - positions[position][1] / 4;
                    //play JellySound
                    gameui.AudioManager.playSound('sound_s' + (Math.floor(Math.random() * 3) + 1), null, 400);
                };
                return JellyLobby;
            })(createjs.Container);
            view.JellyLobby = JellyLobby;
        })(view = menus.view || (menus.view = {}));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=JellyLobby.js.map