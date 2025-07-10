// 5.4 *Next Number*
//
// Given a positive integer, print the next smallest and the next largest number
// that have the same number of 1 bits in their binary representation.
//
// Example:
// Input: 13948 (in binary: 11011001111100)
// Output:
//   Next larger: 13967  (11011010001111)
//   Next smaller: 13946 (11011001111010)

export function getNext(n: number): number | undefined {
  let c = n;
  let c0 = 0;
  let c1 = 0;

  // Count trailing 0s (c0)
  while ((c & 1) === 0 && c !== 0) {
    c0++;
    c >>= 1;
  }

  // Count 1s following trailing 0s (c1)
  while ((c & 1) === 1) {
    c1++;
    c >>= 1;
  }

  // If n == 11..1100..00 or all 1s on the right, no bigger number possible
  if (c0 + c1 === 31 || c0 + c1 === 0) return undefined;

  const p = c0 + c1; // Position of rightmost non-trailing 0

  // Flip rightmost non-trailing 0 (position p)
  n |= 1 << p;

  // Clear all bits to the right of p
  n &= ~((1 << p) - 1);

  // Insert (c1-1) ones on the right
  n |= (1 << (c1 - 1)) - 1;

  return n;
}

export function getPrev(n: number): number | undefined {
  let temp = n;
  let c0 = 0;
  let c1 = 0;

  // Count trailing 1s (c1)
  while ((temp & 1) === 1) {
    c1++;
    temp >>= 1;
  }

  // If n is a sequence of 0s followed by 1s, no smaller number possible
  if (temp === 0) return undefined;

  // Count 0s before the trailing 1s (c0)
  while ((temp & 1) === 0 && temp !== 0) {
    c0++;
    temp >>= 1;
  }

  const p = c0 + c1; // Position of rightmost non-trailing 1

  // Clear bits from p onwards
  n &= ~0 << (p + 1);

  // Sequence of (c1+1) ones
  const mask = (1 << (c1 + 1)) - 1;

  // Insert the ones at position (c0 - 1)
  n |= mask << (c0 - 1);

  return n;
}
