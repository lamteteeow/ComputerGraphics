
/////////////////////////////////////////////
/////////  Complex Number Helpers  //////////
/////////////////////////////////////////////
function ComplexNumber(re, im) {
    this.re = re;
    this.im = im;
}

function ComplexNumberFromCoords(x, y, canvasID) {
    var canvas = document.getElementById(canvasID);
    this.re = (x / (1.0 * canvas.width) - 0.5);
    this.im = (y / (1.0 * canvas.height) - 0.5);
    if (canvasID == 'julia_canvas') {
        this.re *= 3;
        this.im *= 3;
    } else {
        this.re = this.re * 3 * Math.pow(2, zoom) + center.re;
        this.im = this.im * 2 * Math.pow(2, zoom) + center.im;
    }
}

function mult(x, y) {
    var re = (x.re * y.re - x.im * y.im);
    var im = (x.re * y.im + x.im * y.re);
    return new ComplexNumber(re, im);
}

function add(x, y) {
    var re = (x.re + y.re);
    var im = (x.im + y.im);
    return new ComplexNumber(re, im);
}

function sub(x, y) {
    var re = (x.re - y.re);
    var im = (x.im - y.im);
    return new ComplexNumber(re, im);
}

function abs(x) {
    return Math.sqrt(x.re * x.re + x.im * x.im);
}


/////////////////////////////////
/////////  Magic Math  //////////
/////////////////////////////////
function f_c(z, c) {
    //  1.4a):      Compute the result of function f_c for a given z and
    //                  a given c. Use the helper functions.
	//
	
	return add(mult(z,z), c);


}

function countIterations(start_z, c, max_iter) {

    //  1.4a):      Count iterations needed for the sequence to diverge.
    //                  z is declared diverged as soon as its absolute value
    //                  exceeds 2. If the sequence does not diverge during
    //                  the first max_iter iterations, return max_iter. Use
    //                  function f_c().
	var iter = 0;


	while(iter <= max_iter){	
	if(abs(start_z) <= 2){
		start_z = f_c(start_z, c);
		iter++;

	}else{
		break;
	}
	}
	
	if(abs(start_z)<1){
		return iter;
	}
	else{
		
		return (iter + 1 - Math.log(Math.log(abs(start_z)))/Math.log(2));
	}

    // TODO 1.4b):      Change the return value of this function to avoid
    //                  banding. Return the unchanged number of iterations
    //                  for abs(z) < 1;
	//mu = N + 1 - log (log  |Z(N)|) / log 2
	



}


/////////////////////////////
/////////  Colors  //////////
/////////////////////////////
function getColorForIter(iter) {

    // find out which radio button is checked, i.e. which color scheme is picked
    var colorscheme;
    var radios = document.getElementsByName('colors');
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            colorscheme = radios[i].value;
            break;
        }
    }

    // return color according to chosen color scheme
    var color = [128, 128, 128];
    if (colorscheme == "black & white") {
        //  1.4a):      Return the correct color for the iteration count
        //                  stored in iter. Pixels corresponding to complex
        //                  numbers for which the sequence diverges should be
        //                  shaded white. Use the global variable max_iter.
		if(iter < max_iter){
			color = [255, 255, 255];
		}
		else{
			color= [0, 0, 0];
		}



    } else if (colorscheme == "greyscale") {
        //  1.4b):      Choose a greyscale color according to the given
        //                  iteration count in relation to the maximum
        //                  iteration count. The more iterations are needed
        //                  for divergence, the darker the color should be.
        //                  Be aware of integer division!
		if(iter < max_iter){
			grey = 255 - 255 * ((1 / max_iter) * iter);
			color = [grey, grey, grey];
		}
		else{
			color= [0, 0, 0];
		}



    } else if (colorscheme == "underwater") {
        //  1.4b):      Choose a color between blue and green according
        //                  to the given iteration count in relation to the
        //                  maximum iteration count. The more iterations are
        //                  needed for divergence, the more green and less
        //                  blue the color should be.
		if(iter < max_iter){
					rate = 1/max_iter;
					blue = 255 - 255 * rate * iter;
					green = 255 * (rate * iter);
					color = [0, green, blue];
				}
				else{
					color= [0,0,0];
				}


    } else { // rainbow
        //  1.4b):      Choose a rainbow color according to the given
        //                  iteration count in relation to the maximum
        //                  iteration count. Colors should change from blue
        //                  (for very few needed iterations) over violet, pink,
        //                  red, yellow and green back to blue (for lots of
        //                  needed iterations). Use the HSV model and convert
        //                  HSV to RGB colors using function hsv2rgb.
	rate = 1/max_iter;
	var farbton = 190+360*rate*iter;
	
	if (farbton>360){
	 farbton = farbton-360;
	}
	
	var blue = [farbton, 100, 100];
	if(iter < max_iter){
			color = hsv2rgb(blue);
				}
				else{
					color= [0,0,0];
				}
	
    }
	
    return color;

}


function hsv2rgb(hsv) {

    var H = hsv[0];
    var s = hsv[1]/100;
    var v = hsv[2]/100;

    //  1.4b):      Replace the following line by code performing the
    //                  HSV to RGB convertion known from the lecture.
    
	C = v * s;
	x = C * (1 - Math.abs((H / 60)% 2 - 1));
	m = v - C;
	
	
	switch(true){
		case ((H >= 0) && (H < 60)):
		rgb = [C, x, 0];
		break;
		
		case ((H >= 60) && (H < 120)):
		rgb = [x, C, 0];
		break;
		
		case ((H >= 120) && (H < 180)):
		rgb = [0, C, x];
		break;
		
		case ((H >= 180) && (H < 240)):
		rgb = [0, x, C];
		break;		
		
		case ((H >= 240) && (H < 300)):
		rgb = [x, 0, C];
		break;

		case ((H >= 300) && (H <= 360)):
		rgb = [C, 0, x];
		break;	
		
	}
	
	rgb = [(rgb[0]+m)*255, (rgb[1]+m)*255 , (rgb[2]+m)*255];

    return rgb;
}


/////////////////////////////////////
/////////  Canvas Fillers  //////////
/////////////////////////////////////
function mandelbrotSet(image) {

    for (var i = 0; i < 4 * image.width * image.height; i += 4) {
        var pixel = i / 4;
        var x = pixel % image.width;
        var y = image.height - pixel / image.width;

        var c = new ComplexNumberFromCoords(x, y, 'mandelbrot_canvas');


		var z = new ComplexNumber(0, 0);
		var iter = countIterations(z, c, max_iter);
		var rgb = getColorForIter(iter);

        image.data[i] = rgb[0];
        image.data[i + 1] = rgb[1];
        image.data[i + 2] = rgb[2];
        image.data[i + 3] = 255;
    }
}

function juliaSet(image) {

    for (var i = 0; i < 4 * image.width * image.height; i += 4) {
        var pixel = i / 4;
        var x = pixel % image.width;
        var y = image.height - pixel / image.width;


		var c = juliaC;
		var z = new ComplexNumberFromCoords(x, y, 'julia_canvas');
		var iter = countIterations(z, c, max_iter);
		var rgb = getColorForIter(iter);


        image.data[i] = rgb[0];
        image.data[i + 1] = rgb[1];
        image.data[i + 2] = rgb[2];
        image.data[i + 3] = 255;
    }
}

///////////////////////////////
/////////  Renderers  //////////
///////////////////////////////
function RenderMandelbrotSet() {
    // get the canvas
    var canvas = document.getElementById("mandelbrot_canvas");
    c = canvas.getContext("2d");

    // create a new image
    image = c.createImageData(canvas.width, canvas.height);

    // render Mandelbrot set
    mandelbrotSet(image);

    // write image back to canvas
    c.putImageData(image, 0, 0);
}

function RenderJuliaSet() {
    // get the canvas
    var canvas = document.getElementById("julia_canvas");
    c = canvas.getContext("2d");

    // create a new image
    image = c.createImageData(canvas.width, canvas.height);

    // render Julia set
    juliaSet(image);

    // write image back to canvas
    c.putImageData(image, 0, 0);
}


///////////////////////////////
//////////   "main"   /////////
///////////////////////////////

// maximum iteration number for Mandelbrot computation
var max_iter = 30;

// coordinate system center
var center = new ComplexNumber(-0.5, 0);

// zoom stage
var zoom = 0;

// flag to show if mouse is pressed
var dragging = false;

// helper variables for Julia set line
var firstLinePointSet = false;
var firstLinePoint;
var secondLinePoint;
var loopVariable = 0;
var looper = null;

// helper variable for moving around
var lastPoint;

// c for Julia set creation
var juliaC = new ComplexNumber(0.4, 0.1);

function setupMandelbrot(canvas) {
    // reset color scheme and maximum iteration number
    var radios = document.getElementsByName('colors');
    radios[0].checked = true;
    var slider = document.getElementById('slider');
    slider.value = 30;

    // render
    RenderMandelbrotSet();
    RenderJuliaSet();

    // add event listeners
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('mouseup', onMouseUp, false);



    canvas.addEventListener('DOMMouseScroll', onMouseWheel, false);

}


//////////////////////////////////////
//////////   Event Listeners   ///////
//////////////////////////////////////
function onMouseDown(e) {

    var canvas = document.getElementById("mandelbrot_canvas");
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    y = canvas.height - y;

    if (e.ctrlKey) {
        // choose new c for Julia set creation
        clearInterval(looper);
        juliaC = new ComplexNumberFromCoords(x, y, 'mandelbrot_canvas');
        RenderJuliaSet();
    } else if (e.shiftKey) {
        if (firstLinePointSet == false) {
            firstLinePointSet = true;
            firstLinePoint = [x, y];
            RenderMandelbrotSet();
            clearInterval(looper);
        } else {
            firstLinePointSet = false;
            secondLinePoint = [x, y];
            var c = document.getElementById('mandelbrot_canvas');
            var ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgb(255,255,255)";
            ctx.moveTo(Math.round(firstLinePoint[0]), canvas.height - Math.round(firstLinePoint[1]));
            ctx.lineTo(Math.round(secondLinePoint[0]), canvas.height - Math.round(secondLinePoint[1]));
            ctx.stroke();
            looper = setInterval(juliaLoop, 20);
            loopVariable = 0;
        }
    } else {
        //  1.4c):      Store the hit point as pixel coordinates and
        //                  start the dragging process. Use the global
        //                  variables dragging (bool) and lastPoint (two
        //                  dimensional vector).#
		dragging = true;
		lastPoint = [x, y];

    }

}


function juliaLoop() {
    var alpha = 0.5 * Math.sin(loopVariable * 0.05) + 0.5; // oscillating between 0 and 1
    juliaC = new ComplexNumberFromCoords((1 - alpha) * firstLinePoint[0] + alpha * secondLinePoint[0], (1 - alpha) * firstLinePoint[1] + alpha * secondLinePoint[1], 'mandelbrot_canvas');
    RenderJuliaSet();
    loopVariable++;
}


function onMouseMove(e) {
    if (dragging) {
        var canvas = document.getElementById("mandelbrot_canvas");
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        y = canvas.height - y;

        //  1.4c):      Convert both last and current hit point to
        //                  their corresponding complex numbers, compute
        //                  their distance (also as a complex number) and
        //                  shift the plane accordingly. To do so, change
        //                  the global variable center which is used to
        //                  compute the complex number corresponding to a pixel.
		var last = new ComplexNumberFromCoords(lastPoint[0], lastPoint[1], 'mandelbrot_canvas');
		var current = new ComplexNumberFromCoords(x, y, 'mandelbrot_canvas');
		var distance = sub(current, last);
	
		center = sub(center, distance);
		lastPoint = [x,y];
				
        // rerender image
        RenderMandelbrotSet();
    }
}

function onMouseUp(e) {
    //  1.4c):      Prevent dragging of the plane once the mouse is
    //                  not pressed anymore.
	dragging = false;


}

function onMouseWheel(e) {
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    zoom = zoom + delta;

    // render
    RenderMandelbrotSet();

    // do not scroll the page
    e.preventDefault();
}

function onChangeMaxIter(value) {
    max_iter = value;

    // render
    RenderMandelbrotSet();
    RenderJuliaSet();
}

function onChangeColorScheme() {
    // render
    RenderMandelbrotSet();
    RenderJuliaSet();
}
