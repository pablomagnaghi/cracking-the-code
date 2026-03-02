// 06.05. Jugs of Water
//
// You have a five-quart jug, a three-quart jug, and an unlimited supply of
// water (but no measuring cups). How would you come up with exactly four
// quarts of water? Note that the jugs are oddly shaped, such that filling
// up exactly "half" of the jug would be impossible.
//
// Solution Steps:
//   1. Fill the 3-quart jug.                         (5q: 0, 3q: 3)
//   2. Pour the 3-quart jug into the 5-quart jug.    (5q: 3, 3q: 0)
//   3. Fill the 3-quart jug again.                    (5q: 3, 3q: 3)
//   4. Pour 3q into 5q until full (2 quarts fit).     (5q: 5, 3q: 1)
//   5. Empty the 5-quart jug.                         (5q: 0, 3q: 1)
//   6. Pour the remaining 1 quart into the 5q jug.    (5q: 1, 3q: 0)
//   7. Fill the 3-quart jug again.                    (5q: 1, 3q: 3)
//   8. Pour 3q into 5q.                               (5q: 4, 3q: 0)
//
// Example:
//   Input: (no input -- deterministic procedure)
//   Output: sequence of jug states ending with { jug5: 4, jug3: 0 }
//
// Constraints:
//   - Only two jugs available: 5-quart and 3-quart
//   - No measuring marks on jugs
//   - Unlimited water supply

// We simulate the process step-by-step as a sequence of jug operations.

type JugState = {
  jug5: number;
  jug3: number;
};

export function measureFourQuarts(): JugState[] {
  const steps: JugState[] = [];

  let jug5 = 0;
  let jug3 = 0;

  steps.push({ jug5, jug3 });

  // Step 1: Fill the 3-quart jug
  jug3 = 3;
  steps.push({ jug5, jug3 });

  // Step 2: Pour 3-quart jug into 5-quart jug
  jug5 += jug3;
  jug3 = 0;
  steps.push({ jug5, jug3 });

  // Step 3: Fill the 3-quart jug again
  jug3 = 3;
  steps.push({ jug5, jug3 });

  // Step 4: Pour 3-quart jug into 5-quart jug (only 2 quarts will fit)
  const availableSpace = 5 - jug5;
  jug5 += availableSpace;
  jug3 -= availableSpace;
  steps.push({ jug5, jug3 });

  // Step 5: Empty the 5-quart jug
  jug5 = 0;
  steps.push({ jug5, jug3 });

  // Step 6: Pour remaining 1 quart from 3-quart jug into 5-quart jug
  jug5 = jug3;
  jug3 = 0;
  steps.push({ jug5, jug3 });

  // Step 7: Fill the 3-quart jug again
  jug3 = 3;
  steps.push({ jug5, jug3 });

  // Step 8: Pour 3-quart jug into 5-quart jug → Now 4 quarts in 5-quart jug
  jug5 += jug3;
  jug3 = 0;
  steps.push({ jug5, jug3 });

  return steps;
}
