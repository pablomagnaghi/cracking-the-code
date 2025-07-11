// 6.6. Blue-Eyed Island
//
// There is a group of people on an island. All the inhabitants are perfect logicians.
// Each person has either blue or brown eyes. They can see everyone else’s eye color, but not their own.
// They are not allowed to tell each other what they see.
// Once a day, a ferry comes. Any islander who has discovered they have blue eyes must leave that day.
// The islanders all know the rules and that all others are perfect logicians.
// If there are N people with blue eyes, what happens?
//
// Statement: If a foreigner visits and says “I see someone with blue eyes”, what happens?
// Answer: All blue-eyed people will leave on the Nth day, where N is the number of blue-eyed individuals.

export function daysUntilBlueEyedPeopleLeave(blueEyedCount: number): number {
  // If no one has blue eyes, no one leaves.
  if (blueEyedCount <= 0) return 0;

  // For N blue-eyed people:
  // - Each sees N-1 others and waits to see if they leave.
  // - When they don't leave on N-1 days, they realize they must have blue eyes.
  // - All leave on day N.
  return blueEyedCount;
}
