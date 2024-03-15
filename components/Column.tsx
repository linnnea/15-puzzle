import styled from 'styled-components';

interface ColumnProps {
  isEmpty: boolean;
  column: number;
}

const PuzzlePiece = styled.div<{ isEmpty: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: ${(props) => (props.isEmpty ? 'transparent' : 'black')};
  color: #fff;
  margin: 4px;
  border-radius: 8px;
`;

const Column = ({ isEmpty, column }: ColumnProps) => {
  return <PuzzlePiece isEmpty={isEmpty}>{!isEmpty && <span>{column}</span>}</PuzzlePiece>;
};

export default Column;
