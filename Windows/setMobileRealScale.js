function setMobileScale(width) {
      try {

        var ViewportStyle = document.createElement("style");
        ViewportStyle.appendChild(
            document.createTextNode(
               "@-webkit-viewport{width:" + width + "px}  \n" +
                "@-moz-viewport{ width: " + width + "px}\n" +
                "@-ms-viewport{ width: " + width + "px} \n" +
                "@-o-viewport{ width: " + width + "px}  \n" +
                "@viewport{ width: " + width + "px }"
                )
            );
        document.getElementsByTagName("head")[0].
            appendChild(ViewportStyle);

        viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute('content', 'width=' + width + ',user-scalable=no');

    } catch (e) { }
}

var e = 5;
knowRes = [320,400, 480, 720, 768, 780, 800, 1024, 1280, 1080, 1920];

var rw = screen.width * window.devicePixelRatio;

for (var res in knowRes)
    if (rw > knowRes[res] - e && rw < knowRes[res] + e)
        rw = knowRes[res];
setMobileScale(rw);

