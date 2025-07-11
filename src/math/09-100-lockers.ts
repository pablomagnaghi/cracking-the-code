// 6.10. 100 Lockers
//
// There are 100 lockers in a hallway, all initially closed.
// You make 100 passes by the lockers. On the ith pass, you toggle every ith locker (open it if closed, close it if open).
// After the 100th pass, which lockers are open?

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
