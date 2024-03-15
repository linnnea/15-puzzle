import styled from 'styled-components';
import Column from './Column';

interface RowProps {
  row: number[];
}

const RowContainer = styled.div`
  display: flex;
`;

const Row = ({ row }: RowProps) => {
  return (
    <RowContainer>
      {row.map((column, c) => {
        const isEmpty = column === 0;
        return <Column key={`${row}-${c}`} isEmpty={isEmpty} column={column} />;
      })}
    </RowContainer>
  );
};

export default Row;
