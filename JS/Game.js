/* jshint esversion: 6, browser: true, devel: true */
/* globals GameArea, Player, twisted, fieldScore*/

function Game(player1, player2, timelimit) {
	this.timelimit = timelimit; // time per move
	this.board = new GameArea("customStart", true);
	this.player1 = new Player(1, player1);
	this.player2 = new Player(2, player2);

	this.randomturn = function () {
		let possible = this.getLegalMoves();
		let move = possible[Math.floor(Math.random() * possible.length)];
		return move;
	};
	this.turnnumber = 1;

	this.getLegalMoves = function () {
		const allMoves = [ /*"l", "r", */ 0, 1, 2, 3, 4, 5, 6];
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
		twisted.board.fillMatrix();
		twisted.board.drawMatrix();
		this.nextTurn();
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

	// plan ahead from here
	this.customMatrix = [
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
	];

	this.nextTurn = function () {

		let move;
		let player;

		if (this.turnnumber % 2 === 1) {
			move = this.player1.getMove();
			player = 1;
		} else {
			move = this.player2.getMove();
			player = 2;
		}

		this.history.push(move);
		this.board.makeMove(move, player);

		// check HERE for wins

		let possibleWinner = twisted.board.getWinner();

		this.board.drawMatrix();

		fieldScore.draw(this.board.matrix);

		this.turnnumber++;

		if (possibleWinner === 0) {
			setTimeout(function () {
				twisted.nextTurn();
			}, 450);
		}
	};
}
