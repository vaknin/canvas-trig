//Canvas Initialization
const canvas:HTMLCanvasElement = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// Enter your screen's width here
canvas.width = 3840;

// Enter your screen's height here
canvas.height = 1080;

// Sine Properties - play with these, or even better - randomize their values using rand()
let frequency = Math.PI*20;
let amplitude = Math.PI*28;
let iterations = 14;

// A simple vector2 class
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number){
        this.x = x
        this.y = y
    }
}

// Generates a random number between 'min' and 'max'
const rand = (min:number, max:number) => {
    return Math.random() * (max-min) + min
}

// The canvas' background fill function, default is white
const draw_background = (color:string='white') => {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

// This is the function where all the magic happens
const draw_sine = (y_baseline, frequency, amplitude) => {
    let x = 0
    ctx.beginPath()
    ctx.moveTo(x, y_baseline);

    // The sine loop
    while (x < canvas.width){
        // The sine (you can experiment with this and change to 'cos' or 'tan' or whatever you feel like)
        let y = y_baseline + (amplitude * Math.sin(x/frequency));
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
    ctx.strokeStyle = '#444'
    ctx.lineWidth = 27;
    ctx.stroke();

    // Body - change width and color as you'd like
    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 20;
    ctx.stroke();
    ctx.closePath();
}

// Downloads the image to a png file, useful for animating images and downloading in bulk
const download_canvas = () => {
    var dataURL = canvas.toDataURL("image/png"); 
    var downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'image';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Draws the sine function(s) into the canvas
const draw = () => {
    draw_background();
    
    for (let i = 0; i < iterations; i++) {
        const y_baseline = canvas.height * 0.5;
        draw_sine(y_baseline, frequency, amplitude);
        
        // Play with the following two lines to increase/decrease image noise and randomness
        frequency+=0.6
        amplitude-=15
    }

    // Uncomment to download programatically
    //download_canvas()

    // Animate (i.e. move to the next frame)
    //requestAnimationFrame(draw);
}

// Main
requestAnimationFrame(draw)