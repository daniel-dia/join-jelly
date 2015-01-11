module joinjelly.menus.view {

    export class JellyLobby extends createjs.Container{

        constructor(lastJelly: number) {
            super();

            // drop all jellies
            this.dropAllJellys(lastJelly);
        }
        
        //add all jellys to the container
        
        private dropAllJellys(lastJelly: number) {
            
            // set a default value to the last jelly
            if (!lastJelly) lastJelly = 1;
            

            // calculate all jellys already unlocked
            var jellys: Array<number> = new Array();
            for (var j = 1; j <= lastJelly; j*=2)
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
                [2 / 4, 0],//1
                [3 / 4, 0.2],//2
                [1 / 4, 0.2],//3

                [2 / 5, 1],//4
                [3 / 5, 1],//5
                [1 / 5, 1.2],//6
                [4 / 5, 1.2],//7

                [1 / 6, 2.3],//8
                [2 / 6, 2],//9
                [4 / 6, 2],//10
                [5 / 6, 2.3],//11

                
                [1 / 4, 2.6],//12
                [3 / 4, 2.6],//13
                [2 / 4, 3],//14
            ]
            var jelly = new gameplay.Tile(0, 0, 500);

            // adds jelly
            this.addChildAt(jelly,0);
            jelly.setNumber(value);

            var m = (position % 2)? -1:1;

            jelly.x = (positions[position][0] * defaultWidth - defaultWidth/2)*1.2;
            jelly.y = positions[position][1] * -200 + 550;
            
            jelly.scaleX = jelly.scaleY = 1 - positions[position][1] / 4 ;

            //play JellySound
            gameui.AssetsManager.playSound('sound_s' + (Math.floor(Math.random() * 3) + 1), null, 400);
            


        }
    }
}
