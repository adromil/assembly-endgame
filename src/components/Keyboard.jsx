const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

export default function Keyboard({ guessedLetters, word, isGameOver, onGuess }) {
  return (
    <fieldset className="keyboard" aria-label="Letter keyboard">
      {ROWS.map((row) => (
        <div className="keyboard__row" key={row[0]}>
          {row.map((letter) => {
            const isGuessed = guessedLetters.includes(letter);
            const isCorrect = isGuessed && word.includes(letter);
            const isWrong = isGuessed && !word.includes(letter);
            return (
              <button
                key={letter}
                type="button"
                className={[
                  "keyboard__key",
                  isCorrect ? "keyboard__key--correct" : "",
                  isWrong ? "keyboard__key--wrong" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={isGuessed || isGameOver}
                aria-label={`Letter ${letter}`}
                aria-pressed={isGuessed}
                onClick={() => onGuess(letter)}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </fieldset>
  );
}
