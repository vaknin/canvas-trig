//#region Canvas Initialization
var canvas = document.querySelector('#canvas');
//canvas.width = window.innerWidth;//3840//window.innerWidth;
canvas.width = 3840;
//canvas.height = window.innerHeight//1080//window.innerHeight;
canvas.height = 1080;
var ctx = canvas.getContext('2d');
//#endregion
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var rand = function (min, max) {
    return Math.random() * (max - min) + min;
};
var calculate_distance = function (p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};
var draw_background = function (color) {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
};
var draw_sine = function (y_baseline, frequency, amplitude) {
    var x = 0;
    ctx.beginPath();
    ctx.moveTo(x, y_baseline);
    while (x < canvas.width) {
        var y = y_baseline + (amplitude * Math.sin(x / frequency));
        ctx.lineTo(x, y);
        x++;
    }
    // fill
    var color1 = rand(65, 72);
    var color2 = rand(65, 72);
    var color3 = rand(65, 72);
    ctx.fillStyle = "rgb(" + color1 + "," + color2 + "," + color3 + ")";
    ctx.fill();
    // stroke black
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 27;
    ctx.stroke();
    // stroke white
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 20;
    ctx.stroke();
    ctx.closePath();
};
var download_canvas = function () {
    var dataURL = canvas.toDataURL("image/png");
    var downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'image';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};
var draw = function () {
    draw_background('#fff');
    var frequency = 135.5; //410//rand(100,93);
    var amplitude = Math.PI * 160; //rand(20,30);
    for (var i = 0; i < 33; i++) {
        var y_baseline = canvas.height * 0.5; //rand(0.5,0.5);
        draw_sine(y_baseline, frequency, amplitude);
        frequency += 0;
        amplitude -= 18;
    }
    download_canvas();
    //requestAnimationFrame(draw);
};
document.addEventListener('keypress', function (e) {
    if (['w', 's', 'd', 'a'].includes(e.key)) {
        if (e.key == 'd') {
            frequency += 30;
        }
        else if (e.key == 'a') {
            frequency -= 30;
        }
        //draw_background('rgb(0,0,25)');
        draw_background('#fff');
        draw();
    }
});
requestAnimationFrame(draw);
//draw_background('rgb(0,0,25)');
//draw()
