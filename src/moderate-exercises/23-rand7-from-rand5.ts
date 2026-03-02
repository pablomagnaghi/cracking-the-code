// 16.23. Rand7 from Rand5
//
// Implement a method rand7() given rand5(). That is, given a method that
// generates a random number between 1 and 5 (inclusive), write a method that
// generates a random number between 1 and 7 (inclusive).
//
// The key challenge is ensuring that each value from 1 to 7 is returned with
// equal probability (uniform distribution). You may only use rand5() as your
// source of randomness -- no other random functions are allowed.
//
// Example:
//   rand5() returns uniformly random values in {1, 2, 3, 4, 5}
//   rand7() must return uniformly random values in {1, 2, 3, 4, 5, 6, 7}
//
// Approach:
//   Use rejection sampling. Call rand5() twice to create a uniform distribution
//   over 25 outcomes (a 5x5 grid). Map the first 21 outcomes to values 1-7
//   (since 21 is the largest multiple of 7 <= 25), and reject the remaining 4.
//
// Constraints:
//   - Must produce a perfectly uniform distribution over {1, 2, 3, 4, 5, 6, 7}
//   - May only use rand5() as the source of randomness
//   - The algorithm is not guaranteed to terminate in bounded time, but
//     terminates with probability 1 (expected ~1.19 iterations per call)

function rand5(): number {
  // Simulate rand5 using Math.random()
  return Math.floor(Math.random() * 5) + 1;
}

export function rand7(): number {
  while (true) {
    // Generate a number in [1..25] by combining two calls to rand5()
    // For example, treat first rand5() as row and second as column in 5x5 grid
    const row = rand5();
    const col = rand5();
    const num = (row - 1) * 5 + col; // uniform 1..25

    // Only use numbers 1 to 21 (21 is multiple of 7)
    if (num <= 21) {
      // Map 1..21 to 1..7 uniformly
      return ((num - 1) % 7) + 1;
    }
    // Otherwise, reject and retry (rejection sampling)
  }
}
