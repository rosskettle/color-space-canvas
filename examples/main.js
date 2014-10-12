var ColorSpaceCanvas = function (props, canvasElement) {
  if (!(this instanceof ColorSpaceCanvas)){
    return new ColorSpaceCanvas(userProps, canvasElement);
  }

  if (typeof props === 'undefined')
    props = {};

  console.log ('aaa',props.axes)

  this._props = {
    colorSpace:  props.colorSpace || 'hsv',
    colorValues:   props.colorValues || [1,1,1],
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
  this._setAxes();
  this._setColorValues();
  this.draw();

}

ColorSpaceCanvas.prototype = {

  setProps: function(changeProps) {
    console.log(changeProps)
    for (var changeProp in changeProps) {
      if (changeProp in this._props) {
        this._props[changeProp] = changeProps[changeProp];
        switch (changeProp) {
          case 'colorValues':
            this._setColorValues();
          case 'constant1':
            this._setColorValues();
          case 'axes':
            this._setAxes();
          case 'width':
          case 'height':
            this._setSize();
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

  _setAxes: function() {
    console.log('_setAxes',this._props.axes)
    var channel;


    switch (this._props.axes) {
      case 'l' :
      case 'ab' :
      case 'ch' :

      case 'r' :
      case 'gb' :
      case 'h' :
      case 'sv' :
      case 'sl' :
        channel = 0;
        break;
      case 'a' :
      case 'lb' :
      case 'lh' :

      case 'g' :
      case 'rb' :
      case 's' :
      case 'hv' :
      case 'hs' :
        channel = 1;
        break;
      case 'b' :
      case 'lb' :
      case 'lc' :

      case 'b' :
      case 'rg' :
      case 'v' :
      case 'hl' :
        channel = 2;
        break;
    }

    this._gl.uniform1i(this._uniforms.uChannel, channel);
  },



  _setColorValues: function() {
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
