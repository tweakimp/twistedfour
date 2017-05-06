/* jshint esversion: 6, browser: true, devel: true */
/* globals twisted */
var fieldScore = {
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

var winlistScore = {
	create: function () {
		let winlist = [];
		for (let i = 0; i < 7; i++) {
			winlist.push([
				[i, 0],
				[i, 1],
				[i, 2],
				[i, 3]
			]);
			winlist.push([
				[i, 1],
				[i, 2],
				[i, 3],
				[i, 4]
			]);
			winlist.push([
				[i, 2],
				[i, 3],
				[i, 4],
				[i, 5]
			]);
			winlist.push([
				[i, 3],
				[i, 4],
				[i, 5],
				[i, 6]
			]);
		}
		//rows
		for (let j = 0; j < 7; j++) {
			winlist.push([
				[0, j],
				[1, j],
				[2, j],
				[3, j]
			]);
			winlist.push([
				[1, j],
				[2, j],
				[3, j],
				[4, j]
			]);
			winlist.push([
				[2, j],
				[3, j],
				[4, j],
				[5, j]
			]);
			winlist.push([
				[3, j],
				[4, j],
				[5, j],
				[6, j]
			]);
		}
		//tlbr diagonals
		for (let j = 6; j > 2; j--) {
			winlist.push([
				[0, j],
				[1, j - 1],
				[2, j - 2],
				[3, j - 3]
			]);
			winlist.push([
				[1, j],
				[2, j - 1],
				[3, j - 2],
				[4, j - 3]
			]);
			winlist.push([
				[2, j],
				[3, j - 1],
				[4, j - 2],
				[5, j - 3]
			]);
			winlist.push([
				[3, j],
				[4, j - 1],
				[5, j - 2],
				[6, j - 3]
			]);
		}

		//bltr diagonals
		for (let j = 0; j < 4; j++) {
			winlist.push([
				[0, j],
				[1, j + 1],
				[2, j + 2],
				[3, j + 3]
			]);
			winlist.push([
				[1, j],
				[2, j + 1],
				[3, j + 2],
				[4, j + 3]
			]);
			winlist.push([
				[2, j],
				[3, j + 1],
				[4, j + 2],
				[5, j + 3]
			]);
			winlist.push([
				[3, j],
				[4, j + 1],
				[5, j + 2],
				[6, j + 3]
			]);
		}
		return winlist;
	},
	get: function (matrix, player) {
		let winlist = winlistScore.create();
		let score = 0;
		for (let quartett of winlist) {
			let goodcount = 0;
			let badcount = 0;
			let zeroes = 0;
			for (let i = 0; i < 4; i++) {
				//---- matrix[spalte, zeile]
				let token = matrix[quartett[i][0]][quartett[i][1]];
				if (token === 0) {
					zeroes++;
				} else if (token === player) {
					goodcount++;
				} else {
					badcount++;
				}
			}
			if (goodcount > 0 && badcount > 0) {
				// do nothing
			} else if (goodcount === 4) {
				score = score + 100000;
			} else if (goodcount === 3) {
				score = score + 1000;
			} else if (goodcount === 2) {
				score = score + 10;
			} else if (goodcount === 1) {
				score = score + 1;
			} else if (badcount === 3) {
				score = score - 1000;
			} else if (badcount === 2) {
				score = score - 10;
			} else if (badcount === 1) {
				score = score - 1;
			}
		}
		return score;
	},
	draw: function (matrix) {
		let textbox = document.getElementsByClassName("scoreArea")[0];
		let input = winlistScore.get(matrix, twisted.getCurrentPlayer()
			.id);
		textbox.innerHTML = `The current score is ${input}<br>by winlistScore calculation.`;
	}
};
