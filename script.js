// jshint esversion:6
// jshint browser: true
// jshint devel: true

// start with 7x7 matrix
const matrix = Array(7)
	.fill(null)
	.map(() => Array(7)
		.fill(0));

// possible states a field can have. 0 for empty, 1 for player 1, 2 for player 2
const fieldtoken = [0, 1, 2];

// switch to "coordinates", "randomized", "custom". coordinates makes the the fields show their coordinates; randomized creates a random 0,1,2 distribution; with custom you can setup a custom grid via customMatrix
const entries = "randomized";

// gravity = true makes zeroes get moved up in a column
const gravity = true;

// we are currently just filling the board with a random distribution of the field tokens
function randomEntry() {
	return fieldtoken[Math.floor(Math.random() * fieldtoken.length)];
}

// applies the custom matrix on the matrix the game uses
function applyCustom() {
	// the custom matrix is applied in a way so that the columns you see here are also the columns you will see in the browser
	const customMatrix = [
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 2, 0],
		[1, 1, 0, 0, 2, 1, 0],
		[2, 1, 1, 2, 1, 2, 0],
		[2, 2, 2, 1, 1, 2, 0],
		[1, 2, 2, 1, 1, 1, 0],
	];

	for (let i = 6; i > -1; i--) {
		for (let j = 6; j > -1; j--) {
			matrix[i][j] = customMatrix[6 - j][i];
		}
	}
}

// fill the matrix with what you chose at let entries
function fillMatrix() {
	for (let i = 6; i > -1; i--) {
		for (let j = 6; j > -1; j--) {
			switch (entries) {
				case "coordinates":
					matrix[i][j] = "column $(i) <br>row $(j)";
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

function applyGravity() {
	for (let i = 0; i < 7; i++) {
		// find zeroes and write their index to array
		let zeroes = [];

		for (let j = 0; j < 7; j++) {
			if (matrix[i][j] === 0) {
				zeroes.push(j);
			}
		}
		// splice zeroes from columns and push them to the end
		for (let z = 0; z < zeroes.length; z++) {
			// zeroes[z] needs -z so the focus stays on the right array item. saved indices need to be adjusted beucase we splice while reading them.
			matrix[i].splice(zeroes[z] - z, 1);
			matrix[i].push(0);
		}
	}
}

// apply gravity if let gravity = true
if (gravity) {
	applyGravity();
}

// convert javascript matrix into html matrix. note that we create columns from left to right and rows from bottom to top
function drawMatrix() {
	const gameArea = document.getElementsByClassName("gameArea")[0];
	for (let i = 0; i < 7; i++) {
		// create columns
		let column = document.createElement("div");
		column.className = "column";
		gameArea.appendChild(column);
		for (let j = 6; j > -1; j--) {
			// create fields
			let field = document.createElement("div");
			field.className = "field";
			let textfield = document.createElement("div");
			textfield.className = "textfield";
			textfield.innerHTML = matrix[i][j];
			column.appendChild(field);
			field.appendChild(textfield);
		}
	}
}
drawMatrix();

// check for winconditions. devide them up into three to make it easier
let winRow = false;
let winColumn = false;
let winDiagonal = false;

function checkRows() {
	// four in a row
	for (let j = 0; j < 7; j++) {
		let currentCount = 1;
		let currentToken = matrix[0][j];
		for (let i = 1; i < 7; i++) {
			if (currentToken === matrix[i][j] && currentToken !== 0) {
				currentCount++;
				if (currentCount === 4) {
					winRow = true;
					for (let markSteps = 0; markSteps < currentCount; markSteps++) {
						let markColumn = document.getElementsByClassName("column")[i - markSteps];
						let markFields = markColumn.getElementsByClassName("field")[6 - j];
						markFields.className += " markedField";
					}
				}
			} else {
				currentToken = matrix[i][j];
				currentCount = 1;
			}
		}
	}
}

function checkColumns() {
	// four in a column
	for (let i = 0; i < 7; i++) {
		let currentCount = 1;
		let currentToken = matrix[i][0];
		for (let j = 1; j < 7; j++) {
			if (currentToken === matrix[i][j] && currentToken !== 0) {
				currentCount++;
				if (currentCount === 4) {
					winColumn = true;
					for (let markSteps = 0; markSteps < 4; markSteps++) {
						let markColumn = document.getElementsByClassName("column")[i];
						let markFields = markColumn.getElementsByClassName("field")[6 - (j - markSteps)];
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

function checkBLTRdiagonals() {
	for (let j = 0; j < 4; j++) {
		for (let i = 0; i < 4; i++) {
			let currentCount = 1;
			let currentToken = matrix[i][j];
			for (let step = 1; step < 4; step++) {
				if (currentToken === matrix[i + step][j + step] && currentToken !== 0) {
					currentCount++;
				} else {
					break;
				}
				if (currentCount === 4) {
					winDiagonal = true;
					// mark winning fields
					// document.getElementsByClassName("column")[i].getElementsByClassName("field")[6 - j].className += " markedField";
					for (let markSteps = 0; markSteps < 4; markSteps++) {
						let markColumn = document.getElementsByClassName("column")[i + markSteps];
						let markFields = markColumn.getElementsByClassName("field")[6 - (j + markSteps)];
						markFields.className += " markedField";
					}
					break;
				}
			}
		}
	}
}

function checkTLBRdiagonals() {
	for (let i = 0; i < 4; i++) {
		for (let j = 6; j > 3; j--) {
			let currentCount = 1;
			let currentToken = matrix[i][j];
			for (let step = 1; step < 4; step++) {
				if (currentToken === matrix[i + step][j - step] && currentToken !== 0) {
					currentCount++;
				} else {
					break;
				}
				if (currentCount === 4) {
					winDiagonal = true;
					// mark winning fields
					// document.getElementsByClassName("column")[i].getElementsByClassName("field")[6 - j].className += " markedField";
					for (let markSteps = 0; markSteps < 4; markSteps++) {
						let markColumn = document.getElementsByClassName("column")[i + markSteps];
						let markFields = markColumn.getElementsByClassName("field")[6 - (j - markSteps)];
						markFields.className += " markedField";
					}
					break;
				}
			}
		}
	}
}

function checkDiagonals() {
	// four in a diagonal
	// bottom left to top right diagonals
	// idea: search from start points for these diagonals. start points are the fields in the bottom left 4*4 square
	checkBLTRdiagonals();
	// top left to bottom right diagonals
	// idea: search from start points for these diagonals. start points are the fields in the top left 4*4 square
	checkTLBRdiagonals();
}

function checkForWin() {
	checkRows();
	checkColumns();
	checkDiagonals();

	// the following if statement is super ugly and should not be seen by anyone who is not trying to fix it
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

checkForWin();
