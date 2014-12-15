var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameui;
(function (gameui) {
    //this class alow user to arrange objects in a grid forrmat
    //the anchor point is the center of object
    var Grid = (function (_super) {
        __extends(Grid, _super);
        function Grid(cols, rows, width, height, padding, flowHorizontal) {
            if (typeof padding === "undefined") { padding = 0; }
            _super.call(this);
            //provided variables
            this.flowHorizontal = false;
            //control variables;
            this.currentCol = 0;
            this.currentRow = 0;

            //define the variables
            this.flowHorizontal = flowHorizontal;
            this.cols = cols;
            this.rows = rows;
            this.padding = padding;
            this.width = width;
            this.height = height;

            //define other parameters
            this.wSpacing = (width - padding * 2) / cols;
            this.hSpacing = (height - padding * 2) / rows;
        }
        //place objecrs into a grid format
        Grid.prototype.addObject = function (object) {
            this.addChild(object);
            object.x = this.getXPos();
            object.y = this.getYPos();
            this.updatePosition();
        };

        Grid.prototype.getXPos = function () {
            return this.padding + this.currentCol * this.wSpacing + this.wSpacing / 2;
        };
        Grid.prototype.getYPos = function () {
            return this.padding + this.currentRow * this.hSpacing + this.hSpacing / 2;
        };

        //define next Item position
        Grid.prototype.updatePosition = function () {
            if (!this.flowHorizontal) {
                this.currentCol++;
                if (this.currentCol >= this.cols) {
                    this.currentCol = 0;
                    this.currentRow++;
                }
            } else {
                this.currentRow++;
                if (this.currentRow >= this.rows) {
                    this.currentRow = 0;
                    this.currentCol++;
                }
            }
        };
        return Grid;
    })(gameui.UIItem);
    gameui.Grid = Grid;
})(gameui || (gameui = {}));
//# sourceMappingURL=Grid.js.map
