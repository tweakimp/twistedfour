function deepWinList(matrix, playerid, depth) {

	var sequence = [];
	var moveSequences = [];

	var digdown = function (matrix, id, layer) {

		if (layer < depth) {
			// copy current matrix
			for (let i = 0; i < 7; i++) {
				for (let j = 0; j < 7; j++) {
					twisted.customMatrix[i][j] = matrix[i][j];
				}
			}
			// calc legal moves for current amtrix
			let legal = twisted.getLegalMoves(matrix);

			// for all legal moves... do the following
			for (let i = 0; i < legal.length; i++) {

				let currentMove = legal[i];
				sequence.push(currentMove);

				let simulatedArea = new GameArea("custom", true);
				simulatedArea.fillMatrix();

				let cid = (layer % 2 === 1) ? id : ((id === 1) ? 2 : 1);
				simulatedArea.makeMove(currentMove, cid);

				digdown(simulatedArea.getMatrix(), id, layer + 1);
			}

		} else {
			// calc matrix score für alle matrizen
			let score = winlistScore.get(matrix, id);
			moveSequences.push([score, sequence.slice()]);

			sequence = [];
		}
	};

	digdown(matrix, playerid, 0);

	moveSequences.sort(function (a, b) {
		if (a[0] === b[0]) {
			return 0;
		} else {
			return (a[0] > b[0]) ? -1 : 1;
		}
	});

	let move = moveSequences[0][1][0];
	//console.log(moveSequences[0]);
	//console.log(moveSequences[1]);
	twisted.afterTurn(move);
}
