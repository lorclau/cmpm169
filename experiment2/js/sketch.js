// sketch.js - purpose and description here
// Author: Lorraine Torres
// Date: 1/27/2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

// Variables
let cols, rows;
let spacing = 20;
let water = [];
let ripples = [];

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
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  cols = floor(width / spacing);
  rows = floor(height / spacing);
  
  // Initialize water matrix with zeros
  for (let i = 0; i < cols; i++) {
    water[i] = [];
    for (let j = 0; j < rows; j++) {
      water[i][j] = 0;
    }
  }

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(0);

  // Update water levels with sine function and noise
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let angle = (frameCount * 0.1) + (i * 0.5) + (j * 0.5);
      water[i][j] = sin(angle) * 20 + noise(i * 0.1, j * 0.1, frameCount * 0.01) * 120;
    }
  }

  // Process each ripple
  for (let i = ripples.length - 1; i >= 0; i--) {
    let ripple = ripples[i];

    // Apply the ripple effect to all grid cells
    for (let j = 0; j < cols; j++) {
      for (let k = 0; k < rows; k++) {
        let cellX = j * spacing;
        let cellY = k * spacing;

        // Calculate the distance from the ripple center (mouse click)
        let d = dist(cellX, cellY, ripple.x, ripple.y);

        // Apply a sine wave effect based on distance from the ripple origin
        let waveStrength = max(0, ripple.strength - d * ripple.decayRate);
        if (waveStrength > 0) {
          water[j][k] += sin(frameCount * 0.1 + d * 0.5) * waveStrength;  // Amplified wave effect
        }
      }
    }

    // Decrease ripple strength over time
    ripple.strength *= ripple.damping;

    // Remove the ripple if it's too weak
    if (ripple.strength < 0.5) {  // Lower threshold to keep the ripple a bit longer
      ripples.splice(i, 1);
    }
  }

  // Display the water surface
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * spacing;
      let y = j * spacing;
      let waterHeight = water[i][j];

      // Render the water as small ellipses
      fill(0, 0, 255, 150);
      noStroke();
      ellipse(x, y, spacing, spacing);
      
      // Add shading to simulate depth of the ripple
      fill(255, 255, 255, 80);
      ellipse(x, y, spacing - waterHeight * 0.5, spacing - waterHeight * 0.5);
    }
  }
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
    let ripple = {
      x: mouseX,
      y: mouseY,
      strength: 70,       // Initial strength of the ripple
      decayRate: 0.03,      // How fast the ripple decays (spreads outward)
      damping: 0.98        // How much the ripple weakens each frame
    };
    ripples.push(ripple);
}