const Gameboard = (function(){
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const resetBoard = () =>{
        board = ["", "", "", "", "", "", "", "", ""];
    }

    const setToken = (index, token) =>{
        if(board[index] === ''){
            board[index] = token
            return true
        }
        return false
    }

    return { getBoard, resetBoard, setToken }
})();

const Players = (name, token) =>{
    return {name, token}
}

const DisplayController = (function(){
    const InputPlayer1 = document.getElementById('player1')
    const InputPlayer2 = document.getElementById('player2')
    const startButton = document.getElementById('start')
    const playerTurn = document.querySelector('#turn')
    const cells = document.querySelectorAll('.cell')
    let progress = false
    let currentPlayer;

    const renderBoard = () => {
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.innerHTML = board[index];
        });
    }

    const checkWinner = () => {
        const board = Gameboard.getBoard();
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]            
        ];
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes("") ? null : "Tie";
    }

    const Click = (event) =>{
        if(!progress) 
            return
        const cell = event.target
        const index = cell.getAttribute('data-index')
        if(Gameboard.setToken(index, currentPlayer.token)){
            renderBoard()
            const result = checkWinner()
            if(result){
                progress = false
                playerTurn.innerHTML = result ===  "Tie" ? "It's a tie :(" : `${currentPlayer.name} wins!`
                startButton.innerHTML = 'Restart Game' 
            }
            else{
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                playerTurn.innerHTML = `${currentPlayer.name}'s turn`
            }
        }
    }

    const startGame = () =>{
        if (progress){
            Gameboard.resetBoard();
            renderBoard();
            playerTurn.innerHTML = `${currentPlayer.name}'s turn`   
            return;
        }
        const namePlayer1 = InputPlayer1.value || 'player 1'
        const namePlayer2 = InputPlayer2.value || 'player 2'
        player1 = Players(namePlayer1, "X");
        player2 = Players(namePlayer2, "O");
        progress = true
        currentPlayer = player1
        playerTurn.innerHTML = `${currentPlayer.name}'s turn`
        Gameboard.resetBoard()
        renderBoard()
        startButton.innerHTML = 'Restart Game'
    }

    const init = () =>{
        startButton.addEventListener('click', startGame)
        cells.forEach(cell => cell.addEventListener('click', Click))
    }

    return { init }
})();

DisplayController.init();