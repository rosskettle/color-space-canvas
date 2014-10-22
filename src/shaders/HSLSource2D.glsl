precision mediump float;

uniform vec2 uResolution;
uniform vec3 uColorValues;
uniform int uChannel;
const   int cH = 0;
const   int cS = 1;
const   int cL = 2;

float hue2rgb(float v1, float v2, float vH) {

  if ( vH < 0.0 ) vH += 1.0;
  if ( vH > 1.0 ) vH -= 1.0;
  if ( ( 6.0 * vH ) < 1.0 ) {
   return ( v1 + ( v2 - v1 ) * 6.0 * vH );
  };
  if ( ( 2.0 * vH ) < 1.0 ) {
   return ( v2 );
  }
  if ( ( 3.0 * vH ) < 2.0 ) {
    return ( v1 + ( v2 - v1 ) * ( ( 2.0 / 3.0 ) - vH ) * 6.0 );
  }
  return ( v1 );
}

void main(void) {

   float x = 1.0 / uResolution.x * gl_FragCoord.x;
   float y = 1.0 / uResolution.y * gl_FragCoord.y;
   float H, S, L;
   if (uChannel == cH) {
      H = uColorValues.x;
      S = x;
      L = y;
   } else if (uChannel == cS) {
      H = x;
      S = uColorValues.y;
      L = y;
   } else if (uChannel == cL) {
      H = x;
      S = y;
      L = uColorValues.z;
   }

   vec3 rgb;
   float var_1, var_2;
   if (S == 0.0) {
     rgb = vec3(L, L, L);
   } else {
     if ( L < 0.5 ) {
       var_2 = L * ( 1.0 + S );
     } else  {
       var_2 = ( L + S ) - ( S * L );
     }
     var_1 = 2.0 * L - var_2;
     rgb.r = hue2rgb( var_1, var_2, H + ( 1.0 / 3.0 ) );
     rgb.g = hue2rgb( var_1, var_2, H );
     rgb.b = hue2rgb( var_1, var_2, H - ( 1.0 / 3.0 ) );
   }
   gl_FragColor = vec4(rgb, 1.0);
}
