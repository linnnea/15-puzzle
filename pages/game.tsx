import { useEffect } from 'react';
import styled from 'styled-components';
import { usePuzzle } from '@/contexts/puzzle-context';
import { getPuzzle } from '@/utils/puzzle-logic';

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

const RowContainer = styled.div`
  display: flex;
`;

const PuzzlePiece = styled.div<{ isEmpty: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: ${(props) => (props.isEmpty ? 'transparent' : 'black')};
  color: #fff;
`;

export default function Game() {
  const { puzzle, setPuzzle } = usePuzzle();

  useEffect(() => {
    setPuzzle(getPuzzle());
  }, []);

  return (
    <GameWrapper>
      <h1>Game screen</h1>
      <PuzzleContainer>
        {puzzle.map((row, r) => (
          <RowContainer key={r}>
            {row.map((column, c) => {
              const isEmpty = column === 0;
              return (
                <PuzzlePiece key={`${r}-${c}`} isEmpty={isEmpty}>
                  {!isEmpty && <span>{column}</span>}
                </PuzzlePiece>
              );
            })}
          </RowContainer>
        ))}
      </PuzzleContainer>
    </GameWrapper>
  );
}
