// jshint esversion: 6, browser: true, devel: true
const fieldScore = [
	[3, 4, 5, 7, 5, 4, 3],
	[4, 6, 8, 10, 8, 6, 4],
	[5, 8, 11, 13, 11, 6, 5],
	[7, 10, 13, 16, 13, 10, 7],
	[5, 8, 11, 13, 11, 6, 5],
	[4, 6, 8, 10, 8, 6, 4],
	[3, 4, 5, 7, 5, 4, 3],
];

var customMatrix = [
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 2, 0, 0, 0],
	[2, 2, 2, 2, 2, 2, 2],
];

function gameScore(matrix) {
	//calculate player1
	let player1score = 0;
	for (let i = 0; i < 7; i++) {
		for (let j = 0; j < 7; j++) {
			if (matrix[i][j] === 1) {
				player1score += fieldScore[i][j];
			}
		}
	}
	//calculate player 2
	let player2score = 0;
	for (let i = 0; i < 7; i++) {
		for (let j = 0; j < 7; j++) {
			if (matrix[i][j] === 2) {
				player2score += fieldScore[i][j];
			}
		}
	}

	let score = player1score - player2score;
	console.log(score);
	return score;
}

/*
n for how many OWN moves ahead the score should be calculated.
p for which players turn it is. score will be maxed for this player
returns and array of length n with the moves that will be made so that
p maxes while the other player minimizes the score
*/
function scoreAhead(matrix, n, p) {}
