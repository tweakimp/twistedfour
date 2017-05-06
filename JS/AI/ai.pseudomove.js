function supertoll(matrix, playerid, depth) {

	var layer = 0;
	var sequence = [];

	var digdown = function (matrix, id, layer) {

		if (layer < depth) {
			// weitere mögliche züge in array schreiben
			// getlegalmoves für alle züge auf dieser ebene
			// berechnung der score für alle züge auf dieser ebene
			// unterscheide eigenen und fremden zug bei der
			let legal;
			let move;

			// copy current matrix
			for (let i = 0; i < 7; i++) {
				for (let j = 0; j < 7; j++) {
					twisted.customMatrix[i][j] = matrix[i][j];
				}
			}
			// calc legal moves for current amtrix
			legal = twisted.getLegalMoves(matrix);

			// for all legal moves... do the following
			for (let i = 0; i < legal.length; i++) {

				let currentMove = legal[i];
				let temp = currentMove.slice();
				sequence.push(temp);

				let simulatedArea = new GameArea("custom", true);
				simulatedArea.fillMatrix();

				cid = (layer % 2 === 1) ? id : ((id === 1) ? 2 : 1);
				simulatedArea.makeMove(currentMove, cid);

				digdown(simulatedArea.getMatrix(), layer++);
			}

		} else {
			// calc matrix score für alle matrizen
			let score = winlistScore.get(matrix, id);
			let temp = sequence.slice();
			moveSequences.push(temp);

			sequence = [];

		}

	};
	console.log(moveSequences[0]);
	console.log(moveSequences[1]);
}
