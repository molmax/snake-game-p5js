cHeight = 800;
cWidth = 800;
score = 0;

function setup() {
    createCanvas(cHeight, cWidth);
    frameRate(5);
    gridSize = 20;
    snake = new Snake();
    apple = createApple();
  }
  
  function draw() {
    background(60)

    sHead = snake.cells[0];
    if (sHead.x == apple.x && sHead.y == apple.y) {
        onAppleConsumed();
    }
    snake.update();
    if (snake.checkCollision()) {
        endGame();
        return;
    }
    snake.render();
    renderApple();
    drawScore();
  }

  function createApple() {
    do {
        x = Math.floor(random(cWidth));
    } while (x % gridSize != 0 || x < gridSize || x > cWidth - gridSize);

    do {
        y = Math.floor(random(cHeight));
    } while (y % gridSize != 0 || y <= gridSize || y > cHeight - gridSize);

    apple = { x: x, y: y };

    return apple;
  }

  function renderApple() {
    fill(240, 0, 0);
    rect(apple.x, apple.y, gridSize);
  }

  function onAppleConsumed() {
    apple = createApple();
    lastCell = snake.cells[snake.cells.length-1];
    x = lastCell.x - gridSize;
    y = lastCell.y - gridSize;
    snake.cells.push({x: x, y: y});
    score++;
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
        });
    }

    checkCollision() {
        let isCollision = false;
        sHead = snake.cells[0];

        if (sHead.x >= cWidth || sHead.x <= 0 || sHead.y >= cWidth || sHead.y <= 0) {
            isCollision = true;
        }

        let tail = snake.cells.slice();
        tail.shift();

        tail.forEach(cell => {
            if (sHead.x == cell.x && sHead.y == cell.y) {
                isCollision =  true;
            }
        });
        return isCollision;
    }
}

function drawScore() {
    textSize(20);
    fill(10, 200, 10);  
    text('score: ' + this.score, cWidth - 80, 20);
}

function endGame() {
    textSize(32);
    fill(256, 256, 256);  
    text('Game Over!', cWidth / 2 - 100, cHeight / 2);

    textSize(20);
    fill(200, 10, 10);  
    text('Score: ' + this.score, cWidth / 2 - 50, cHeight / 2 + 30);
 
    noLoop();
}