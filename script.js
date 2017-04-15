// jshint esversion:6
// jshint browser: true
// jshint devel: true
var matrix = Array(7)
	.fill(null)
	.map(() => Array(7)
		.fill(0));
var fieldtoken = [0, 0, 1, 2]; // possible states a field can have. 0 for empty, 1 for player 1, 2 for player 2
var entries = "randomized"; // switch to coordinates, randomized, custom
// we are currently just filling the board with a random distribution of the field tokens
function randomEntry() {
	return fieldtoken[Math.floor(Math.random() * fieldtoken.length)];
}
var customMatrix = [
	[1, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 0, 1, 0, 0],
	[1, 0, 1, 0, 0, 1, 0],
	[0, 1, 0, 0, 0, 0, 0],
	[0, 1, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 0, 0, 0, 0],
];

function applyCustom() {
	for (var i = 6; i > -1; i--) {
		for (var j = 6; j > -1; j--) {
			matrix[i][j] = customMatrix[6 - j][i];
		}
	}
}

function fillMatrix() {
	for (var i = 6; i > -1; i--) {
		for (var j = 6; j > -1; j--) {
			switch (entries) {
				case "coordinates":
					matrix[i][j] = "column" + i + "<br>row" + j;
					break;
				case "randomized":
					matrix[i][j] = randomEntry();
					break;
				case "custom":
					applyCustom();
					break;
				default:
					matrix[i][j] = randomEntry();
					break;
			}
		}
	}
}
fillMatrix();
//convert javascript matrix into html matrix
//note that we create columns from left to right and rows from bottom to top
applyGravity();

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
			if (currentToken === matrix[i][j] && currentToken !== 0) {
				currentCount++;
				if (currentCount === 4) {
					winRow = true;
					for (var markSteps = 0; markSteps < 4; markSteps++) {
						var markColumn = document.getElementsByClassName("column")[i - markSteps];
						var markFields = markColumn.getElementsByClassName("field")[6 - j];
						markFields.className += " markedField";
					}
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
			if (currentToken === matrix[i][j] && currentToken !== 0) {
				currentCount++;
				if (currentCount === 4) {
					winColumn = true;
					for (var markSteps = 0; markSteps < 4; markSteps++) {
						var markColumn = document.getElementsByClassName("column")[i];
						var markFields = markColumn.getElementsByClassName("field")[6 - (j - markSteps)];
						markFields.className += " markedField";
					}
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
	for (var j = 0; j < 4; j++) {
		for (var i = 0; i < 4; i++) {
			var currentCount = 1;
			var currentToken = matrix[i][j];
			for (var step = 1; step < 4; step++) {
				if (currentToken === matrix[i + step][j + step] && currentToken !== 0) {
					currentCount++;
				} else {
					break;
				}
				if (currentCount === 4) {
					winDiagonal = true;
					//mark winning fields
					//document.getElementsByClassName("column")[i].getElementsByClassName("field")[6 - j].className += " markedField";
					for (var markSteps = 0; markSteps < 4; markSteps++) {
						var markColumn = document.getElementsByClassName("column")[i + markSteps];
						var markFields = markColumn.getElementsByClassName("field")[6 - (j + markSteps)];
						markFields.className += " markedField";
					}
					break;
				}
			}
		}
	}
}

function checkTLBRdiagonals() {
	for (var i = 0; i < 4; i++) {
		for (var j = 6; j > 3; j--) {
			var currentCount = 1;
			var currentToken = matrix[i][j];
			for (var step = 1; step < 4; step++) {
				if (currentToken === matrix[i + step][j - step] && currentToken !== 0) {
					currentCount++;
				} else {
					break;
				}
				if (currentCount === 4) {
					winDiagonal = true;
					//mark winning fields
					//document.getElementsByClassName("column")[i].getElementsByClassName("field")[6 - j].className += " markedField";
					for (var markSteps = 0; markSteps < 4; markSteps++) {
						var markColumn = document.getElementsByClassName("column")[i + markSteps];
						var markFields = markColumn.getElementsByClassName("field")[6 - (j - markSteps)];
						markFields.className += " markedField";
					}
					break;
				}
			}
		}
	}
}

function applyGravity() {
	for (var i = 0; i < 7; i++) {
		var zeroes = [];
		// find zeroes and write their index to array
		for (var j = 0; j < 7; j++) {
			if (matrix[i][j] === 0) {
				zeroes.push(j);
			}
		}
		// splice zeroes from columns and push them to the end
		for (var z = 0; z < zeroes.length; z++) {
			//zeroes[z] needs -z so the focus stays on the right array item. saved indices need to be adjusted beucase we splice while reading them.
			matrix[i].splice(zeroes[z] - z, 1);
			matrix[i].push(0);
		}
	}
}
checkForWin();
