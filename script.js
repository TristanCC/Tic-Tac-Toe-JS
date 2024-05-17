function refresh() {
    window.location.reload()
}

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
        { name: "playerOne", token: "X" },
        { name: "playerTwo", token: "O" }
    ];

    var currentPlayer = Players[0]
    // Function to handle player move
    function handleMove(event) {
        const target = event.target;
        const row = parseInt(target.getAttribute('data-row'));
        const column = parseInt(target.getAttribute('data-column'));

        // Call pickCell function and update UI
        if (gameboard.board[row][column].getValue() === null) {
            gameboard.pickCell(currentPlayer, row, column);
            target.innerHTML = currentPlayer.token;
        }

        // Check for win or draw
        const winner = gameboard.checkWin();
        console.log(`this is winner value : ${winner}`);
        if (winner === 1) {
            console.log(`${currentPlayer.name} is the winner!`);
            var winnerName = document.querySelector(".winner-name");
            var winModal = document.querySelector(".winModal");
            winModal.style.visibility = "visible";
            winnerName.innerHTML = `<h3>${currentPlayer.name}</h3>`;

            // Load and append the confetti script
            function loadConfettiScript() {
                if (!document.getElementById('confettiScript')) {
                    const script = document.createElement('script');
                    script.src = 'https://run.confettipage.com/here.js';
                    script.id = 'confettiScript';
                    script.setAttribute('data-confetticode', 'U2FsdGVkX1/kk2Se+J9w3en2Iq895Utz6HlDLhrBVsBN7EOElOgFuLuwBi/jFUu3WL4U1Uze0a0kPD/W+2+fGokhLe0QCXs2j7lzd5xmi3A1hTyD7yoYjRG6AoYwGlL6o2/wqpqSiTlq95t7AR1GBjBSUcQLy7qgYVbL4YPaR9/AvC4MqhLYBwzuzMfAqX1UtPv/6KW5rdLw9EJHfiw64atDSR1zQIa3ukHLA9rRrypfdNUR9CeKjYrfdeqtSEC2LSQgoymFZseoGwFHO9CD2xfUrqivu8nZoPkG5biA7AB9o1geXM8O/fWB08r9vr2XTQTxl+E9m8251EdhLMYVVqZROeY7zLD3amkXdodwPSYEEnG5hX2lVIjb+1jtf9mwebQmT9MsQ4XjIuz4QoS8kV4mrfVxgpfwpkV/d0zYeM+A8XO83mJ8u/DR1mL+tk14OcaUtTDYK83keDtsni6VTBafzLbHbMvHB4TRmpjw1V9yni7QwpAA03rTePZlyKMZ0Lrk05d3E13lB51xknMbLQoQA7HPfhWZIm27TzMuCDfhCeK9viig87QUWFrlig8RZWEs3++etyoKhRioGqw1iU4QibFFrg+n/rQEw/PRSuVqp5qomDK6ErgpfjtOvJFWZDbC4JvJ6tp7E5SU7g6Vv3omSQwvMzCuqsQcDQwfTXK9ROCiVw5FOoPyDTeSwjUI');
                    document.body.appendChild(script);
                }
            }

            loadConfettiScript();
        } else if (winner === 2) {
            console.log("Draw! Play again?");
        } else {
            // Switch to the next player
            currentPlayer = currentPlayer === Players[0] ? Players[1] : Players[0];
            console.log(`${currentPlayer.name}'s turn`);
        }
    }

    // Add event listener to the parent container
    const gameBoardContainer = document.getElementById('game-board');
    gameBoardContainer.addEventListener('click', handleMove);
})();


//<script src="https://run.confettipage.com/here.js" data-confetticode="U2FsdGVkX1/kk2Se+J9w3en2Iq895Utz6HlDLhrBVsBN7EOElOgFuLuwBi/jFUu3WL4U1Uze0a0kPD/W+2+fGokhLe0QCXs2j7lzd5xmi3A1hTyD7yoYjRG6AoYwGlL6o2/wqpqSiTlq95t7AR1GBjBSUcQLy7qgYVbL4YPaR9/AvC4MqhLYBwzuzMfAqX1UtPv/6KW5rdLw9EJHfiw64atDSR1zQIa3ukHLA9rRrypfdNUR9CeKjYrfdeqtSEC2LSQgoymFZseoGwFHO9CD2xfUrqivu8nZoPkG5biA7AB9o1geXM8O/fWB08r9vr2XTQTxl+E9m8251EdhLMYVVqZROeY7zLD3amkXdodwPSYEEnG5hX2lVIjb+1jtf9mwebQmT9MsQ4XjIuz4QoS8kV4mrfVxgpfwpkV/d0zYeM+A8XO83mJ8u/DR1mL+tk14OcaUtTDYK83keDtsni6VTBafzLbHbMvHB4TRmpjw1V9yni7QwpAA03rTePZlyKMZ0Lrk05d3E13lB51xknMbLQoQA7HPfhWZIm27TzMuCDfhCeK9viig87QUWFrlig8RZWEs3++etyoKhRioGqw1iU4QibFFrg+n/rQEw/PRSuVqp5qomDK6ErgpfjtOvJFWZDbC4JvJ6tp7E5SU7g6Vv3omSQwvMzCuqsQcDQwfTXK9ROCiVw5FOoPyDTeSwjUI"></script>