const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
// For initial rendering
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];
const colors = [
    'black',
    // 'white',
    // 'rgba(255, 255, 255, 0.3)',
    // 'rgba(173, 216, 230, 0.8)',
    // 'rgba(211, 211, 211, 0.8)',
];
const maxSize = 40;
const minSize = 0;
const mouseRadius = 60;
let started = false;

// mouse position
let mouse = {
    x: null,
    y:null
}
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    if (!started) {
        animate();
    }
    started = true;
});
// create constructor function for particle
function Particle(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
}
// add draw method to the Particles class
Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.stroke();
}
Particle.prototype.update = function() {
    if (this.x + this.size * 2 > canvas.width || this.x - this.size * 2 < 0) {
        this.directionX = -this.directionX;
    }
    if (this.y + this.size * 2 > canvas.height || this.y - this.size * 2 < 0) {
        this.directionX = -this.directionX;
    }
    this.x += this.directionX;
    this.y += this.directionY;

    // mouse interactivity
    if (
        mouse.x - this.x < mouseRadius
        && mouse.x - this.x > -mouseRadius
        && mouse.y - this.y < mouseRadius
        && mouse.y - this.y > -mouseRadius
    ) {
        if (this.size < maxSize) {
            this.size += 3;
        }
    } else if (this.size > minSize) {
        this.size -= 0.1;
    }
    if (this.size < 0) {
        this.size = 0;
    }
    this.draw();
}
// create particle array
function init() {
    particleArray = [];
    for (let i = 0; i < 1000; i++) {
        let size = 0;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * .2) - .1;
        let directionY = (Math.random() * .2) - .1;
        let color = colors[Math.floor(Math.random() * colors.length)];

        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}
// animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
}
init();

// resize event
window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});
// remove mouse position periodically (stops particles from sticking in last known mouse position)
setInterval(function() {
    mouse.x = undefined;
    mouse.y = undefined;
}, 1000);