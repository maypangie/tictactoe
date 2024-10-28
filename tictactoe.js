 let board = ['', '', '', '', '', '', '', '', ''];
 let currentPlayer = 'X';
 let isGameOver = false;

// adding click listeners to each cell to start game 

function startGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.onclick = () => makeMove(cell);
    });
    console.log(`Game started. Player ${currentPlayer}'s turn.`);
    displayMessage(`Player ${currentPlayer}'s turn`);
}

// making a move

function makeMove(cell) {
    const index = cell.getAttribute('data-index');
    console.log(`Cell clicked: ${index}, Player: ${currentPlayer}`);


    // If the cell is empty and the game is not over, place the player's symbol

    if (board[index] === '' && !isGameOver) {
        board[index] = currentPlayer;
        cell.innerText = currentPlayer;
        console.log(`Board updated:`, board);
        checkWinner();  // Check if the current player wins

        if (!isGameOver) {
            switchPlayer();  // Switch to the next player
            displayMessage(`Player ${currentPlayer}'s turn`);
        }
    }
}

// Switch between players


function switchPlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    console.log(`Switched player. Now it's ${currentPlayer}'s turn.`);
}



// Display the message in the DOM

function displayMessage(message) {
    document.getElementById('message').innerText = message;
}

// Check if there's a winner or tie

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],   // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],   // columns
        [0, 4, 8], [2, 4, 6]               // diagonals
    ];



    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameOver = true;
            console.log(`Winning combination found: ${combination}`);
            displayMessage(`Player ${currentPlayer} wins!`);
        }
    });

    // If there's no winner and the board is full, it's a tie

    if (!isGameOver && board.every(cell => cell !== '')) {
        isGameOver = true;
        console.log('Game ended in a tie.');
        displayMessage("It's a tie!");
    }
}


function resetGame() {
    // Reset board and game state
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameOver = false;

    // Clear the board in the DOM
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
    });

    // Clear the message and start a new game
    displayMessage(`Player ${currentPlayer}'s turn`);
    console.log('Game reset.');
}

// Add event listener to the reset button
document.getElementById('resetButton').onclick = resetGame;



// Start the game when the page loads
startGame(); 