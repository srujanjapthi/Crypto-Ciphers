export function fastModExponentiationInt(a, n, mod) {
  let ans = 1;

  while (n > 0) {
    if (n & 1) {
      ans = (ans * a) % mod;
    }

    n >>= 1;
    a = a ** 2 % mod;
  }

  return ans;
}
