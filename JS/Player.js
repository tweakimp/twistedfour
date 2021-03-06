/* globals twisted, singleMove, deepMove */
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
				singleMove(this.id);
				break;
			case "deepAi":
				let depth = 3;
				let timeStopBefore = performance.now();
				deepMove(this.id, depth);
				let timeStopAfter = performance.now();
				console.log("Calculation of deepMove  with depth " + depth + " took " + (timeStopAfter - timeStopBefore) + " milliseconds.");
				break;
			case "human":
				legal = twisted.getLegalMoves(twisted.board.matrix);
				if (legal.includes("L")) {
					let left = document.getElementsByClassName("left");
					left[0].addEventListener("click", twisted.turnL);
				}
				if (legal.includes("R")) {
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
