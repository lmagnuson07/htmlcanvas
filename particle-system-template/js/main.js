// setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Setting the fillStyle here so that it doesn't run everytime the draw animation is called,
//  which is each call of the animate loop.
ctx.fillStyle = 'white';

// blueprint to create individual particle objects. What particles look like and how they behave.
class Particle {
    constructor(effect) {
        this.effect = effect;
        this.x = Math.random() * this.effect.width;
        this.y = Math.random() * this.effect.height;
        this.radius = 15;
    }
    draw (context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
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
        });
    }
}
const effect = new Effect(canvas);
effect.handleParticles(ctx);
console.log(effect);

function animate() {

}