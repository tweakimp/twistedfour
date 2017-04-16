// jshint esversion: 6
// jshint browser: true
// jshint devel: true

function GameArea(mode, gravity) {
	this.matrix = Array(7)
		.fill(null)
		.map(() => Array(7)
			.fill(0));

	this.gravity = gravity;
	this.fieldtoken = [0, 1, 2];
	this.mode = mode;

	this.drawMatrix = function () {
		const gameArea = document.getElementsByClassName("gameArea")[0];

		for (let i = 0; i < 7; i++) {

			let column = document.createElement("div");
			column.className = "column";
			gameArea.appendChild(column);
			for (let j = 6; j > -1; j--) {
				// create fields
				let field = document.createElement("div");
				field.className = "field";
				let textfield = document.createElement("div");
				textfield.className = "textfield";
				textfield.innerHTML = this.matrix[i][j];
				column.appendChild(field);
				field.appendChild(textfield);
			}
		}
	};

	// fill the matrix with what you chose at let entries
	this.fillMatrix = function () {
		for (let i = 6; i > -1; i--) {
			for (let j = 6; j > -1; j--) {
				switch (this.mode) {
					case "coordinates":
						this.matrix[i][j] = "column $(i) <br>row $(j)";
						break;
					case "randomized": // fill with random entries
						this.matrix[i][j] = this.fieldtoken[Math.floor(Math.random() * this.fieldtoken.length)];
						break;
					case "custom":
						this.fillCustomMatrix();
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

	// applies the custom matrix on the matrix the game uses
	this.fillCustomMatrix = function () {
		// the custom matrix is applied in a way so that the columns you see here are also the columns you will see in the browser
		const customMatrix = [
			[0, 0, 0, 0, 0, 0, 2],
			[0, 0, 0, 0, 0, 0, 2],
			[1, 0, 0, 0, 0, 0, 2],
			[1, 0, 0, 0, 0, 0, 2],
			[1, 0, 0, 0, 0, 0, 2],
			[1, 0, 0, 0, 0, 0, 1],
			[1, 0, 2, 2, 2, 2, 2],
		];

		for (let i = 6; i > -1; i--) {
			for (let j = 6; j > -1; j--) {
				this.matrix[i][j] = customMatrix[6 - j][i];
			}
		}
	};
	this.applyGravity = function () {

		for (let i = 0; i < 7; i++) {
			// find zeroes and write their index to array
			let zeroes = [];

			for (let j = 0; j < 7; j++) {
				if (this.matrix[i][j] === 0) {
					zeroes.push(j);
				}
			}
			// splice zeroes from columns and push them to the end
			for (let z = 0; z < zeroes.length; z++) {
				// zeroes[z] needs -z so the focus stays on the right array item. saved indices need to be adjusted beucase we splice while reading them.
				this.matrix[i].splice(zeroes[z] - z, 1);
				this.matrix[i].push(0);
			}
		}
	};

	// Check functions for different win conditions.
	// 1. Check four-in-a-row
	this.checkRows = function () {

		// loop through all colums
		for (let j = 0; j < 7; j++) {
			let currentCount = 0; // how many tokens do we have in a row already?
			let currentToken = this.matrix[0][j]; // what are we searching for at the moment

			// loop through all rows
			for (let i = 0; i < 7; i++) {
				if (currentToken === this.matrix[i][j] && currentToken !== 0) {
					currentCount++;

					// when four in a row -> mark fields for "winner"
					if (currentCount === 4) {
						winRow = true;
						for (let markSteps = 0; markSteps < currentCount; markSteps++) {
							let markColumn = document.getElementsByClassName("column")[i - markSteps];
							let markFields = markColumn.getElementsByClassName("field")[6 - j];
							markFields.className = "field markedField";
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
				if (currentToken === this.matrix[i][j] && currentToken !== 0) {
					currentCount++;
					if (currentCount === 4) {
						winColumn = true;
						for (let markSteps = 0; markSteps < 4; markSteps++) {
							let markColumn = document.getElementsByClassName("column")[i];
							let markFields = markColumn.getElementsByClassName("field")[6 - (j - markSteps)];
							markFields.className = "field markedField";
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
					if (currentToken === this.matrix[i + step][j + step] && currentToken !== 0) {
						currentCount++;
					} else {
						break;
					}
					if (currentCount === 4) {
						winDiagonal = true;
						// mark winning fields
						for (let markSteps = 0; markSteps < 4; markSteps++) {
							let markColumn = document.getElementsByClassName("column")[i + markSteps];
							let markFields = markColumn.getElementsByClassName("field")[6 - (j + markSteps)];
							markFields.className = "field markedField";
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
					if (currentToken === this.matrix[i + step][j - step] && currentToken !== 0) {
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
							markFields.className = "field markedField";
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
	};

}

// Game over
