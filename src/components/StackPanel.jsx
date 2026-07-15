import { getFarewellText } from "../data/farewells.js";

export default function StackPanel({ languages, wrongGuessCount, isGameOver, isWinner }) {
  // Only the most recently popped language shows its epitaph — showing
  // every past one at once made the panel unreadably tall and busy.
  const mostRecentPopIndex = wrongGuessCount - 1;

  return (
    <section className="stack" aria-label="Call stack of programming languages">
      <h2 className="stack__heading">CALL STACK</h2>
      <ul className="stack__list">
        {languages.map((lang, index) => {
          const isPopped = !lang.survivor && index < wrongGuessCount;
          const isNextToPop =
            !lang.survivor && index === wrongGuessCount && !isGameOver;
          const showFarewell = isPopped && index === mostRecentPopIndex;
          return (
            <li
              key={lang.name}
              className={[
                "stack__frame",
                isPopped ? "stack__frame--popped" : "",
                lang.survivor ? "stack__frame--survivor" : "",
                isNextToPop ? "stack__frame--current" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ "--frame-color": lang.color }}
            >
              <div className="stack__frame-row">
                <span className="stack__addr">{lang.addr}</span>
                <span className="stack__name">{lang.name}</span>
                {lang.survivor && (
                  <span className="stack__tag">{isWinner ? "WINNER" : "SAFE"}</span>
                )}
              </div>
              {showFarewell && (
                <p className="stack__farewell">{getFarewellText(lang.name)}</p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
