class Snake {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.length = 10;
    this.speed = 5;
    this.baseCellSize = 10;
  }

  move() {
    if (this.x > canvasWidth) {
      this.x = 0;
    }
    if(this.y > canvasHeight) {
      this.y = 0;
    }
    if (this.x < 0) {
      this.x = canvasWidth;
    } 
    if(this.y < 0) {
      this.y = canvasHeight;
    }

    if(this.direction === 'RIGHT') {
      this.x = this.x + this.speed; 
    } else if (this.direction === 'LEFT') {
      this.x = this.x - this.speed; 
    } else if (this.direction === 'UP') {
      this.y = this.y - this.speed; 
    } else if (this.direction === 'DOWN') {
      this.y = this.y + this.speed; 
    }
    rect(this.x, this.y, this.length, this.baseCellSize);
  }

  changeDirection(direction) {
    this.direction = direction;
  }

  onFoodConsumed() {
    //TODO set length limit
    this.length = this.length + this.baseCellSize;
  }
}

const canvasWidth = 400;
const canvasHeight = 400;
const bckgColor = 120;
const frameRateValue = 30;
const snake = new Snake(canvasWidth / 2, canvasHeight / 2, 'RIGHT');

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(frameRateValue);
}

function draw() {
  background(bckgColor);
  snake.move();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.changeDirection('UP');
  } else if (keyCode === DOWN_ARROW) {
    snake.changeDirection('DOWN');
  } else if (keyCode === LEFT_ARROW) {
    snake.changeDirection('LEFT');
  } else if (keyCode === RIGHT_ARROW) {
    snake.changeDirection('RIGHT');
  }
}