interface Puzzle {
  rowPosition: number;
  columnPosition: number;
}

export const movePiece = (
  puzzle: number[][],
  complete: boolean,
  moves: number,
  setPuzzle: (puzzle: number[][]) => void,
  setComplete: (complete: boolean) => void,
  setMoves: (moves: number) => void,
  rowPosition: number,
  columnPosition: number
): void => {
  if (!complete) {
    const emptySlot =
      checkNeighbours(puzzle, rowPosition, columnPosition) ||
      checkNeighbours(puzzle, rowPosition, columnPosition, 2);

    if (emptySlot) {
      const newPuzzle = puzzle.map((row) => row.slice());
      let moveIncrement = 1;

      const movePieceToTheRight = () => {
        newPuzzle[emptySlot.rowPosition][emptySlot.columnPosition] =
          puzzle[rowPosition][columnPosition + 1];
        newPuzzle[rowPosition][columnPosition + 1] = puzzle[rowPosition][columnPosition];
        newPuzzle[rowPosition][columnPosition] = 0;
        moveIncrement = Math.abs(columnPosition - emptySlot.columnPosition) > 1 ? 2 : 1;
      };

      const movePieceToTheLeft = () => {
        newPuzzle[emptySlot.rowPosition][emptySlot.columnPosition] =
          puzzle[rowPosition][columnPosition - 1];
        newPuzzle[rowPosition][columnPosition - 1] = puzzle[rowPosition][columnPosition];
        newPuzzle[rowPosition][columnPosition] = 0;
        moveIncrement = Math.abs(columnPosition - emptySlot.columnPosition) > 1 ? 2 : 1;
      };

      const movePieceDown = () => {
        newPuzzle[emptySlot.rowPosition][emptySlot.columnPosition] =
          puzzle[rowPosition + 1][columnPosition];
        newPuzzle[rowPosition + 1][columnPosition] = puzzle[rowPosition][columnPosition];
        newPuzzle[rowPosition][columnPosition] = 0;
        moveIncrement = Math.abs(rowPosition - emptySlot.rowPosition) > 1 ? 2 : 1;
      };

      const movePieceUp = () => {
        newPuzzle[emptySlot.rowPosition][emptySlot.columnPosition] =
          puzzle[rowPosition - 1][columnPosition];
        newPuzzle[rowPosition - 1][columnPosition] = puzzle[rowPosition][columnPosition];
        newPuzzle[rowPosition][columnPosition] = 0;
        moveIncrement = Math.abs(rowPosition - emptySlot.rowPosition) > 1 ? 2 : 1;
      };

      if (rowPosition === emptySlot.rowPosition && columnPosition < emptySlot.columnPosition) {
        movePieceToTheRight();
      } else if (
        rowPosition === emptySlot.rowPosition &&
        columnPosition > emptySlot.columnPosition
      ) {
        movePieceToTheLeft();
      } else if (
        columnPosition === emptySlot.columnPosition &&
        rowPosition < emptySlot.rowPosition
      ) {
        movePieceDown();
      } else if (
        columnPosition === emptySlot.columnPosition &&
        rowPosition > emptySlot.rowPosition
      ) {
        movePieceUp();
      }

      setPuzzle(newPuzzle);
      setMoves(moves + moveIncrement);
      checkCompletion(newPuzzle, setComplete);
    }
  }
};

export const isPieceInCorrectPosition = (
  puzzle: number[][],
  row: number,
  column: number
): boolean => {
  const targetValue = row * puzzle.length + column + 1;
  return puzzle[row][column] === targetValue;
};

export const checkCompletion = (
  puzzle: number[][],
  setComplete: (complete: boolean) => void
): void => {
  if (flattenArray(puzzle).join('') === '123456780') {
    setComplete(true);
  }
};

export const checkNeighbours = (
  puzzle: number[][],
  rowPosition: number,
  columnPosition: number,
  d = 1
): Puzzle | undefined => {
  const neighbours: (Puzzle | undefined)[] = [];

  if (puzzle[rowPosition][columnPosition] !== 0) {
    neighbours.push(
      puzzle[rowPosition - d] && puzzle[rowPosition - d][columnPosition] === 0
        ? { rowPosition: rowPosition - d, columnPosition: columnPosition }
        : undefined
    );
    neighbours.push(
      puzzle[rowPosition][columnPosition + d] === 0
        ? { rowPosition: rowPosition, columnPosition: columnPosition + d }
        : undefined
    );
    neighbours.push(
      puzzle[rowPosition + d] && puzzle[rowPosition + d][columnPosition] === 0
        ? { rowPosition: rowPosition + d, columnPosition: columnPosition }
        : undefined
    );
    neighbours.push(
      puzzle[rowPosition][columnPosition - d] === 0
        ? { rowPosition: rowPosition, columnPosition: columnPosition - d }
        : undefined
    );
  }

  const emptySlot = neighbours.find((el) => typeof el === 'object');

  return emptySlot;
};

export const resetPuzzle = (
  setComplete: (complete: boolean) => void,
  setPuzzle: (puzzle: number[][]) => void,
  setMoves: (moves: number) => void
): void => {
  setComplete(false);
  setPuzzle(getPuzzle());
  setMoves(0);
};

export const getShuffledPuzzle = (): number[][] => {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5);

  return [values.slice(0, 3), values.slice(3, 6), values.slice(6, 9)];
};

export const flattenArray = (arr: number[][]): number[] => {
  return arr.reduce((flatArr, subArr) => flatArr.concat(subArr), []);
};

export const getInversionsCount = (arr: number[][]): number => {
  const flattenedArray = flattenArray(arr).filter((n) => n !== 0);

  const inversions: number[] = [];

  for (let i = 0; i < flattenedArray.length - 1; i++) {
    const currentValue = flattenedArray[i];
    const currentInversions = flattenedArray.filter((val, j) => i < j && val < currentValue);
    inversions.push(currentInversions.length);
  }

  const inversionsCount = inversions.reduce((total, val) => total + val, 0);

  return inversionsCount;
};

export const isSolvable = (puzzle: number[][]): boolean => {
  return getInversionsCount(puzzle) % 2 === 0;
};

export const getPuzzle = (): number[][] => {
  const generateSolvablePuzzle = (): number[][] => {
    const puzzle = getShuffledPuzzle();
    return isSolvable(puzzle) ? puzzle : generateSolvablePuzzle();
  };

  return generateSolvablePuzzle();
};
