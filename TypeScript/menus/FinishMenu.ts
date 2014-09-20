
class FinishMenu extends gameui.ui.MenuContainer {

    constructor(score:number,highScore:number) {
        super();

        this.addLabel("Game Over");
                
        this.addLabel("Your Score: " + score.toString());
        this.addLabel("Your Best: " + highScore.toString());
        
        this.addButton("Share", () => { this.dispatchEvent("share") });
        this.addButton("Continue", () => { this.dispatchEvent("continue") });
        
    }

} 