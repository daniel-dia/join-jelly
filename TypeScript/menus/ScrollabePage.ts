﻿module joinjelly {
    export class ScrollablePage extends gameui.ScreenState {

        protected scrollableContent: createjs.Container;
        protected maxScroll: number = 1000;

        constructor(title:string) {
            super();
            this.addBackground(title);
            this.addScrollableArea();
            this.addButton();
 
        }

        private addBackground(title:string) {
            // add Background
            this.background.addChild(gameui.AssetsManager.getBitmap("backhome"));
            var bg = gameui.AssetsManager.getBitmap('BigBG');
            this.content.addChild(bg);
            bg.x = (defaultWidth - 1463) / 2;
            bg.y = (defaultHeight - 1788) / 2;

            // add Title
            var titleObj = gameui.AssetsManager.getBitmapText(title.toUpperCase(), "debussy");
            this.content.addChild(titleObj);
            titleObj.y = bg.y + 50;
            titleObj.x = defaultWidth / 2;
            titleObj.regX = titleObj.getBounds().width / 2;
            titleObj.scaleX = titleObj.scaleY = 1.5;

        }

 
        private addScrollableArea() {
            var scrollContent = new createjs.Container();
            var ScrollArea = new createjs.Container();
            this.content.addChild(ScrollArea);
            ScrollArea.addChild(scrollContent);

            this.scrollableContent = scrollContent;


            var g = new createjs.Graphics().f("rgb(254,254,254)").p("EALkCFSYAAomAAocAAomYAAgUAKgUAAgUYAAjwgKjwAKj6YAKi+AKi+AAi+YAKjwAKjmAKjwYAKiMAKiWAKiMYAylUB4lADIkiYEYmaFykEH0hQYDcgeDcgeDcgeYAKAAAAAAAKAAYAAAogKAoAAAoYAABuAKBkgKBuYgKC0AACqAAC0YgKCMA8BuBuBaYBkBQB4AUB4AAcArmAAAArmAAAArmAAAYAUAAAKAAAUAAYEOgKC+i+gKkOYAAiCAAh4AAh4YgKi+gKi+AAi+YAeAAAeAAAeAAYAKAAAKAKAUAAYDSAUDIAeDSAoYFUA8EiCgDwDwYCgCqCCDIBkDcYBuDmBGDwAUEEYAKCCAKB4AACCYAKDwAKDwAUDwYAABQgKBQAUBQYAAA8AAAyAAA8YgKAyAAA8AAAyYgKIIAKH+gKIIYAACqAACqAAC0YgKD6gKD6AAD6YgKC0AAC0AAC0YgUGQgKGGgKGQYgKC+gKDIAAC+YgUEigKEsgKEiYgKCqgKCqgKCqYgKD6gKDwgKD6YgKDcgUDcgKDmYgKDSgKDSgKDSYgKDcgUDcgKDcYgKC+gKDIgKC+YgKCWAACWgyCMYgoB4geB4gyB4YiWFKjIEYkYDcYjSCgjmBukYAKYi0AKi+AKi+AKYjSAKjSAAjSAKYiMAKiMgKiMAKYi0AKi0AAi0AAYnCAAnCAUnMgKYhaAAhQAAhaAAYgUAAgUAAgUAKYywAAy6AAywAAYgUAAgKgKgUAAYlyAAlyAAlygKYiCAAiCAAiCgKYkEAAkOgKkEgKYiqgKigAAiqgKYg8AAhGgKhGgUYjwg8i+iCi0igYiWiMhuiWhuigYiMjmhaj6g8kEYgeh4AKh4gKh4YgKjSgKjSgKjSYgUjmgKjwgKjmYgKkEgKj6gKkEYgKk2gUk2gKk2YgKjmAAjcgKjmYgKmkgUmkgKmkYgKlKAAlKgKlUYAAj6gKkEAAj6YAAjSAAjcAAjSYAAgUgKgKAAgU").cp().ef();
            var s = new createjs.Shape(g);
            ScrollArea.mask = s

            // add scroll event
            var last;
            this.content.addEventListener("pressmove", (evt: createjs.MouseEvent) => {
                if (!last) last = evt.localY;
                ScrollArea.y += evt.localY - last;
                if (ScrollArea.y > 400) ScrollArea.y = 400;
                if (ScrollArea.y < -this.maxScroll) ScrollArea.y = -this.maxScroll;
                last = evt.localY;
            });

            this.content.addEventListener("pressup", (evt: createjs.MouseEvent) => {
                last = null;
            });

        }

        private addButton() {
            // add ok button
            var okButton = new gameui.ImageButton("GameOverOk", () => { joinjelly.JoinJelly.showMainMenu() });
            okButton.x = defaultWidth / 2;
            okButton.y = defaultHeight - 200;
            this.content.addChild(okButton);

        }
    }
}