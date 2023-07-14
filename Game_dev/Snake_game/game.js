import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from "./snake.js";
import { update as updateFood, draw as drawFood } from './food.js'
import ( SNAKE_SPEED )
import { outsideGrid } from './grid.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board')

/* This function takes in the current time which essentially
is the exact timestamp of when this function runs */
function main(currentTime) {
    if (gameOver) {
        if (confirm('You lost. Press ok to restart.')) {
            // refreshes page
            window.location = '/Game%20dev/Snake_game/'
        }
        return
    }

    // inside of this function will have the current time and then
    // it will recall this main func essentially immediately
    // so that another loop will be set up to happen after 
    // This will create an infinite loop of the main func
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
    lastRenderTime = currentTime;

    // This loop updates all of the logic for the game
    update();

    // Based on the update loop, this function draws on the screen
    draw();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}