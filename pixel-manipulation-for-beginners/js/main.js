/**
 * Need to convert the image to png to a base 64 image [(png to base64)](https://onlinepngtools.com/convert-png-to-base64)
 * due to cross-origin region security in some browsers.
 *
 * @link   [JavaScript Pixel Manipulation for Beginners](https://www.youtube.com/watch?v=alRBeUMMvDM)
 * @file   Pixel Manipulation beginners tutorial by Franks Laboratory
 * @author Logan Magnuson.
 * @since  2023-08-26
 */
/**
 *
 *
 */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 450;

const response = await fetch('img/cat.txt');
const data = await response.text();
const image1 = new Image();
image1.src = data;

image1.addEventListener('load', function() {
    ctx.drawImage(image1, 0, 0);
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const scannedData = scannedImage.data;
    for (let i = 0; i < scannedData.length; i += 4) {
        const total = scannedData[i] + scannedData[i+1] + scannedData[i+2];
        const averageColorValue = total / 3;
        scannedData[i] = averageColorValue;
        scannedData[i+1] = averageColorValue;
        scannedData[i+2] = averageColorValue;
    }
    ctx.putImageData(scannedImage, 0, 0);
    console.log(scannedData)
});
