declare var lib;

module joinjelly {
    export class StoryScreen extends gameui.ScreenState{

        constructor() {
            super();
			var intro: createjs.MovieClip = <createjs.MovieClip>new lib.Intro3();

            this.content.addChild(intro);
			intro.play();
			intro.loop = false;
			intro.addEventListener("click",() => {
				JoinJelly.startTutorial();
			});

			intro.addEventListener("complete",() => {
				JoinJelly.startTutorial();
			})
        }
    }
}