// jshint esversion: 6
// jshint browser: true
// jshint devel: true

function Game(player1, player2, timelimit) {

	this.timelimit = timelimit; // time per move
	this.player1 = function () {

		return new Player();
	};

	this.player2 = function () {

		return new Player();
	};

	this.turnnumber = 0; // turnnumber > 49 -> draw
	this.whoseturn = 1;
	this.board = new GameArea("start", "true");

	this.legalmoves = ["l", "r", 0, 1, 2, 3, 4, 5, 6]; // 1-7 spalten,  0 links drehen, 8 rechts drehen

	this.eventListener = 0; // gucken wer wo hin klickt mouse over spalte, bei click zug in der spalte
	this.time = 0;
	this.countdown = function () {
		time--;
		// time limit reached, lose game
		if (this.time === 0) {
			if (this.whoseturn === 1) {} else {}
		}

	};
	this.history = [];

	this.getLegalMoves = function () {
		return this.legalmoves;
	};

	this.start = function () {
		this.whoseturn = Math.ceil((Math.random() * 2));

		this.nextTurn();
	};

	this.nextTurn = function () {

		this.time = timelimit;
		let timer = setInterval(this.countdown(), 1000);

		if (whoseturn == 1) {
			player1.getMove();
		} else {
			player2.getMove();
		}

		GameArea.makeMove(move, whoseturn);

		// listen for mouse click > if click on m happens, make move
		// redraw board
		// check for wins
		// nun next turn 

	};

}
