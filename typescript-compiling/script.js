//Canvas Initialization
var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
// Enter your screen's width here
canvas.width = 3840;
// Enter your screen's height here
canvas.height = 1080;
// Sine Properties - play with these, or even better - randomize their values using rand()
var frequency = Math.PI * 20;
var amplitude = Math.PI * 28;
var iterations = 14;
// A simple vector2 class
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
// Generates a random number between 'min' and 'max'
var rand = function (min, max) {
    return Math.random() * (max - min) + min;
};
// The canvas' background fill function, default is white
var draw_background = function (color) {
    if (color === void 0) { color = 'white'; }
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
};
// This is the function where all the magic happens
var draw_sine = function (y_baseline, frequency, amplitude) {
    var x = 0;
    ctx.beginPath();
    ctx.moveTo(x, y_baseline);
    // The sine loop
    while (x < canvas.width) {
        // The sine (you can experiment with this and change to 'cos' or 'tan' or whatever you feel like)
        var y = y_baseline + (amplitude * Math.sin(x / frequency));
        ctx.lineTo(x, y);
        x++;
    }
    // Fill
    // const color1 = rand(140, 190);
    // const color2 = rand(140, 190);
    // const color3 = rand(140, 190);
    // ctx.fillStyle = `rgb(${color1},${color2},${color3})`;
    // ctx.fill();
    // Edges - change width and color as you'd like
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 27;
    ctx.stroke();
    // Body - change width and color as you'd like
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 20;
    ctx.stroke();
    ctx.closePath();
};
// Downloads the image to a png file, useful for animating images and downloading in bulk
var download_canvas = function () {
    var dataURL = canvas.toDataURL("image/png");
    var downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'image';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};
// Draws the sine function(s) into the canvas
var draw = function () {
    draw_background();
    for (var i = 0; i < iterations; i++) {
        var y_baseline = canvas.height * 0.5;
        draw_sine(y_baseline, frequency, amplitude);
        // Play with the following two lines to increase/decrease image noise and randomness
        frequency += 0.6;
        amplitude -= 15;
    }
    // Uncomment to download programatically
    //download_canvas()
    // Animate (i.e. move to the next frame)
    //requestAnimationFrame(draw);
};
// Main
requestAnimationFrame(draw);
