// 05.05. Debugger (Book-only)
//
// Explain what the following code does:
// ((n & (n - 1)) === 0)
// It checks if n is a power of two (or zero). A power of two has exactly one bit set,
// and subtracting 1 flips all lower bits, so the AND result is 0.

// Function that returns true if 'n' is a power of 2
export function isPowerOfTwo(n: number): boolean {
  // ((n & (n - 1)) === 0) checks if 'n' has exactly one bit set
  // This is true for all powers of two (e.g., 1, 2, 4, 8, 16, ...)
  // and also for 0b0 (zero), so we add n > 0 check
  return n > 0 && (n & (n - 1)) === 0;
}
