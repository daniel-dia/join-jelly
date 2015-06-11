module joinjelly.gameplay.view {

    export class CountDown extends createjs.Container {

        public countDown(total: number = 3) {

            // initialize
            var ns: Array<createjs.DisplayObject> = []
            var time = 1000;
            var transition = 200;
            setTimeout(() => { gameui.AudiosManager.playSound("Interface Sound-12"); }, time * total + transition)

            for (var n = total; n > 0; n--) {
			
                //create and add child
                ns[n] = gameui.AssetsManager.getBitmap("n" + n);
                this.addChild(ns[n]);
                
                //centralize number
                ns[n].regX = ns[n].getBounds().width / 2;
                ns[n].regY = ns[n].getBounds().height / 2;
                ns[n].mouseEnabled = false;

                //make animation
                createjs.Tween.get(ns[n])
                    .to({ scaleX: 2, scaleY: 2, alpha: 0 })
                    .wait((total - n) * time)
                    .to({ scaleX: 1, scaleY: 1, alpha: 1 }, transition, createjs.Ease.quadOut)
                    .call(() => { gameui.AudiosManager.playSound("Interface Sound-13"); })
                    .wait(time - transition)
                    .to({ alpha: 0, scaleX: 0.5, scaleY: 0.5 }, transition, createjs.Ease.quadIn)
                    .call((obj: createjs.DisplayObject) => { this.removeChild(obj) });
            }

        }

    }
}