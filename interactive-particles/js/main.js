const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

// const response = await fetch('img/cat.txt');
// const data = await response.text();
const png = new Image();
png.src = 'data:image/png;base64,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';

// mouse
let mouse = {
    x: null,
    y: null,
    radius: 100
}
window.addEventListener("mousemove", function(event) {
    mouse.x = event.x + canvas.clientLeft / 2;
    mouse.y = event.y + canvas.clientTop / 2;
});

window.addEventListener('load', () => {
    console.log("page has loaded");
    ctx.drawImage(png, 0, 0);
    drawImage();
});

function drawImage() {
    let imageWidth = png.width;
    let imageHeight = png.height;
    const data = ctx.getImageData(0, 0, imageWidth, imageHeight);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    function init() {
        particleArray = [];

        for (let y = 0, y2 = data.height; y < y2; y++) {
            for (let x = 0, x2 = data.width; x < x2; x++) {
                if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
                    let positionX = x;
                    let positionY = y;
                    let color = "rgb(" + data.data[(y * 4 * data.width) + (x * 4)] + "," +
                        data.data[(y * 4 * data.width) + (x * 4) + 1] + "," +
                        data.data[(y * 4 * data.width) + (x * 4) + 2] + "," +
                        data.data[(y * 4 * data.width) + (x * 4) + 3] + ")";
                    particleArray.push(new Particle(positionX * 4, positionY * 4, color));
                }
            }
        }
    }
    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(0, 0, 0, .05)';
        ctx.fillRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
        }
    }
    init();
    animate();

    window.addEventListener('resize', function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    });
}

class Particle {
    constructor(x, y, color, size) {
        this.x = x + canvas.width / 2 - png.width * 2;
        this.y = y + canvas.height / 2 - png.height * 2;
        this.color = color;
        this.size = 2;
        this.baseX = x + canvas.width / 2 - png.width * 2;
        this.baseY =  y + canvas.height / 2 - png.height * 2;
        this.density = (Math.random() * 10) + 2;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        ctx.fillStyle = this.color;

        // collision detection
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;

        // max distance, past that the force will be 0
        const maxDistance = 70;
        let force = (maxDistance - distance) / maxDistance;
        if (force < 0) force = 0;

        let directionX = (forceDirectionX * force * this.density * 0.6);
        let directionY = (forceDirectionY * force * this.density * 0.6);

        // if mouse is close enough, move the particle away from the mouse
        if (distance < mouse.radius + this.size) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 20;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 20;
            }
        }
        this.draw();
    }
}
