import { update as updateSnake, draw as drawSnake, SNAKE_SPEED } from "./snake.js";

import ( SNAKE_SPEED)

let lastRenderTime = 0;
const gameBoard = document.getElementById('game-board')

/* This function takes in the current time which essentially
is the exact timestamp of when this function runs */
function main(currentTime) {
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
}

function draw() {
    drawSnake(gameBoard)
}