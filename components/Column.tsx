import { usePuzzle } from '@/contexts/puzzle-context';
import { isPieceInCorrectPosition } from '@/utils/puzzle-logic';
import styled from 'styled-components';

interface ColumnProps {
  column: number;
  rowIndex: number;
  columnIndex: number;
  handleMovePiece: (x: number, y: number) => void;
  complete: boolean;
  isEmpty: boolean;
}

const PuzzlePiece = styled.div<{ isEmpty: boolean; correctPosition: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: ${(props) =>
    props.isEmpty ? 'transparent' : props.correctPosition ? 'lightgreen' : '#000'};
  color: #fff;
  margin: 4px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
`;

const Column = ({ column, rowIndex, columnIndex, handleMovePiece, isEmpty }: ColumnProps) => {
  const { puzzle } = usePuzzle();
  const correctPosition = isPieceInCorrectPosition(puzzle, rowIndex, columnIndex);

  return (
    <PuzzlePiece
      isEmpty={isEmpty}
      onClick={() => handleMovePiece(rowIndex, columnIndex)}
      correctPosition={correctPosition}
    >
      {!isEmpty && <span>{column}</span>}
    </PuzzlePiece>
  );
};

export default Column;
