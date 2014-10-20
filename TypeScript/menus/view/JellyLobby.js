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
                    for (var j = 0; j < jellys.length; j++)
                        setTimeout(function (j) {
                            _this.dropJelly(jellys[j], j);
                        }, j * 200, j);
                };
                //adds a single jelly to the container
                JellyLobby.prototype.dropJelly = function (value, position) {
                    var jelly = new joinjelly.gameplay.view.Tile(0, 0, 500);
                    // adds jelly
                    this.addChildAt(jelly, 0);
                    jelly.setNumber(value);
                    jelly.x = ((position) * 1120); //* (14 - position) / 10;;
                    jelly.x = jelly.x % defaultWidth * .6666 - defaultWidth / 3;
                    jelly.y = 40 * (14 - position);
                    jelly.scaleX = jelly.scaleY = (1 - position / 15);
                    //play JellySound
                    createjs.Sound.play('s' + (Math.floor(Math.random() * 3) + 1), null, 400);
                };
                return JellyLobby;
            })(createjs.Container);
            view.JellyLobby = JellyLobby;
        })(view = menus.view || (menus.view = {}));
    })(menus = joinjelly.menus || (joinjelly.menus = {}));
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=JellyLobby.js.map