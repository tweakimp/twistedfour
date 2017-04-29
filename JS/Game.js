/* jshint esversion: 6, browser: true, devel: true */
/* globals GameArea, Player, twisted, fieldScore*/

function Game(player1, player2, timelimit) {
	this.board = new GameArea("customStart", true);
	this.player1 = new Player(1, player1);
	this.player2 = new Player(2, player2);
	this.compMoveTime = timelimit * 200;
	this.getCurrentPlayer = function () {
		return (this.turnNumber % 2 === 1) ? this.player1 : this.player2;
	};
	this.timelimit = timelimit; // time per move
	this.turnNumber = 1;
	this.getLegalMoves = function () {
		const allMoves = ["l", "r", 0, 1, 2, 3, 4, 5, 6];
		let moves = allMoves;
		let matrix = twisted.board.getMatrix();
		for (let i = 0; i < 7; i++) {
			if (!(matrix[i].includes(0))) {
				moves = moves.filter(item => item !== i);
			}
		}
		if (moves.length === allMoves.length - 7) {
			throw "BOARD IS FULL";
		}
		return moves;
	};

	this.time = 0;
	this.countdown = function () {
		this.time--;
		// time limit reached, lose game
		if (this.time === 0) {
			if (this.whoseturn === 1) {} else {}
		}

	};
	this.history = [];

	this.start = function () {
		twisted.board.fillMatrix(); // fill the javascript matrix as the start config says
		twisted.board.drawMatrix(); // draws the HTML matrix
		fieldScore.draw(this.board.matrix); // starts the fieldScore calculation
		this.beforeTurn(); // starts the loop of turns
	};

	// start from here
	this.customStartMatrix = [
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
	];

	// play ahead from here
	this.customMatrix = [
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
	];

	this.beforeTurn = function () {
		let player = this.getCurrentPlayer(); // sets the token for the current player based on turnNumber
		player.getMove(); // make getMove lead to after turn
	};
	this.afterTurn = function (move) {
		let player = this.getCurrentPlayer(); // sets the token for the current player based on turnNumber
		if (player.identity === "human") {
			let left = document.getElementsByClassName("left");
			let right = document.getElementsByClassName("right");
			let column = document.getElementsByClassName("column");
			left[0].removeEventListener("click", turnL);
			right[0].removeEventListener("click", turnR);
			column[0].removeEventListener("click", turn0);
			column[1].removeEventListener("click", turn1);
			column[2].removeEventListener("click", turn2);
			column[3].removeEventListener("click", turn3);
			column[4].removeEventListener("click", turn4);
			column[5].removeEventListener("click", turn5);
			column[6].removeEventListener("click", turn6);

		}
		this.turnNumber++; // count turns		 
		this.board.makeMove(move, player.id); // does the actual move
		this.board.drawMatrix(); // draws the new board
		fieldScore.draw(this.board.matrix); // calculates the new fieldScore
		let possibleWinner = twisted.board.getWinner(); // checks for possible winner
		if (possibleWinner === 0) {
			if (player.identity !== "human") {
				setTimeout(function () {
					twisted.beforeTurn();
				}, this.compMoveTime);
			} else {
				twisted.beforeTurn();
			}
		} else {
			let column = document.getElementsByClassName("column");
			let left = document.getElementsByClassName("left");
			let right = document.getElementsByClassName("right");
			for (let i = 8; i > -1; i--) {
				if (i === 8) {
					right[0].removeEventListener("click", function () {
						twisted.afterTurn("r");

					});

				} else if (i === 7) {
					left[0].removeEventListener("click", function () {
						twisted.afterTurn("l");

					});

				} else if (i < 7) {
					column[i].removeEventListener("click", function () {
						twisted.afterTurn(i);

					});
				}

			}
		}

	};
}
