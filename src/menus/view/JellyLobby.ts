module joinjelly.menus.view {

    export class JellyLobby extends createjs.Container {

        constructor(lastJelly: number) {
            super();

            // drop all jellies
            this.dropAllJellys(lastJelly);
        }
        
        //add all jellys to the container
        
        private dropAllJellys(lastJelly: number) { 

            // set a default value to the last jelly
            if (!lastJelly) lastJelly = 1;
            if (lastJelly > JoinJelly.maxJelly) lastJelly = JoinJelly.maxJelly

            // calculate all jellys already unlocked
            var jellys: Array<number> = new Array();
            for (var j = 1; j <= lastJelly; j *= 2)
                jellys.push(j)

            var i = 0;
            var p = 1;
            for (var j = 0; j < jellys.length; j++)
                setTimeout(() => {
                    this.dropJelly(p, i);
                    i++;
                    p *= 2;
                }, j * 200);

        }

        //adds a single jelly to the container
        private dropJelly(value: number, position: number) {

            var positions = [
                [3 / 6, 0],//1

                [2 / 6, 0.2],//2
                [4 / 6, 0.2],//3
                [1 / 6, 0.4],//2
                [5 / 6, 0.4],//3

                [2 / 5, 1],//4
                [3 / 5, 1],//5
                [1 / 5, 1.7],//6
                [4 / 5, 1.7],//7

                [1 / 6, 3],//8
                [2 / 6, 2.4],//9
                [4 / 6, 2.4],//10
                [5 / 6, 3],//11

                
                [2 / 7, 3.3],//12
                [3 / 7, 2.9],//13 
                [4 / 7, 3.1],//15
                [5 / 7, 3.3],//14
        
        
            ]
            var jelly = new gameplay.view.Jelly(); //gameplay.Tile(0, 0, 450);

            // adds jelly
            this.addChildAt(jelly, 0);
            jelly.setNumber(value);

            var m = (position % 2) ? -1 : 1;

            jelly.x = (positions[position][0] * defaultWidth - defaultWidth / 2) * 1.2;
            jelly.y = positions[position][1] * -200 + 750;

            jelly.scaleX = jelly.scaleY = Math.min(1 - positions[position][1] / 7, 1);
           
            //play JellySound
            gameui.AudiosManager.playSound('sound_s' + (Math.floor(Math.random() * 3) + 1), null, 400);



        }
    }
}
