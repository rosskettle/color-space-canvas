precision mediump float;
uniform vec2 uResolution;
uniform vec3 uColorValues;
uniform int uChannel;
const   int cL = 0;
const   int cC = 1;
const   int cH = 2;
const   vec3 lch = vec3(70.0,0.0,0.0);

void main(void) {
  float x = 1.0 / uResolution.x * gl_FragCoord.x;
  float y = 1.0 / uResolution.y * gl_FragCoord.y;
  float L, a, b, l, c, h;
  if (uChannel == cL) {
    l = uColorValues.x;
    c = y * 100.0;
    h = x * 6.248;
    L = l;
    a = cos(h) * c;
    b = sin(h) * c;
  } else if (uChannel == cC) {
    l = y * 100.0;
    c = uColorValues.y;
    h = x * 6.248;
    L = l;
    a = cos(h) * c;
    b = sin(h) * c;
  } else if (uChannel == cH) {
    l = y * 100.0;
    c = x * 100.0 ;
    h = uColorValues.z * 3.142 / 180.0;
    L = l;
    a = cos(h) * c;
    b = sin(h) * c;
  }
  float Y = ( L + 16.0 ) / 116.0;
  float X = a / 500.0 + Y;
  float Z = Y - b / 200.0;

  if (pow(Y, 3.0) > 0.008856)
    Y = pow(Y, 3.0);
  else
    Y = (Y - 16.0 / 116.0) / 7.787;

  if (pow(X, 3.0) > 0.008856)
    X = pow(X, 3.0);
  else
    X = (X - 16.0 / 116.0) / 7.787;

  if (pow(Z, 3.0) > 0.008856)
    Z = pow(Z, 3.0);
  else
    Z = (Z - 16.0 / 116.0) / 7.787;

  float R = X *  3.2406 + Y * -1.5372 + Z * -0.4986;
  float G = X * -0.9689 + Y *  1.8758 + Z *  0.0415;
  float B = X *  0.0557 + Y * -0.2040 + Z *  1.0570;

  if (R > 0.0031308)
    R = 1.055 * pow(R, 1.0 / 2.4) - 0.055;
  else
    R = 12.92 * R;

  if (G > 0.0031308)
    G = 1.055 * pow(G, 1.0 / 2.4) - 0.055;
  else
    G = 12.92 * G;

  if (B > 0.0031308)
    B = 1.055 * pow(B, 1.0 / 2.4) - 0.055;
  else
    B = 12.92 * B;

  gl_FragColor = vec4(R,G,B, 1.0);
}
