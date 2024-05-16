function Gameboard() {
    const board = [];
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            const cell = Cell(i, j); // Create a new Cell object with coordinates
            board[i].push(cell); // Push the cell into the board
        }
    }

    const checkAvailable = () => {
        // Filter available cells
        const availableCells = board.flat().filter(cell => cell.getValue() === null);
        return availableCells;
    }

    const pickCell = (player, rowSel, columnSel) => {
        // Filter available cells
        const availableCells = checkAvailable();
        // Find selected cell
        const selectedCell = availableCells.find(cell => cell.row === rowSel && cell.column === columnSel);

        // Check if selected cell is valid
        if (selectedCell) {
            selectedCell.changeValue(player.token);
            console.log(`Valid move, selected cell new value = ${selectedCell.getValue()}`);
        } else {
            console.log("Invalid move");
        }
    };

    const checkWin = () => {
        // Check rows and columns
        for (let i = 0; i < 3; i++) {
            if (board[i][0].getValue() != null && board[i][0].getValue() === board[i][1].getValue() && board[i][1].getValue() === board[i][2].getValue()) {
                return 1;
            }
            if (board[0][i].getValue() != null && board[0][i].getValue() === board[1][i].getValue() && board[1][i].getValue() === board[2][i].getValue()) {
                return 1;
            }
        }

        // Check diagonals
        if (board[0][0].getValue() != null && board[0][0].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][2].getValue()) {
            return 1;
        }
        if (board[0][2].getValue() != null && board[0][2].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][0].getValue()) {
            return 1;
        }

        if (checkAvailable().length === 0) {
            return 2; // 2 = out of cells = draw
        }

        return 0; // continue game loop
    }

    return { board, pickCell, checkWin, checkAvailable };
}

function Cell(row, column) {
    let value = null;

    const changeValue = (newValue) => {
        value = newValue;
    }

    const getValue = () => value;

    const getCoords = () => ({ row, column });

    return { value, row, column, changeValue, getValue, getCoords };
}

(function Gamecontroller() {
    const gameboard = Gameboard();

    const Players = [
        { name: "playerOne", token: "1" },
        { name: "playerTwo", token: "2" }
    ];

    function gameLoop() {
        let winner = 0;
        let currentPlayer = Players[0]; // Player one always makes first move

        while (winner === 0) {
            let rowSel = parseInt(prompt("Choose row (0-2):", 0));
            let colSel = parseInt(prompt("Choose column (0-2):", 0));

            // Validate user input
            if (isNaN(rowSel) || isNaN(colSel) || rowSel < 0 || rowSel > 2 || colSel < 0 || colSel > 2) {
                console.log("Invalid input. Please choose numbers between 0 and 2.");
                continue;
            }

            console.log("Pre selection value: ", gameboard.board[rowSel][colSel].getValue());

            gameboard.pickCell(currentPlayer, rowSel, colSel);

            console.log("Post selection value: ", gameboard.board[rowSel][colSel].getValue());

            winner = gameboard.checkWin();

            // Change current player logic after action if no winner yet
            if (winner === 0) {
                currentPlayer = currentPlayer === Players[0] ? Players[1] : Players[0];
                console.log(`${currentPlayer.name}'s turn`);
            }
        }

        if (winner === 1) {
            console.log(`${currentPlayer.name} is the winner!`);
        }
        if (winner === 2) {
            console.log("Draw! Play again?");
        }
    }

    gameLoop();
})();
