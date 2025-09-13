document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const scoreElement = document.getElementById('score');

    const gridSize = 20;
    const cellSize = 20;
    let snake = [{ x: 10, y: 10 }];
    let food = generateFood();
    let direction = 'right';
    let score = 0;

    function generateFood() {
        const foodX = Math.floor(Math.random() * gridSize);
        const foodY = Math.floor(Math.random() * gridSize);
        return { x: foodX, y: foodY };
    }

    function draw() {
        board.innerHTML = '';

        // Draw snake
        snake.forEach(segment => {
            const snakeSegment = document.createElement('div');
            snakeSegment.className = 'snake';
            snakeSegment.style.gridRowStart = segment.y + 1;
            snakeSegment.style.gridColumnStart = segment.x + 1;
            board.appendChild(snakeSegment);
        });

        // Draw food
        const foodElement = document.createElement('div');
        foodElement.className = 'food';
        foodElement.style.gridRowStart = food.y + 1;
        foodElement.style.gridColumnStart = food.x + 1;
        board.appendChild(foodElement);
    }

    function update() {
        // Move snake
        const head = { ...snake[0] };
        switch (direction) {
            case 'up':
                head.y = (head.y - 1 + gridSize) % gridSize;
                break;
            case 'down':
                head.y = (head.y + 1) % gridSize;
                break;
            case 'left':
                head.x = (head.x - 1 + gridSize) % gridSize;
                break;
            case 'right':
                head.x = (head.x + 1) % gridSize;
                break;
        }

        // Check collision with food
        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreElement.textContent = `Score: ${score}`;
            food = generateFood();
        } else {
            // Remove the tail
            snake.pop();
        }

        // Check collision with self
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            gameOver();
            return;
        }

        // Add new head
        snake.unshift(head);

        draw();
    }

    function handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') {
                    direction = 'up';
                }
                break;
            case 'ArrowDown':
                if (direction !== 'up') {
                    direction = 'down';
                }
                break;
            case 'ArrowLeft':
                if (direction !== 'right') {
                    direction = 'left';
                }
                break;
            case 'ArrowRight':
                if (direction !== 'left') {
                    direction = 'right';
                }
                break;
        }
    }

    function gameOver() {
        alert(`Game Over! Your score is ${score}.`);
        resetGame();
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        food = generateFood();
        direction = 'right';
        score = 0;
        scoreElement.textContent = 'Score: 0';
        draw();
    }

    // Initial setup
    draw();
    setInterval(update, 200);

    // Event listeners
    document.addEventListener('keydown', handleKeyPress);
});
