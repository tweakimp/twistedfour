/* jshint esversion: 6, browser: true, devel: true */
/* globals GameArea, twisted*/

function Player(id, identity) {
	this.name = name;
	this.identity = identity;
	this.id = id;

	this.getMove = function () {
		if (this.identity == "random") {
			return twisted.randomturn(); // return item from legalmoves
		}

		if (this.identity == "ai") {

			let future_moves = [];

			// Matrix kopieren, um Spielzuege zu simulieren
			let customMatrix = twisted.board.getMatrix()
				.map(function (arr) {
					return arr.slice();
				});

			let legal = twisted.getLegalMoves();
			// for all legal moves, generate a new matrix
			// and get its gameScore   
			for (let i = 0; i < legal.length; i++) {
				let current_move = legal[i];

				let simulated_Area = new GameArea("custom", true);

				simulated_Area.makeMove(current_move, this.id);

				let score = gameScore(simulated_Area.getMatrix(), this.id);
				future_moves.push([score, current_move]);
			}

			future_moves.sort(function (a, b) {
				if (a[0] === b[0]) {
					return 0;
				} else {
					return (a[0] > b[0]) ? -1 : 1;
				}
			});

			return future_moves[0][1]; // return item from legalmoves
		}

		if (this.identity == "human") {
			let move = void(0);

			function move0() {
				move = 0;
			}
			let columns = document.getElementsByClassName("column");
			columns[0].addEventListener("click", move0);

			/*
			pseudo:
			while move = void, wait.
			*/

			return move;

		}
	};

	const fieldScore = [
		[3, 4, 5, 7, 5, 4, 3],
		[4, 6, 8, 10, 8, 6, 4],
		[5, 8, 11, 13, 11, 8, 5],
		[7, 10, 13, 16, 13, 10, 7],
		[5, 8, 11, 13, 11, 8, 5],
		[4, 6, 8, 10, 8, 6, 4],
		[3, 4, 5, 7, 5, 4, 3],
	];

	// GAME SCORE METHODS
	function gameScore(matrix, id) {
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
		/*
		if (id === 1) return player1score - player2score;
		else return player2score - player1score;
		*/
		let score = (id === 1) ? player1score - player2score : player2score - player1score;

		console.log(score);
		return score;
	}
}
