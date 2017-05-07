/*globals twisted, GameArea, winlistScore*/

function deepWinList(matrix, playerid, depth) {
	var sequence = [];
	var moveSequences = [];
	var layer = 0;

	function digdown(matrix, id, layer) {

		if (layer < depth) {
			// copy current matrix
			for (let i = 0; i < 7; i++) {
				for (let j = 0; j < 7; j++) {
					twisted.customMatrix[i][j] = matrix[i][j];
				}
			}
			// calc legal moves for current matrix
			let legal = twisted.getLegalMoves(matrix);
			// for all legal moves... do the following
			for (let i = 0; i < legal.length; i++) {
				let currentMove = legal[i];
				sequence.push(currentMove);

				let simulatedArea = new GameArea("custom", true);
				simulatedArea.fillMatrix();

				let cid = (layer % 2 === 0) ? id : ((id === 1) ? 2 : 1);
				if (currentMove === "l") {
					simulatedArea.matrix = simulatedArea.rotateLeft(simulatedArea.matrix);
					simulatedArea.applyGravity(simulatedArea.matrix);

				} else if (currentMove === "r") {
					simulatedArea.matrix = simulatedArea.rotateRight(simulatedArea.matrix);
					simulatedArea.applyGravity(simulatedArea.matrix);

				} else {
					// put token into column
					let targetField = simulatedArea.matrix[currentMove].indexOf(0);
					simulatedArea.matrix[currentMove].splice(targetField, 1, cid);
				}

				logMatrix(simulatedArea.matrix);
				digdown(simulatedArea.getMatrix(), cid, layer);
			}

		} else {
			// calc matrix score für alle matrizen
			let score = winlistScore.get(matrix, id);
			moveSequences.push([score, sequence]);

			sequence = [];
		}
	}

	digdown(matrix, playerid, layer);

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

	//help
	function logMatrix(matrix) {
		for (let j = 6; j > -1; j--) {
			let zeile = [j, "|"];
			for (let i = 0; i < 7; i++) {
				zeile.push(matrix[i][j]);
			}
			console.log(`${zeile}`);
		}
		console.log("========" + layer + "========");
	}
}
