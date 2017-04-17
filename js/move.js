// jshint esversion: 6
// jshint browser: true
// jshint devel: true

// n = "l" for left turn, n = [0,...,6] for the 7 columns,n = "r" for right turn
// p is player number
function makeMove(matrix, n, p) {
	// transform matrix from js view to html view
	matrix = rotateRight(matrix);
	// check possible moves first
	let possibleMoves = ["l", "r"]; //twisting is always possible
	// check if column has a free spot and note column in possibleMoves in that case
	for (let i = 6; i > -1; i--) {
		if (matrix[i].includes(0)) {
			possibleMoves.unshift(i); //
		}
	}
	// break if move is not allowed. maybe learn how to throw error here?
	if (!(possibleMoves.includes(n))) {
		throw "Move is not allowed, chosen column is full.";
	} else if (n !== "l" && n !== "r") {
		// do the actual move
		let targetField = matrix[n].indexOf(0);
		matrix[n].splice(targetField, 1, p);

		return matrix;
	} else if (n == "l") {
		// do left turn
		matrix = rotateLeft(matrix);
		//apply gravity

		// GRAVITY MISSING
	} else if (n == "r") {
		// do right turn
		matrix = rotateRight(matrix);
		//apply gravity;
		// GRAVITY MISSING
	}
	return matrix;

}

// help functions
function rotateRight(matrix) {
	matrix = transpose(matrix);
	matrix.map(function (array) {
		array.reverse();
	});
	return matrix;
}

function rotateLeft(matrix) {
	let result = createEmptyMatrix(matrix.length);
	matrix = transpose(matrix);
	let counter = 0;
	for (let i = matrix.length - 1; i >= 0; i--) {
		result[counter] = matrix[i];
		counter++;
	}
	return result;
}

function transpose(matrix) {
	let len = matrix.length;
	let result = createEmptyMatrix(len);
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			let temp = matrix[i][j];
			result[j][i] = temp;
		}
	}
	return result;
}
// Create empty matrix
function createEmptyMatrix(len) {
	let result = [];
	for (let i = 0; i < len; i++) {
		result.push([]);
	}
	return result;
}
