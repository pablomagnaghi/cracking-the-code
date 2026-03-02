// 06.10. Poison
//
// You have 1000 bottles of soda, and exactly one is poisoned. You have 10
// test strips which can be used to detect poison. A single drop of poison
// will turn the test strip positive permanently. You can put any number of
// drops on a test strip at once, and you can reuse a test strip as many
// times as you'd like (as long as the results are negative). However, you
// can only run tests once per day and it takes seven days to return a
// result. How would you figure out the poisoned bottle in as few days as
// possible?
//
// Optimized Approach (1 round / 7 days):
//   Assign each bottle an index from 0 to 999. Represent the index in
//   binary (10 bits suffice for 0-1023). For each bottle, place a drop on
//   every test strip corresponding to a 1-bit in its binary representation.
//   After 7 days, the pattern of positive strips encodes the binary index
//   of the poisoned bottle.
//
// Example:
//   Poisoned bottle = #5 (binary: 0000000101)
//   Strips 0 and 2 turn positive.
//   Decode: 2^0 + 2^2 = 1 + 4 = 5
//
//   Poisoned bottle = #999 (binary: 1111100111)
//   Strips 0, 1, 2, 5, 6, 7, 8, 9 turn positive.
//
// Constraints:
//   - 1000 bottles (indices 0 to 999)
//   - 10 test strips
//   - Results take 7 days

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
