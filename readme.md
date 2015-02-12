#Color Space Canvas

Uses WebGL shaders to renders color spaces on HTML canvas elements. Useful for creating high performance color pickers.

##Current Status
HSV Color space is fully functional.
HSL, RGB, Lab and HCL are in development.

Fallback to 2d canvas context if webgl not available (hsv only)

##Usage

H (Hue) is a value between 0-360 degrees
S (Saturation) is a value between 0-1
V (Value) is a value between 0-1 

Create a canvas

     <canvas id="hsv-canvas" width="256" height="256"></canvas>


Use ColorSpaceCanvas to render to the canvas

The following will render (S)aturation along the x axis and (V)alue along the y axis.
    
    var hsvCanvas = document.getElementById('hsv-canvas'));     
    var hsv = new ColorSpaceCanvas({colorSpace:'hsv', colorValues:[0,1,1], axes:'sv'}, hsvCanvas);


The following will render (H)ue along the x axis.
     
    var hsv = new ColorSpaceCanvas({colorSpace:'hsv', colorValues:[0,1,1], axes:'h'}, hsvCanvas);




