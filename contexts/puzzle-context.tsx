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

  return <PuzzleContext.Provider value={{ puzzle, setPuzzle }}>{children}</PuzzleContext.Provider>;
};
