module joinjelly {
    export class Jellypedia extends ScrollablePage {

        constructor(userData: UserData, jellyInfos) {
            super(StringResources.menus.jellypedia);
           
            // add jelly items
            var itensContainer = new PIXI.Container();
            this.scrollableContent.addChild(itensContainer);
            itensContainer.y = 400;

          
            var index = 0;
            for (var j = 1; j <= JoinJelly.maxJelly; j *= 2) {
                if (j <= Math.max(1, userData.getLastJelly())) {
                    var pi = new menus.view.JellyPediaItem(j, jellyInfos[j].name, jellyInfos[j].description);
                    itensContainer.addChild(pi);
                    pi.mouseEnabled = false; 
                    pi.y = 500 * index;
                    pi.x = 150;
                }
                else {
                    var pi = new menus.view.JellyPediaItem(0, "?", "");
                    itensContainer.addChild(pi);
                    pi.mouseEnabled = false; 
                    pi.y = 500 * index;
                    pi.x = 150;
                }
             
                index++;
            }
            this.maxScroll = 7300;
        }
    }
}