
// **********************************************  STAGE 1 **************************************
var glils1 =
	[
		[0, 5, 5, 2, 2, 2, 1, 1],
		[0, 0, 1, 0, 1, 5, 5, 5],
		[1, 1, 3, 3, 3, 4, 6, 6],
		[1, 2, 1, 0]
	];

var expected = [[1, 0, 1, 1]];
var result =   [[-1, -1, -1, -1]];



function CreateRow1(good, index, size)
{
	var td1 = document.createElement("td");
	var c = new Canvas(td1);
	c.canvas.height = 80;
	c.canvas.width = size * 40 + 130;

	var tr = document.createElement("tr");
	var td2 = document.createElement("td");
	td2.style.direction = "rtl";
	var btnGood = document.createElement("input");
	btnGood.name = "g" + index;
	btnGood.type = "radio";
	btnGood.value = 1;
	btnGood.setAttribute("onchange", "Checked(this," + index + ");");
	var btnBad = document.createElement("input");
	btnBad.name = "g" + index;
	btnBad.type = "radio";
	btnBad.value = 0;
	btnBad.setAttribute("onchange", "Checked(this," + index + ");");

	td2.appendChild(btnGood);
	AddSpan(td2, "גליל מסודר");
	td2.appendChild(btnBad);
	AddSpan(td2, "גליל מפוזר");
	
	tr.appendChild(td1);
	tr.appendChild(td2);
	tblStage1.appendChild(tr);
	return c;

}

function DrawGlils1()
{
	for(var i = 0; i < glils1.length; i++)
	{
		var c = CreateRow1(glils1[i][0], i, glils1[i].length);
		DrawGlil(c, glils1[i]);
	}		
}

function RunStage()
{
	DrawGlils1();
}

function Checked(radio, index)
{
	result[0][index] = parseInt(radio.value);
	if (CorrectResult(expected, result))
		ShowOrHide(trNext, true);
}
