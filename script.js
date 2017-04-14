// jshint esversion:6
// jshint browser: true
// jshint devel: true
var matrix =
	Array(7)
	.fill(null)
	.map(() => Array(7)
		.fill(0));
var fieldtoken = [0, 1, 2];
var coordinates = false;

function randomEntry() {
	return fieldtoken[Math.floor(Math.random() * 3)];
}

function fillMatrix() {
	for (var i = 6; i > -1; i--)
		for (var j = 6; j > -1; j--) {
			if (coordinates) {
				matrix[i][j] = "column" + i + "<br>row" + j;
			} else {
				matrix[i][j] = randomEntry();
			}
		}
}
fillMatrix();

function drawMatrix() {
	var gameArea = document.getElementsByClassName("gameArea")[0];
	for (var i = 0; i < 7; i++) {
		//create columns
		var column = document.createElement("div");
		column.className = "column";
		gameArea.appendChild(column);
		for (var j = 6; j > -1; j--) {
			//create fields			
			var field = document.createElement("div");
			field.className = "field";
			var textfield = document.createElement("div");
			textfield.className = "textfield";
			textfield.innerHTML = matrix[i][j];
			column.appendChild(field);
			field.appendChild(textfield);
		}
	}
}
drawMatrix();
