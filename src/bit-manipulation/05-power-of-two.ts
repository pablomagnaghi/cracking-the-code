// 05.05. Debugger
//
// Explain what the following code does: ((n & (n - 1)) == 0)
//
// A power of two in binary has exactly one bit set to 1 (e.g., 8 = 1000).
// Subtracting 1 from a power of two flips that bit to 0 and sets all lower
// bits to 1 (e.g., 7 = 0111). Therefore n & (n - 1) clears the lowest set
// bit of n. If n is a power of two, it has only one set bit, so the result
// is 0. If n is 0, the expression also evaluates to 0, but 0 is not a power
// of two, so an additional check (n > 0) is needed.
//
// Example:
//   n = 8  (binary 1000), n - 1 = 7 (binary 0111)
//   n & (n - 1) = 0000 -> true, 8 is a power of two
//
// Example:
//   n = 6  (binary 0110), n - 1 = 5 (binary 0101)
//   n & (n - 1) = 0100 -> false, 6 is not a power of two
//
// Example:
//   n = 1  (binary 0001), n - 1 = 0 (binary 0000)
//   n & (n - 1) = 0000 -> true, 1 is 2^0
//
// Constraints:
//   - n & (n - 1) clears the lowest set bit of n.
//   - The expression equals 0 only when n has at most one bit set (powers of two and zero).
//   - To check for a strict power of two, also verify n > 0.
//   - Works for 32-bit integer representations.

// Function that returns true if 'n' is a power of 2
export function isPowerOfTwo(n: number): boolean {
  // ((n & (n - 1)) === 0) checks if 'n' has exactly one bit set
  // This is true for all powers of two (e.g., 1, 2, 4, 8, 16, ...)
  // and also for 0b0 (zero), so we add n > 0 check
  return n > 0 && (n & (n - 1)) === 0;
}
