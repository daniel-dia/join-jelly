(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 550,
	height: 400,
	fps: 60,
	color: "#FFFFFF",
	manifest: [
		{src:"images/_1.png", id:"_1"},
		{src:"images/eyes.png", id:"eyes"}
	]
};

// stage content:
(lib.teste = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.Jelly();
	this.instance.setTransform(246.5,163.5,1,1,0,0,0,0,-60);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(451.5,352,139,120);


// symbols:
(lib._1 = function() {
	this.initialize(img._1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,139,120);


(lib.eyes = function() {
	this.initialize(img.eyes);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,133,39);


(lib.Eyes = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.eyes();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,133,39);


(lib.Body = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib._1();
	this.instance.setTransform(-70,-119);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-70,-119,139,120);


(lib.Jelly = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 2
	this.instance = new lib.Eyes();
	this.instance.setTransform(2,-9.5,0.789,0.789,0,0,0,66.5,19.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regY:19.7,scaleX:0.97,scaleY:0.08,x:1.2,y:4.6},6,cjs.Ease.get(1)).to({regY:19.5,scaleX:0.79,scaleY:0.79,x:2,y:-9.5},6,cjs.Ease.get(-1)).wait(5).to({regY:19.7,scaleX:0.95,scaleY:0.08,x:1.2,y:4.6},9,cjs.Ease.get(-1)).to({regY:19.5,scaleX:0.79,scaleY:0.79,x:2,y:-9.5},8,cjs.Ease.get(-1)).wait(25).to({regY:19.7,scaleY:0.16,x:2.6,y:-1.9},6).to({regY:19.5,scaleX:0.63,scaleY:0.79,x:29.8,y:-32.2},6).wait(17).to({x:-25.9,y:-31.8},20).to({scaleX:0.79,x:2,y:-9.5},41).wait(1));

	// Camada 1
	this.instance_1 = new lib.Body();
	this.instance_1.setTransform(-1.5,49.5,1,1,0,0,0,-1.5,2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleX:1.11,scaleY:0.87},6,cjs.Ease.get(1)).to({scaleX:1,scaleY:1},6,cjs.Ease.get(-1)).wait(5).to({scaleX:1.11,scaleY:0.87},9,cjs.Ease.get(-1)).to({scaleX:1,scaleY:1},8,cjs.Ease.get(-1)).wait(1).to({regX:-0.5,regY:-59,x:-0.5,y:-11.5},0).wait(24).to({regX:-1.5,regY:2,x:-1.5,y:49.5},0).wait(1).to({regX:-0.5,regY:-59,scaleX:1.02,scaleY:0.98,x:-0.5,y:-10.3},0).wait(1).to({scaleX:1.03,scaleY:0.96,x:-0.4,y:-9},0).wait(1).to({scaleX:1.05,scaleY:0.94,y:-7.8},0).wait(1).to({scaleX:1.06,scaleY:0.92,y:-6.6},0).wait(1).to({scaleX:1.08,scaleY:0.9,y:-5.4},0).wait(1).to({regX:-1.5,regY:2,scaleX:1.09,scaleY:0.88,x:-1.5,y:49.5},0).wait(1).to({regX:-0.5,regY:-59,scaleX:1.08,scaleY:0.92,skewX:1.1,x:0.6,y:-6.5},0).wait(1).to({scaleX:1.06,scaleY:0.95,skewX:2.2,x:1.7,y:-8.6},0).wait(1).to({scaleX:1.05,scaleY:0.99,skewX:3.2,x:3,y:-10.7},0).wait(1).to({scaleX:1.03,scaleY:1.02,skewX:4.2,x:4.2,y:-12.7},0).wait(1).to({scaleX:1.01,scaleY:1.06,skewX:5.3,x:5.5,y:-14.7},0).wait(1).to({regX:-1.4,regY:2,scaleX:1,scaleY:1.09,skewX:6.3,x:-1.4,y:49.5},0).wait(1).to({regX:-0.5,regY:-59,x:6.7,y:-16.6},0).wait(16).to({regX:-1.4,regY:2,x:-1.4,y:49.5},0).wait(1).to({regX:-0.5,regY:-59,scaleY:1.09,skewX:5.1,x:5.4,y:-16.8},0).wait(1).to({skewX:4,x:4.1,y:-17},0).wait(1).to({scaleY:1.09,skewX:2.9,x:2.8,y:-17.1},0).wait(1).to({skewX:1.9,x:1.6,y:-17.2},0).wait(1).to({scaleY:1.09,skewX:0.8,x:0.5},0).wait(1).to({scaleY:1.1,skewX:-0.1,x:-0.6,y:-17.3},0).wait(1).to({skewX:-1,x:-1.7},0).wait(1).to({scaleY:1.1,skewX:-1.9,x:-2.8},0).wait(1).to({skewX:-2.8,x:-3.7},0).wait(1).to({scaleY:1.1,skewX:-3.6,x:-4.7},0).wait(1).to({skewX:-4.4,x:-5.6,y:-17.2},0).wait(1).to({scaleY:1.1,skewX:-5.1,x:-6.4},0).wait(1).to({skewX:-5.8,x:-7.3,y:-17.1},0).wait(1).to({skewX:-6.5,x:-8},0).wait(1).to({scaleY:1.1,skewX:-7.1,x:-8.8,y:-17},0).wait(1).to({skewX:-7.7,x:-9.5,y:-16.9},0).wait(1).to({skewX:-8.3,x:-10.1},0).wait(1).to({scaleY:1.1,skewX:-8.8,x:-10.8,y:-16.8},0).wait(1).to({skewX:-9.3,x:-11.4,y:-16.7},0).wait(1).to({regX:-1.4,regY:2,skewX:-9.8,x:-1.4,y:49.5},0).wait(1).to({regX:-0.5,regY:-59,scaleY:1.1,skewX:-9.5,x:-11.5,y:-16.5},0).wait(1).to({scaleY:1.09,skewX:-9.1,x:-11,y:-16.3},0).wait(1).to({scaleY:1.09,skewX:-8.8,x:-10.6,y:-16.2},0).wait(1).to({scaleY:1.09,skewX:-8.4,x:-10.2,y:-16},0).wait(1).to({scaleY:1.08,skewX:-8.1,x:-9.8,y:-15.9},0).wait(1).to({scaleY:1.08,skewX:-7.8,x:-9.4,y:-15.7},0).wait(1).to({scaleY:1.08,skewX:-7.5,x:-9,y:-15.6},0).wait(1).to({scaleY:1.07,skewX:-7.2,x:-8.7,y:-15.5},0).wait(1).to({scaleY:1.07,skewX:-6.9,x:-8.3,y:-15.3},0).wait(1).to({scaleY:1.07,skewX:-6.6,x:-7.9,y:-15.2},0).wait(1).to({scaleY:1.06,skewX:-6.3,x:-7.6,y:-15},0).wait(1).to({scaleY:1.06,skewX:-6,x:-7.3,y:-14.9},0).wait(1).to({scaleY:1.06,skewX:-5.7,x:-6.9,y:-14.7},0).wait(1).to({scaleY:1.06,skewX:-5.4,x:-6.6,y:-14.6},0).wait(1).to({scaleY:1.05,skewX:-5.2,x:-6.3,y:-14.4},0).wait(1).to({scaleY:1.05,skewX:-4.9,x:-6,y:-14.3},0).wait(1).to({scaleY:1.05,skewX:-4.6,x:-5.7,y:-14.2},0).wait(1).to({scaleY:1.05,skewX:-4.4,x:-5.4,y:-14},0).wait(1).to({scaleY:1.04,skewX:-4.1,x:-5.1,y:-13.9},0).wait(1).to({scaleY:1.04,skewX:-3.9,x:-4.9,y:-13.8},0).wait(1).to({scaleY:1.04,skewX:-3.7,x:-4.6,y:-13.7},0).wait(1).to({scaleY:1.03,skewX:-3.4,x:-4.3,y:-13.5},0).wait(1).to({scaleY:1.03,skewX:-3.2,x:-4,y:-13.4},0).wait(1).to({scaleY:1.03,skewX:-3,x:-3.8,y:-13.3},0).wait(1).to({scaleY:1.03,skewX:-2.8,x:-3.6,y:-13.1},0).wait(1).to({scaleY:1.03,skewX:-2.6,x:-3.3,y:-13},0).wait(1).to({scaleY:1.02,skewX:-2.4,x:-3.1,y:-12.9},0).wait(1).to({scaleY:1.02,skewX:-2.2,x:-2.9,y:-12.8},0).wait(1).to({scaleY:1.02,skewX:-2,x:-2.7,y:-12.7},0).wait(1).to({scaleY:1.02,skewX:-1.8,x:-2.4,y:-12.6},0).wait(1).to({scaleY:1.02,skewX:-1.6,x:-2.2,y:-12.5},0).wait(1).to({scaleY:1.01,skewX:-1.4,x:-2,y:-12.4},0).wait(1).to({scaleY:1.01,skewX:-1.2,x:-1.9,y:-12.3},0).wait(1).to({scaleY:1.01,skewX:-1.1,x:-1.7,y:-12.2},0).wait(1).to({scaleY:1.01,skewX:-0.9,x:-1.5,y:-12.1},0).wait(1).to({scaleY:1.01,skewX:-0.7,x:-1.3,y:-12},0).wait(1).to({scaleY:1.01,skewX:-0.6,x:-1.2,y:-11.9},0).wait(1).to({scaleY:1,skewX:-0.4,x:-1,y:-11.8},0).wait(1).to({scaleY:1,skewX:-0.3,x:-0.9,y:-11.7},0).wait(1).to({scaleY:1,skewX:-0.1,x:-0.7,y:-11.6},0).wait(1).to({regX:-1.5,regY:2,scaleY:1,skewX:0,x:-1.5,y:49.5},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70,-71.5,139,120);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;