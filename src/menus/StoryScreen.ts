declare var lib;

module joinjelly {
    export class StoryScreen extends gameui.ScreenState{

        constructor() {
            super();
			var intro: createjs.MovieClip = <createjs.MovieClip>new lib.Intro2();

            this.content.addChild(intro);
			intro.play();

			setTimeout(() => {
				JoinJelly.startTutorial();
			}, 19000);
        }
    }
}