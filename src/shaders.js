ColorSpaceCanvas.Shaders = {
  HSLSource1D:     [
    'precision mediump float;',
    
    'uniform vec2 uResolution;',
    'uniform vec3 uColorValues;',
    'uniform int uChannel;',
    'const   int cH = 0;',
    'const   int cS = 1;',
    'const   int cL = 2;',
    
    'float hue2rgb(float v1, float v2, float vH) {',
    
    '  if ( vH < 0.0 ) vH += 1.0;',
    '  if ( vH > 1.0 ) vH -= 1.0;',
    '  if ( ( 6.0 * vH ) < 1.0 ) {',
    '   return ( v1 + ( v2 - v1 ) * 6.0 * vH );',
    '  };',
    '  if ( ( 2.0 * vH ) < 1.0 ) {',
    '   return ( v2 );',
    '  }',
    '  if ( ( 3.0 * vH ) < 2.0 ) {',
    '    return ( v1 + ( v2 - v1 ) * ( ( 2.0 / 3.0 ) - vH ) * 6.0 );',
    '  }',
    '  return ( v1 );',
    '}',
    
    'void main(void) {',
    
    '   float x = 1.0 / uResolution.x * gl_FragCoord.x;',
    '   float y = 1.0 / uResolution.y * gl_FragCoord.y;',
    '   float H, S, L;',
    '   if (uChannel == cH) {',
    '      H = x;',
    '      S = 1.0;',
    '      L = 0.5;',
    '   } else if (uChannel == cS) {',
    '      H = uColorValues.x;',
    '      S = x;',
    '      L = uColorValues.z;',
    '   } else if (uChannel == cL) {',
    '      H = uColorValues.x;',
    '      S = uColorValues.y;',
    '      L = x;',
    '   }',
    
    '   vec3 rgb;',
    '   float var_1, var_2;',
    '   if (S == 0.0) {',
    '     rgb = vec3(L, L, L);',
    '   } else {',
    '     if ( L < 0.5 ) {',
    '       var_2 = L * ( 1.0 + S );',
    '     } else  {',
    '       var_2 = ( L + S ) - ( S * L );',
    '     }',
    '     var_1 = 2.0 * L - var_2;',
    '     rgb.r = hue2rgb( var_1, var_2, H + ( 1.0 / 3.0 ) );',
    '     rgb.g = hue2rgb( var_1, var_2, H );',
    '     rgb.b = hue2rgb( var_1, var_2, H - ( 1.0 / 3.0 ) );',
    '   }',
    '   gl_FragColor = vec4(rgb, 1.0);',
    '}'
    ].join('\n'),
  HSLSource2D:     [
    'precision mediump float;',
    
    'uniform vec2 uResolution;',
    'uniform vec3 uColorValues;',
    'uniform int uChannel;',
    'const   int cH = 0;',
    'const   int cS = 1;',
    'const   int cL = 2;',
    
    'float hue2rgb(float v1, float v2, float vH) {',
    
    '  if ( vH < 0.0 ) vH += 1.0;',
    '  if ( vH > 1.0 ) vH -= 1.0;',
    '  if ( ( 6.0 * vH ) < 1.0 ) {',
    '   return ( v1 + ( v2 - v1 ) * 6.0 * vH );',
    '  };',
    '  if ( ( 2.0 * vH ) < 1.0 ) {',
    '   return ( v2 );',
    '  }',
    '  if ( ( 3.0 * vH ) < 2.0 ) {',
    '    return ( v1 + ( v2 - v1 ) * ( ( 2.0 / 3.0 ) - vH ) * 6.0 );',
    '  }',
    '  return ( v1 );',
    '}',
    
    'void main(void) {',
    
    '   float x = 1.0 / uResolution.x * gl_FragCoord.x;',
    '   float y = 1.0 / uResolution.y * gl_FragCoord.y;',
    '   float H, S, L;',
    '   if (uChannel == cH) {',
    '      H = uColorValues.x;',
    '      S = x;',
    '      L = y;',
    '   } else if (uChannel == cS) {',
    '      H = x;',
    '      S = uColorValues.y;',
    '      L = y;',
    '   } else if (uChannel == cL) {',
    '      H = x;',
    '      S = y;',
    '      L = uColorValues.z;',
    '   }',
    
    '   vec3 rgb;',
    '   float var_1, var_2;',
    '   if (S == 0.0) {',
    '     rgb = vec3(L, L, L);',
    '   } else {',
    '     if ( L < 0.5 ) {',
    '       var_2 = L * ( 1.0 + S );',
    '     } else  {',
    '       var_2 = ( L + S ) - ( S * L );',
    '     }',
    '     var_1 = 2.0 * L - var_2;',
    '     rgb.r = hue2rgb( var_1, var_2, H + ( 1.0 / 3.0 ) );',
    '     rgb.g = hue2rgb( var_1, var_2, H );',
    '     rgb.b = hue2rgb( var_1, var_2, H - ( 1.0 / 3.0 ) );',
    '   }',
    '   gl_FragColor = vec4(rgb, 1.0);',
    '}'
    ].join('\n'),
  HSVSource1D:     [
    'precision mediump float;',
    
    'uniform vec2 uResolution;',
    'uniform vec3 uColorValues;',
    'uniform int uChannel;',
    'const   int cH = 0;',
    'const   int cS = 1;',
    'const   int cV = 2;',
    
    
    'void main(void) {',
    '   float x = 1.0 / uResolution.x * gl_FragCoord.x;',
    '   float y = 1.0; // / uResolution.y * gl_FragCoord.y;',
    '   float H;',
    '   float S;',
    '   float V;',
    '   if (uChannel == cH) {',
    '      H = x;',
    '      S = 1.0;//uColorValues.y;',
    '      V = 1.0;//uColorValues.z;',
    '   } else if (uChannel == cS) {',
    '      H = uColorValues.x;',
    '      S = x;',
    '      V = uColorValues.z;',
    '   } else if (uChannel == cV) {',
    '      H = uColorValues.x;',
    '      S = uColorValues.y;',
    '      V = x;',
    '   }',
    
    '   float sector = H * 6.0;',
    '   if (sector == 6.0)',
    '     sector = 0.0;',
    
    '   float side = floor(sector);',
    '   float f = sector - side;',
    
    '   float var_1 = V * (1.0 - S);',
    '   float var_2 = V * (1.0 - S * (sector - side));',
    '   float var_3 = V * (1.0 - S * (1.0 - (sector - side)));',
    
    '   vec3 rgb;',
    
    '   if (side == 0.0) {',
    '     rgb.r = V;',
    '     rgb.g = var_3;',
    '     rgb.b = var_1;',
    '   } else if (side == 1.0) {',
    '     rgb.r = var_2;',
    '     rgb.g = V;',
    '     rgb.b = var_1;',
    '   } else if (side == 2.0) {',
    '     rgb.r = var_1;',
    '     rgb.g = V;',
    '     rgb.b = var_3;',
    '   } else if (side == 3.0) {',
    '     rgb.r = var_1;',
    '     rgb.g = var_2;',
    '     rgb.b = V;',
    '   } else if (side == 4.0) {',
    '     rgb.r = var_3;',
    '     rgb.g = var_1;',
    '     rgb.b = V;',
    '   } else {',
    '     rgb.r = V;',
    '     rgb.g = var_1;',
    '     rgb.b = var_2;',
    '   }',
    '   gl_FragColor = vec4(rgb, 1.0);',
    '}'
    ].join('\n'),
  HSVSource2D:     [
    'precision mediump float;',
    
    'uniform vec2 uResolution;',
    'uniform vec3 uColorValues;',
    'uniform int uChannel;',
    'const   int cH = 0;',
    'const   int cS = 1;',
    'const   int cV = 2;',
    
    'void main(void) {',
    '   float x = 1.0 / uResolution.x * gl_FragCoord.x;',
    '   float y = 1.0 / uResolution.y * gl_FragCoord.y;',
    '   float H;',
    '   float S;',
    '   float V;',
    '   if (uChannel == cH) {',
    '      H = uColorValues.x;',
    '      S = x;',
    '      V = y;',
    '   } else if (uChannel == cS) {',
    '      H = x;',
    '      S = uColorValues.y;',
    '      V = y;',
    '   } else if (uChannel == cV) {',
    '      H = x;',
    '      S = y;',
    '      V = uColorValues.z;',
    '   }',
    
    '   float sector = H * 6.0;',
    '   if (sector == 6.0)',
    '     sector = 0.0;',
    
    '   float side = floor(sector);',
    '   float f = sector - side;',
    
    '   float var_1 = V * (1.0 - S);',
    '   float var_2 = V * (1.0 - S * (sector - side));',
    '   float var_3 = V * (1.0 - S * (1.0 - (sector - side)));',
    
    '   vec3 rgb;',
    
    '   if (side == 0.0) {',
    '     rgb.r = V;',
    '     rgb.g = var_3;',
    '     rgb.b = var_1;',
    '   } else if (side == 1.0) {',
    '     rgb.r = var_2;',
    '     rgb.g = V;',
    '     rgb.b = var_1;',
    '   } else if (side == 2.0) {',
    '     rgb.r = var_1;',
    '     rgb.g = V;',
    '     rgb.b = var_3;',
    '   } else if (side == 3.0) {',
    '     rgb.r = var_1;',
    '     rgb.g = var_2;',
    '     rgb.b = V;',
    '   } else if (side == 4.0) {',
    '     rgb.r = var_3;',
    '     rgb.g = var_1;',
    '     rgb.b = V;',
    '   } else {',
    '     rgb.r = V;',
    '     rgb.g = var_1;',
    '     rgb.b = var_2;',
    '   }',
    '   gl_FragColor = vec4(rgb, 1.0);',
    '}'
    ].join('\n'),
  LABSource1D:     [
    ''
    ].join('\n'),
  LABSource2D:     [
    'precision mediump float;',
    ' uniform vec2 uResolution;',
    ' uniform vec3 uColorValues;',
    ' uniform int uChannel;',
    ' const   int cL = 0;',
    ' const   int cA = 1;',
    ' const   int cB = 2;',
    
    ' void main(void) {',
    '   float x = 1.0 / uResolution.x * gl_FragCoord.x;',
    '   float y = 1.0 / uResolution.y * gl_FragCoord.y;',
    '   float L,a,b;',
    '   if (uChannel == cL) {',
    '     L = uColorValues.x;',
    '     a = x * 256.0 - 128.0;',
    '     b = y * 256.0 - 128.0;',
    '   } else if (uChannel == cA) {',
    '     L = x * 100.0;',
    '     a = uColorValues.y;',
    '     b = y * 256.0 - 127.0;',
    '   } else if (uChannel == cB) {',
    '     L = x * 100.0;',
    '     a = y * 256.0 - 127.0;',
    '     b = uColorValues.z;',
    '   }',
    '   float Y = ( L + 16.0 ) / 116.0;',
    '   float X = a / 500.0 + Y;',
    '   float Z = Y - b / 200.0;',
    
    '   if (pow(Y, 3.0) > 0.008856)',
    '     Y = pow(Y, 3.0);',
    '   else',
    '     Y = (Y - 16.0 / 116.0) / 7.787;',
    
    '   if (pow(X, 3.0) > 0.008856)',
    '     X = pow(X, 3.0);',
    '   else',
    '     X = (X - 16.0 / 116.0) / 7.787;',
    
    '   if (pow(Z, 3.0) > 0.008856)',
    '     Z = pow(Z, 3.0);',
    '   else',
    '     Z = (Z - 16.0 / 116.0) / 7.787;',
    
    '   float R = X *  3.2406 + Y * -1.5372 + Z * -0.4986;',
    '   float G = X * -0.9689 + Y *  1.8758 + Z *  0.0415;',
    '   float B = X *  0.0557 + Y * -0.2040 + Z *  1.0570;',
    
    '   if (R > 0.0031308)',
    '     R = 1.055 * pow(R, 1.0 / 2.4) - 0.055;',
    '   else',
    '     R = 12.92 * R;',
    
    '   if (G > 0.0031308)',
    '     G = 1.055 * pow(G, 1.0 / 2.4) - 0.055;',
    '   else',
    '     G = 12.92 * G;',
    
    '   if (B > 0.0031308)',
    '     B = 1.055 * pow(B, 1.0 / 2.4) - 0.055;',
    '   else',
    '     B = 12.92 * B;',
    
    '   gl_FragColor = vec4(R,G,B, 1.0);',
    ' }'
    ].join('\n'),
  LCHSource1D:     [
    'precision mediump float;',
    'uniform vec2 uResolution;',
    'uniform vec3 uColorValues;',
    'uniform int uChannel;',
    'const   int cL = 0;',
    'const   int cC = 1;',
    'const   int cH = 2;',
    'const   vec3 lch = vec3(70.0,0.0,0.0);',
    
    'void main(void) {',
    '  float x = 1.0 / uResolution.x * gl_FragCoord.x;',
    '  float y = 1.0 / uResolution.y * gl_FragCoord.y;',
    '  float L, a, b, l, c, h;',
    '  if (uChannel == cL) {',
    '    l = uColorValues.x;',
    '    c = y * 100.0;',
    '    h = x * 6.248;',
    '    L = l;',
    '    a = cos(h) * c;',
    '    b = sin(h) * c;',
    '  } else if (uChannel == cC) {',
    '    l = y * 100.0;',
    '    c = uColorValues.y;',
    '    h = x * 6.248;',
    '    L = l;',
    '    a = cos(h) * c;',
    '    b = sin(h) * c;',
    '  } else if (uChannel == cH) {',
    '    l = y * 100.0;',
    '    c = x * 100.0 ;',
    '    h = uColorValues.z * 3.142 / 180.0;',
    '    L = l;',
    '    a = cos(h) * c;',
    '    b = sin(h) * c;',
    '  }',
    '  float Y = ( L + 16.0 ) / 116.0;',
    '  float X = a / 500.0 + Y;',
    '  float Z = Y - b / 200.0;',
    
    '  if (pow(Y, 3.0) > 0.008856)',
    '    Y = pow(Y, 3.0);',
    '  else',
    '    Y = (Y - 16.0 / 116.0) / 7.787;',
    
    '  if (pow(X, 3.0) > 0.008856)',
    '    X = pow(X, 3.0);',
    '  else',
    '    X = (X - 16.0 / 116.0) / 7.787;',
    
    '  if (pow(Z, 3.0) > 0.008856)',
    '    Z = pow(Z, 3.0);',
    '  else',
    '    Z = (Z - 16.0 / 116.0) / 7.787;',
    
    '  float R = X *  3.2406 + Y * -1.5372 + Z * -0.4986;',
    '  float G = X * -0.9689 + Y *  1.8758 + Z *  0.0415;',
    '  float B = X *  0.0557 + Y * -0.2040 + Z *  1.0570;',
    
    '  if (R > 0.0031308)',
    '    R = 1.055 * pow(R, 1.0 / 2.4) - 0.055;',
    '  else',
    '    R = 12.92 * R;',
    
    '  if (G > 0.0031308)',
    '    G = 1.055 * pow(G, 1.0 / 2.4) - 0.055;',
    '  else',
    '    G = 12.92 * G;',
    
    '  if (B > 0.0031308)',
    '    B = 1.055 * pow(B, 1.0 / 2.4) - 0.055;',
    '  else',
    '    B = 12.92 * B;',
    
    '  gl_FragColor = vec4(R,G,B, 1.0);',
    '}'
    ].join('\n'),
  LCHSource2D:     [
    'precision mediump float;',
    'uniform vec2 uResolution;',
    'uniform vec3 uColorValues;',
    'uniform int uChannel;',
    'const   int cL = 0;',
    'const   int cC = 1;',
    'const   int cH = 2;',
    'const   vec3 lch = vec3(70.0,0.0,0.0);',
    
    'void main(void) {',
    '  float x = 1.0 / uResolution.x * gl_FragCoord.x;',
    '  float y = 1.0 / uResolution.y * gl_FragCoord.y;',
    '  float L, a, b, l, c, h;',
    '  if (uChannel == cL) {',
    '    l = uColorValues.x;',
    '    c = y * 100.0;',
    '    h = x * 6.248;',
    '    L = l;',
    '    a = cos(h) * c;',
    '    b = sin(h) * c;',
    '  } else if (uChannel == cC) {',
    '    l = y * 100.0;',
    '    c = uColorValues.y;',
    '    h = x * 6.248;',
    '    L = l;',
    '    a = cos(h) * c;',
    '    b = sin(h) * c;',
    '  } else if (uChannel == cH) {',
    '    l = y * 100.0;',
    '    c = x * 100.0 ;',
    '    h = uColorValues.z * 3.142 / 180.0;',
    '    L = l;',
    '    a = cos(h) * c;',
    '    b = sin(h) * c;',
    '  }',
    '  float Y = ( L + 16.0 ) / 116.0;',
    '  float X = a / 500.0 + Y;',
    '  float Z = Y - b / 200.0;',
    
    '  if (pow(Y, 3.0) > 0.008856)',
    '    Y = pow(Y, 3.0);',
    '  else',
    '    Y = (Y - 16.0 / 116.0) / 7.787;',
    
    '  if (pow(X, 3.0) > 0.008856)',
    '    X = pow(X, 3.0);',
    '  else',
    '    X = (X - 16.0 / 116.0) / 7.787;',
    
    '  if (pow(Z, 3.0) > 0.008856)',
    '    Z = pow(Z, 3.0);',
    '  else',
    '    Z = (Z - 16.0 / 116.0) / 7.787;',
    
    '  float R = X *  3.2406 + Y * -1.5372 + Z * -0.4986;',
    '  float G = X * -0.9689 + Y *  1.8758 + Z *  0.0415;',
    '  float B = X *  0.0557 + Y * -0.2040 + Z *  1.0570;',
    
    '  if (R > 0.0031308)',
    '    R = 1.055 * pow(R, 1.0 / 2.4) - 0.055;',
    '  else',
    '    R = 12.92 * R;',
    
    '  if (G > 0.0031308)',
    '    G = 1.055 * pow(G, 1.0 / 2.4) - 0.055;',
    '  else',
    '    G = 12.92 * G;',
    
    '  if (B > 0.0031308)',
    '    B = 1.055 * pow(B, 1.0 / 2.4) - 0.055;',
    '  else',
    '    B = 12.92 * B;',
    
    '  gl_FragColor = vec4(R,G,B, 1.0);',
    '}'
    ].join('\n'),
  RGBSource1D:     [
    'precision mediump float;',
    'uniform vec2 uResolution;',
    'uniform vec3 uColorValues;',
    'uniform int uChannel;',
    'const   int cR = 0;',
    'const   int cG = 1;',
    'const   int cB = 2;',
    
    'void main(void) {',
    '  float x = 1.0 / uResolution.x * gl_FragCoord.x;',
    '  float y = 1.0 / uResolution.y * gl_FragCoord.y;',
    '  vec3 rgb;',
    '  if (uChannel == cR) {',
    '    rgb.r = x;',
    '    rgb.g = uColorValues.g;',
    '    rgb.b = uColorValues.b;',
    '  } else if (uChannel == cG) {',
    '    rgb.r = uColorValues.r;',
    '    rgb.g = x;',
    '    rgb.b = uColorValues.b;',
    '  } else if (uChannel == cB) {',
    '    rgb.r = uColorValues.r;',
    '    rgb.g = uColorValues.r;',
    '    rgb.b = x;',
    '  }',
    '  gl_FragColor = vec4(rgb, 1.0);',
    '}'
    ].join('\n'),
  RGBSource2D:     [
    'precision mediump float;',
    'uniform vec2 uResolution;',
    'uniform vec3 uColorValues;',
    'uniform int uChannel;',
    'const   int cR = 0;',
    'const   int cG = 1;',
    'const   int cB = 2;',
    
    'void main(void) {',
    '  float x = 1.0 / uResolution.x * gl_FragCoord.x;',
    '  float y = 1.0 / uResolution.y * gl_FragCoord.y;',
    '  vec3 rgb;',
    '  if (uChannel == cR) {',
    '    rgb.r = uColorValues.r;',
    '    rgb.g = y;',
    '    rgb.b = x;',
    '  } else if (uChannel == cG) {',
    '    rgb.r = x;',
    '    rgb.g = uColorValues.g;',
    '    rgb.b = y;',
    '  } else if (uChannel == cB) {',
    '    rgb.r = x;',
    '    rgb.g = y;',
    '    rgb.b = uColorValues.b;',
    '  }',
    '  gl_FragColor = vec4(rgb, 1.0);',
    '}'
    ].join('\n')
}; if (typeof module !== 'undefined') module.exports = ColorSpaceCanvas.Shaders;