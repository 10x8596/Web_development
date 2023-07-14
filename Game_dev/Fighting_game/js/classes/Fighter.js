// we need the player1 objects to interact with each other so we need to use Object oriented programming
// extending classes allows the use of all the methods from the class we are extending
class Fighter extends Sprite {
  // every class needs a constructor method which is a function within the class
  // the constructor is called every time a new object is created within the class
  // when the constructor is called, we want to define the properties of the object
  // passing arguments as an object makes the order irrelevant and is cleaner to manage
  constructor({
    position,
    velocity,
    color = "red",
    offset,
    imageSource,
    scale = 1,
    framesMax = 1,
  }) {
    // super() calls the constructor of the parent class (Sprite) which sets the specified properties for us
    super({
      position,
      imageSource,
      scale,
      framesMax,
    });
    // to make the players move, they need a velocity property
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    // add lastKey property to Sprite Class because this property is independent for both players
    // this variable monitors the last key that was pressed
    this.lastKey;
    // attack box will be based on player position
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 100,
      height: 50,
      offset,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 15;
  }

  //
  update() {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // if the sprites are at the bottom of the canvas, gravity will not be applied
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
    } else {
      // only add gravity's affect if the sprites are above the bottom of the canvas
      this.velocity.y += gravity;
    }
  }

  // this method is for player attacks
  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
