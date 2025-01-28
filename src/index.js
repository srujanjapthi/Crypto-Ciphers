import { Elgamal } from "./lib/ciphers/elgamal.js";
import crypto from "./lib/crypto.js";
import { generatePrimeSync } from "crypto";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Usage: node ./src/index.js <algorithm> <additional args>");
  process.exit(1);
}

let rsa = null;
let elgamal = null;

if (/^rsa/.test(args[0])) {
  if (args.length < 3) {
    console.log(
      "Usage: node ./src/index.js rsa-encrypt | rsa-decrypt <plain text> <p> <q>",
    );

    process.exit(1);
  }

  rsa = new crypto.RSA();
  rsa.generateKeys(Number(args[2]), Number(args[3]));
}

if (/^elgamal/.test(args[0])) {
  if (args.length < 1) {
    console.log("Usage: node ./src/index.js elgamal <plain text>");

    process.exit(1);
  }

  elgamal = new crypto.Elgamal();

  const prime = generatePrimeSync(10, { bigint: true });
  elgamal.generateKeys(Number(prime));
}

switch (args[0]) {
  case "manual":
    console.log("Manual:");
    console.log(
      "-------------------------------------------------------------------------------",
    );

    console.log(
      "1. Affine Encryption: node ./src/index.js affine-encrypt <plain text> <k1> <k2>",
    );
    console.log(
      "2. Affine Decryption: node ./src/index.js affine-decrypt <plain text> <k1> <k2>",
    );
    console.log(
      "3. Vigenere Encrypt: node ./src/index.js viginere-encrypt <plain text> <key>",
    );
    console.log(
      "4. Vigenere Decrypt: node ./src/index.js viginere-decrypt <plain text> <key>",
    );
    console.log(
      "5. Vigenere Decrypt: node ./src/index.js viginere-decrypt <plain text> <key>",
    );
    console.log(
      "6. RSA: node ./src/index.js rsa-encrypt | rsa-decrypt <plain text> <p> <q>",
    );
    console.log("7. Elgamal: node ./src/index.js elgamal <plain text>");
    console.log(
      "-------------------------------------------------------------------------------",
    );
    break;

  case "affine-encrypt":
    if (args.length < 4) {
      console.log(
        "Usage: node ./src/index.js affine-encrypt <plain text> <k1> <k2>",
      );

      process.exit(1);
    }

    console.log(
      crypto.affineEncrypt(args[1], Number(args[2]), Number(args[3])),
    );
    break;

  case "affine-decrypt":
    if (args.length < 4) {
      console.log(
        "Usage: node ./src/index.js affine-decrypt <cipher text> <k1> <k2>",
      );

      process.exit(1);
    }

    console.log(
      crypto.affineDecrypt(args[1], Number(args[2]), Number(args[3])),
    );
    break;

  case "viginere-encrypt":
    if (args.length < 3) {
      console.log(
        "Usage: node ./src/index.js viginere-encrypt <plain text> <key>",
      );

      process.exit(1);
    }

    console.log(crypto.viginereEncrypt(args[1], args[2]));
    break;

  case "viginere-decrypt":
    if (args.length < 3) {
      console.log(
        "Usage: node ./src/index.js viginere-decrypt <cipher text> <key>",
      );

      process.exit(1);
    }

    console.log(crypto.viginereDecrypt(args[1], args[2]));
    break;

  case "rsa-encrypt":
    console.log(rsa.encrypt(args[1]));
    break;

  case "rsa-decrypt":
    console.log(rsa.decrypt(args[1]));
    break;

  case "elgamal":
    const cipherText = elgamal.encrypt(args[1]);
    const plainText = elgamal.decrypt(cipherText);

    console.log("Cipher Text:", cipherText);
    console.log("Plain Text:", plainText);
    break;

  default:
    console.log("Invalid Algorithm");
    process.exit(1);
}
