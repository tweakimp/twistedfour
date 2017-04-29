// jshint esversion: 6, browser: true, devel: true

let fieldScore = {
	fieldScoreMatrix: [
		[3, 4, 5, 7, 5, 4, 3],
		[4, 6, 8, 10, 8, 6, 4],
		[5, 8, 11, 13, 11, 8, 5],
		[7, 10, 13, 16, 13, 10, 7],
		[5, 8, 11, 13, 11, 6, 5],
		[4, 6, 8, 10, 8, 8, 4],
		[3, 4, 5, 7, 5, 4, 3],
	],
	get: function (matrix) {
		//calculate player1
		let player1score = 0;
		for (let i = 0; i < 7; i++) {
			for (let j = 0; j < 7; j++) {
				if (matrix[i][j] === 1) {
					player1score += fieldScore.fieldScoreMatrix[i][j];
				}
			}
		}
		//calculate player 2
		let player2score = 0;
		for (let i = 0; i < 7; i++) {
			for (let j = 0; j < 7; j++) {
				if (matrix[i][j] === 2) {
					player2score += fieldScore.fieldScoreMatrix[i][j];
				}
			}
		}

		let score = player1score - player2score;
		return score;
	},
	draw: function (matrix) {
		let textbox = document.getElementsByClassName("scoreArea")[0];
		let input = fieldScore.get(matrix);
		textbox.innerHTML = `The current score is ${input}<br>by fieldscore calculation.`;
	}
};

let surroundScore = {
	get: function (matrix) {
		for (let i = 0; i < 7; i++) {
			for (let j = 0; j < 7; j++) {
				if (matrix[i][j] !== 0) {

				}
			}
		}
	}
};
