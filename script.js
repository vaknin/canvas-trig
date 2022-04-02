//Canvas Initialization
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// Enter your screen's width here
canvas.width = 3840;

// Enter your screen's height here
canvas.height = 1080;

// Sine Properties - play with these, or even better - randomize their values using rand()
let frequency = 1;
let amplitude = 0;
let iterations = 1;
let frequency_modifier = 0;
let amplitude_modifier = 0;
let fillColor = "#ADD8E6";
let bodyColor = "#ffffff";
let edgeColor = "#000000";
let backgroundColor = "#000000";
let bodyWidth = 1;
let edgeWidth = 1;
let enableDrawStars = false;
let enableEdgeColor = false;
let enableFillColor = false;

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

    const createCheckBox = (value, name, onChange) => {

        let input = document.createElement("input");
        input.id = name;
        input.type = "checkbox";
        input.value = value;
        input.onchange = onChange;
        if (name == "StarsCheckbox"){
            let div = document.createElement("div");
            div.id = "StarsDiv"
            let label = document.createElement("label");
            label.innerText = "Stars";
            div.append(label, input);
            return div;
        }
        return input;
    }

    const createResolutionInputs = () => {

        let parentDiv = document.createElement("div");
        parentDiv.id = "parentDiv";
        let widthInput = document.createElement("input");
        widthInput.type = "number";
        let heightInput = document.createElement("input");
        heightInput.type = "number";
        widthInput.value = canvas.width;
        heightInput.value = canvas.height;
        widthInput.onchange = e => {canvas.width = Number.parseInt(e.target.value)};
        heightInput.onchange = e => {canvas.height = Number.parseInt(e.target.value)};

        let widthLabel = document.createElement("label");
        widthLabel.innerText = "Screen Width";
        let heightLabel = document.createElement("label");
        heightLabel.innerText = "Screen Height";

        let wDiv = document.createElement("div");
        let hDiv = document.createElement("div");

        wDiv.append(widthLabel, widthInput);
        hDiv.append(heightLabel, heightInput);
        parentDiv.append(wDiv, hDiv);

        form.append(parentDiv);
    }

    // Create the form
    document.body.appendChild(form);
    createResolutionInputs();

    // Frequency
    createNumberInput(1, frequency.toFixed(1), "Frequency", e => { frequency = Number.parseFloat(e.target.value)});
    createNumberInput(1, frequency_modifier.toFixed(1), "Frequency Modifier", e => {frequency_modifier = Number.parseFloat(e.target.value)});
    
    // Amplitude
    createNumberInput(5, amplitude.toFixed(1), "Amplitude", e => { amplitude = Number.parseFloat(e.target.value)});
    createNumberInput(1, amplitude_modifier.toFixed(1), "Amplitude Modifier", e => {amplitude_modifier = Number.parseFloat(e.target.value)});

    // Iterations
    createNumberInput(1, iterations.toFixed(0), "Iterations", e => {iterations = Number.parseInt(e.target.value)});
    
    // Body
    createNumberInput(1, bodyWidth.toFixed(1), "Body", e => {bodyWidth = Number.parseFloat(e.target.value)});
    createColorInput(bodyColor, "Body", e => { bodyColor = e.target.value});
    document.querySelector('#BodyDiv').appendChild(document.querySelector('#BodyColorDiv'));

    // Edge
    createNumberInput(1, edgeWidth.toFixed(1), "Edge", e => {edgeWidth = Number.parseFloat(e.target.value)});
    createColorInput(edgeColor, "Edge", e => { edgeColor = e.target.value});
    document.querySelector('#EdgeDiv').appendChild(document.querySelector('#EdgeColorDiv'));
    document.querySelector('#EdgeDiv').appendChild(createCheckBox(enableEdgeColor, "EdgeCheckbox" ,e => {enableEdgeColor = e.target.checked}));

    let etcDiv = document.createElement("div");
    etcDiv.id = "etcDiv";
    
    // Stars
    etcDiv.appendChild(createCheckBox(enableDrawStars, "StarsCheckbox", e => {enableDrawStars = e.target.checked}));

    form.appendChild(etcDiv);

    // Fill
    createColorInput(fillColor, "Fill", e => { fillColor = e.target.value});
    etcDiv.appendChild(document.querySelector('#FillColorDiv'));
    etcDiv.appendChild(createCheckBox(enableFillColor, "FillCheckbox", e => {enableFillColor = e.target.checked}));
    document.querySelector('#FillColorDiv').appendChild(document.querySelector('#FillCheckbox'));

    // BG Color
    createColorInput(backgroundColor, "Background", e => { backgroundColor = e.target.value});
    etcDiv.appendChild(document.querySelector('#BackgroundColorDiv'));



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
    ctx.fillStyle = enableDrawStars? "black" : backgroundColor;
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
    if (enableFillColor){
        ctx.fillStyle = fillColor;
        ctx.fill();
    }

    // Edges
    if (enableEdgeColor){
        ctx.strokeStyle = edgeColor;
        ctx.lineWidth = edgeWidth;
        ctx.stroke();
    }

    // Body
    ctx.strokeStyle = bodyColor;
    ctx.lineWidth = bodyWidth;
    ctx.stroke();
    ctx.closePath();
}

const draw_space = () => {

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

    if (enableDrawStars){
        draw_space();
    }
    
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