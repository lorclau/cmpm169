// sketch.js
// Author: Lorraine Torres
// Date: 2/3/25

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

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

let song;
let analyzer;
let fft;
let lastBeatTime = 0; // Track the last time a beat drop occurred
let bgColor = [0, 0, 0]; // Default canvas color (black)

let colors = [
  [255, 0, 0], // Red
  [0, 255, 0], // Green
  [0, 0, 255], // Blue
  [255, 255, 0], // Yellow
  [255, 165, 0], // Orange
  [138, 43, 226], // BlueViolet
  [75, 0, 130], // Indigo
  [255, 20, 147], // DeepPink
]; // Array of predefined colors

function preload() {
  song = loadSound('music.mp3'); // Load song
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  //createCanvas(600, 400);
  analyzer = new p5.Amplitude();
  fft = new p5.FFT();
  song.play();

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

let angle = 0;

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  // Get the frequency spectrum
  let spectrum = fft.analyze();
  
  // Check for large frequencies (like beat drops)
  let averageFrequency = 0;
  for (let i = 0; i < spectrum.length; i++) {
    averageFrequency += spectrum[i];
  }
  averageFrequency /= spectrum.length;
  
  // If the average frequency is above a certain threshold, change the background color
  if (averageFrequency > 50 && millis() - lastBeatTime > 400) { // 200 is the threshold for a beat drop
    lastBeatTime = millis();
    // Randomly pick a color from the predefined set
    bgColor = random(colors); 
  }
  
  background(bgColor); // Apply the background color change

  // Draw spinning rings based on the frequency bands
  for (let i = 0; i < spectrum.length; i++) {
    // Increased the radius range for bigger rings and a more dramatic response
    let radius = map(spectrum[i], 0, 255, 20, 400);  // Larger range for more dramatic scaling

    let x = width / 2 + cos(angle + i * 0.1) * radius;
    let y = height / 2 + sin(angle + i * 0.1) * radius;

    // Create a color gradient based on the frequency band
    let colorValue = map(spectrum[i], 0, 255, 0, 255);
    let r = colorValue;
    let g = 255 - colorValue;  // Green gets brighter as red dims
    let b = 255 - Math.abs(127 - colorValue); // Adding blue component for more color depth

    // Use dynamic colors for more dramatic effect
    fill(r, g, b, 255);
    noStroke();
    rect(x, y, 5, 5);
  }
  
  angle += 0.01; // Control the speed of spinning
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}