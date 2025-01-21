// sketch.js - First experiment
// Author: Lorraine Torres
// Date: 1/20/2025

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

// Variables
var maxCount = 425; // max count of the rectangles
var currentCount = 1;
var x = [];
var y = [];
var w = [];  // width of the rectangles
var h = [];  // height of the rectangles
var shakeAmount = 2; // Amount of shake (how far the rectangle moves)
var shakeSpeed = 0.1; // Speed of the shake (how fast the shake occurs)

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

  // drawing setup
  strokeWeight(0.5);
  stroke(0, 50);  // Set line color with slight transparency

  // Set initial position for the first rectangle in the center
  x[0] = width / 2;
  y[0] = height / 2;
  w[0] = 10;  // smaller width for the first rectangle
  h[0] = 5;   // thinner height for the first rectangle

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

  // Create a random set of parameters for the new rectangle
  var newW = random(5, 15);  // width for the new rectangle
  var newH = random(5, 20);   // height for the new rectangle
  var newX = random(newW, width - newW);  // X position of the new rectangle
  var newY = random(newH, height - newH);  // Y position of the new rectangle

  var closestDist = Number.MAX_VALUE;
  var closestIndex = 0;

  // Find the closest rectangle
  for (var i = 0; i < currentCount; i++) {
    var newDist = dist(newX, newY, x[i], y[i]);
    if (newDist < closestDist) {
      closestDist = newDist;
      closestIndex = i;
    }
  }

  // Calculate the angle to align the new rectangle to the closest rectangle outline
  var angle = atan2(newY - y[closestIndex], newX - x[closestIndex]);

  // Position the new rectangle based on the angle and distance from the closest rectangle
  x[currentCount] = x[closestIndex] + cos(angle) * (w[closestIndex] + newW) / 2;
  y[currentCount] = y[closestIndex] + sin(angle) * (h[closestIndex] + newH) / 2;
  w[currentCount] = newW;
  h[currentCount] = newH;
  currentCount++;

  // Draw lines connecting the new rectangle to the closest rectangle
  for (var i = 0; i < currentCount - 1; i++) {
    line(x[i], y[i], x[currentCount - 1], y[currentCount - 1]);
  }

  // Apply shaking effect to each rectangle's position
  for (var i = 0; i < currentCount; i++) {
    // Generate random shake offsets
    var shakeX = random(-shakeAmount, shakeAmount);
    var shakeY = random(-shakeAmount, shakeAmount);

    // Apply the shake effect to the position
    var shakenX = x[i] + shakeX;
    var shakenY = y[i] + shakeY;

    // Draw the rectangle at the shaken position
    fill(50);
    rect(shakenX - w[i] / 2, shakenY - h[i] / 2, w[i], h[i]);
  }

  // Stop the animation once the max count is reached
  if (currentCount >= maxCount) noLoop();
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  console.log("mouse pressed");

  // Set the initial position of the first rectangle to the mouse click position
  x[0] = mouseX;
  y[0] = mouseY;
  
  // Reset the drawing (clear previous rectangles and start fresh)
  currentCount = 1;
}