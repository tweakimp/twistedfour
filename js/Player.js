// jshint esversion: 6
// jshint browser: true
// jshint devel: true

function Player(name, identitiy) {
	this.name = name;
	this.identitiy = identitiy;

	this.getMove() {
		if (identitiy == "human") {
			this.x = mousexcoord;
			this.y = mouseycoord;
			return; // return item from legalmoves
		}

		if (identitiy == "ai") {
			let legal = twisted.getLegalMoves();
			let move = legal[Math.floor(Math.random() * legal.length)];

			return move; // return item from legalmoves
		}

	};
}
