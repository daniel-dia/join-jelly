module fpair.menus.view {

    export class JellyLobby extends createjs.Container{
        constructor(lastJelly:number) {
            super();


            this.dropAllJellys(lastJelly);
        }


        //add all jellys to the container
        private dropAllJellys(lastJelly: number) {
            // set a default value to the last jelly
            if (!lastJelly) lastJelly = 1;

            // calculate all jellys already unlocked
            var jellys: Array<number> = new Array();
            for (var j = 1; j <= lastJelly; j *= 2)
                jellys.push(j)

            for (var j = 0; j < jellys.length; j++)
                this.dropJelly(jellys[j], j);

        }

        //adds a single jelly to the container
        private dropJelly(value: number,position:number) {
            var jelly = new gameplay.view.Jelly(0, 0, 500);

            // adds jelly
            this.addChildAt(jelly,0);
            jelly.setNumber(value);

            if(position%2==0)
                jelly.x = position * 120;
            else
                jelly.x = -1 * (position+1) * 120;

            jelly.y = 40*(14 - position);
            jelly.scaleX = jelly.scaleY = 1-position/10;


        }
    }
}