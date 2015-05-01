(function (lib, img, cjs) {

    var p; // shortcut to reference prototypes

    // library properties:
    lib.properties = {
        width: 1536,
        height: 2048,
        fps: 60,
        color: "#000000",
        manifest: [
            { src: "images/BackMain.jpg", id: "BackMain" },
            { src: "images/e1.png", id: "e1" },
            { src: "images/e1_hanger.png", id: "e1_hanger" },
            { src: "images/e1_happy.png", id: "e1_happy" },
            { src: "images/e1_sad.png", id: "e1_sad" },
            { src: "images/e2.png", id: "e2" },
            { src: "images/e_1.png", id: "e_1" },
			{ src: "images/j_1.png", id: "j_1" },
            { src: "images/fxJoin.png", id: "fxJoin" },
            { src: "images/fxPart.png", id: "fxPart" },
            { src: "images/hex.png", id: "hex" },
            { src: "images/j1.png", id: "j1" },
            { src: "images/j2.png", id: "j2" },
            { src: "images/movement.png", id: "movement" },
            { src: "images/movement2.png", id: "movement2" },
            { src: "images/movement_surprise.png", id: "movement_surprise" },
            { src: "images/shadow.png", id: "shadow" }
        ]
    };

    // stage content:
    (lib.Intro2 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer 9
        this.shape = new cjs.Shape();
        this.shape.graphics.f().s("#000000").ss(1, 1, 1).p("EiA7izAMDv/AAAMAAAE//Mjv/AAAgEkAnk7cMIBPAAAMAAAJ25MoBPAAAg");
        this.shape.setTransform(825.2, 1145.7);

        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#000000").s().p("EkAnE7dMAAAp25MIBPAAAMAAAJ25gEiA7CM/MDv/AAAMAAAk//Mjv/AAAg");
        this.shape_1.setTransform(825.2, 1145.7);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.shape_1 }, { t: this.shape }] }).wait(1201));

        // Layer 8
        this.instance_7 = new lib.White("synched", 0);
        this.instance_7.setTransform(713, 1033.5, 1, 1, 0, 0, 0, 857.3, 1097.6);
        this.instance_7.alpha = 0;
        this.instance_7._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1046).to({ _off: false }, 0).to({ alpha: 1 }, 46).to({ alpha: 0 }, 45).to({ _off: true }, 5).wait(60));

        // Layer 7
        this.instance_8 = new lib.Scene7("synched", 0, false);
        this.instance_8.setTransform(15.2, 413.5, 1, 1, 0, 0, 0, -752.8, -610.5);
        this.instance_8._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(914).to({ _off: false }, 0).to({ x: 47.3, y: 605.8, startPosition: 60 }, 178, cjs.Ease.get(0.98)).to({ _off: true }, 2).wait(107));

        // Layer 6
        this.instance_9 = new lib.Scene6("synched", 0, false);
        this.instance_9.setTransform(1613.1, 1506.9, 1, 1, 0, 0, 0, 845.1, 482.9);
        this.instance_9._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(795).to({ _off: false }, 0).to({ _off: true }, 119).wait(287));

        // Layer 4
        this.instance_10 = new lib.Scene4("synched", 0, false);
        this.instance_10.setTransform(-208.6, 413.5, 1, 1, 0, 0, 0, -976.6, -610.5);
        this.instance_10._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(615).to({ _off: false }, 0).to({ y: 341.5, startPosition: 60 }, 178, cjs.Ease.get(1)).to({ _off: true }, 2).wait(406));

        // Layer 3
        this.instance_11 = new lib.Scene3("synched", 0, false);
        this.instance_11.setTransform(819.7, -255.2, 1, 1, 0, 0, 0, 51.7, -1279.2);
        this.instance_11._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(435).to({ _off: false }, 0).to({ regX: 51.6, scaleX: 0.8, scaleY: 0.8, x: 777.2, y: 182.5, startPosition: 60 }, 178, cjs.Ease.get(1)).to({ _off: true }, 2).wait(586));

        // Layer 2
        this.instance_12 = new lib.Scene2("synched", 0, false);
        this.instance_12.setTransform(1033.3, 3193, 1, 1, 0, 0, 0, 265.3, 2168.9);
        this.instance_12._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(256).to({ _off: false }, 0).to({ x: 885.4, y: 3004.9, startPosition: 60 }, 177, cjs.Ease.get(1)).to({ _off: true }, 2).wait(766));

        // Layer 1
        this.instance_13 = new lib.Scene1("synched", 0, false);
        this.instance_13.setTransform(782, 430, 1, 1, 0, 0, 0, 62.1, -1330.4);

        this.timeline.addTween(cjs.Tween.get(this.instance_13).to({ x: 894.1, y: -569.5, startPosition: 117 }, 255, cjs.Ease.get(0.99)).to({ _off: true }, 1).wait(945));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-274.3, -913.5, 3728.9, 5818.6);


    // symbols:
    (lib.BackMain = function () {
        this.initialize(img.BackMain);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 1537, 2048);


    (lib.e1 = function () {
        this.initialize(img.e1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 142, 48);


    (lib.e1_hanger = function () {
        this.initialize(img.e1_hanger);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 142, 48);


    (lib.e1_happy = function () {
        this.initialize(img.e1_happy);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 142, 34);


    (lib.e1_sad = function () {
        this.initialize(img.e1_sad);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 142, 48);


    (lib.e2 = function () {
        this.initialize(img.e2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 339, 99);


    (lib.e_1 = function () {
        this.initialize(img.e_1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 249, 92);


    (lib.fxJoin = function () {
        this.initialize(img.fxJoin);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 200, 200);


    (lib.fxPart = function () {
        this.initialize(img.fxPart);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 282, 281);


    (lib.hex = function () {
        this.initialize(img.hex);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 358, 230);


    (lib.j1 = function () {
        this.initialize(img.j1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 276, 240);


    (lib.j2 = function () {
        this.initialize(img.j2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 339, 324);


    (lib.j_1 = function () {
        this.initialize(img.j_1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 249, 194);


    (lib.movement = function () {
        this.initialize(img.movement);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 309, 111);


    (lib.movement2 = function () {
        this.initialize(img.movement2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 259, 79);


    (lib.movement_surprise = function () {
        this.initialize(img.movement_surprise);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 350, 122);


    (lib.shadow = function () {
        this.initialize(img.shadow);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 216, 90);


    (lib.Tween8 = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.e1_sad();
        this.instance.setTransform(-138, -43.5);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(-138, -43.5, 142, 48);


    (lib.Tween7 = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.movement_surprise();
        this.instance.setTransform(-291, -89, 1.663, 1.459);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(-291, -89, 582, 178);


    (lib.Tween5 = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.fxJoin();
        this.instance.setTransform(-190.9, -190.9, 1.91, 1.91);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(-190.9, -190.9, 382, 382);


    (lib.Tween4 = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.fxJoin();
        this.instance.setTransform(-190.9, -190.9, 1.91, 1.91);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(-190.9, -190.9, 382, 382);


    (lib.Tween3 = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.e1_hanger();
        this.instance.setTransform(-43.6, -27.6);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(-43.6, -27.6, 142, 48);


    (lib.Tween1 = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.e1_sad();
        this.instance.setTransform(-161.1, -74.6, 1.167, 1.715);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(-161.1, -74.6, 165.8, 82.3);


    (lib.surprise = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.movement_surprise();

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 350, 122);


    (lib.Shadow = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.shadow();

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 216, 90);


    (lib.White = function () {
        this.initialize();

        // Layer 1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#FFFFFF").s().p("EiF7CrfMAAAlW+MEL3AAAMAAAFW+g");
        this.shape.setTransform(857.3, 1097.6);

        this.addChild(this.shape);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 1714.5, 2195.2);


    (lib.S6J1 = function () {
        this.initialize();

        // Layer 2
        this.instance = new lib.movement();
        this.instance.setTransform(-179.5, -236.9, 1, 1.661, 38.7);

        // Layer 1
        this.instance_1 = new lib.e1_hanger();
        this.instance_1.setTransform(98.1, 108);

        this.instance_2 = new lib.j1();

        this.addChild(this.instance_2, this.instance_1, this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(-294.8, -236.9, 570.9, 476.9);


    (lib.Particles = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.fxPart();
        this.instance.setTransform(-530.5, -528.7, 3.763, 3.763);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(-530.5, -528.7, 1061.2, 1057.4);


    (lib.S4D1 = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.j_1();

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 249, 194);


    (lib.S2D1 = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.movement();
        this.instance.setTransform(-139.1, -146.8, 1, 1.316, 33.9);

        this.instance_1 = new lib.e_1();
        this.instance_1.setTransform(13.4, 74.8);

        this.instance_2 = new lib.j_1();

        this.addChild(this.instance_2, this.instance_1, this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(-220.7, -146.8, 483.1, 340.9);


    (lib.S1Jel1 = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.e1_happy();
        this.instance.setTransform(126, 163.3, 1.355, 1.355);

        this.instance_1 = new lib.j1();
        this.instance_1.setTransform(0, 0, 1.355, 1.355);

        this.addChild(this.instance_1, this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 374, 325.2);


    (lib.S1J3 = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.e1_happy();
        this.instance.setTransform(60.1, 102.6);

        this.instance_1 = new lib.j1();
        this.instance_1.setTransform(36.8, 0);

        this.addChild(this.instance_1, this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(36.8, 0, 276, 240);


    (lib.S1J2 = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.e1_happy();
        this.instance.setTransform(58.7, 112.5);

        this.instance_1 = new lib.j1();

        this.addChild(this.instance_1, this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 276, 240);


    (lib.e1Eye = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.e_1();

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 249, 92);


    (lib.BG = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.BackMain();
        this.instance.setTransform(0, 0, 2.353, 2.353);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 3616.8, 4819.2);


    (lib.S5J1 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer 3
        this.instance = new lib.movement();
        this.instance.setTransform(-179.5, -197.6, 1, 1.759, 36);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(60));

        // Layer 2
        this.instance_1 = new lib.Tween3("synched", 0);
        this.instance_1.setTransform(138, 135.5);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).to({ x: 156.2, y: 139.6 }, 59, cjs.Ease.get(1)).wait(1));

        // Layer 1
        this.instance_2 = new lib.j1();

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(60));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-294.2, -197.6, 570.2, 437.6);


    (lib.S4J1 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer 2
        this.instance = new lib.Tween1("synched", 0);
        this.instance.setTransform(44.2, 35.7, 1.155, 0.762);

        this.timeline.addTween(cjs.Tween.get(this.instance).to({ scaleX: 1.12, scaleY: 1.38, x: 64.6, y: -4.4 }, 59, cjs.Ease.get(1)).wait(1));

        // Layer 1
        this.instance_1 = new lib.j1();
        this.instance_1.setTransform(-195.7, -170.2, 1.418, 1.418);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(60));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-195.7, -170.2, 391.5, 340.4);


    (lib.S4D2 = function () {
        this.initialize();

        // Layer 2
        this.instance = new lib.e1Eye("synched", 0);
        this.instance.setTransform(124.5, 108.2, 1, 1, 0, 0, 0, 124.5, 46);

        // Layer 1
        this.instance_1 = new lib.j_1();

        this.addChild(this.instance_1, this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 249, 194);


    (lib.Scene4 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer 10
        this.instance = new lib.Tween7("synched", 0);
        this.instance.setTransform(-3.3, -64);
        this.instance.alpha = 0;
        this.instance._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(41).to({ _off: false }, 0).to({ scaleY: 1.11, x: -2.5, y: -78.2, alpha: 0.809 }, 7).to({ scaleY: 1.58, x: -0.5, y: -102.1, alpha: 0.301 }, 12).wait(1));

        // Layer 13 copy 2
        this.instance_1 = new lib.S4J1("synched", 0);
        this.instance_1.setTransform(-2.2, 191.1);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).to({ scaleX: 1.04, scaleY: 0.9, y: 224.4, startPosition: 59 }, 60, cjs.Ease.get(0.99)).wait(1));

        // Layer 7
        this.instance_2 = new lib.Shadow("synched", 0);
        this.instance_2.setTransform(-13.1, 410.2, 1.711, 1.711, 0, 0, 0, 108, 45);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).to({ y: 362.1 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 13 copy 3
        this.instance_3 = new lib.S4D2("synched", 0);
        this.instance_3.setTransform(-460.4, -151.4, 1, 1, 0, 0, 0, 124.5, 97);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).to({ x: -322.4, y: -76.1 }, 60, cjs.Ease.get(0.99)).wait(1));

        // Layer 13 copy 4
        this.instance_4 = new lib.S4D2("synched", 0);
        this.instance_4.setTransform(518.9, -76.1, 1, 1, 0, 0, 0, 124.5, 97);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).to({ x: 242.6, y: -25.9 }, 60, cjs.Ease.get(0.99)).wait(1));

        // Layer 13 copy 5
        this.instance_5 = new lib.S4D1("synched", 0);
        this.instance_5.setTransform(600.5, 614.4, 2.37, 2.295, 0, 0, 0, 124.5, 97);

        this.timeline.addTween(cjs.Tween.get(this.instance_5).to({ x: 387.1, y: 470 }, 60, cjs.Ease.get(0.99)).wait(1));

        // Layer 13 copy
        this.instance_6 = new lib.S4D1("synched", 0);
        this.instance_6.setTransform(-585.8, 507.7, 2.294, 2.294, 0, 0, 0, 124.6, 97);

        this.timeline.addTween(cjs.Tween.get(this.instance_6).to({ x: -428.8, y: 438.6 }, 60, cjs.Ease.get(0.99)).wait(1));

        // Layer 5
        this.instance_7 = new lib.Shadow("synched", 0);
        this.instance_7.setTransform(525.9, 114.4, 1.088, 1.088, 0, 0, 0, 108, 45.1);

        this.timeline.addTween(cjs.Tween.get(this.instance_7).to({ x: 235.6, y: 22.2 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 4
        this.instance_8 = new lib.Shadow("synched", 0);
        this.instance_8.setTransform(-467.5, 69.9, 1.088, 1.088, 0, 0, 0, 108, 45);

        this.timeline.addTween(cjs.Tween.get(this.instance_8).to({ x: -329.4, y: -28 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 3
        this.instance_9 = new lib.Shadow("synched", 0);
        this.instance_9.setTransform(623.7, 1004.8, 1.993, 1.993, 0, 0, 0, 108, 45);

        this.timeline.addTween(cjs.Tween.get(this.instance_9).to({ x: 387, y: 624.2 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 2
        this.instance_10 = new lib.Shadow("synched", 0);
        this.instance_10.setTransform(-617.4, 930, 2.067, 2.067, 0, 0, 0, 108, 45);

        this.timeline.addTween(cjs.Tween.get(this.instance_10).to({ x: -421.1, y: 620.9 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 6
        this.instance_11 = new lib.BG("synched", 0);
        this.instance_11.setTransform(-1040.3, -610.5, 1, 1, 0, 0, 0, 1808.4, 2409.6);

        this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(60).to({ startPosition: 0 }, 0).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-2848.7, -3020.1, 3744.3, 4819.2);


    (lib.S3J1 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer 3
        this.instance = new lib.surprise("synched", 0);
        this.instance.setTransform(150, -38, 1, 1, 0, 0, 0, 175, 61);
        this.instance.alpha = 0;
        this.instance._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(5).to({ _off: false }, 0).to({ scaleY: 1.47, alpha: 1 }, 10).to({ scaleY: 1 }, 7).to({ scaleX: 1.37, scaleY: 1.51 }, 8).to({ scaleX: 1, scaleY: 1 }, 29).wait(1));

        // Layer 2
        this.instance_1 = new lib.Tween8("synched", 0);
        this.instance_1.setTransform(171, 132.8);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).to({ scaleY: 1.33, x: 218, y: 140 }, 59, cjs.Ease.get(1)).wait(1));

        // Layer 1
        this.instance_2 = new lib.j1();

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(60));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 276, 240);


    (lib.S3D1 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer 3
        this.instance = new lib.movement();
        this.instance.setTransform(18.5, -244.3, 1, 1.188, 63.2);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(60));

        // Layer 2
        this.instance_1 = new lib.e1Eye("synched", 0);
        this.instance_1.setTransform(124.5, 115.1, 1, 1, 0, 0, 0, 124.5, 46);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).to({ startPosition: 0 }, 8).to({ startPosition: 0 }, 16).to({ scaleY: 0.21 }, 6).to({ scaleY: 1, y: 108.7 }, 6).to({ x: 129.1, y: 100.2 }, 23).wait(1));

        // Layer 1
        this.instance_2 = new lib.j_1();

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(60));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-99.2, -244.3, 348.2, 438.3);


    (lib.Scene3 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer 1
        this.instance = new lib.S3J1("synched", 0);
        this.instance.setTransform(481.2, -78.2, 1.136, 1.136, 0, 0, 0, 138, 120);

        this.timeline.addTween(cjs.Tween.get(this.instance).to({ scaleY: 1.17, skewX: 13.2, x: 672.1, y: -30.1, startPosition: 59 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 2
        this.instance_1 = new lib.S3J1("synched", 0);
        this.instance_1.setTransform(167.4, 325.6, 1.683, 1.683, 0, 0, 0, 138, 120);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).to({ scaleY: 1.72, skewX: 11.2, x: 455.2, y: 388.3, startPosition: 59 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 3
        this.instance_2 = new lib.S3D1("synched", 0);
        this.instance_2.setTransform(-411.9, -503, 1.878, 2.063, 0, -13.9, 0, 124.5, 97);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).to({ scaleY: 1.67, skewX: 0, x: -54.1, y: 162.3, startPosition: 59 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 4
        this.instance_3 = new lib.S3J1("synched", 0);
        this.instance_3.setTransform(-334.8, -12.7, 1.293, 1.136, 0, 0, 180, 138, 120);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).to({ scaleX: 1.18, scaleY: 1.15, skewX: -10, x: -595.7, y: -30.1, startPosition: 59 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 9
        this.instance_4 = new lib.Shadow("synched", 0);
        this.instance_4.setTransform(161.3, 514.8, 1.711, 1.711, 0, 0, 0, 108, 45);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).to({ regX: 108.1, scaleX: 2.13, scaleY: 2.47, x: 418.4, y: 701.2 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 8
        this.instance_5 = new lib.Shadow("synched", 0);
        this.instance_5.setTransform(473.2, 70.8, 1.177, 1.177, 0, 0, 0, 108, 45);

        this.timeline.addTween(cjs.Tween.get(this.instance_5).to({ x: 658.4, y: 187 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 7
        this.instance_6 = new lib.Shadow("synched", 0);
        this.instance_6.setTransform(-314.7, 107.2, 1.177, 1.177, 0, 0, 0, 121.7, 41.6);

        this.timeline.addTween(cjs.Tween.get(this.instance_6).to({ x: -585.3, y: 155.3 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 6
        this.instance_7 = new lib.Shadow("synched", 0);
        this.instance_7.setTransform(-556.8, 289.2, 1.711, 1.711, 0, 0, 0, 108, 45);

        this.timeline.addTween(cjs.Tween.get(this.instance_7).to({ x: -44 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 5
        this.instance_8 = new lib.BG("synched", 0);
        this.instance_8.setTransform(51.8, -1279.1, 1, 1, 0, 0, 0, 1808.4, 2409.6);

        this.timeline.addTween(cjs.Tween.get(this.instance_8).to({ startPosition: 0 }, 60, cjs.Ease.get(1)).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-1756.6, -3688.7, 3616.8, 4819.2);


    (lib.Scene2 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer 1
        this.instance = new lib.S2D1("synched", 0);
        this.instance.setTransform(-600.4, 192.9, 2.243, 2.243, 0, 0, 0, 128.6, 97);

        this.timeline.addTween(cjs.Tween.get(this.instance).to({ regX: 128.5, scaleX: 1.74, scaleY: 1.74, x: 340.9, y: 903.6 }, 60, cjs.Ease.get(0.98)).wait(1));

        // Layer 7 copy
        this.instance_1 = new lib.S2D1("synched", 0);
        this.instance_1.setTransform(60.9, -114.4, 1, 1, 0, 0, 0, 128.5, 97);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).to({ x: 334.3, y: 111.1 }, 60, cjs.Ease.get(0.98)).wait(1));

        // Layer 7 copy 6
        this.instance_2 = new lib.S2D1("synched", 0);
        this.instance_2.setTransform(-677.1, 451.9, 0.591, 0.591, 0, 0, 0, 155.3, 70.2);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).to({ regX: 128.5, regY: 97, scaleX: 0.62, scaleY: 0.62, x: -301.8, y: 814.2 }, 60, cjs.Ease.get(0.98)).wait(1));

        // Layer 7 copy 5
        this.instance_3 = new lib.S2D1("synched", 0);
        this.instance_3.setTransform(345.6, 36.8, 0.591, 0.591, 0, 0, 0, 155.3, 70.2);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).to({ regX: 128.5, regY: 97, scaleX: 0.62, scaleY: 0.62, x: 721, y: 267.7 }, 60, cjs.Ease.get(0.98)).wait(1));

        // Layer 7 copy 7
        this.instance_4 = new lib.S2D1("synched", 0);
        this.instance_4.setTransform(-611.2, -655.2, 0.347, 0.347);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).to({ regX: 128.6, regY: 97.1, scaleX: 0.54, scaleY: 0.54, x: -411.7, y: -425.3 }, 60, cjs.Ease.get(0.98)).wait(1));

        // Layer 7 copy 3
        this.instance_5 = new lib.S2D1("synched", 0);
        this.instance_5.setTransform(237.1, -422.6, 0.286, 0.326, 0, 0, 0, 155.3, 70.3);

        this.timeline.addTween(cjs.Tween.get(this.instance_5).to({ regX: 128.5, regY: 97, scaleX: 0.3, scaleY: 0.34, x: 281.4, y: -350 }, 60, cjs.Ease.get(0.98)).wait(1));

        // Layer 7 copy 2
        this.instance_6 = new lib.S2D1("synched", 0);
        this.instance_6.setTransform(-686.1, -304.2, 1, 1, 0, 0, 0, 128.5, 97);

        this.timeline.addTween(cjs.Tween.get(this.instance_6).to({ x: -112, y: 113.7 }, 60, cjs.Ease.get(0.98)).wait(1));

        // Layer 7 copy 9
        this.instance_7 = new lib.S2D1("synched", 0);
        this.instance_7.setTransform(405.8, -685.8, 0.409, 0.409);

        this.timeline.addTween(cjs.Tween.get(this.instance_7).to({ regX: 128.5, regY: 97, scaleX: 0.63, scaleY: 0.63, x: 678.5, y: -336.8 }, 60, cjs.Ease.get(0.98)).wait(1));

        // Layer 7 copy 8
        this.instance_8 = new lib.S2D1("synched", 0);
        this.instance_8.setTransform(-534.4, -856.9, 0.409, 0.409);

        this.timeline.addTween(cjs.Tween.get(this.instance_8).to({ regX: 128.5, regY: 97, scaleX: 0.63, scaleY: 0.63, x: -200.2, y: -526.6 }, 60, cjs.Ease.get(0.98)).wait(1));

        // Layer 7 copy 4
        this.instance_9 = new lib.S2D1("synched", 0);
        this.instance_9.setTransform(-683.5, 9.1, 0.597, 0.597);

        this.timeline.addTween(cjs.Tween.get(this.instance_9).to({ regX: 128.5, regY: 97, scaleX: 0.92, scaleY: 0.92, x: -84.4, y: 390.9 }, 60, cjs.Ease.get(0.98)).wait(1));

        // Layer 11
        this.instance_10 = new lib.BG("synched", 0);
        this.instance_10.setTransform(2117.3, 2820.7, 1.596, 1.596, 0, 0, 0, 1808.3, 2409.6);

        this.timeline.addTween(cjs.Tween.get(this.instance_10).to({ x: -1586.9, y: 1517.2 }, 60, cjs.Ease.get(0.98)).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-4469.9, -2326.7, 9472.7, 8992.1);


    (lib.Scene1 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer 1
        this.instance = new lib.S1J3("synched", 0);
        this.instance.setTransform(498.7, 311.2, 1, 1, 0, 0, 0, 156.3, 120);

        this.timeline.addTween(cjs.Tween.get(this.instance).to({ x: 321.2, y: 259 }, 117, cjs.Ease.get(1)).wait(1));

        // Layer 2
        this.instance_1 = new lib.S1Jel1("synched", 0);
        this.instance_1.setTransform(-225.2, 431.7, 1, 1, 0, 0, 0, 210, 162.6);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).to({ x: -45, y: 511.5 }, 117, cjs.Ease.get(1)).wait(1));

        // Layer 3
        this.instance_2 = new lib.S1J2("synched", 0);
        this.instance_2.setTransform(-456.8, 120, 1, 1, 0, 0, 0, 153.3, 120);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).to({ x: -497.9, y: 290.4 }, 117, cjs.Ease.get(1)).wait(1));

        // Layer 8
        this.instance_3 = new lib.Shadow("synched", 0);
        this.instance_3.setTransform(500.1, 452.1, 1.192, 1.192, 0, 0, 0, 108, 45);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).to({ x: 328.1, y: 464.1 }, 117, cjs.Ease.get(1)).wait(1));

        // Layer 7
        this.instance_4 = new lib.Shadow("synched", 0);
        this.instance_4.setTransform(-482.8, 322.1, 1.179, 1.179, 0, 0, 0, 108, 45);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).to({ x: -514.8, y: 402 }, 117, cjs.Ease.get(1)).wait(1));

        // Layer 4
        this.instance_5 = new lib.Shadow("synched", 0);
        this.instance_5.setTransform(-250.4, 628.1, 1.711, 1.711, 0, 0, 0, 108, 45);

        this.timeline.addTween(cjs.Tween.get(this.instance_5).to({ x: -70.2, y: 632.1 }, 117, cjs.Ease.get(1)).wait(1));

        // Layer 5
        this.instance_6 = new lib.BG("synched", 0);
        this.instance_6.setTransform(46.2, -288.9, 1, 1, 0, 0, 0, 1808.4, 2409.6);

        this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(118));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-1762.2, -2698.5, 3616.8, 4819.2);


    (lib.Scene7 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer 2
        this.instance = new lib.Particles("synched", 0);
        this.instance.setTransform(7, 229.2, 1.49, 1.49, 0, 0, 0, 19.7, -4.9);
        this.instance.alpha = 0.129;
        this.instance._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(9).to({ _off: false }, 0).to({ scaleX: 0.58, scaleY: 0.58, y: 229.3, alpha: 1 }, 51, cjs.Ease.get(0.99)).wait(1));

        // Layer 3
        this.instance_1 = new lib.Tween4("synched", 0);
        this.instance_1.setTransform(10.5, 234.2);
        this.instance_1.alpha = 0.129;
        this.instance_1._off = true;

        this.instance_2 = new lib.Tween5("synched", 0);
        this.instance_2.setTransform(10.5, 234.2, 2.276, 2.276);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [] }).to({ state: [{ t: this.instance_1 }] }, 12).to({ state: [{ t: this.instance_2 }] }, 48).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(12).to({ _off: false }, 0).to({ _off: true, scaleX: 2.28, scaleY: 2.28, alpha: 1 }, 48, cjs.Ease.get(0.99)).wait(1));

        // Layer 22 copy
        this.instance_3 = new lib.Particles("synched", 0);
        this.instance_3.setTransform(6.9, 229.3, 0.556, 0.556, 0, 0, 0, 19.7, -4.8);
        this.instance_3.alpha = 0.129;
        this.instance_3._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(9).to({ _off: false }, 0).to({ scaleX: 1.03, scaleY: 1.03, rotation: 10, alpha: 0.441 }, 10, cjs.Ease.get(0.99)).to({ regY: -4.9, scaleX: 1.91, scaleY: 1.91, rotation: 28.5, x: 7, alpha: 1 }, 41).wait(1));

        // Layer 4
        this.instance_4 = new lib.S6J1("synched", 0);
        this.instance_4.setTransform(-751.9, -283.1, 1.346, 1.346, 0, 0, 0, 127.9, 94.7);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).to({ scaleX: 1.59, scaleY: 1.67, skewX: -17.7, x: -202.9, y: 10.4 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 13 copy 6
        this.instance_5 = new lib.S4J1("synched", 0);
        this.instance_5.setTransform(-2.2, 224.4, 1.041, 0.901);

        this.timeline.addTween(cjs.Tween.get(this.instance_5).to({ scaleX: 1, scaleY: 1, y: 191.1, startPosition: 59 }, 60, cjs.Ease.get(0.99)).wait(1));

        // Layer 13 copy 17
        this.instance_6 = new lib.Particles("synched", 0);
        this.instance_6.setTransform(402.3, 535.1, 0.365, 0.365, 0, 0, 0, 124.7, 97);

        this.timeline.addTween(cjs.Tween.get(this.instance_6).to({ regX: 124.5, regY: 97.2, scaleX: 0.9, scaleY: 0.51, skewX: 0.3, x: 840.7, y: 667.8 }, 60, cjs.Ease.get(0.99)).wait(1));

        // Layer 13 copy 16
        this.instance_7 = new lib.Particles("synched", 0);
        this.instance_7.setTransform(-401.6, 475.8, 0.365, 0.365, 0, 0, 0, 124.7, 97);

        this.timeline.addTween(cjs.Tween.get(this.instance_7).to({ regX: 124.5, regY: 97.2, scaleX: 0.9, scaleY: 0.51, skewX: 0.3, x: -678.5, y: 592.8 }, 60, cjs.Ease.get(0.99)).wait(1));

        // Layer 13 copy 15
        this.instance_8 = new lib.S4D1("synched", 0);
        this.instance_8.setTransform(-428.8, 438.6, 2.294, 2.294, 0, 0, 0, 124.6, 97);

        this.timeline.addTween(cjs.Tween.get(this.instance_8).to({ scaleY: 1.53, skewX: -31.6, x: -732.9, y: 538.3, alpha: 0.512 }, 60, cjs.Ease.get(0.99)).wait(1));

        // Layer 13 copy 18
        this.instance_9 = new lib.S4D2("synched", 0);
        this.instance_9.setTransform(-308.8, -19.1, 1, 1, 0, 0, 0, 83.6, 103.8);

        this.timeline.addTween(cjs.Tween.get(this.instance_9).to({ regY: 103.9, scaleY: 0.75, skewX: 29.1, x: -604, y: -88.7, alpha: 0.629 }, 60, cjs.Ease.get(0.99)).wait(1));

        // Layer 13 copy 8
        this.instance_10 = new lib.S4D2("synched", 0);
        this.instance_10.setTransform(242.6, -25.9, 1, 1, 0, 0, 0, 124.5, 97);

        this.timeline.addTween(cjs.Tween.get(this.instance_10).to({ scaleY: 0.75, skewX: 29.6, x: 605.5, y: -89.7, alpha: 0.621 }, 60, cjs.Ease.get(0.99)).wait(1));

        // Layer 13 copy 9
        this.instance_11 = new lib.S4D1("synched", 0);
        this.instance_11.setTransform(387.1, 470, 2.37, 2.295, 0, 0, 0, 124.5, 97);

        this.timeline.addTween(cjs.Tween.get(this.instance_11).to({ scaleY: 2.07, skewX: 53.1, x: 821.9, y: 634.9, alpha: 0.512 }, 60, cjs.Ease.get(0.99)).wait(1));

        // Layer 13 copy 10
        this.instance_12 = new lib.S4D1("synched", 0);
        this.instance_12.setTransform(-428.8, 438.6, 2.294, 2.294, 0, 0, 0, 124.6, 97);

        this.timeline.addTween(cjs.Tween.get(this.instance_12).to({ scaleY: 1.53, skewX: -31.6, x: -732.9, y: 538.3, alpha: 0.512 }, 60, cjs.Ease.get(0.99)).wait(1));

        // Layer 11
        this.instance_13 = new lib.Shadow("synched", 0);
        this.instance_13.setTransform(-438.9, 646.9, 2.158, 2.158, 0, 0, 0, 108, 45);

        this.timeline.addTween(cjs.Tween.get(this.instance_13).to({ scaleX: 1.71, scaleY: 1.71, x: -877.2, y: 895.3, alpha: 0 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 10
        this.instance_14 = new lib.Shadow("synched", 0);
        this.instance_14.setTransform(392.6, 671, 2.119, 2.335, 0, 0, 0, 108, 45);

        this.timeline.addTween(cjs.Tween.get(this.instance_14).to({ scaleX: 1.71, scaleY: 1.71, x: 693, y: 895.3, alpha: 0 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 9
        this.instance_15 = new lib.Shadow("synched", 0);
        this.instance_15.setTransform(-21, 383.7, 1.711, 1.711, 0, 0, 0, 108, 45);

        this.timeline.addTween(cjs.Tween.get(this.instance_15).to({ startPosition: 0 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 8
        this.instance_16 = new lib.Shadow("synched", 0);
        this.instance_16.setTransform(225.1, 65.5, 0.991, 0.991, 0, 0, 0, 108, 45);

        this.timeline.addTween(cjs.Tween.get(this.instance_16).to({ x: 552.3, alpha: 0 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 7
        this.instance_17 = new lib.Shadow("synched", 0);
        this.instance_17.setTransform(-262.8, 65.5, 0.991, 0.991, 0, 0, 0, 108, 45);

        this.timeline.addTween(cjs.Tween.get(this.instance_17).to({ x: -613.4, alpha: 0 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 6
        this.instance_18 = new lib.Shadow("synched", 0);
        this.instance_18.setTransform(-661.7, 170.5, 1.711, 1.711, 0, 0, 0, 108, 45);

        this.timeline.addTween(cjs.Tween.get(this.instance_18).to({ x: -185, y: 383.7 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 13 copy 11
        this.instance_19 = new lib.BG("synched", 0);
        this.instance_19.setTransform(-1040.3, -610.5, 1, 1, 0, 0, 0, 1808.4, 2409.6);

        this.timeline.addTween(cjs.Tween.get(this.instance_19).to({ startPosition: 0 }, 59, cjs.Ease.get(0.99)).to({ startPosition: 0 }, 1).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-2848.7, -3020.1, 4125.7, 4819.2);


    (lib.Scene6 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer 1
        this.instance = new lib.S5J1("synched", 0);
        this.instance.setTransform(-461.5, -239.7, 2.012, 2.051, 0, -11.3, 0, 138, 120);

        this.timeline.addTween(cjs.Tween.get(this.instance).to({ regX: 138.1, regY: 120.1, scaleX: 2.65, scaleY: 2.67, skewX: 6.7, x: 172.8, y: 74.8, startPosition: 59 }, 60, cjs.Ease.get(1)).wait(1));

        // Layer 3
        this.instance_1 = new lib.Shadow("synched", 0);
        this.instance_1.setTransform(-420.6, 1025.5, 1.631, 1.972, 0, 0, 0, 108, 45);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).to({ scaleX: 3.63, scaleY: 4.38, x: 114.2, y: 945.4 }, 60, cjs.Ease.get(0.99)).wait(1));

        // Layer 2
        this.instance_2 = new lib.BG("synched", 0);
        this.instance_2.setTransform(947.2, 482.9, 1, 1, 0, 0, 0, 1808.4, 2409.6);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).to({ scaleX: 0.51, scaleY: 0.51, x: -148.6, y: -22.5 }, 60, cjs.Ease.get(1)).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-1394.7, -1926.7, 4150.3, 4819.2);

})(lib = lib || {}, images = images || {}, createjs = createjs || {});
var lib, images, createjs;