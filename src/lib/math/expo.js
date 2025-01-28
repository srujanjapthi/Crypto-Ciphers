export function fastModExponentiationInt(a, n, mod) {
  let ans = 1;

  while (n > 0) {
    if (n & 1) {
      ans *= a;
    }

    n >>= 1;
    a = a ** 2;
  }

  return mod ? ans % mod : ans;
}
