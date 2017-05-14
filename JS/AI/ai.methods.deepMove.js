/*globals twisted, GameArea, winlistScore*/
/* exported deepMove*/

function deepMove(playerid, depth) {

	//preparation
	var currentMatrix = Array(7)
		.fill(null)
		.map(() => Array(7)
			.fill(0));
	for (let i = 0; i < 7; i++) {
		for (let j = 0; j < 7; j++) {
			currentMatrix[i][j] = twisted.board.matrix[i][j];
		}
	}
	console.log("currentMatrix");
	logMatrix(currentMatrix);
	let boardList = [[currentMatrix]];
	console.log("boardList");
	console.log(boardList);

	let layer = 0;
	let legalMoves = [];

	let goDeeper = function (id, layer) {
		if (layer < depth) {
			console.log("id, layer");
			console.log(id, layer);

			// depth not reached, create a new layer in the array
			boardList.push([]);
			console.log("boardList");
			console.log(boardList);

			// for every item in the layer above the new one
			for (let i = 0; i < boardList[layer].length; i++) {

				// get legal moves for each of these
				legalMoves = twisted.getLegalMoves(boardList[layer][i]);
				// console.log("legalMoves");
				// console.log(legalMoves);


				for (let j = 0; j < legalMoves.length; j++) {
					// apply turn j on matrix i

					let temp = applyMove(legalMoves[j], boardList[layer][i], id);

					boardList[layer + 1][i * legalMoves.length + j] = temp; // matrix with applied turn goes here
				}
			}


			layer++;
			id = (id === 1) ? 2 : 1;
			goDeeper(id, layer);


		} else {
			console.log("got to the end");
		}
	};

	function applyMove(move, currentMatrix, id) {
		let simulatedArea;
		for (let i = 0; i < 7; i++) {
			for (let j = 0; j < 7; j++) {
				twisted.customMatrix[i][j] = currentMatrix[i][j];
				simulatedArea = new GameArea("custom", true);
				simulatedArea.fillMatrix();
				simulatedArea.makeMove(move, id);
			}
		}
		return simulatedArea.matrix;
	}
	goDeeper(playerid, 0);
}

//help
function logMatrix(matrix) {
	for (let j = 6; j > -1; j--) {
		let row = [j, "|"];
		for (let i = 0; i < 7; i++) {
			row.push(matrix[i][j]);
		}
		console.log(`${row}`);
	}
	console.log("========" + "=" + "========");
}
