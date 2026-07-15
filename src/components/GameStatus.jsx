export default function GameStatus({ isGameOver, isWinner, isGameLost, remaining }) {
  if (!isGameOver) {
    return (
      <output className="status status--idle">
        <span className="status__label">STATUS</span>
        <span className="status__value">
          RUNNING — {remaining} {remaining === 1 ? "guess" : "guesses"} left
        </span>
      </output>
    );
  }

  if (isWinner) {
    return (
      <output className="status status--win">
        <span className="status__label">STATUS</span>
        <span className="status__value">EXIT 0 — you kept the stack alive</span>
      </output>
    );
  }

  if (isGameLost) {
    return (
      <output className="status status--lose">
        <span className="status__label">STATUS</span>
        <span className="status__value">
          SEGFAULT — every language retired. Only Assembly(ASM) was left.
        </span>
      </output>
    );
  }

  return null;
}
