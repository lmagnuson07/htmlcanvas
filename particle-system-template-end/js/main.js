// setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting the fillStyle here so that it doesn't run everytime the draw animation is called,
//  which is each call of the animate loop.
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, 'white');
gradient.addColorStop(0.5, 'gold');
gradient.addColorStop(1, 'orangered');

ctx.fillStyle = gradient;
ctx.strokeStyle = 'white';

// blueprint to create individual particle objects. What particles look like and how they behave.
class Particle {
    constructor(effect) {
        this.effect = effect;
        // Need to offset the x asis as x is the center
        // this.radius = Math.random() * 5 + 5;
        this.radius = Math.floor(Math.random() * 10 + 1);
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() * 1.1 - 0.5;
        this.vy = Math.random() * 1.1 - 0.5;
        this.pushX = 0;
        this.pushY = 0;
        this.friction = 0.95;
    }
    draw (context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        // ctx.stroke();
    }
    update() {
        if (this.effect.mouse.pressed) {
            const dx = this.x - this.effect.mouse.x;
            const dy = this.y - this.effect.mouse.y;
            const distance = Math.hypot(dx, dy);
            const force = (this.effect.mouse.radius / distance);
            if (distance < this.effect.mouse.radius) {
                // atan2 gives us the counterclockwise angle in radians, between the positive x-axis
                // and a line projected from point 0,0 towards specific x, y coordinates (target point)
                // Gives us a sense of direction.
                const angle = Math.atan2(dy, dx);
                /*this.x += Math.cos(angle) * force;
                this.y += Math.sin(angle) * force;*/
                this.pushX += Math.cos(angle) * force;
                this.pushY += Math.sin(angle) * force;
            }
        }
        this.x += (this.pushX *= this.friction) + this.vx;
        this.y += (this.pushY *= this.friction) + this.vy;
        if (this.x < this.radius) {
            this.x = this.radius;
            this.vx *= -1;
        } else if (this.x > this.effect.width - this.radius) {
            this.x = this.effect.width - this.radius;
            this.vx *= -1;
        }
        if (this.y < this.radius) {
            this.y = this.radius;
            this.vy *= -1;
        } else if (this.y > this.effect.height - this.radius) {
            this.y = this.effect.height - this.radius;
            this.vy *= -1;
        }
    }
    reset() {
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
    }
}

// [When a class sits in this scope its considered lexical scope]
// brain of the codebase. Manges all particles. Contains all settings and helper methods we need
class Effect {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numParticles = 300;
        this.createParticles();
        this.mouse = {
            x: 0,
            y: 0,
            pressed: false,
            radius: 200
        };

        window.addEventListener('resize', e => {
            // arrow functions give access to the this keyword (they inherit the parent scope)
            this.resize(e.target.window.innerWidth, e.target.window.innerHeight, this.context);
        });
        window.addEventListener('mousemove', e => {
            if (this.mouse.pressed) {
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            }
        });
        window.addEventListener('mousedown', e => {
            this.mouse.pressed = true;
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        window.addEventListener('mouseup', e => {
            this.mouse.pressed = false;
        });
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
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        const gradient = this.context.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(0.5, 'gold');
        gradient.addColorStop(1, 'orangered');
        this.context.fillStyle = gradient;
        this.context.strokeStyle = 'white';
        this.particles.forEach(particle => {
            particle.reset();
        });
    }
}

// Main
const effect = new Effect(canvas, ctx);
effect.handleParticles(ctx);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}
animate();