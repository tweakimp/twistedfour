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
	//console.log("currentMatrix");
	//logMatrix(currentMatrix);
	let boardList = [[currentMatrix]];
	let moveList = [[""]];

	let layer = 0;
	let legalMoves = [];

	let goDeeper = function (id, layer) {
		if (layer < depth) {
			// console.log("id, layer");
			// console.log(id, layer);

			// depth not reached, create a new layer in the array
			boardList.push([]);
			moveList.push([]);

			// console.log("boardList");
			// console.log(boardList);

			// for every item in the layer above the new one
			for (let i = 0; i < boardList[layer].length; i++) {

				// get legal moves for each of these
				legalMoves = twisted.getLegalMoves(boardList[layer][i]);
				for (let j = 0; j < legalMoves.length; j++) {
					// apply turn j on matrix i
					let temp = applyMove(legalMoves[j], boardList[layer][i], id);
					// console.log(moveList[layer][i], legalMoves[j]);
					// logMatrix(temp);
					boardList[layer + 1].push(temp);
					moveList[layer + 1].push(`${moveList[layer][i]}${legalMoves[j]}`);
				}
			}
			layer++;
			id = (id === 1) ? 2 : 1;
			goDeeper(id, layer);
		} else {
			console.log("boardList");
			console.log(boardList);

			console.log("moveList");
			console.log(moveList);

			calcBestMove(boardList, moveList);
		}
	};

	function applyMove(move, currentMatrix, id) {
		let simulatedArea;
		for (let i = 0; i < 7; i++) {
			for (let j = 0; j < 7; j++) {
				twisted.customMatrix[i][j] = currentMatrix[i][j];
				simulatedArea = new GameArea("custom", true);
				simulatedArea.fillMatrix();
				simulatedArea.makePreMove(move, id);
			}
		}
		return simulatedArea.matrix;
	}


	function calcBestMove(boardList, moveList, id) {
		let lastLayer = boardList.length - 1;
		let scoreList = [];
		for (let i = 0; i < boardList[lastLayer].length; i++) {
			let score = winlistScore.get(boardList[lastLayer][i], playerid);
			scoreList.push(score);
		}
		console.log("scoreList");
		console.log(scoreList);
		let max = scoreList[0];
		let index = 0;
		for (let i = 0; i < scoreList.length; i++) {
			if (id === 1) {
				if (max > scoreList[i]) {
					max = scoreList[i];
					index = i;
				}
			} else {
				if (max < scoreList[i]) {
					max = scoreList[i];
					index = i;
				}
			}
		}
		let bestMoveSequence = moveList[moveList.length - 1][index];
		let bestMove = bestMoveSequence.charAt(0);
		if (!(bestMove === "L") && !(bestMove === "R")) {
			bestMove = Number(bestMove);
		}

		// console.log(bestMove);
		twisted.afterTurn(bestMove);
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
