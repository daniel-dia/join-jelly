module joinjelly {
    export class StoreMenu extends ScrollablePage{
        private previousScreen: gameui.ScreenState;

        constructor(previousScreen: gameui.ScreenState) {
            super(StringResources.store.title);
            this.previousScreen = previousScreen;


        }
    }
}