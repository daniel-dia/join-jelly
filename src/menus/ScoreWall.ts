//module joinjelly.menus {
//    export class ScoreWall extends ScrollablePage {

//        protected scrollableContent: createjs.Container;
//        protected maxScroll: number = 1700;
//        public okButtonAction: () => void;

   
//        constructor() {
//            super(StringResources.menus.about);

//            // pega o device ID
//            this.deviceId = localStorage.getItem("deviceID");
//            if(this.deviceId)

//        }
//    }

//    class ScoreItem extends createjs.Container {
//        constructor(name:string, score:number) {
//            super();
//            var nameTx = gameui.ImagesManager.getBitmapText(name, "deburil");
//            var scoreTx = gameui.ImagesManager.getBitmapText(score.toString(), "deburil");

//            this.addChild(nameTx);
//            this.addChild(scoreTx);

//            scoreTx.x = 500;
//        }
//    }
//}