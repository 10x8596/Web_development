const squares = document.querySelectorAll('.square');
let currentPlayer = 'X';
let isGameOver = false;

squares.forEach(square => {
  square.addEventListener('click', () => {
    if (!square.textContent && !isGameOver) {
      square.textContent = currentPlayer;
      square.style.backgroundColor = currentPlayer === 'X' ? 'red' : 'black';
      if (checkWin(currentPlayer)) {
        alert(currentPlayer + ' wins!');
        isGameOver = true;
      } else if (checkDraw()) {
        alert('It\'s a draw!');
        isGameOver = true;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
          const bestMove = getBestMove();
          squares[bestMove].click();
        }
      }
    }
  });
});

function checkWin(player) {
  // Check rows, columns, and diagonals for a win
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => squares[index].textContent === player)
  );
}

function checkDraw() {
  // Check if all squares are filled
  return [...squares].every(square => square.textContent !== '');
}

function getBestMove() {
  // Implement the Minimax algorithm to calculate the best move for 'O'
  // The Minimax algorithm is a recursive function that explores all possible moves and assigns scores to each move, then returns the best score for the current player.
  const EMPTY = '';

  function minimax(depth, isMaximizing) {
    if (checkWin('O')) return 1;
    if (checkWin('X')) return -1;
    if (checkDraw()) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === EMPTY) {
          squares[i].textContent = 'O';
          let score = minimax(depth + 1, false);
          squares[i].textContent = EMPTY;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === EMPTY) {
          squares[i].textContent = 'X';
          let score = minimax(depth + 1, true);
          squares[i].textContent = EMPTY;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  let bestScore = -Infinity;
  let bestMove;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === EMPTY) {
      squares[i].textContent = 'O';
      let score = minimax(0, false);
      squares[i].textContent = EMPTY;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

