function drawArcCircle(canvas) {
    var context = canvas.getContext("2d");

	context.beginPath();
    context.arc(60, 60, 50, 0 , 2 * Math.PI, false);  
	context.fillStyle='#00FF00';
	context.fill();
    
	context.beginPath();
	context.arc(140, 140, 50, 0, 2 * Math.PI, false);
	context.lineWidth = 10;
	context.fillStyle='#00FF00';
	context.fill();
	context.strokeStyle='#007F00';
	context.stroke();



}
