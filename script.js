const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const turnIndicator = document.querySelector('p');
const cells = document.querySelectorAll('.row button');
const resetButton = document.getElementById('reset');
const startButton = document.getElementById('start');

let turn = "player1";
let startGame = false;
let board = Array(9).fill(null);
let player1Symbol = player1Input.value || 'X';
let player2Symbol = player2Input.value || 'O';

function checkWinner() {
    for (let x=0; x<winningCombinations.length; x++){
        let combo = winningCombinations[x];
        let a = combo[0];
        let b = combo[1];
        let c = combo[2];
        if (board[a] && board[b] === board[c] && board[c] === board[a]){
            turnIndicator.textContent = `${board[a]} Wins!`;
            startGame = false;
            resetButton.style.visibility =  "visible";
            return
        }
    }
}

startButton.addEventListener('click', function () {
    player1Symbol = document.getElementById('player1').value || 'X';
    player2Symbol = document.getElementById('player2').value || 'O';
    if(player1Symbol === player2Symbol){
        alert("Both are using same symbol")
        return
    }
    turn = "player1";
    player1Input.disabled = true;
    player2Input.disabled = true;
    startGame = true
    turnIndicator.textContent = `${player1Symbol}'s move`
    startButton.disabled = true;

});

resetButton.addEventListener('click', function () {
    cells.forEach(function (cell) {
        cell.textContent = "";
    });
    player1Input.disabled = false;
    player2Input.disabled = false;
    startGame = true
    startButton.disabled = false;
});

cells.forEach(function (cell, index) {
    cell.addEventListener('click', function () {
        if (startGame){
            if (turn === "player1" && cell.textContent === "") {
                cell.textContent = player1Symbol;
                board[index] = player1Symbol;
                console.log(board)
                turnIndicator.textContent = `${player2Symbol}'s move`;
                turn = "player2";
                
            } else if (turn === "player2" && cell.textContent === "") {
                cell.textContent = player2Symbol;
                board[index] = player2Symbol;
                console.log(board)
                turnIndicator.textContent = `${player2Symbol}'s move`;
                turn = "player1";
            }
            checkWinner();
        }
    });
});