// This class is for rendering out images
class Sprite {
  // every class needs a constructor method which is a function within the class
  // the constructor is called every time a new object is created within the class
  // when the constructor is called, we want to define the properties of the object
  // passing arguments as an object makes the order irrelevant and is cleaner to manage
  constructor({ position, imageSource, scale = 1, framesMax = 1 }) {
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
      this.position.x,
      this.position.y,
      // scale the image
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }
  //
  update() {
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
}


