//----------- Imports ---------------//
import Particle from "./Particle.js";
import Start from "./Start.js";

//------------- Fetch the Image ---------------//
fetch('../img/cyberpunk.txt')
    .then(response => response.text())
    .then(data => {
        run(data);
    })
    .catch(error => {
        console.error('Error:', error);
});
//------------- Initialization/Run ---------------//
const run = function(img) {
    let particlesArray = [];
    const numberOfParticles = 5000;

    const myImage = new Image();
    myImage.src=img;

    myImage.onload = function() {
        const start = new Start();
        start.ctx.drawImage(myImage, 0, 0, start.canvas.width, start.canvas.height);

    }

}

