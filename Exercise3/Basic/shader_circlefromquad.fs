precision mediump float;


// TODO 3.3)	Define a constant variable (uniform) to 
//              "send" the canvas size to all fragments.
uniform vec2 canvasSize;

void main(void)
{ 

	 float smoothMargin = 0.01;  
	 float r = 0.8;
	 vec2 coord = vec2((gl_FragCoord.x * 2. / canvasSize.x) - 1., (gl_FragCoord.y * 2. / canvasSize.y) - 1.);
	 float radius = sqrt(pow(coord.x,2.) + pow(coord.y,2.));      	
	 
	 // TODO 3.3)	Map the fragment's coordinate (gl_FragCoord.xy) into 
	 //				the range of [-1,1]. Discard all fragments outside the circle 
	 //				with the radius r. Smooth the circle's edge within 
	 //				[r-smoothMargin, r] by computing an appropriate alpha value.
	 //				Change the following line!
	 if ( radius > r ) {
	 	discard;
	 }
	 gl_FragColor = vec4(1.0, 85.0 / 255.0, 0.0, 1.0);
	 if ( (radius >= r - smoothMargin) && (radius <= r) ) {
	 	gl_FragColor.a = 1.0 - ((radius - r + smoothMargin) / smoothMargin);
	 }

}