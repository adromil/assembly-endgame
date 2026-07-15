// The call stack, printed top (first pushed) to bottom.
// Each wrong guess pops the top-most surviving frame.
// The last frame, ASM, can never be popped — that's the joke and the title.
export const languages = [
  { name: "HTML", addr: "0x00", color: "#D9785F" },
  { name: "CSS", addr: "0x01", color: "#4F8FE8" },
  { name: "JavaScript", addr: "0x02", color: "#E8C23D" },
  { name: "Python", addr: "0x03", color: "#5FB8A0" },
  { name: "Ruby", addr: "0x04", color: "#C4453D" },
  { name: "Java", addr: "0x05", color: "#B0754F" },
  { name: "C++", addr: "0x06", color: "#7A8FD6" },
  { name: "C", addr: "0x07", color: "#8C93A6" },
  { name: "ASM", addr: "0x08", color: "#E8A33D", survivor: true },
];

// Max wrong guesses = every frame except the survivor.
export const maxWrongGuesses = languages.length - 1;
