// 6.10 Poison
//
// You have 1000 bottles of soda, one of which is poisoned.
// You have 10 test strips that can be used to detect poison.
// A single drop of poison will turn a test strip positive.
// You can only test once (results take 7 days).
// Find the poisoned bottle using the minimum number of test strips.

// Each bottle is assigned a binary number (0 to 999).
// Each of the 10 test strips represents one bit position.
// We drop soda from a bottle on every strip where the bit is set to 1.
// After 7 days, the strips that test positive represent a 1 in their bit position.
// Combining those bits gives us the index of the poisoned bottle.

export function findPoisonedBottle(testStrips: (bottleIndex: number) => number[]): number {
  // Get the strips that turned positive from the test
  const positiveStrips = testStrips(0); // simulate test

  // Calculate the poisoned bottle index from the set bits
  let poisonedBottle = 0;
  for (let i = 0; i < positiveStrips.length; i++) {
    poisonedBottle |= 1 << positiveStrips[i]; // set bit
  }

  return poisonedBottle;
}

export function simulateTestStrips(poisonedIndex: number): (bottleIndex: number) => number[] {
  return () => {
    const strips: number[] = [];

    for (let bit = 0; bit < 10; bit++) {
      if ((poisonedIndex & (1 << bit)) !== 0) {
        strips.push(bit); // that strip will test positive
      }
    }

    return strips;
  };
}
