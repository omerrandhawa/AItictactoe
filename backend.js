// Tic Tac Toe AI Engine using Minimax algorithm

// The game board is represented by a 2D array
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

// The AI player is 'O', and the human player is 'X'
const AI_PLAYER = 'O';
const HUMAN_PLAYER = 'X';

// The function to determine the best move using Minimax algorithm
function minimax(board, depth, maximizingPlayer) {
  // Base cases
  const score = evaluate(board);
  if (score === 10) {
    return score - depth;
  }
  if (score === -10) {
    return score + depth;
  }
  if (!isMovesLeft(board)) {
  
    return 0;
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = AI_PLAYER;
          const eval = minimax(board, depth + 1, false);
          board[i][j] = '';
          maxEval = Math.max(maxEval, eval);
        }
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = HUMAN_PLAYER;
          const eval = minimax(board, depth + 1, true);
          board[i][j] = '';
          minEval = Math.min(minEval, eval);
        }
      }
    }
    return minEval;
  }
}

// Function to find the best move for the AI
function findBestMove(board) {
  let bestMove = { row: -1, col: -1 };
  let bestEval = -Infinity;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        board[i][j] = AI_PLAYER;
        const eval = minimax(board, 0, false);
        board[i][j] = '';
        if (eval > bestEval) {
          bestEval = eval;
          bestMove.row = i;
          bestMove.col = j;
        }
      }
    }
  }
  return bestMove;
}

// Function to check if any moves are left
function isMovesLeft(board) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        return true;
      }
    }
  }
  return false;
}

// Function to evaluate the current state of the board
function evaluate(board) {
  const winningPositions = [
    [[0, 0], [0, 1], [0, 2]], // Row 0
    [[1, 0], [1, 1], [1, 2]], // Row 1
    [[2, 0], [2, 1], [2, 2]], // Row 2
    [[0, 0], [1, 0], [2, 0]], // Column 0
    [[0, 1], [1, 1], [2, 1]], // Column 1
    [[0, 2], [1, 2], [2, 2]], // Column 2
    [[0, 0], [1, 1], [2, 2]], // Diagonal from top-left to bottom-right
    [[0, 2], [1, 1], [2, 0]] // Diagonal from top-right to bottom-left
  ];

  for (let i = 0; i < winningPositions.length; i++) {
    const [a, b, c] = winningPositions[i];
    if (
      board[a[0]][a[1]] === board[b[0]][b[1]] &&
      board[b[0]][b[1]] === board[c[0]][c[1]]
    ) {
      if (board[a[0]][a[1]] === AI_PLAYER) {
        return 10;
      } else if (board[a[0]][a[1]] === HUMAN_PLAYER) {
        return -10;
      }
    }
  }
  
  return 0; // No winner
}

function handleTileClick(row, col) {
  if (board[row][col] === '' && isMovesLeft(board)) {
    board[row][col] = HUMAN_PLAYER;
    tiles[row][col].textContent = HUMAN_PLAYER;

    if (isMovesLeft(board)) {
      const bestMove = findBestMove(board);
      board[bestMove.row][bestMove.col] = AI_PLAYER;
      tiles[bestMove.row][bestMove.col].textContent = AI_PLAYER;

      if (evaluate(board) === 10) {
        const message = document.getElementById('message');
        message.textContent = 'AI won!';
      } else if (!isMovesLeft(board)) {
        const message = document.getElementById('message');
        message.textContent = "Cat's game!";
      }
    }
  }
}

// Create the game board tiles
const boardContainer = document.getElementById('board');
const tiles = [];
for (let i = 0; i < 3; i++) {
  const row = [];
  const rowContainer = document.createElement('div');
  rowContainer.className = 'row';
  
  for (let j = 0; j < 3; j++) {
    const tile = document.createElement('div');
    tile.className = 'cell';
    tile.addEventListener('click', handleTileClick.bind(null, i, j));
    rowContainer.appendChild(tile);
    row.push(tile);
  }

  boardContainer.appendChild(rowContainer);
  tiles.push(row);
}