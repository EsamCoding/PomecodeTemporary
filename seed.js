let acorns = [];
let acornImg;

function preload() {
  acornImg = loadImage('webimages/redseed_icon.png'); // Update with the correct path
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.id('p5-overlay');
}

function draw() {
  clear(); // Clears the canvas each frame for transparency

  for (let i = acorns.length - 1; i >= 0; i--) {
    let acorn = acorns[i];
    acorn.move();
    acorn.display();
    acorn.checkBounce();
    acorn.updateLifespan();

    // Remove the acorn if its lifespan is up
    if (acorn.lifespan <= 0) {
      acorns.splice(i, 1); // Remove acorn from array
    }
  }

  // Adjust the interval to add fewer acorns (e.g., every 80 frames)
  if (frameCount % 80 === 0) {
    acorns.push(new Acorn(random(width), 0));
  }
}

class Acorn {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.speedY = random(2, 5);
    this.gravity = 0.1;
    this.bounceFactor = -0.2;
    this.rotation = random(TWO_PI); // Random initial rotation
    this.rotationSpeed = random(0.01, 0.05); // Speed of rotation
    this.lifespan = 1200; // Lifespan in frames (~5 seconds at 60 FPS)
  }

  move() {
    this.speedY += this.gravity; // Apply gravity to speed
    this.y += this.speedY; // Move acorn down
    this.rotation += this.rotationSpeed; // Rotate as it falls
  }

  checkBounce() {
    if (this.y + this.size >= height) {
      this.y = height - this.size; // Reset position to bottom
      this.speedY *= this.bounceFactor; // Reverse and reduce speed for bounce
      this.rotationSpeed *= 0.7; // Reduce rotation speed after bounce
    }
  }

  updateLifespan() {
    this.lifespan--; // Decrease lifespan each frame
  }

  display() {
    push();
    translate(this.x, this.y); // Move to acorn's position
    rotate(this.rotation); // Apply rotation
    imageMode(CENTER); // Center the image on the acorn's position
    image(acornImg, 0, 0, this.size * 1.3, this.size); // Display rotated acorn
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
