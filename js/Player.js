// jshint esversion: 6
// jshint browser: true
// jshint devel: true

function Player(name, identity) {
	this.name = name;
	this.identity = identity;

	this.getMove = function () {
		if (this.identity == "human") {
			this.x = 0;
			this.y = 0;
			return; // return item from legalmoves
		}

		if (this.identity == "ai") {
			let legal = twisted.getLegalMoves();
			let move = legal[Math.floor(Math.random() * legal.length)];

			return move; // return item from legalmoves
		}

	};
}
