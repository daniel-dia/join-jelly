
createjs.Container.prototype.addChild = function (child) {
    if (child == null) { return child; }
    var l = arguments.length;
    if (l > 1) {
        for (var i = 0; i < l; i++) { this.addChild(arguments[i]); }
        return arguments[l - 1];
    }
    if (child.parent) { child.parent.removeChild(child); }
    child.parent = this;
    this.children.push(child);
    child.dispatchEvent("added");


    var x = 0;
    var y = 0;
 
    child.addEventListener("mousedown", function (evt) {
        if (!evt.nativeEvent.ctrlKey) return;
        var pt = evt.target.parent.globalToLocal(evt.rawX, evt.rawY)
        x=evt.target.x - pt.x;
        y=evt.target.y - pt.y;

       

    }, false, false);
    child.addEventListener("pressmove", function (evt) {
        if (!evt.nativeEvent.ctrlKey) return;
        var pt = evt.target.parent.globalToLocal(evt.rawX, evt.rawY)
        evt.target.x = pt.x+x;
        evt.target.y = pt.y+y;

          
      
    },false,false);

    child.addEventListener("pressup", function (evt) {
        if (!evt.nativeEvent.ctrlKey) return;
        console.log("{x:" + evt.target.x + ",y:" + evt.target.y + "}")
    },true,false);

    child.mouseEnabled = true;
    return child;
};