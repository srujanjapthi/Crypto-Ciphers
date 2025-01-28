import { charSet } from "../../constants/chars.js";

const n = charSet.length;

export const viginereEncrypt = (plainText, key) => {
  return plainText
    .split("")
    .map((char, index) => {
      const keyIndex = index % key.length;
      const keyChar = key[keyIndex];

      const charIndex = charSet.indexOf(char);
      const keyCharIndex = charSet.indexOf(keyChar);
      const cipherCharIndex = (charIndex + keyCharIndex) % n;

      return charSet[cipherCharIndex];
    })
    .join("");
};

export const viginereDecrypt = (cipherText, key) => {
  return cipherText
    .split("")
    .map((char, index) => {
      const keyIndex = index % key.length;
      const keyChar = key[keyIndex];

      const charIndex = charSet.indexOf(char);
      const keyCharIndex = charSet.indexOf(keyChar);
      const plainCharIndex = (charIndex - keyCharIndex + n) % n;

      return charSet[plainCharIndex];
    })
    .join("");
};
