"use strict";

///////////////////////////
//// global variables  ////
///////////////////////////

var polygon = new Polygon([new Point(100, 10),
            new Point(120, 72),
            new Point(186, 72),
            new Point(136, 112),
            new Point(153, 173),
            new Point(100, 138),
            new Point(47, 173),
            new Point(64, 112),
            new Point(14, 72),
            new Point(80, 72)],
        10, new Color(255, 127, 0));

/////////////////////
//// edge table  ////
/////////////////////

// edge table entry
function EdgeTableEntry(edge) {
    var dx = 0;
    var dy = 0;
    if (edge.startPoint.y < edge.endPoint.y) {
        this.y_lower = edge.startPoint.y;
        this.x_lower = edge.startPoint.x;
        this.y_upper = edge.endPoint.y;
        dx = edge.endPoint.x - edge.startPoint.x;
        dy = edge.endPoint.y - edge.startPoint.y;
    } else {
        this.y_lower = edge.endPoint.y;
        this.x_lower = edge.endPoint.x;
        this.y_upper = edge.startPoint.y;
        dx = edge.startPoint.x - edge.endPoint.x;
        dy = edge.startPoint.y - edge.endPoint.y;
    }

    this.invSlope = dx / dy;
}

function compareEdgeTableEntries(a, b) {
    return a.y_lower - b.y_lower;
}

function printEdgeTableEntry(e) {
    console.log("ET: " + e.y_lower + " " + e.x_lower + " " + e.y_upper + " " + e.invSlope);
}

// edge table
function EdgeTable(polygon) {
    this.entries = new Array(polygon.nEdges);
    this.nEntries = polygon.nEdges;

    for (var i = 0; i < polygon.nEdges; i++) {
        this.entries[i] = new EdgeTableEntry(polygon.edges[i]);
    }
    this.entries.sort(compareEdgeTableEntries);

    for (var i = 0; i < polygon.nEdges; i++) {
        printEdgeTableEntry(this.entries[i]);
    }
}

////////////////////////////
//// active edge table  ////
////////////////////////////

// active edge table entry
function ActiveEdgeTableEntry(edgeTableEntry) {
    this.x_intersect = edgeTableEntry.x_lower;
    this.y_upper = edgeTableEntry.y_upper;
    this.invSlope = edgeTableEntry.invSlope;
}

function compareActiveEdgeTableEntries(a, b) {
    return a.x_intersect - b.x_intersect;
}

// active edge table
function ActiveEdgeTable() {
    this.entries = new Array();
    this.nEntries = 0;
}

/////////////////////////////
//// scanline algorithm  ////
/////////////////////////////

function scanline(image, polygon) {

    var edgeTable = new EdgeTable(polygon);
    var activeEdgeTable = new ActiveEdgeTable();

    // TODO 2.3     Perform the scanline algorithm
    //              by following the single comments.
    //              In order to reach the full number of
    //              points, you only have to do the man-
    //              datory part.

    for (var y_scanline = 0; y_scanline < image.height; y_scanline++) {
        // [optimization]
        // if the active edge table is empty (nEntries==0) we can step to the next edge, i.e. we can set y_scanline = myEdgeTableEntry.y_lower
        // note that the edge table is sorted by y_lower!

        // [mandatory]
        // as we cannot delete entries from the active edge table:
        // - build a new active edge table
        // - copy all those edges from the previous active edge table which should still be in the active edge table for this scanline
        // - assign the new active edge table to activeEdgeTable
    
        if (activeEdgeTable.entries.length != 0) {
            var activeEdgeTableT = new ActiveEdgeTable();

            for (var i = 0; i < activeEdgeTable.entries.length; i++) {

                if (activeEdgeTable.entries[i].y_upper > y_scanline) {

                    activeEdgeTableT.entries.push(new ActiveEdgeTableEntry(activeEdgeTable.entries[i]));
                    activeEdgeTableT.nEntries++;

                    activeEdgeTableT.entries[activeEdgeTableT.nEntries - 1].x_intersect = activeEdgeTable.entries[i].x_intersect;
                }
            }
            activeEdgeTable = activeEdgeTableT;

        }

        // [mandatory]
        // add new edges from the edge table to the active edge table
        for (var j = 0; j < edgeTable.entries.length; j++) {

            if (edgeTable.entries[j].y_lower == y_scanline) {
                if (!((edgeTable.entries[j].invSlope == -Infinity) || (edgeTable.entries[j].invSlope == Infinity))) {
                    activeEdgeTable.entries.push(new ActiveEdgeTableEntry(edgeTable.entries[j]));
                    activeEdgeTable.nEntries++;
                }
            }
        }

        // [mandatory]
        // sort the active edge table along x (use the array sort function with compareActiveEdgeTableEntries as compare function)

        if (activeEdgeTable.entries.length != 0) {
            activeEdgeTable.entries.sort(compareActiveEdgeTableEntries);
        }

        // [mandatory]
        // rasterize the line:
        // for every two successive active edge entries set the pixels in between the x intersections (the first and the second entry build a line segment, the third and the fourth build a line segment and so on)
        // note that setPixel() requires integer pixel coordinates!

        for (var i = 0; i < activeEdgeTable.entries.length; i += 2) {

            for (var j = Math.round(activeEdgeTable.entries[i].x_intersect); j < Math.round(activeEdgeTable.entries[i + 1].x_intersect); j++) {
                var pixel = new Point(j, y_scanline);
                setPixel(image, pixel, polygon.color);
            }
        }
        // [mandatory]
        // update the x_intersect of the active edge table entries
        for (var i = 0; i < activeEdgeTable.entries.length; i++) {

            activeEdgeTable.entries[i].x_intersect += activeEdgeTable.entries[i].invSlope;

        }

    }
}

//////////////////////////
//// render function  ////
//////////////////////////

function RenderCanvas3() {
    // get canvas handle
    var context = document.getElementById("canvas3").getContext("2d");
    var canvas = context.createImageData(200, 200);

    // clear canvas
    clearImage(canvas, new Color(255, 255, 255));

    // draw line
    scanline(canvas, polygon);

    // show image
    context.putImageData(canvas, 0, 0);
}

function setupScanline(canvas) {
    // execute rendering
    RenderCanvas3();
}
