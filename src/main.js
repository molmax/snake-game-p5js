class SnakeCell {
  constructor(x, y, isHead) {
    this.x = x;
    this.y = y;
    this.isHead = isHead;
  }
}

class Snake {
  constructor() {
    this.headX = canvasWidth / 2;
    this.headY = canvasHeight / 2;
    this.cells = [];  
    this.cells.push(new SnakeCell(this.headX, this.headY, true));
    this.cells.push(new SnakeCell(this.headX - basicCellSize, this.headY, false));
    this.direction = 'RIGHT';
    this.previousDirection = this.direction;
    this.speed = 5;
  }

  move() {
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
        this.headX = cell.x;
        this.headY = cell.y;
      } else {
        switch(this.direction) {
          case 'UP': 
          { 
            if (this.previousDirection === 'RIGHT') {
              if (cell.x < this.headX) {
                cell.x = cell.x + this.speed;
              } else {
                cell.y = cell.y - this.speed;
              }
            } else if (this.previousDirection === 'LEFT') {
              if (cell.x > this.headX) {
                cell.x = cell.x - this.speed;
              } else {
                cell.y = cell.y - this.speed;
              }
            } else if (this.previousDirection === 'UP') {
              cell.y = cell.y - this.speed;
            }
          }
          break;
          case 'DOWN': 
          {
            if (this.previousDirection === 'RIGHT') {
              if (cell.x < this.headX) {
                cell.x = cell.x + this.speed;
              } else {
                cell.y = cell.y + this.speed;
              }
            } else if (this.previousDirection === 'LEFT') {
              if (cell.x > this.headX) {
                cell.x = cell.x - this.speed;
              } else {
                cell.y = cell.y + this.speed;
              }
            } else if (this.previousDirection === 'DOWN') {
              cell.y = cell.y + this.speed;
            }
          }
          break;
          case 'RIGHT': {
            if (this.previousDirection === 'UP') {
              if (cell.y > this.headY) {
                cell.y = cell.y - this.speed;
              } else {
                cell.x = cell.x + this.speed;
              }
            } else if (this.previousDirection === 'DOWN') {
              if (cell.y < this.headY) {
                cell.y = cell.y + this.speed;
              } else {
                cell.x = cell.x + this.speed;
              }
            } else if (this.previousDirection === 'RIGHT') {
              cell.x = cell.x + this.speed;
            }
          }
          break;
          case 'LEFT': {
            if (this.previousDirection === 'UP') {
              if (cell.y > this.headY) {
                cell.y = cell.y - this.speed;
              } else {
                cell.x = cell.x - this.speed;
              }
            } else if (this.previousDirection === 'DOWN') {
              if (cell.y < this.headY) {
                cell.y = cell.y + this.speed;
              } else {
                cell.x = cell.x - this.speed;
              }
            } else if (this.previousDirection === 'LEFT') {
              cell.x = cell.x - this.speed;
            }
          }
          break;
        }
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