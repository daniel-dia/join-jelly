class Tile extends createjs.Container{

    private value: number = 0;
    private highlightShape: createjs.Shape;
    private background: createjs.Shape;
    private imageContainer: createjs.Container;
    private shadowContainer: createjs.Container;

    public id: number;

    private tileSize: number;
    public posx: number;
    public posy: number;

    public locked: boolean;

    private shadowSizes = [0.3, 0.35, 0.4, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]

    constructor(posx: number, posy: number, tileSize: number) {
        
        super();

        this.tileSize = tileSize;
        this.posx = posx;
        this.posy = posy;

        //set name
        this.name = (posx + "-" + posy)
                       
        //addObjects
        this.addObjects(tileSize);

        this.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("000").drawRect(0, 0, tileSize, tileSize));
        
    }

    private addObjects(tileSize: number) {

        this.regX = this.regY = tileSize / 2;

        this.shadowContainer = new createjs.Container();
        var shadow = new createjs.Shape(new createjs.Graphics().beginFill("rgba(0,0,0,0.3)").drawCircle(0, 0, tileSize));
        shadow.scaleY = 0.4 * 0.3;
        shadow.scaleX = 0.3;
        shadow.y = tileSize;
        this.shadowContainer.x = tileSize/ 2;
        this.shadowContainer.addChild(shadow);

        this.imageContainer = new createjs.Container();
        
        //this.imageContainer.regY = tileSize;
        //this.imageContainer.regX = tileSize / 2;
        
        this.imageContainer.x = tileSize / 2;
        this.imageContainer.y = tileSize

        this.addChild(this.shadowContainer);
        this.addChild(this.imageContainer);     
           
    }

    public getNumber(): number {
        return this.value;
    }

    public setNumber(value: number) {

        //value logic
        this.value = value;

        this.imageContainer.removeAllChildren();

        if (value == 0) {
            this.mouseEnabled = false;
            this.shadowContainer.visible = false;
        }
        else {
            this.mouseEnabled = true;
            this.shadowContainer.visible = true;            
            
            var img = new createjs.Bitmap("assets/" + value + ".png");
            img.scaleX = img.scaleY = this.tileSize / (220);

            img.image.onload = () => {
                img.regX = img.image.width / 2;
                img.regY = img.image.height;
            }
            this.imageContainer.addChild(img);

            var eye = new createjs.Bitmap("assets/eyes.png");
            eye.regX = 133 / 2;
            eye.scaleX = eye.scaleY = img.scaleX *0.7
            eye.y = -80;
            this.imageContainer.addChild(eye)
        }

        
        this.executeAnimationIn();
    }
    
    //#region animations =============================================

    

    private restore() {
        createjs.Tween.removeTweens(this.imageContainer);
        createjs.Tween.removeTweens(this.shadowContainer);
        this.imageContainer.scaleX = this.imageContainer.scaleY = 1;
        this.imageContainer.rotation = 0;
        this.imageContainer.skewX = this.imageContainer.skewY = 0;
        this.shadowContainer.skewX = this.shadowContainer.skewY = 0;
    }

    private animation1() {
        this.restore();
        createjs.Tween.get(this.imageContainer)
            .to({skewX: 10 }, 2000, createjs.Ease.elasticOut)
            .to({skewX: -10}, 2000, createjs.Ease.getElasticInOut(10, 10))
            .to({skewX: 0  }, 2000, createjs.Ease.elasticOut);
}

    private executeAnimationIn() {
        this.restore();
        this.imageContainer.set(
            {
                alpha: 0,
                scaleX: 0,
                scaleY:0,
            });

        this.shadowContainer.set(
            {
                alpha: 0,
                scaleX: 0,
            });

        createjs.Tween.get(this.imageContainer)
            .to({ alpha: 1, scaleX: 0.8, scaleY: 1.2 }, 200, createjs.Ease.sineOut)
            .to({ scaleX: 1, scaleY: 1 }, 2000, createjs.Ease.elasticOut).call(() => {

                this.executeIdle1();

            });
        createjs.Tween.get(this.shadowContainer)
            .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200, createjs.Ease.sineOut);

    
    }

    public executeAnimationHold() {
        this.restore();
        createjs.Tween.get(this.imageContainer)
            .to({
                scaleX: 0.8,
                scaleY: 1.2
            }, 1000, createjs.Ease.elasticOut)

        createjs.Tween.get(this.shadowContainer).to({ alpha: 0 }, 200);
    }
    
    public executeAimationRelease() {
    this.restore();
        createjs.Tween.get(this.imageContainer)
            .to({
                scaleX: 0.8,
                scaleY: 1.2
            }, 5, createjs.Ease.sineInOut)
        //.to({ scaleY: 0.7, scaleX: 1.3 }, 200, createjs.Ease.sineInOut)
            .to({
                scaleX: 1,
                scaleY: 1
            }, 2000, createjs.Ease.elasticOut).call(() => {
                this.executeIdle1();
            });

        createjs.Tween.get(this.shadowContainer).to({ alpha: 1 }, 200);
}

    public executeAnimationMatch(x, y) {
    }

    private executeAnimation3() {
        this.restore();
        createjs.Tween.get(this.imageContainer)

            .to({
                scaleY: 0.7,
                scaleX: 1.3
            }, 2000, createjs.Ease.elasticOut)
            .to({
                scaleX: 1,
                scaleY: 1
            }, 2000, createjs.Ease.elasticOut);
    }

    private executeAnimation4() {
        this.restore();
        createjs.Tween.get(this.imageContainer)
            .to({
                scaleX: 0.8,
                scaleY: 1.2
            }, 200, createjs.Ease.sineOut)
            .to({
                scaleX: 1,
                scaleY: 1
            }, 2000, createjs.Ease.elasticOut);
    }

    private executeIdle1() {
        
        var f = Math.random()*500 + 600;
        var skew = Math.random();
        if (skew < 0.6) skew = skew / 2;

        var scale = Math.random();
        //if (scale < 0.6) scale = scale / 2;
        scale = scale / 10;


        createjs.Tween.get(this.imageContainer).to({
            skewX: 0,
            scaleX: 1 + scale,
            scaleY: 1 - scale
        }, 400, createjs.Ease.quadInOut).call(() => {

            createjs.Tween.get(this.imageContainer, { loop: true })
                .to({ skewX: skew*10 }, f , createjs.Ease.  quadOut)
                .to({ skewX: skew*0 }, f , createjs.Ease.   quadIn)
                .to({ skewX: skew*-10 }, f , createjs.Ease.quadOut)
                .to({ skewX: skew*0 }, f , createjs.Ease.   quadIn);

            createjs.Tween.get(this.imageContainer, { loop: true })
                .to({ scaleX: 1-scale, scaleY: 1+scale }, f , createjs.Ease.quadInOut)
                .to({ scaleX: 1+scale, scaleY: 1-scale }, f , createjs.Ease.quadInOut)
                .to({ scaleX: 1-scale, scaleY: 1+scale }, f , createjs.Ease.quadInOut)
                .to({ scaleX: 1+scale, scaleY: 1-scale }, f , createjs.Ease.quadInOut);
        });


         
        createjs.Tween.get(this.shadowContainer).to({ alpha: 1, scaleY: 1, scaleX: 1, skewX: 0}, 400, createjs.Ease.quadInOut).call(() => {

            createjs.Tween.get(this.shadowContainer, { loop: true })
                .to({ skewX: -5 * skew }, f, createjs.Ease.quadOut)
                .to({ skewX: 0  * skew }, f, createjs.Ease.quadIn)
                .to({ skewX: 5  * skew }, f, createjs.Ease.quadOut)
                .to({ skewX: 0  * skew }, f, createjs.Ease.quadIn);
        });
        
    
    }

    private executeIdle2() {
        this.restore();
        createjs.Tween.get(this.imageContainer).to({
            skewX: 20
        }, 1000, createjs.Ease.elasticOut);
    }
    //#endregion
}