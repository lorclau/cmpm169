// sketch.js - First experiment
// Author: Lorraine Torres
// Date: 1/19/2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

//code below inspired by P_2_2_4_01 by generative-design - https://editor.p5js.org/generative-design/sketches/P_2_2_4_01

'use strict';

// Constants
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

var maxCount = 500; // max count of the cirlces
var currentCount = 1;
var x = [];
var y = [];
var r = [];

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  //redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  strokeWeight(0.5);

  // first circle
  x[0] = width / 2;
  y[0] = height / 2;
  r[0] = 10;

  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  clear();

  // create a random set of parameters
  var newR = random(1, 7);
  var newX = random(newR, width - newR);
  var newY = random(newR, height - newR);

  var closestDist = Number.MAX_VALUE;
  var closestIndex = 0;
  // which circle is the closest?
  for (var i = 0; i < currentCount; i++) {
    var newDist = dist(newX, newY, x[i], y[i]);
    if (newDist < closestDist) {
      closestDist = newDist;
      closestIndex = i;
    }
  }

  // show original position of the circle and a line to the new position
  // fill(230);
  // ellipse(newX, newY, newR * 2, newR * 2);
  // line(newX, newY, x[closestIndex], y[closestIndex]);

  // aline it to the closest circle outline
  var angle = atan2(newY - y[closestIndex], newX - x[closestIndex]);

  x[currentCount] = x[closestIndex] + cos(angle) * (r[closestIndex] + newR);
  y[currentCount] = y[closestIndex] + sin(angle) * (r[closestIndex] + newR);
  r[currentCount] = newR;
  currentCount++;

  // draw them
  for (var i = 0; i < currentCount; i++) {
    fill(50);
    ellipse(x[i], y[i], r[i] * 2, r[i] * 2);
  }

  if (currentCount >= maxCount) noLoop();
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    console.log("mouse pressed");
}