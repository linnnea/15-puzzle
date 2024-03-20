import { useState } from 'react';
import { BOARD_SIZE } from '@/constants/constants';
import Column from './Column';
import Button from './Button';
import styled from 'styled-components';
import { GameLevel, usePuzzle } from '@/contexts/puzzle-context';
import {
  shuffle,
  canMoveTile,
  moveTile,
  isQuizSolved,
} from '@/utils/puzzle-logic';

const StyledBoard = styled.ul<{ $isGameLevelEasy: boolean }>`
  position: relative;
  z-index: 1;
  margin: 2rem 0;
  width: ${BOARD_SIZE - 15}px;
  height: ${BOARD_SIZE - 15}px;
  margin: ${(props) => (props.$isGameLevelEasy ? '2rem 0' : '2rem 0 -5rem 0')};
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  position: relative;
  z-index: 2;
`;

const Board = () => {
  const {
    tiles,
    setTiles,
    gameInProgress,
    setGameInProgress,
    tileSum,
    rowSum,
    gameLevel,
  } = usePuzzle();
  const [numberOfMoves, setNumberOfMoves] = useState(0);

  const pieceWidth = Math.round(BOARD_SIZE / rowSum);
  const pieceHeight = Math.round(BOARD_SIZE / rowSum);

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles, tileSum, rowSum);
    setTiles(shuffledTiles);
  };

  const moveTiles = (tileIndex: number) => {
    const emptySlot = tiles.indexOf(tiles.length - 1);
    if (canMoveTile(tileIndex, emptySlot, rowSum)) {
      const movedTiles = moveTile(tiles, tileIndex, emptySlot);
      setTiles(movedTiles);
      setNumberOfMoves((prevCount) => prevCount + 1);
    }
  };

  const shuffleClick = () => {
    shuffleTiles();
  };

  const handleMovePiece = (index: number) => {
    moveTiles(index);
  };

  const playerWins = isQuizSolved(tiles);
  const isGameLevelEasy = gameLevel === GameLevel.EASY;

  return (
    <>
      <h5>{numberOfMoves}</h5>
      <StyledBoard $isGameLevelEasy={isGameLevelEasy}>
        {tiles.map((tile, index) => (
          <Column
            key={tile}
            index={index}
            tile={tile}
            width={pieceWidth}
            height={pieceHeight}
            handleMovePiece={handleMovePiece}
          />
        ))}
      </StyledBoard>
      {playerWins && gameInProgress ? <p>Player wins 🎉</p> : null}
      {gameInProgress ? (
        <StyledButtons>
          <Button onClick={() => shuffleClick()} disabled={playerWins}>
            Shuffle
          </Button>
          <Button onClick={() => setGameInProgress(false)} variant='secondary'>
            Exit game
          </Button>
        </StyledButtons>
      ) : null}
    </>
  );
};

export default Board;
