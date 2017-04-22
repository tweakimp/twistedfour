/* jshint esversion: 6, browser: true, devel: true */
/* globals Game, document */

/*
create 7x7 matrix, fill with x, apply gravity?
switch to "coordinates", "randomized", "custom", "start"
- coordinates makes the the fields show their coordinates
- randomized creates a random 0,1,2 distribution;
- custom you can setup a custom grid via customMatrix
- start to fill matrix with zeroes
*/

let player1;
let player2;
let timelimit;
let twisted;

function startGame() {
	let checkPlayer1 = document.getElementsByName("startPlayer1");
	let checkPlayer2 = document.getElementsByName("startPlayer2");
	let timelimit = document.getElementsByName("timelimit")[0].value;

	for (let i = 0; i < 3; i++) {
		if (checkPlayer1[i].checked === true) {
			player1 = checkPlayer1[i].value;
		}
		if (checkPlayer2[i].checked === true) {
			player2 = checkPlayer2[i].value;
		}
	}
	twisted = new Game(player1, player2, timelimit);
	twisted.start();
}
