/*globals twisted, GameArea, winlistScore*/

function deepWinList(matrix, playerid, depth) {

	digdown(playerid, 0);
	//preparation
	var currentMatrix = Array(7)
		.fill(null)
		.map(() => Array(7)
			.fill(0));
	for (let i = 0; i < 7; i++) {
		for (let j = 0; j < 7; j++) {
			currentMatrix[i][j] = matrix[i][j];
		}
	}
	console.log("currentMatrix");
	logMatrix(currentMatrix);
	let boardList = [[currentMatrix]];
	console.log(boardList);


	function digdown(id, layer) {
		// depth not reached, create a new layer in the array
		if (layer < depth) {
			// for every item in the layer above the new one
			boardList.push([]);
			for (let n = 0; n < boardList[layer].length; n++) {
				// create game area for current matrix
				for (let i = 0; i < 7; i++) {
					for (let j = 0; j < 7; j++) {
						twisted.customMatrix[i][j] = boardList[layer][n][i][j];
					}
				}
				console.log("customMatrix");
				logMatrix(twisted.customMatrix);
				let simulatedArea = new GameArea("custom", true);

			}

			layer++;
			id = (id === 1) ? 2 : 1;
			digdown(id, layer);
		} else {

		}


	}
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
