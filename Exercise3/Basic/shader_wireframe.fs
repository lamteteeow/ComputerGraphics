precision mediump float;


// TODO 3.2a)	Define the varying variable again
//				using the same name to enable 
//				communication between vertex and
//				fragment shader.
varying vec3 color;

void main(void)
{

	float epsilon = .01;
	if ( ( max(max(color[0], color[1]), color[2]) < 1. - epsilon ) && ( min(min(color[0], color[1]), color[2]) > 0. + epsilon ) ) {
		discard;
	}

	
	// TODO 3.2a)	Give each pixel the interpolated
	//				triangle color. Change the following line.
	gl_FragColor = vec4(color, 1.0);


	// TODO 3.2b)	Use the color as barycentric coordinates
	//				and discard all pixels not considered 
	//				edges (farther away from an edge than 
	//				epsilon). Use the GLSL mechanism 'discard'.

	
}