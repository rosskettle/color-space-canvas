var ColorSpaceCanvas = function (props, canvasElement) {
  if (!(this instanceof ColorSpaceCanvas)){
    return new ColorSpaceCanvas(userProps, canvasElement);
  }

  if (typeof props === 'undefined')
    props = {};

  this._props = {
    colorSpace:  props.colorSpace || 'hsv',
    axes:        props.axes || 'sv'
  };

  if (typeof canvasElement !== 'undefined') {
    this.element = canvasElement;
    if (!('width' in props)) {
      this._props.width = canvasElement.width
    }
    if (!('height' in props)) {
      this._props.height = canvasElement.height
    }
  }  else {
    this.element = this._createElement();
  }

  this._fragmentShaderSource = this._whichShader(this._props.colorSpace, this._props.axes);

  this._gl = this._getContext();
  this._initGL(this._quadVertices(), this._fragmentShaderSource);

  this._setSize();
  this._setAxes(props.axes);
  this._setColorValues(props.colorValues);
  this.draw();

}

ColorSpaceCanvas.prototype = {

  getGLContext: function() {
    return this._gl;
  },

  setProps: function(changeProps) {
    for (var changeProp in changeProps) {
      if (changeProp in this._props) {
        var val = changeProps[changeProp]
        switch (changeProp) {
          case 'colorValues':
            this._setColorValues(val);
            break;
          case 'constant1':
            this._setColorValues(val);
            break;
          case 'axes':
            this._setAxes(val);
            break;
          case 'width':
          case 'height':
            this._setSize(val);
            break;
        }
      }
    }
    this.draw();
  },

  draw: function() {
    var gl = this._gl;

    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  },

  _whichShader : function (colorSpace, axes) {
     var shaderBaseName = colorSpace.toUpperCase() + 'Source'
     if (axes.length === 1)
       return ColorSpaceCanvas.Shaders[shaderBaseName + '1D']
     else if (axes.length === 2)
       return ColorSpaceCanvas.Shaders[shaderBaseName + '2D']
  },

  _shaderProgram: null,

  _uniforms: null,

  _attributes: null,

  _vertexBuffer: null,

  _setSize: function() {
    this.element.setAttribute('width', this._props.width);
    this.element.setAttribute('height', this._props.height);
    this._gl.viewport(0, 0, this._props.width, this._props.height);
    this._gl.uniform2f(this._uniforms.uResolution, this._props.width, this._props.height);
    this._setResolution();
  },

  _setResolution: function() {
    this._gl.uniform2f(this._uniforms.uResolution, this._props.width, this._props.height);
  },

  _setAxes: function(axes) {
    this._props.axes = axes;
    var channel;

    var axes = this._props.axes;
    var colorSpace = this._props.colorSpace;
    var colorSpaceAxes = colorSpace + "-" + axes;
    var channel0 = [
      'rgb-r',
      'rgb-gb',
      'hsv-h',
      'hsv-sv',
      'hsl-h',
      'hsl-sl',
      'lab-l',
      'lab-ab',
      'lch-l',
      'lch-ch'
    ];
    var channel1 = [
      'rgb-g',
      'rgb-rb',
      'hsv-s',
      'hsv-hv',
      'hsl-s',
      'hsl-hl',
      'lab-a',
      'lab-lb',
      'lch-c',
      'lch-lh'
    ];
    var channel2 = [
      'rgb-b',
      'rgb-rg',
      'hsv-v',
      'hsv-hs',
      'hsl-l',
      'hsl-hs',
      'lab-b',
      'lab-la',
      'lch-h',
      'lch-lc'
    ]

    if (axes == 'x' || axes == 'yz')
      channel = 0;
    else if (axes == 'y' || axes == 'xz')
      channel = 1;
    else if (axes == 'z' || axes == 'xy')
      channel = 2;
    else {
      if (channel0.indexOf(colorSpaceAxes) > -1)
        channel = 0;
      else if (channel1.indexOf(colorSpaceAxes) > -1)
        channel = 1;
      else if (channel2.indexOf(colorSpaceAxes) > -1)
        channel = 2;
      else
        throw new Error ('Unknown colorspace / axes combination.')
    }
    this._gl.uniform1i(this._uniforms.uChannel, channel);
  },



  _setColorValues: function(inputValues) {
   switch (this._props.colorSpace) {
      case 'hsv':
      case 'hsl':
        this._props.colorValues = [
          inputValues[0] / 360,
          inputValues[1],
          inputValues[2]
        ]
      break;

   }
   this._gl.uniform3fv(this._uniforms.uColorValues, new Float32Array(this._props.colorValues));
  },

  _createElement: function() {
    var el = document.createElement('canvas');
    return el
  },

  _getContext: function() {
    return this.element.getContext('webgl');
  },

  _quadVertices: function() {
    return new Float32Array([
      1.0, 1.0, -1.0, 1.0,
      1.0, -1.0, -1.0, -1.0
    ]);
  },

  _initGL: function(quadVertices, fragmentShaderSource) {
    this._shaderProgram = this._loadShaders(fragmentShaderSource);
    this._uniforms = this._getUniforms(this._shaderProgram);
    this._attributes = this._getAttributes(this._shaderProgram);

    this._vertexBuffer = this._loadVertexBuffer(quadVertices);
    this._bind();
  },


  _loadShaders: function(fragmentShaderSource) {
    var gl = this._gl;


    var vertSource = [
      'attribute vec2 aXY;',
      'void main(void) {',
      '   gl_Position = vec4(aXY, 0, 1.0);',
      '}'
    ].join('\n');

    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertSource);
    gl.compileShader(vertShader);

    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
      throw new Error('Vertex Shader compilation failed.');
    }

    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragmentShaderSource);
    gl.compileShader(fragShader);

    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
      throw new Error('Fragment Shader compilation failed.');
    }

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, fragShader);
    gl.attachShader(shaderProgram, vertShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      throw new Error('Shaders failed to link');
    }

    gl.useProgram(shaderProgram);
    return shaderProgram;
  },

  _getUniforms: function(shaderProgram) {
    return {
      uResolution: this._gl.getUniformLocation(shaderProgram, 'uResolution'),
      uChannel: this._gl.getUniformLocation(shaderProgram, 'uChannel'),
      uColorValues: this._gl.getUniformLocation(shaderProgram, 'uColorValues'),
    };
  },

  _getAttributes: function(shaderProgram) {
    return {
      aXY: this._gl.getAttribLocation(shaderProgram, 'aXY')
    };
  },

  _loadVertexBuffer: function(gridVertices) {
    var gl = this._gl;
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, gridVertices, gl.STATIC_DRAW);
    return buffer;
  },

  _bind: function() {
    var gl = this._gl;
    gl.enableVertexAttribArray(this._attributes.aXY);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
    gl.vertexAttribPointer(this._attributes.aXY, 2, gl.FLOAT, false, 0, 0);
  }

}

if (typeof module !== 'undefined')
  module.exports = ColorSpaceCanvas;
