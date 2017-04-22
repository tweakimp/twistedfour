/* jshint esversion: 6, browser: true, devel: true */
/* globals GameArea, twisted, fieldScore*/

function Player(id, identity) {
	this.name = name;
	this.identity = identity;
	this.id = id;

	this.getMove = function () {
		if (this.identity == "random") {
			return twisted.randomturn(); // return item from legalmoves
		}

		if (this.identity == "ai") {

			let futureMoves = [];
			/*
						// Matrix kopieren, um Spielzuege zu simulieren
						twisted.customMatrix = twisted.board.getMatrix()
							.map(function (arr) {
								return arr.slice();
							});
						*/
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

			return futureMoves[0][1]; // return item from legalmoves
		}

		if (this.identity == "human") {

		}
	};

}
