// Tiles are numbered from 1 and up
// Leave room for 1 empty spot
// Possible to move tile when clicking on one of them
// Initial state is shuffled
// If puzzle’s solved return ’Player wins’ or similar message

export const getPuzzle = (): number[][] => {
  let puzzle = getShuffledPuzzle();

  return puzzle;
};

export const getShuffledPuzzle = (): number[][] => {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const rowOne: number[] = [];
  const rowTwo: number[] = [];
  const rowThree: number[] = [];

  while (values.length) {
    const random = Math.floor(Math.random() * values.length);

    if (rowOne.length < 3) {
      rowOne.push(values.splice(random, 1)[0]);
    } else if (rowTwo.length < 3) {
      rowTwo.push(values.splice(random, 1)[0]);
    } else {
      rowThree.push(values.splice(random, 1)[0]);
    }
  }

  return [rowOne, rowTwo, rowThree];
};
