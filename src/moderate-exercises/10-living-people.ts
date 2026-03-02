// LCCI 16.10. Living People
//
// Given a list of people with their birth and death years, find the year with
// the most number of people alive. If a person was alive during any portion of
// that year, they should be included. Return the earliest year in case of a tie.
//
// Example:
//   Input: birth = {1900, 1901, 1950}, death = {1948, 1951, 2000}
//   Output: 1901
//
// Constraints:
//   - 0 < birth.length == death.length <= 10000
//   - birth[i] <= death[i]
//   - Years range from 1900 to 2000.

export interface Person {
  birth: number;
  death: number;
}

export function yearWithMostPeopleAlive(people: Person[]): number {
  const START_YEAR = 1900;
  const END_YEAR = 2000;
  const delta = new Array(END_YEAR - START_YEAR + 2).fill(0); // +2 for death+1 case

  // Populate birth and death deltas
  for (const person of people) {
    delta[person.birth - START_YEAR] += 1; // Person born
    delta[person.death + 1 - START_YEAR] -= 1; // Person died the next year
  }

  let maxAlive = 0;
  let currentAlive = 0;
  let maxYear = START_YEAR;

  // Compute prefix sum and track peak
  for (let year = 0; year < delta.length; year++) {
    currentAlive += delta[year];
    if (currentAlive > maxAlive) {
      maxAlive = currentAlive;
      maxYear = START_YEAR + year;
    }
  }

  return maxYear;
}
