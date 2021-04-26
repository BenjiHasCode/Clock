var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

setInterval(drawClock, 1000);

function drawClock() {
    resetCanvas();
    let radius = canvas.height / 2;
    
    // we translate our ctx coordinates to be center
    ctx.translate(canvas.width/2, radius);
    ctx.lineWidth = radius * 0.15;

    // get time
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    // draw time in text
    drawTimeText(ctx, radius, hour, minute, second);

    // draw hour 
    hour=hour%12;
    hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHours(ctx, hour, radius*0.5, radius*0.07);
    // draw minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawMinutes(ctx, minute, radius*0.8, radius*0.07);
    // draw second
    second=(second*Math.PI/30);
    drawSeconds(ctx, second, radius*0.9, radius*0.02);
}



function drawHours(ctx, hours) {
    ctx.lineCap = "round";
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    //  arc(x, y, radius, startAngle, endAngle);
    ctx.arc(0, 0, canvas.height * 0.2, Math.PI*1.5, Math.PI*1.5 + hours);
    ctx.stroke();
}

function drawMinutes(ctx, minutes) {
    ctx.strokeStyle = 'orange';
    ctx.beginPath();
    ctx.arc(0, 0, canvas.height * 0.3, Math.PI*1.5, Math.PI*1.5 + minutes);
    ctx.stroke();
}

function drawSeconds(ctx, second) {
    ctx.strokeStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(0, 0, canvas.height*0.4, Math.PI*1.5, Math.PI*1.5 + second);
    ctx.stroke();
}

//draws time in text in middle of canvas
function drawTimeText(ctx, radius, hour, minute, second) {
    let fontSize = radius/12;
    ctx.font='bold ' + fontSize + 'px Verdana';
    ctx.textAlign = 'center';

    let timeText = formatTimeString(hour, minute, second);
    let stringWidth = ctx.measureText(timeText).width;
    
    //text is centered so we divide it by 2
    let grad = ctx.createLinearGradient(-stringWidth/2, 0, stringWidth/2, 0);
    grad.addColorStop(0, 'red');
    grad.addColorStop(.7, 'orange');
    grad.addColorStop(1, 'yellow');
    
    ctx.fillStyle = grad;
    ctx.fillText(timeText, 0, 0);
}

function resetCanvas() {
    // resize canvas (is helpful if user resized window)
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // clear image
    ctx.translate(0,0);
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

// adds extra zeroes to time if needed - 6 -> 06
function formatTimeString(hour, minute, second) {
    if(hour < 10) {
        hour = `0${hour}`;
    }
    if(minute < 10) {
        minute = `0${minute}`;
    }
    if(second < 10) {
        second = `0${second}`;
    }
    
    return `${hour}:${minute}:${second}`;
}