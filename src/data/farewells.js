// One line of dry, dev-flavored eulogy per language, keyed by name.
// Falls back to a generic line if a language isn't listed here.
const farewellByLanguage = {
  HTML: "HTML never had logic to lose. Rest easy.",
  CSS: "CSS is survived by three centering techniques, none of them obvious.",
  JavaScript: "JavaScript leaves behind 40 competing frameworks and no closure.",
  Python: "Python's indentation finally caught up with it.",
  Ruby: "Ruby exits gracefully, on principle.",
  Java: "Java is gone, but its 200-character class names live on.",
  "C++": "C++ segfaulted one too many times.",
  C: "C forgot to free itself. Memory leak confirmed.",
};

export function getFarewellText(languageName) {
  return (
    farewellByLanguage[languageName] ??
    `${languageName} has been popped from the call stack.`
  );
}
