precision mediump float;

uniform vec2 uResolution;
uniform vec3 uColorValues;
uniform int uChannel;
const   int cH = 0;
const   int cS = 1;
const   int cV = 2;

void main(void) {
   float x = 1.0 / uResolution.x * gl_FragCoord.x;
   float y = 1.0 / uResolution.y * gl_FragCoord.y;
   float H;
   float S;
   float V;
   if (uChannel == cH) {
      H = uColorValues.x;
      S = x;
      V = y;
   } else if (uChannel == cS) {
      H = x;
      S = uColorValues.y;
      V = y;
   } else if (uChannel == cV) {
      H = x;
      S = y;
      V = uColorValues.z;
   }

   float sector = H * 6.0;
   if (sector == 6.0)
     sector = 0.0;

   float side = floor(sector);
   float f = sector - side;

   float var_1 = V * (1.0 - S);
   float var_2 = V * (1.0 - S * (sector - side));
   float var_3 = V * (1.0 - S * (1.0 - (sector - side)));

   vec3 rgb;

   if (side == 0.0) {
     rgb.r = V;
     rgb.g = var_3;
     rgb.b = var_1;
   } else if (side == 1.0) {
     rgb.r = var_2;
     rgb.g = V;
     rgb.b = var_1;
   } else if (side == 2.0) {
     rgb.r = var_1;
     rgb.g = V;
     rgb.b = var_3;
   } else if (side == 3.0) {
     rgb.r = var_1;
     rgb.g = var_2;
     rgb.b = V;
   } else if (side == 4.0) {
     rgb.r = var_3;
     rgb.g = var_1;
     rgb.b = V;
   } else {
     rgb.r = V;
     rgb.g = var_1;
     rgb.b = var_2;
   }
   gl_FragColor = vec4(rgb, 1.0);
}
