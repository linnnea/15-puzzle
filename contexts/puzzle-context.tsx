import {
  createContext,
  useState,
  ReactNode,
  FC,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect
} from 'react';

export enum GameLevel {
  EASY = 0,
  HARD = 1
}

interface PuzzleContextType {
  tiles: number[];
  setTiles: Dispatch<SetStateAction<number[]>>;
  gameInProgress: boolean;
  setGameInProgress: Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  gameLevel: GameLevel;
  setGameLevel: Dispatch<SetStateAction<GameLevel>>;
  tileSum: number;
  setTileSum: Dispatch<SetStateAction<number>>;
  rowSum: number;
  setRowSum: Dispatch<SetStateAction<number>>;
}

const PuzzleContext = createContext<PuzzleContextType | undefined>(undefined);

export const usePuzzle = () => {
  const context = useContext(PuzzleContext);

  if (!context) {
    throw new Error('This hook must be used inside the PuzzleProvider');
  }
  return context;
};

interface PuzzleProviderProps {
  children: ReactNode;
}

export const PuzzleProvider: FC<PuzzleProviderProps> = ({ children }) => {
  const [gameInProgress, setGameInProgress] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [gameLevel, setGameLevel] = useState<GameLevel>(GameLevel.EASY);
  const [tileSum, setTileSum] = useState<number>(9);
  const [rowSum, setRowSum] = useState<number>(3);
  const [tiles, setTiles] = useState<number[]>([]);

  useEffect(() => {
    setTiles(Array.from(Array(tileSum).keys()));
  }, [tileSum]);

  return (
    <PuzzleContext.Provider
      value={{
        tiles,
        setTiles,
        gameInProgress,
        setGameInProgress,
        disabled,
        setDisabled,
        gameLevel,
        setGameLevel,
        tileSum,
        setTileSum,
        rowSum,
        setRowSum
      }}
    >
      {children}
    </PuzzleContext.Provider>
  );
};
