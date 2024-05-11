function Gameboard() {

    const board = []
    for (let i=0; i<3; i++) {
        board[i] = []
        for (let j=0; j<3; j++) {
            const cell = Cell(i,j); // Create a new Cell object with coordinates
            board[i].push(cell); // Push the cell into the board
            
        }
    }

    const pickCell = (player, rowSel, columnSel) => {
        // Check for empty cells
        const availableCells = board.flat().filter(cell => cell.getValue === 0);
        // Find the selected cell based on row and column selection
        const selectedCell = availableCells.find(cell => cell.row === rowSel && cell.column === columnSel);
    
        console.log(availableCells);
        // if player selection is in available cells = valid move. else = invalid
        // how to get player selection?
        if(selectedCell.getValue() === 0) {
            selectedCell.changeValue(player.token)
            console.log(`valid move, selected cell new value = ${selectedCell.getValue()}`)
        }
        else {
            console.log("invalid move")
        }
        
        

        


    };
    return {board, pickCell}
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
    gameboard.board[1][0].changeValue(5)

    const Players = [{
        name: "playerOne",
        token: "1"
    },
    {
        name: "playerTwo",
        token: "2"
    }]

    gameboard.pickCell(Players[0],1,1)
    console.log(Players[0].name)
})()
