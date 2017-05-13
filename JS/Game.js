/* globals GameArea, Player, twisted, fieldScore, winlistScore*/

function Game(player1, player2, timelimit) {
	this.board = new GameArea("start", true);
	this.player1 = new Player(1, player1);
	this.player2 = new Player(2, player2);
	this.compMoveTime = timelimit * 200;
	this.history = [];
	this.timelimit = timelimit; // time per move
	this.turnNumber = 1;
	this.getCurrentPlayer = function () {
		return (this.turnNumber % 2 === 1) ? this.player1 : this.player2;
	};

	this.getLegalMoves = function (matrix) {
		let allMoves = [0, 1, 2, 3, 4, 5, 6, "l", "r"];
		let moves = allMoves;
		let legalMatrix = matrix;
		for (let i = 0; i < 7; i++) {
			if (!(legalMatrix[i].includes(0))) {
				// define a function with input item to filter out all non-items
				moves = moves.filter(item => item !== i);
			}
			if (moves.length === allMoves.length - 7) {
				throw "BOARD IS FULL";
			}
		}
		return moves;
	};
	this.start = function () {
		twisted.board.fillMatrix(); // fill the javascript matrix as the start config says
		twisted.board.drawMatrix(); // draws the HTML matrix
		document.getElementsByClassName("statusArea")[0].innerHTML = "Game started!";
		winlistScore.draw(this.board.matrix); // fieldScore calculation
		this.beforeTurn(); // starts the loop of turns
	};
	this.beforeTurn = function () {
		let player = this.getCurrentPlayer(); // sets the token for the current player based on turnNumber
		player.getMove(); // make getMove lead to after turn
	};
	this.afterTurn = function (move) {
		let player = this.getCurrentPlayer(); // sets the token for the current player based on turnNumber

		// remove event listeners after human move
		if (player.identity === "human") {
			let left = document.getElementsByClassName("left");
			let right = document.getElementsByClassName("right");
			let column = document.getElementsByClassName("column");
			left[0].removeEventListener("click", this.turnL);
			right[0].removeEventListener("click", this.turnR);
			column[0].removeEventListener("click", this.turn0);
			column[1].removeEventListener("click", this.turn1);
			column[2].removeEventListener("click", this.turn2);
			column[3].removeEventListener("click", this.turn3);
			column[4].removeEventListener("click", this.turn4);
			column[5].removeEventListener("click", this.turn5);
			column[6].removeEventListener("click", this.turn6);
		}

		this.board.makeMove(move, player.id); // does the actual move
		twisted.history.push(`Player ${player.id} played move ${move}.`); // writes moves to the history array
		this.board.drawMatrix(); // draws the new board
		winlistScore.draw(this.board.matrix); // calculates the new fieldScore
		this.turnNumber++; // count turns	
		let possibleWinner = twisted.board.getWinner(); // checks for possible winner
		if (possibleWinner === 0) {
			// timeout if player is human
			if (this.getCurrentPlayer.identity !== "human") {
				setTimeout(function () {
					twisted.beforeTurn();
				}, this.compMoveTime);
			} else {
				twisted.beforeTurn();
			}
		}

	};
	// help
	this.turnL = function () {
		twisted.afterTurn("l");
	};

	this.turnR = function () {
		twisted.afterTurn("r");
	};

	this.turn0 = function () {
		twisted.afterTurn(0);
	};

	this.turn1 = function () {
		twisted.afterTurn(1);
	};

	this.turn2 = function () {
		twisted.afterTurn(2);
	};

	this.turn3 = function () {
		twisted.afterTurn(3);
	};

	this.turn4 = function () {
		twisted.afterTurn(4);
	};

	this.turn5 = function () {
		twisted.afterTurn(5);
	};

	this.turn6 = function () {
		twisted.afterTurn(6);
	};
	// start from here
	this.customStartMatrix = [
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 2, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0],
		[0, 0, 0, 2, 0, 0, 0],
		[0, 0, 2, 1, 1, 0, 0],
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
}
