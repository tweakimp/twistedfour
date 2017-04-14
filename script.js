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
var winRow = false;
var winColumn = false;
var winDiagonal = false;

function checkForWin() {
	checkRows();
	checkColumns();
	checkDiagonals();
	if (winRow || winColumn || winDiagonal) {
		if (winRow && !winColumn && !winDiagonal) {
			document.getElementsByClassName("statusArea")[0].innerHTML = "WIN BY ROW";
		}
		if (!winRow && winColumn && !winDiagonal) {
			document.getElementsByClassName("statusArea")[0].innerHTML = "WIN BY COLUMN";
		}
		if (!winRow && !winColumn && winDiagonal) {
			document.getElementsByClassName("statusArea")[0].innerHTML = "WIN BY DIAGONAL";
		}
		if (winRow && winColumn && !winDiagonal) {
			document.getElementsByClassName("statusArea")[0].innerHTML = "WIN BY ROW AND COLUMN";
		}
		if (winRow && !winColumn && winDiagonal) {
			document.getElementsByClassName("statusArea")[0].innerHTML = "WIN BY ROW AND DIAGONAL";
		}
		if (!winRow && winColumn && winDiagonal) {
			document.getElementsByClassName("statusArea")[0].innerHTML = "WIN BY COLUMN AND DIAGONAL";
		}
		if (winRow && winColumn && winDiagonal) {
			document.getElementsByClassName("statusArea")[0].innerHTML = "WIN BY ROW, COLUMN AND DIAGONAL";
		}
	}
}

function checkRows() {
	//four in a row
	for (var j = 0; j < 7; j++) {
		var currentCount = 1;
		var currentToken = matrix[0][j];
		for (var i = 1; i < 7; i++) {
			if (currentToken === matrix[i][j]) {
				currentCount++;
				if (currentCount === 4) {
					winRow = true;
					break;
				}
			} else {
				currentToken = matrix[i][j];
				currentCount = 1;
			}
		}
	}
}

function checkColumns() {
	//four in a column
	for (var i = 0; i < 7; i++) {
		var currentCount = 1;
		var currentToken = matrix[i][0];
		for (var j = 1; j < 7; j++) {
			if (currentToken === matrix[i][j]) {
				currentCount++;
				if (currentCount === 4) {
					winColumn = true;
					break;
				}
			} else {
				currentToken = matrix[i][j];
				currentCount = 1;
			}
		}
	}
}

function checkDiagonals() {
	//four in a diagonal
	//bottom left to top right diagonals
	//idea: search from start points for these diagonals. start points are the fields in the bottom left 4*4 square
	checkBLTRdiagonals();
	//top left to bottom right diagonals
	//idea: search from start points for these diagonals. start points are the fields in the top left 4*4 square
	checkTLBRdiagonals();
}

function checkBLTRdiagonals() {
	for (var j = 0; j < 5; j++) {
		for (var i = 0; i < 5; i++) {
			var currentCount = 1;
			var currentToken = matrix[i][j];
			for (var step = 0; step < 4; step++) {
				if (currentToken === matrix[i + step][j + step]) {
					currentCount++;
				} else {
					break;
				}
				if (currentCount === 4) {
					winDiagonal = true;
				}
			}
		}
	}
}

function checkTLBRdiagonals() {
	for (var j = 0; j < 5; j++) {
		for (var i = 0; i < 5; i++) {
			var currentCount = 1;
			var currentToken = matrix[i][j];
			for (var step = 0; step < 4; step++) {
				if (currentToken === matrix[i + step][j + step]) {
					currentCount++;
				} else {
					break;
				}
				if (currentCount === 4) {
					winDiagonal = true;
				}
			}
		}
	}
}
checkForWin();
