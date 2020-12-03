//#region Canvas Initialization
const canvas:HTMLCanvasElement = document.querySelector('#canvas');
//canvas.width = window.innerWidth;//3840//window.innerWidth;
canvas.width = 3840
//canvas.height = window.innerHeight//1080//window.innerHeight;
canvas.height = 1080
const ctx = canvas.getContext('2d');
//#endregion

class Point {
    x: number;
    y: number;
    constructor(x: number, y: number){
        this.x = x
        this.y = y
    }
}

const rand = (min:number, max:number) => {
    return Math.random() * (max-min) + min
}

const calculate_distance = (p1:Point, p2:Point) => {
    return Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2))
}

const draw_background = (color:string) => {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

const draw_sine = (y_baseline, frequency, amplitude) => {
    let x = 0
    ctx.beginPath()
    ctx.moveTo(x, y_baseline);

    while (x < canvas.width){
        let y = y_baseline + (amplitude * Math.sin(x/frequency));
        ctx.lineTo(x, y);
        x++;
    }

    // fill
    const color1 = rand(65, 72);
    const color2 = rand(65, 72);
    const color3 = rand(65, 72);
    ctx.fillStyle = `rgb(${color1},${color2},${color3})`;
    ctx.fill();

    // stroke black
    ctx.strokeStyle = '#444'
    ctx.lineWidth = 27;
    ctx.stroke();

    // stroke white
    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 20;
    ctx.stroke();
    ctx.closePath();
}

const download_canvas = () => {
    var dataURL = canvas.toDataURL("image/png"); 
    var downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'image';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


const draw = () => {
    draw_background('#fff');
    let frequency = 135.5//410//rand(100,93);
    let amplitude = Math.PI*160//rand(20,30);
    
    for (let i = 0; i < 33; i++) {
        const y_baseline = canvas.height * 0.5//rand(0.5,0.5);
        draw_sine(y_baseline, frequency, amplitude);
        frequency+=0
        amplitude-=18
    }
    download_canvas()

    //requestAnimationFrame(draw);
}

document.addEventListener('keypress', e => {

    if (['w','s','d','a'].includes(e.key)){
        // if (e.key == 'w'){
        //     amplitude += 30;
        // }

        // else if (e.key == 's'){
        //     amplitude -= 30;
        // }

        else if (e.key == 'd'){
            frequency += 30;
        }

        else if (e.key == 'a'){
            frequency -= 30;
        }
        //draw_background('rgb(0,0,25)');
        draw_background('#fff');
        draw()        
    }
})

requestAnimationFrame(draw)

//draw_background('rgb(0,0,25)');
//draw()