module joinjelly {
    export class Jellypedia extends gameui.ScreenState {


        constructor(userData: UserData, jellyInfos) {
            super();
            this.createContent(userData.getLastJelly(), jellyInfos);
        }

        private createContent(lastJelly: number, jellyInfos: Array<any>) {

            // add Background
            this.background.addChild(gameui.AssetsManager.getBitmap("backhome"));
            var bg = gameui.AssetsManager.getBitmap('BigBG');
            this.content.addChild(bg);
            bg.x = (defaultWidth - 1463) / 2;
            bg.y = (defaultHeight - 1788) / 2;

            // add Title
            var title = gameui.AssetsManager.getBitmapText(StringResources.menus.jellypedia.toUpperCase(), "debussy");
            this.content.addChild(title);
            title.y = bg.y+50;
            title.x = defaultWidth/2;
            title.regX = title.getBounds().width / 2;
            title.scaleX = title.scaleY = 1.5;

            // add jelly items
            var itensContainer = new createjs.Container();
            this.content.addChild(itensContainer);
            itensContainer.y = 400;
            var index = 0;
            for (var j = 1; j < 8192; j *= 2) {
                if (j <= lastJelly)
                    var pi = new menus.view.JellyPediaItem(j, jellyInfos[j].name, jellyInfos[j].description);
                else
                    var pi = new menus.view.JellyPediaItem(0, "?", "");
                itensContainer.addChild(pi);
                pi.y = 500 * index;
                pi.x = 150;
                index++;
            }

            var g = new createjs.Graphics().f("rgb(254,254,254)").p("EALkCFSYAAomAAocAAomYAAgUAKgUAAgUYAAjwgKjwAKj6YAKi+AKi+AAi+YAKjwAKjmAKjwYAKiMAKiWAKiMYAylUB4lADIkiYEYmaFykEH0hQYDcgeDcgeDcgeYAKAAAAAAAKAAYAAAogKAoAAAoYAABuAKBkgKBuYgKC0AACqAAC0YgKCMA8BuBuBaYBkBQB4AUB4AAcArmAAAArmAAAArmAAAYAUAAAKAAAUAAYEOgKC+i+gKkOYAAiCAAh4AAh4YgKi+gKi+AAi+YAeAAAeAAAeAAYAKAAAKAKAUAAYDSAUDIAeDSAoYFUA8EiCgDwDwYCgCqCCDIBkDcYBuDmBGDwAUEEYAKCCAKB4AACCYAKDwAKDwAUDwYAABQgKBQAUBQYAAA8AAAyAAA8YgKAyAAA8AAAyYgKIIAKH+gKIIYAACqAACqAAC0YgKD6gKD6AAD6YgKC0AAC0AAC0YgUGQgKGGgKGQYgKC+gKDIAAC+YgUEigKEsgKEiYgKCqgKCqgKCqYgKD6gKDwgKD6YgKDcgUDcgKDmYgKDSgKDSgKDSYgKDcgUDcgKDcYgKC+gKDIgKC+YgKCWAACWgyCMYgoB4geB4gyB4YiWFKjIEYkYDcYjSCgjmBukYAKYi0AKi+AKi+AKYjSAKjSAAjSAKYiMAKiMgKiMAKYi0AKi0AAi0AAYnCAAnCAUnMgKYhaAAhQAAhaAAYgUAAgUAAgUAKYywAAy6AAywAAYgUAAgKgKgUAAYlyAAlyAAlygKYiCAAiCAAiCgKYkEAAkOgKkEgKYiqgKigAAiqgKYg8AAhGgKhGgUYjwg8i+iCi0igYiWiMhuiWhuigYiMjmhaj6g8kEYgeh4AKh4gKh4YgKjSgKjSgKjSYgUjmgKjwgKjmYgKkEgKj6gKkEYgKk2gUk2gKk2YgKjmAAjcgKjmYgKmkgUmkgKmkYgKlKAAlKgKlUYAAj6gKkEAAj6YAAjSAAjcAAjSYAAgUgKgKAAgU").cp().ef();
              var s = new createjs.Shape(g);
            itensContainer.mask = s
            this.content.addChild(itensContainer);

            // add ok button
            var okButton = new gameui.ImageButton("GameOverOk", () => { joinjelly.JoinJelly.showMainMenu() });
            okButton.x = defaultWidth / 2;
            okButton.y = defaultHeight - 200;
            this.content.addChild(okButton);

            // add scrool event
            var last;
            this.content.addEventListener("pressmove", function (evt: createjs.MouseEvent) {

                if (!last) last = evt.localY;
                itensContainer.y += evt.localY - last;
                if (itensContainer.y > 400) itensContainer.y = 400;
                if (itensContainer.y < -4698) itensContainer.y = -4698;
                last = evt.localY;


            });
            this.content.addEventListener("pressup", function (evt: createjs.MouseEvent) {
                last = null;
            });


        }
    }
}