// 16.23 Rand7 from Rand5
//
// Problem:
// Given a function rand5() that generates a random integer from 1 to 5 (inclusive),
// implement a function rand7() that generates a random integer from 1 to 7 with equal probability.
// Use only rand5() and no other random source.

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
