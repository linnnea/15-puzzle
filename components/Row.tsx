import styled from 'styled-components';
import Column from './Column';

interface RowProps {
  row: number[];
  rowIndex: number;
  handleMovePiece: (x: number, y: number) => void;
  complete: boolean;
}

const RowContainer = styled.div`
  display: flex;
`;

const Row = ({ row, rowIndex, handleMovePiece, complete }: RowProps) => {
  return (
    <RowContainer>
      {row.map((column, c) => {
        const isEmpty = column === 0;
        return (
          <Column
            key={`${row}-${c}`}
            column={column}
            rowIndex={rowIndex}
            columnIndex={c}
            handleMovePiece={handleMovePiece}
            complete={complete}
            isEmpty={isEmpty}
          />
        );
      })}
    </RowContainer>
  );
};

export default Row;
