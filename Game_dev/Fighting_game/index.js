//
const canvas = document.querySelector("canvas");
//
const context = canvas.getContext("2d");

// game resolution
canvas.width = 1500;
canvas.height = 800;

// game background fill
context.fillRect(0, 0, canvas.width, canvas.height);

// gravity
const gravity = 0.5;

// Apply background image
const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSource: './asset/backgroundcopy.png'
})
// Apply Shop sprite in background 
const shop = new Sprite({
  position: {
    x: 900,
    y: 320,

  },
  imageSource: './asset/shop.png',
  scale: 3,
  framesMax: 6
});

// ------------------------------------------------------- Player Creation ---------------------------------------------------- //
const player1 = new Fighter({
  position: {
    x: 90,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imageSource: './asset/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 1.5
});

const player2 = new Fighter({
  position: {
    x: 1300,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: -50,
    y: 0,
  },
  color: "blue",
});

// ------------------------------------------------------- player movement ---------------------------------------------------- //
// default is no keys pressed
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};

// event listeners to move sprites
// this event is when a key is pressed
window.addEventListener("keydown", (event) => {
  // switch case statement to determine which key does what
  switch (event.key) {
    // player1 movement
    case "d":
      keys.d.pressed = true;
      player1.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player1.lastKey = "a";
      break;
    case "w":
      player1.velocity.y = -15;
      break;
    case "s":
      player1.attack();
      break;
    // player2 movement
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      player2.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      player2.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      player2.velocity.y = -15;
      break;
    case "ArrowDown":
      player2.attack();
      break;
  }
});
// this event is when a key is released
window.addEventListener("keyup", (event) => {
  // player 1 switch case statement to determine which key does what
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }
  // player 2 switch case statement to determine which key does what
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});

//----------------------------------------------------------// animation loop //----------------------------------------------- //
decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  player1.update();
  player2.update();

  // default player1 movement
  player1.velocity.x = 0;
  // if key is pressed, perform the event
  if (keys.d.pressed && player1.lastKey === "d") {
    player1.velocity.x = 4.5;
  } else if (keys.a.pressed && player1.lastKey === "a") {
    player1.velocity.x = -4.5;
  }

  // default player2 movement
  player2.velocity.x = 0;
  // if key is pressed, perform the event
  if (keys.ArrowRight.pressed && player2.lastKey === "ArrowRight") {
    player2.velocity.x = 4.5;
  } else if (keys.ArrowLeft.pressed && player2.lastKey === "ArrowLeft") {
    player2.velocity.x = -4.5;
  }

  // Detect Collision for player1 attack
  if (
    /* Check for collision detection and Check if player1 is actually attacking */
    collisionDetection({
      rectangle1: player1,
      rectangle2: player2,
    }) &&
    player1.isAttacking
  ) {
    player1.isAttacking = false;
    player2.health -= 5;
    document.querySelector("#player2Health").style.width = player2.health + "%";
  }
  // Detect Collision for player2 attack
  if (
    /* Check for collision detection and Check if player2 is actually attacking */
    collisionDetection({
      rectangle1: player2,
      rectangle2: player1,
    }) &&
    player2.isAttacking
  ) {
    player2.isAttacking = false;
    player1.health -= 5;
    document.querySelector("#player1Health").style.width = player1.health + "%";
  }

  // end game based on players health
  if (player2.health <= 0 || player1.health <= 0) {
    determineWinner({ player1, player2, timerId });
  }
}
animate();
