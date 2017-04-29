/* jshint esversion: 6, browser: true, devel: true */
/* globals GameArea, twisted, fieldScore*/

function Player(id, identity) {
	this.name = name;
	this.identity = identity;
	this.id = id;
	this.getMove = function () {
		let move = -1;
		switch (this.identity) {
			case "random":
				let possible = twisted.getLegalMoves();
				move = possible[Math.floor(Math.random() * possible.length)];
				twisted.afterTurn(move);
				break;
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
				move = (this.id === 1) ? futureMoves[0][1] : futureMoves[futureMoves.length - 1][1];
				twisted.afterTurn(move);
				break;

			case "human":
				// its a trap				
				let left = document.getElementsByClassName("left");
				let right = document.getElementsByClassName("right");
				let column = document.getElementsByClassName("column");
				left[0].addEventListener("click", twisted.turnL);
				right[0].addEventListener("click", twisted.turnR);
				column[0].addEventListener("click", twisted.turn0);
				column[1].addEventListener("click", twisted.turn1);
				column[2].addEventListener("click", twisted.turn2);
				column[3].addEventListener("click", twisted.turn3);
				column[4].addEventListener("click", twisted.turn4);
				column[5].addEventListener("click", twisted.turn5);
				column[6].addEventListener("click", twisted.turn6);
				break;
		}
	};
}
