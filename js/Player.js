// jshint esversion: 6
// jshint browser: true
// jshint devel: true

function Player(id, identity) {
    this.name = name;
    this.identity = identity;
    this.id = id;

    this.getMove = function () {
        if (this.identity == "random") {
            return twisted.randomturn(); // return item from legalmoves
        }

        if (this.identity == "ai") {

            var future_moves = [];

            // Matrix kopieren, um Spielzuege zu simulieren
            var customMatrix = twisted.board.getMatrix().map(function (arr) {
                return arr.slice();
            });

            let legal = twisted.getLegalMoves();
            // for all legal moves, generate a new matrix
            // and get its gameScore   
            for (var i = 0; i < legal.length; i++) {
                let current_move = legal[i];

                var simulated_Area = new GameArea("custom", true);

                simulated_Area.makeMove(current_move, this.id);

                var score = gameScore(simulated_Area.getMatrix());
                future_moves.push([score, current_move]);
            }

            future_moves.sort(function (a, b) {
                if (a[0] === b[0]) {
                    return 0;
                } else {
                    return (a[0] > b[0]) ? -1 : 1;
                }
            });

            return future_moves[0][1]; // return item from legalmoves
        }

    };
}

const fieldScore = [
	[3, 4, 5, 7, 5, 4, 3],
	[4, 6, 8, 10, 8, 6, 4],
	[5, 8, 11, 13, 11, 6, 5],
	[7, 10, 13, 16, 13, 10, 7],
	[5, 8, 11, 13, 11, 6, 5],
	[4, 6, 8, 10, 8, 6, 4],
	[3, 4, 5, 7, 5, 4, 3],
];

// GAME SCORE METHODS
function gameScore(matrix) {
    //calculate player1
    let player1score = 0;
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            if (matrix[i][j] === 1) {
                player1score += fieldScore[i][j];
            }
        }
    }
    //calculate player 2
    let player2score = 0;
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            if (matrix[i][j] === 2) {
                player2score += fieldScore[i][j];
            }
        }
    }
    return player1score - player2score;
}
