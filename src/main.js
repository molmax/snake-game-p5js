cHeight = 400;
cWidth = 400;
  
class Snake {
    x = 200;
    y = 200;
    dx = grid;
    dy = 0;
    cells = [];

    constructor() {
        for (let i = 0; i < 4; i++) {
            let xoff = grid * i;
            this.cells.push({ x: this.x - xoff, y: this.y });
        }
        // this.cells.unshift({ x: this.x, y: this.y })
    }

    update() {
        this.cells.forEach(cell => {
            cell.x += this.dx;
            cell.y += this.dy;
        });
    }

    render() {
        this.cells.forEach(cell => {
            fill(0, 180, 0);
            rect(cell.x, cell.y, grid);
        })
    }
}

  function setup() {
    createCanvas(cHeight, cWidth);
    frameRate(15);
    grid = 10;
    snake = new Snake();
  }
  
  function draw() {
    background(60);
    snake.update();
    snake.render();
  }
  
  function keyPressed() {
    if (keyCode === UP_ARROW) {
        if (snake.dy === 0) {
             snake.dy = -grid;
             snake.dx = 0;
        }
    } else if (keyCode === DOWN_ARROW) {
        if (snake.dy === 0) {
            snake.dy = grid;
            snake.dx = 0;     
        }
    } else if (keyCode === LEFT_ARROW) {
        if (snake.dx === 0) {
            snake.dx = -grid;
            snake.dy = 0;  
        }
    } else if (keyCode === RIGHT_ARROW) {
        if (snake.dx === 0) {
            snake.dx = grid;
            snake.dy = 0;
        }
    }
  }