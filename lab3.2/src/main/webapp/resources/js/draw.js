const canvas = document.getElementById("coordinates-canvas");
let frame = prepareDrawing(canvas);
const dots = parseDotsHistory();
console.log(dots);

const figuresColor = "#1890ff"
const cursorColor = "#92eba0"
const cellsColor = "#ebedf2"
const hitColor = "#de0d45"

canvas.onclick = async function (event) {
    const rect = event.target.getBoundingClientRect();
    const r = parseFloat(hidden_r_input.value ?? "1") ?? 1
    const x = (event.clientX - rect.left - frame.centerX) / frame.halfRX / 2 * r;
    const y = (frame.sizeY - (event.clientY - rect.top) - frame.centerY) / frame.halfRY / 2 * r;
    hidden_y_input.value = y;
    x_input.value = x;
    send_btn.click();
}

canvas.onmousemove = function (event) {
    const ctx = canvas.getContext('2d');
    redraw(ctx);
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; //x position within the element.
    const y = event.clientY - rect.top;
    drawDot(ctx, x, y, cursorColor);
}

const onResize = function(event) {
    if (canvas.getContext){
        const ctx = canvas.getContext('2d')
        frame = prepareDrawing(canvas)
        canvas.width = frame.sizeX
        canvas.height = frame.sizeY
        redraw(ctx);
    }
}

document.body.onresize = onResize;
document.body.onload = onResize;

function redraw(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(hidden_r_input.value);
    const actualR = parseFloat(hidden_r_input.value ?? "1");
    draw(ctx, frame, actualR);
    dots.forEach((dot) => {
        drawDot(
            ctx,
            frame.centerX + dot.x * (frame.halfRX * 2 / actualR),
            frame.centerY - dot.y * (frame.halfRY * 2 / actualR),
            dot.hit === "+" ? hitColor : cellsColor
        );
    });
}

function parseDotsHistory() {
    const result = [];
    const cells = document.querySelectorAll("table#result-table>tbody>tr");
    cells.forEach((cell) => {
        result.push({
            x : parseFloat(cell.children[2].innerHTML),
            y : parseFloat(cell.children[3].innerHTML),
            r : parseFloat(cell.children[4].innerHTML),
            hit : cell.children[5].innerHTML
        });
    });
    return result;
}

function drawDot(ctx, x, y, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, Math.PI*2, false)
    ctx.fill()
    ctx.closePath()
}

function prepareDrawing(canvas) {
    const sizeX = window.innerWidth > 1000 ? window.innerWidth * 0.23 : window.innerWidth * 0.8
    const sizeY = sizeX

    const centerX = sizeX / 2
    const centerY = sizeY / 2
    const halfRX = (sizeX*0.8) / 4
    const halfRY = (sizeY*0.8) / 4

    return {sizeX, sizeY, centerX, centerY, halfRX, halfRY}
}

function draw(ctx, frame, r) {
    ctx.fillStyle = figuresColor
    ctx.strokeStyle = cellsColor
    ctx.lineWidth = 2
    ctx.font = "15px serif";

    // Четверть круга
    ctx.beginPath()
    ctx.moveTo(frame.centerX-frame.halfRX, frame.centerY)
    ctx.arc(frame.centerX, frame.centerY, frame.halfRX, Math.PI,  Math.PI*1.5, false)
    ctx.lineTo(frame.centerX, frame.centerY)
    ctx.lineTo(frame.centerX - frame.halfRX, frame.centerY)
    ctx.fill()
    ctx.closePath()

    // Прямоугольник
    ctx.beginPath()
    ctx.moveTo(frame.centerX, frame.centerY)
    ctx.lineTo(frame.centerX, frame.centerY + frame.halfRY*2)
    ctx.lineTo(frame.centerX - frame.halfRX*2, frame.centerY + frame.halfRY*2)
    ctx.lineTo(frame.centerX - frame.halfRX*2, frame.centerY)
    ctx.lineTo(frame.centerX, frame.centerY)
    ctx.fill()
    ctx.closePath()

    // Триугольник
    ctx.beginPath()
    ctx.moveTo(frame.centerX, frame.centerY)
    ctx.lineTo(frame.centerX, frame.centerY + frame.halfRY*2)
    ctx.lineTo(frame.centerX + frame.halfRX, frame.centerY)
    ctx.lineTo(frame.centerX, frame.centerY)
    ctx.fill()
    ctx.closePath()

    ctx.fillStyle = cellsColor
    // Оси
    ctx.beginPath()
    ctx.moveTo(frame.centerX, frame.sizeY)
    ctx.lineTo(frame.centerX, 0)
    ctx.moveTo(0, frame.centerY)
    ctx.lineTo(frame.sizeX, frame.centerY)
    ctx.closePath();
    ctx.stroke();

    // стрелка оси Y
    ctx.beginPath()
    ctx.lineTo(frame.centerX - 5, 8)
    ctx.lineTo(frame.centerX + 5, 8)
    ctx.lineTo(frame.centerX, 0)
    ctx.closePath()
    ctx.fill()

    // стрелка оси X
    ctx.beginPath()
    ctx.lineTo(frame.sizeX, frame.centerY)
    ctx.lineTo(frame.sizeX - 8, frame.centerY + 5)
    ctx.lineTo(frame.sizeX - 8, frame.centerY - 5)
    ctx.lineTo(frame.sizeX, frame.centerY)
    ctx.closePath()
    ctx.fill()

    // Разметка оси Y
    ctx.beginPath()
    // R/2
    ctx.moveTo(frame.centerX - 3, frame.centerY - frame.halfRY)
    ctx.lineTo(frame.centerX + 3, frame.centerY - frame.halfRY)
    ctx.fillText((r/2).toString(), frame.centerX + 8, frame.centerY - frame.halfRY);
    // R
    ctx.moveTo(frame.centerX - 3, frame.centerY - 2*frame.halfRY)
    ctx.lineTo(frame.centerX + 3, frame.centerY - 2*frame.halfRY)
    ctx.fillText(r.toString(), frame.centerX + 8, frame.centerY - 2*frame.halfRY);
    // -R/2
    ctx.moveTo(frame.centerX - 3, frame.centerY + frame.halfRY)
    ctx.lineTo(frame.centerX + 3, frame.centerY + frame.halfRY)
    ctx.fillText((-r/2).toString(), frame.centerX + 8, frame.centerY + frame.halfRY);
    // -R
    ctx.moveTo(frame.centerX - 3, frame.centerY + 2*frame.halfRY)
    ctx.lineTo(frame.centerX + 3, frame.centerY + 2*frame.halfRY)
    ctx.fillText((-r).toString(), frame.centerX + 8, frame.centerY + 2*frame.halfRY);

    // Разметка оси X
    // -R
    ctx.moveTo(frame.centerX - 2*frame.halfRX, frame.centerY - 3)
    ctx.lineTo(frame.centerX - 2*frame.halfRX, frame.centerY + 3)
    ctx.fillText((-r).toString(), frame.centerX - 2*frame.halfRX, frame.centerY - 8);
    // -R/2
    ctx.moveTo(frame.centerX - frame.halfRX, frame.centerY - 3)
    ctx.lineTo(frame.centerX - frame.halfRX, frame.centerY + 3)
    ctx.fillText((-r/2).toString(), frame.centerX - frame.halfRX, frame.centerY - 8);
    // R/2
    ctx.moveTo(frame.centerX + frame.halfRX, frame.centerY - 3)
    ctx.lineTo(frame.centerX + frame.halfRX, frame.centerY + 3)
    ctx.fillText((r/2).toString(), frame.centerX + frame.halfRX, frame.centerY - 8);
    // R
    ctx.moveTo(frame.centerX + 2*frame.halfRX, frame.centerY - 3)
    ctx.lineTo(frame.centerX + 2*frame.halfRX, frame.centerY + 3)
    ctx.fillText(r.toString(), frame.centerX + 2*frame.halfRX, frame.centerY - 8);
    ctx.closePath()
    ctx.stroke()
}