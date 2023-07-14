let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            // if currently going up or down, ignore keypress
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: -1} 
            break;
        case 'ArrowDown':
            // if currently going up or down, ignore keypress
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: 1} 
            break;
        case 'ArrowRight':
            // if currently going left or right, ignore keypress
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: 1, y: 0} 
            break;
        case 'ArrowLeft':
            // if currently going left or right, ignore keypress
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: -1, y: 0} 
            break;
    }
});

export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}