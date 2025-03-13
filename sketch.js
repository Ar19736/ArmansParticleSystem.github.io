
// References: 
// 1. P5.js Arrays - https://p5js.org/reference/#/p5.Array  
// 2. Particle System Guide - https://natureofcode.com/book/chapter-4-particle-systems/

let particles = []; // Array to store particles

function setup() {
    createCanvas(600, 400);
    background(0);
}

function draw() {
    background(0, 25); // Light fading effect

    // Loop through particles array
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update(); // Update particle position and state
        particles[i].show(); // Render particle

        if (particles[i].isDead()) {
            particles.splice(i, 1); // Remove particle after it has faded out
        }
    }
}

// Click to add particles with random colors
function mousePressed() {
    for (let i = 0; i < 5; i++) { // multiple particles per click
        particles.push(new Particle(mouseX, mouseY)); 
    }
}

// Particle Object with bouncing mechanics
class Particle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(random(-2, 2), random(-2, 2)); 
        this.alpha = 255; // fades over time
        this.color = color(random(255), random(255), random(255)); 
    }

    update() {
        this.position.add(this.velocity);

        // Bounce off walls
        if (this.position.x <= 0 || this.position.x >= width) {
            this.velocity.x *= -1; // Reverse x direction
        }
        if (this.position.y <= 0 || this.position.y >= height) {
            this.velocity.y *= -1; 
        }

        this.alpha -= 2; // Fade effect
    }

    show() {
        noStroke();
        fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
        ellipse(this.position.x, this.position.y, 10);
    }

    isDead() {
        return this.alpha <= 0;
    }
}
