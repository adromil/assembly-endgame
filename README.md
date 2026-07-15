# Assembly: Endgame

A word-guessing game (Hangman, reskinned). Every wrong guess pops a
programming language off the call stack — HTML first, then CSS, then
JavaScript, and so on down toward the metal. Guess the whole word before
the stack runs out, and Assembly survives.

Built with React + Vite.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Command           | What it does                          |
| ------------------ | -------------------------------------- |
| `npm run dev`       | Start the dev server with hot reload   |
| `npm run build`     | Build a production bundle into `dist/` |
| `npm run preview`   | Preview the production build locally   |
| `npm run lint`      | Run ESLint                             |

## Project structure

```
src/
  data/
    languages.js   # the call stack (order + colors + survivor flag)
    words.js        # word bank + random picker
    farewells.js     # dev-humor line shown when a language is retired
  components/
    Header.jsx
    StackPanel.jsx    # the call-stack visualization (signature UI element)
    WordDisplay.jsx
    Keyboard.jsx
    GameStatus.jsx
    Confetti.jsx      # small canvas confetti burst on a win, no dependency
  utils/
    confetti.js
  App.jsx             # game state + logic
  App.css
  index.css           # design tokens (colors, fonts)
```

## Word list

The game pulls from a ~200k-word dictionary at `public/words_dictionary.json`,
filtered from [dwyl/english-words](https://github.com/dwyl/english-words)
down to 4–9 letter alphabetic words, with a profanity blocklist applied. It's
served as a static file and fetched once on load — no live API call, no rate
limit. If the fetch fails for any reason, the game falls back to the small
built-in list in `src/data/words.js`.

Since the source is a raw dictionary rather than a common-word list, you'll
run into some fairly obscure words. To make the game easier, you can:

- Narrow the length range (e.g. 5–7 letters tends to skew more common)
- Regenerate the filtered file from a smaller/curated source
- Cross-reference against a word-frequency list and keep only the top N%

## Customizing

- **Add words to the fallback list:** edit `fallbackWords` in `src/data/words.js`.
- **Change the stack:** edit `src/data/languages.js`. The last entry with
  `survivor: true` is the one that never gets eliminated; the number of
  allowed wrong guesses is automatically `languages.length - 1`.
- **Change the palette:** edit the CSS custom properties at the top of
  `src/index.css`.

## License

MIT — do whatever you'd like with this.
