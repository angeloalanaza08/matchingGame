import React, { useCallback } from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Card from "./components/Cards";
import shuffle from "./utitilies/shuffle";
import Header from "./components/Header";
import useAppBadge from "./hooks/useAppBadge";

function useStopwatch() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    } else {
      setElapsedTime(0);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, setElapsedTime]);

  function startTimer() {
    setIsRunning(true);
  }

  function stopTimer() {
    setIsRunning(false);
  }

  // Return the necessary values and functions
  return {
    elapsedTime,
    startTimer,
    stopTimer,
    setElapsedTime,
  };
}

function App() {
  const [cards, setCards] = useState(shuffle); // Shuffle Cards
  const [pickOne, setPickOne] = useState(null); // First Selection
  const [pickTwo, setPickTwo] = useState(null); // Second Selection
  const [disabled, setDisabled] = useState(false); // Selection Delay
  const [wins, setWins] = useState(0); // Number of Wins
  const [setBadge, clearBadge] = useAppBadge(); // Handles App Badge
  const [isTimerStarted, setTimerStarted] = useState(false); // Timer Started Flag
  const { elapsedTime, startTimer, stopTimer, setElapsedTime } =
    useStopwatch(0); // Elapsed Time
  const [previousElapsedTime, setPreviousElapsedTime] = useState(0); // Previous Elapsed Time

  // Handle Card Selections
  const handleClick = (card) => {
    if (!disabled) {
      if (!isTimerStarted) {
        startTimer();
        setTimerStarted(true);
      }
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  // Cards Turning Handler
  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  // Resets the entire set when the user wins
  const handleNewGame = useCallback(() => {
    clearBadge();
    handleTurn();
    setCards(shuffle);
    setPreviousElapsedTime(elapsedTime);
    stopTimer(); // Stop the stopwatch
    setElapsedTime(0);
    setTimerStarted(false); // Reset timer started flag
    setWins(wins + 1);
  }, [clearBadge, elapsedTime, stopTimer, setElapsedTime, wins]);

  const resetGame = useCallback(() => {
    clearBadge();
    handleTurn();
    setCards(shuffle);
    setPreviousElapsedTime(elapsedTime);
    stopTimer(); // Stop the stopwatch
    setElapsedTime(0);
    setTimerStarted(false); // Reset timer started flag
    setWins(0);
  }, [clearBadge, elapsedTime, stopTimer, setElapsedTime]);

  useEffect(() => {
    let pickTimer;

    // Match Click Handler Logic
    if (pickOne && pickTwo) {
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        handleTurn();
      } else {
        setDisabled(true);
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 500);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo, setBadge, wins]);

  useEffect(() => {
    const checkWin = cards.filter((card) => !card.matched);
    if (cards.length && checkWin.length === 0 && isTimerStarted) {
      setWins(wins + 1);
      setBadge();
      handleTurn();
      handleNewGame();
      setCards(shuffle);
      setPreviousElapsedTime(elapsedTime);
      stopTimer(); // Stop the stopwatch
      if (!isTimerStarted) {
        setTimerStarted(true);
      }
    }
  }, [
    cards,
    setBadge,
    wins,
    isTimerStarted,
    elapsedTime,
    stopTimer,
    handleNewGame,
    setWins,
  ]);

  return (
    <>
      <Header handleNewGame={resetGame} wins={wins} elapsedTime={elapsedTime} />

      <div className="grid">
        {cards.map((card) => {
          const { image, matched } = card;

          return (
            <Card
              key={image.id}
              card={card}
              image={image}
              selected={card === pickOne || card === pickTwo || matched}
              onClick={() => handleClick(card)}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
