class Particle {
    constructor(start) {
        this.x = Math.random() * start.canvas.width;
        this.y = 0;
        this.speed = 0;
        this.velocity = Math.random() * 0.5;
        this.size = Math.random() * 1.5 + 1;

    }
    update() {
        
    }
}
export default Particle;