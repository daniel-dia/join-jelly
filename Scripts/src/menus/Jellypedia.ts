module joinjelly {
    export class Jellypedia extends ScrollablePage {

  
        constructor(userData: UserData, jellyInfos) {
            super(StringResources.menus.jellypedia);
           
            // add jelly items
            var itensContainer = new createjs.Container();
            this.scrollableContent.addChild(itensContainer);
            itensContainer.y = 400;
            var index = 0;
            for (var j = 1; j <= 8192; j *= 2) {
                if (j <=  Math.max(1,userData.getLastJelly()))
                    var pi = new menus.view.JellyPediaItem(j, jellyInfos[j].name, jellyInfos[j].description);
                else
                    var pi = new menus.view.JellyPediaItem(0, "?", "");
                itensContainer.addChild(pi);
                pi.y = 500 * index;
                pi.x = 150;
                index++;
            }
            this.maxScroll = 5700;
        }
  
    }
}