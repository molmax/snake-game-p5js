class SnakeCell {
  constructor(x, y, isHead) {
    this.x = x;
    this.y = y;
    this.isHead = isHead;
  }
}

class Snake {
  constructor() {
    this.cells = [];  

    //temp
    let x  = basicCellSize;
    this.cells.push(new SnakeCell(canvasWidth / 2, canvasHeight / 2, true));
    for(let i = 0; i < 10; i++) {
      this.cells.push(new SnakeCell(canvasWidth / 2 - x, canvasHeight / 2, false));
      x = x + basicCellSize;
    }
    //temp

    // this.cells.push(new SnakeCell(canvasWidth / 2, canvasHeight / 2, true));
    // this.cells.push(new SnakeCell(canvasWidth / 2 - basicCellSize, canvasHeight / 2, false));
    //TODO use enum
    this.direction = 'RIGHT';
    this.previousDirection = this.direction;
    this.speed = 3;
  }

  move() {
    let previousX;
    let previousY;

    this.cells.forEach(cell => {

      if (cell.x > canvasWidth) {
        cell.x = 0;
      }
      if(cell.y > canvasHeight) {
        cell.y = 0;
      }
      if (cell.x < 0) {
        cell.x = canvasWidth;
      } 
      if(cell.y < 0) {
        cell.y = canvasHeight;
      }

      if (cell.isHead) {
       

        switch (this.direction) {
          case 'RIGHT': 
            cell.x = cell.x + this.speed;
            break;
          case 'LEFT':
            cell.x = cell.x - this.speed;
            break;
          case 'UP':
            cell.y = cell.y - this.speed; 
            break;
          case 'DOWN':
            cell.y = cell.y + this.speed;
            break;
        }
        previousX = cell.x;
        previousY = cell.y;
      } else {

        let tempX = cell.x;
        let tempY = cell.y;

        switch (this.direction) {
          case 'RIGHT': 
            {
              cell.x = previousX - basicCellSize;
              cell.y = previousY;
            }
            break;
          case 'LEFT':
            {
              cell.x = previousX + basicCellSize;
              cell.y = previousY;

            }
            break;
          case 'UP':
            {
              cell.y = previousY + basicCellSize;
              cell.x = previousX;
            }
            break;
          case 'DOWN':
            {
              cell.y = previousY - basicCellSize;
              cell.x = previousX;
            }
            break;
        }

        previousX = tempX;
        previousY = tempY;
      }
      rect(cell.x, cell.y, basicCellSize);
    });
  }

  changeDirection(direction) {
    let isOppositeDirection = (this.direction === 'RIGHT' && direction === 'LEFT')
    || (this.direction === 'LEFT' && direction === 'RIGHT')
    || (this.direction === 'UP' && direction === 'DOWN')
    || (this.direction === 'DOWN' && direction === 'UP');

    if (isOppositeDirection) {
      return;
    }

    this.previousDirection = this.direction;
    this.direction = direction;
  }

  onFoodConsumed() {
    //TODO
  }
}

const canvasWidth = 400;
const canvasHeight = 400;
const bckgColor = 120;
const frameRateValue = 30;
const basicCellSize = 10;
const snake = new Snake();

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