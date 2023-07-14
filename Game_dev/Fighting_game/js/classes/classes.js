// This class is for rendering out images
class Sprite {
  // every class needs a constructor method which is a function within the class
  // the constructor is called every time a new object is created within the class
  // when the constructor is called, we want to define the properties of the object
  // passing arguments as an object makes the order irrelevant and is cleaner to manage
  constructor({
    position,
    imageSource,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    // one of the main properties to put on a object is the position
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSource;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 15;
    this.offset = offset;
  }
  draw() {
    context.drawImage(
      this.image,
      // crop the image //
      this.framesCurrent * (this.image.width / this.framesMax), // x-coordinate of the crop mark
      0, // y-coordinate of the crop mark
      this.image.width / this.framesMax,
      this.image.height,
      // /////////////////
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      // scale the image
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }
  // function to animate frames
  animateFrames() {
    this.draw();
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update() {
    this.animateFrames();
  }
}

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
    offset = { x: 0, y: 0 },
    imageSource,
    scale = 1,
    framesMax = 1,
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
  }) {
    // super() calls the constructor of the parent class (Sprite) which sets the specified properties for us
    super({
      position,
      imageSource,
      scale,
      framesMax,
      offset,
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
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 15;
    this.sprites = sprites;
    this.dead = false;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSource;
    }
  }

  //
  update() {
    if (!this.dead) this.animateFrames();

    // attack boxes
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    // draw attack boxes
    // context.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // if the sprites are at the bottom of the canvas, gravity will not be applied
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
      this.position.y = 554;
    } else {
      // only add gravity's affect if the sprites are above the bottom of the canvas
      this.velocity.y += gravity;
    }
  }

  // this method is for player attacks
  attack() {
    this.switchSprite("attack");
    this.isAttacking = true;
  }

  // this method is for player taking damage
  takeHit() {
    this.health -= 5;

    // show death animation here when health reaches zero (0)
    if (this.health <= 0) {
      this.switchSprite("death");
    } else {
      // else show take hit animation
      this.switchSprite("takeHit");
    }
  }

  // switching between different sprites
  switchSprite(sprite) {
    // Overriding all other animations with death animation
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.framesMax - 1)
        this.dead = true;
      return;
    }

    // Overriding all other animations with attack animation
    if (
      this.image === this.sprites.attack.image &&
      this.framesCurrent < this.sprites.attack.framesMax - 1
    )
      return;

    // Overriding all other animations with attack animation
    if (
      this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.framesMax - 1
    )
      return;

    // else show the other animations
    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesMax = this.sprites.run.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "attack":
        if (this.image !== this.sprites.attack.image) {
          this.image = this.sprites.attack.image;
          this.framesMax = this.sprites.attack.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "takeHit":
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.framesMax = this.sprites.takeHit.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.framesMax = this.sprites.death.framesMax;
          this.framesCurrent = 0;
        }
        break;
    }
  }
}
