function runSimpleAlgo(board, goalBoard) {
  let currentZeroCoord = findZero(board);
  let previousZeroCoord = null;
  let currentBoard = board;
  let boards = [{ board: board, zeroCoord: currentZeroCoord }];

  while (true) {
    let zeroNeighbors = getZeroNeighbors(currentZeroCoord, previousZeroCoord);

    let nextBoard = generateNextBoard(
      goalBoard,
      currentBoard,
      currentZeroCoord,
      zeroNeighbors
    );

    if (nextBoard) {
      boards.push({ board: nextBoard.board, zeroCoord: nextBoard.zero });
    }

    if (!nextBoard || nextBoard.misplaced === 0) {
      break;
    }

    previousZeroCoord = currentZeroCoord;
    currentBoard = nextBoard.board;
    currentZeroCoord = nextBoard.zero;
  }

  return boards;
}

function findZero(board) {
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (board[x][y] === 0) {
        return [x, y];
      }
    }
  }
}

function getZeroNeighbors([x, y], previousZeroCoord) {
  const potentialMoves = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];

  return potentialMoves.filter(([nx, ny]) => {
    const isInBounds = nx >= 0 && nx < 3 && ny >= 0 && ny < 3;
    const isNotPrevious =
      previousZeroCoord === null ||
      nx !== previousZeroCoord[0] ||
      ny !== previousZeroCoord[1];
    return isInBounds && isNotPrevious;
  });
}

function generateNextBoard(goalBoard, board, currentZeroCoord, zeroNeighbors) {
  const [x0, y0] = currentZeroCoord;

  let bestBoards = [];
  let bestScore = Infinity;
  let candidateCoords = [];

  for (const [nx, ny] of zeroNeighbors) {
    const newBoard = board.map((row) => row.slice());

    [newBoard[x0][y0], newBoard[nx][ny]] = [newBoard[nx][ny], newBoard[x0][y0]];

    const misplacedCount = countMisplacedTiles(newBoard, goalBoard);

    if (misplacedCount < bestScore) {
      bestBoards = [newBoard];
      candidateCoords = [[nx, ny]];
      bestScore = misplacedCount;
    } else if (misplacedCount === bestScore) {
      bestBoards.push(newBoard);
      candidateCoords.push([nx, ny]);
    }
  }

  const index = Math.floor(Math.random() * bestBoards.length);
  return {
    board: bestBoards[index],
    misplaced: bestScore,
    zero: candidateCoords[index],
  };
}

function countMisplacedTiles(currentBoard, goalBoard) {
  let count = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const currentVal = currentBoard[i][j];
      const goalVal = goalBoard[i][j];

      if (currentVal !== 0 && currentVal !== goalVal) {
        count++;
      }
    }
  }

  return count;
}
