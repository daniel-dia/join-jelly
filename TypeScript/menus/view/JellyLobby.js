var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var fpair;
(function (fpair) {
    (function (menus) {
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
                    var jelly = new fpair.gameplay.view.Tile(0, 0, 500);

                    // adds jelly
                    this.addChildAt(jelly, 0);
                    jelly.setNumber(value);

                    // set jelly positions and scale
                    if (position % 2 == 0)
                        jelly.x = position * 120;
                    else
                        jelly.x = -1 * (position + 1) * 120;
                    jelly.y = 40 * (14 - position);
                    jelly.scaleX = jelly.scaleY = 1 - position / 10;

                    //play JellySound
                    createjs.Sound.play('s' + (Math.floor(Math.random() * 3) + 1), null, 400);
                };
                return JellyLobby;
            })(createjs.Container);
            view.JellyLobby = JellyLobby;
        })(menus.view || (menus.view = {}));
        var view = menus.view;
    })(fpair.menus || (fpair.menus = {}));
    var menus = fpair.menus;
})(fpair || (fpair = {}));
//# sourceMappingURL=JellyLobby.js.map
