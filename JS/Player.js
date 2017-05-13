/* globals twisted, aiMethodsMove */
/* exported Player */
function Player(id, identity) {
	this.name = name;
	this.identity = identity;
	this.id = id;
	this.getMove = function () {
		let move = -1;
		let legal = [];
		switch (this.identity) {
			case "random":
				legal = twisted.getLegalMoves(twisted.board.matrix);
				move = legal[Math.floor(Math.random() * legal.length)];
				twisted.afterTurn(move);
				break;
			case "ai":
				// deepWinList(twisted.board.matrix, this.id, 1);
				aiMethodsMove(this.id);
				break;
			case "human":
				legal = twisted.getLegalMoves(twisted.board.matrix);
				if (legal.includes("l")) {
					let left = document.getElementsByClassName("left");
					left[0].addEventListener("click", twisted.turnL);
				}
				if (legal.includes("r")) {
					let right = document.getElementsByClassName("right");
					right[0].addEventListener("click", twisted.turnR);
				}
				if (legal.includes(0)) {
					let column = document.getElementsByClassName("column");
					column[0].addEventListener("click", twisted.turn0);
				}
				if (legal.includes(1)) {
					let column = document.getElementsByClassName("column");
					column[1].addEventListener("click", twisted.turn1);
				}
				if (legal.includes(2)) {
					let column = document.getElementsByClassName("column");
					column[2].addEventListener("click", twisted.turn2);
				}
				if (legal.includes(3)) {
					let column = document.getElementsByClassName("column");
					column[3].addEventListener("click", twisted.turn3);
				}
				if (legal.includes(4)) {
					let column = document.getElementsByClassName("column");
					column[4].addEventListener("click", twisted.turn4);
				}
				if (legal.includes(5)) {
					let column = document.getElementsByClassName("column");
					column[5].addEventListener("click", twisted.turn5);
				}
				if (legal.includes(6)) {
					let column = document.getElementsByClassName("column");
					column[6].addEventListener("click", twisted.turn6);
				}

				break;
		}
	};
}
