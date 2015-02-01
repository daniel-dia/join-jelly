﻿module joinjelly.menus.view {

    export class JellyPediaItem extends createjs.Container {
        constructor(value: number, title: string, description: string) {
            super();

            // Add Background
            var bg = gameui.ImagesManager.getBitmap("pediaItem")
            this.addChild(bg);

            // Add Texts
            var tContainer = new createjs.Container();
            var titleObj = gameui.ImagesManager.getBitmapText(title, "debussy");
            var descriptionObj = gameui.ImagesManager.getBitmapText(description, "debussy");
            titleObj.y = 30;
            descriptionObj.y = 130;
            titleObj.scaleX = titleObj.scaleY = 1.2;
            descriptionObj.scaleX = descriptionObj.scaleY = 0.9;
            titleObj.x = descriptionObj.x = 450;
            tContainer.addChild(titleObj);
            tContainer.addChild(descriptionObj);
            this.addChild(tContainer);
            tContainer.cache(450, 0, 1000, 356);

            // Add Jelly
            var j = new gameplay.view.Jelly();
            j.setNumber(value);
            j.x = 332 / 2;
            j.y = 332;
            j.scaleX = j.scaleY = 1.4;
            this.addChild(j);
        }
    }
}