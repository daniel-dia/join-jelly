module joinjelly.menus.view {

    export class JellyLobby extends createjs.Container{
        constructor(lastJelly:number) {
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
                    this.dropJelly(p*= 2, i);
                    i++
                }, j * 200);

        }

        //adds a single jelly to the container
        private dropJelly(value: number,position:number) {
            var jelly = new gameplay.view.Tile(0, 0, 500);

            // adds jelly
            this.addChildAt(jelly,0);
            jelly.setNumber(value);

            jelly.x = ((position) * 1120) //* (14 - position) / 10;;

            jelly.x = jelly.x % defaultWidth*.6666   - defaultWidth/3

            jelly.y = 40*(14 - position);
            jelly.scaleX = jelly.scaleY = (1 - position / 15);

            //play JellySound
            createjs.Sound.play('s' + (Math.floor(Math.random() * 3) + 1), null, 400);


        }
    }
}