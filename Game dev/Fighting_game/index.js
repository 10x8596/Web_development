// 
const canvas = document.querySelector('canvas');
//
const context = canvas.getContext('2d');

// game resolution
canvas.width = 1024;
canvas.height = 576;

// game background fill
context.fillRect(0, 0, canvas.width, canvas.height);

// gravity 
const gravity = 0.2

// we need the player objects to interact with each other so we need to use Object oriented programming
class Sprite {
    // every class needs a constructor method which is a function within the class
    // the constructor is called every time a new object is created within the class
    // when the constructor is called, we want to define the properties of the object
    // passing arguments as an object makes the order irrelevant and is cleaner to manage
    constructor({ position, velocity }) {
        // one of the main properties to put on a object is the position 
        this.position = position;
        // to make the players move, they need a velocity property
        this.velocity = velocity;
        this.height = 150;
    }
    // defined what a player looks like
    draw() {
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, 50, this.height);

        // context.fillStyle = 'blue';
        // context.fillRect(this.position.x, this.position.y, 50, 150);
    }
    //
    update() {
        this.draw();
        this.position.y += this.velocity.y;

        // if the sprites are at the bottom of the canvas, gravity will not be applied
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            // only add gravity's affect if the sprites are above the bottom of the canvas
            this.velocity.y += gravity;
        }
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    }
});

const enemy = new Sprite({
    position: {
        x: 800,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    }
});


// animation loop
function animate() {
    window.requestAnimationFrame(animate);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
}
animate();