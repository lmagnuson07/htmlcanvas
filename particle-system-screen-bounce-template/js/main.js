// setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Setting the fillStyle here so that it doesn't run everytime the draw animation is called,
//  which is each call of the animate loop.
ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';

// blueprint to create individual particle objects. What particles look like and how they behave.
class Particle {
    constructor(effect) {
        this.effect = effect;
        // Need to offset the x asis as x is the center
        this.radius = Math.random() * 40 + 5;
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() * 4 - 2;
        this.vy = Math.random() * 4 - 2;
    }
    draw (context) {
        ctx.fillStyle = 'hsl(' + this.x * 0.09 + ', 100%, 50%)';
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        ctx.stroke();
    }
    update() {
        this.x += this.vx;
        // subtracting and comparing to this.radius to account for center-point of x and y.
        if (this.x > this.effect.width - this.radius || this.x < this.radius) this.vx *= -1;

        this.y += this.vy;
        if (this.y > this.effect.height - this.radius || this.y < this.radius) this.vy *= -1;
    }
}

// [When a class sits in this scope its considered lexical scope]
// brain of the codebase. Manges all particles. Contains all settings and helper methods we need
class Effect {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numParticles = 20;
        this.createParticles();
    }
    createParticles() {
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push(new Particle(this));
        }
    }
    handleParticles(context) {
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
        });
    }
}
const effect = new Effect(canvas);
effect.handleParticles(ctx);
console.log(effect);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}
animate();