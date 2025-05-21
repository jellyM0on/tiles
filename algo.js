function runSimpleAlgo(board, goalBoard, isSimple) {
  let currentZeroCoord = findZero(board);
  let previousZeroCoord = null;
  let currentBoard = board;
  let boards = [{ board: board, zeroCoord: currentZeroCoord }];

  const initialScore = isSimple
    ? countMisplacedTiles(currentBoard, goalBoard)
    : computeManhattanDistance(currentBoard, goalBoard);

  if (initialScore === 0) {
    return boards;
  }

  while (true) {
    let zeroNeighbors = getZeroNeighbors(currentZeroCoord, previousZeroCoord);

    let nextBoard = generateNextBoard(
      goalBoard,
      currentBoard,
      currentZeroCoord,
      zeroNeighbors,
      isSimple
    );

    if (nextBoard) {
      boards.push({ board: nextBoard.board, zeroCoord: nextBoard.zero });
    }

    if (!nextBoard || nextBoard.score === 0) {
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

function computeManhattanDistance(currentBoard, goalBoard) {
  let totalDistance = 0;

  const goalPositions = {};
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      goalPositions[goalBoard[i][j]] = [i, j];
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const val = currentBoard[i][j];
      if (val !== 0) {
        const [gi, gj] = goalPositions[val];
        totalDistance += Math.abs(i - gi) + Math.abs(j - gj);
      }
    }
  }

  return totalDistance;
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

function generateNextBoard(
  goalBoard,
  board,
  currentZeroCoord,
  zeroNeighbors,
  isSimple
) {
  const [x0, y0] = currentZeroCoord;

  let bestBoards = [];
  let bestScore = Infinity;
  let candidateCoords = [];

  for (const [nx, ny] of zeroNeighbors) {
    const newBoard = board.map((row) => row.slice());
    [newBoard[x0][y0], newBoard[nx][ny]] = [newBoard[nx][ny], newBoard[x0][y0]];

    const score = isSimple
      ? countMisplacedTiles(newBoard, goalBoard)
      : computeManhattanDistance(newBoard, goalBoard);

    if (score < bestScore) {
      bestBoards = [newBoard];
      candidateCoords = [[nx, ny]];
      bestScore = score;
    } else if (score === bestScore) {
      bestBoards.push(newBoard);
      candidateCoords.push([nx, ny]);
    }
  }

  if (bestBoards.length === 0) return null;

  const index = Math.floor(Math.random() * bestBoards.length);
  return {
    board: bestBoards[index],
    score: bestScore,
    zero: candidateCoords[index],
  };
}

function isSolvable(arr) {
  const flat = arr.filter((n) => n !== 0);
  let inversions = 0;
  for (let i = 0; i < flat.length; i++) {
    for (let j = i + 1; j < flat.length; j++) {
      if (flat[i] > flat[j]) inversions++;
    }
  }
  return {
    solvable: inversions % 2 === 0,
    inversions: inversions,
  };
}

function generateSolvableBoard() {
  const goalBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ];
  const maxManhattanDistance = 5;

  while (true) {
    const values = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }

    const { solvable } = isSolvable(values);
    if (!solvable) continue;

    const board = [values.slice(0, 3), values.slice(3, 6), values.slice(6, 9)];

    const distance = computeManhattanDistance(board, goalBoard);
    if (distance <= maxManhattanDistance) {
      return board;
    }
  }
}
