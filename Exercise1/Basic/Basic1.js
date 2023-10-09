function drawPixelwiseCircle(canvas) {
    var context = canvas.getContext("2d");
    var img = context.createImageData(200, 200);


	for (var i = 0; i < 4 * 200 * 200; i += 4) {
		var spalte = (i % 800) / 4;
		var zeile = Math.floor(i/800);
		var deltaX = zeile-100;
		var deltaY = spalte-100;

		if( Math.sqrt(Math.abs(deltaX * deltaX + deltaY * deltaY ))<50) {
			img.data[i] = 0;
			img.data[i + 1] = 255;
			img.data[i + 2] = 0;
			img.data[i + 3] = 255;
		}
	}

    context.putImageData(img, 0, 0);
}

function drawContourCircle(canvas) {
    var context = canvas.getContext("2d");
    var img = context.createImageData(200, 200);

	for (var i = 0; i < 4 * 200 * 200; i += 4) {
		var spalte = (i % 800) / 4;
		var zeile = Math.floor(i/800);
		var deltaX = zeile-100;
		var deltaY = spalte-100;
		var distance = Math.sqrt(Math.abs(deltaX * deltaX + deltaY * deltaY));

		if(distance <= 50) {
			img.data[i] = 0;
			img.data[i + 1] = 255;
			img.data[i + 2] = 0;
			img.data[i + 3] = 255;
		}
		
		if( (distance > 45) && (distance < 55)) {
			img.data[i] = 0;
			img.data[i + 1] = 127;
			img.data[i + 2] = 0;
			img.data[i + 3] = 255;
		}
	}


    context.putImageData(img, 0, 0);




}

function drawSmoothCircle(canvas) {
    var context = canvas.getContext("2d");
    var img = context.createImageData(200, 200);

	for (var i = 0; i < 4 * 200 * 200; i += 4) {
		var spalte = (i % 800) / 4;
		var zeile = Math.floor(i/800);
		var deltaX = zeile-99.5;
		var deltaY = spalte-99.5;
		var distance = Math.sqrt(Math.abs(deltaX * deltaX + deltaY * deltaY ));

		if(distance <= 50) {
			img.data[i] = 0;
			img.data[i + 1] = 255;
			img.data[i + 2] = 0;
			img.data[i + 3] = 255;
		}
		
		if( (distance > 45) && (distance < 55)) {
			img.data[i] = 0;
			img.data[i + 1] = 127;
			img.data[i + 2] = 0;
			img.data[i + 3] = 255;
		}
		
		if( (distance > 44) && (distance <45)) {
			img.data[i] = 0;
			img.data[i + 1] = 127 + 128*(45-distance);
			img.data[i + 2] = 0;
			img.data[i + 3] = 255;
		}
		
		if( (distance > 55) && (distance <56)) {
			
			img.data[i] = 255*(distance-55);
			img.data[i + 1] = 127 + 128*(distance - 55);
			img.data[i + 2] = 255*(distance-55);
			img.data[i + 3] = 255;
		}
		
		
	}


    context.putImageData(img, 0, 0);
}
