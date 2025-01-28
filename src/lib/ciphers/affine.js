import { charSet } from "../../constants/chars.js";
import { euclidianMultiplicationInverse as multiplicationInverse } from "../math/euclidian.js";

const n = charSet.length;

export function affineEncrypt(plainText, k1, k2) {
  return plainText
    .split("")
    .map((char) => {
      const p = charSet.indexOf(char);
      const c = (k1 * p + k2) % n;

      return charSet[c];
    })
    .join("");
}

export function affineDecrypt(cipherText, k1, k2) {
  const k1Inverse = multiplicationInverse(n, k1);

  if (!k1Inverse) {
    throw new Error("Invalid Key");
  }

  return cipherText
    .split("")
    .map((char) => {
      const c = charSet.indexOf(char);
      const p = ((c - k2) * k1Inverse) % n;

      return charSet[p];
    })
    .join("");
}
