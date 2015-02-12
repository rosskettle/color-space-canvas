
var handleLostContext = function (event, props) {

  newCanvas = rectCanvas.cloneNode();
  rectCanvas.parentNode.replaceChild(newCanvas, rectCanvas);
  rectCanvas = newCanvas;
  config.colorValues = [0,.5,.5]
  space = new ColorSpaceCanvas(config, rectCanvas);

}

var config = {
    handleLostContext: handleLostContext,
    colorSpace:        'hsv',
    colorValues:       [90,.5,.5],
    axes:              'sv',
    useFallback:       false
  }

var rectCanvas = document.getElementById('rect-canvas');
var space = new ColorSpaceCanvas(config, rectCanvas);


