function arrow(context, fromx, fromy, tox, toy, text) {
    if (fromx == tox && fromy == toy) return;

    // http://stuff.titus-c.ch/arrow.html
    var headlen = 5;   // length of head in pixels
    var angle = Math.atan2(toy - fromy, tox - fromx);
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    context.stroke();
    if (text) {
        var d = [tox - fromx, toy - fromy];
        var l = Math.sqrt(d[0] * d[0] + d[1] * d[1]);
        context.fillText(text, tox + 10 / l * d[0], toy + 10 / l * d[1]);
    }
}

function point(context, x, y, fillStyle, text) {
    if (text == undefined) {
        context.fillStyle = fillStyle;
        context.beginPath();
        context.arc(x, y, 3, 0, 2 * Math.PI);
        context.fill();
    } else {
        var fontTmp = context.font;
        context.font = "bold 12px Georgia";
        context.textAlign = "center";

        context.fillStyle = fillStyle;
        context.beginPath();
        context.arc(x,y, 8, 0, 2 * Math.PI);
        context.fill();

        context.fillStyle = 'rgb(255,255,255)';
        context.fillText(text, x, y + 4);
        context.font = fontTmp;
    }
}

function drawTriangle(context, canvasWidth, canvasHeight, trianglePoints, trianglePointsText) {
    // draw triangle
    context.strokeStyle = 'rgb(0,0,0)';
    context.fillStyle = 'rgb(0,0,0)';
    context.beginPath();
    context.moveTo(canvasWidth * (0.5 - trianglePoints[0][0] / 2.0), canvasHeight * (0.5 - trianglePoints[0][1] / 2.0));
    context.lineTo(canvasWidth * (0.5 - trianglePoints[1][0] / 2.0), canvasHeight * (0.5 - trianglePoints[1][1] / 2.0));
    context.lineTo(canvasWidth * (0.5 - trianglePoints[2][0] / 2.0), canvasHeight * (0.5 - trianglePoints[2][1] / 2.0));
    context.lineTo(canvasWidth * (0.5 - trianglePoints[0][0] / 2.0), canvasHeight * (0.5 - trianglePoints[0][1] / 2.0));
    context.stroke();

    if (trianglePointsText != undefined) {
        point(context, canvasWidth * (0.5 - trianglePoints[0][0] / 2.0), canvasHeight * (0.5 - trianglePoints[0][1] / 2.0), 'rgb(255,0,0)', trianglePointsText[0]);
        point(context, canvasWidth * (0.5 - trianglePoints[1][0] / 2.0), canvasHeight * (0.5 - trianglePoints[1][1] / 2.0), 'rgb(0,255,0)', trianglePointsText[1]);
        point(context, canvasWidth * (0.5 - trianglePoints[2][0] / 2.0), canvasHeight * (0.5 - trianglePoints[2][1] / 2.0), 'rgb(0,0,255)', trianglePointsText[2]);
    } else {
        context.fillStyle = 'rgb(100,100,100)';
        context.fill();
    }
}

function matrixVectorProduct(M, v) {
    var result = [0.0, 0.0, 0.0, 0.0];
    var x = v[0], y = v[1], z = v[2], w = v[3];
    result[0] = M[0] * x + M[4] * y + M[8] * z  + M[12] * w;
    result[1] = M[1] * x + M[5] * y + M[9] * z  + M[13] * w;
    result[2] = M[2] * x + M[6] * y + M[10] * z + M[14] * w;
    result[3] = M[3] * x + M[7] * y + M[11] * z + M[15] * w;
    return result;
};

function dehomogenize(v) {
    return [v[0] / v[3], v[1] / v[3], v[2] / v[3]];
}

function midPoint(a, b) {
    var result = new Array(a.length);
    for (var i = 0; i < a.length; ++i) result[i] = 0.5 * (a[i] + b[i]);
    return result;
}

var Basic2_1 = function () {

    return {
        start: function (canvas) {
            var context = canvas.getContext("2d");
            var canvasWidth = canvas.width;
            var canvasHeight = canvas.height;
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.font = "bold 12px Georgia";
            context.textAlign = "center";
            context.fillText("a)", 10, 16);

            // triangle - in camera space
            var triangle = [[0.0, 0.0, -1.0], [0.0, 2.0, -3.0], [-2.0, -1.0, -3.0]];

            // projection matrix
            var M = [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, -2.0, -1.0, 0.0, 0.0, -3.0, 0.0];

            
            // TODO 6.2
            // Project triangle (Use the helper functions matrixVectorProduct and dehomogenize defined above.).
            // Then render the projected triangle instead of the original triangle!
            // Replace this dummy line!
            var protriangle = new Array(triangle.length);
            for (var i = 0; i < triangle.length; i++) {
                var homo = [triangle[i][0], triangle[i][1], triangle[i][2], 1.0];
                homo = matrixVectorProduct(M, homo);
                protriangle[i] = dehomogenize(homo);
            }
            drawTriangle(context, canvasWidth, canvasHeight, protriangle, ["A'", "B'", "C'"]);
            
            

            // draw axis
            arrow(context, 15, 285, 15, 255);
            arrow(context, 15, 285, 45, 285);
            context.fillStyle = 'rgb(0,0,0)';
            context.fillText("-Y", 5, 260);
            context.fillText("X", 45, 297);
        }
    }
}()

var Basic2_2 = function () {

    return {
        start: function (canvas) {
            var context = canvas.getContext("2d");
            var canvasWidth = canvas.width;
            var canvasHeight = canvas.height;
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.font = "bold 12px Georgia";
            context.textAlign = "center";
            context.fillText("b)", 10, 16);

            // triangle - in camera space
            var triangle = [[0.0, 0.0, -1.0], [0.0, 2.0, -3.0], [-2.0, -1.0, -3.0]];

            // projection matrix
            var M = [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, -2.0, -1.0, 0.0, 0.0, -3.0, 0.0];

            
            // TODO 6.2
            // 1. Project the triangle.
            var protriangle = new Array(triangle.length);
            for (var i = 0; i < triangle.length; i++) {
                var homo = [triangle[i][0], triangle[i][1], triangle[i][2], 1.0];
                homo = matrixVectorProduct(M, homo);
                protriangle[i] = dehomogenize(homo);
            }
            // 2. Compute the midpoints of the edges (Use the helper function midPoint defined above!)
            //    and store them in another triangle.
            var atriangle = [midPoint(protriangle[0], protriangle[1]), midPoint(protriangle[1], protriangle[2]), midPoint(protriangle[2], protriangle[0])];
            // var proatriangle = new Array(atriangle.length);
            // for (var i = 0; i < atriangle.length; i++) {
            //     homo = [atriangle[i][0], atriangle[i][1], atriangle[i][2], 1.0];
            //     homo = matrixVectorProduct(M, homo); 
            //     proatriangle[i] = dehomogenize(homo);
            // }

            // 3. Draw the triangles (Leave last argument undefined for inner triangle!).
            drawTriangle(context, canvasWidth, canvasHeight, protriangle, ["A'", "B'", "C'"]);
            drawTriangle(context, canvasWidth, canvasHeight, atriangle, undefined);

            // draw axis
            arrow(context, 15, 285, 15, 255);
            arrow(context, 15, 285, 45, 285);
            context.fillStyle = 'rgb(0,0,0)';
            context.fillText("-Y", 5, 260);
            context.fillText("X", 45, 297);
        }
    }
}()

var Basic2_3 = function () {

    return {
        start: function (canvas) {
            var context = canvas.getContext("2d");
            var canvasWidth = canvas.width;
            var canvasHeight = canvas.height;
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.font = "bold 12px Georgia";
            context.textAlign = "center";
            context.fillText("c)", 10, 16);

            // triangle - in camera space
            var triangle = [[0.0, 0.0, -1.0], [0.0, 2.0, -3.0], [-2.0, -1.0, -3.0]];
            var triangleInner = new Array(3);
            for (var i = 0; i < 3; ++i) {
                triangleInner[i] = [0.5 * (triangle[i][0] + triangle[(i + 1) % 3][0]),
                                     0.5 * (triangle[i][1] + triangle[(i + 1) % 3][1]),
                                     0.5 * (triangle[i][2] + triangle[(i + 1) % 3][2])];
            }

            // projection matrix
            var M = [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, -2.0, -1.0, 0.0, 0.0, -3.0, 0.0];

           
            // TODO 6.2
            // 1. Project the triangle and store it in homogeneous coordinates.
            var protriangle = new Array(triangle.length);
            for (var i = 0; i < triangle.length; i++) {
                var homo = [triangle[i][0], triangle[i][1], triangle[i][2], 1.0];
                protriangle[i] = matrixVectorProduct(M, homo);
            }
            // 2. Compute the mid points, but this time in homogeneous coordinates (Make use of midPoint()!).
            var atriangle = [midPoint(protriangle[0], protriangle[1]), midPoint(protriangle[1], protriangle[2]), midPoint(protriangle[2], protriangle[3]), midPoint(protriangle[0], protriangle[3])];

            // 3. Dehomogenize the points.
            var proatriangle = new Array(atriangle.length);
            for (var i = 0; i < atriangle.length; i++) {
                proatriangle[i] = dehomogenize(atriangle[i]);
            }

            // 4. Draw the triangles (Leave last argument undefined for inner triangle!).
            // drawTriangle(context, canvasWidth, canvasHeight, protriangle, ["A'", "B'", "C'"]);
            drawTriangle(context, canvasWidth, canvasHeight, proatriangle, undefined);
            

            // draw axis
            arrow(context, 15, 285, 15, 255);
            arrow(context, 15, 285, 45, 285);
            context.fillStyle = 'rgb(0,0,0)';
            context.fillText("-Y", 5, 260);
            context.fillText("X", 45, 297);
        }
    }
}()
