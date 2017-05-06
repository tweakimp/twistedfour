function deepWinList(matrix, playerid, depth) {

    var layer = 0;
    var sequence = [];
    var moveSequences = [];

    var digdown = function (matrix, id, layer) {
        console.log("layer" + layer);

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
                sequence.push(currentMove);

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
            moveSequences.push([score, temp]);

            sequence = [];
        }
    };
    digdown(matrix, playerid, layer);

    moveSequences.sort(function (a, b) {
        if (a[0] === b[0]) {
            return 0;
        } else {
            return (a[0] > b[0]) ? 1 : -1;
        }
    });

    move = moveSequences[0][1][0];
    // console.log(moveSequences[0]);
    console.log(moveSequences[0][1][0]);
    // console.log(moveSequences[moveSequences.length-1]);
    twisted.afterTurn(move);
}
