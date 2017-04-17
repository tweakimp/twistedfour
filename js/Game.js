// jshint esversion: 6
// jshint browser: true
// jshint devel: true

function Game(player1, player2, timelimit) {

	this.timelimit = timelimit; // time per move

	this.player1 = new Player("Bert", "ai");
	this.player2 = new Player("Ernie", "ai");

	this.randomturn = function () {
		return Math.floor(Math.random() * 2) + 1;
	};
	this.turnnumber = 1; // turnnumber > 49 -> draw
	this.board = new GameArea("start", "true");

	this.legalmoves = ["l", "r", 0, 1, 2, 3, 4, 5, 6]; // 1-7 spalten,  0 links drehen, 8 rechts drehen

	this.eventListener = 0; // gucken wer wo hin klickt mouse over spalte, bei click zug in der spalte
	this.time = 0;
	this.countdown = function () {
		this.time--;
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

		this.nextTurn();
	};

	this.nextTurn = function () {
		/*
		this.time = timelimit;
		        var timer = setInterval(function () {
		            this.time--;
		            // time limit reached, lose game
		            if (this.time === 0) {
		                if (this.whoseturn === 1) {} else {}
		            }
		        }, 1000);
		*/
		let move;
		let player;
		if (this.turnnumber % 2 === 1) {
			move = this.player1.getMove();
			player = 1;
		} else {
			move = this.player2.getMove();
			player = 2
		}

		this.history.push(move);
		this.board.makeMove(move, player);

		// check HERE for wins

		this.board.deleteMatrix();
		this.board.drawMatrix();

		// clearInterval(timer);

		this.turnnumber++;
		if (this.turnnumber === 20) {
			throw "mach ma schluss";
		}
		sleep(500)
			.then(() => {
				this.nextTurn();
			});

		// setTimeout(this.nextTurn(), 1000);
	}
};
// sleep time expects milliseconds
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
