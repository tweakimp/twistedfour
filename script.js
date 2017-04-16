// jshint esversion:6
// jshint browser: true
// jshint devel: true

var winRow = false;
var winColumn = false;
var winDiagonal = false;

// possible states a field can have. 0 for empty, 1 for player 1, 2 for player 2
//const fieldtoken = [0, 1, 2];

// start with 7x7 matrix
var board = new GameArea("randomized", "true");

// fill the matrix with what you chose at let entries

board.fillMatrix();

// apply gravity if let gravity = true
if (board.gravity) {
	board.applyGravity();
}

// convert javascript matrix into html matrix. note that we create columns from left to right and rows from bottom to top

board.drawMatrix();

// four in a row

board.checkForWin();
