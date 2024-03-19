import Head from 'next/head';
import styled, { keyframes } from 'styled-components';
import Button from '@/components/Button';
import Board from '@/components/Board';
import { shuffle } from '@/utils/logic';
import { useState } from 'react';
import { GameLevel, usePuzzle } from '@/contexts/puzzle-context';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Main = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-bottom: 0.9rem;
  }
`;

const StyledLabel = styled.label`
  margin-bottom: 1rem;
`;

const StyledRadioInput = styled.input`
  margin-right: 10px;
`;

export default function Home() {
  const {
    tiles,
    gameInProgress,
    setGameInProgress,
    setDisabled,
    setTiles,
    tileSum,
    setTileSum,
    rowSum,
    setRowSum,
    gameLevel,
    setGameLevel
  } = usePuzzle();

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles, rowSum, tileSum);
    setTiles(shuffledTiles);
  };

  const startClick = () => {
    shuffleTiles();
    setGameInProgress(true);
    setDisabled(false);
  };

  const handleLevelChange = (level: GameLevel) => {
    setGameLevel(level);
    if (level === GameLevel.EASY) {
      setTileSum(9);
      setRowSum(3);
    } else if (level === GameLevel.HARD) {
      setTileSum(15);
      setRowSum(5);
    }
  };

  return (
    <>
      <Head>
        <title>Grebban Puzzle</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Intro>
          <h1>Grebban puzzle</h1>
          {gameInProgress ? (
            <Board />
          ) : (
            <Intro>
              <p>Select level:</p>
              <label>
                <StyledRadioInput
                  type="radio"
                  name="difficulty"
                  value={GameLevel.EASY}
                  checked={gameLevel === GameLevel.EASY}
                  onChange={() => handleLevelChange(GameLevel.EASY)}
                />
                Easy
              </label>

              <StyledLabel>
                <StyledRadioInput
                  type="radio"
                  name="difficulty"
                  value={GameLevel.HARD}
                  checked={gameLevel === GameLevel.HARD}
                  onChange={() => handleLevelChange(GameLevel.HARD)}
                />
                Hard
              </StyledLabel>
              <Button onClick={() => startClick()}>Let&apos;s play</Button>
            </Intro>
          )}
        </Intro>
      </Main>
    </>
  );
}
