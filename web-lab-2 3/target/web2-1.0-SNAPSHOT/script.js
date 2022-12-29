let x = null;
let y = null;
let r = null;
let canvas = document.getElementById("setka");
let coef = ((canvas.width/2-10-10-10)/3)/2;
canvas.addEventListener("click", function (e){sendByClick(canvas,e)});
document.getElementById("send").addEventListener("click",function(){ send(x,y,r)});
document.getElementById("clear").addEventListener("click",clear);
document.getElementById("ytextfield").addEventListener("input",updateY);
document.getElementById("rtextfield").addEventListener("input",updateR);
let rad=document.getElementsByName('X');
for (let i=0;i<rad.length; i++) {
    rad[i].addEventListener("click",updateX);
}
drawCanvas(canvas);

function sendByClick(canvas, event){
    let rect = canvas.getBoundingClientRect()
    console.log("x: ", event.clientX - rect.left," y: ", event.clientY - rect.top);
    let x_click = (event.clientX - rect.left - canvas.width/2)/coef/2;
    let y_click = -(event.clientY - rect.top - canvas.height/2)/coef/2;
    send(x_click,y_click,r);
}
function drawHit(xx,yy, hit){
    let context = canvas.getContext('2d');
    context.beginPath();
    context.arc(xx*2*coef+canvas.width/2,-yy*2*coef+canvas.height/2, 5, 0, 7, false);
    context.closePath();
    if (hit ==="YES")
        context.fillStyle = "#259f05";
    else
        context.fillStyle = "#ff0000";
    context.fill();
}

function send(x, y, r){
    x = String(x);
    y = String(y);
    r = String(r);
    if (validateArg(x)){
        if (validateArg(y) && (y>-3 && y<5)){
            if (validateArg(r) && (r>2 && r<5)){
                $.ajax({
                    url: "index.html",
                    dataType: "json",
                    method: "POST",
                    timeout: 10000,
                    data: {"x": Number(x), "y": Number(y),"r":Number(r)},
                    success: function(data) {
                        console.log(data);
                        let dataJson = data;
                        if (dataJson["code"]==="0"){
                            drawHit(x,y, dataJson["hit"]);
                            let row = document.createElement("tr");
                            let cell = document.createElement("td");
                            cell.innerHTML = dataJson["x"];
                            row.appendChild(cell);
                            cell = document.createElement("td");
                            cell.innerHTML = dataJson["y"];
                            row.appendChild(cell);
                            cell = document.createElement("td");
                            cell.innerHTML = dataJson["r"];
                            row.appendChild(cell);
                            cell = document.createElement("td");
                            cell.innerHTML = dataJson["hit"];
                            row.appendChild(cell);
                            cell = document.createElement("td");
                            cell.innerHTML = dataJson["server_time"];
                            row.appendChild(cell);
                            cell = document.createElement("td");
                            cell.innerHTML = dataJson["exec_time"];
                            row.appendChild(cell);
                            $("#history_head").after(row);
                        }
                        else {
                            iddiv.innerHTML=("msg");
                        }
                    },
                    error: function(jqXHR, textStatus){
                        if (textStatus==="timeout")
                            iddiv.innerHTML=("Time out");
                        else
                            iddiv.innerHTML=("Something went wrong...");
                    }
                });
            } else iddiv.innerHTML=("R невведен или введен некоректно");
        } else iddiv.innerHTML=("Y невведен или введен некоректно");
    } else iddiv.innerHTML=("X невведен или введен некоректно");
}
function clear(){
    document.getElementById("current_x").innerHTML = "";
    document.getElementById("current_y").innerHTML = "";
    document.getElementById("current_r").innerHTML = "";
    document.getElementById("ytextfield").style.backgroundColor = "white";
    document.getElementById("rtextfield").style.backgroundColor = "white";
    x = null;
    y = null;
    r = null;
    let rad=document.getElementsByName('R');
    for (let i=0;i<rad.length; i++) {
        rad[i].checked = false;
    }
    document.getElementById("rtextfield").value = "";
    document.getElementById("ytextfield").value = "";
    iddiv.innerHTML=("");
}
function updateX() {
    let rad = document.getElementsByName('X');
    for (let i = 0; i < rad.length; i++) {
        if (rad[i].checked) {
            document.getElementById("current_x").innerHTML = rad[i].value;
            x = rad[i].value;
            iddiv.innerHTML=("");
        }
    }
}

    function updateY() {
        let ytextfield = document.getElementById("ytextfield");
        let temp_y = ytextfield.value.trim().substring(0, 9);
        ytextfield.value = temp_y.replace(",",".");
        if (!isNaN(Number(ytextfield.value)) && (ytextfield.value > -3 && ytextfield.value < 5)) {
            ytextfield.style.backgroundColor = "white";
            iddiv.innerHTML=("");
        }
        else{
            ytextfield.style.backgroundColor = "red";
            iddiv.innerHTML=("Y невведен или введен некоректно");
        }
        document.getElementById("current_y").innerHTML = String(Number(temp_y));
        y = ytextfield.value;
    }

    function updateR() {
        let rtextfield = document.getElementById("rtextfield");
        let temp_r = rtextfield.value.trim().substring(0, 9);
        rtextfield.value = temp_r.replace(",",".");
        if (!isNaN(Number(rtextfield.value)) && (rtextfield.value > 2 && rtextfield.value < 5)) {
            rtextfield.style.backgroundColor = "white";
            iddiv.innerHTML=("");
        }
        else{
            rtextfield.style.backgroundColor = "red";
            iddiv.innerHTML=("R невведен или введен некоректно");
        }
        document.getElementById("current_r").innerHTML = String(Number(temp_r));
        r = rtextfield.value;
        drawCanvas(canvas);
    }

    function validateArg(z) {
        return (!isNaN(Number(z)) && z != null);
    }

    function drawCanvas(canvas) {
        let context = canvas.getContext('2d');
        let r_canvas;
        if (r == null)
            r_canvas = 2;
        else r_canvas = r;
        let step = coef * r_canvas;
        context.clearRect(0, 0, canvas.width, canvas.height);
        //draw target
        context.beginPath();
        context.moveTo(canvas.width / 2, canvas.height / 2);
        context.arc(canvas.width / 2, canvas.height / 2, step, Math.PI * 3 / 2, Math.PI, true);
        context.moveTo(canvas.width / 2, canvas.height / 2)
        context.lineTo(canvas.width / 2 + step, canvas.height / 2);
        context.lineTo(canvas.width / 2 + step, canvas.height / 2 - 2 * step);
        context.lineTo(canvas.width / 2, canvas.height / 2 - 2 * step);
        context.lineTo(canvas.width / 2, canvas.height / 2);
        context.lineTo(canvas.width / 2 + step, canvas.height / 2);
        context.lineTo(canvas.width / 2, canvas.height / 2 + step);


        context.closePath();
        context.fillStyle = '#343434';
        context.fill();
        context.lineWidth = 1;
        context.stroke();


        //draw lines
        context.beginPath();
        context.moveTo(10, canvas.height / 2);
        context.lineTo(canvas.width - 10, canvas.height / 2);
        context.lineTo(canvas.width - 20, canvas.height / 2 - 10);
        context.moveTo(canvas.width - 10, canvas.height / 2);
        context.lineTo(canvas.width - 20, canvas.height / 2 + 10);

        context.moveTo(canvas.width / 2, canvas.height - 10);
        context.lineTo(canvas.width / 2, 10);
        context.lineTo(canvas.width / 2 - 10, 20);
        context.moveTo(canvas.width / 2, 10);
        context.lineTo(canvas.width / 2 + 10, 20);

        context.moveTo(canvas.width / 2 - 2 * step, canvas.height / 2 + 10);
        context.lineTo(canvas.width / 2 - 2 * step, canvas.height / 2 - 10);
        context.moveTo(canvas.width / 2 - step, canvas.height / 2 + 10);
        context.lineTo(canvas.width / 2 - step, canvas.height / 2 - 10);
        context.moveTo(canvas.width / 2 + step, canvas.height / 2 + 10);
        context.lineTo(canvas.width / 2 + step, canvas.height / 2 - 10);
        context.moveTo(canvas.width / 2 + 2 * step, canvas.height / 2 + 10);
        context.lineTo(canvas.width / 2 + 2 * step, canvas.height / 2 - 10);

        context.moveTo(canvas.width / 2 + 10, canvas.height / 2 - 2 * step);
        context.lineTo(canvas.width / 2 - 10, canvas.height / 2 - 2 * step);
        context.moveTo(canvas.width / 2 + 10, canvas.height / 2 - step);
        context.lineTo(canvas.width / 2 - 10, canvas.height / 2 - step);
        context.moveTo(canvas.width / 2 + 10, canvas.height / 2 + step);
        context.lineTo(canvas.width / 2 - 10, canvas.height / 2 + step);
        context.moveTo(canvas.width / 2 + 10, canvas.height / 2 + 2 * step);
        context.lineTo(canvas.width / 2 - 10, canvas.height / 2 + 2 * step);
        context.closePath();
        context.lineWidth = 2;
        context.stroke();
    }




