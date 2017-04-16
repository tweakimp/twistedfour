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
			doAIstuff();
			return; // return item from legalmoves
		}

	};
