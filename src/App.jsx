import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import StackPanel from "./components/StackPanel.jsx";
import WordDisplay from "./components/WordDisplay.jsx";
import Keyboard from "./components/Keyboard.jsx";
import GameStatus from "./components/GameStatus.jsx";
import Confetti from "./components/Confetti.jsx";
import { languages, maxWrongGuesses } from "./data/languages.js";
import { fallbackWords, loadWordList, pickRandomWord } from "./data/words.js";
import "./App.css";

export default function App() {
  const [wordList, setWordList] = useState(null);
  const [word, setWord] = useState(null);
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Load the full dictionary once on mount, then pick the first word.
  useEffect(() => {
    let cancelled = false;
    loadWordList().then((list) => {
      if (cancelled) return;
      setWordList(list);
      setWord(pickRandomWord(list));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Word list (and therefore the first word) loads asynchronously, so
  // render a lightweight loading state until it's ready.
  if (!word) {
    return (
      <div className="app">
        <Header />
        <output className="status status--idle">
          <span className="status__label">STATUS</span>
          <span className="status__value">LOADING WORD LIST…</span>
        </output>
      </div>
    );
  }

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !word.includes(letter)
  ).length;

  const isGameLost = wrongGuessCount >= maxWrongGuesses;
  const isGameWon = word
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameOver = isGameLost || isGameWon;
  const remainingGuesses = maxWrongGuesses - wrongGuessCount;

  function handleGuess(letter) {
    if (isGameOver || guessedLetters.includes(letter)) return;
    setGuessedLetters((prev) => [...prev, letter]);
  }

  function startNewGame() {
    setWord(pickRandomWord(wordList ?? fallbackWords));
    setGuessedLetters([]);
  }

  return (
    <div className="app">
      <Confetti trigger={isGameWon} />
      <Header />

      <main className="board">
        <StackPanel
          languages={languages}
          wrongGuessCount={wrongGuessCount}
          isGameOver={isGameOver}
          isWinner={isGameWon}
        />

        <div className="board__main">
          <GameStatus
            isGameOver={isGameOver}
            isWinner={isGameWon}
            isGameLost={isGameLost}
            remaining={remainingGuesses}
          />

          <WordDisplay
            word={word}
            guessedLetters={guessedLetters}
            isGameLost={isGameLost}
          />

          <Keyboard
            guessedLetters={guessedLetters}
            word={word}
            isGameOver={isGameOver}
            onGuess={handleGuess}
          />

          {isGameOver && (
            <button type="button" className="new-game" onClick={startNewGame}>
              $ new_game --reset
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
