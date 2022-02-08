var colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink"];
var stage = 1;
var GALIL_ADD = 130;
var CANVAS_HEIGHT = 80;
var BALL_WIDTH = 40;

class Canvas
{
	static canvasID = 1;

	constructor(parentElement)
	{

		this.canvas = document.createElement("canvas");
		this.canvas.id = Canvas.canvasID;
		Canvas.canvasID++;
		this.PE = parentElement;
		this.PE.appendChild(this.canvas);
		this.ctx = this.canvas.getContext("2d");
		this.radianA = 360 / (2 * Math.PI);
	}

	drawCustomCircle(x, y, radius, color, startAngle, endAngle)
	{		
		this.ctx.fillStyle = color;
		this.ctx.lineWidth = 0;
		this.ctx.strokeStyle = color;
		this.ctx.beginPath();
		this.ctx.arc(x, y, radius, startAngle / this.radianA,  endAngle / this.radianA, true);
		this.ctx.closePath();
		this.ctx.fill();
	}
	
	drawCircle(x, y, radius, color)
	{
		
		this.ctx.fillStyle = color;
		this.ctx.lineWidth = 0;
		this.ctx.strokeStyle = color;
		this.ctx.beginPath();
		this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
		this.ctx.fill();
		this.ctx.closePath();
	}
	
	drawEllipse(x, y, rx, ry, color, fillcolor)
	{
		this.ctx.strokeStyle = color;
		this.ctx.fillStyle = fillcolor;			
		this.ctx.beginPath();
		this.ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
		this.ctx.stroke();		
		this.ctx.fill();
	}
	drawRectangle(x, y, width, height, color) 
	{
		this.ctx.beginPath();
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = "blue";
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, width, height);
		this.ctx.rect(x, y, width, height);
		this.ctx.stroke();
		this.ctx.closePath();
	}

	drawLine(x1, y1, x2, y2, color) 
	{
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = color;
		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
	}
	
	writeText(txt, x, y, color)
	{
		this.ctx.font = "20px Arial";
		this.ctx.fillStyle = color;
		this.ctx.fillText(txt, x, y);
	}
	
	clearCanvas()
	{
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function DrawGlil(c, glil)
{
	c.canvas.width = glil.length * BALL_WIDTH + GALIL_ADD;

	var x = 20, y = 45, r = 20;
	c.drawLine(20, y - 25, (r * 2 + 10) * glil.length, y - 25, "black");

	c.drawEllipse(x, y, 10, 25, "black", "white");
	x = 60;
	for (var i = 1; i < glil.length; i++) {
		c.drawCircle(x, y, r, colors[glil[i]]);
		c.writeText(i, x - 3, y - r - 8, "black");
		x += 2 * r + 10;
	}
	c.drawEllipse(x - 10 , y, 10, 25, "black", "black"); 
	c.drawLine(20, y + 25, (r * 2 + 10) * glil.length, y + 25, "black");
}

function CreateColorsSelect(sel)
{
	for (var i = 0; i < colors.length; i++)
	{
		var opt = document.createElement("option");
		sel.appendChild(opt);
		opt.value = i;
		opt.style.color = colors[i];
		opt.innerHTML = colors[i].toUpperCase();
	}
}

function CreateRepeatSelect(sel, max)
{
	for (var i = 1; i <= max; i++)
	{
		var opt = document.createElement("option");
		sel.appendChild(opt);
		opt.value = i;
		opt.innerHTML = i;
	}
}

function CreateGalilSelect(sel, max) {
	for (var i = 1; i <= max; i++) {
		var opt = document.createElement("option");
		sel.appendChild(opt);
		opt.value = (i - 1);
		opt.innerHTML = "GALIL" + i;
	}
}

function CreateGalilRow(index, balls, tbl) {
	var td1 = document.createElement("td");
	td1.innerHTML = "GALIL" + (index + 1);
	var td2 = document.createElement("td");
	var c = new Canvas(td2);
	c.canvas.height = CANVAS_HEIGHT;
	c.canvas.width = balls * BALL_WIDTH + GALIL_ADD;
	var tr = document.createElement("tr");
	tr.appendChild(td1);
	tr.appendChild(td2);
	tbl.appendChild(tr);
	return c;
}

function AddSpan(element, text) {
	var spn1 = document.createElement("span");
	spn1.innerHTML = text;
	element.appendChild(spn1);
}

function AddBR(element, count) {
    for (var i = 1; i <= count; i++) {
		var br = document.createElement("br");
		element.appendChild(br);
    }
}

function CorrectResult(expected, result)
{
	if (expected.length != result.length)
		return false;

	for (var i = 0; i < expected.length; i++)
	{
		if (expected[i].length != result[i].length)
			return false;
		for (var j = 0; j < expected[i].length; j++)
		{
			if (expected[i][j] != result[i][j])
				return false;
        }
	}
	return true;
}

function ShowOrHide(element, show)
{
	if (show)
		element.style.display = "";
	else
		element.style.display = "none";
}

function RefreshGalil(index, glils, canvases) {
	var c = canvases[index];
	var size = glils[index].length;
	c.clearCanvas();
	c.canvas.width = size * 40 + 150;
	DrawGlil(c, glils[index]);
}

function NextStage()
{
	var str = window.location.href.toLowerCase();
	var i = str.indexOf("rezef");
	var j = i > 0 ? str.indexOf(".html") : i;

	if (i >= 0 && j > i)
	{
		var k = i + "rezef".length;
		var z = str.substr(k, j - k);
		i = parseInt(z) + 1
		location = str.substr(0, k) + i + str.substr(j);
    }
}

document.addEventListener("DOMContentLoaded", function () { RunStage(); });