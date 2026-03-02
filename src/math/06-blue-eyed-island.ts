// 06.06. Blue-Eyed Island
//
// A bunch of people are living on an island, when a visitor comes with a
// strange order: all blue-eyed people must leave the island as soon as
// possible. There will be a flight out at 8:00 pm every evening. Each
// person can see everyone else’s eye color, but they do not know their own
// (nor is anyone allowed to tell them). Additionally, they do not know how
// many people have blue eyes, although they do know that at least one
// person does. How many days will it take the blue-eyed people to leave?
//
// All inhabitants are perfect logicians. If a conclusion can be logically
// deduced, they will do it instantly.
//
// Solution:
//   If there is 1 blue-eyed person, they see no one else with blue eyes,
//   deduce it must be them, and leave on day 1.
//   If there are 2, each sees 1 other blue-eyed person. When that person
//   does not leave on day 1, each deduces they must also have blue eyes.
//   Both leave on day 2.
//   By induction, N blue-eyed people all leave on day N.
//
// Example:
//   Input: blueEyedCount = 3
//   Output: 3 (all three leave on day 3)
//
//   Input: blueEyedCount = 0
//   Output: 0 (no one leaves)
//
// Constraints:
//   - blueEyedCount >= 0
//   - All inhabitants are perfect logicians

export function daysUntilBlueEyedPeopleLeave(blueEyedCount: number): number {
  // If no one has blue eyes, no one leaves.
  if (blueEyedCount <= 0) return 0;

  // For N blue-eyed people:
  // - Each sees N-1 others and waits to see if they leave.
  // - When they don't leave on N-1 days, they realize they must have blue eyes.
  // - All leave on day N.
  return blueEyedCount;
}
