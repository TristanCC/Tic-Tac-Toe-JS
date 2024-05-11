function Gameboard() {

    const board = []
    for (let i=0; i<3; i++) {
        board[i] = []
        for (let j=0; j<3; j++) {
            const cell = Cell(i,j); // Create a new Cell object with coordinates
            board[i].push(cell); // Push the cell into the board

        }
    }

    const checkAvailable = () => {
        // Filter available cells
        const availableCells = board.flat().filter(cell => cell.getValue() === 0);
        return availableCells
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

        // Check rows
        for (let i=0; i<3; i++) {
            if (board[i][0].getValue() === board[i][1].getValue() && board[i][1].getValue() === board[i][2].getValue()) {
                return 1
            }
            if (board[0][i].getValue() === board[1][i].getValue() && board[1][i].getValue() === board[2][i].getValue()) {
                return 1
            }
        }
        if (board[0][0].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][2].getValue()) {
            return 1
        }
        if (board[0][2].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][0].getValue()) {
            return 1
        }
        if (checkAvailable().length === 0) {
            return 2 // 2 = out of cells = draw
        }
        
        return 0 // continue game loop

    }
    return {board, pickCell, checkWin, checkAvailable,}
};

function Cell(row,column) {
    var value = 0
    var row = row
    var column = column

    const changeValue = (newValue) => {
        value = newValue
    }
    const changeCoords = (newRow, newColumn) => {
        row = newRow
        column = newColumn
    }

    const getValue = () => value

    const getCoords = () => {row, column}

    return {value, row, column, changeValue, getValue, getCoords, changeCoords}


}

(function Gamecontroller() {

    const gameboard = Gameboard()

    const Players = [{
        name: "playerOne",
        token: "1"
    },
    {
        name: "playerTwo",
        token: "2"
    }]

    function gameLoop() {
        // track current player, winner = 0
        // loop until either winner or no more available cells
        // if current player === playerOne, switch to playerTwo, vice versa
        // pick cell
        // check win return (1 = currentplayer wins) (2 = draw)
        // if winner !== 0, end game

        // TODO: make pickCell() take user input

        let currentPlayer = Players[0] // Player one always makes first move
        let winner = 0

        // how best to structure game loop?
        
        if (winner === 1) {
            console.log(`${currentPlayer.name} is the winner!`)
        }
        if (winner === 2) {
            console.log("Draw! Play again?")
        }
    }
    gameLoop()
})()