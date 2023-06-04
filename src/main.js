cHeight = 400;
cWidth = 400;
  
function setup() {
    createCanvas(cHeight, cWidth);
    frameRate(5);
    gridSize = 20;
    snake = new Snake();

    do {
        x = Math.floor(random(cWidth));
    } while (x % gridSize != 0);

    do {
        y = Math.floor(random(cHeight));
    } while (y % gridSize != 0);

    apple = createVector(x, y);
  }
  
  function draw() {
    background(60)
    sHead = snake.cells[snake.length - 1];
    // if (sHead.x) {
        // onAppleConsumed();
    // }
    snake.update();
    snake.render();
    this.renderApple();
  }

  function renderApple() {
    fill(240, 0, 0);
    rect(apple.x, apple.y, gridSize);
  }

  function onAppleConsumed() {
    
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
        let prevX = 0;
        let prevY = 0;
        this.cells.forEach(cell => {
            if (prevX == 0 && prevY == 0) {
                prevX = cell.x;
                prevY = cell.y;
                cell.x += this.dx;
                cell.y += this.dy;
            }
            else {
                let tempX = cell.x;
                cell.x = prevX;
                prevX = tempX;

                let tempY = cell.y;
                cell.y = prevY;
                prevY = tempY;
            }        
        });
    }

    render() {
        this.cells.forEach(cell => {
            fill(0, 180, 0);
            rect(cell.x, cell.y, gridSize);
        })
    }
}