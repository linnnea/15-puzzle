export const getIndex = (row: number, col: number, rowSum: number): number => {
  return parseInt(row.toString(), 10) * rowSum + parseInt(col.toString(), 10);
};

export const getNumberPosition = (index: number, rowSum: number): { row: number; col: number } => {
  return {
    row: Math.floor(index / rowSum),
    col: index % rowSum
  };
};

export const getVisualPosition = (
  row: number,
  col: number,
  width: number,
  height: number
): { x: number; y: number } => {
  return {
    x: col * width - 5,
    y: row * height - 5
  };
};

export const shuffle = (tiles: number[], tileSum: number, rowSum: number): number[] => {
  const shuffledTiles = [
    ...tiles.filter((t) => t !== tiles.length - 1).sort(() => Math.random() - 0.5),
    tiles.length - 1
  ];

  return isQuizSolvable(shuffledTiles, tileSum) && !isQuizSolved(shuffledTiles)
    ? shuffledTiles
    : shuffle(shuffledTiles, rowSum, tileSum);
};

export const canMoveTile = (srcIndex: number, destIndex: number, rowSum: number): boolean => {
  const { row: srcRow, col: srcCol } = getNumberPosition(srcIndex, rowSum);
  const { row: destRow, col: destCol } = getNumberPosition(destIndex, rowSum);
  return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
};

export const moveTile = (tiles: number[], src: number, dest: number): number[] => {
  const tilesResult = [...tiles];
  [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
  return tilesResult;
};

export const isQuizSolvable = (tiles: number[], tileSum: number): boolean => {
  let item = 1;
  for (let i = 1, l = tileSum - 1; i <= l; i++) {
    for (let j = i + 1, m = l + 1; j <= m; j++) {
      item *= (tiles[i - 1] - tiles[j - 1]) / (i - j);
    }
  }
  return Math.round(item) === 1;
};

export const isQuizSolved = (tiles: number[]): boolean => {
  for (let i = 0, l = tiles.length; i < l; i++) {
    if (tiles[i] !== i) {
      return false;
    }
  }
  return true;
};
