// 6.5. Jugs of Water
//
// You have a 5-quart jug, a 3-quart jug, and an unlimited supply of water.
// How would you measure exactly 4 quarts?
// (You may not have any measuring markers on the jugs.)

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
