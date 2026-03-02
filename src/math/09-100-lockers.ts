// 06.09. 100 Lockers
//
// There are 100 closed lockers in a hallway. A man begins by opening all
// 100 lockers. Next, he closes every second locker. Then, on his third
// pass, he toggles every third locker (closes it if it is open or opens it
// if it is closed). This process continues for 100 passes, such that on
// pass i, the man toggles every ith locker. After his 100th pass through
// the hallway, in which he toggles only locker 100, how many lockers are
// open?
//
// Key Insight:
//   A locker n is toggled once for each factor of n (on passes 1, 2, ...,
//   up to n itself). A locker ends up open if it has been toggled an odd
//   number of times -- that is, if n has an odd number of factors. The only
//   numbers with an odd number of factors are perfect squares (because
//   factors pair up except when a factor is the square root).
//
// Example:
//   Output: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
//   (the 10 perfect squares between 1 and 100)
//
// Constraints:
//   - 100 lockers, numbered 1 through 100
//   - All lockers start closed

export function hundredLockers(): number[] {
  const lockers = new Array(100).fill(false); // false = closed, true = open

  for (let pass = 1; pass <= 100; pass++) {
    for (let locker = pass; locker <= 100; locker += pass) {
      lockers[locker - 1] = !lockers[locker - 1];
    }
  }

  // Return locker numbers (1-based) that remain open
  const openLockers = [];
  for (let i = 0; i < 100; i++) {
    if (lockers[i]) openLockers.push(i + 1);
  }

  return openLockers;
}
