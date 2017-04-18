// jshint esversion: 6
// jshint browser: true
// jshint devel: true

function Game(player1, player2, timelimit) {

    this.timelimit = timelimit; // time per move

    this.player1 = new Player(1, "random");
    this.player2 = new Player(2, "ai");

    this.randomturn = function () {
        let legal = twisted.getLegalMoves();
        let move = legal[Math.floor(Math.random() * legal.length)];
        return move; // return item from legalmoves
    };
    this.turnnumber = 1; // turnnumber > 49 -> draw
    this.board = new GameArea("start", true);

    //this.legalmoves = ["l", "r", 0, 1, 2, 3, 4, 5, 6]; // 1-7 spalten
    this.legalmoves = [0, 1, 2, 3, 4, 5, 6]; // 1-7 spalten

    this.time = 0;
    this.countdown = function () {
        this.time--;
        // time limit reached, lose game
        if (this.time === 0) {
            if (this.whoseturn === 1) {} else {}
        }

    };
    this.history = [];

    this.getLegalMoves = function () {
        return this.legalmoves;
    };

    this.start = function () {
        var customMatrix = [
			[0, 0, 0, 0, 0, 0, 2],
			[0, 0, 0, 0, 0, 0, 2],
			[1, 0, 0, 0, 0, 0, 2],
			[1, 0, 0, 0, 0, 0, 2],
			[1, 0, 0, 0, 0, 0, 2],
			[1, 0, 0, 0, 0, 0, 1],
			[1, 0, 2, 2, 2, 2, 2],
		];
        this.nextTurn();
    };

    this.nextTurn = function () {
        /*
        this.time = timelimit;
                var timer = setInterval(function () {
                    this.time--;
                    // time limit reached, lose game
                    if (this.time === 0) {
                        if (this.whoseturn === 1) {} else {}
                    }
                }, 1000);
        */
        let move;
        let player;
        if (this.turnnumber % 2 === 1) {
            move = this.player1.getMove();
            player = 1;
        } else {
            move = this.player2.getMove();
            player = 2;
        }

        this.history.push(move);
        this.board.makeMove(move, player);

        // check HERE for wins

        this.board.deleteMatrix();
        this.board.drawMatrix();

        // clearInterval(timer);

        this.turnnumber++;
        if (this.turnnumber === 12) {
            throw "mach ma schluss";
        }

        setTimeout(function () {
            twisted.nextTurn();
        }, 500);
    };
}
