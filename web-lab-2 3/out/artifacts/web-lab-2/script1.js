let x = null;
let y = null;
let r = null;
let canvas = document.getElementById("setka");
let coef = (canvas.width/2-10-10-10)/3/2;
canvas.addEventListener("click", function (e){sendByClick(canvas,e)});
document.getElementById("send").addEventListener("click",function(){ send(x,y,r)});
document.getElementById("clear").addEventListener("click",clear);
document.getElementById("ytextfield").addEventListener("input",updateY);
let rad=document.getElementsByName('R');
  for (let i=0;i<rad.length; i++) {
    rad[i].addEventListener("click",updateR);
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
	if (validateArg(x)) {
		if (validateArg(y)){
			if (validateArg(r)){
	$.ajax({ 
      url: "index.html",
		dataType: "json",
		method: "POST",
		timeout: 10000,
    	data: {"x": Number(x.trim().substring(0,50)), "y": Number(y.trim().substring(0,50)),"r":Number(r.trim().substring(0,50))},
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
			alert(dataJson['msg']);
		}
	   },
	   error: function(jqXHR, textStatus){
		  if (textStatus==="timeout")
		 	 alert("Time out");
		  else
			  alert("Something went wrong...");
	   }
 });
			}
			else alert("R невведен или введен некоректно");
		} else alert("Y невведен или введен некоректно");
	} else alert("X невведен или введен некоректно");
}

function clear(){
	document.getElementById("current_x").innerHTML = "";
	document.getElementById("current_y").innerHTML = "";
	document.getElementById("current_r").innerHTML = "";
	document.getElementById("ytextfield").style.backgroundColor = "white";
	x = null;
	y = null;
	r = null;
	let rad=document.getElementsByName('R');
	for (let i=0;i<rad.length; i++) {
		rad[i].checked = false;
	}
	document.getElementById("ytextfield").value = "";
}
function updateX(el) {
 document.getElementById("current_x").innerHTML = el.value;
 x = el.value;
}

function updateY(){
	let ytextfield = document.getElementById("ytextfield");
	let temp_y = ytextfield.value.trim().substring(0,9);
	if (!isNaN(Number(ytextfield.value))){
		ytextfield.style.backgroundColor = "white";
	}
	else{
		ytextfield.style.backgroundColor = "red";
	}
	document.getElementById("current_y").innerHTML = String(Number(temp_y));
	y = ytextfield.value;
}
function updateR(){
	let rad=document.getElementsByName('R');
	for (let i=0;i<rad.length; i++) {
    if (rad[i].checked){
		document.getElementById("current_r").innerHTML = rad[i].value;
		r = rad[i].value;
	}
  }
	drawCanvas(canvas);
}

function validateArg(z){
	return (!isNaN(Number(z)) && z!=null);
}

function drawCanvas(canvas){
	let context = canvas.getContext('2d');
	let r_canvas;
	if (r == null)
		r_canvas = 2;
	else r_canvas = r;
	let step = coef*r_canvas;
	context.clearRect(0, 0, canvas.width, canvas.height);
	//draw target
	context.beginPath();
	context.moveTo(canvas.width/2,canvas.height/2);
	context.arc(canvas.width/2, canvas.height/2, step, 0, Math.PI/2, false);
	context.moveTo(canvas.width/2, canvas.height/2)
	context.lineTo(canvas.width/2 + 2*step, canvas.height/2);
	context.lineTo(canvas.width/2 + 2*step, canvas.height/2 -2*step);
	context.lineTo(canvas.width/2, canvas.height/2-2*step);
	context.lineTo(canvas.width/2, canvas.height/2);
	context.lineTo(canvas.width/2-step*2, canvas.height/2);
	context.lineTo(canvas.width/2, canvas.height/2-2*step);



	context.closePath();
	context.fillStyle = '#4E3835';
	context.fill();
	context.lineWidth = 1;
	context.stroke();

	//draw lines
	context.beginPath();
	context.moveTo(10,canvas.height/2);
	context.lineTo(canvas.width-10,canvas.height/2);
	context.lineTo(canvas.width-20,canvas.height/2-10);
	context.moveTo(canvas.width-10,canvas.height/2);
	context.lineTo(canvas.width-20,canvas.height/2+10);

	context.moveTo(canvas.width/2, canvas.height - 10);
	context.lineTo(canvas.width/2,10);
	context.lineTo(canvas.width/2-10,20);
	context.moveTo(canvas.width/2,10);
	context.lineTo(canvas.width/2+10,20);

	context.moveTo(canvas.width/2-2*step,canvas.height/2+10);
	context.lineTo(canvas.width/2-2*step,canvas.height/2-10);
	context.moveTo(canvas.width/2-step,canvas.height/2+10);
	context.lineTo(canvas.width/2-step,canvas.height/2-10);
	context.moveTo(canvas.width/2+step,canvas.height/2+10);
	context.lineTo(canvas.width/2+step,canvas.height/2-10);
	context.moveTo(canvas.width/2+2*step,canvas.height/2+10);
	context.lineTo(canvas.width/2+2*step,canvas.height/2-10);

	context.moveTo(canvas.width/2+10,canvas.height/2-2*step);
	context.lineTo(canvas.width/2-10,canvas.height/2-2*step);
	context.moveTo(canvas.width/2+10,canvas.height/2-step);
	context.lineTo(canvas.width/2-10,canvas.height/2-step);
	context.moveTo(canvas.width/2+10,canvas.height/2+step);
	context.lineTo(canvas.width/2-10,canvas.height/2+step);
	context.moveTo(canvas.width/2+10,canvas.height/2+2*step);
	context.lineTo(canvas.width/2-10,canvas.height/2+2*step);
	context.closePath();
	context.lineWidth = 2;
	context.stroke();

}