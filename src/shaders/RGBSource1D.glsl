precision mediump float;
uniform vec2 uResolution;
uniform vec3 uColorValues;
uniform int uChannel;
const   int cR = 0;
const   int cG = 1;
const   int cB = 2;

void main(void) {
  float x = 1.0 / uResolution.x * gl_FragCoord.x;
  float y = 1.0 / uResolution.y * gl_FragCoord.y;
  vec3 rgb;
  if (uChannel == cR) {
    rgb.r = x;
    rgb.g = uColorValues.g;
    rgb.b = uColorValues.b;
  } else if (uChannel == cG) {
    rgb.r = uColorValues.r;
    rgb.g = x;
    rgb.b = uColorValues.b;
  } else if (uChannel == cB) {
    rgb.r = uColorValues.r;
    rgb.g = uColorValues.r;
    rgb.b = x;
  }
  gl_FragColor = vec4(rgb, 1.0);
}
