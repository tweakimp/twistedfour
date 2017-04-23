/* jshint esversion: 6, browser: true, devel: true */
/* globals GameArea, twisted, fieldScore*/

function Player(id, identity) {
	this.name = name;
	this.identity = identity;
	this.id = id;

	this.getMove = function () {
		switch (this.identity) {
			case "random":
				let possible = this.getLegalMoves();
				let move = possible[Math.floor(Math.random() * possible.length)];
				return move;
			case "ai":
				let futureMoves = [];
				for (let i = 0; i < 7; i++) {
					for (let j = 0; j < 7; j++) {
						twisted.customMatrix[i][j] = twisted.board.getMatrix()[i][j];
					}
				}
				let legal = twisted.getLegalMoves();
				// for all legal moves, generate a new matrix
				// and get its gameScore   
				for (let i = 0; i < legal.length; i++) {

					let currentMove = legal[i];
					let simulatedArea = new GameArea("custom", true);
					simulatedArea.fillMatrix();
					simulatedArea.makeMove(currentMove, this.id);

					let score = fieldScore.get(simulatedArea.getMatrix(), this.id);
					futureMoves.push([score, currentMove]);
				}
				futureMoves.sort(function (a, b) {
					if (a[0] === b[0]) {
						return 0;
					} else {
						return (a[0] > b[0]) ? -1 : 1;
					}
				});
				return this.id === 1 ? futureMoves[0][1] : futureMoves[futureMoves.length - 1][1];
			case "human":

				// array of legal moves, eg.[0,1,3,5,6]
				let legalMoves = twisted.getLegalMoves();

				// initialization with -1 to check if it changes
				let humanMove = -1;

				//column nodes
				let node = document.getElementsByClassName("column");

				// my try of getting at least the first column to work
				node[0].addEventListener("click", function () {
					humanMove = 0;
				});
				/* pseudo code:
				while(humanmove===-1){
				wait here until one event listener fires
				}
				*/
				// returns -1 every time :'(

				return humanMove;

		}

	};
}
