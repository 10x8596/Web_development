import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 5;
const snakeBody = [{x: 11, y: 11}]
let newSegments = 0;

export function update() {
    addSegments();
    const inputDirection = getInputDirection();
    // loop through every segment of the snake except last
    // because the last segment will essentially disappear
    // the minus 2 will give the second to last body length of the snake
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        // i is the second to last element and i plus 1 is the last element
        // set the last element to the current element as a brand new object ({ ... })
        // so there aren't any reference problems. It will create a duplicate of our snake at position i
        // and set that to our snake at position i plus 1.
        snakeBody[i + 1] = { ...snakeBody[i] }
    }
    // update the head based on where we are moving
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
}

export function expandSnake(amount) {
    newSegments += amount
}

// takes in a position and determines if this position is on the snake
export function onSnake(position, { ignoreHead = false } = {}) {
    // compare position with segment to see if they're equal
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    });
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        //                take the very last element of snake
        //                and duplicating on at the end of snake
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }

    newSegments = 0;
}