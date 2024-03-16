import {
  createContext,
  useState,
  ReactNode,
  FC,
  useContext,
  Dispatch,
  SetStateAction
} from 'react';

interface PuzzleContextType {
  puzzle: number[][];
  setPuzzle: Dispatch<SetStateAction<number[][]>>;
  moves: number;
  setMoves: Dispatch<SetStateAction<number>>;
  complete: boolean;
  setComplete: Dispatch<SetStateAction<boolean>>;
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
  const [puzzle, setPuzzle] = useState<number[][]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [complete, setComplete] = useState<boolean>(false);

  return (
    <PuzzleContext.Provider value={{ puzzle, setPuzzle, moves, setMoves, complete, setComplete }}>
      {children}
    </PuzzleContext.Provider>
  );
};
