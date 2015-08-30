declare var debussyFont;
declare var debussyFontBig;
declare var imageManifest;
declare var audioManifest;
declare var WPAudioManager;

declare function createSpriteSheetFromFont(font: any, path: string);

module joinjelly.menus {

    export class DevTest extends gameui.ScreenState {

        constructor() {
            super();

            var ri = new gameplay.view.RandomItemSelector();

            this.content.addChild(ri);
            ri.x = defaultWidth / 2;
            ri.y = defaultHeight / 2;
            setTimeout(() => { ri.random(); }, 1000);


        }
    }
}
