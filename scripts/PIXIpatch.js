updateTransform = function () {

    // create some matrix refs for easy access
    if (!this.parent) {
        return;
    }

    var pt = this.parent.worldTransform;
    var wt = this.worldTransform;

    // temporary matrix variables
    var a, b, c, d, tx, ty,
        rotY = this.rotation + this.skewY,
        rotX = this.rotation + this.skewX;


    // so if rotation is between 0 then we can simplify the multiplication process...
    if (rotY % PIXI.PI_2 || rotX % PIXI.PI_2) {
        // check to see if the rotation is the same as the previous render. This means we only need to use sin and cos when rotation actually changes
        if (rotX !== this._cachedRotX || rotY !== this._cachedRotY) {
            this._cachedRotX = rotX;
            this._cachedRotY = rotY;

            // recalculate expensive ops  
            this._crA = Math.cos(rotY  * PIXI.DEG_TO_RAD);
            this._srB = Math.sin(rotY  * PIXI.DEG_TO_RAD);
            this._srC = Math.sin(-rotX * PIXI.DEG_TO_RAD);
            this._crD = Math.cos(rotX  * PIXI.DEG_TO_RAD);
        }

        // get the matrix values of the displayobject based on its transform properties..
        a = this._crA * this.scale.x;
        b = this._srB * this.scale.x;
        c = this._srC * this.scale.y;
        d = this._crD * this.scale.y;
        tx = this.position.x;
        ty = this.position.y;


        // check for pivot.. not often used so geared towards that fact!
        if (this.pivot.x || this.pivot.y) {
            tx -= this.pivot.x * a + this.pivot.y * c;
            ty -= this.pivot.x * b + this.pivot.y * d;
        }

        // concat the parent matrix with the objects transform.
        wt.a = a * pt.a + b * pt.c;
        wt.b = a * pt.b + b * pt.d;
        wt.c = c * pt.a + d * pt.c;
        wt.d = c * pt.b + d * pt.d;
        wt.tx = tx * pt.a + ty * pt.c + pt.tx;
        wt.ty = tx * pt.b + ty * pt.d + pt.ty;
    }
    else {
        // lets do the fast version as we know there is no rotation..
        a = this.scale.x;
        d = this.scale.y;

        tx = this.position.x - this.pivot.x * a;
        ty = this.position.y - this.pivot.y * d;

        wt.a = a * pt.a;
        wt.b = a * pt.b;
        wt.c = d * pt.c;
        wt.d = d * pt.d;
        wt.tx = tx * pt.a + ty * pt.c + pt.tx;
        wt.ty = tx * pt.b + ty * pt.d + pt.ty;
    }

    // multiply the alphas..
    this.worldAlpha = this.alpha * this.parent.worldAlpha;

    // reset the bounds each time this is called!
    this._currentBounds = null;
};

Object.defineProperties(PIXI.Container.prototype, {
    removeAllChildren: {
        get: function () {
            return this.removeChildren;
        }
    },
 
});

Object.defineProperties(PIXI.DisplayObject.prototype, {
    scaleX: {
        get: function () {
            return this.scale.x;
        },
        set: function (v) {
            this.scale.x = v;
        }
    },
    scaleY: {
        get: function () {
            return this.scale.y;
        },
        set: function (v) {
            this.scale.y = v;
        }
    },
    mouseEnabled: {
        get: function () {
            return this.interactive
        },
        set: function (v) {
            this.interactive =v;
            this.interactiveChildren=v;
        }
    },
    regX: {
        get: function () {
            return this.pivot.x;
        },
        set: function (v) {
            this.pivot.x = v;
        }
    },
    regY: {
        get: function () {
            return this.pivot.y;
        },
        set: function (v) {
            this.pivot.y = v;
        }
    },
    rotation_d: {
        get: function () {
            return this.rotation * 180 / Math.PI;
        },
        set: function (v) {
            this.rotation = v / 180 * Math.PI;
        }
    },
    set:{
        get: function () {
            return function (props) {
                for (var n in props) { this[n] = props[n]; }
                return this;
            };
        },
    },
    addEventListener: {
        get: function () {
            return this.on
        },
    },
    dispatchEvent: {
        get: function () {
            return this.emit
        },
    },
    addEventListenerOnce: {
        get: function () {
            return this.once
        },
    },
 
});

PIXI.DisplayObject.prototype.updateTransform = updateTransform
PIXI.DisplayObject.prototype.displayObjectUpdateTransform = updateTransform
PIXI.Container.prototype.displayObjectUpdateTransform = updateTransform
PIXI.Sprite.prototype.displayObjectUpdateTransform = updateTransform


PIXI.DisplayObject.prototype.set = function (props) {
    for (var n in props) { this[n] = props[n]; }
    return this;
};

PIXI.Sprite.prototype.initialize = PIXI.Sprite.prototype.constructor
PIXI.Container.prototype.initialize = PIXI.Container.prototype.constructor
createjs.Container = PIXI.Container;
createjs.Bitmap = PIXI.Sprite;
PIXI.DisplayObject.prototype.setTransform = function (x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
    
    this.x = x || 0;
    this.y = y || 0;
    this.pivot.x = regX || 0;
    this.pivot.y = regY || 0;
    this.scale.x = scaleX == null ? 1 : scaleX;
    this.scale.y = scaleY == null ? 1 : scaleY;
    this.rotation_d = rotation || 0;
    this.skewX = skewX || 0;
    this.skewY = skewY || 0;
}
PIXI.Container.prototype.Container_addChild = PIXI.Container.prototype.addChild;
PIXI.Container.prototype.addChild = function(child) {
  	if (child == null) { return child; }
  	var l = arguments.length; 
  	
  	if (l > 1) {
  	    for (var i = 0; i < l; i++) {
  	        if (arguments[i]) this.Container_addChild(arguments[i]);
  	    }
  			return arguments[l-1];
  	}

  	return this.Container_addChild(child)
  };

