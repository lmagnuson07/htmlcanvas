// setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting the fillStyle here so that it doesn't run everytime the draw animation is called,
//  which is each call of the animate loop.
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, 'white');
gradient.addColorStop(0.5, 'magenta');
gradient.addColorStop(1, 'blue');

ctx.fillStyle = gradient;
ctx.strokeStyle = 'white';

// blueprint to create individual particle objects. What particles look like and how they behave.
class Particle {
    constructor(effect) {
        this.effect = effect;
        // Need to offset the x asis as x is the center
        this.radius = Math.random() * 5 + 5;
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() * 1.1 - 0.5;
        this.vy = Math.random() * 1.1 - 0.5;
    }
    draw (context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        // ctx.stroke();
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
        this.numParticles = 200;
        this.createParticles();
    }
    createParticles() {
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push(new Particle(this));
        }
    }
    handleParticles(context) {
        this.connectParticles(context);
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
        });
    }
    connectParticles(context) {
        const maxDistance = 100;
        for (let a = 0; a < this.particles.length; a++) {
            for (let b = a; b < this.particles.length; b++) {
                const dx = this.particles[a].x - this.particles[b].x;
                const dy = this.particles[a].y - this.particles[b].y;
                // const distance = Math.sqrt(dx * dx + dy * dy);
                const distance = Math.hypot(dx, dy);
                if (distance < maxDistance) {
                    context.save();
                    context.globalAlpha = 1 - (distance / maxDistance);
                    context.beginPath();
                    context.moveTo(this.particles[a].x, this.particles[a].y);
                    context.lineTo(this.particles[b].x, this.particles[b].y);
                    context.stroke();
                    context.restore();
                }
            }
        }
    }
}

// Main
const effect = new Effect(canvas);
effect.handleParticles(ctx);
console.log(effect);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}
animate();