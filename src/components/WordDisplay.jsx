export default function WordDisplay({ word, guessedLetters, isGameLost }) {
  // Letters can repeat within a word, so neither the letter nor the index
  // alone is a safe React key. Derive a stable per-tile id up front instead
  // of wiring the map index directly into the key prop.
  // console.log("WordDisplay rendered with word:", word, "guessedLetters:", guessedLetters, "isGameLost:", isGameLost);
  const tiles = word.split("").map((letter, position) => ({
    id: `${word}-${position}-${letter}`,
    letter,
  }));

  return (
    <div className="word" aria-label="Word to guess">
      {tiles.map(({ id, letter }) => {
        const isGuessed = guessedLetters.includes(letter);
        const shouldReveal = isGuessed || isGameLost;
        return (
          <span
            key={id}
            className={[
              "word__tile",
              isGuessed ? "word__tile--guessed" : "",
              isGameLost && !isGuessed ? "word__tile--missed" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {shouldReveal ? letter.toUpperCase() : ""}
          </span>
        );
      })}
    </div>
  );
}
