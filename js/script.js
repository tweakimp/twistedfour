// jshint esversion:6
// jshint browser: true
// jshint devel: true

/*
create 7x7 matrix, fill with x, apply gravity?
switch to "coordinates", "randomized", "custom", "start"
- coordinates makes the the fields show their coordinates
- randomized creates a random 0,1,2 distribution;
- custom you can setup a custom grid via customMatrix
- start to fill matrix with zeroes
*/

var twisted = new Game("ai", "ai", 60);
twisted.start();

// fill the matrix with what you chose at let entries
twisted.board.fillMatrix();

// apply gravity if let gravity = true
if (board.gravity) {
	board.applyGravity();
}

// convert javascript matrix into html matrix. note that we create columns from left to right and rows from bottom to top

board.drawMatrix();

// four in a row
let winner = board.getWinner();
if (winner !== 0) {
	document.getElementsByClassName("statusArea")[0].innerHTML = `Player ${winner} wins!`;
}
