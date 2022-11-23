import Ball from './Ball.js'

const ball = new Ball(document.getElementById("ball"))

// Update loop
function update(time) {
    window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update)

// 13:00