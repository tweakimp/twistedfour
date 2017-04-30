/* jshint esversion: 6, browser: true, devel: true */
/* globals GameArea, twisted, fieldScore*/

function Player(id, identity) {
    this.name = name;
    this.identity = identity;
    this.id = id;
    this.getMove = function () {
        let move = -1;
        let legal = [];
        switch (this.identity) {
            case "random":
                legal = twisted.getLegalMoves();
                move = legal[Math.floor(Math.random() * legal.length)];
                twisted.afterTurn(move);
                break;
            case "ai":
                let futureMoves = [];
                for (let i = 0; i < 7; i++) {
                    for (let j = 0; j < 7; j++) {
                        twisted.customMatrix[i][j] = twisted.board.getMatrix()[i][j];
                    }
                }
                legal = twisted.getLegalMoves();
                // for all legal moves, generate a new matrix
                // and get its gameScore   
                for (let i = 0; i < legal.length; i++) {

                    let currentMove = legal[i];
                    let simulatedArea = new GameArea("custom", true);
                    simulatedArea.fillMatrix();
                    simulatedArea.makeMove(currentMove, this.id);

                    let score = winlistScore.get(simulatedArea.getMatrix(), this.id);
                    futureMoves.push([score, currentMove]);
                }
                futureMoves.sort(function (a, b) {
                    if (a[0] === b[0]) {
                        return 0;
                    } else {
                        return (a[0] > b[0]) ? -1 : 1;
                    }
                });
                //move = (this.id === 1) ? futureMoves[0][1] : futureMoves[futureMoves.length - 1][1];
                move = futureMoves[0][1];
                twisted.afterTurn(move);
                break;

            case "human":
                legal = twisted.getLegalMoves();
                if (legal.includes("l")) {
                    let left = document.getElementsByClassName("left");
                    left[0].addEventListener("click", twisted.turnL);
                }
                if (legal.includes("r")) {
                    let right = document.getElementsByClassName("right");
                    right[0].addEventListener("click", twisted.turnR);
                }
                if (legal.includes(0)) {
                    let column = document.getElementsByClassName("column");
                    column[0].addEventListener("click", twisted.turn0);
                }
                if (legal.includes(1)) {
                    let column = document.getElementsByClassName("column");
                    column[1].addEventListener("click", twisted.turn1);
                }
                if (legal.includes(2)) {
                    let column = document.getElementsByClassName("column");
                    column[2].addEventListener("click", twisted.turn2);
                }
                if (legal.includes(3)) {
                    let column = document.getElementsByClassName("column");
                    column[3].addEventListener("click", twisted.turn3);
                }
                if (legal.includes(4)) {
                    let column = document.getElementsByClassName("column");
                    column[4].addEventListener("click", twisted.turn4);
                }
                if (legal.includes(5)) {
                    let column = document.getElementsByClassName("column");
                    column[5].addEventListener("click", twisted.turn5);
                }
                if (legal.includes(6)) {
                    let column = document.getElementsByClassName("column");
                    column[6].addEventListener("click", twisted.turn6);
                }

                break;
        }
    };
}
