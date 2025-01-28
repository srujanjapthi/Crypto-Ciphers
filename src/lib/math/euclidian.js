export function gcd(a, b) {
  if (b == 0) return a;
  return gcd(b, a % b);
}

export function euclidianMultiplicationInverse(n, a) {
  if (gcd(n, a) !== 1) return null;

  let r1 = n,
    r2 = a;
  let t1 = 0,
    t2 = 1;

  while (r2 > 0) {
    const q = Math.floor(r1 / r2);
    const r = r1 - q * r2;
    const t = t1 - q * t2;

    (r1 = r2), (r2 = r), (t1 = t2), (t2 = t);
  }

  return (t1 + n) % n;
}
