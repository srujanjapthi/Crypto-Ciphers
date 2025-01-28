import { charSet } from "../../constants/chars.js";
import { euclidianMultiplicationInverse, gcd } from "../math/euclidian.js";
import { fastModExponentiationInt } from "../math/expo.js";

const charsLen = charSet.length;

export class RSA {
  constructor() {
    this.publicKey = null;
    this.privateKey = null;
  }

  generateKeys(p, q) {
    const n = p * q;
    const phi = (p - 1) * (q - 1);

    let e;
    for (e = 3; e < phi; e += 2) {
      if (gcd(e, phi) === 1) {
        break;
      }
    }

    const d = (euclidianMultiplicationInverse(phi, e) + phi) % phi;
    if (!d)
      throw new Error("Failed to compute modular inverse. Check your primes.");

    this.publicKey = { e, n };
    this.privateKey = { d, n };
  }

  encrypt(plainText) {
    const { e, n } = this.publicKey;

    if (!e || !n) throw new Error("Public key not set. Generate keys first.");

    return plainText
      .split("")
      .map((char) => {
        const charIndex = charSet.indexOf(char);
        if (charIndex === -1)
          throw new Error(`Character "${char}" not in charSet.`);

        return fastModExponentiationInt(charIndex, e, n);
      })
      .join(" ");
  }

  decrypt(cipherText) {
    const { d, n } = this.privateKey;
    if (!d || !n) throw new Error("Private key not set. Generate keys first.");

    return cipherText
      .split(" ")
      .map((char) => {
        const plainCharIndex = fastModExponentiationInt(Number(char), d, n);

        if (plainCharIndex < 0 || plainCharIndex >= charsLen) {
          throw new Error(`Decryption index "${plainCharIndex}" is invalid.`);
        }

        return charSet[plainCharIndex];
      })
      .join("");
  }
}
