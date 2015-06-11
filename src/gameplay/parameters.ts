module joinjelly.gameplay {
    // parameters
    export var boardSize: number = 5;
    export var itemProbability: number = 0.005;

    export var timeByLevel: number = 20000;
    export var timeoutInterval: number;

    export var initialInterval: number = 800;
    export var finalInterval: number = 300;
    export var easeInterval: number = 0.99;

    export var initialDirtyProbability: number = 0.1;
    export var finalDirtyProbability: number = 0.5;
    export var easeDirtyProbability: number = 0.99;
}