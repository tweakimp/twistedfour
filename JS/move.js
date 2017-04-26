/* jshint esversion: 6, browser: true, devel: true */

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
function createEmptyMatrix(length) {
	let result = [];
	for (let i = 0; i < length; i++) {
		result.push([]);
	}
	return result;
}

function applyGravity(matrix) {

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

const customSetup = [
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 0, 0, 0],
	[1, 2, 2, 2, 2, 2, 2],
];
const start = [
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
];
// transform matrix from js view to html view
let customMatrix = [];

function transform() {

	customMatrix = rotateRight(customSetup);
}
transform();

function humanMove() {

}
