cHeight = 400;
cWidth = 400;
  
function setup() {
    createCanvas(cHeight, cWidth);
    frameRate(5);
    gridSize = 20;
    snake = new Snake();
    apple = createVector(random(cWidth), random(cHeight));
  }
  
  function draw() {
    background(60);
    snake.update();
    snake.render();
    this.renderApple();
  }

  function renderApple() {
    fill(240, 0, 0);
    rect(apple.x, apple.y, gridSize);
  }
  
  function keyPressed() {
    if (keyCode === UP_ARROW) {
        if (snake.dy === 0) {
             snake.dy = -gridSize;
             snake.dx = 0;
        }
    } else if (keyCode === DOWN_ARROW) {
        if (snake.dy === 0) {
            snake.dy = gridSize;
            snake.dx = 0;     
        }
    } else if (keyCode === LEFT_ARROW) {
        if (snake.dx === 0) {
            snake.dx = -gridSize;
            snake.dy = 0;  
        }
    } else if (keyCode === RIGHT_ARROW) {
        if (snake.dx === 0) {
            snake.dx = gridSize;
            snake.dy = 0;
        }
    }
  }

  class Snake {
    x = 200;
    y = 200;
    dx = gridSize;
    dy = 0;
    cells = [];

    constructor() {
        for (let i = 0; i < 4; i++) {
            let xoff = gridSize * i;
            this.cells.push({ x: this.x - xoff, y: this.y });
        }
    }

    update() {
        this.cells.forEach(cell => {
            cell.x += this.dx;
            cell.y += this.dy;
        });
    }

    render() {
        // scale(gridSize);
        this.cells.forEach(cell => {
            fill(0, 180, 0);
            rect(cell.x, cell.y, gridSize);
        })
    }
}