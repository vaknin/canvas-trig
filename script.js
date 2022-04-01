//Canvas Initialization
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// Enter your screen's width here
canvas.width = 3840;

// Enter your screen's height here
canvas.height = 1080;

// Sine Properties - play with these, or even better - randomize their values using rand()
let frequency = 50;
let amplitude = 120;
let iterations = 4;
let frequency_modifier = -1;
let amplitude_modifier = -3;
let fillColor = "#aafa0a";
let bodyColor = "#000";
let edgeColor = "#000";
let backgroundColor = "#000";
let edgeWidth = 2;
let bodyWidth = 3;

// A simple vector2 class
class Point {
    constructor(x, y){
        this.x = x
        this.y = y
    }
}

// Generates a random number between 'min' and 'max'
const rand = (min, max) => {
    return Math.random() * (max-min) + min
}

// Draw menu
const createMenu = () => {

    let form = document.createElement("form");
    form.onsubmit = e => e.preventDefault();

    const createNumberInput = (step, value, name, onChange) => {

        let parentDiv = document.createElement("div");
        parentDiv.id = name + "Div";

        let label = document.createElement("label");
        label.innerText = name;

        let input = document.createElement("input");
        input.id = name;
        input.type = "number";
        input.step = 'any';
        input.value = value;
        input.onchange = onChange;

        parentDiv.appendChild(label);
        parentDiv.appendChild(input);

        form.appendChild(parentDiv);
    }

    const createColorInput = (value, name, onChange) => {

        let colorDiv = document.createElement("div");
        colorDiv.id = name + "ColorDiv";
        let input = document.createElement("input");
        input.id = name;
        input.type = "color";
        input.value = value;
        input.onchange = onChange;
        if (name == "Fill" || name == "Background"){
            let label = document.createElement('label');
            label.innerText = name;
            colorDiv.appendChild(label);
        }

        colorDiv.appendChild(input);
        form.appendChild(colorDiv);
    }

    document.body.appendChild(form);
    
    createNumberInput(1, frequency.toFixed(1), "Frequency", e => { frequency = Number.parseFloat(e.target.value)});
    createNumberInput(1, frequency_modifier.toFixed(1), "Frequency Modifier", e => {frequency_modifier = Number.parseFloat(e.target.value)});

    createNumberInput(5, amplitude.toFixed(1), "Amplitude", e => { amplitude = Number.parseFloat(e.target.value)});
    createNumberInput(1, amplitude_modifier.toFixed(1), "Amplitude Modifier", e => {amplitude_modifier = Number.parseFloat(e.target.value)});

    createNumberInput(1, iterations.toFixed(0), "Iterations", e => {iterations = Number.parseInt(e.target.value)});
    
    createNumberInput(1, bodyWidth.toFixed(0), "Body", e => {bodyWidth = Number.parseInt(e.target.value)});
    createColorInput(bodyColor, "Body", e => { bodyColor = e.target.value});
    document.querySelector('#BodyDiv').appendChild(document.querySelector('#BodyColorDiv'));

    createNumberInput(1, edgeWidth.toFixed(0), "Edge", e => {edgeWidth = Number.parseInt(e.target.value)});
    createColorInput(edgeColor, "Edge", e => { edgeColor = e.target.value});
    document.querySelector('#EdgeDiv').appendChild(document.querySelector('#EdgeColorDiv'));

    createColorInput(fillColor, "Fill", e => { fillColor = e.target.value});
    createColorInput(backgroundColor, "Background", e => { backgroundColor = e.target.value});

    let btn = document.createElement("button");
    btn.innerText = "Render";
    btn.onclick = draw;
    form.appendChild(btn);
}

const revertToInputValues = () => {
    frequency = Number.parseFloat(document.querySelector("#Frequency").value);
    amplitude = Number.parseFloat(document.querySelector("#Amplitude").value);
    frequency_modifier = Number.parseFloat(document.querySelector("[id='Frequency Modifier']").value);
    amplitude_modifier = Number.parseFloat(document.querySelector("[id='Amplitude Modifier']").value);
    bodyWidth = Number.parseFloat(document.querySelector("#Body").value);
    edgeWidth = Number.parseFloat(document.querySelector("#Edge").value);
}

// The canvas' background fill function
const draw_background = () => {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
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
    ctx.fillStyle = fillColor;
    // const color2 = rand(140, 190);
    // const color3 = rand(140, 190);
    // ctx.fillStyle = `rgb(${color1},${color2},${color3})`;
    ctx.fill();

    // Edges - change width and color as you'd like
    ctx.strokeStyle = edgeColor;
    ctx.lineWidth = edgeWidth;
    ctx.stroke();

    // Body - change width and color as you'd like
    ctx.strokeStyle = bodyColor;
    ctx.lineWidth = bodyWidth;
    ctx.stroke();
    ctx.closePath();
}

const draw_space = () => {

    draw_background("#000");
    const draw_stars = (amount, size, color="#fff") => {

        for (let i = 0; i < amount; i++) {
            const radius = rand(0.01, size);
            const pos_x = Math.random() * (canvas.width - radius) + radius;
            const pos_y = Math.random() * (canvas.height - radius) + radius;
            ctx.beginPath();
            ctx.arc(pos_x, pos_y, radius, 0, Math.PI*2);
            ctx.fillStyle = color;
            ctx.fill();
        }
    }

    draw_stars(canvas.width*0.3, 0.3, '#fff')// Small stars
    draw_stars(canvas.width*0.1, 1, '#fff')// Big stars
    draw_stars(canvas.width/9, 0.3, 'magenta')// Small purple stars
}
    
// Draws the sine function(s) into the canvas
const draw = () => {
    draw_background();
    draw_space();
    
    for (let i = 0; i < iterations; i++) {
        const y_baseline = canvas.height * 0.5;
        draw_sine(y_baseline, frequency, amplitude);
        
        // Play with the following two lines to increase/decrease image noise and randomness
        frequency += frequency_modifier;
        amplitude += amplitude_modifier;
    }

    revertToInputValues();
}

// Main
createMenu();
draw();