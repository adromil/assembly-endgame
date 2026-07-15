// A small curated bank used as a fallback if the full dictionary
// (public/words_dictionary.json) hasn't loaded yet or fails to load.
export const fallbackWords = [
  "react",
  "hooks",
  "component",
  "compiler",
  "register",
  "pointer",
  "kernel",
  "binary",
  "syntax",
  "runtime",
  "closure",
  "recursion",
  "algorithm",
  "variable",
  "function",
  "iterator",
  "callback",
  "promise",
  "async",
  "buffer",
  "cache",
  "stack",
  "heap",
  "thread",
  "socket",
  "debug",
  "opcode",
  "mnemonic",
  "assembler",
  "bytecode",
  "segment",
  "operand",
  "instruction",
  "interpreter",
  "framework",
  "library",
  "protocol",
  "database",
  "query",
  "index",
];

// Source: filtered from dwyl/english-words (words_dictionary.json),
// https://github.com/dwyl/english-words — trimmed to 4-9 letter
// alphabetic words with a profanity blocklist applied. Served as a
// static file from /public so there's no live network call during
// gameplay and no per-request rate limit.
const DICTIONARY_URL = "/words_dictionary.json";

let wordListPromise = null;

// Fetches and caches the full word list. Safe to call repeatedly —
// the fetch only happens once, subsequent calls reuse the same promise.
export function loadWordList() {
  if (!wordListPromise) {
    wordListPromise = fetch(DICTIONARY_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load word list: ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        console.warn("Falling back to built-in word list:", err);
        return fallbackWords;
      });
  }
  return wordListPromise;
}

export function pickRandomWord(list) {
  return list[Math.floor(Math.random() * list.length)];
}
