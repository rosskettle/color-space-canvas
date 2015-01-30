


      var normalizeX = null;
      var normalizeY = null;
      var normalizeZ = null;

      var normalizeHue = function (degrees) {
        return 1 / 360 * degrees;
      }

      var denormalizeHue = function (ratio) {
        return ratio * 360;
      }

      var identity = function(val) {
        return val;
      }

      // ----Model----



      var hsvModel = {
        colorSpace:   'hsv',
        axes:         'yz',
        labels:       ['hue','saturation','values'],
        colorValues:  [90,.5,.5],
        normalizeX:   normalizeHue,
        denormalizeX: denormalizeHue

      }

      var hslModel = {
        colorSpace:   'hsl',
        axes:         'yz',
        labels:       ['hue','saturation','lightness'],
        colorValues:  [90,.5,.5],
        normalizeX:   normalizeHue,
        denormalizeX: denormalizeHue
      }

      var rgbModel = {
        colorSpace:   'rgb',
        labels:       ['red','green','blue'],
        axes:         'yz',
        colorValues:  [255,0,0],
        normalizeX:   identity,
        denormalizeX: identity
      }

      var labModel = {
        colorSpace:   'lab',
        labels:       ['L','a','b'],
        axes:         'yz',
        colorValues:  [90,.5,.5],
        normalizeX:   normalizeHue,
        denormalizeX: denormalizeHue
      }

      var lchModel = {
        colorSpace:   'lch',
        labels:       ['L','chroma','hue'],
        axes:         'yz',
        colorValues:  [90,.5,.5],
        normalizeX:   normalizeHue,
        denormalizeX: denormalizeHue
      }

      model = rgbModel;




      Array.observe(model.colorValues,function(changes){
        rect.setProps({colorValues: model.colorValues});
        console.log(model.colorValues)
        bar.setProps({colorValues: model.colorValues});
        updateColorBlock(model.colorValues);
        input0.value = model.colorValues[0];
        input1.value = model.colorValues[1];
        input2.value = model.colorValues[2];
        updateMarkerPositions();
      })

      Object.observe(model, function(changes) {
        rect.setProps({axes: model.axes})
        if (model.axes == 'yz')
          barAxis = 'x';
        else if (model.axes == 'xz')
          barAxis = 'y';
        else if (model.axes == 'xy')
          barAxis = 'z';
        bar.setProps({axes: barAxis})
        updateMarkerPositions();
      })
      // ------------

      var radios = document.getElementsByName('axes');
      var radioChange = function (e) {
        model.axes = e.target.value;
      }

      radios[0].onchange = radioChange
      radios[1].onchange = radioChange
      radios[2].onchange = radioChange



      var input0 = document.getElementById('c0');
      var input1 = document.getElementById('c1');
      var input2 = document.getElementById('c2');

      var colorBlock = document.getElementById('color-block');

      var rectCanvas = document.getElementById('rect-canvas');
      var barCanvas  = document.getElementById('bar-canvas');
      var marker     = document.getElementById('marker');

      var updateMarkerPositions = function() {
        var x,y,z;
        switch (model.axes) {
          case 'yz' :
            x = 255 * model.colorValues[1]
            y = 255 - 255 * model.colorValues[2]
            z = 255 * model.normalizeX(model.colorValues[0])
            break;
          case 'xz' :
            x = 255 * model.normalizeX(model.colorValues[0])
            y = 255 - 255 * model.colorValues[2]
            z = 255 * model.colorValues[1]
            break;
          case 'xy' :
            x = 255 * model.normalizeX(model.colorValues[0])
            y = 255 -255 * model.colorValues[1]
            z = 255 * model.colorValues[2]
            break;

        }
        setMarkerPosition(x,y);
        setSliderPosition(z);

      }

      var setMarkerPosition = function (x,y) {
        marker.style.left = x + 'px';
        marker.style.top  = y + 'px';
      }

      rectCanvas.onclick = function (e) {
        var x = e.clientX - e.target.offsetParent.offsetLeft;
        var y = e.clientY - e.target.offsetParent.offsetTop;

        switch (model.axes) {
          case 'yz' :
            model.colorValues[1] = 1 / 255 * x;
            model.colorValues[2] = 1 - 1 / 255 * y;
            break;
          case 'xz' :
            model.colorValues[0] = 1 / 255 * model.denormalizeX(x);
            model.colorValues[2] = 1 - 1 / 255 * y;
            break;
          case 'xy' :
            model.colorValues[0] = 1 / 255 * model.denormalizeX(x);
            model.colorValues[1] = 1 - 1 / 255 * y;
            break;

        }
      }

      var setSliderPosition = function (z) {
        slider.style.left = z + 'px';
      }

      barCanvas.onclick = function (e) {
        var x = e.clientX - e.target.offsetParent.offsetLeft;

        switch (model.axes) {
          case 'yz' :
            model.colorValues[0] = (1 / 255 * x) * 360;
            break;
          case 'xz' :
            model.colorValues[1] = (1 / 255 * x);
            break;
          case 'xy' :
            model.colorValues[2] = (1 / 255 * x);
            break;

        }
      }

      var updateColorBlock = function(cols) {
        var rgb = chroma[model.colorSpace](cols).rgb()
        cssString = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')'
        colorBlock.style.backgroundColor = cssString;
      }

      input0.onchange = function(){
        model.colorValues[0] = parseFloat(input0.value)
      }
      input1.onchange = function(){
        model.colorValues[1] = parseFloat(input1.value)
      }
      input2.onchange =  function(){
        model.colorValues[2] = parseFloat(input2.value)
      }

      var bar = new ColorSpaceCanvas({colorSpace:model.colorSpace, colorValues: model.colorValues, axes:'x'}, barCanvas);

      var rect = new ColorSpaceCanvas({colorSpace:model.colorSpace, colorValues: model.colorValues, axes:'yz'}, rectCanvas);

      updateColorBlock(model.colorValues);
      updateMarkerPositions();
