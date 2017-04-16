// jshint esversion: 6
// jshint browser: true
// jshint devel: true

function Game(player1, player2, timelimit) {
	this.timelimit = timelimit; // time per move
	this.player1 =
		if (player1 === "ai") { // toggle ai and human
			return new SuperAI();
		}
	this.player2 =
		if (player2 !== "ai") { // toggle ai and human
			return new Human();
		}

	this.turnnumber = 0; // turnnumber > 49 -> draw
	this.whoseturn;

	this.legalmoves = []; // 1-7 spalten,  0 links drehen, 8 rechts drehen

	this.eventListener; // gucken wer wo hin klickt mouse over spalte, bei click zug in der spalte
	this.countdown = function (timelimit) {
		this.timelimit = timelimit;
		timelimit--;
		if
	}
	this.history: [
		[1, 2],
		[1, 2],
		[2, 3],
		[2, 1],
	]
	this.start = function () {

		// wuerfel who anfaengt
		// run nextturn

	};

	this.nextTurn = function () {
		setInterval(countdown(), 1000);

		// wessen turn
		// player X getMove

	}
};

}
