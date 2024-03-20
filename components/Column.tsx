import { useSpring, animated } from '@react-spring/web';
import styled from 'styled-components';
import { usePuzzle } from '@/contexts/puzzle-context';
import { getNumberPosition, getVisualPosition } from '@/utils/puzzle-logic';
import { FC } from 'react';
interface ColumnProps {
  tile: number;
  index: number;
  width: number;
  height: number;
  handleMovePiece: (index: number) => void;
}

const StyledColumn = styled(animated.li)<{
  $isCorrectTile: boolean;
  $isEmptySlot: boolean;
  $rowSum: number;
}>`
  display: grid;
  place-items: center;
  list-style-type: none;
  position: absolute;
  width: calc(100% / ${(props) => props.$rowSum});
  height: calc(100% / ${(props) => props.$rowSum});
  background: ${(props) => (props.$isCorrectTile ? '#21a4ff' : '#d3d3d3')};
  color: ${(props) => (props.$isCorrectTile ? '#fff' : '#000')};
  opacity: ${(props) => (props.$isEmptySlot ? 0 : 1)};
  border-radius: ${(props) => (props.$isEmptySlot ? 'unset' : '1rem')};
  cursor: ${(props) => (props.$isEmptySlot ? '' : 'pointer')};
  user-select: none;
`;

const Column: FC<ColumnProps> = ({
  tile,
  index,
  width,
  height,
  handleMovePiece,
}) => {
  const { tileSum, rowSum } = usePuzzle();
  const { row, col } = getNumberPosition(index, rowSum);
  const visualPos = getVisualPosition(row, col, width, height);

  const motionStyle = useSpring({
    to: {
      transform: `translate3d(${visualPos.x}px, ${visualPos.y}px, 0)`,
    },
    config: {
      tension: 170,
      friction: 26,
    },
  });

  const isCorrectTile = tile === index;
  const isEmptySlot = tile === tileSum - 1;

  return (
    <StyledColumn
      style={{ ...motionStyle }}
      $isCorrectTile={isCorrectTile}
      $isEmptySlot={isEmptySlot}
      $rowSum={rowSum}
      onClick={() => handleMovePiece(index)}
    >
      {tile + 1}
    </StyledColumn>
  );
};

export default Column;
