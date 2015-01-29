var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var joinjelly;
(function (joinjelly) {
    var ScrollablePage = (function (_super) {
        __extends(ScrollablePage, _super);
        function ScrollablePage(title) {
            _super.call(this);
            this.maxScroll = 1700;
            this.addBackground(title);
            this.addScrollableArea();
            this.addButton();
        }
        ScrollablePage.prototype.addBackground = function (title) {
            // add Background
            this.background.addChild(gameui.ImagesManager.getBitmap("backhome"));
            var bg = gameui.ImagesManager.getBitmap('BigBG');
            bg.mouseEnabled = true;
            this.content.addChild(bg);
            bg.x = (defaultWidth - 1463) / 2;
            bg.y = (defaultHeight - 1788) / 2;
            // add Title
            var titleObj = gameui.ImagesManager.getBitmapText(title.toUpperCase(), "debussy");
            this.content.addChild(titleObj);
            titleObj.y = bg.y + 50;
            titleObj.x = defaultWidth / 2;
            titleObj.regX = titleObj.getBounds().width / 2;
            titleObj.scaleX = titleObj.scaleY = 1.5;
        };
        ScrollablePage.prototype.addScrollableArea = function () {
            var _this = this;
            var scrollContent = new createjs.Container();
            var ScrollArea = new createjs.Container();
            this.content.addChild(ScrollArea);
            ScrollArea.addChild(scrollContent);
            this.scrollableContent = scrollContent;
            var mask = new createjs.Shape(new createjs.Graphics().f("rgb(254,254,254)").p("EALkCFSYAAomAAocAAomYAAgUAKgUAAgUYAAjwgKjwAKj6YAKi+AKi+AAi+YAKjwAKjmAKjwYAKiMAKiWAKiMYAylUB4lADIkiYEYmaFykEH0hQYDcgeDcgeDcgeYAKAAAAAAAKAAYAAAogKAoAAAoYAABuAKBkgKBuYgKC0AACqAAC0YgKCMA8BuBuBaYBkBQB4AUB4AAcArmAAAArmAAAArmAAAYAUAAAKAAAUAAYEOgKC+i+gKkOYAAiCAAh4AAh4YgKi+gKi+AAi+YAeAAAeAAAeAAYAKAAAKAKAUAAYDSAUDIAeDSAoYFUA8EiCgDwDwYCgCqCCDIBkDcYBuDmBGDwAUEEYAKCCAKB4AACCYAKDwAKDwAUDwYAABQgKBQAUBQYAAA8AAAyAAA8YgKAyAAA8AAAyYgKIIAKH+gKIIYAACqAACqAAC0YgKD6gKD6AAD6YgKC0AAC0AAC0YgUGQgKGGgKGQYgKC+gKDIAAC+YgUEigKEsgKEiYgKCqgKCqgKCqYgKD6gKDwgKD6YgKDcgUDcgKDmYgKDSgKDSgKDSYgKDcgUDcgKDcYgKC+gKDIgKC+YgKCWAACWgyCMYgoB4geB4gyB4YiWFKjIEYkYDcYjSCgjmBukYAKYi0AKi+AKi+AKYjSAKjSAAjSAKYiMAKiMgKiMAKYi0AKi0AAi0AAYnCAAnCAUnMgKYhaAAhQAAhaAAYgUAAgUAAgUAKYywAAy6AAywAAYgUAAgKgKgUAAYlyAAlyAAlygKYiCAAiCAAiCgKYkEAAkOgKkEgKYiqgKigAAiqgKYg8AAhGgKhGgUYjwg8i+iCi0igYiWiMhuiWhuigYiMjmhaj6g8kEYgeh4AKh4gKh4YgKjSgKjSgKjSYgUjmgKjwgKjmYgKkEgKj6gKkEYgKk2gUk2gKk2YgKjmAAjcgKjmYgKmkgUmkgKmkYgKlKAAlKgKlUYAAj6gKkEAAj6YAAjSAAjcAAjSYAAgUgKgKAAgU").cp().ef());
            ScrollArea.mask = mask;
            // add scroll event
            var targetY = 0;
            var last;
            this.content.addEventListener("pressmove", function (evt) {
                if (!last)
                    last = evt.localY;
                targetY += (evt.localY - last) * 1.3;
                if (targetY > 400)
                    targetY = 400;
                if (targetY < -_this.maxScroll)
                    targetY = -_this.maxScroll;
                last = evt.localY;
            });
            this.content.addEventListener("pressup", function (evt) {
                last = null;
            });
            this.content.addEventListener("tick", function () {
                ScrollArea.y = (ScrollArea.y * 2 + targetY) / 3;
            });
        };
        ScrollablePage.prototype.addButton = function () {
            var _this = this;
            // add ok button
            var okButton = new gameui.ImageButton("BtOk", function () {
                if (_this.okButtonAction)
                    _this.okButtonAction();
                else
                    joinjelly.JoinJelly.showMainMenu();
            });
            okButton.x = defaultWidth / 2;
            okButton.y = defaultHeight - 200;
            this.content.addChild(okButton);
        };
        return ScrollablePage;
    })(gameui.ScreenState);
    joinjelly.ScrollablePage = ScrollablePage;
})(joinjelly || (joinjelly = {}));
//# sourceMappingURL=ScrollabePage.js.map