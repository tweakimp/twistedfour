/* jshint esversion: 6, browser: true, devel: true */
/* globals twisted, GameArea, winlistScore*/
let legal;
let move;
let futureMoves = [];
for (let i = 0; i < 7; i++) {
	for (let j = 0; j < 7; j++) {
		twisted.customMatrix[i][j] = twisted.board.getMatrix()[i][j];
	}
}
legal = twisted.getLegalMoves();
// for all legal moves, generate a new matrix
// and get its gameScore   
for (let i = 0; i < legal.length; i++) {

	let currentMove = legal[i];
	let simulatedArea = new GameArea("custom", true);
	simulatedArea.fillMatrix();
	simulatedArea.makeMove(currentMove, this.id);

	let score = winlistScore.get(simulatedArea.getMatrix(), this.id);
	futureMoves.push([score, currentMove]);
}
futureMoves.sort(function (a, b) {
	if (a[0] === b[0]) {
		return 0;
	} else {
		return (a[0] > b[0]) ? -1 : 1;
	}
});
//move = (this.id === 1) ? futureMoves[0][1] : futureMoves[futureMoves.length - 1][1];
move = futureMoves[0][1];
twisted.afterTurn(move);
