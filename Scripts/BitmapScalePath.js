var assetscale;

createjs.Bitmap.prototype.draw = function (ctx, ignoreCache) {
    if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
    var rect = this.sourceRect;
    ctx.save()
    ctx.scale(1/assetscale, 1/assetscale)
    if (rect) {
        ctx.drawImage(this.image, rect.x * assetscale, rect.y * assetscale, rect.width * assetscale, rect.height * assetscale, 0, 0, rect.width, rect.height);
    } else {
        ctx.drawImage(this.image, 0, 0);
    }
    ctx.restore();
    return true;
};

createjs.Bitmap.prototype.getBounds = function () {
    var rect = this.DisplayObject_getBounds();
    if (rect) { return rect; }
    var o = this.sourceRect || this.image;
    var hasContent = (this.image && (this.image.complete || this.image.getContext || this.image.readyState >= 2));
    return hasContent ? this._rectangle.initialize(0, 0, o.width * 1/assetscale, o.height * 1/assetscale) : null;
};

createjs.DisplayObject.prototype.cache = function (x, y, width, height, scale) {
	// draw to canvas.
    scale = scale || assetscale;
	if (!this.cacheCanvas) { this.cacheCanvas = createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"); }
	this._cacheWidth = width;
	this._cacheHeight = height;
	this._cacheOffsetX = x;
	this._cacheOffsetY = y;
	this._cacheScale = scale;
	this.updateCache();
};

createjs.Sprite.prototype.draw = function (ctx, ignoreCache) {
	if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
	this._normalizeFrame();
	var o = this.spriteSheet.getFrame(this._currentFrame|0);
	if (!o) { return false; }
	var rect = o.rect;
	ctx.drawImage(o.image, rect.x * assetscale, rect.y * assetscale, rect.width * assetscale, rect.height * assetscale, -o.regX , -o.regY , rect.width , rect.height );
	return true;
};


createjs.BitmapText.prototype._getFrame = function(character, spriteSheet) {
   	var c, o = spriteSheet.getAnimation(character);
   	if (!o) {
   			(character != (c = character.toUpperCase())) || (character != (c = character.toLowerCase())) || (c=null);
   			if (c) { o = spriteSheet.getAnimation(c); }
   		}
   	return o && spriteSheet.getFrame(o.frames[0]);
   };


createjs.BitmapText.prototype._drawText = function (ctx, bounds) {
	var w, h, rx, x=0, y=0, spaceW=this.spaceWidth, lineH=this.lineHeight, ss=this.spriteSheet;
			
	var hasSpace = !!this._getFrame(" ", ss);
	if (!hasSpace && spaceW==0) { spaceW = this._getSpaceWidth(ss); }
	if (lineH==0) { lineH = this._getLineHeight(ss); }
	
	var maxX = 0;
	for(var i=0, l=this.text.length; i<l; i++) {
			var character = this.text.charAt(i);
	if (!hasSpace && character == " ") {
			x += spaceW;
			continue;
		} else if (character=="\n" || character=="\r") {
				if (character=="\r" && this.text.charAt(i+1) == "\n") { i++; } // crlf
				if (x-rx > maxX) { maxX = x-rx; }
				x = 0;
				y += lineH;
				continue;
			}

			var o = this._getFrame(character, ss);
			if (!o) { continue; }
			var rect = o.rect;
			rx = o.regX;
			w = rect.width 
			h = rect.height
			ctx && ctx.drawImage(o.image, rect.x * assetscale, rect.y * assetscale, w * assetscale, h * assetscale, x - rx, y - o.regY, w, h);
			
			x += w + this.letterSpacing;
		}
	if (x-rx > maxX) { maxX = x-rx; }
	
	if (bounds) {
			bounds.width = maxX-this.letterSpacing;
			bounds.height = y+lineH;
		}
};

