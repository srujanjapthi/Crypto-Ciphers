import { affineDecrypt, affineEncrypt } from "./ciphers/affine.js";
import { Elgamal } from "./ciphers/elgamal.js";
import { RSA } from "./ciphers/rsa.js";
import { viginereDecrypt, viginereEncrypt } from "./ciphers/viginere.js";
import { euclidianMultiplicationInverse } from "./math/euclidian.js";

export default {
  affineDecrypt,
  affineEncrypt,
  viginereEncrypt,
  viginereDecrypt,
  euclidianMultiplicationInverse,
  RSA,
  Elgamal,
};
