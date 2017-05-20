/* globals twisted */
/* exported GameArea */

function GameArea(mode, gravity) {
	let gameArea = document.getElementsByClassName("gameArea")[0];
	this.matrix = Array(7)
		.fill(null)
		.map(() => Array(7)
			.fill(0));
	this.getMatrix = function () {
		return this.matrix;
	};

	this.gravity = gravity;
	this.fieldtoken = [0, 1, 2];
	this.mode = mode;
	this.winner = 0;

	// applies the CUSTOM CODED MATRIX on the matrix the game uses, the custom matrix is resorted in a way
	// so that the columns you see here are also the columns you will see in the browser
	this.fillCustomStart = function (customMatrix) {

		for (let i = 6; i > -1; i--) {
			for (let j = 6; j > -1; j--) {
				this.matrix[i][j] = customMatrix[6 - j][i];
			}
		}
	};

	// applies the custom matrix FROM ANOTHER GAME MATRIX on the matrix the game uses
	this.fillCustom = function (customMatrix) {

		for (let i = 0; i < 7; i++) {
			for (let j = 0; j < 7; j++) {
				this.matrix[i][j] = customMatrix[i][j];
			}
		}
	};
	// fill the matrix with what you chose at "mode"
	this.fillMatrix = function () {
		for (let i = 6; i > -1; i--) {
			for (let j = 6; j > -1; j--) {
				switch (this.mode) {
					case "coordinates":
						this.matrix[i][j] = `column ${i}<br>row ${j}`;
						break;
					case "randomized": // fill with random entries
						this.matrix[i][j] = this.fieldtoken[Math.floor(Math.random() * this.fieldtoken.length)];
						break;
					case "custom":
						this.fillCustom(twisted.customMatrix);
						break;
					case "customStart":
						this.fillCustomStart(twisted.customStartMatrix);
						break;
					case "start": // normal game, leave zeros
						break;
					default: // fill with random entries
						this.matrix[i][j] = this.fieldtoken[Math.floor(Math.random() * this.fieldtoken.length)];
						break;
				}
			}
		}
	};

	this.drawMatrix = function () {
		//delete first, then redraw
		this.deleteMatrix();
		for (let i = 0; i < 7; i++) {
			let column = document.createElement("div");
			column.className = "column";
			gameArea.appendChild(column);
			column.id = i;

			for (let j = 6; j > -1; j--) {

				// create fields
				let field = document.createElement("div");
				field.className = "field";
				field.id = i + "/" + j;

				// assign css classes to use player color
				field.className += (this.matrix[i][j] === 1) ? " player1" : (this.matrix[i][j] === 2) ? " player2" : "";
				column.appendChild(field);
			}
		}
	};

	this.applyGravity = function (matrix) {
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
	};
	this.deleteMatrix = function () {
		while (gameArea.firstChild) {
			gameArea.removeChild(gameArea.firstChild);
		}
	};

	let winRow = false;
	let winColumn = false;
	let winDiagonal = false;

	// Check functions for different win conditions.
	// 1. Check four-in-a-row
	this.checkRows = function () {

		// loop through all colums
		for (let j = 0; j < 7; j++) {
			let currentCount = 0; // how many tokens do we have in a row already?
			let currentToken = this.matrix[0][j]; // what are we searching for at the moment

			// loop through all rows
			for (let i = 0; i < 7; i++) {
				if (currentToken === this.matrix[i][j] && (currentToken === 1 || currentToken === 2)) {
					currentCount++;

					// when four in a row -> mark fields for "winner"
					if (currentCount === 4) {
						winRow = true;
						this.winner = currentToken;
						for (let markSteps = 0; markSteps < currentCount; markSteps++) {
							let markColumn = document.getElementsByClassName("column")[i - markSteps];
							let markFields = markColumn.getElementsByClassName("field")[6 - j];
							markFields.className = (currentToken === 1) ? "field player1 winField1" : "field player2 winField2";
						}
					}
				} else {
					currentToken = this.matrix[i][j];
					currentCount = 1;
				}
			}
		}
	};

	this.checkColumns = function () {
		for (let i = 0; i < 7; i++) {
			let currentCount = 0;
			let currentToken = this.matrix[i][0];
			for (let j = 0; j < 7; j++) {
				if (currentToken === this.matrix[i][j] && (currentToken === 1 || currentToken === 2)) {
					currentCount++;
					if (currentCount === 4) {
						winColumn = true;
						this.winner = currentToken;
						for (let markSteps = 0; markSteps < 4; markSteps++) {
							let markColumn = document.getElementsByClassName("column")[i];
							let markFields = markColumn.getElementsByClassName("field")[6 - (j - markSteps)];
							markFields.className = (currentToken === 1) ? "field player1 winField1" : "field player2 winField2";
						}
						break;
					}
				} else {
					currentToken = this.matrix[i][j];
					currentCount = 1;
				}
			}
		}
	};
	this.checkBLTRdiagonals = function () {
		for (let j = 0; j < 4; j++) {
			for (let i = 0; i < 4; i++) {
				let currentCount = 1;
				let currentToken = this.matrix[i][j];
				for (let step = 1; step < 4; step++) {
					if (currentToken === this.matrix[i + step][j + step] && (currentToken === 1 || currentToken === 2)) {
						currentCount++;
					} else {
						break;
					}
					if (currentCount === 4) {
						winDiagonal = true;
						this.winner = currentToken;
						// mark winning fields
						for (let markSteps = 0; markSteps < 4; markSteps++) {
							let markColumn = document.getElementsByClassName("column")[i + markSteps];
							let markFields = markColumn.getElementsByClassName("field")[6 - (j + markSteps)];
							markFields.className = (currentToken === 1) ? "field player1 winField1" : "field player2 winField2";
						}
						break;
					}
				}
			}
		}
	};
	this.checkTLBRdiagonals = function () {
		for (let i = 0; i < 4; i++) {
			for (let j = 6; j > 2; j--) {
				let currentCount = 1;
				let currentToken = this.matrix[i][j];
				for (let step = 1; step < 4; step++) {
					if (currentToken === this.matrix[i + step][j - step] && (currentToken === 1 || currentToken === 2)) {
						currentCount++;
					} else {
						break;
					}
					if (currentCount === 4) {
						winDiagonal = true;
						this.winner = currentToken;
						// mark winning fields
						// document.getElementsByClassName("column")[i].getElementsByClassName("field")[6 - j].className += " markedField";
						for (let markSteps = 0; markSteps < 4; markSteps++) {
							let markColumn = document.getElementsByClassName("column")[i + markSteps];
							let markFields = markColumn.getElementsByClassName("field")[6 - (j - markSteps)];
							markFields.className = (currentToken === 1) ? "field player1 winField1" : "field player2 winField2";
						}
						break;
					}
				}
			}
		}
	};
	this.checkDiagonals = function () {
		// four in a diagonal
		// bottom left to top right diagonals
		// idea: search from start points for these diagonals. start points are the fields in the bottom left 4*4 square
		this.checkBLTRdiagonals();
		// top left to bottom right diagonals
		// idea: search from start points for these diagonals. start points are the fields in the top left 4*4 square
		this.checkTLBRdiagonals();
	};

	this.checkForWin = function () {
		this.checkRows();
		this.checkColumns();
		this.checkDiagonals();

		let statusArea = document.getElementsByClassName("statusArea")[0];

		// the following if statement is super ugly and should not be seen by anyone who is not trying to fix it
		if (winRow || winColumn || winDiagonal) {
			if (winRow && !winColumn && !winDiagonal) {
				statusArea.innerHTML = "WIN BY ROW";
			}
			if (!winRow && winColumn && !winDiagonal) {
				statusArea.innerHTML = "WIN BY COLUMN";
			}
			if (!winRow && !winColumn && winDiagonal) {
				statusArea.innerHTML = "WIN BY DIAGONAL";
			}
			if (winRow && winColumn && !winDiagonal) {
				statusArea.innerHTML = "WIN BY ROW AND COLUMN";
			}
			if (winRow && !winColumn && winDiagonal) {
				statusArea.innerHTML = "WIN BY ROW AND DIAGONAL";
			}
			if (!winRow && winColumn && winDiagonal) {
				statusArea.innerHTML = "WIN BY COLUMN AND DIAGONAL";
			}
			if (winRow && winColumn && winDiagonal) {
				statusArea.innerHTML = "WIN BY ROW, COLUMN AND DIAGONAL";
			}
			statusArea.innerHTML += (this.winner === 1) ? " FOR PLAYER 1" : " FOR PLAYER 2";
		}
	};
	this.getWinner = function () {
		// four in a row
		this.checkForWin();
		return this.winner;
	};

	// move = "l" for left turn, move = [0,...,6] for the 7 columns,move = "r" for right turn
	// "player" is player number
	this.makeMove = function (move, player) {
		let test = twisted.getLegalMoves(twisted.board.getMatrix());
		if (test.indexOf(move) === -1) {
			throw `Move is not allowed, chosen column ${move} is full.`;
		} else if (move === "L") {
			this.matrix = this.rotateLeft(this.matrix);
			this.applyGravity(this.matrix);
		} else if (move === "R") {
			this.matrix = this.rotateRight(this.matrix);
			this.applyGravity(this.matrix);
		} else {
			// put token into column
			let targetField = this.matrix[move].indexOf(0);
			this.matrix[move].splice(targetField, 1, player);
		}
		return this.matrix;
	};

	// move = "l" for left turn, move = [0,...,6] for the 7 columns,move = "r" for right turn
	// "player" is player number
	this.makePreMove = function (move, player) {
		/*let test = twisted.getLegalMoves(twisted.customMatrix);
		if (test.indexOf(move) === -1) {
			throw `Move is not allowed, chosen column ${move} is full.`;
		} else */
		if (move === "L") {
			this.matrix = this.rotateLeft(this.matrix);
			this.applyGravity(this.matrix);
		} else if (move === "R") {
			this.matrix = this.rotateRight(this.matrix);
			this.applyGravity(this.matrix);
		} else {
			// put token into column
			let targetField = this.matrix[move].indexOf(0);
			this.matrix[move].splice(targetField, 1, player);
		}
		return this.matrix;
	};
	// help functions
	this.rotateRight = function (matrix) {
		matrix = this.transpose(matrix);
		matrix.map(function (array) {
			array.reverse();
		});
		return matrix;
	};

	this.rotateLeft = function (matrix) {
		let result = this.createEmptyMatrix(matrix.length);
		matrix = this.transpose(matrix);
		let counter = 0;
		for (let i = matrix.length - 1; i >= 0; i--) {
			result[counter] = matrix[i];
			counter++;
		}
		return result;
	};

	this.transpose = function (matrix) {
		let result = this.createEmptyMatrix(matrix.length);
		for (let i = 0; i < matrix.length; i++) {
			for (let j = 0; j < matrix[i].length; j++) {
				let temp = matrix[i][j];
				result[j][i] = temp;
			}
		}
		return result;
	};
	// Create empty matrix
	this.createEmptyMatrix = function (length) {
		let result = [];
		for (let i = 0; i < length; i++) {
			result.push([]);
		}
		return result;
	};
}
