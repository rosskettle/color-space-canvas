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
    rgb.r = uColorValues.r;
    rgb.g = y;
    rgb.b = x;
  } else if (uChannel == cG) {
    rgb.r = x;
    rgb.g = uColorValues.g;
    rgb.b = y;
  } else if (uChannel == cB) {
    rgb.r = x;
    rgb.g = y;
    rgb.b = uColorValues.b;
  }
  gl_FragColor = vec4(rgb, 1.0);
}
