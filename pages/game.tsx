import { useEffect } from 'react';
import { usePuzzle } from '@/contexts/puzzle-context';
import { getPuzzle } from '@/utils/puzzle-logic';

export default function Game() {
  const { puzzle, setPuzzle } = usePuzzle();

  useEffect(() => {
    setPuzzle(getPuzzle());
  }, []);

  return (
    <>
      <h1>Game screen</h1>
      <div
        style={{
          display: 'inline-block',
          backgroundColor: 'white'
        }}
      >
        {puzzle.map((row, r) => (
          <div
            key={r}
            style={{
              display: 'flex'
            }}
          >
            {row.map((column, c) => {
              const color = column === 0 ? 'transparent' : 'lightblue';
              return (
                <div
                  key={`${r}-${c}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    height: 50,
                    backgroundColor: color
                  }}
                >
                  {column !== 0 && <span>{column}</span>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
