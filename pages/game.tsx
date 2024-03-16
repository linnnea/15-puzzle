import { useEffect } from 'react';
import styled from 'styled-components';
import { usePuzzle } from '@/contexts/puzzle-context';
import { getPuzzle, movePiece, resetPuzzle } from '@/utils/puzzle-logic';
import Row from '@/components/Row';
import Link from 'next/link';
import Button from '@/components/Button';

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const PuzzleContainer = styled.div`
  background: #fff;
`;

export default function Game() {
  const { puzzle, setPuzzle, moves, setMoves, complete, setComplete } = usePuzzle();

  useEffect(() => {
    setPuzzle(getPuzzle());
  }, []);

  const handleMovePiece = (x: number, y: number) => {
    movePiece(puzzle, complete, moves, setPuzzle, setComplete, setMoves, x, y);
  };

  const handleResetPuzzle = () => {
    setTimeout(() => {
      resetPuzzle(setComplete, setPuzzle, setMoves);
    }, 1000);
  };

  const handleShufflePuzzle = () => {
    setPuzzle(getPuzzle());
  };

  return (
    <GameWrapper>
      <h1>{moves}</h1>
      <PuzzleContainer>
        {puzzle.map((row, r) => (
          <Row
            key={r}
            row={row}
            rowIndex={r}
            handleMovePiece={handleMovePiece}
            complete={complete}
          />
        ))}

        <Button onClick={handleShufflePuzzle}>Shuffle</Button>
        <Button href="/" onClick={handleResetPuzzle} variant="text">
          Quit
        </Button>
      </PuzzleContainer>
    </GameWrapper>
  );
}
