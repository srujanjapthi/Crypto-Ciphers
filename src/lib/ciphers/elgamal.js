// import { charSet } from "../../constants/chars.js";
// import { fastModExponentiationInt } from "../math/expo.js";

// export class Elgamal {
//   constructor() {
//     this.publicKey = null;
//     this.privateKey = null;
//   }

//   generateKeys(p) {
//     const d = Math.floor(Math.random() * (p - 1)) + 1;
//     const e1 = Math.floor(Math.random() * (p - 2)) + 1;
//     const e2 = fastModExponentiationInt(e1, d, p);

//     this.publicKey = { e1, e2, p };
//     this.privateKey = { d, p };
//   }

//   encrypt(plainText) {
//     const r = Math.floor(Math.random() * (this.publicKey.p - 2)) + 1;
//     const { e1, e2, p } = this.publicKey;

//     return {
//       c1: fastModExponentiationInt(e1, r, p).toString(),
//       c2: plainText
//         .split("")
//         .map((char) => {
//           const charIndex = charSet.indexOf(char);

//           console.log(charIndex);

//           if (charIndex === -1) {
//             throw new Error(`Character "${char}" not in charSet.`);
//           }

//           return (fastModExponentiationInt(e2, r, p) * charIndex) % p;
//         })
//         .join(" "),
//     };
//   }

//   decrypt(cipherText) {
//     const c1 = Number(cipherText.c1);
//     const c2 = cipherText.c2;
//     const { d, p } = this.privateKey;

//     return c2
//       .split(" ")
//       .map((char) => {
//         const charIndex =
//           (Number(char) * fastModExponentiationInt(c1, p - d - 1)) % p;

//           console.log(charIndex);

//         return charSet[charIndex];
//       })
//       .join("");
//   }
// }

// const elgamal = new Elgamal();

// elgamal.generateKeys(97);

// console.log(elgamal.publicKey);
// console.log(elgamal.privateKey);

// console.log();

// const cipherText = elgamal.encrypt("Hello World");
// console.log();
// const plainText = elgamal.decrypt(cipherText);

// console.log(cipherText);

// console.log(plainText);

import { charSet } from "../../constants/chars.js";

export class Elgamal {
  constructor() {
    this.publicKey = null;
    this.privateKey = null;
  }

  modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;

    while (exp > 0) {
      if (exp % 2 === 1) result = (result * base) % mod;
      base = (base * base) % mod;
      exp = Math.floor(exp / 2);
    }

    return result;
  }

  modInverse(a, mod) {
    let m0 = mod,
      t,
      q;
    let x0 = 0,
      x1 = 1;

    if (mod === 1) return 0;

    while (a > 1) {
      q = Math.floor(a / mod);
      t = mod;
      mod = a % mod;
      a = t;
      t = x0;
      x0 = x1 - q * x0;
      x1 = t;
    }

    if (x1 < 0) x1 += m0;
    return x1;
  }

  generateKeys(p) {
    p = Number(p);

    const d = Math.floor(Math.random() * (p - 2)) + 1;
    const e1 = Math.floor(Math.random() * (p - 2)) + 1;
    const e2 = this.modExp(e1, d, p);

    this.publicKey = { e1, e2, p };
    this.privateKey = { d };
  }

  encrypt(plainText) {
    const { e1, e2, p } = this.publicKey;
    const r = Math.floor(Math.random() * (p - 1)) + 1;

    const c1 = this.modExp(e1, r, p);
    const c2 = plainText
      .split("")
      .map((char) => {
        const charIndex = charSet.indexOf(char);
        if (charIndex === -1)
          throw new Error(`Character "${char}" not in charSet.`);
        return (charIndex * this.modExp(e2, r, p)) % p;
      })
      .join(" ");

    return { c1, c2 };
  }

  decrypt(cipherText) {
    const { c1, c2 } = cipherText;
    const { d } = this.privateKey;
    const { p } = this.publicKey;

    const s = this.modExp(c1, d, p);
    const sInv = this.modInverse(s, p);

    return c2
      .split(" ")
      .map((char) => {
        const encryptedChar = Number(char);
        const charIndex = (encryptedChar * sInv) % p;

        if (charIndex < 0 || charIndex >= charSet.length) {
          throw new Error(`Decrypted index "${charIndex}" is out of bounds.`);
        }

        return charSet[charIndex];
      })
      .join("");
  }
}
