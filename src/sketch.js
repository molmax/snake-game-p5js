const canvasWidth = 400;
const canvasHeight = 400;
const bckgColor = 120;
const frameRateValue = 30;

const cellSize = 10;
const stepSize = 20;
let snakeX = canvasWidth / 2;
let snakeY = canvasHeight / 2;


function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(frameRateValue);
}

function draw() {
  background(bckgColor);
  rect(snakeX, snakeY, cellSize);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snakeY = snakeY - stepSize;
  } else if (keyCode === DOWN_ARROW) {
    snakeY = snakeY + stepSize;
  } else if (keyCode === LEFT_ARROW) {
    snakeX = snakeX - stepSize;
  } else if (keyCode === RIGHT_ARROW) {
    snakeX = snakeX + stepSize;
  }
}